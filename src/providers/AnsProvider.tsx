import React, { Context, useCallback, useRef, useState } from 'react'

interface AnsProps {
  ansMap: Record<string, string>
  query: (address: string) => void
  getAns: (address: string) => string | undefined
}

export const AnsContext: Context<AnsProps> = React.createContext({} as unknown as AnsProps)

export const AnsProvider = React.memo(
  ({ children }: { children: React.ReactNode }): React.ReactElement => {
    const [ansMap, setAnsMap] = useState<Record<string, string>>({})
    const ansRef = useRef(ansMap)

    const query = useCallback((address: string) => {
      if (!address) {
        return
      }

      fetch(`https://www.aptosnames.com/api/mainnet/v1/name/${address}`)
        .then((response) => response.json())
        .then(({ name }) =>
          setAnsMap((old) => {
            ansRef.current = { ...old, [address]: name }
            return ansRef.current
          })
        )
    }, [])

    const getAns = useCallback(
      (address: string) => {
        if (!address) {
          return
        }

        if (ansRef.current[address]) {
          return ansRef.current[address]
        }

        query(address)
      },
      [query]
    )

    return (
      <AnsContext.Provider
        value={{
          ansMap,
          query,
          getAns,
        }}
      >
        {children}
      </AnsContext.Provider>
    )
  }
)
