export const queryRangeLimitMap: {
  'coin_transfers?move_resource_generic_type_params': number
  'coin_transfers?address': number
  'coin_transfers?address&move_resource_generic_type_params': number
  'resource_changes?address': number
  'resource_changes?address&move_resource_generic_type_params': number
  'events?address': number
  accounts_with_rank: number
  'blocks?proposer': number
  coin_info: number
  'coin_balances_rank?move_resource_generic_type_params': number
  'token_events?creator_address&collection_name': number
  'token_events_by_address?address': number
  collections: number
  'collection_holders?collection_name&creator_address': number
  'tokens?collection_name&creator_address': number
  'token_holders?collection_name&creator_address&token_name': number
  'token_events?collection_name&creator_address&token_name': number
} = {
  'token_events?collection_name&creator_address&token_name': 1000,
  'token_holders?collection_name&creator_address&token_name': 100,
  'tokens?collection_name&creator_address': 1000,
  'collection_holders?collection_name&creator_address': 100,
  collections: 1000,
  'token_events_by_address?address': 10000,
  'token_events?creator_address&collection_name': 10000,
  'coin_transfers?move_resource_generic_type_params': 10000,
  'coin_transfers?address': 10000,
  'coin_transfers?address&move_resource_generic_type_params': 10000,
  'resource_changes?address': 10000,
  'resource_changes?address&move_resource_generic_type_params': 10000,
  'events?address': 10000,
  accounts_with_rank: 1000,
  'blocks?proposer': 1000,
  coin_info: 1000,
  'coin_balances_rank?move_resource_generic_type_params': 1000,
}
