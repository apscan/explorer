import { Menu, MenuButton, MenuList } from 'components/menu'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Image, Text } from '@chakra-ui/react'
import { Box, Flex, InlineBox } from 'components/container'
import { Link } from 'components/link'
import { NumberFormat } from 'components/NumberFormat'
import { vars } from 'theme/theme.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CoinIconFileNameMap, defaultCoinIconFileName } from 'config/coin-icons'
import { ListItem } from './CoinList'
import { useTokensQuery } from 'api/token'
import { BaseInput } from 'components/inputs'
import TokenDefault from 'assets/tokens/TokenDefault'
import { truncated } from 'utils/truncated'

type TokenType = {
  name: string
  amount: string
  creator: string
  collectionName: string
  propertiVersion: string
  url: string
}

type CollectionType = {
  name: string
  creator: string
  tokens: TokenType[]
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

const Token: React.FC<TokenType> = ({ creator, collectionName, name, url, amount }) => {
  return (
    <ListItem>
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
        to={`/token/${creator}/${encodeURIComponent(collectionName)}/${encodeURIComponent(name)}`}
      >
        <Flex alignItems="center" justifyContent="space-between">
          <InlineBox alignItems="center" mr="0.35rem">
            <TokenDefault
              sx={{
                fill: '#606672',
                width: '12px',
                height: '12px',
                marginRight: '4px',
              }}
            />
            <span>{name}</span>
          </InlineBox>
          <NumberFormat color="#77838f" value={amount} maximumFractionDigits={2} />
        </Flex>
      </Link>
    </ListItem>
  )
}

const Collection: React.FC<CollectionType & { needCollasped?: boolean }> = ({
  name,
  tokens,
  creator,
  needCollasped = false,
}) => {
  const [collasped, setCollasped] = useState(needCollasped && tokens.length > 5)

  useEffect(() => {
    setCollasped(needCollasped && tokens.length > 5)
  }, [needCollasped, tokens.length])

  return (
    <>
      <Flex
        mb="4px"
        color="#1e2022"
        fontSize="0.765rem"
        padding="4px 8px"
        bg="rgba(231,234,243,.5)"
        borderRadius="0.25rem"
        alignItems="center"
        justifyContent="space-between"
      >
        <InlineBox alignItems="center" justifyContent="space-between">
          <Link to={`/collection/${creator}/${encodeURIComponent(name)}`} fontWeight="600" sx={{ wordWrap: 'nowrap' }}>
            {truncated(creator, 8)}::{name}
          </Link>
          <Text>&nbsp;({tokens.length})</Text>
        </InlineBox>
        <ChevronDownIcon
          fontSize="1rem"
          userSelect="none"
          onClick={() => setCollasped((old) => !old)}
          style={{
            transform: collasped ? 'unset' : 'scaleY(-1)',
          }}
        />
      </Flex>
      <Box maxH={collasped ? '0px' : '99999999px'} overflow="hidden" transition="max-height .1s">
        {tokens.map((token) => (
          <Token key={token.name} {...token} />
        ))}
      </Box>
    </>
  )
}

export const Tokens = ({ address }: { address?: string }) => {
  const { data } = useTokensQuery(
    { address, start: 0, pageSize: 50 },
    {
      skip: !address,
    }
  )
  const { data: data2 } = useTokensQuery(
    { address, start: 50, pageSize: 50 },
    {
      skip: !address,
    }
  )
  const inputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState('')
  const collections: CollectionType[] = useMemo(() => {
    if (!data && !data2) {
      return []
    }

    const collections = (data?.data ?? []).concat(data2?.data || []).reduce(
      (
        collections: Record<
          string,
          {
            name: string
            creator: string
            tokens: TokenType[]
          }
        >,
        token
      ) => {
        const collectionId = `${token.token_id.id.token_data_id.collection}${token.token_id.id.token_data_id.creator}`

        collections[collectionId] = collections[collectionId] || {
          name: token.token_id.id.token_data_id.collection,
          creator: token.token_id.id.token_data_id.creator,
          tokens: [],
        }

        collections[collectionId].tokens.push({
          name: token.token_id.id.token_data_id.name,
          amount: token.token_id.amount,
          collectionName: token.token_id.id.token_data_id.collection,
          propertiVersion: token.token_id.id.property_version,
          url: token.token_info.uri,
          creator: token.token_id.id.token_data_id.creator,
        })

        return collections
      },
      {}
    )

    return Object.values(collections)
      .map((collection) => ({
        ...collection,
        tokens: [...collection.tokens].sort((tokenA, tokenB) => {
          const [nameA, numberA_] = tokenA.name.split('#')
          const [nameB, numberB_] = tokenB.name.split('#')
          if (nameA > nameB) {
            return 1
          }

          if (nameA < nameB) {
            return -1
          }

          const numberA = parseInt(numberA_)
          const numberB = parseInt(numberB_)

          if (numberA > numberB) {
            return 1
          }

          if (numberA < numberB) {
            return -1
          }

          return 0
        }),
      }))
      .sort((collectionA, collectionB) => {
        if (collectionA.name > collectionB.name) {
          return 1
        }

        if (collectionA.name < collectionB.name) {
          return -1
        }

        return 0
      })
  }, [data, data2])
  const filteredCollections = useMemo(() => {
    if (!search) {
      return collections
    }

    return collections.reduce((all: CollectionType[], curr) => {
      const tokens = curr.tokens.filter((token) => token.name.toLowerCase().includes(search))

      if (tokens.length > 0) {
        all.push({
          ...curr,
          tokens,
        })
      }

      return all
    }, [])
  }, [collections, search])
  const needCollasped = useMemo(
    () => filteredCollections.length > 1 && filteredCollections.reduce((all, curr) => all + curr.tokens.length, 0) > 14,
    [filteredCollections]
  )
  const tokensCount = useMemo(() => collections.reduce((all, curr) => all + curr.tokens.length, 0), [collections])

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            isActive={isOpen}
            _expanded={{ bg: vars.colors.buttonBg1 }}
            rightIcon={<ChevronDownIcon />}
            minWidth="300px"
            textAlign="left"
            sx={{
              '& > span:first-of-type': {
                display: 'inline-flex',
              },
            }}
          >
            Collections
            <NumberFormat
              style={{
                color: '#fff',
                background: '#3498db',
                borderRadius: '0.25rem',
                padding: '0.15rem 0.25rem',
                fontSize: '75%',
                margin: '0px 0.25rem',
              }}
              value={collections.length}
            />
            Tokens
            <NumberFormat
              style={{
                color: '#fff',
                background: '#3498db',
                borderRadius: '0.25rem',
                padding: '0.15rem 0.25rem',
                fontSize: '75%',
                margin: '0px 0.25rem',
              }}
              value={data?.page.count ?? tokensCount}
            />
          </MenuButton>
          <MenuList minWidth="300px">
            <Box p="0em 0.75em 0em 0.5em">
              <BaseInput
                ref={inputRef}
                value={search}
                borderRadius="0.25em"
                mb="0.75em"
                placeholder="Search for Token Name"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            <Box p="0em 0.75em 0em 0.5em" maxH="500px" overflowY="scroll">
              {!collections.length ? (
                <Text pl="0.25rem">No Tokens</Text>
              ) : (
                filteredCollections.map((collection) => (
                  <Collection key={collection.name} needCollasped={needCollasped} {...collection} />
                ))
              )}
            </Box>
          </MenuList>
        </>
      )}
    </Menu>
  )
}
