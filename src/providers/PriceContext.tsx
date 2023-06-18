import { AptosClient } from 'aptos'
import React, { Context, useCallback, useContext, useEffect, useState } from 'react'
import { Pair, SWAP_ADDRESS } from '@pancakeswap/aptos-swap-sdk'
import { fetchCoin } from 'utils/coin'
import RealBigNumber from 'bignumber.js'
import { AptosCoin } from 'utils'
import { useMarketInfoQuery } from 'api'

interface PriceContextProps {
  getPriceVsApt: (coin?: string) => Promise<RealBigNumber | undefined>
}

type Path = PairConnection[]

export function aggregateRoutes(sourcePairs: Path): Record<string, Path[]> {
  const coins = Object.keys(
    sourcePairs.reduce((all: Record<string, boolean>, pair) => {
      all[pair.xCoin] = true
      all[pair.yCoin] = true

      return all
    }, {})
  )

  return Object.fromEntries(coins.map((coin) => [coin, aggregateRouteForOneCoin(sourcePairs, coin, {}, [])]))
}

function aggregateRouteForOneCoin(
  sourcePairs: Path,
  coin: string,
  cacheMap: Record<string, Path>,
  previousPath: Path
): Path[] {
  if (coin === AptosCoin) {
    return []
  }

  return sourcePairs
    .filter((pair) => pair.xCoin === coin || pair.yCoin === coin)
    .reduce((all: Path[], pair) => {
      const other = pair.xCoin === coin ? pair.yCoin : pair.xCoin

      if (previousPath.find((pair_) => pair_.xCoin === other || pair_.yCoin === other)) {
        return all
      }

      if (other === AptosCoin) {
        const path = [...previousPath, pair]
        all.push(path)
        // cacheMap[self] = path
        return all
      }

      const childPaths = aggregateRouteForOneCoin(sourcePairs, other, cacheMap, [...previousPath, pair])

      if (childPaths.length > 0) {
        all = all.concat(childPaths)
      }

      return all
    }, [])
}

export const PriceContext: Context<PriceContextProps> = React.createContext({} as unknown as PriceContextProps)

type PairConnection = {
  xCoin: string
  yCoin: string
  type: string
  data: {
    reserve_x: string
    reserve_y: string
    block_timestamp_last: string
  }
}

function aggrateExceptAptosCoin(
  pairs: {
    xCoin: string
    yCoin: string
    type: string
    data: {
      block_timestamp_last: string
      reserve_x: string
      reserve_y: string
    }
  }[]
) {
  const { allCoins, oneCoins } = pairs.reduce(
    (
      all: {
        allCoins: Record<string, boolean>
        oneCoins: Record<string, boolean>
      },
      pair
    ) => {
      const IN = pair.xCoin === AptosCoin || pair.yCoin === AptosCoin
      if (IN) {
        all['oneCoins'][pair.xCoin === AptosCoin ? pair.yCoin : pair.xCoin] = true
        all.allCoins[pair.xCoin === AptosCoin ? pair.yCoin : pair.xCoin] = true
      } else {
        all.allCoins[pair.yCoin] = true
        all.allCoins[pair.xCoin] = true
      }

      return all
    },
    { allCoins: {}, oneCoins: {} }
  )

  return [Object.keys(allCoins), Object.keys(oneCoins)]
}

