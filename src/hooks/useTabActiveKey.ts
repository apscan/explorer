import { useMemo } from 'react'

export const useTabActiveKey = (tabs: Record<string, { name: string; key: string }>, searchParams: URLSearchParams) => {
  const activeKey = useMemo(() => {
    const tabParam = searchParams.get('tab')

    for (const tab of Object.values(tabs)) {
      if (tabParam === tab?.key) {
        return tab?.key
      }
    }

    return Object.values(tabs)[0]?.key
  }, [tabs, searchParams])

  return activeKey
}
