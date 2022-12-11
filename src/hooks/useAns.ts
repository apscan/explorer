import { useState, useEffect } from 'react'

export const useAns = (address?: string) => {
  const [ans, setAns] = useState()

  useEffect(() => {
    if (!address) {
      return
    }

    fetch(`https://www.aptosnames.com/api/mainnet/v1/name/${address}`)
      .then((response) => response.json())
      .then(({ name }) => setAns(name))
  }, [address])

  return ans
}
