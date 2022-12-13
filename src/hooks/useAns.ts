import { AnsContext } from './../providers/AnsProvider'
import { useEffect, useContext, useMemo, useState } from 'react'

export const useAns = (address?: string) => {
  const { ansMap, getAns } = useContext(AnsContext)
  const [ans, setAns] = useState<string>()

  useEffect(() => {
    if (!address) {
      return
    }

    setAns(getAns(address))
  }, [address, getAns])

  return useMemo(() => (!address ? '' : ans || ansMap[address]), [address, ans, ansMap])
}
