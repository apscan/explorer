export const queryRangeLimitMap: {
  'coin_transfers?move_resource_generic_type_params': number
  'coin_transfers?address': number
  'coin_transfers?address&move_resource_generic_type_params': number
  'resource_changes?address': number
  'resource_changes?address&move_resource_generic_type_params': number
  'events?address': number
  accounts_with_rank: number
  'transactions?sender': number
  'blocks?proposer': number
  coin_info: number
  'coin_balances_rank?move_resource_generic_type_params': number
} = {
  'coin_transfers?move_resource_generic_type_params': 10000,
  'coin_transfers?address': 10000,
  'coin_transfers?address&move_resource_generic_type_params': 10000,
  'resource_changes?address': 10000,
  'resource_changes?address&move_resource_generic_type_params': 10000,
  'events?address': 10000,
  accounts_with_rank: 1000,
  'transactions?sender': 10000,
  'blocks?proposer': 1000,
  coin_info: 1000,
  'coin_balances_rank?move_resource_generic_type_params': 1000,
}
