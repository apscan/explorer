import { useModuleDetailQuery } from 'api'
import { Card } from 'components/Card'
import { DocumentTitle } from 'components/DocumentTitle'
import { PageTitle } from 'components/PageTitle'
import { Tabs } from 'components/Tabs'
import { Container } from 'components/container'
import { useSearchTab } from 'hooks/useSearchTab'
import { useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { tabNameWithCount } from 'utils'
import { Bytecode } from './Bytecode'
import { Historical } from './Historical'
import { Address } from 'components/Address'

const tabs: Record<string, { name: string; key: string }> = {
  bytecode: {
    key: 'bytecode',
    name: 'Bytecode',
  },
  historical: {
    key: 'historical',
    name: 'Historical Module',
  },
}

export const Module = () => {
  const { id } = useParams<{ id: string; module: string }>()
  const [search] = useSearchParams()
  const address = id

  const module = search.get('module')
  const { data = [] } = useModuleDetailQuery({
    move_module_name: module!,
    move_module_address: address!,
  })

  const items = useMemo(() => {
    const result = [
      {
        label: tabs.bytecode.name,
        key: tabs.bytecode.key,
        children: <Bytecode data={data} />,
      },
      {
        label: tabNameWithCount(tabs.historical.name, data.length),
        key: tabs.historical.key,
        children: <Historical data={data} />,
      },
    ]

    return result
  }, [data, id])

  const [activeKey, onTabChange] = useSearchTab(items)

  return (
    <Container>
      <DocumentTitle value={`Aptos Module ${address}::${module} | Apscan`} />
      <PageTitle
        value={
          <>
            Module: {<Address value={address} />}::{module}
          </>
        }
      />
      <Card>
        <Tabs onChange={onTabChange} activeKey={activeKey} size="large" items={items} />
      </Card>
    </Container>
  )
}
