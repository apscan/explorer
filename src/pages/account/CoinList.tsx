import { Menu, MenuButton, MenuList } from 'components/menu'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Image, Text } from '@chakra-ui/react'
import RealBigNumber from 'bignumber.js'
import { BaseInput } from 'components/inputs'
import { Box, Flex, InlineBox } from 'components/container'
import styled from '@emotion/styled'
import { Link } from 'components/link'
import { AmountFormat } from 'components/AmountFormat'
import { NumberFormat } from 'components/NumberFormat'
import { vars } from 'theme/theme.css'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { CoinIconFileNameMap, defaultCoinIconFileName } from 'config/coin-icons'
import { PriceContext } from 'providers/PriceContext'
import { useMarketInfoQuery } from 'api'
import CoinPrice from 'components/CoinPrice'

const CoinItem = styled(Box)`
  border-bottom: 1px solid #e7eaf3;
  padding-bottom: 0.25rem;
  margin-bottom: 0.25rem;
  &:last-child {
    margin-bottom: 0rem;
    border-bottom-width: 0px;
  }
`

export type CoinBalance = {
  type: string
  symbol: string
  name: string
  decimals: number
  balance: string
}

type CoinAmount = CoinBalance & {
  value: number
  price: number
}

export const CoinIcon = ({ type }: { type: string }) => {
  return (
    <Image
      style={{
        width: '12px',
        height: '12px',
        marginRight: '4px',
      }}
      src={`/images/icons/${CoinIconFileNameMap[type] || defaultCoinIconFileName}`}
    />
  )
}

const Coin = (coin: CoinAmount) => {
  return (
    <CoinItem>
      {/* use Link instead MenuItem here, cuz MenuItem cause search component blur when list filled */}
      <Link
        sx={{
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem',
          backgroundColor: 'transparent',
          color: 'unset !important',
          '&:hover': {
            color: 'white !important',
            span: {
              color: 'white !important',
            },
            backgroundColor: '#3498db',
          },
        }}
        display="block"
        fontSize="0.76562rem !important"
        to={`/coin/${coin.type}`}
      >
        <Flex alignItems="center" justifyContent="space-between">
          <InlineBox alignItems="center" mr="0.35rem">
            <CoinIcon type={coin.type} />
            <span>
              {coin.name}({coin.symbol})
            </span>
          </InlineBox>
          <AmountFormat
            value={coin.balance}
            maximumFractionDigits={6}
            decimals={coin.decimals}
            postfix={` ${coin.symbol}`}
          />
        </Flex>
        {!!coin.price && (
          <Flex alignItems="center" justifyContent="space-between">
            <CoinPrice color="#77838f" price={coin.price} prefix="@ $" />
            <NumberFormat value={coin.value} maximumFractionDigits={2} prefix="$" />
          </Flex>
        )}
      </Link>
    </CoinItem>
  )
}

export const CoinList = ({ coinBalances }: { coinBalances: CoinBalance[] }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState('')
  const [coins, setCoins] = useState<CoinAmount[]>([])
  const { getPriceVsApt } = useContext(PriceContext)
  const { data: market } = useMarketInfoQuery()

  useEffect(() => {
    const aptPrice = market?.quotes?.USD?.price

    if (!aptPrice) {
      return
    }

    Promise.all(coinBalances.map((coin) => getPriceVsApt(coin.type))).then((prices) => {
      setCoins(
        coinBalances.map((coin, i) => ({
          ...coin,
          price: prices[i]?.multipliedBy(aptPrice)?.toNumber() || 0,
          value: new RealBigNumber(coin.balance)
            .multipliedBy(prices[i] || 0)
            .multipliedBy(aptPrice)
            .div(Math.pow(10, coin.decimals))
            .toNumber(),
        }))
      )
    })
  }, [coinBalances, getPriceVsApt, market?.quotes?.USD?.price])

  const amount = useMemo(
    () => coins.reduce((all: RealBigNumber, curr) => all.plus(curr.value), new RealBigNumber(0)),
    [coins]
  )
  const filteredCoins = useMemo(
    () =>
      !search
        ? coins
        : coins.filter(
            (coin) =>
              coin.name.toLowerCase().includes(search) ||
              coin.symbol.toLowerCase().includes(search) ||
              coin.type.toLowerCase().includes(search)
          ),
    [coins, search]
  )

  return (
    <Menu>
      <MenuButton
        as={Button}
        _expanded={{ bg: vars.colors.buttonBg1 }}
        rightIcon={<ChevronDownIcon />}
        minWidth="300px"
        textAlign="left"
      >
        &gt;&nbsp;
        <NumberFormat value={amount.toString()} maximumFractionDigits={2} prefix="$" />
        <span
          style={{
            color: '#fff',
            background: '#3498db',
            borderRadius: '0.25rem',
            padding: '0.15rem 0.25rem',
            fontSize: '75%',
            margin: '0px 0.25rem',
          }}
        >
          &gt;{coins.length}
        </span>
      </MenuButton>
      <MenuList minWidth="300px">
        <Box p="0em 0.75em 0em 0.5em">
          <BaseInput
            ref={inputRef}
            value={search}
            borderRadius="0.25em"
            mb="0.75em"
            placeholder="Search for Coin Name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
        <Box p="0em 0.75em 0em 0.5em">
          {!filteredCoins.length ? (
            <Text pl="0.25rem">No Available Coins</Text>
          ) : (
            filteredCoins.map((coin) => <Coin key={coin.type} {...coin} />)
          )}
        </Box>
      </MenuList>
    </Menu>
  )
}
