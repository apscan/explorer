import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SearchOption, SearchItem } from '../types'

export const useSearchOptions = () => {
  const { t } = useTranslation()
  const options = useMemo<SearchItem[]>(() => {
    const desc = t('Address / Tx Version & Hash /  Block Height & Hash')

    return [
      {
        id: SearchOption.All,
        name: t('All Filters'),
        desc,
      },
      {
        id: SearchOption.Addresses,
        name: t('Addresses'),
        desc: t('Search addresses'),
      },
      {
        id: SearchOption.Tx,
        name: t('Transactions'),
        desc: t('Search transactions'),
      },
      {
        id: SearchOption.Block,
        name: t('Blocks'),
        desc: t('Search blocks'),
      },
    ]
  }, [t])

  const [selected, setSelected] = useState<SearchItem>(options[0])

  const onSelected = useCallback(
    (id: SearchOption) => {
      const selected = options.find((item) => item.id === id)

      if (!selected) {
        throw new Error('unknown error')
      }

      setSelected(selected)
    },
    [options]
  )

  return {
    selected,
    onSelected,
    options,
  }
}
