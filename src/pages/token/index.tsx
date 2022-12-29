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
import TokenDefault from 'assets/tokens/TokenDefault'
import { useTokenDetailQuery } from 'api/token'

export const Token = () => {
  const { creator, name, collectionName } = useParams<{ creator: string; collectionName: string; name: string }>()
  const { data } = useTokenDetailQuery(
    { creator: creator!, name: name!, collectionName: collectionName! },
    {
      skip: !creator || !name || !collectionName,
    }
  )

  const tabs = useMemo(() => {
    if (!data) return undefined

    return []
    // .filter((item) => !item.hide) as any
  }, [data])

  const [activeKey, onTabChange] = useSearchTab(tabs)

  return (
    <Container>
      <DocumentTitle value={`Aptos Token ${name || '-'} | Apscan`} />
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
              Token
            </span>
            <span
              style={{
                color: '#77838f',
                wordBreak: 'break-all',
                padding: '0px 40px 0px 10px',
              }}
            >
              <TokenDefault
                sx={{
                  fill: '#606672',
                  width: '24px',
                  height: '24px',
                  marginRight: '4px',
                }}
              />
              {name}
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
