import { css } from '@emotion/react'
import { Card } from 'components/Card'
import { Container, InlineBox } from 'components/container'
import { DocumentTitle } from 'components/DocumentTitle'
import { PageTitle } from 'components/PageTitle'
import { Tabs } from 'components/Tabs'
import { useSearchTab } from 'hooks/useSearchTab'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { Overview } from './Overview'
import { useCollectionDetailQuery } from 'api/collection'
import { tabNameWithCount } from 'utils'
import { Holders } from './Holders'
import { Tokens } from './Tokens'

export const Collection = () => {
  const { creator, name } = useParams<{ creator: string; name: string }>()
  const { data } = useCollectionDetailQuery(
    { creator: creator!, name: name! },
    {
      skip: !creator || !name,
    }
  )

  const tabs = useMemo(() => {
    if (!data) return undefined

    return [
      {
        label: tabNameWithCount('Holders', data?.addresses_count),
        key: 'holders',
        children: (
          <Holders
            count={data.addresses_count}
            name={data.collection_name}
            creator={data.creator_address}
            supply={parseInt(data.collection_data.supply)}
          />
        ),
        hide: !data.addresses_count,
      },
      {
        label: tabNameWithCount('Tokens', 100),
        key: 'tokens',
        children: <Tokens name={data.collection_name} creator={data.creator_address} count={100} />,
        hide: false,
      },
    ].filter((item) => !item.hide) as any
  }, [data])

  console.log('data', data)

  const [activeKey, onTabChange] = useSearchTab(tabs)

  return (
    <Container>
      <DocumentTitle value={`Aptos Collection ${name || '-'} | Apscan`} />
      <PageTitle
        value={
          <InlineBox
            css={css`
              align-items: center;
              font-size: 16px;
            `}
          >
            <span
              style={{
                fontSize: '20px',
                fontWeight: '500',
              }}
            >
              Collection
            </span>
            <span
              style={{
                color: '#77838f',
                wordBreak: 'break-all',
                padding: '0px 40px 0px 10px',
              }}
            >
              {creator}::{name}
            </span>
          </InlineBox>
        }
      />
      <Box
        css={css`
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 16px;
          margin-bottom: 24px;
        `}
      >
        <Overview data={data} />
      </Box>
      <Card>
        <Tabs onTabClick={onTabChange} activeKey={activeKey} size="large" items={tabs} />
      </Card>
    </Container>
  )
}