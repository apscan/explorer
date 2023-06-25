import React, { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

type TabItem = {
  key: string
  name?: string
  label: React.ReactNode
  children: React.ReactNode
  hide?: boolean
}

export const useSearchTab = (tabs?: TabItem[]) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [activeKey, setActiveKey] = useState<string>()

  useEffect(() => {
    if (tabs) {
      const tabParam = searchParams.get('tab')

      const tab = tabs?.find((t) => tabParam === t?.key)

      setActiveKey(tab?.key || tabs[0]?.key)
    }
  }, [tabs, activeKey, searchParams])

  const onTabChange = useCallback(
    (activeKey: string) => {
      const tab = tabs?.find((item) => item.key === activeKey)
      if (!tab || tab.key === tabs?.[0]?.key) {
        searchParams.delete('tab')
      } else {
        searchParams.set('tab', tab.key)
      }
      setSearchParams(searchParams, { replace: true })
    },
    [tabs, searchParams, setSearchParams]
  )

  return [activeKey, onTabChange] as const
}
