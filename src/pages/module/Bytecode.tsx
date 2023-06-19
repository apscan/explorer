import styled from '@emotion/styled'
import { Box } from 'components/container'
import { Hash } from 'components/Hash'
import { renderRow } from 'components/helpers'
import { JsonView } from 'components/JsonView'

const Wrapper = styled(Box)`
  padding: 0 12px;
`

export const Bytecode = ({ data }: { data: any | undefined }) => {
  const module = data[0]

  return (
    <Wrapper>
      <Box>
        {renderRow(
          'Name',
          (module?.move_module_address && `${module?.move_module_address}::${module?.move_module_name}`) || '-'
        )}
        {renderRow(
          'Bytecode',
          <Hash showLength fallback="-" copyable value={module?.move_module_bytecode} size="long" />
        )}
        {renderRow('Friends', <JsonView maxWidth="950px" withContainer src={module?.move_module_abi?.friends} />)}
        {renderRow('Structs', <JsonView maxWidth="950px" withContainer src={module?.move_module_abi?.structs} />)}
        {renderRow(
          'Functions',
          <JsonView maxWidth="950px" withContainer src={module?.move_module_abi?.exposed_functions} />
        )}
      </Box>
    </Wrapper>
  )
}
