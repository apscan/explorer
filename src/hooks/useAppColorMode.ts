import { useColorMode } from '@chakra-ui/react'

export function useAppColorMode() {
  const { colorMode, toggleColorMode } = useColorMode()

  return { colorMode, toggleColorMode }
}