export const PriceContextProvider = React.memo(({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [decmalsCache, setDecimalsCache] = useState<Record<string, number>>({})
  const [coinRoutesMap, setCoinRoutesMap] = useState<Record<string, Path[]>>({})
  const [provider] = useState(new AptosClient('https://fullnode.mainnet.aptoslabs.com/v1'))

  useEffect(() => {
    provider.getAccountResources(SWAP_ADDRESS).then((resources) => {
      const tokenPairs = resources.filter((r) => r.type.includes('::swap::TokenPairReserve')) as {
        type: string
        data: {
          reserve_x: string
          reserve_y: string
          block_timestamp_last: string
        }
      }[]
      const pairs = tokenPairs.map((pair) => {
        const [xCoin, yCoin] = Pair.parseType(pair.type)
        return {
          ...pair,
          xCoin,
          yCoin,
        }
      })

      const [allCoins, level1Coins] = aggrateExceptAptosCoin(pairs)
      const baseCoins = level1Coins.filter(
        (coin) =>
          !!pairs.filter(
            (pair) =>
              (pair.xCoin === coin && pair.yCoin !== AptosCoin) || (pair.yCoin === coin && pair.xCoin !== AptosCoin)
          ).length
      )

      const routersMap = Object.fromEntries(
        allCoins.map((coin) => {
          let routes: Path[] = []
          const connectionSteps1 = pairs.find(
            (pair) =>
              (coin === pair.xCoin && AptosCoin === pair.yCoin) || (coin === pair.yCoin && AptosCoin === pair.xCoin)
          )

          if (connectionSteps1) {
            routes.push([connectionSteps1])
          }

          const connectionSteps2 = baseCoins.reduce((all: Path[], baseCoin) => {
            const [one, two] = pairs.reduce(
              (all: [PairConnection | undefined, PairConnection | undefined], pair) => {
                if (all[0] && all[1]) {
                  return all
                }

                if (
                  (baseCoin === pair.xCoin && AptosCoin === pair.yCoin) ||
                  (baseCoin === pair.yCoin && AptosCoin === pair.xCoin)
                ) {
                  return [pair, all[1]]
                }

                if (
                  (baseCoin === pair.xCoin && coin === pair.yCoin) ||
                  (baseCoin === pair.yCoin && coin === pair.xCoin)
                ) {
                  return [all[0], pair]
                }

                return all
              },
              [undefined, undefined]
            )

            if (one && two) {
              all.push([one, two])
            }

            return all
          }, [])

          routes = routes.concat(connectionSteps2)

          return [coin, routes]
        })
      )
      setCoinRoutesMap(routersMap)
    })
  }, [provider])

  const getDecimals = useCallback(
    async (coin: string): Promise<number | undefined> => {
      if (decmalsCache[coin]) {
        return decmalsCache[coin]
      }

      try {
        const coinDetail = await fetchCoin({ provider, coin: coin })
        setDecimalsCache((old) => {
          old[coin] = coinDetail.decimals

          return old
        })
        return coinDetail.decimals
      } catch (e) {
        return undefined
      }
    },
    [decmalsCache, provider]
  )

  const getPriceVsApt = useCallback(
    async (coin?: string) => {
      if (!coin) {
        return undefined
      }
      if (coin === AptosCoin) {
        return new RealBigNumber(1)
      }

      const path = coinRoutesMap[coin]?.[0]

      if (!path) {
        return undefined
      }

      const relatedCoins = Object.keys(
        path.reduce((all: Record<string, boolean>, pair) => {
          all[pair.xCoin] = true
          all[pair.yCoin] = true

          return all
        }, {})
      )
      const decimals = await Promise.all(relatedCoins.map(getDecimals))

      if (decimals.findIndex((decimal) => typeof decimal === 'undefined') >= 0) {
        return undefined
      }

      const decimalsMap = Object.fromEntries(relatedCoins.map((coin, i) => [coin, decimals[i]])) as Record<
        string,
        number
      >

      return path.reduce(
        ({ lastPrice, lastMiddleCoin }, curr) => {
          let currPrice: RealBigNumber
          const nextCoin = lastMiddleCoin === curr.xCoin ? curr.yCoin : curr.xCoin

          if (curr.xCoin === lastMiddleCoin) {
            currPrice = new RealBigNumber(curr.data.reserve_x)
              .div(curr.data.reserve_y)
              .multipliedBy(Math.pow(10, decimalsMap[curr.yCoin] - decimalsMap[curr.xCoin]))
          } else {
            currPrice = new RealBigNumber(curr.data.reserve_y)
              .div(curr.data.reserve_x)
              .multipliedBy(Math.pow(10, decimalsMap[curr.xCoin] - decimalsMap[curr.yCoin]))
          }

          return {
            lastPrice: lastPrice.multipliedBy(currPrice),
            lastMiddleCoin: nextCoin,
          }
        },
        { lastPrice: RealBigNumber(1), lastMiddleCoin: AptosCoin }
      ).lastPrice
    },
    [getDecimals, coinRoutesMap]
  )

  return (
    <PriceContext.Provider
      value={{
        getPriceVsApt,
      }}
    >
      {children}
    </PriceContext.Provider>
  )
})

export const usePriceVsApt = (coin: string) => {
  const { getPriceVsApt } = useContext(PriceContext)
  const [price, setPrice] = useState<number>()

  useEffect(() => {
    getPriceVsApt(coin).then((price) => setPrice(price?.toNumber()))
  }, [coin, getPriceVsApt])

  return price
}

export const usePrice = (coin: string) => {
  const { data: market } = useMarketInfoQuery()
  const { getPriceVsApt } = useContext(PriceContext)
  const [price, setPrice] = useState<number>()

  useEffect(() => {
    if (!market?.quotes?.USD?.price || !coin) {
      return
    }

    getPriceVsApt(coin).then((price) => {
      setPrice(price?.multipliedBy(market.quotes.USD.price).toNumber())
    })
  }, [coin, getPriceVsApt, market])

  return price
}
