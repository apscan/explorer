import { Types } from 'aptos'

export const parseUserTransfer = (payload: Types.TransactionPayload_EntryFunctionPayload) => {
  if (!payload || payload.type !== 'entry_function_payload') {
    return null
  }

  const typeArgument = payload.type_arguments.length > 0 ? payload.type_arguments[0] : undefined
  const isAptCoinTransfer = payload.function === '0x1::coin::transfer' && typeArgument === '0x1::aptos_coin::AptosCoin'
  const isAptCoinInitialTransfer = payload.function === '0x1::aptos_account::transfer'

  if (!isAptCoinTransfer && !isAptCoinInitialTransfer) {
    return null
  }

  if (payload.arguments.length < 2) {
    return null
  }

  return {
    receiver: payload.arguments[0] as string,
    amount: payload.arguments[1] as string,
  }
}
