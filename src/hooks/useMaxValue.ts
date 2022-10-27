import { useEffect, useState } from 'react'

export const useMaxValue = (value?: number) => {
  const [max, setMax] = useState<number>()

  useEffect(() => {
    if (value) {
      setMax((prev) => Math.max(prev ?? 0, value))
    }
  }, [value])

  return max
}
