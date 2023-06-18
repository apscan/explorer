import { Types } from 'aptos'

export type TransactionCounterparty = {
  address: string
  role: 'receiver' | 'smartContract'
}

// when the transaction counterparty is a "receiver",
//    the transaction is a user transfer (account A send money to account B)
// when the transaction counterparty is a "smartContract",
//    the transaction is a user interaction (account A interact with smart contract account B)
export function getTransactionCounterparty(
  transaction: Types.Transaction
): TransactionCounterparty | undefined {
  if (transaction.type !== 'user_transaction') {
    return undefined
  }

  if (!('payload' in transaction)) {
    return undefined
  }

  if (transaction.payload.type !== 'entry_function_payload') {
    return undefined
  }

  // there are two scenarios that this transaction is an APT coin transfer:
  // 1. coins are transferred from account1 to account2:
  //    payload function is "0x1::coin::transfer" and the first item in type_arguments is "0x1::aptos_coin::AptosCoin"
  // 2. coins are transferred from account1 to account2, and account2 is created upon transaction:
  //    payload function is "0x1::aptos_account::transfer"
  // In both scenarios, the first item in arguments is the receiver's address, and the second item is the amount.

  const payload = transaction.payload as Types.TransactionPayload_EntryFunctionPayload
  // const typeArgument = payload.type_arguments.length > 0 ? payload.type_arguments[0] : undefined
  // const isAptCoinTransfer = payload.function === '0x1::coin::transfer' && typeArgument === '0x1::aptos_coin::AptosCoin'
  // const isAptCoinInitialTransfer = payload.function === '0x1::aptos_account::transfer'

  // if ((isAptCoinTransfer || isAptCoinInitialTransfer) && payload.arguments.length === 2) {
  //   return {
  //     address: payload.arguments[0],
  //     role: 'receiver',
  //   }
  // } else {
  const smartContractAddr = payload.function.split('::')[0]
  return {
    address: smartContractAddr,
    role: 'smartContract',
  }
  // }
}
