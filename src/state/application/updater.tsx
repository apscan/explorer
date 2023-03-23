import { useGeoQuery } from 'api'
import { useEffect } from 'react'
import { useAppDispatch } from 'state/hooks'
import { setGeo } from './slice'
const data = [
  {
    validator_index: 23,
    network:
      '/dns/aptos-mainnet-validator-0.nodereal.io/tcp/6180/noise-ik/f768970a0d733f3490ee37dc518e04cc1134b96e57b720a8625796cddc871175/handshake/0',
    networkIp: '23.21.170.15',
    fullnode:
      '/dns/aptos-mainnet-node-0.nodereal.io/tcp/6182/noise-ik/b6efef1ce4bb0245a169b5fe15ae186eb84b176023d789f51d0deb5661c68b42/handshake/0',
    fullnodeIp: '34.197.1.118',
    type: 'network',
    network_addresses:
      '0x014f0402256170746f732d6d61696e6e65742d76616c696461746f722d302e6e6f64657265616c2e696f0524180720f768970a0d733f3490ee37dc518e04cc1134b96e57b720a8625796cddc8711750800',
    fullnode_addresses:
      '0x014a0402206170746f732d6d61696e6e65742d6e6f64652d302e6e6f64657265616c2e696f0526180720b6efef1ce4bb0245a169b5fe15ae186eb84b176023d789f51d0deb5661c68b420800',
    status: 'success',
    country: 'United States',
    city: 'Ashburn',
    lat: 39.0438,
    lon: -77.4874,
    query: '23.21.170.15',
  },
  {
    validator_index: 23,
    network:
      '/dns/aptos-mainnet-validator-0.nodereal.io/tcp/6180/noise-ik/f768970a0d733f3490ee37dc518e04cc1134b96e57b720a8625796cddc871175/handshake/0',
    networkIp: '23.21.170.15',
    fullnode:
      '/dns/aptos-mainnet-node-0.nodereal.io/tcp/6182/noise-ik/b6efef1ce4bb0245a169b5fe15ae186eb84b176023d789f51d0deb5661c68b42/handshake/0',
    fullnodeIp: '34.197.1.118',
    type: 'fullnode',
    network_addresses:
      '0x014f0402256170746f732d6d61696e6e65742d76616c696461746f722d302e6e6f64657265616c2e696f0524180720f768970a0d733f3490ee37dc518e04cc1134b96e57b720a8625796cddc8711750800',
    fullnode_addresses:
      '0x014a0402206170746f732d6d61696e6e65742d6e6f64652d302e6e6f64657265616c2e696f0526180720b6efef1ce4bb0245a169b5fe15ae186eb84b176023d789f51d0deb5661c68b420800',
    status: 'success',
    country: 'United States',
    city: 'Ashburn',
    lat: 39.0438,
    lon: -77.4874,
    query: '34.197.1.118',
  },
  {
    validator_index: 96,
    network:
      '/ip4/162.19.83.220/tcp/6180/noise-ik/6bbdf23daeba081c3b4d019aa0bde9e2835fa6ddeceb4f2597529c89428c1e36/handshake/0',
    networkIp: '162.19.83.220',
    fullnode:
      '/ip4/162.19.91.103/tcp/6182/noise-ik/28b9f4b32b0ffa3d5b1d53b6b93cf05e8d0aad443f5e08d592dd0710d05a0c21/handshake/0',
    fullnodeIp: '162.19.91.103',
    type: 'network',
    network_addresses:
      '0x012d0400a21353dc05241807206bbdf23daeba081c3b4d019aa0bde9e2835fa6ddeceb4f2597529c89428c1e360800',
    fullnode_addresses:
      '0x012d0400a2135b67052618072028b9f4b32b0ffa3d5b1d53b6b93cf05e8d0aad443f5e08d592dd0710d05a0c210800',
    status: 'success',
    country: 'France',
    city: 'Strasbourg',
    lat: 48.5749,
    lon: 7.75168,
    query: '162.19.83.220',
  },
  {
    validator_index: 96,
    network:
      '/ip4/162.19.83.220/tcp/6180/noise-ik/6bbdf23daeba081c3b4d019aa0bde9e2835fa6ddeceb4f2597529c89428c1e36/handshake/0',
    networkIp: '162.19.83.220',
    fullnode:
      '/ip4/162.19.91.103/tcp/6182/noise-ik/28b9f4b32b0ffa3d5b1d53b6b93cf05e8d0aad443f5e08d592dd0710d05a0c21/handshake/0',
    fullnodeIp: '162.19.91.103',
    type: 'fullnode',
    network_addresses:
      '0x012d0400a21353dc05241807206bbdf23daeba081c3b4d019aa0bde9e2835fa6ddeceb4f2597529c89428c1e360800',
    fullnode_addresses:
      '0x012d0400a2135b67052618072028b9f4b32b0ffa3d5b1d53b6b93cf05e8d0aad443f5e08d592dd0710d05a0c210800',
    status: 'success',
    country: 'France',
    city: 'Strasbourg',
    lat: 48.5749,
    lon: 7.75168,
    query: '162.19.91.103',
  },
  {
    validator_index: 43,
    network:
      '/dns/aptos-v.hashcell.link/tcp/6180/noise-ik/25a5b33c0216a72b70ea7ffc01b6ac995f47a440a21a0012723ad5d7ee72d965/handshake/0',
    networkIp: '35.76.189.74',
    fullnode:
      '/dns/aptos-fn.hashcell.link/tcp/6182/noise-ik/a4bdf4a294da5858cc6a15901af1a115c6715ff3b0c150d46ce4051dde1cbb4d/handshake/0',
    fullnodeIp: '54.248.63.202',
    type: 'network',
    network_addresses:
      '0x013f0402156170746f732d762e6861736863656c6c2e6c696e6b052418072025a5b33c0216a72b70ea7ffc01b6ac995f47a440a21a0012723ad5d7ee72d9650800',
    fullnode_addresses:
      '0x01400402166170746f732d666e2e6861736863656c6c2e6c696e6b0526180720a4bdf4a294da5858cc6a15901af1a115c6715ff3b0c150d46ce4051dde1cbb4d0800',
    status: 'success',
    country: 'Japan',
    city: 'Tokyo',
    lat: 35.6895,
    lon: 139.692,
    query: '35.76.189.74',
  },
  {
    validator_index: 43,
    network:
      '/dns/aptos-v.hashcell.link/tcp/6180/noise-ik/25a5b33c0216a72b70ea7ffc01b6ac995f47a440a21a0012723ad5d7ee72d965/handshake/0',
    networkIp: '35.76.189.74',
    fullnode:
      '/dns/aptos-fn.hashcell.link/tcp/6182/noise-ik/a4bdf4a294da5858cc6a15901af1a115c6715ff3b0c150d46ce4051dde1cbb4d/handshake/0',
    fullnodeIp: '54.248.63.202',
    type: 'fullnode',
    network_addresses:
      '0x013f0402156170746f732d762e6861736863656c6c2e6c696e6b052418072025a5b33c0216a72b70ea7ffc01b6ac995f47a440a21a0012723ad5d7ee72d9650800',
    fullnode_addresses:
      '0x01400402166170746f732d666e2e6861736863656c6c2e6c696e6b0526180720a4bdf4a294da5858cc6a15901af1a115c6715ff3b0c150d46ce4051dde1cbb4d0800',
    status: 'success',
    country: 'Japan',
    city: 'Tokyo',
    lat: 35.6895,
    lon: 139.692,
    query: '54.248.63.202',
  },
  {
    validator_index: 27,
    network:
      '/dns/vn.aptos-mainnet.a41.io/tcp/6180/noise-ik/52acbe0ebca7fb8af162117f61522f08d9e06ebdbb25f86a8ebed9d1d14bc639/handshake/0',
    networkIp: '211.219.19.70',
    fullnode:
      '/dns/vfn.aptos-mainnet.a41.io/tcp/6182/noise-ik/a5a4a7b8c40779bf761df71ea2da33961285bbb99dbfcb7c8dac5fd3172b974c/handshake/0',
    fullnodeIp: '54.238.250.115',
    type: 'network',
    network_addresses:
      '0x0141040217766e2e6170746f732d6d61696e6e65742e6134312e696f052418072052acbe0ebca7fb8af162117f61522f08d9e06ebdbb25f86a8ebed9d1d14bc6390800',
    fullnode_addresses:
      '0x014204021876666e2e6170746f732d6d61696e6e65742e6134312e696f0526180720a5a4a7b8c40779bf761df71ea2da33961285bbb99dbfcb7c8dac5fd3172b974c0800',
    status: 'success',
    country: 'South Korea',
    city: 'Yongsan-gu',
    lat: 37.5355,
    lon: 126.9766,
    query: '211.219.19.70',
  },
  {
    validator_index: 27,
    network:
      '/dns/vn.aptos-mainnet.a41.io/tcp/6180/noise-ik/52acbe0ebca7fb8af162117f61522f08d9e06ebdbb25f86a8ebed9d1d14bc639/handshake/0',
    networkIp: '211.219.19.70',
    fullnode:
      '/dns/vfn.aptos-mainnet.a41.io/tcp/6182/noise-ik/a5a4a7b8c40779bf761df71ea2da33961285bbb99dbfcb7c8dac5fd3172b974c/handshake/0',
    fullnodeIp: '54.238.250.115',
    type: 'fullnode',
    network_addresses:
      '0x0141040217766e2e6170746f732d6d61696e6e65742e6134312e696f052418072052acbe0ebca7fb8af162117f61522f08d9e06ebdbb25f86a8ebed9d1d14bc6390800',
    fullnode_addresses:
      '0x014204021876666e2e6170746f732d6d61696e6e65742e6134312e696f0526180720a5a4a7b8c40779bf761df71ea2da33961285bbb99dbfcb7c8dac5fd3172b974c0800',
    status: 'success',
    country: 'Japan',
    city: 'Tokyo',
    lat: 35.6895,
    lon: 139.692,
    query: '54.238.250.115',
  },
  {
    validator_index: 22,
    network:
      '/dns/validator.aptos.nodes.guru/tcp/6180/noise-ik/3deb2d94d3d75438e2e3afdd3aec98cf57505baa329045fe05415b96260d8f44/handshake/0',
    networkIp: '149.28.155.134',
    fullnode:
      '/dns/vfn.aptos.nodes.guru/tcp/6182/noise-ik/0278a5b5fac22252c80fcdada55ab80dcfaf03ea9c91cb24ccc3ed54b5ef4f2b/handshake/0',
    fullnodeIp: '45.77.45.67',
    type: 'network',
    network_addresses:
      '0x014404021a76616c696461746f722e6170746f732e6e6f6465732e6775727505241807203deb2d94d3d75438e2e3afdd3aec98cf57505baa329045fe05415b96260d8f440800',
    fullnode_addresses:
      '0x013e04021476666e2e6170746f732e6e6f6465732e6775727505261807200278a5b5fac22252c80fcdada55ab80dcfaf03ea9c91cb24ccc3ed54b5ef4f2b0800',
    status: 'success',
    country: 'Singapore',
    city: 'Singapore',
    lat: 1.32123,
    lon: 103.695,
    query: '149.28.155.134',
  },
  {
    validator_index: 22,
    network:
      '/dns/validator.aptos.nodes.guru/tcp/6180/noise-ik/3deb2d94d3d75438e2e3afdd3aec98cf57505baa329045fe05415b96260d8f44/handshake/0',
    networkIp: '149.28.155.134',
    fullnode:
      '/dns/vfn.aptos.nodes.guru/tcp/6182/noise-ik/0278a5b5fac22252c80fcdada55ab80dcfaf03ea9c91cb24ccc3ed54b5ef4f2b/handshake/0',
    fullnodeIp: '45.77.45.67',
    type: 'fullnode',
    network_addresses:
      '0x014404021a76616c696461746f722e6170746f732e6e6f6465732e6775727505241807203deb2d94d3d75438e2e3afdd3aec98cf57505baa329045fe05415b96260d8f440800',
    fullnode_addresses:
      '0x013e04021476666e2e6170746f732e6e6f6465732e6775727505261807200278a5b5fac22252c80fcdada55ab80dcfaf03ea9c91cb24ccc3ed54b5ef4f2b0800',
    status: 'success',
    country: 'Singapore',
    city: 'Singapore',
    lat: 1.32123,
    lon: 103.695,
    query: '45.77.45.67',
  },
  {
    validator_index: 24,
    network:
      '/dns/aptos.lavenderfive.com/tcp/6180/noise-ik/9ae143a96188dbe3893016b5a13b0fc34ebb5927cea79062ed9730e8dd3b4e4c/handshake/0',
    networkIp: '65.109.21.207',
    fullnode:
      '/dns/vfn.aptos.lavenderfive.com/tcp/6182/noise-ik/d44f650aff8bcabb5a34d038443f1c0ecf9d6e5d5a0a2f4fb1b3492fd6f34717/handshake/0',
    fullnodeIp: '65.108.238.103',
    type: 'network',
    network_addresses:
      '0x01400402166170746f732e6c6176656e646572666976652e636f6d05241807209ae143a96188dbe3893016b5a13b0fc34ebb5927cea79062ed9730e8dd3b4e4c0800',
    fullnode_addresses:
      '0x014404021a76666e2e6170746f732e6c6176656e646572666976652e636f6d0526180720d44f650aff8bcabb5a34d038443f1c0ecf9d6e5d5a0a2f4fb1b3492fd6f347170800',
    status: 'success',
    country: 'Finland',
    city: 'Helsinki',
    lat: 60.1797,
    lon: 24.9344,
    query: '65.109.21.207',
  },
  {
    validator_index: 24,
    network:
      '/dns/aptos.lavenderfive.com/tcp/6180/noise-ik/9ae143a96188dbe3893016b5a13b0fc34ebb5927cea79062ed9730e8dd3b4e4c/handshake/0',
    networkIp: '65.109.21.207',
    fullnode:
      '/dns/vfn.aptos.lavenderfive.com/tcp/6182/noise-ik/d44f650aff8bcabb5a34d038443f1c0ecf9d6e5d5a0a2f4fb1b3492fd6f34717/handshake/0',
    fullnodeIp: '65.108.238.103',
    type: 'fullnode',
    network_addresses:
      '0x01400402166170746f732e6c6176656e646572666976652e636f6d05241807209ae143a96188dbe3893016b5a13b0fc34ebb5927cea79062ed9730e8dd3b4e4c0800',
    fullnode_addresses:
      '0x014404021a76666e2e6170746f732e6c6176656e646572666976652e636f6d0526180720d44f650aff8bcabb5a34d038443f1c0ecf9d6e5d5a0a2f4fb1b3492fd6f347170800',
    status: 'success',
    country: 'Finland',
    city: 'Helsinki',
    lat: 60.1797,
    lon: 24.9344,
    query: '65.108.238.103',
  },
  {
    validator_index: 25,
    network:
      '/ip4/212.95.51.89/tcp/6180/noise-ik/6915ad216c9624593cc42d9f354fdaf0f3d29390dd283c0f728658b692f8a84a/handshake/0',
    networkIp: '212.95.51.89',
    fullnode:
      '/ip4/212.95.51.91/tcp/6182/noise-ik/ccb91f858a6b2e552984be00dd07f87617ec783deb2ffcac3a37d9f028e00f2c/handshake/0',
    fullnodeIp: '212.95.51.91',
    type: 'network',
    network_addresses:
      '0x012d0400d45f335905241807206915ad216c9624593cc42d9f354fdaf0f3d29390dd283c0f728658b692f8a84a0800',
    fullnode_addresses:
      '0x012d0400d45f335b0526180720ccb91f858a6b2e552984be00dd07f87617ec783deb2ffcac3a37d9f028e00f2c0800',
    status: 'success',
    country: 'Germany',
    city: 'Frankfurt am Main',
    lat: 50.0961,
    lon: 8.62841,
    query: '212.95.51.89',
  },
  {
    validator_index: 25,
    network:
      '/ip4/212.95.51.89/tcp/6180/noise-ik/6915ad216c9624593cc42d9f354fdaf0f3d29390dd283c0f728658b692f8a84a/handshake/0',
    networkIp: '212.95.51.89',
    fullnode:
      '/ip4/212.95.51.91/tcp/6182/noise-ik/ccb91f858a6b2e552984be00dd07f87617ec783deb2ffcac3a37d9f028e00f2c/handshake/0',
    fullnodeIp: '212.95.51.91',
    type: 'fullnode',
    network_addresses:
      '0x012d0400d45f335905241807206915ad216c9624593cc42d9f354fdaf0f3d29390dd283c0f728658b692f8a84a0800',
    fullnode_addresses:
      '0x012d0400d45f335b0526180720ccb91f858a6b2e552984be00dd07f87617ec783deb2ffcac3a37d9f028e00f2c0800',
    status: 'success',
    country: 'Germany',
    city: 'Frankfurt am Main',
    lat: 50.0961,
    lon: 8.62841,
    query: '212.95.51.91',
  },
  {
    validator_index: 21,
    network:
      '/dns/aptos-validator.polkachu.com/tcp/6180/noise-ik/26100844272e2371b6beefa5e6001e9175656e378c7cfd2546aea8a64768a421/handshake/0',
    networkIp: '178.63.49.253',
    fullnode:
      '/dns/aptos-fullnode.polkachu.com/tcp/6182/noise-ik/1059b842b505b72eaf6cf3e898536c7fab73855c26b64725eb0ddc3fdeea8227/handshake/0',
    fullnodeIp: '104.21.50.241',
    type: 'network',
    network_addresses:
      '0x014604021c6170746f732d76616c696461746f722e706f6c6b616368752e636f6d052418072026100844272e2371b6beefa5e6001e9175656e378c7cfd2546aea8a64768a4210800',
    fullnode_addresses:
      '0x014504021b6170746f732d66756c6c6e6f64652e706f6c6b616368752e636f6d05261807201059b842b505b72eaf6cf3e898536c7fab73855c26b64725eb0ddc3fdeea82270800',
    status: 'success',
    country: 'Germany',
    city: 'Falkenstein',
    lat: 50.475,
    lon: 12.365,
    query: '178.63.49.253',
  },
  {
    validator_index: 21,
    network:
      '/dns/aptos-validator.polkachu.com/tcp/6180/noise-ik/26100844272e2371b6beefa5e6001e9175656e378c7cfd2546aea8a64768a421/handshake/0',
    networkIp: '178.63.49.253',
    fullnode:
      '/dns/aptos-fullnode.polkachu.com/tcp/6182/noise-ik/1059b842b505b72eaf6cf3e898536c7fab73855c26b64725eb0ddc3fdeea8227/handshake/0',
    fullnodeIp: '104.21.50.241',
    type: 'fullnode',
    network_addresses:
      '0x014604021c6170746f732d76616c696461746f722e706f6c6b616368752e636f6d052418072026100844272e2371b6beefa5e6001e9175656e378c7cfd2546aea8a64768a4210800',
    fullnode_addresses:
      '0x014504021b6170746f732d66756c6c6e6f64652e706f6c6b616368752e636f6d05261807201059b842b505b72eaf6cf3e898536c7fab73855c26b64725eb0ddc3fdeea82270800',
    status: 'success',
    country: 'Canada',
    city: 'Toronto',
    lat: 43.6532,
    lon: -79.3832,
    query: '104.21.50.241',
  },
  {
    validator_index: 26,
    network:
      '/dns/aptos.artifact-staking.io/tcp/6180/noise-ik/d38b6dd4d0055c4a6190c386990f77df1ee6b64ba1d91a21684fe7a22ef20656/handshake/0',
    networkIp: '131.153.202.61',
    fullnode:
      '/dns/aptos-fn.artifact-staking.io/tcp/6182/noise-ik/99664f17c7bcb1fdec94ffd867c588e0b30f5b145e05dbe455354de0cec2b32f/handshake/0',
    fullnodeIp: '45.76.22.25',
    type: 'network',
    network_addresses:
      '0x01430402196170746f732e61727469666163742d7374616b696e672e696f0524180720d38b6dd4d0055c4a6190c386990f77df1ee6b64ba1d91a21684fe7a22ef206560800',
    fullnode_addresses:
      '0x014604021c6170746f732d666e2e61727469666163742d7374616b696e672e696f052618072099664f17c7bcb1fdec94ffd867c588e0b30f5b145e05dbe455354de0cec2b32f0800',
    status: 'success',
    country: 'United States',
    city: 'Tempe',
    lat: 33.4214,
    lon: -111.974,
    query: '131.153.202.61',
  },
  {
    validator_index: 26,
    network:
      '/dns/aptos.artifact-staking.io/tcp/6180/noise-ik/d38b6dd4d0055c4a6190c386990f77df1ee6b64ba1d91a21684fe7a22ef20656/handshake/0',
    networkIp: '131.153.202.61',
    fullnode:
      '/dns/aptos-fn.artifact-staking.io/tcp/6182/noise-ik/99664f17c7bcb1fdec94ffd867c588e0b30f5b145e05dbe455354de0cec2b32f/handshake/0',
    fullnodeIp: '45.76.22.25',
    type: 'fullnode',
    network_addresses:
      '0x01430402196170746f732e61727469666163742d7374616b696e672e696f0524180720d38b6dd4d0055c4a6190c386990f77df1ee6b64ba1d91a21684fe7a22ef206560800',
    fullnode_addresses:
      '0x014604021c6170746f732d666e2e61727469666163742d7374616b696e672e696f052618072099664f17c7bcb1fdec94ffd867c588e0b30f5b145e05dbe455354de0cec2b32f0800',
    status: 'success',
    country: 'United States',
    city: 'Elk Grove Village',
    lat: 42.0048,
    lon: -87.9954,
    query: '45.76.22.25',
  },
  {
    validator_index: 89,
    network:
      '/dns/val1.mainnet.aptos.p2p.org/tcp/6180/noise-ik/2e37a37baff5767e45c200c3b724e62f0d4870ec21fe055a65951efc1cd63a74/handshake/0',
    networkIp: '23.109.159.108',
    fullnode:
      '/dns/full1.mainnet.aptos.p2p.org/tcp/6182/noise-ik/8c7ad723dd13cf91afb6b976c31db785113f7e95d1fec8593c9ac8bbfaa5dc7e/handshake/0',
    fullnodeIp: '23.109.159.132',
    type: 'network',
    network_addresses:
      '0x014404021a76616c312e6d61696e6e65742e6170746f732e7032702e6f726705241807202e37a37baff5767e45c200c3b724e62f0d4870ec21fe055a65951efc1cd63a740800',
    fullnode_addresses:
      '0x014504021b66756c6c312e6d61696e6e65742e6170746f732e7032702e6f726705261807208c7ad723dd13cf91afb6b976c31db785113f7e95d1fec8593c9ac8bbfaa5dc7e0800',
    status: 'success',
    country: 'Netherlands',
    city: 'Amsterdam',
    lat: 52.3676,
    lon: 4.90414,
    query: '23.109.159.108',
  },
  {
    validator_index: 89,
    network:
      '/dns/val1.mainnet.aptos.p2p.org/tcp/6180/noise-ik/2e37a37baff5767e45c200c3b724e62f0d4870ec21fe055a65951efc1cd63a74/handshake/0',
    networkIp: '23.109.159.108',
    fullnode:
      '/dns/full1.mainnet.aptos.p2p.org/tcp/6182/noise-ik/8c7ad723dd13cf91afb6b976c31db785113f7e95d1fec8593c9ac8bbfaa5dc7e/handshake/0',
    fullnodeIp: '23.109.159.132',
    type: 'fullnode',
    network_addresses:
      '0x014404021a76616c312e6d61696e6e65742e6170746f732e7032702e6f726705241807202e37a37baff5767e45c200c3b724e62f0d4870ec21fe055a65951efc1cd63a740800',
    fullnode_addresses:
      '0x014504021b66756c6c312e6d61696e6e65742e6170746f732e7032702e6f726705261807208c7ad723dd13cf91afb6b976c31db785113f7e95d1fec8593c9ac8bbfaa5dc7e0800',
    status: 'success',
    country: 'Netherlands',
    city: 'Amsterdam',
    lat: 52.3676,
    lon: 4.90414,
    query: '23.109.159.132',
  },
  {
    validator_index: 45,
    network:
      '/dns/aptosmainnet.mirny.io/tcp/6180/noise-ik/921164018679c764e6889809dbcc9bbcea45717f9dbd2f747614a10c528cd82a/handshake/0',
    networkIp: '54.180.168.197',
    fullnode:
      '/dns/aptosmainnetvfn.mirny.io/tcp/6182/noise-ik/39df8ecd826c37753af70a9641085e978280fce963d1ad2fe0d30f616d5d477f/handshake/0',
    fullnodeIp: '3.37.80.236',
    type: 'network',
    network_addresses:
      '0x013f0402156170746f736d61696e6e65742e6d69726e792e696f0524180720921164018679c764e6889809dbcc9bbcea45717f9dbd2f747614a10c528cd82a0800',
    fullnode_addresses:
      '0x01420402186170746f736d61696e6e657476666e2e6d69726e792e696f052618072039df8ecd826c37753af70a9641085e978280fce963d1ad2fe0d30f616d5d477f0800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.978,
    query: '54.180.168.197',
  },
  {
    validator_index: 45,
    network:
      '/dns/aptosmainnet.mirny.io/tcp/6180/noise-ik/921164018679c764e6889809dbcc9bbcea45717f9dbd2f747614a10c528cd82a/handshake/0',
    networkIp: '54.180.168.197',
    fullnode:
      '/dns/aptosmainnetvfn.mirny.io/tcp/6182/noise-ik/39df8ecd826c37753af70a9641085e978280fce963d1ad2fe0d30f616d5d477f/handshake/0',
    fullnodeIp: '3.37.80.236',
    type: 'fullnode',
    network_addresses:
      '0x013f0402156170746f736d61696e6e65742e6d69726e792e696f0524180720921164018679c764e6889809dbcc9bbcea45717f9dbd2f747614a10c528cd82a0800',
    fullnode_addresses:
      '0x01420402186170746f736d61696e6e657476666e2e6d69726e792e696f052618072039df8ecd826c37753af70a9641085e978280fce963d1ad2fe0d30f616d5d477f0800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.978,
    query: '3.37.80.236',
  },
  {
    validator_index: 78,
    network:
      '/dns/validator.aptos.dsrvlabs.net/tcp/6180/noise-ik/3a4def33aecebb139d4bf57f697e305f9241885cb30acae23f7ac9e354e4b95d/handshake/0',
    networkIp: '43.200.250.79',
    fullnode:
      '/dns/vfn.aptos.dsrvlabs.net/tcp/6182/noise-ik/df0eb85221ed6f116dd5caa1e7461d2ec2e3c6be4b252ac90246b3384e46d96d/handshake/0',
    fullnodeIp: '125.143.190.196',
    type: 'network',
    network_addresses:
      '0x014604021c76616c696461746f722e6170746f732e647372766c6162732e6e657405241807203a4def33aecebb139d4bf57f697e305f9241885cb30acae23f7ac9e354e4b95d0800',
    fullnode_addresses:
      '0x014004021676666e2e6170746f732e647372766c6162732e6e65740526180720df0eb85221ed6f116dd5caa1e7461d2ec2e3c6be4b252ac90246b3384e46d96d0800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.978,
    query: '43.200.250.79',
  },
  {
    validator_index: 78,
    network:
      '/dns/validator.aptos.dsrvlabs.net/tcp/6180/noise-ik/3a4def33aecebb139d4bf57f697e305f9241885cb30acae23f7ac9e354e4b95d/handshake/0',
    networkIp: '43.200.250.79',
    fullnode:
      '/dns/vfn.aptos.dsrvlabs.net/tcp/6182/noise-ik/df0eb85221ed6f116dd5caa1e7461d2ec2e3c6be4b252ac90246b3384e46d96d/handshake/0',
    fullnodeIp: '125.143.190.196',
    type: 'fullnode',
    network_addresses:
      '0x014604021c76616c696461746f722e6170746f732e647372766c6162732e6e657405241807203a4def33aecebb139d4bf57f697e305f9241885cb30acae23f7ac9e354e4b95d0800',
    fullnode_addresses:
      '0x014004021676666e2e6170746f732e647372766c6162732e6e65740526180720df0eb85221ed6f116dd5caa1e7461d2ec2e3c6be4b252ac90246b3384e46d96d0800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5576,
    lon: 126.9937,
    query: '125.143.190.196',
  },
  {
    validator_index: 81,
    network:
      '/dns/aptos-mainnet.aptos.chainbase.online/tcp/6180/noise-ik/eecf8fd6ba5f2fd886bad34913bc2045552b5757d8fe47f5fb4122b0cc170578/handshake/0',
    networkIp: '47.242.60.134',
    fullnode:
      '/dns/aptos-mainnet.aptos-full.chainbase.online/tcp/6182/noise-ik/c321bc56afc962a7b12a381c5bbb6863b16d3b0132d90be8d86c76ba6121b116/handshake/0',
    fullnodeIp: '8.210.92.227',
    type: 'network',
    network_addresses:
      '0x014e0402246170746f732d6d61696e6e65742e6170746f732e636861696e626173652e6f6e6c696e650524180720eecf8fd6ba5f2fd886bad34913bc2045552b5757d8fe47f5fb4122b0cc1705780800',
    fullnode_addresses:
      '0x01530402296170746f732d6d61696e6e65742e6170746f732d66756c6c2e636861696e626173652e6f6e6c696e650526180720c321bc56afc962a7b12a381c5bbb6863b16d3b0132d90be8d86c76ba6121b1160800',
    status: 'success',
    country: 'Hong Kong',
    city: 'Hong Kong',
    lat: 22.273,
    lon: 114.1498,
    query: '47.242.60.134',
  },
  {
    validator_index: 81,
    network:
      '/dns/aptos-mainnet.aptos.chainbase.online/tcp/6180/noise-ik/eecf8fd6ba5f2fd886bad34913bc2045552b5757d8fe47f5fb4122b0cc170578/handshake/0',
    networkIp: '47.242.60.134',
    fullnode:
      '/dns/aptos-mainnet.aptos-full.chainbase.online/tcp/6182/noise-ik/c321bc56afc962a7b12a381c5bbb6863b16d3b0132d90be8d86c76ba6121b116/handshake/0',
    fullnodeIp: '8.210.92.227',
    type: 'fullnode',
    network_addresses:
      '0x014e0402246170746f732d6d61696e6e65742e6170746f732e636861696e626173652e6f6e6c696e650524180720eecf8fd6ba5f2fd886bad34913bc2045552b5757d8fe47f5fb4122b0cc1705780800',
    fullnode_addresses:
      '0x01530402296170746f732d6d61696e6e65742e6170746f732d66756c6c2e636861696e626173652e6f6e6c696e650526180720c321bc56afc962a7b12a381c5bbb6863b16d3b0132d90be8d86c76ba6121b1160800',
    status: 'success',
    country: 'Hong Kong',
    city: 'Hong Kong',
    lat: 22.273,
    lon: 114.1498,
    query: '8.210.92.227',
  },
  {
    validator_index: 95,
    network:
      '/dns/validator.envoys-aptos.com/tcp/6180/noise-ik/93578af40d8d96eaaf80c2065201806beb88b32e276a28c5b5d80a15d0dbc243/handshake/0',
    networkIp: '54.76.176.127',
    fullnode:
      '/dns/fullnode.envoys-aptos.com/tcp/6182/noise-ik/fd3c256cd01390bfcf123983532dbd1402652204099ac67c1d3e91f0e3a7ad3c/handshake/0',
    fullnodeIp: '34.246.241.80',
    type: 'network',
    network_addresses:
      '0x014404021a76616c696461746f722e656e766f79732d6170746f732e636f6d052418072093578af40d8d96eaaf80c2065201806beb88b32e276a28c5b5d80a15d0dbc2430800',
    fullnode_addresses:
      '0x014304021966756c6c6e6f64652e656e766f79732d6170746f732e636f6d0526180720fd3c256cd01390bfcf123983532dbd1402652204099ac67c1d3e91f0e3a7ad3c0800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '54.76.176.127',
  },
  {
    validator_index: 95,
    network:
      '/dns/validator.envoys-aptos.com/tcp/6180/noise-ik/93578af40d8d96eaaf80c2065201806beb88b32e276a28c5b5d80a15d0dbc243/handshake/0',
    networkIp: '54.76.176.127',
    fullnode:
      '/dns/fullnode.envoys-aptos.com/tcp/6182/noise-ik/fd3c256cd01390bfcf123983532dbd1402652204099ac67c1d3e91f0e3a7ad3c/handshake/0',
    fullnodeIp: '34.246.241.80',
    type: 'fullnode',
    network_addresses:
      '0x014404021a76616c696461746f722e656e766f79732d6170746f732e636f6d052418072093578af40d8d96eaaf80c2065201806beb88b32e276a28c5b5d80a15d0dbc2430800',
    fullnode_addresses:
      '0x014304021966756c6c6e6f64652e656e766f79732d6170746f732e636f6d0526180720fd3c256cd01390bfcf123983532dbd1402652204099ac67c1d3e91f0e3a7ad3c0800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '34.246.241.80',
  },
  {
    validator_index: 51,
    network:
      '/dns/aptos-mainnet-vn.verse2.io/tcp/6180/noise-ik/2c215c409598707af21f9ab64add05f9fe73d4cbb2e0e26937a40d140aa9db11/handshake/0',
    networkIp: '15.165.62.90',
    fullnode:
      '/dns/aptos-mainnet-vfn.verse2.io/tcp/6182/noise-ik/5ec1236035e269b1c1d13406d139bd8fe47eeeb9bcb25e93b1e54ed177801d0d/handshake/0',
    fullnodeIp: '3.35.68.161',
    type: 'network',
    network_addresses:
      '0x014404021a6170746f732d6d61696e6e65742d766e2e7665727365322e696f05241807202c215c409598707af21f9ab64add05f9fe73d4cbb2e0e26937a40d140aa9db110800',
    fullnode_addresses:
      '0x014504021b6170746f732d6d61696e6e65742d76666e2e7665727365322e696f05261807205ec1236035e269b1c1d13406d139bd8fe47eeeb9bcb25e93b1e54ed177801d0d0800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.978,
    query: '15.165.62.90',
  },
  {
    validator_index: 51,
    network:
      '/dns/aptos-mainnet-vn.verse2.io/tcp/6180/noise-ik/2c215c409598707af21f9ab64add05f9fe73d4cbb2e0e26937a40d140aa9db11/handshake/0',
    networkIp: '15.165.62.90',
    fullnode:
      '/dns/aptos-mainnet-vfn.verse2.io/tcp/6182/noise-ik/5ec1236035e269b1c1d13406d139bd8fe47eeeb9bcb25e93b1e54ed177801d0d/handshake/0',
    fullnodeIp: '3.35.68.161',
    type: 'fullnode',
    network_addresses:
      '0x014404021a6170746f732d6d61696e6e65742d766e2e7665727365322e696f05241807202c215c409598707af21f9ab64add05f9fe73d4cbb2e0e26937a40d140aa9db110800',
    fullnode_addresses:
      '0x014504021b6170746f732d6d61696e6e65742d76666e2e7665727365322e696f05261807205ec1236035e269b1c1d13406d139bd8fe47eeeb9bcb25e93b1e54ed177801d0d0800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.978,
    query: '3.35.68.161',
  },
  {
    validator_index: 20,
    network:
      '/dns/vn.mainnet.aptos.despread.io/tcp/6180/noise-ik/e57f19f9f594969d37734976393b5c5db783b61799a89983c8a59f817d994002/handshake/0',
    networkIp: '3.35.180.201',
    fullnode:
      '/dns/vfn.mainnet.aptos.despread.io/tcp/6182/noise-ik/d4eabfa79a26a59f5701397277556c4f1343e4892bfecf13ef9401c1650f317a/handshake/0',
    fullnodeIp: '52.78.123.214',
    type: 'network',
    network_addresses:
      '0x014604021c766e2e6d61696e6e65742e6170746f732e64657370726561642e696f0524180720e57f19f9f594969d37734976393b5c5db783b61799a89983c8a59f817d9940020800',
    fullnode_addresses:
      '0x014704021d76666e2e6d61696e6e65742e6170746f732e64657370726561642e696f0526180720d4eabfa79a26a59f5701397277556c4f1343e4892bfecf13ef9401c1650f317a0800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.978,
    query: '3.35.180.201',
  },
  {
    validator_index: 20,
    network:
      '/dns/vn.mainnet.aptos.despread.io/tcp/6180/noise-ik/e57f19f9f594969d37734976393b5c5db783b61799a89983c8a59f817d994002/handshake/0',
    networkIp: '3.35.180.201',
    fullnode:
      '/dns/vfn.mainnet.aptos.despread.io/tcp/6182/noise-ik/d4eabfa79a26a59f5701397277556c4f1343e4892bfecf13ef9401c1650f317a/handshake/0',
    fullnodeIp: '52.78.123.214',
    type: 'fullnode',
    network_addresses:
      '0x014604021c766e2e6d61696e6e65742e6170746f732e64657370726561642e696f0524180720e57f19f9f594969d37734976393b5c5db783b61799a89983c8a59f817d9940020800',
    fullnode_addresses:
      '0x014704021d76666e2e6d61696e6e65742e6170746f732e64657370726561642e696f0526180720d4eabfa79a26a59f5701397277556c4f1343e4892bfecf13ef9401c1650f317a0800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.978,
    query: '52.78.123.214',
  },
  {
    validator_index: 84,
    network:
      '/ip4/80.190.129.50/tcp/6180/noise-ik/85078010bf8ac6581a58d3da584825245faecdde2d998ce7a0dddda98729a608/handshake/0',
    networkIp: '80.190.129.50',
    fullnode: null,
    type: 'network',
    network_addresses:
      '0x012d040050be8132052418072085078010bf8ac6581a58d3da584825245faecdde2d998ce7a0dddda98729a6080800',
    fullnode_addresses: '0x00',
    status: 'success',
    country: 'Germany',
    city: 'Nuremberg',
    lat: 49.3899,
    lon: 11.1771,
    query: '80.190.129.50',
  },
  {
    validator_index: 62,
    network:
      '/dns/aptos_v_mnnt_vcc_00001_dev_ca_central_1.dev.validationcloud.io/tcp/6180/noise-ik/e98c60a49f2041191ed453a3b178f5d860064c4958a48070002f41e094671e4a/handshake/0',
    networkIp: '3.98.144.240',
    fullnode:
      '/dns/aptos_n_mnnt_vcc_00001_dev_ca_central_1.dev.validationcloud.io/tcp/6182/noise-ik/a814aaa8ad4901bbfc08e75af3f0068435bd8ca134505b6d8f2c145c0e867743/handshake/0',
    fullnodeIp: '3.96.199.157',
    type: 'network',
    network_addresses:
      '0x016804023e6170746f735f765f6d6e6e745f7663635f30303030315f6465765f63615f63656e7472616c5f312e6465762e76616c69646174696f6e636c6f75642e696f0524180720e98c60a49f2041191ed453a3b178f5d860064c4958a48070002f41e094671e4a0800',
    fullnode_addresses:
      '0x016804023e6170746f735f6e5f6d6e6e745f7663635f30303030315f6465765f63615f63656e7472616c5f312e6465762e76616c69646174696f6e636c6f75642e696f0526180720a814aaa8ad4901bbfc08e75af3f0068435bd8ca134505b6d8f2c145c0e8677430800',
    status: 'success',
    country: 'Canada',
    city: 'Toronto',
    lat: 43.6532,
    lon: -79.3832,
    query: '3.98.144.240',
  },
  {
    validator_index: 62,
    network:
      '/dns/aptos_v_mnnt_vcc_00001_dev_ca_central_1.dev.validationcloud.io/tcp/6180/noise-ik/e98c60a49f2041191ed453a3b178f5d860064c4958a48070002f41e094671e4a/handshake/0',
    networkIp: '3.98.144.240',
    fullnode:
      '/dns/aptos_n_mnnt_vcc_00001_dev_ca_central_1.dev.validationcloud.io/tcp/6182/noise-ik/a814aaa8ad4901bbfc08e75af3f0068435bd8ca134505b6d8f2c145c0e867743/handshake/0',
    fullnodeIp: '3.96.199.157',
    type: 'fullnode',
    network_addresses:
      '0x016804023e6170746f735f765f6d6e6e745f7663635f30303030315f6465765f63615f63656e7472616c5f312e6465762e76616c69646174696f6e636c6f75642e696f0524180720e98c60a49f2041191ed453a3b178f5d860064c4958a48070002f41e094671e4a0800',
    fullnode_addresses:
      '0x016804023e6170746f735f6e5f6d6e6e745f7663635f30303030315f6465765f63615f63656e7472616c5f312e6465762e76616c69646174696f6e636c6f75642e696f0526180720a814aaa8ad4901bbfc08e75af3f0068435bd8ca134505b6d8f2c145c0e8677430800',
    status: 'success',
    country: 'Canada',
    city: 'Toronto',
    lat: 43.6532,
    lon: -79.3832,
    query: '3.96.199.157',
  },
  {
    validator_index: 63,
    network:
      '/ip4/18.176.46.103/tcp/6180/noise-ik/afa4342b513585903e76217289be010a3aa877e4e7613684ec38c0f39721d408/handshake/0',
    networkIp: '18.176.46.103',
    fullnode:
      '/ip4/52.196.219.24/tcp/6182/noise-ik/7d9348a4e93a17dbb73b511807710415ebe2a6c2c36ab404e2d63174407e625b/handshake/0',
    fullnodeIp: '52.196.219.24',
    type: 'network',
    network_addresses:
      '0x012d040012b02e670524180720afa4342b513585903e76217289be010a3aa877e4e7613684ec38c0f39721d4080800',
    fullnode_addresses:
      '0x012d040034c4db1805261807207d9348a4e93a17dbb73b511807710415ebe2a6c2c36ab404e2d63174407e625b0800',
    status: 'success',
    country: 'Japan',
    city: 'Tokyo',
    lat: 35.6895,
    lon: 139.692,
    query: '18.176.46.103',
  },
  {
    validator_index: 63,
    network:
      '/ip4/18.176.46.103/tcp/6180/noise-ik/afa4342b513585903e76217289be010a3aa877e4e7613684ec38c0f39721d408/handshake/0',
    networkIp: '18.176.46.103',
    fullnode:
      '/ip4/52.196.219.24/tcp/6182/noise-ik/7d9348a4e93a17dbb73b511807710415ebe2a6c2c36ab404e2d63174407e625b/handshake/0',
    fullnodeIp: '52.196.219.24',
    type: 'fullnode',
    network_addresses:
      '0x012d040012b02e670524180720afa4342b513585903e76217289be010a3aa877e4e7613684ec38c0f39721d4080800',
    fullnode_addresses:
      '0x012d040034c4db1805261807207d9348a4e93a17dbb73b511807710415ebe2a6c2c36ab404e2d63174407e625b0800',
    status: 'success',
    country: 'Japan',
    city: 'Tokyo',
    lat: 35.6895,
    lon: 139.692,
    query: '52.196.219.24',
  },
  {
    validator_index: 86,
    network:
      '/ip4/8.213.136.250/tcp/6180/noise-ik/9546817e02baf372047aa81577b298c0edbd95c528ad9fdf0260bc646a8ca219/handshake/0',
    networkIp: '8.213.136.250',
    fullnode:
      '/ip4/8.213.130.109/tcp/6182/noise-ik/7394f7d5b8e4103ae9dfc0bccd768ad65f7900104e336212db51e495a84e0d3b/handshake/0',
    fullnodeIp: '8.213.130.109',
    type: 'network',
    network_addresses:
      '0x012d040008d588fa05241807209546817e02baf372047aa81577b298c0edbd95c528ad9fdf0260bc646a8ca2190800',
    fullnode_addresses:
      '0x012d040008d5826d05261807207394f7d5b8e4103ae9dfc0bccd768ad65f7900104e336212db51e495a84e0d3b0800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.978,
    query: '8.213.136.250',
  },
  {
    validator_index: 86,
    network:
      '/ip4/8.213.136.250/tcp/6180/noise-ik/9546817e02baf372047aa81577b298c0edbd95c528ad9fdf0260bc646a8ca219/handshake/0',
    networkIp: '8.213.136.250',
    fullnode:
      '/ip4/8.213.130.109/tcp/6182/noise-ik/7394f7d5b8e4103ae9dfc0bccd768ad65f7900104e336212db51e495a84e0d3b/handshake/0',
    fullnodeIp: '8.213.130.109',
    type: 'fullnode',
    network_addresses:
      '0x012d040008d588fa05241807209546817e02baf372047aa81577b298c0edbd95c528ad9fdf0260bc646a8ca2190800',
    fullnode_addresses:
      '0x012d040008d5826d05261807207394f7d5b8e4103ae9dfc0bccd768ad65f7900104e336212db51e495a84e0d3b0800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.978,
    query: '8.213.130.109',
  },
  {
    validator_index: 29,
    network:
      '/dns/node.aptos.rhinostake.com/tcp/6180/noise-ik/72ca8564ccdc59ac0d7a836eae525caa666a0093e00d24d92b82c1ed65950566/handshake/0',
    networkIp: '15.204.141.186',
    fullnode:
      '/dns/vfn.aptos.rhinostake.com/tcp/6182/noise-ik/023c6d9ba8399b0b324d8aab7ddbeb8f076230e7b5500c014e71288e5c0b0107/handshake/0',
    fullnodeIp: '15.204.143.225',
    type: 'network',
    network_addresses:
      '0x01430402196e6f64652e6170746f732e7268696e6f7374616b652e636f6d052418072072ca8564ccdc59ac0d7a836eae525caa666a0093e00d24d92b82c1ed659505660800',
    fullnode_addresses:
      '0x014204021876666e2e6170746f732e7268696e6f7374616b652e636f6d0526180720023c6d9ba8399b0b324d8aab7ddbeb8f076230e7b5500c014e71288e5c0b01070800',
    status: 'success',
    country: 'United States',
    city: 'Reston',
    lat: 38.9609,
    lon: -77.3429,
    query: '15.204.141.186',
  },
  {
    validator_index: 29,
    network:
      '/dns/node.aptos.rhinostake.com/tcp/6180/noise-ik/72ca8564ccdc59ac0d7a836eae525caa666a0093e00d24d92b82c1ed65950566/handshake/0',
    networkIp: '15.204.141.186',
    fullnode:
      '/dns/vfn.aptos.rhinostake.com/tcp/6182/noise-ik/023c6d9ba8399b0b324d8aab7ddbeb8f076230e7b5500c014e71288e5c0b0107/handshake/0',
    fullnodeIp: '15.204.143.225',
    type: 'fullnode',
    network_addresses:
      '0x01430402196e6f64652e6170746f732e7268696e6f7374616b652e636f6d052418072072ca8564ccdc59ac0d7a836eae525caa666a0093e00d24d92b82c1ed659505660800',
    fullnode_addresses:
      '0x014204021876666e2e6170746f732e7268696e6f7374616b652e636f6d0526180720023c6d9ba8399b0b324d8aab7ddbeb8f076230e7b5500c014e71288e5c0b01070800',
    status: 'success',
    country: 'United States',
    city: 'Reston',
    lat: 38.9609,
    lon: -77.3429,
    query: '15.204.143.225',
  },
  {
    validator_index: 28,
    network:
      '/dns/aptos-validator.stakely.io/tcp/6180/noise-ik/796e34b3ffbd8396ad4ade8e397420bad3b5c49dee20a1dbcf8e6256105a1a2a/handshake/0',
    networkIp: '146.59.110.196',
    fullnode:
      '/dns/aptos-vfn.stakely.io/tcp/6182/noise-ik/5a86c97203a41684739f42733727d79a1390579f1ac460b453b752a8ccdc8c46/handshake/0',
    fullnodeIp: '93.115.25.15',
    type: 'network',
    network_addresses:
      '0x014404021a6170746f732d76616c696461746f722e7374616b656c792e696f0524180720796e34b3ffbd8396ad4ade8e397420bad3b5c49dee20a1dbcf8e6256105a1a2a0800',
    fullnode_addresses:
      '0x013e0402146170746f732d76666e2e7374616b656c792e696f05261807205a86c97203a41684739f42733727d79a1390579f1ac460b453b752a8ccdc8c460800',
    status: 'success',
    country: 'Poland',
    city: 'Warsaw',
    lat: 52.2251,
    lon: 21.0477,
    query: '146.59.110.196',
  },
  {
    validator_index: 28,
    network:
      '/dns/aptos-validator.stakely.io/tcp/6180/noise-ik/796e34b3ffbd8396ad4ade8e397420bad3b5c49dee20a1dbcf8e6256105a1a2a/handshake/0',
    networkIp: '146.59.110.196',
    fullnode:
      '/dns/aptos-vfn.stakely.io/tcp/6182/noise-ik/5a86c97203a41684739f42733727d79a1390579f1ac460b453b752a8ccdc8c46/handshake/0',
    fullnodeIp: '93.115.25.15',
    type: 'fullnode',
    network_addresses:
      '0x014404021a6170746f732d76616c696461746f722e7374616b656c792e696f0524180720796e34b3ffbd8396ad4ade8e397420bad3b5c49dee20a1dbcf8e6256105a1a2a0800',
    fullnode_addresses:
      '0x013e0402146170746f732d76666e2e7374616b656c792e696f05261807205a86c97203a41684739f42733727d79a1390579f1ac460b453b752a8ccdc8c460800',
    status: 'success',
    country: 'Lithuania',
    city: 'Šiauliai',
    lat: 55.921,
    lon: 23.2941,
    query: '93.115.25.15',
  },
  {
    validator_index: 79,
    network:
      '/dns/add6dfc3ccd12420ab961eccaebeb7ba-460d5d919261f748.elb.eu-west-1.amazonaws.com/tcp/6180/noise-ik/1ab75bf68e5123d816d70ba04ce4b1e7a7dc88fbcfd52afdc457ed3970e2917d/handshake/0',
    networkIp: '34.249.135.119',
    fullnode:
      '/dns/ace020825e9304f519c3797774f2b644-b9b82d7b4c88ac4d.elb.eu-west-1.amazonaws.com/tcp/6182/noise-ik/998fc9251996ab489b9a2ad89353a7b7ab3df5eddc39e090e10719185076c674/handshake/0',
    fullnodeIp: '99.80.213.166',
    type: 'network',
    network_addresses:
      '0x017704024d61646436646663336363643132343230616239363165636361656265623762612d343630643564393139323631663734382e656c622e65752d776573742d312e616d617a6f6e6177732e636f6d05241807201ab75bf68e5123d816d70ba04ce4b1e7a7dc88fbcfd52afdc457ed3970e2917d0800',
    fullnode_addresses:
      '0x017704024d61636530323038323565393330346635313963333739373737346632623634342d623962383264376234633838616334642e656c622e65752d776573742d312e616d617a6f6e6177732e636f6d0526180720998fc9251996ab489b9a2ad89353a7b7ab3df5eddc39e090e10719185076c6740800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '34.249.135.119',
  },
  {
    validator_index: 79,
    network:
      '/dns/add6dfc3ccd12420ab961eccaebeb7ba-460d5d919261f748.elb.eu-west-1.amazonaws.com/tcp/6180/noise-ik/1ab75bf68e5123d816d70ba04ce4b1e7a7dc88fbcfd52afdc457ed3970e2917d/handshake/0',
    networkIp: '34.249.135.119',
    fullnode:
      '/dns/ace020825e9304f519c3797774f2b644-b9b82d7b4c88ac4d.elb.eu-west-1.amazonaws.com/tcp/6182/noise-ik/998fc9251996ab489b9a2ad89353a7b7ab3df5eddc39e090e10719185076c674/handshake/0',
    fullnodeIp: '99.80.213.166',
    type: 'fullnode',
    network_addresses:
      '0x017704024d61646436646663336363643132343230616239363165636361656265623762612d343630643564393139323631663734382e656c622e65752d776573742d312e616d617a6f6e6177732e636f6d05241807201ab75bf68e5123d816d70ba04ce4b1e7a7dc88fbcfd52afdc457ed3970e2917d0800',
    fullnode_addresses:
      '0x017704024d61636530323038323565393330346635313963333739373737346632623634342d623962383264376234633838616334642e656c622e65752d776573742d312e616d617a6f6e6177732e636f6d0526180720998fc9251996ab489b9a2ad89353a7b7ab3df5eddc39e090e10719185076c6740800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '99.80.213.166',
  },
  {
    validator_index: 94,
    network:
      '/ip4/3.134.8.139/tcp/6180/noise-ik/9a2b88dc8e8ff41fad5a57f2827e7d82bed5346dbebb726d4492da39b2785430/handshake/0',
    networkIp: '3.134.8.139',
    fullnode:
      '/ip4/3.143.237.150/tcp/6182/noise-ik/21bf14465fb8f68027778f6626529779942662294240bd2912eed27a13f63121/handshake/0',
    fullnodeIp: '3.143.237.150',
    type: 'network',
    network_addresses:
      '0x012d04000386088b05241807209a2b88dc8e8ff41fad5a57f2827e7d82bed5346dbebb726d4492da39b27854300800',
    fullnode_addresses:
      '0x012d0400038fed96052618072021bf14465fb8f68027778f6626529779942662294240bd2912eed27a13f631210800',
    status: 'success',
    country: 'United States',
    city: 'Dublin',
    lat: 40.0992,
    lon: -83.1141,
    query: '3.134.8.139',
  },
  {
    validator_index: 94,
    network:
      '/ip4/3.134.8.139/tcp/6180/noise-ik/9a2b88dc8e8ff41fad5a57f2827e7d82bed5346dbebb726d4492da39b2785430/handshake/0',
    networkIp: '3.134.8.139',
    fullnode:
      '/ip4/3.143.237.150/tcp/6182/noise-ik/21bf14465fb8f68027778f6626529779942662294240bd2912eed27a13f63121/handshake/0',
    fullnodeIp: '3.143.237.150',
    type: 'fullnode',
    network_addresses:
      '0x012d04000386088b05241807209a2b88dc8e8ff41fad5a57f2827e7d82bed5346dbebb726d4492da39b27854300800',
    fullnode_addresses:
      '0x012d0400038fed96052618072021bf14465fb8f68027778f6626529779942662294240bd2912eed27a13f631210800',
    status: 'success',
    country: 'United States',
    city: 'Dublin',
    lat: 40.0992,
    lon: -83.1141,
    query: '3.143.237.150',
  },
  {
    validator_index: 50,
    network:
      '/dns/v.aptos.mainnet.republiccrypto-source.info/tcp/6180/noise-ik/deead78f3a93b7e5ea08d2ff1faeec5551a313284b002a79e019568717bae065/handshake/0',
    networkIp: '185.52.52.106',
    fullnode:
      '/dns/vfn.aptos.mainnet.republiccrypto-source.info/tcp/6182/noise-ik/c4587e699ffbdfc8a3fb3869513e8ef2fe903300bb26e4d39cf436163ba0d862/handshake/0',
    fullnodeIp: '162.19.91.120',
    type: 'network',
    network_addresses:
      '0x015404022a762e6170746f732e6d61696e6e65742e72657075626c696363727970746f2d736f757263652e696e666f0524180720deead78f3a93b7e5ea08d2ff1faeec5551a313284b002a79e019568717bae0650800',
    fullnode_addresses:
      '0x015604022c76666e2e6170746f732e6d61696e6e65742e72657075626c696363727970746f2d736f757263652e696e666f0526180720c4587e699ffbdfc8a3fb3869513e8ef2fe903300bb26e4d39cf436163ba0d8620800',
    status: 'success',
    country: 'Netherlands',
    city: 'Amsterdam',
    lat: 52.3716,
    lon: 4.8883,
    query: '185.52.52.106',
  },
  {
    validator_index: 50,
    network:
      '/dns/v.aptos.mainnet.republiccrypto-source.info/tcp/6180/noise-ik/deead78f3a93b7e5ea08d2ff1faeec5551a313284b002a79e019568717bae065/handshake/0',
    networkIp: '185.52.52.106',
    fullnode:
      '/dns/vfn.aptos.mainnet.republiccrypto-source.info/tcp/6182/noise-ik/c4587e699ffbdfc8a3fb3869513e8ef2fe903300bb26e4d39cf436163ba0d862/handshake/0',
    fullnodeIp: '162.19.91.120',
    type: 'fullnode',
    network_addresses:
      '0x015404022a762e6170746f732e6d61696e6e65742e72657075626c696363727970746f2d736f757263652e696e666f0524180720deead78f3a93b7e5ea08d2ff1faeec5551a313284b002a79e019568717bae0650800',
    fullnode_addresses:
      '0x015604022c76666e2e6170746f732e6d61696e6e65742e72657075626c696363727970746f2d736f757263652e696e666f0526180720c4587e699ffbdfc8a3fb3869513e8ef2fe903300bb26e4d39cf436163ba0d8620800',
    status: 'success',
    country: 'France',
    city: 'Strasbourg',
    lat: 48.5749,
    lon: 7.75168,
    query: '162.19.91.120',
  },
  {
    validator_index: 90,
    network:
      '/dns/validator-1.mainnet.aptos.fernlabs.xyz/tcp/6180/noise-ik/f041be3e090c155ad4a179573ab6dba344109a737518d3f2a2e998204686e813/handshake/0',
    networkIp: '13.50.23.21',
    fullnode:
      '/dns/validator-fullnode-1.mainnet.aptos.fernlabs.xyz/tcp/6182/noise-ik/f53410816b537208c698341387e3cc94419b08e07d3efab9a5aa9fe4837b3538/handshake/0',
    fullnodeIp: '13.50.75.97',
    type: 'network',
    network_addresses:
      '0x015004022676616c696461746f722d312e6d61696e6e65742e6170746f732e6665726e6c6162732e78797a0524180720f041be3e090c155ad4a179573ab6dba344109a737518d3f2a2e998204686e8130800',
    fullnode_addresses:
      '0x015904022f76616c696461746f722d66756c6c6e6f64652d312e6d61696e6e65742e6170746f732e6665726e6c6162732e78797a0526180720f53410816b537208c698341387e3cc94419b08e07d3efab9a5aa9fe4837b35380800',
    status: 'success',
    country: 'Sweden',
    city: 'Stockholm',
    lat: 59.3293,
    lon: 18.0686,
    query: '13.50.23.21',
  },
  {
    validator_index: 90,
    network:
      '/dns/validator-1.mainnet.aptos.fernlabs.xyz/tcp/6180/noise-ik/f041be3e090c155ad4a179573ab6dba344109a737518d3f2a2e998204686e813/handshake/0',
    networkIp: '13.50.23.21',
    fullnode:
      '/dns/validator-fullnode-1.mainnet.aptos.fernlabs.xyz/tcp/6182/noise-ik/f53410816b537208c698341387e3cc94419b08e07d3efab9a5aa9fe4837b3538/handshake/0',
    fullnodeIp: '13.50.75.97',
    type: 'fullnode',
    network_addresses:
      '0x015004022676616c696461746f722d312e6d61696e6e65742e6170746f732e6665726e6c6162732e78797a0524180720f041be3e090c155ad4a179573ab6dba344109a737518d3f2a2e998204686e8130800',
    fullnode_addresses:
      '0x015904022f76616c696461746f722d66756c6c6e6f64652d312e6d61696e6e65742e6170746f732e6665726e6c6162732e78797a0526180720f53410816b537208c698341387e3cc94419b08e07d3efab9a5aa9fe4837b35380800',
    status: 'success',
    country: 'Sweden',
    city: 'Stockholm',
    lat: 59.3293,
    lon: 18.0686,
    query: '13.50.75.97',
  },
  {
    validator_index: 98,
    network:
      '/dns/bd-aptos-main-validator-01.bdnodes.net/tcp/6180/noise-ik/debe55fb55f1fafc768dd6967d08948f9974ca44901502c9f2076997e4b73352/handshake/0',
    networkIp: '141.98.217.202',
    fullnode:
      '/dns/bd-aptos-main-validator-01.bdnodes.net/tcp/6182/noise-ik/385bc8a1f3769d87b80dd83884e5a3fce1dd825f3476ef4a131c51d0ebe91c1e/handshake/0',
    fullnodeIp: '141.98.217.202',
    type: 'network',
    network_addresses:
      '0x015004022662642d6170746f732d6d61696e2d76616c696461746f722d30312e62646e6f6465732e6e65740524180720debe55fb55f1fafc768dd6967d08948f9974ca44901502c9f2076997e4b733520800',
    fullnode_addresses:
      '0x015004022662642d6170746f732d6d61696e2d76616c696461746f722d30312e62646e6f6465732e6e65740526180720385bc8a1f3769d87b80dd83884e5a3fce1dd825f3476ef4a131c51d0ebe91c1e0800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.2603,
    query: '141.98.217.202',
  },
  {
    validator_index: 98,
    network:
      '/dns/bd-aptos-main-validator-01.bdnodes.net/tcp/6180/noise-ik/debe55fb55f1fafc768dd6967d08948f9974ca44901502c9f2076997e4b73352/handshake/0',
    networkIp: '141.98.217.202',
    fullnode:
      '/dns/bd-aptos-main-validator-01.bdnodes.net/tcp/6182/noise-ik/385bc8a1f3769d87b80dd83884e5a3fce1dd825f3476ef4a131c51d0ebe91c1e/handshake/0',
    fullnodeIp: '141.98.217.202',
    type: 'fullnode',
    network_addresses:
      '0x015004022662642d6170746f732d6d61696e2d76616c696461746f722d30312e62646e6f6465732e6e65740524180720debe55fb55f1fafc768dd6967d08948f9974ca44901502c9f2076997e4b733520800',
    fullnode_addresses:
      '0x015004022662642d6170746f732d6d61696e2d76616c696461746f722d30312e62646e6f6465732e6e65740526180720385bc8a1f3769d87b80dd83884e5a3fce1dd825f3476ef4a131c51d0ebe91c1e0800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.2603,
    query: '141.98.217.202',
  },
  {
    validator_index: 65,
    network:
      '/dns/aptos-mainnet.dorafactory.org/tcp/6180/noise-ik/00880e9f6a43d9af18b9fcb7e03560505bc01c48aaf058ee0fbb56f5c47abe45/handshake/0',
    networkIp: '13.212.174.145',
    fullnode:
      '/dns/aptos-mainnet-fn.dorafactory.org/tcp/6182/noise-ik/4f41d241aeea3d0652651dcb2bfad447910b50de7f5426fc773d5a7d62803553/handshake/0',
    fullnodeIp: '54.255.201.152',
    type: 'network',
    network_addresses:
      '0x014704021d6170746f732d6d61696e6e65742e646f7261666163746f72792e6f7267052418072000880e9f6a43d9af18b9fcb7e03560505bc01c48aaf058ee0fbb56f5c47abe450800',
    fullnode_addresses:
      '0x014a0402206170746f732d6d61696e6e65742d666e2e646f7261666163746f72792e6f726705261807204f41d241aeea3d0652651dcb2bfad447910b50de7f5426fc773d5a7d628035530800',
    status: 'success',
    country: 'Singapore',
    city: 'Singapore',
    lat: 1.28009,
    lon: 103.851,
    query: '13.212.174.145',
  },
  {
    validator_index: 65,
    network:
      '/dns/aptos-mainnet.dorafactory.org/tcp/6180/noise-ik/00880e9f6a43d9af18b9fcb7e03560505bc01c48aaf058ee0fbb56f5c47abe45/handshake/0',
    networkIp: '13.212.174.145',
    fullnode:
      '/dns/aptos-mainnet-fn.dorafactory.org/tcp/6182/noise-ik/4f41d241aeea3d0652651dcb2bfad447910b50de7f5426fc773d5a7d62803553/handshake/0',
    fullnodeIp: '54.255.201.152',
    type: 'fullnode',
    network_addresses:
      '0x014704021d6170746f732d6d61696e6e65742e646f7261666163746f72792e6f7267052418072000880e9f6a43d9af18b9fcb7e03560505bc01c48aaf058ee0fbb56f5c47abe450800',
    fullnode_addresses:
      '0x014a0402206170746f732d6d61696e6e65742d666e2e646f7261666163746f72792e6f726705261807204f41d241aeea3d0652651dcb2bfad447910b50de7f5426fc773d5a7d628035530800',
    status: 'success',
    country: 'Singapore',
    city: 'Singapore',
    lat: 1.28009,
    lon: 103.851,
    query: '54.255.201.152',
  },
  {
    validator_index: 91,
    network:
      '/dns/validator.mainnet.aptos.kiln.fi/tcp/6180/noise-ik/9f494f6dca7cd6b9ab007be4b69e4f8c5b23a21c358aa1e78a3aeac35a38de6e/handshake/0',
    networkIp: '15.161.109.10',
    fullnode:
      '/dns/node.mainnet.aptos.kiln.fi/tcp/6182/noise-ik/38c7ae31dc43715db025f377220199b643a2efd915293a82796bd9f2b8e76417/handshake/0',
    fullnodeIp: '15.161.253.11',
    type: 'network',
    network_addresses:
      '0x014904021f76616c696461746f722e6d61696e6e65742e6170746f732e6b696c6e2e666905241807209f494f6dca7cd6b9ab007be4b69e4f8c5b23a21c358aa1e78a3aeac35a38de6e0800',
    fullnode_addresses:
      '0x014404021a6e6f64652e6d61696e6e65742e6170746f732e6b696c6e2e6669052618072038c7ae31dc43715db025f377220199b643a2efd915293a82796bd9f2b8e764170800',
    status: 'success',
    country: 'Italy',
    city: 'Milan',
    lat: 45.4681,
    lon: 9.2011,
    query: '15.161.109.10',
  },
  {
    validator_index: 91,
    network:
      '/dns/validator.mainnet.aptos.kiln.fi/tcp/6180/noise-ik/9f494f6dca7cd6b9ab007be4b69e4f8c5b23a21c358aa1e78a3aeac35a38de6e/handshake/0',
    networkIp: '15.161.109.10',
    fullnode:
      '/dns/node.mainnet.aptos.kiln.fi/tcp/6182/noise-ik/38c7ae31dc43715db025f377220199b643a2efd915293a82796bd9f2b8e76417/handshake/0',
    fullnodeIp: '15.161.253.11',
    type: 'fullnode',
    network_addresses:
      '0x014904021f76616c696461746f722e6d61696e6e65742e6170746f732e6b696c6e2e666905241807209f494f6dca7cd6b9ab007be4b69e4f8c5b23a21c358aa1e78a3aeac35a38de6e0800',
    fullnode_addresses:
      '0x014404021a6e6f64652e6d61696e6e65742e6170746f732e6b696c6e2e6669052618072038c7ae31dc43715db025f377220199b643a2efd915293a82796bd9f2b8e764170800',
    status: 'success',
    country: 'Italy',
    city: 'Milan',
    lat: 45.4681,
    lon: 9.2011,
    query: '15.161.253.11',
  },
  {
    validator_index: 100,
    network:
      '/ip4/51.222.42.226/tcp/6180/noise-ik/d72de74ccf8828a01521418b9b6a7495d043fcf22ae171cf115a6ff26e0d3b0d/handshake/0',
    networkIp: '51.222.42.226',
    fullnode:
      '/ip4/51.79.21.182/tcp/6182/noise-ik/c6fde909bcc5a2728aade9b20037d0323151daa3420d4eb2dc0986438b51b873/handshake/0',
    fullnodeIp: '51.79.21.182',
    type: 'network',
    network_addresses:
      '0x012d040033de2ae20524180720d72de74ccf8828a01521418b9b6a7495d043fcf22ae171cf115a6ff26e0d3b0d0800',
    fullnode_addresses:
      '0x012d0400334f15b60526180720c6fde909bcc5a2728aade9b20037d0323151daa3420d4eb2dc0986438b51b8730800',
    status: 'success',
    country: 'Canada',
    city: 'Beauharnois',
    lat: 45.3161,
    lon: -73.8736,
    query: '51.222.42.226',
  },
  {
    validator_index: 100,
    network:
      '/ip4/51.222.42.226/tcp/6180/noise-ik/d72de74ccf8828a01521418b9b6a7495d043fcf22ae171cf115a6ff26e0d3b0d/handshake/0',
    networkIp: '51.222.42.226',
    fullnode:
      '/ip4/51.79.21.182/tcp/6182/noise-ik/c6fde909bcc5a2728aade9b20037d0323151daa3420d4eb2dc0986438b51b873/handshake/0',
    fullnodeIp: '51.79.21.182',
    type: 'fullnode',
    network_addresses:
      '0x012d040033de2ae20524180720d72de74ccf8828a01521418b9b6a7495d043fcf22ae171cf115a6ff26e0d3b0d0800',
    fullnode_addresses:
      '0x012d0400334f15b60526180720c6fde909bcc5a2728aade9b20037d0323151daa3420d4eb2dc0986438b51b8730800',
    status: 'success',
    country: 'Canada',
    city: 'Beauharnois',
    lat: 45.3161,
    lon: -73.8736,
    query: '51.79.21.182',
  },
  {
    validator_index: 30,
    network:
      '/dns/vn.mainnet.pontem.network/tcp/6180/noise-ik/090c9f0577db3336fdd71fe7a605f0b3e4610a03fb6efb1664715807cc92362a/handshake/0',
    networkIp: '138.68.107.106',
    fullnode:
      '/dns/vfn.mainnet.pontem.network/tcp/6182/noise-ik/f2f9fb5716fac75141eb5640d4a01fc395c187f1030d746b8d8c3c55dc990e58/handshake/0',
    fullnodeIp: '68.183.215.179',
    type: 'network',
    network_addresses:
      '0x0143040219766e2e6d61696e6e65742e706f6e74656d2e6e6574776f726b0524180720090c9f0577db3336fdd71fe7a605f0b3e4610a03fb6efb1664715807cc92362a0800',
    fullnode_addresses:
      '0x014404021a76666e2e6d61696e6e65742e706f6e74656d2e6e6574776f726b0526180720f2f9fb5716fac75141eb5640d4a01fc395c187f1030d746b8d8c3c55dc990e580800',
    status: 'success',
    country: 'Germany',
    city: 'Frankfurt am Main',
    lat: 50.1188,
    lon: 8.6843,
    query: '138.68.107.106',
  },
  {
    validator_index: 30,
    network:
      '/dns/vn.mainnet.pontem.network/tcp/6180/noise-ik/090c9f0577db3336fdd71fe7a605f0b3e4610a03fb6efb1664715807cc92362a/handshake/0',
    networkIp: '138.68.107.106',
    fullnode:
      '/dns/vfn.mainnet.pontem.network/tcp/6182/noise-ik/f2f9fb5716fac75141eb5640d4a01fc395c187f1030d746b8d8c3c55dc990e58/handshake/0',
    fullnodeIp: '68.183.215.179',
    type: 'fullnode',
    network_addresses:
      '0x0143040219766e2e6d61696e6e65742e706f6e74656d2e6e6574776f726b0524180720090c9f0577db3336fdd71fe7a605f0b3e4610a03fb6efb1664715807cc92362a0800',
    fullnode_addresses:
      '0x014404021a76666e2e6d61696e6e65742e706f6e74656d2e6e6574776f726b0526180720f2f9fb5716fac75141eb5640d4a01fc395c187f1030d746b8d8c3c55dc990e580800',
    status: 'success',
    country: 'Germany',
    city: 'Frankfurt am Main',
    lat: 50.1188,
    lon: 8.6843,
    query: '68.183.215.179',
  },
  {
    validator_index: 97,
    network:
      '/dns/aptos-foundation.prod-eks-ap-northeast-2.staked.cloud/tcp/6180/noise-ik/6a1c7b94f02a75a8d1934e9548abfdf666b04c7301c2aef516248c4d02af9624/handshake/0',
    networkIp: '3.39.128.79',
    fullnode:
      '/dns/aptos-foundation.prod-eks-ap-northeast-2.staked.cloud/tcp/6182/noise-ik/caf90fdcd8cf327a17b3e03b26e0f62a31a494a313c710b722f8c74ff877476d/handshake/0',
    fullnodeIp: '3.39.128.79',
    type: 'network',
    network_addresses:
      '0x015f0402356170746f732d666f756e646174696f6e2e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f756405241807206a1c7b94f02a75a8d1934e9548abfdf666b04c7301c2aef516248c4d02af96240800',
    fullnode_addresses:
      '0x015f0402356170746f732d666f756e646174696f6e2e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f75640526180720caf90fdcd8cf327a17b3e03b26e0f62a31a494a313c710b722f8c74ff877476d0800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.978,
    query: '3.39.128.79',
  },
  {
    validator_index: 97,
    network:
      '/dns/aptos-foundation.prod-eks-ap-northeast-2.staked.cloud/tcp/6180/noise-ik/6a1c7b94f02a75a8d1934e9548abfdf666b04c7301c2aef516248c4d02af9624/handshake/0',
    networkIp: '3.39.128.79',
    fullnode:
      '/dns/aptos-foundation.prod-eks-ap-northeast-2.staked.cloud/tcp/6182/noise-ik/caf90fdcd8cf327a17b3e03b26e0f62a31a494a313c710b722f8c74ff877476d/handshake/0',
    fullnodeIp: '3.39.128.79',
    type: 'fullnode',
    network_addresses:
      '0x015f0402356170746f732d666f756e646174696f6e2e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f756405241807206a1c7b94f02a75a8d1934e9548abfdf666b04c7301c2aef516248c4d02af96240800',
    fullnode_addresses:
      '0x015f0402356170746f732d666f756e646174696f6e2e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f75640526180720caf90fdcd8cf327a17b3e03b26e0f62a31a494a313c710b722f8c74ff877476d0800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.978,
    query: '3.39.128.79',
  },
  {
    validator_index: 56,
    network:
      '/dns/validator.aptos.main.metahash.biz/tcp/6180/noise-ik/7146cf496c4b54631d4d75e7491d0356f663affc8f8f5c44206c88992a605811/handshake/0',
    networkIp: '43.206.19.22',
    fullnode:
      '/dns/fullnode.aptos.main.metahash.biz/tcp/6182/noise-ik/ec699df05d5c6dd59b320cee3559a91ed4c7ce3b34ec4368de81eec867c4b17e/handshake/0',
    fullnodeIp: '54.199.60.204',
    type: 'network',
    network_addresses:
      '0x014b04022176616c696461746f722e6170746f732e6d61696e2e6d657461686173682e62697a05241807207146cf496c4b54631d4d75e7491d0356f663affc8f8f5c44206c88992a6058110800',
    fullnode_addresses:
      '0x014a04022066756c6c6e6f64652e6170746f732e6d61696e2e6d657461686173682e62697a0526180720ec699df05d5c6dd59b320cee3559a91ed4c7ce3b34ec4368de81eec867c4b17e0800',
    status: 'success',
    country: 'Japan',
    city: 'Tokyo',
    lat: 35.6895,
    lon: 139.692,
    query: '43.206.19.22',
  },
  {
    validator_index: 56,
    network:
      '/dns/validator.aptos.main.metahash.biz/tcp/6180/noise-ik/7146cf496c4b54631d4d75e7491d0356f663affc8f8f5c44206c88992a605811/handshake/0',
    networkIp: '43.206.19.22',
    fullnode:
      '/dns/fullnode.aptos.main.metahash.biz/tcp/6182/noise-ik/ec699df05d5c6dd59b320cee3559a91ed4c7ce3b34ec4368de81eec867c4b17e/handshake/0',
    fullnodeIp: '54.199.60.204',
    type: 'fullnode',
    network_addresses:
      '0x014b04022176616c696461746f722e6170746f732e6d61696e2e6d657461686173682e62697a05241807207146cf496c4b54631d4d75e7491d0356f663affc8f8f5c44206c88992a6058110800',
    fullnode_addresses:
      '0x014a04022066756c6c6e6f64652e6170746f732e6d61696e2e6d657461686173682e62697a0526180720ec699df05d5c6dd59b320cee3559a91ed4c7ce3b34ec4368de81eec867c4b17e0800',
    status: 'success',
    country: 'Japan',
    city: 'Tokyo',
    lat: 35.6895,
    lon: 139.692,
    query: '54.199.60.204',
  },
  {
    validator_index: 64,
    network:
      '/dns/aptos-main.everstake.one/tcp/6180/noise-ik/d300000c1e098811aa300a52916231960277f37e8c064f337c522c2fa391e73f/handshake/0',
    networkIp: '65.108.107.219',
    fullnode:
      '/dns/aptos-main-full.everstake.one/tcp/6182/noise-ik/780561ebf2a24c7a6c522cf90b722fadf851cb94049866998cf64e0399122103/handshake/0',
    fullnodeIp: '65.108.200.78',
    type: 'network',
    network_addresses:
      '0x01420402186170746f732d6d61696e2e657665727374616b652e6f6e650524180720d300000c1e098811aa300a52916231960277f37e8c064f337c522c2fa391e73f0800',
    fullnode_addresses:
      '0x014704021d6170746f732d6d61696e2d66756c6c2e657665727374616b652e6f6e650526180720780561ebf2a24c7a6c522cf90b722fadf851cb94049866998cf64e03991221030800',
    status: 'success',
    country: 'Finland',
    city: 'Helsinki',
    lat: 60.1797,
    lon: 24.9344,
    query: '65.108.107.219',
  },
  {
    validator_index: 64,
    network:
      '/dns/aptos-main.everstake.one/tcp/6180/noise-ik/d300000c1e098811aa300a52916231960277f37e8c064f337c522c2fa391e73f/handshake/0',
    networkIp: '65.108.107.219',
    fullnode:
      '/dns/aptos-main-full.everstake.one/tcp/6182/noise-ik/780561ebf2a24c7a6c522cf90b722fadf851cb94049866998cf64e0399122103/handshake/0',
    fullnodeIp: '65.108.200.78',
    type: 'fullnode',
    network_addresses:
      '0x01420402186170746f732d6d61696e2e657665727374616b652e6f6e650524180720d300000c1e098811aa300a52916231960277f37e8c064f337c522c2fa391e73f0800',
    fullnode_addresses:
      '0x014704021d6170746f732d6d61696e2d66756c6c2e657665727374616b652e6f6e650526180720780561ebf2a24c7a6c522cf90b722fadf851cb94049866998cf64e03991221030800',
    status: 'success',
    country: 'Finland',
    city: 'Helsinki',
    lat: 60.1797,
    lon: 24.9344,
    query: '65.108.200.78',
  },
  {
    validator_index: 14,
    network:
      '/dns/validator.ae9475fe-7618-4d5f-ac43-d8c1a2feaba4.aptos.bison.run/tcp/6180/noise-ik/bba6d61673ab7d99e1ad29184b6a1ad82bc9078f9c6fd78b553203336f44af33/handshake/0',
    networkIp: '52.51.67.31',
    fullnode:
      '/dns/fullnode.ae9475fe-7618-4d5f-ac43-d8c1a2feaba4.aptos.bison.run/tcp/6182/noise-ik/be95776bcbab2ba8ed26327e92ff47b27878b221fdcd185372856825c2be5545/handshake/0',
    fullnodeIp: '63.35.241.196',
    type: 'network',
    network_addresses:
      '0x016804023e76616c696461746f722e61653934373566652d373631382d346435662d616334332d6438633161326665616261342e6170746f732e6269736f6e2e72756e0524180720bba6d61673ab7d99e1ad29184b6a1ad82bc9078f9c6fd78b553203336f44af330800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e61653934373566652d373631382d346435662d616334332d6438633161326665616261342e6170746f732e6269736f6e2e72756e0526180720be95776bcbab2ba8ed26327e92ff47b27878b221fdcd185372856825c2be55450800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '52.51.67.31',
  },
  {
    validator_index: 14,
    network:
      '/dns/validator.ae9475fe-7618-4d5f-ac43-d8c1a2feaba4.aptos.bison.run/tcp/6180/noise-ik/bba6d61673ab7d99e1ad29184b6a1ad82bc9078f9c6fd78b553203336f44af33/handshake/0',
    networkIp: '52.51.67.31',
    fullnode:
      '/dns/fullnode.ae9475fe-7618-4d5f-ac43-d8c1a2feaba4.aptos.bison.run/tcp/6182/noise-ik/be95776bcbab2ba8ed26327e92ff47b27878b221fdcd185372856825c2be5545/handshake/0',
    fullnodeIp: '63.35.241.196',
    type: 'fullnode',
    network_addresses:
      '0x016804023e76616c696461746f722e61653934373566652d373631382d346435662d616334332d6438633161326665616261342e6170746f732e6269736f6e2e72756e0524180720bba6d61673ab7d99e1ad29184b6a1ad82bc9078f9c6fd78b553203336f44af330800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e61653934373566652d373631382d346435662d616334332d6438633161326665616261342e6170746f732e6269736f6e2e72756e0526180720be95776bcbab2ba8ed26327e92ff47b27878b221fdcd185372856825c2be55450800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '63.35.241.196',
  },
  {
    validator_index: 68,
    network:
      '/dns/validator-3.mainnet.aptos.fernlabs.xyz/tcp/6180/noise-ik/3c0b863e1d96af1ef66e6dff455ece0d23dc1a1bbd26c9b013053df02e111014/handshake/0',
    networkIp: '13.50.63.175',
    fullnode:
      '/dns/validator-fullnode-3.mainnet.aptos.fernlabs.xyz/tcp/6182/noise-ik/8b1d292074f4ea74cd8956ff34edc09a9e68252705cf1d4040885983f8b70e37/handshake/0',
    fullnodeIp: '13.53.111.105',
    type: 'network',
    network_addresses:
      '0x015004022676616c696461746f722d332e6d61696e6e65742e6170746f732e6665726e6c6162732e78797a05241807203c0b863e1d96af1ef66e6dff455ece0d23dc1a1bbd26c9b013053df02e1110140800',
    fullnode_addresses:
      '0x015904022f76616c696461746f722d66756c6c6e6f64652d332e6d61696e6e65742e6170746f732e6665726e6c6162732e78797a05261807208b1d292074f4ea74cd8956ff34edc09a9e68252705cf1d4040885983f8b70e370800',
    status: 'success',
    country: 'Sweden',
    city: 'Stockholm',
    lat: 59.3293,
    lon: 18.0686,
    query: '13.50.63.175',
  },
  {
    validator_index: 68,
    network:
      '/dns/validator-3.mainnet.aptos.fernlabs.xyz/tcp/6180/noise-ik/3c0b863e1d96af1ef66e6dff455ece0d23dc1a1bbd26c9b013053df02e111014/handshake/0',
    networkIp: '13.50.63.175',
    fullnode:
      '/dns/validator-fullnode-3.mainnet.aptos.fernlabs.xyz/tcp/6182/noise-ik/8b1d292074f4ea74cd8956ff34edc09a9e68252705cf1d4040885983f8b70e37/handshake/0',
    fullnodeIp: '13.53.111.105',
    type: 'fullnode',
    network_addresses:
      '0x015004022676616c696461746f722d332e6d61696e6e65742e6170746f732e6665726e6c6162732e78797a05241807203c0b863e1d96af1ef66e6dff455ece0d23dc1a1bbd26c9b013053df02e1110140800',
    fullnode_addresses:
      '0x015904022f76616c696461746f722d66756c6c6e6f64652d332e6d61696e6e65742e6170746f732e6665726e6c6162732e78797a05261807208b1d292074f4ea74cd8956ff34edc09a9e68252705cf1d4040885983f8b70e370800',
    status: 'success',
    country: 'Sweden',
    city: 'Stockholm',
    lat: 59.3293,
    lon: 18.0686,
    query: '13.53.111.105',
  },
  {
    validator_index: 73,
    network:
      '/dns/aeuw1b-ccn-aptos-mainnet-val2.jumpisolated.com/tcp/6180/noise-ik/fd0d681d4aa63696df5847ed36d72415e580fd097889b9f2be3b65e31868d87d/handshake/0',
    networkIp: '52.48.114.128',
    fullnode:
      '/dns/aeuw1c-ccn-aptos-mainnet-api2.jumpisolated.com/tcp/6182/noise-ik/e51632cf8004506fff126942cda2a3e0fe6b8ca1edaac4e1fa5a5383a2b3f037/handshake/0',
    fullnodeIp: '3.248.237.138',
    type: 'network',
    network_addresses:
      '0x015804022e6165757731622d63636e2d6170746f732d6d61696e6e65742d76616c322e6a756d7069736f6c617465642e636f6d0524180720fd0d681d4aa63696df5847ed36d72415e580fd097889b9f2be3b65e31868d87d0800',
    fullnode_addresses:
      '0x015804022e6165757731632d63636e2d6170746f732d6d61696e6e65742d617069322e6a756d7069736f6c617465642e636f6d0526180720e51632cf8004506fff126942cda2a3e0fe6b8ca1edaac4e1fa5a5383a2b3f0370800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '52.48.114.128',
  },
  {
    validator_index: 73,
    network:
      '/dns/aeuw1b-ccn-aptos-mainnet-val2.jumpisolated.com/tcp/6180/noise-ik/fd0d681d4aa63696df5847ed36d72415e580fd097889b9f2be3b65e31868d87d/handshake/0',
    networkIp: '52.48.114.128',
    fullnode:
      '/dns/aeuw1c-ccn-aptos-mainnet-api2.jumpisolated.com/tcp/6182/noise-ik/e51632cf8004506fff126942cda2a3e0fe6b8ca1edaac4e1fa5a5383a2b3f037/handshake/0',
    fullnodeIp: '3.248.237.138',
    type: 'fullnode',
    network_addresses:
      '0x015804022e6165757731622d63636e2d6170746f732d6d61696e6e65742d76616c322e6a756d7069736f6c617465642e636f6d0524180720fd0d681d4aa63696df5847ed36d72415e580fd097889b9f2be3b65e31868d87d0800',
    fullnode_addresses:
      '0x015804022e6165757731632d63636e2d6170746f732d6d61696e6e65742d617069322e6a756d7069736f6c617465642e636f6d0526180720e51632cf8004506fff126942cda2a3e0fe6b8ca1edaac4e1fa5a5383a2b3f0370800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '3.248.237.138',
  },
  {
    validator_index: 5,
    network:
      '/dns/validator.c732975f-9cfc-424c-939d-b641d4dd6958.aptos.bison.run/tcp/6180/noise-ik/0a8a0e488fab70579a3738c6fe89ea7174929b17150f9acba89a9e1bd8dca05f/handshake/0',
    networkIp: '52.77.25.49',
    fullnode:
      '/dns/fullnode.c732975f-9cfc-424c-939d-b641d4dd6958.aptos.bison.run/tcp/6182/noise-ik/24b40039b5fc279e1367e3243503bd25e9e661f698ea9378d635054c1829c314/handshake/0',
    fullnodeIp: '18.140.36.153',
    type: 'network',
    network_addresses:
      '0x016804023e76616c696461746f722e63373332393735662d396366632d343234632d393339642d6236343164346464363935382e6170746f732e6269736f6e2e72756e05241807200a8a0e488fab70579a3738c6fe89ea7174929b17150f9acba89a9e1bd8dca05f0800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e63373332393735662d396366632d343234632d393339642d6236343164346464363935382e6170746f732e6269736f6e2e72756e052618072024b40039b5fc279e1367e3243503bd25e9e661f698ea9378d635054c1829c3140800',
    status: 'success',
    country: 'Singapore',
    city: 'Singapore',
    lat: 1.28009,
    lon: 103.851,
    query: '52.77.25.49',
  },
  {
    validator_index: 5,
    network:
      '/dns/validator.c732975f-9cfc-424c-939d-b641d4dd6958.aptos.bison.run/tcp/6180/noise-ik/0a8a0e488fab70579a3738c6fe89ea7174929b17150f9acba89a9e1bd8dca05f/handshake/0',
    networkIp: '52.77.25.49',
    fullnode:
      '/dns/fullnode.c732975f-9cfc-424c-939d-b641d4dd6958.aptos.bison.run/tcp/6182/noise-ik/24b40039b5fc279e1367e3243503bd25e9e661f698ea9378d635054c1829c314/handshake/0',
    fullnodeIp: '18.140.36.153',
    type: 'fullnode',
    network_addresses:
      '0x016804023e76616c696461746f722e63373332393735662d396366632d343234632d393339642d6236343164346464363935382e6170746f732e6269736f6e2e72756e05241807200a8a0e488fab70579a3738c6fe89ea7174929b17150f9acba89a9e1bd8dca05f0800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e63373332393735662d396366632d343234632d393339642d6236343164346464363935382e6170746f732e6269736f6e2e72756e052618072024b40039b5fc279e1367e3243503bd25e9e661f698ea9378d635054c1829c3140800',
    status: 'success',
    country: 'Singapore',
    city: 'Singapore',
    lat: 1.28009,
    lon: 103.851,
    query: '18.140.36.153',
  },
  {
    validator_index: 87,
    network:
      '/dns/validator-5.mainnet.aptos.fernlabs.xyz/tcp/6180/noise-ik/cc838539e573dcd56db50d59800ca125b2c993f570ab30b738bd3fc81a19c209/handshake/0',
    networkIp: '78.141.203.120',
    fullnode:
      '/dns/validator-fullnode-5.mainnet.aptos.fernlabs.xyz/tcp/6182/noise-ik/457db7d0cd72b14261da6c33d97cb91c34adb3a8be7ec1e06978f01da5723b03/handshake/0',
    fullnodeIp: '95.179.207.163',
    type: 'network',
    network_addresses:
      '0x015004022676616c696461746f722d352e6d61696e6e65742e6170746f732e6665726e6c6162732e78797a0524180720cc838539e573dcd56db50d59800ca125b2c993f570ab30b738bd3fc81a19c2090800',
    fullnode_addresses:
      '0x015904022f76616c696461746f722d66756c6c6e6f64652d352e6d61696e6e65742e6170746f732e6665726e6c6162732e78797a0526180720457db7d0cd72b14261da6c33d97cb91c34adb3a8be7ec1e06978f01da5723b030800',
    status: 'success',
    country: 'United Kingdom',
    city: 'London',
    lat: 51.5128,
    lon: -0.0638,
    query: '78.141.203.120',
  },
  {
    validator_index: 87,
    network:
      '/dns/validator-5.mainnet.aptos.fernlabs.xyz/tcp/6180/noise-ik/cc838539e573dcd56db50d59800ca125b2c993f570ab30b738bd3fc81a19c209/handshake/0',
    networkIp: '78.141.203.120',
    fullnode:
      '/dns/validator-fullnode-5.mainnet.aptos.fernlabs.xyz/tcp/6182/noise-ik/457db7d0cd72b14261da6c33d97cb91c34adb3a8be7ec1e06978f01da5723b03/handshake/0',
    fullnodeIp: '95.179.207.163',
    type: 'fullnode',
    network_addresses:
      '0x015004022676616c696461746f722d352e6d61696e6e65742e6170746f732e6665726e6c6162732e78797a0524180720cc838539e573dcd56db50d59800ca125b2c993f570ab30b738bd3fc81a19c2090800',
    fullnode_addresses:
      '0x015904022f76616c696461746f722d66756c6c6e6f64652d352e6d61696e6e65742e6170746f732e6665726e6c6162732e78797a0526180720457db7d0cd72b14261da6c33d97cb91c34adb3a8be7ec1e06978f01da5723b030800',
    status: 'success',
    country: 'United Kingdom',
    city: 'London',
    lat: 51.5128,
    lon: -0.0638,
    query: '95.179.207.163',
  },
  {
    validator_index: 10,
    network:
      '/dns/validator.baa57d9f-8c15-4166-b325-e86b85e5ddc2.aptos.bison.run/tcp/6180/noise-ik/0b578f1272eabe2467ae680de0ca698f9953cf7ca64b1b9e81257916b95f185d/handshake/0',
    networkIp: '54.72.14.22',
    fullnode:
      '/dns/fullnode.baa57d9f-8c15-4166-b325-e86b85e5ddc2.aptos.bison.run/tcp/6182/noise-ik/8c644b35effd0474541ac2dae89c1f0d39d12cd778187ef0922e50cf9163a076/handshake/0',
    fullnodeIp: '34.242.56.1',
    type: 'network',
    network_addresses:
      '0x016804023e76616c696461746f722e62616135376439662d386331352d343136362d623332352d6538366238356535646463322e6170746f732e6269736f6e2e72756e05241807200b578f1272eabe2467ae680de0ca698f9953cf7ca64b1b9e81257916b95f185d0800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e62616135376439662d386331352d343136362d623332352d6538366238356535646463322e6170746f732e6269736f6e2e72756e05261807208c644b35effd0474541ac2dae89c1f0d39d12cd778187ef0922e50cf9163a0760800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '54.72.14.22',
  },
  {
    validator_index: 10,
    network:
      '/dns/validator.baa57d9f-8c15-4166-b325-e86b85e5ddc2.aptos.bison.run/tcp/6180/noise-ik/0b578f1272eabe2467ae680de0ca698f9953cf7ca64b1b9e81257916b95f185d/handshake/0',
    networkIp: '54.72.14.22',
    fullnode:
      '/dns/fullnode.baa57d9f-8c15-4166-b325-e86b85e5ddc2.aptos.bison.run/tcp/6182/noise-ik/8c644b35effd0474541ac2dae89c1f0d39d12cd778187ef0922e50cf9163a076/handshake/0',
    fullnodeIp: '34.242.56.1',
    type: 'fullnode',
    network_addresses:
      '0x016804023e76616c696461746f722e62616135376439662d386331352d343136362d623332352d6538366238356535646463322e6170746f732e6269736f6e2e72756e05241807200b578f1272eabe2467ae680de0ca698f9953cf7ca64b1b9e81257916b95f185d0800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e62616135376439662d386331352d343136362d623332352d6538366238356535646463322e6170746f732e6269736f6e2e72756e05261807208c644b35effd0474541ac2dae89c1f0d39d12cd778187ef0922e50cf9163a0760800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '34.242.56.1',
  },
  {
    validator_index: 12,
    network:
      '/dns/validator.14ab83ed-f362-4d0a-abde-bcf2975eaf7f.aptos.bison.run/tcp/6180/noise-ik/b4b3879b916a6f5965c11fb2fb00cb593faa3948e42b415570f8eb793021963f/handshake/0',
    networkIp: '52.208.184.192',
    fullnode:
      '/dns/fullnode.14ab83ed-f362-4d0a-abde-bcf2975eaf7f.aptos.bison.run/tcp/6182/noise-ik/3b5ef16a2eb7ff81e00f36db1679e642485198c1a7cd2c145d6641d53497b973/handshake/0',
    fullnodeIp: '52.51.129.12',
    type: 'network',
    network_addresses:
      '0x016804023e76616c696461746f722e31346162383365642d663336322d346430612d616264652d6263663239373565616637662e6170746f732e6269736f6e2e72756e0524180720b4b3879b916a6f5965c11fb2fb00cb593faa3948e42b415570f8eb793021963f0800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e31346162383365642d663336322d346430612d616264652d6263663239373565616637662e6170746f732e6269736f6e2e72756e05261807203b5ef16a2eb7ff81e00f36db1679e642485198c1a7cd2c145d6641d53497b9730800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '52.208.184.192',
  },
  {
    validator_index: 12,
    network:
      '/dns/validator.14ab83ed-f362-4d0a-abde-bcf2975eaf7f.aptos.bison.run/tcp/6180/noise-ik/b4b3879b916a6f5965c11fb2fb00cb593faa3948e42b415570f8eb793021963f/handshake/0',
    networkIp: '52.208.184.192',
    fullnode:
      '/dns/fullnode.14ab83ed-f362-4d0a-abde-bcf2975eaf7f.aptos.bison.run/tcp/6182/noise-ik/3b5ef16a2eb7ff81e00f36db1679e642485198c1a7cd2c145d6641d53497b973/handshake/0',
    fullnodeIp: '52.51.129.12',
    type: 'fullnode',
    network_addresses:
      '0x016804023e76616c696461746f722e31346162383365642d663336322d346430612d616264652d6263663239373565616637662e6170746f732e6269736f6e2e72756e0524180720b4b3879b916a6f5965c11fb2fb00cb593faa3948e42b415570f8eb793021963f0800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e31346162383365642d663336322d346430612d616264652d6263663239373565616637662e6170746f732e6269736f6e2e72756e05261807203b5ef16a2eb7ff81e00f36db1679e642485198c1a7cd2c145d6641d53497b9730800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '52.51.129.12',
  },
  {
    validator_index: 13,
    network:
      '/dns/validator.17de0f1e-adf0-457e-af3a-a2889f479988.aptos.bison.run/tcp/6180/noise-ik/5687a66f779c513eebe7cd1a760c6c746e355805ca7f80f8886e13f73c01ce41/handshake/0',
    networkIp: '99.80.249.224',
    fullnode:
      '/dns/fullnode.17de0f1e-adf0-457e-af3a-a2889f479988.aptos.bison.run/tcp/6182/noise-ik/611accf59c7523ea5ae74e6f46bf3a463853634f084bdff08ce24562dfc19937/handshake/0',
    fullnodeIp: '54.170.142.46',
    type: 'network',
    network_addresses:
      '0x016804023e76616c696461746f722e31376465306631652d616466302d343537652d616633612d6132383839663437393938382e6170746f732e6269736f6e2e72756e05241807205687a66f779c513eebe7cd1a760c6c746e355805ca7f80f8886e13f73c01ce410800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e31376465306631652d616466302d343537652d616633612d6132383839663437393938382e6170746f732e6269736f6e2e72756e0526180720611accf59c7523ea5ae74e6f46bf3a463853634f084bdff08ce24562dfc199370800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '99.80.249.224',
  },
  {
    validator_index: 13,
    network:
      '/dns/validator.17de0f1e-adf0-457e-af3a-a2889f479988.aptos.bison.run/tcp/6180/noise-ik/5687a66f779c513eebe7cd1a760c6c746e355805ca7f80f8886e13f73c01ce41/handshake/0',
    networkIp: '99.80.249.224',
    fullnode:
      '/dns/fullnode.17de0f1e-adf0-457e-af3a-a2889f479988.aptos.bison.run/tcp/6182/noise-ik/611accf59c7523ea5ae74e6f46bf3a463853634f084bdff08ce24562dfc19937/handshake/0',
    fullnodeIp: '54.170.142.46',
    type: 'fullnode',
    network_addresses:
      '0x016804023e76616c696461746f722e31376465306631652d616466302d343537652d616633612d6132383839663437393938382e6170746f732e6269736f6e2e72756e05241807205687a66f779c513eebe7cd1a760c6c746e355805ca7f80f8886e13f73c01ce410800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e31376465306631652d616466302d343537652d616633612d6132383839663437393938382e6170746f732e6269736f6e2e72756e0526180720611accf59c7523ea5ae74e6f46bf3a463853634f084bdff08ce24562dfc199370800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '54.170.142.46',
  },
  {
    validator_index: 11,
    network:
      '/dns/validator.099a5cfb-3911-474d-8e3c-eac77aba4a01.aptos.bison.run/tcp/6180/noise-ik/1fa4d461bb477164f04ced216e33df5df1c12f7ad79c094d4c1535e78101e94a/handshake/0',
    networkIp: '34.247.45.28',
    fullnode:
      '/dns/fullnode.099a5cfb-3911-474d-8e3c-eac77aba4a01.aptos.bison.run/tcp/6182/noise-ik/5a454c36531c127eb63a0849ba57fe5b2f31e7082348256d7c9fef2f9a2f916b/handshake/0',
    fullnodeIp: '54.73.94.203',
    type: 'network',
    network_addresses:
      '0x016804023e76616c696461746f722e30393961356366622d333931312d343734642d386533632d6561633737616261346130312e6170746f732e6269736f6e2e72756e05241807201fa4d461bb477164f04ced216e33df5df1c12f7ad79c094d4c1535e78101e94a0800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e30393961356366622d333931312d343734642d386533632d6561633737616261346130312e6170746f732e6269736f6e2e72756e05261807205a454c36531c127eb63a0849ba57fe5b2f31e7082348256d7c9fef2f9a2f916b0800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '34.247.45.28',
  },
  {
    validator_index: 11,
    network:
      '/dns/validator.099a5cfb-3911-474d-8e3c-eac77aba4a01.aptos.bison.run/tcp/6180/noise-ik/1fa4d461bb477164f04ced216e33df5df1c12f7ad79c094d4c1535e78101e94a/handshake/0',
    networkIp: '34.247.45.28',
    fullnode:
      '/dns/fullnode.099a5cfb-3911-474d-8e3c-eac77aba4a01.aptos.bison.run/tcp/6182/noise-ik/5a454c36531c127eb63a0849ba57fe5b2f31e7082348256d7c9fef2f9a2f916b/handshake/0',
    fullnodeIp: '54.73.94.203',
    type: 'fullnode',
    network_addresses:
      '0x016804023e76616c696461746f722e30393961356366622d333931312d343734642d386533632d6561633737616261346130312e6170746f732e6269736f6e2e72756e05241807201fa4d461bb477164f04ced216e33df5df1c12f7ad79c094d4c1535e78101e94a0800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e30393961356366622d333931312d343734642d386533632d6561633737616261346130312e6170746f732e6269736f6e2e72756e05261807205a454c36531c127eb63a0849ba57fe5b2f31e7082348256d7c9fef2f9a2f916b0800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '54.73.94.203',
  },
  {
    validator_index: 88,
    network:
      '/dns/validator-4.mainnet.aptos.fernlabs.xyz/tcp/6180/noise-ik/80cbd7bce6a02432b3232b058d9eaa139cfe83d5b4fcd6cb9b39588bccb99c13/handshake/0',
    networkIp: '209.222.30.118',
    fullnode:
      '/dns/validator-fullnode-4.mainnet.aptos.fernlabs.xyz/tcp/6182/noise-ik/60835c63a4b29f3669dd98db0b61c9e42fbf68dcbccdb5c4dafb686e4a29cc2f/handshake/0',
    fullnodeIp: '108.61.172.164',
    type: 'network',
    network_addresses:
      '0x015004022676616c696461746f722d342e6d61696e6e65742e6170746f732e6665726e6c6162732e78797a052418072080cbd7bce6a02432b3232b058d9eaa139cfe83d5b4fcd6cb9b39588bccb99c130800',
    fullnode_addresses:
      '0x015904022f76616c696461746f722d66756c6c6e6f64652d342e6d61696e6e65742e6170746f732e6665726e6c6162732e78797a052618072060835c63a4b29f3669dd98db0b61c9e42fbf68dcbccdb5c4dafb686e4a29cc2f0800',
    status: 'success',
    country: 'United Kingdom',
    city: 'London',
    lat: 51.5128,
    lon: -0.0638,
    query: '209.222.30.118',
  },
  {
    validator_index: 88,
    network:
      '/dns/validator-4.mainnet.aptos.fernlabs.xyz/tcp/6180/noise-ik/80cbd7bce6a02432b3232b058d9eaa139cfe83d5b4fcd6cb9b39588bccb99c13/handshake/0',
    networkIp: '209.222.30.118',
    fullnode:
      '/dns/validator-fullnode-4.mainnet.aptos.fernlabs.xyz/tcp/6182/noise-ik/60835c63a4b29f3669dd98db0b61c9e42fbf68dcbccdb5c4dafb686e4a29cc2f/handshake/0',
    fullnodeIp: '108.61.172.164',
    type: 'fullnode',
    network_addresses:
      '0x015004022676616c696461746f722d342e6d61696e6e65742e6170746f732e6665726e6c6162732e78797a052418072080cbd7bce6a02432b3232b058d9eaa139cfe83d5b4fcd6cb9b39588bccb99c130800',
    fullnode_addresses:
      '0x015904022f76616c696461746f722d66756c6c6e6f64652d342e6d61696e6e65742e6170746f732e6665726e6c6162732e78797a052618072060835c63a4b29f3669dd98db0b61c9e42fbf68dcbccdb5c4dafb686e4a29cc2f0800',
    status: 'success',
    country: 'United Kingdom',
    city: 'London',
    lat: 51.5128,
    lon: -0.0638,
    query: '108.61.172.164',
  },
  {
    validator_index: 54,
    network:
      '/ip4/34.71.235.84/tcp/6180/noise-ik/fb37ed6b0ee35d4745c306260bb93dbcbb634d13c9de2c2dad671ce50258fa1c/handshake/0',
    networkIp: '34.71.235.84',
    fullnode:
      '/ip4/34.172.21.179/tcp/6182/noise-ik/881dfe88146b45afa1162dcd0ba84f8717a7e28df5733f6e947257a0a42b566b/handshake/0',
    fullnodeIp: '34.172.21.179',
    type: 'network',
    network_addresses:
      '0x012d04002247eb540524180720fb37ed6b0ee35d4745c306260bb93dbcbb634d13c9de2c2dad671ce50258fa1c0800',
    fullnode_addresses:
      '0x012d040022ac15b30526180720881dfe88146b45afa1162dcd0ba84f8717a7e28df5733f6e947257a0a42b566b0800',
    status: 'success',
    country: 'United States',
    city: 'Council Bluffs',
    lat: 41.2619,
    lon: -95.8608,
    query: '34.71.235.84',
  },
  {
    validator_index: 54,
    network:
      '/ip4/34.71.235.84/tcp/6180/noise-ik/fb37ed6b0ee35d4745c306260bb93dbcbb634d13c9de2c2dad671ce50258fa1c/handshake/0',
    networkIp: '34.71.235.84',
    fullnode:
      '/ip4/34.172.21.179/tcp/6182/noise-ik/881dfe88146b45afa1162dcd0ba84f8717a7e28df5733f6e947257a0a42b566b/handshake/0',
    fullnodeIp: '34.172.21.179',
    type: 'fullnode',
    network_addresses:
      '0x012d04002247eb540524180720fb37ed6b0ee35d4745c306260bb93dbcbb634d13c9de2c2dad671ce50258fa1c0800',
    fullnode_addresses:
      '0x012d040022ac15b30526180720881dfe88146b45afa1162dcd0ba84f8717a7e28df5733f6e947257a0a42b566b0800',
    status: 'success',
    country: 'United States',
    city: 'Council Bluffs',
    lat: 41.2619,
    lon: -95.8608,
    query: '34.172.21.179',
  },
  {
    validator_index: 76,
    network:
      '/dns/aptos-staked-9.prod-eks-ap-northeast-2.staked.cloud/tcp/6180/noise-ik/3d4c4d7ca1fc727294276cc0e3528e6bacffef62c9f568277ecc753f679d5a44/handshake/0',
    networkIp: '3.35.153.99',
    fullnode:
      '/dns/aptos-staked-9.prod-eks-ap-northeast-2.staked.cloud/tcp/6182/noise-ik/0107c779fec9e3377141df658823e11af7c1afd1c2a89a3f7a87a4d848362638/handshake/0',
    fullnodeIp: '3.35.153.99',
    type: 'network',
    network_addresses:
      '0x015d0402336170746f732d7374616b65642d392e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f756405241807203d4c4d7ca1fc727294276cc0e3528e6bacffef62c9f568277ecc753f679d5a440800',
    fullnode_addresses:
      '0x015d0402336170746f732d7374616b65642d392e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f756405261807200107c779fec9e3377141df658823e11af7c1afd1c2a89a3f7a87a4d8483626380800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.978,
    query: '3.35.153.99',
  },
  {
    validator_index: 76,
    network:
      '/dns/aptos-staked-9.prod-eks-ap-northeast-2.staked.cloud/tcp/6180/noise-ik/3d4c4d7ca1fc727294276cc0e3528e6bacffef62c9f568277ecc753f679d5a44/handshake/0',
    networkIp: '3.35.153.99',
    fullnode:
      '/dns/aptos-staked-9.prod-eks-ap-northeast-2.staked.cloud/tcp/6182/noise-ik/0107c779fec9e3377141df658823e11af7c1afd1c2a89a3f7a87a4d848362638/handshake/0',
    fullnodeIp: '3.35.153.99',
    type: 'fullnode',
    network_addresses:
      '0x015d0402336170746f732d7374616b65642d392e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f756405241807203d4c4d7ca1fc727294276cc0e3528e6bacffef62c9f568277ecc753f679d5a440800',
    fullnode_addresses:
      '0x015d0402336170746f732d7374616b65642d392e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f756405261807200107c779fec9e3377141df658823e11af7c1afd1c2a89a3f7a87a4d8483626380800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.978,
    query: '3.35.153.99',
  },
  {
    validator_index: 74,
    network:
      '/dns/aptos-staked-7.prod-eks-ap-northeast-2.staked.cloud/tcp/6180/noise-ik/48599775ee3163f6ffd29f5f974ab022ab91d8e434dd78f450faf8bbf179805f/handshake/0',
    networkIp: '13.51.10.10',
    fullnode:
      '/dns/aptos-staked-7.prod-eks-ap-northeast-2.staked.cloud/tcp/6182/noise-ik/5999fef10691a72fb9d2e6017bd9365866ad71054a502e61c46155aa67cd1253/handshake/0',
    fullnodeIp: '13.51.10.10',
    type: 'network',
    network_addresses:
      '0x015d0402336170746f732d7374616b65642d372e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f7564052418072048599775ee3163f6ffd29f5f974ab022ab91d8e434dd78f450faf8bbf179805f0800',
    fullnode_addresses:
      '0x015d0402336170746f732d7374616b65642d372e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f756405261807205999fef10691a72fb9d2e6017bd9365866ad71054a502e61c46155aa67cd12530800',
    status: 'success',
    country: 'Sweden',
    city: 'Stockholm',
    lat: 59.3293,
    lon: 18.0686,
    query: '13.51.10.10',
  },
  {
    validator_index: 74,
    network:
      '/dns/aptos-staked-7.prod-eks-ap-northeast-2.staked.cloud/tcp/6180/noise-ik/48599775ee3163f6ffd29f5f974ab022ab91d8e434dd78f450faf8bbf179805f/handshake/0',
    networkIp: '13.51.10.10',
    fullnode:
      '/dns/aptos-staked-7.prod-eks-ap-northeast-2.staked.cloud/tcp/6182/noise-ik/5999fef10691a72fb9d2e6017bd9365866ad71054a502e61c46155aa67cd1253/handshake/0',
    fullnodeIp: '13.51.10.10',
    type: 'fullnode',
    network_addresses:
      '0x015d0402336170746f732d7374616b65642d372e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f7564052418072048599775ee3163f6ffd29f5f974ab022ab91d8e434dd78f450faf8bbf179805f0800',
    fullnode_addresses:
      '0x015d0402336170746f732d7374616b65642d372e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f756405261807205999fef10691a72fb9d2e6017bd9365866ad71054a502e61c46155aa67cd12530800',
    status: 'success',
    country: 'Sweden',
    city: 'Stockholm',
    lat: 59.3293,
    lon: 18.0686,
    query: '13.51.10.10',
  },
  {
    validator_index: 75,
    network:
      '/dns/aptos-staked-10.prod-eks-ap-northeast-2.staked.cloud/tcp/6180/noise-ik/bd0945dda017c10ffe1018a8f22021e74e6ff5bb2ce93adbea3ac87dd57d3e2c/handshake/0',
    networkIp: '3.36.20.55',
    fullnode:
      '/dns/aptos-staked-10.prod-eks-ap-northeast-2.staked.cloud/tcp/6182/noise-ik/de19a7e3c610e34652d25032c951ac49799c1dac087456e14ad3f1e18d8b4832/handshake/0',
    fullnodeIp: '3.36.20.55',
    type: 'network',
    network_addresses:
      '0x015e0402346170746f732d7374616b65642d31302e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f75640524180720bd0945dda017c10ffe1018a8f22021e74e6ff5bb2ce93adbea3ac87dd57d3e2c0800',
    fullnode_addresses:
      '0x015e0402346170746f732d7374616b65642d31302e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f75640526180720de19a7e3c610e34652d25032c951ac49799c1dac087456e14ad3f1e18d8b48320800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.978,
    query: '3.36.20.55',
  },
  {
    validator_index: 75,
    network:
      '/dns/aptos-staked-10.prod-eks-ap-northeast-2.staked.cloud/tcp/6180/noise-ik/bd0945dda017c10ffe1018a8f22021e74e6ff5bb2ce93adbea3ac87dd57d3e2c/handshake/0',
    networkIp: '3.36.20.55',
    fullnode:
      '/dns/aptos-staked-10.prod-eks-ap-northeast-2.staked.cloud/tcp/6182/noise-ik/de19a7e3c610e34652d25032c951ac49799c1dac087456e14ad3f1e18d8b4832/handshake/0',
    fullnodeIp: '3.36.20.55',
    type: 'fullnode',
    network_addresses:
      '0x015e0402346170746f732d7374616b65642d31302e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f75640524180720bd0945dda017c10ffe1018a8f22021e74e6ff5bb2ce93adbea3ac87dd57d3e2c0800',
    fullnode_addresses:
      '0x015e0402346170746f732d7374616b65642d31302e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f75640526180720de19a7e3c610e34652d25032c951ac49799c1dac087456e14ad3f1e18d8b48320800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.978,
    query: '3.36.20.55',
  },
  {
    validator_index: 6,
    network:
      '/dns/validator.b5e7e23d-0672-49b5-9139-565ea0d1a16e.aptos.herd.run/tcp/6180/noise-ik/ea0f65faab5667196dfe0142048c0108232432e6073bc84cb706d5ae2be61939/handshake/0',
    networkIp: '34.92.150.32',
    fullnode:
      '/dns/fullnode.b5e7e23d-0672-49b5-9139-565ea0d1a16e.aptos.herd.run/tcp/6182/noise-ik/430c1f838c93e4bc80a4a65fad1fd5448328a0d6d0cfb342e680fb196a68da39/handshake/0',
    fullnodeIp: '34.96.229.183',
    type: 'network',
    network_addresses:
      '0x016704023d76616c696461746f722e62356537653233642d303637322d343962352d393133392d3536356561306431613136652e6170746f732e686572642e72756e0524180720ea0f65faab5667196dfe0142048c0108232432e6073bc84cb706d5ae2be619390800',
    fullnode_addresses:
      '0x016604023c66756c6c6e6f64652e62356537653233642d303637322d343962352d393133392d3536356561306431613136652e6170746f732e686572642e72756e0526180720430c1f838c93e4bc80a4a65fad1fd5448328a0d6d0cfb342e680fb196a68da390800',
    status: 'success',
    country: 'Hong Kong',
    city: 'Hong Kong',
    lat: 22.3193,
    lon: 114.1693,
    query: '34.92.150.32',
  },
  {
    validator_index: 6,
    network:
      '/dns/validator.b5e7e23d-0672-49b5-9139-565ea0d1a16e.aptos.herd.run/tcp/6180/noise-ik/ea0f65faab5667196dfe0142048c0108232432e6073bc84cb706d5ae2be61939/handshake/0',
    networkIp: '34.92.150.32',
    fullnode:
      '/dns/fullnode.b5e7e23d-0672-49b5-9139-565ea0d1a16e.aptos.herd.run/tcp/6182/noise-ik/430c1f838c93e4bc80a4a65fad1fd5448328a0d6d0cfb342e680fb196a68da39/handshake/0',
    fullnodeIp: '34.96.229.183',
    type: 'fullnode',
    network_addresses:
      '0x016704023d76616c696461746f722e62356537653233642d303637322d343962352d393133392d3536356561306431613136652e6170746f732e686572642e72756e0524180720ea0f65faab5667196dfe0142048c0108232432e6073bc84cb706d5ae2be619390800',
    fullnode_addresses:
      '0x016604023c66756c6c6e6f64652e62356537653233642d303637322d343962352d393133392d3536356561306431613136652e6170746f732e686572642e72756e0526180720430c1f838c93e4bc80a4a65fad1fd5448328a0d6d0cfb342e680fb196a68da390800',
    status: 'success',
    country: 'Hong Kong',
    city: 'Hong Kong',
    lat: 22.3193,
    lon: 114.1693,
    query: '34.96.229.183',
  },
  {
    validator_index: 9,
    network:
      '/dns/validator.ad6f7ef7-feb4-4988-9310-a618dbed79cc.aptos.bison.run/tcp/6180/noise-ik/881e24349a7196a8e38cfd40adb3a088d14425fa00c94d88e84317b5e16b954a/handshake/0',
    networkIp: '99.80.147.44',
    fullnode:
      '/dns/fullnode.ad6f7ef7-feb4-4988-9310-a618dbed79cc.aptos.bison.run/tcp/6182/noise-ik/217d1a560ad31663a848ab55c6c5119ed8d445e3fa1ae83bba5eaef0d33bbe14/handshake/0',
    fullnodeIp: '46.137.28.41',
    type: 'network',
    network_addresses:
      '0x016804023e76616c696461746f722e61643666376566372d666562342d343938382d393331302d6136313864626564373963632e6170746f732e6269736f6e2e72756e0524180720881e24349a7196a8e38cfd40adb3a088d14425fa00c94d88e84317b5e16b954a0800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e61643666376566372d666562342d343938382d393331302d6136313864626564373963632e6170746f732e6269736f6e2e72756e0526180720217d1a560ad31663a848ab55c6c5119ed8d445e3fa1ae83bba5eaef0d33bbe140800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '99.80.147.44',
  },
  {
    validator_index: 9,
    network:
      '/dns/validator.ad6f7ef7-feb4-4988-9310-a618dbed79cc.aptos.bison.run/tcp/6180/noise-ik/881e24349a7196a8e38cfd40adb3a088d14425fa00c94d88e84317b5e16b954a/handshake/0',
    networkIp: '99.80.147.44',
    fullnode:
      '/dns/fullnode.ad6f7ef7-feb4-4988-9310-a618dbed79cc.aptos.bison.run/tcp/6182/noise-ik/217d1a560ad31663a848ab55c6c5119ed8d445e3fa1ae83bba5eaef0d33bbe14/handshake/0',
    fullnodeIp: '46.137.28.41',
    type: 'fullnode',
    network_addresses:
      '0x016804023e76616c696461746f722e61643666376566372d666562342d343938382d393331302d6136313864626564373963632e6170746f732e6269736f6e2e72756e0524180720881e24349a7196a8e38cfd40adb3a088d14425fa00c94d88e84317b5e16b954a0800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e61643666376566372d666562342d343938382d393331302d6136313864626564373963632e6170746f732e6269736f6e2e72756e0526180720217d1a560ad31663a848ab55c6c5119ed8d445e3fa1ae83bba5eaef0d33bbe140800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '46.137.28.41',
  },
  {
    validator_index: 57,
    network:
      '/dns/hashed-validator.aptos.dsrvlabs.net/tcp/6180/noise-ik/8bec6dab190d536b8b929bacba57f8b0188310f953a5e1b401ed537398b02b51/handshake/0',
    networkIp: '3.214.69.174',
    fullnode:
      '/dns/hashed-vfn.aptos.dsrvlabs.net/tcp/6182/noise-ik/d59f925295707a5ab0483b4831b816b7eb399f30f7dfb1d3a5bb54eac1569838/handshake/0',
    fullnodeIp: '3.234.76.202',
    type: 'network',
    network_addresses:
      '0x014d0402236861736865642d76616c696461746f722e6170746f732e647372766c6162732e6e657405241807208bec6dab190d536b8b929bacba57f8b0188310f953a5e1b401ed537398b02b510800',
    fullnode_addresses:
      '0x014704021d6861736865642d76666e2e6170746f732e647372766c6162732e6e65740526180720d59f925295707a5ab0483b4831b816b7eb399f30f7dfb1d3a5bb54eac15698380800',
    status: 'success',
    country: 'United States',
    city: 'Ashburn',
    lat: 39.0438,
    lon: -77.4874,
    query: '3.214.69.174',
  },
  {
    validator_index: 57,
    network:
      '/dns/hashed-validator.aptos.dsrvlabs.net/tcp/6180/noise-ik/8bec6dab190d536b8b929bacba57f8b0188310f953a5e1b401ed537398b02b51/handshake/0',
    networkIp: '3.214.69.174',
    fullnode:
      '/dns/hashed-vfn.aptos.dsrvlabs.net/tcp/6182/noise-ik/d59f925295707a5ab0483b4831b816b7eb399f30f7dfb1d3a5bb54eac1569838/handshake/0',
    fullnodeIp: '3.234.76.202',
    type: 'fullnode',
    network_addresses:
      '0x014d0402236861736865642d76616c696461746f722e6170746f732e647372766c6162732e6e657405241807208bec6dab190d536b8b929bacba57f8b0188310f953a5e1b401ed537398b02b510800',
    fullnode_addresses:
      '0x014704021d6861736865642d76666e2e6170746f732e647372766c6162732e6e65740526180720d59f925295707a5ab0483b4831b816b7eb399f30f7dfb1d3a5bb54eac15698380800',
    status: 'success',
    country: 'United States',
    city: 'Ashburn',
    lat: 39.0438,
    lon: -77.4874,
    query: '3.234.76.202',
  },
  {
    validator_index: 99,
    network:
      '/ip4/51.222.42.232/tcp/6180/noise-ik/89c5b1093bd1ed6ccd229eb8631c481c41ff93e20204cbaa405e6a4dcad4c641/handshake/0',
    networkIp: '51.222.42.232',
    fullnode:
      '/ip4/51.79.78.55/tcp/6182/noise-ik/6171dbf586d387a6bd7cea0b7bb69e5aafa7f396b45fb567ab40c7b4b2506f73/handshake/0',
    fullnodeIp: '51.79.78.55',
    type: 'network',
    network_addresses:
      '0x012d040033de2ae8052418072089c5b1093bd1ed6ccd229eb8631c481c41ff93e20204cbaa405e6a4dcad4c6410800',
    fullnode_addresses:
      '0x012d0400334f4e3705261807206171dbf586d387a6bd7cea0b7bb69e5aafa7f396b45fb567ab40c7b4b2506f730800',
    status: 'success',
    country: 'Canada',
    city: 'Beauharnois',
    lat: 45.3161,
    lon: -73.8736,
    query: '51.222.42.232',
  },
  {
    validator_index: 99,
    network:
      '/ip4/51.222.42.232/tcp/6180/noise-ik/89c5b1093bd1ed6ccd229eb8631c481c41ff93e20204cbaa405e6a4dcad4c641/handshake/0',
    networkIp: '51.222.42.232',
    fullnode:
      '/ip4/51.79.78.55/tcp/6182/noise-ik/6171dbf586d387a6bd7cea0b7bb69e5aafa7f396b45fb567ab40c7b4b2506f73/handshake/0',
    fullnodeIp: '51.79.78.55',
    type: 'fullnode',
    network_addresses:
      '0x012d040033de2ae8052418072089c5b1093bd1ed6ccd229eb8631c481c41ff93e20204cbaa405e6a4dcad4c6410800',
    fullnode_addresses:
      '0x012d0400334f4e3705261807206171dbf586d387a6bd7cea0b7bb69e5aafa7f396b45fb567ab40c7b4b2506f730800',
    status: 'success',
    country: 'Canada',
    city: 'Québec',
    lat: 46.7949,
    lon: -71.247,
    query: '51.79.78.55',
  },
  {
    validator_index: 101,
    network:
      '/dns/validator-2.mainnet.aptos.fernlabs.xyz/tcp/6180/noise-ik/c63a3ec5043dec7bdc0c227d7ef416792e61654a315bead1bcc79ec95abfda13/handshake/0',
    networkIp: '78.141.194.208',
    fullnode:
      '/dns/validator-fullnode-2.mainnet.aptos.fernlabs.xyz/tcp/6182/noise-ik/f19f3422d2b3bdb72a327762ed4e07d6788422f1e99b1705ea547602014f6d58/handshake/0',
    fullnodeIp: '95.179.228.173',
    type: 'network',
    network_addresses:
      '0x015004022676616c696461746f722d322e6d61696e6e65742e6170746f732e6665726e6c6162732e78797a0524180720c63a3ec5043dec7bdc0c227d7ef416792e61654a315bead1bcc79ec95abfda130800',
    fullnode_addresses:
      '0x015904022f76616c696461746f722d66756c6c6e6f64652d322e6d61696e6e65742e6170746f732e6665726e6c6162732e78797a0526180720f19f3422d2b3bdb72a327762ed4e07d6788422f1e99b1705ea547602014f6d580800',
    status: 'success',
    country: 'United Kingdom',
    city: 'London',
    lat: 51.5128,
    lon: -0.0638,
    query: '78.141.194.208',
  },
  {
    validator_index: 101,
    network:
      '/dns/validator-2.mainnet.aptos.fernlabs.xyz/tcp/6180/noise-ik/c63a3ec5043dec7bdc0c227d7ef416792e61654a315bead1bcc79ec95abfda13/handshake/0',
    networkIp: '78.141.194.208',
    fullnode:
      '/dns/validator-fullnode-2.mainnet.aptos.fernlabs.xyz/tcp/6182/noise-ik/f19f3422d2b3bdb72a327762ed4e07d6788422f1e99b1705ea547602014f6d58/handshake/0',
    fullnodeIp: '95.179.228.173',
    type: 'fullnode',
    network_addresses:
      '0x015004022676616c696461746f722d322e6d61696e6e65742e6170746f732e6665726e6c6162732e78797a0524180720c63a3ec5043dec7bdc0c227d7ef416792e61654a315bead1bcc79ec95abfda130800',
    fullnode_addresses:
      '0x015904022f76616c696461746f722d66756c6c6e6f64652d322e6d61696e6e65742e6170746f732e6665726e6c6162732e78797a0526180720f19f3422d2b3bdb72a327762ed4e07d6788422f1e99b1705ea547602014f6d580800',
    status: 'success',
    country: 'United Kingdom',
    city: 'London',
    lat: 51.5128,
    lon: -0.0638,
    query: '95.179.228.173',
  },
  {
    validator_index: 46,
    network:
      '/dns/aptos-staked.prod-eks-ap-northeast-2.staked.cloud/tcp/6180/noise-ik/73a189c2c9bffef16e55cfa83e9090441bf4055c5c491c2f3e34f8c02ff9e764/handshake/0',
    networkIp: '43.200.219.185',
    fullnode:
      '/dns/aptos-staked.prod-eks-ap-northeast-2.staked.cloud/tcp/6182/noise-ik/bcfd67cf425a8633620fd848c9446a69d34c601d2d73bb864c86584f53012f66/handshake/0',
    fullnodeIp: '43.200.219.185',
    type: 'network',
    network_addresses:
      '0x015b0402316170746f732d7374616b65642e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f7564052418072073a189c2c9bffef16e55cfa83e9090441bf4055c5c491c2f3e34f8c02ff9e7640800',
    fullnode_addresses:
      '0x015b0402316170746f732d7374616b65642e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f75640526180720bcfd67cf425a8633620fd848c9446a69d34c601d2d73bb864c86584f53012f660800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.978,
    query: '43.200.219.185',
  },
  {
    validator_index: 46,
    network:
      '/dns/aptos-staked.prod-eks-ap-northeast-2.staked.cloud/tcp/6180/noise-ik/73a189c2c9bffef16e55cfa83e9090441bf4055c5c491c2f3e34f8c02ff9e764/handshake/0',
    networkIp: '43.200.219.185',
    fullnode:
      '/dns/aptos-staked.prod-eks-ap-northeast-2.staked.cloud/tcp/6182/noise-ik/bcfd67cf425a8633620fd848c9446a69d34c601d2d73bb864c86584f53012f66/handshake/0',
    fullnodeIp: '43.200.219.185',
    type: 'fullnode',
    network_addresses:
      '0x015b0402316170746f732d7374616b65642e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f7564052418072073a189c2c9bffef16e55cfa83e9090441bf4055c5c491c2f3e34f8c02ff9e7640800',
    fullnode_addresses:
      '0x015b0402316170746f732d7374616b65642e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f75640526180720bcfd67cf425a8633620fd848c9446a69d34c601d2d73bb864c86584f53012f660800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.978,
    query: '43.200.219.185',
  },
  {
    validator_index: 7,
    network:
      '/dns/validator.f3585fdb-f7f7-4cbc-aa05-d17e15618455.aptos.bison.run/tcp/6180/noise-ik/7cc91d5c3fdfbd09e7453479eee20b627e5dff4c2f6651e6db6c5c2ceb500745/handshake/0',
    networkIp: '18.200.145.194',
    fullnode:
      '/dns/fullnode.f3585fdb-f7f7-4cbc-aa05-d17e15618455.aptos.bison.run/tcp/6182/noise-ik/9687473171144a19124a06e0cf8d1dc85b4b157e2b3f99ae66a587395e10231b/handshake/0',
    fullnodeIp: '54.154.109.53',
    type: 'network',
    network_addresses:
      '0x016804023e76616c696461746f722e66333538356664622d663766372d346362632d616130352d6431376531353631383435352e6170746f732e6269736f6e2e72756e05241807207cc91d5c3fdfbd09e7453479eee20b627e5dff4c2f6651e6db6c5c2ceb5007450800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e66333538356664622d663766372d346362632d616130352d6431376531353631383435352e6170746f732e6269736f6e2e72756e05261807209687473171144a19124a06e0cf8d1dc85b4b157e2b3f99ae66a587395e10231b0800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '18.200.145.194',
  },
  {
    validator_index: 7,
    network:
      '/dns/validator.f3585fdb-f7f7-4cbc-aa05-d17e15618455.aptos.bison.run/tcp/6180/noise-ik/7cc91d5c3fdfbd09e7453479eee20b627e5dff4c2f6651e6db6c5c2ceb500745/handshake/0',
    networkIp: '18.200.145.194',
    fullnode:
      '/dns/fullnode.f3585fdb-f7f7-4cbc-aa05-d17e15618455.aptos.bison.run/tcp/6182/noise-ik/9687473171144a19124a06e0cf8d1dc85b4b157e2b3f99ae66a587395e10231b/handshake/0',
    fullnodeIp: '54.154.109.53',
    type: 'fullnode',
    network_addresses:
      '0x016804023e76616c696461746f722e66333538356664622d663766372d346362632d616130352d6431376531353631383435352e6170746f732e6269736f6e2e72756e05241807207cc91d5c3fdfbd09e7453479eee20b627e5dff4c2f6651e6db6c5c2ceb5007450800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e66333538356664622d663766372d346362632d616130352d6431376531353631383435352e6170746f732e6269736f6e2e72756e05261807209687473171144a19124a06e0cf8d1dc85b4b157e2b3f99ae66a587395e10231b0800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '54.154.109.53',
  },
  {
    validator_index: 1,
    network:
      '/dns/validator.bbb76d2d-02b5-4e3e-bfc3-9f10a2e69849.aptos.bison.run/tcp/6180/noise-ik/3601215a079b0114a32104bd02149cf2258a206c8f8c79790e0684f4adfeae40/handshake/0',
    networkIp: '52.221.80.56',
    fullnode:
      '/dns/fullnode.bbb76d2d-02b5-4e3e-bfc3-9f10a2e69849.aptos.bison.run/tcp/6182/noise-ik/2494f31865a994a7ef8c2723a5f3fcfa05a8dad872e7420de8c542dac59fb107/handshake/0',
    fullnodeIp: '18.142.98.227',
    type: 'network',
    network_addresses:
      '0x016804023e76616c696461746f722e62626237366432642d303262352d346533652d626663332d3966313061326536393834392e6170746f732e6269736f6e2e72756e05241807203601215a079b0114a32104bd02149cf2258a206c8f8c79790e0684f4adfeae400800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e62626237366432642d303262352d346533652d626663332d3966313061326536393834392e6170746f732e6269736f6e2e72756e05261807202494f31865a994a7ef8c2723a5f3fcfa05a8dad872e7420de8c542dac59fb1070800',
    status: 'success',
    country: 'Singapore',
    city: 'Singapore',
    lat: 1.28009,
    lon: 103.851,
    query: '52.221.80.56',
  },
  {
    validator_index: 1,
    network:
      '/dns/validator.bbb76d2d-02b5-4e3e-bfc3-9f10a2e69849.aptos.bison.run/tcp/6180/noise-ik/3601215a079b0114a32104bd02149cf2258a206c8f8c79790e0684f4adfeae40/handshake/0',
    networkIp: '52.221.80.56',
    fullnode:
      '/dns/fullnode.bbb76d2d-02b5-4e3e-bfc3-9f10a2e69849.aptos.bison.run/tcp/6182/noise-ik/2494f31865a994a7ef8c2723a5f3fcfa05a8dad872e7420de8c542dac59fb107/handshake/0',
    fullnodeIp: '18.142.98.227',
    type: 'fullnode',
    network_addresses:
      '0x016804023e76616c696461746f722e62626237366432642d303262352d346533652d626663332d3966313061326536393834392e6170746f732e6269736f6e2e72756e05241807203601215a079b0114a32104bd02149cf2258a206c8f8c79790e0684f4adfeae400800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e62626237366432642d303262352d346533652d626663332d3966313061326536393834392e6170746f732e6269736f6e2e72756e05261807202494f31865a994a7ef8c2723a5f3fcfa05a8dad872e7420de8c542dac59fb1070800',
    status: 'success',
    country: 'Singapore',
    city: 'Singapore',
    lat: 1.28009,
    lon: 103.851,
    query: '18.142.98.227',
  },
  {
    validator_index: 0,
    network:
      '/dns/validator.1877840f-8a94-4606-84cb-9252d8aa5f47.aptos.bison.run/tcp/6180/noise-ik/6fa4c6191cec1e3f6bf3d0bb90d90033e27d8c6991f5e959eee63fcef40c3241/handshake/0',
    networkIp: '3.130.220.195',
    fullnode:
      '/dns/fullnode.1877840f-8a94-4606-84cb-9252d8aa5f47.aptos.bison.run/tcp/6182/noise-ik/2d0a88fafc3ec8081cc23ea8a5557fa4ed2402490403c6b7ab0cc3c25cabd072/handshake/0',
    fullnodeIp: '3.19.128.1',
    type: 'network',
    network_addresses:
      '0x016804023e76616c696461746f722e31383737383430662d386139342d343630362d383463622d3932353264386161356634372e6170746f732e6269736f6e2e72756e05241807206fa4c6191cec1e3f6bf3d0bb90d90033e27d8c6991f5e959eee63fcef40c32410800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e31383737383430662d386139342d343630362d383463622d3932353264386161356634372e6170746f732e6269736f6e2e72756e05261807202d0a88fafc3ec8081cc23ea8a5557fa4ed2402490403c6b7ab0cc3c25cabd0720800',
    status: 'success',
    country: 'United States',
    city: 'Dublin',
    lat: 40.0992,
    lon: -83.1141,
    query: '3.130.220.195',
  },
  {
    validator_index: 0,
    network:
      '/dns/validator.1877840f-8a94-4606-84cb-9252d8aa5f47.aptos.bison.run/tcp/6180/noise-ik/6fa4c6191cec1e3f6bf3d0bb90d90033e27d8c6991f5e959eee63fcef40c3241/handshake/0',
    networkIp: '3.130.220.195',
    fullnode:
      '/dns/fullnode.1877840f-8a94-4606-84cb-9252d8aa5f47.aptos.bison.run/tcp/6182/noise-ik/2d0a88fafc3ec8081cc23ea8a5557fa4ed2402490403c6b7ab0cc3c25cabd072/handshake/0',
    fullnodeIp: '3.19.128.1',
    type: 'fullnode',
    network_addresses:
      '0x016804023e76616c696461746f722e31383737383430662d386139342d343630362d383463622d3932353264386161356634372e6170746f732e6269736f6e2e72756e05241807206fa4c6191cec1e3f6bf3d0bb90d90033e27d8c6991f5e959eee63fcef40c32410800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e31383737383430662d386139342d343630362d383463622d3932353264386161356634372e6170746f732e6269736f6e2e72756e05261807202d0a88fafc3ec8081cc23ea8a5557fa4ed2402490403c6b7ab0cc3c25cabd0720800',
    status: 'success',
    country: 'United States',
    city: 'Dublin',
    lat: 40.0992,
    lon: -83.1141,
    query: '3.19.128.1',
  },
  {
    validator_index: 77,
    network:
      '/dns/aptos-staked-4.prod-eks-ap-northeast-2.staked.cloud/tcp/6180/noise-ik/e3d50c3e51e10a5ca264a88677ac6080f212c6d70b3ca8768fa8fdd0c4544b4d/handshake/0',
    networkIp: '16.170.152.245',
    fullnode:
      '/dns/aptos-staked-4.prod-eks-ap-northeast-2.staked.cloud/tcp/6182/noise-ik/1cdcb7b8ad0dfb9ee708d805173fa438090d44f41bee0c817bef69f39444f90f/handshake/0',
    fullnodeIp: '16.170.152.245',
    type: 'network',
    network_addresses:
      '0x015d0402336170746f732d7374616b65642d342e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f75640524180720e3d50c3e51e10a5ca264a88677ac6080f212c6d70b3ca8768fa8fdd0c4544b4d0800',
    fullnode_addresses:
      '0x015d0402336170746f732d7374616b65642d342e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f756405261807201cdcb7b8ad0dfb9ee708d805173fa438090d44f41bee0c817bef69f39444f90f0800',
    status: 'success',
    country: 'Sweden',
    city: 'Stockholm',
    lat: 59.3293,
    lon: 18.0686,
    query: '16.170.152.245',
  },
  {
    validator_index: 77,
    network:
      '/dns/aptos-staked-4.prod-eks-ap-northeast-2.staked.cloud/tcp/6180/noise-ik/e3d50c3e51e10a5ca264a88677ac6080f212c6d70b3ca8768fa8fdd0c4544b4d/handshake/0',
    networkIp: '16.170.152.245',
    fullnode:
      '/dns/aptos-staked-4.prod-eks-ap-northeast-2.staked.cloud/tcp/6182/noise-ik/1cdcb7b8ad0dfb9ee708d805173fa438090d44f41bee0c817bef69f39444f90f/handshake/0',
    fullnodeIp: '16.170.152.245',
    type: 'fullnode',
    network_addresses:
      '0x015d0402336170746f732d7374616b65642d342e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f75640524180720e3d50c3e51e10a5ca264a88677ac6080f212c6d70b3ca8768fa8fdd0c4544b4d0800',
    fullnode_addresses:
      '0x015d0402336170746f732d7374616b65642d342e70726f642d656b732d61702d6e6f727468656173742d322e7374616b65642e636c6f756405261807201cdcb7b8ad0dfb9ee708d805173fa438090d44f41bee0c817bef69f39444f90f0800',
    status: 'success',
    country: 'Sweden',
    city: 'Stockholm',
    lat: 59.3293,
    lon: 18.0686,
    query: '16.170.152.245',
  },
  {
    validator_index: 67,
    network:
      '/ip4/43.200.203.13/tcp/6180/noise-ik/60e8e4dbc6de25194c0cb012866f4b6e154b2cc72a5ce893aa85fe5eb1dfca3a/handshake/0',
    networkIp: '43.200.203.13',
    fullnode:
      '/ip4/13.124.42.227/tcp/6182/noise-ik/c5dfee7bf16baae3dc40ce95828f4b45717c952fd2fe1b10c31c4886a1ed2f65/handshake/0',
    fullnodeIp: '13.124.42.227',
    type: 'network',
    network_addresses:
      '0x012d04002bc8cb0d052418072060e8e4dbc6de25194c0cb012866f4b6e154b2cc72a5ce893aa85fe5eb1dfca3a0800',
    fullnode_addresses:
      '0x012d04000d7c2ae30526180720c5dfee7bf16baae3dc40ce95828f4b45717c952fd2fe1b10c31c4886a1ed2f650800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.978,
    query: '43.200.203.13',
  },
  {
    validator_index: 67,
    network:
      '/ip4/43.200.203.13/tcp/6180/noise-ik/60e8e4dbc6de25194c0cb012866f4b6e154b2cc72a5ce893aa85fe5eb1dfca3a/handshake/0',
    networkIp: '43.200.203.13',
    fullnode:
      '/ip4/13.124.42.227/tcp/6182/noise-ik/c5dfee7bf16baae3dc40ce95828f4b45717c952fd2fe1b10c31c4886a1ed2f65/handshake/0',
    fullnodeIp: '13.124.42.227',
    type: 'fullnode',
    network_addresses:
      '0x012d04002bc8cb0d052418072060e8e4dbc6de25194c0cb012866f4b6e154b2cc72a5ce893aa85fe5eb1dfca3a0800',
    fullnode_addresses:
      '0x012d04000d7c2ae30526180720c5dfee7bf16baae3dc40ce95828f4b45717c952fd2fe1b10c31c4886a1ed2f650800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.978,
    query: '13.124.42.227',
  },
  {
    validator_index: 66,
    network:
      '/ip4/52.78.68.23/tcp/6180/noise-ik/03e1fda02885ed0f4ddb06e6609648f98c0fd3a4e8528ff765463ca979be725b/handshake/0',
    networkIp: '52.78.68.23',
    fullnode:
      '/ip4/43.201.2.2/tcp/6182/noise-ik/62694fc12c3300f2f6c8a753bd69fcb9ade2b59ade197ec1062d034ebf098770/handshake/0',
    fullnodeIp: '43.201.2.2',
    type: 'network',
    network_addresses:
      '0x012d0400344e4417052418072003e1fda02885ed0f4ddb06e6609648f98c0fd3a4e8528ff765463ca979be725b0800',
    fullnode_addresses:
      '0x012d04002bc90202052618072062694fc12c3300f2f6c8a753bd69fcb9ade2b59ade197ec1062d034ebf0987700800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.978,
    query: '52.78.68.23',
  },
  {
    validator_index: 66,
    network:
      '/ip4/52.78.68.23/tcp/6180/noise-ik/03e1fda02885ed0f4ddb06e6609648f98c0fd3a4e8528ff765463ca979be725b/handshake/0',
    networkIp: '52.78.68.23',
    fullnode:
      '/ip4/43.201.2.2/tcp/6182/noise-ik/62694fc12c3300f2f6c8a753bd69fcb9ade2b59ade197ec1062d034ebf098770/handshake/0',
    fullnodeIp: '43.201.2.2',
    type: 'fullnode',
    network_addresses:
      '0x012d0400344e4417052418072003e1fda02885ed0f4ddb06e6609648f98c0fd3a4e8528ff765463ca979be725b0800',
    fullnode_addresses:
      '0x012d04002bc90202052618072062694fc12c3300f2f6c8a753bd69fcb9ade2b59ade197ec1062d034ebf0987700800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.978,
    query: '43.201.2.2',
  },
  {
    validator_index: 69,
    network:
      '/dns/vn01.apt.kelepool.com/tcp/6180/noise-ik/fd6a9d39615104d49f2a4c7d59ddbe5833d9e7764b214396c9cc0bcc3a981452/handshake/0',
    networkIp: '47.252.11.99',
    fullnode:
      '/dns/vfn01.apt.kelepool.com/tcp/6182/noise-ik/20e8c0ba0ba94ae9e16180d86a7dca83cb9202c52a8b368da440f0e1bb6c2847/handshake/0',
    fullnodeIp: '47.90.243.160',
    type: 'network',
    network_addresses:
      '0x013f040215766e30312e6170742e6b656c65706f6f6c2e636f6d0524180720fd6a9d39615104d49f2a4c7d59ddbe5833d9e7764b214396c9cc0bcc3a9814520800',
    fullnode_addresses:
      '0x014004021676666e30312e6170742e6b656c65706f6f6c2e636f6d052618072020e8c0ba0ba94ae9e16180d86a7dca83cb9202c52a8b368da440f0e1bb6c28470800',
    status: 'success',
    country: 'United States',
    city: 'Charlottesville',
    lat: 37.4316,
    lon: -78.6569,
    query: '47.252.11.99',
  },
  {
    validator_index: 69,
    network:
      '/dns/vn01.apt.kelepool.com/tcp/6180/noise-ik/fd6a9d39615104d49f2a4c7d59ddbe5833d9e7764b214396c9cc0bcc3a981452/handshake/0',
    networkIp: '47.252.11.99',
    fullnode:
      '/dns/vfn01.apt.kelepool.com/tcp/6182/noise-ik/20e8c0ba0ba94ae9e16180d86a7dca83cb9202c52a8b368da440f0e1bb6c2847/handshake/0',
    fullnodeIp: '47.90.243.160',
    type: 'fullnode',
    network_addresses:
      '0x013f040215766e30312e6170742e6b656c65706f6f6c2e636f6d0524180720fd6a9d39615104d49f2a4c7d59ddbe5833d9e7764b214396c9cc0bcc3a9814520800',
    fullnode_addresses:
      '0x014004021676666e30312e6170742e6b656c65706f6f6c2e636f6d052618072020e8c0ba0ba94ae9e16180d86a7dca83cb9202c52a8b368da440f0e1bb6c28470800',
    status: 'success',
    country: 'United States',
    city: 'Charlottesville',
    lat: 37.4316,
    lon: -78.6569,
    query: '47.90.243.160',
  },
  {
    validator_index: 8,
    network:
      '/dns/validator.ac8829ee-ce3b-4342-b057-8c4cb7ee1b5b.aptos.bison.run/tcp/6180/noise-ik/08e4958664a131445b786fa41b6f5ffe41ff2c661e8de2027642200d21626c75/handshake/0',
    networkIp: '63.35.30.44',
    fullnode:
      '/dns/fullnode.ac8829ee-ce3b-4342-b057-8c4cb7ee1b5b.aptos.bison.run/tcp/6182/noise-ik/92e06b9b1117d25c10988803a233fbfcf31a64cb79f693ebe9110a15f465153f/handshake/0',
    fullnodeIp: '34.242.44.227',
    type: 'network',
    network_addresses:
      '0x016804023e76616c696461746f722e61633838323965652d636533622d343334322d623035372d3863346362376565316235622e6170746f732e6269736f6e2e72756e052418072008e4958664a131445b786fa41b6f5ffe41ff2c661e8de2027642200d21626c750800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e61633838323965652d636533622d343334322d623035372d3863346362376565316235622e6170746f732e6269736f6e2e72756e052618072092e06b9b1117d25c10988803a233fbfcf31a64cb79f693ebe9110a15f465153f0800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '63.35.30.44',
  },
  {
    validator_index: 8,
    network:
      '/dns/validator.ac8829ee-ce3b-4342-b057-8c4cb7ee1b5b.aptos.bison.run/tcp/6180/noise-ik/08e4958664a131445b786fa41b6f5ffe41ff2c661e8de2027642200d21626c75/handshake/0',
    networkIp: '63.35.30.44',
    fullnode:
      '/dns/fullnode.ac8829ee-ce3b-4342-b057-8c4cb7ee1b5b.aptos.bison.run/tcp/6182/noise-ik/92e06b9b1117d25c10988803a233fbfcf31a64cb79f693ebe9110a15f465153f/handshake/0',
    fullnodeIp: '34.242.44.227',
    type: 'fullnode',
    network_addresses:
      '0x016804023e76616c696461746f722e61633838323965652d636533622d343334322d623035372d3863346362376565316235622e6170746f732e6269736f6e2e72756e052418072008e4958664a131445b786fa41b6f5ffe41ff2c661e8de2027642200d21626c750800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e61633838323965652d636533622d343334322d623035372d3863346362376565316235622e6170746f732e6269736f6e2e72756e052618072092e06b9b1117d25c10988803a233fbfcf31a64cb79f693ebe9110a15f465153f0800',
    status: 'success',
    country: 'Ireland',
    city: 'Dublin',
    lat: 53.3498,
    lon: -6.26031,
    query: '34.242.44.227',
  },
  {
    validator_index: 2,
    network:
      '/dns/validator.d4a53586-84c9-4915-a76d-e3cba96c900a.aptos.bison.run/tcp/6180/noise-ik/1790f5434d5ac0790bac0f5d8e7523746e61c74066becbe2b7570161d0a3033c/handshake/0',
    networkIp: '52.76.66.93',
    fullnode:
      '/dns/fullnode.d4a53586-84c9-4915-a76d-e3cba96c900a.aptos.bison.run/tcp/6182/noise-ik/eba20914e03de5ad855f3fef16abf0119e72a3714ff4b325944976bbfa8d4a19/handshake/0',
    fullnodeIp: '18.143.95.183',
    type: 'network',
    network_addresses:
      '0x016804023e76616c696461746f722e64346135333538362d383463392d343931352d613736642d6533636261393663393030612e6170746f732e6269736f6e2e72756e05241807201790f5434d5ac0790bac0f5d8e7523746e61c74066becbe2b7570161d0a3033c0800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e64346135333538362d383463392d343931352d613736642d6533636261393663393030612e6170746f732e6269736f6e2e72756e0526180720eba20914e03de5ad855f3fef16abf0119e72a3714ff4b325944976bbfa8d4a190800',
    status: 'success',
    country: 'Singapore',
    city: 'Singapore',
    lat: 1.28009,
    lon: 103.851,
    query: '52.76.66.93',
  },
  {
    validator_index: 2,
    network:
      '/dns/validator.d4a53586-84c9-4915-a76d-e3cba96c900a.aptos.bison.run/tcp/6180/noise-ik/1790f5434d5ac0790bac0f5d8e7523746e61c74066becbe2b7570161d0a3033c/handshake/0',
    networkIp: '52.76.66.93',
    fullnode:
      '/dns/fullnode.d4a53586-84c9-4915-a76d-e3cba96c900a.aptos.bison.run/tcp/6182/noise-ik/eba20914e03de5ad855f3fef16abf0119e72a3714ff4b325944976bbfa8d4a19/handshake/0',
    fullnodeIp: '18.143.95.183',
    type: 'fullnode',
    network_addresses:
      '0x016804023e76616c696461746f722e64346135333538362d383463392d343931352d613736642d6533636261393663393030612e6170746f732e6269736f6e2e72756e05241807201790f5434d5ac0790bac0f5d8e7523746e61c74066becbe2b7570161d0a3033c0800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e64346135333538362d383463392d343931352d613736642d6533636261393663393030612e6170746f732e6269736f6e2e72756e0526180720eba20914e03de5ad855f3fef16abf0119e72a3714ff4b325944976bbfa8d4a190800',
    status: 'success',
    country: 'Singapore',
    city: 'Singapore',
    lat: 1.28009,
    lon: 103.851,
    query: '18.143.95.183',
  },
  {
    validator_index: 3,
    network:
      '/dns/validator.f5e0b76b-136d-458f-9516-5cc57fede435.aptos.bison.run/tcp/6180/noise-ik/3670cdd54a1e800903158f308bdd73dd564896387b8c6173503985bdfbf1a234/handshake/0',
    networkIp: '13.214.113.38',
    fullnode:
      '/dns/fullnode.f5e0b76b-136d-458f-9516-5cc57fede435.aptos.bison.run/tcp/6182/noise-ik/dd8b8759021b3e1d2b9fb28c2819fad1ff3324441bcba60256eb3b0b2d6f3c24/handshake/0',
    fullnodeIp: '18.143.128.33',
    type: 'network',
    network_addresses:
      '0x016804023e76616c696461746f722e66356530623736622d313336642d343538662d393531362d3563633537666564653433352e6170746f732e6269736f6e2e72756e05241807203670cdd54a1e800903158f308bdd73dd564896387b8c6173503985bdfbf1a2340800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e66356530623736622d313336642d343538662d393531362d3563633537666564653433352e6170746f732e6269736f6e2e72756e0526180720dd8b8759021b3e1d2b9fb28c2819fad1ff3324441bcba60256eb3b0b2d6f3c240800',
    status: 'success',
    country: 'Singapore',
    city: 'Singapore',
    lat: 1.28009,
    lon: 103.851,
    query: '13.214.113.38',
  },
  {
    validator_index: 3,
    network:
      '/dns/validator.f5e0b76b-136d-458f-9516-5cc57fede435.aptos.bison.run/tcp/6180/noise-ik/3670cdd54a1e800903158f308bdd73dd564896387b8c6173503985bdfbf1a234/handshake/0',
    networkIp: '13.214.113.38',
    fullnode:
      '/dns/fullnode.f5e0b76b-136d-458f-9516-5cc57fede435.aptos.bison.run/tcp/6182/noise-ik/dd8b8759021b3e1d2b9fb28c2819fad1ff3324441bcba60256eb3b0b2d6f3c24/handshake/0',
    fullnodeIp: '18.143.128.33',
    type: 'fullnode',
    network_addresses:
      '0x016804023e76616c696461746f722e66356530623736622d313336642d343538662d393531362d3563633537666564653433352e6170746f732e6269736f6e2e72756e05241807203670cdd54a1e800903158f308bdd73dd564896387b8c6173503985bdfbf1a2340800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e66356530623736622d313336642d343538662d393531362d3563633537666564653433352e6170746f732e6269736f6e2e72756e0526180720dd8b8759021b3e1d2b9fb28c2819fad1ff3324441bcba60256eb3b0b2d6f3c240800',
    status: 'success',
    country: 'Singapore',
    city: 'Singapore',
    lat: 1.28009,
    lon: 103.851,
    query: '18.143.128.33',
  },
  {
    validator_index: 18,
    network:
      '/ip4/34.64.235.157/tcp/6180/noise-ik/4b226faa0463d6d29e448bfb0423b08bb0d309b46ffd1251c765bc6f2dbdcd56/handshake/0',
    networkIp: '34.64.235.157',
    fullnode:
      '/ip4/34.64.68.120/tcp/6182/noise-ik/a84c79bd0d5ee54b62db188e748fc66b62cbd15d5efe36b1d5c7cfa5ab445d39/handshake/0',
    fullnodeIp: '34.64.68.120',
    type: 'network',
    network_addresses:
      '0x012d04002240eb9d05241807204b226faa0463d6d29e448bfb0423b08bb0d309b46ffd1251c765bc6f2dbdcd560800',
    fullnode_addresses:
      '0x012d0400224044780526180720a84c79bd0d5ee54b62db188e748fc66b62cbd15d5efe36b1d5c7cfa5ab445d390800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.9779,
    query: '34.64.235.157',
  },
  {
    validator_index: 18,
    network:
      '/ip4/34.64.235.157/tcp/6180/noise-ik/4b226faa0463d6d29e448bfb0423b08bb0d309b46ffd1251c765bc6f2dbdcd56/handshake/0',
    networkIp: '34.64.235.157',
    fullnode:
      '/ip4/34.64.68.120/tcp/6182/noise-ik/a84c79bd0d5ee54b62db188e748fc66b62cbd15d5efe36b1d5c7cfa5ab445d39/handshake/0',
    fullnodeIp: '34.64.68.120',
    type: 'fullnode',
    network_addresses:
      '0x012d04002240eb9d05241807204b226faa0463d6d29e448bfb0423b08bb0d309b46ffd1251c765bc6f2dbdcd560800',
    fullnode_addresses:
      '0x012d0400224044780526180720a84c79bd0d5ee54b62db188e748fc66b62cbd15d5efe36b1d5c7cfa5ab445d390800',
    status: 'success',
    country: 'South Korea',
    city: 'Seoul',
    lat: 37.5665,
    lon: 126.9779,
    query: '34.64.68.120',
  },
  {
    validator_index: 16,
    network:
      '/dns/s2zs55mnbe30e46g.node2.cloud-b.mainnet.aptoslabs.com/tcp/6180/noise-ik/636fcfa15a78b3a49b3cf2629fe102d489d2cf1990cc292978126daea5f3f136/handshake/0',
    networkIp: '16.16.46.6',
    fullnode:
      '/dns/node2.cloud-b.mainnet.aptoslabs.com/tcp/6182/noise-ik/e3aa2a357e9be7bd63b97c4b3125b05b8da680843f3aa70677dee962b2c86329/handshake/0',
    fullnodeIp: '13.48.188.84',
    type: 'network',
    network_addresses:
      '0x015e04023473327a7335356d6e62653330653436672e6e6f6465322e636c6f75642d622e6d61696e6e65742e6170746f736c6162732e636f6d0524180720636fcfa15a78b3a49b3cf2629fe102d489d2cf1990cc292978126daea5f3f1360800',
    fullnode_addresses:
      '0x014d0402236e6f6465322e636c6f75642d622e6d61696e6e65742e6170746f736c6162732e636f6d0526180720e3aa2a357e9be7bd63b97c4b3125b05b8da680843f3aa70677dee962b2c863290800',
    status: 'success',
    country: 'Sweden',
    city: 'Stockholm',
    lat: 59.3293,
    lon: 18.0686,
    query: '16.16.46.6',
  },
  {
    validator_index: 16,
    network:
      '/dns/s2zs55mnbe30e46g.node2.cloud-b.mainnet.aptoslabs.com/tcp/6180/noise-ik/636fcfa15a78b3a49b3cf2629fe102d489d2cf1990cc292978126daea5f3f136/handshake/0',
    networkIp: '16.16.46.6',
    fullnode:
      '/dns/node2.cloud-b.mainnet.aptoslabs.com/tcp/6182/noise-ik/e3aa2a357e9be7bd63b97c4b3125b05b8da680843f3aa70677dee962b2c86329/handshake/0',
    fullnodeIp: '13.48.188.84',
    type: 'fullnode',
    network_addresses:
      '0x015e04023473327a7335356d6e62653330653436672e6e6f6465322e636c6f75642d622e6d61696e6e65742e6170746f736c6162732e636f6d0524180720636fcfa15a78b3a49b3cf2629fe102d489d2cf1990cc292978126daea5f3f1360800',
    fullnode_addresses:
      '0x014d0402236e6f6465322e636c6f75642d622e6d61696e6e65742e6170746f736c6162732e636f6d0526180720e3aa2a357e9be7bd63b97c4b3125b05b8da680843f3aa70677dee962b2c863290800',
    status: 'success',
    country: 'Sweden',
    city: 'Stockholm',
    lat: 59.3293,
    lon: 18.0686,
    query: '13.48.188.84',
  },
  {
    validator_index: 19,
    network:
      '/ip4/34.95.236.58/tcp/6180/noise-ik/7f782f994cd4ee26b655e2a594c72d81e950c7d97bc051814453c83eedf4ac51/handshake/0',
    networkIp: '34.95.236.58',
    fullnode:
      '/ip4/35.247.218.59/tcp/6182/noise-ik/f9e0b20bca5cf57f26ca1b046db48f50e2741c6c93ac04aab6b2fe7b3364b943/handshake/0',
    fullnodeIp: '35.247.218.59',
    type: 'network',
    network_addresses:
      '0x012d0400225fec3a05241807207f782f994cd4ee26b655e2a594c72d81e950c7d97bc051814453c83eedf4ac510800',
    fullnode_addresses:
      '0x012d040023f7da3b0526180720f9e0b20bca5cf57f26ca1b046db48f50e2741c6c93ac04aab6b2fe7b3364b9430800',
    status: 'success',
    country: 'Brazil',
    city: 'Sao Paulo',
    lat: -23.5505,
    lon: -46.6333,
    query: '34.95.236.58',
  },
  {
    validator_index: 19,
    network:
      '/ip4/34.95.236.58/tcp/6180/noise-ik/7f782f994cd4ee26b655e2a594c72d81e950c7d97bc051814453c83eedf4ac51/handshake/0',
    networkIp: '34.95.236.58',
    fullnode:
      '/ip4/35.247.218.59/tcp/6182/noise-ik/f9e0b20bca5cf57f26ca1b046db48f50e2741c6c93ac04aab6b2fe7b3364b943/handshake/0',
    fullnodeIp: '35.247.218.59',
    type: 'fullnode',
    network_addresses:
      '0x012d0400225fec3a05241807207f782f994cd4ee26b655e2a594c72d81e950c7d97bc051814453c83eedf4ac510800',
    fullnode_addresses:
      '0x012d040023f7da3b0526180720f9e0b20bca5cf57f26ca1b046db48f50e2741c6c93ac04aab6b2fe7b3364b9430800',
    status: 'success',
    country: 'Brazil',
    city: 'Sao Paulo',
    lat: -23.5505,
    lon: -46.6333,
    query: '35.247.218.59',
  },
  {
    validator_index: 4,
    network:
      '/dns/validator.043219b7-fde6-40df-a7e1-5ace50862aac.aptos.bison.run/tcp/6180/noise-ik/ef5d1ef362d6b1a174fa72b9e3b6b2a422e938a5ab62d802a55c64fc104fad08/handshake/0',
    networkIp: '52.74.27.210',
    fullnode:
      '/dns/fullnode.043219b7-fde6-40df-a7e1-5ace50862aac.aptos.bison.run/tcp/6182/noise-ik/1205240564e9950bc672fd1bee151015211b793a14c9b1b09e4e70efec5a8361/handshake/0',
    fullnodeIp: '52.220.0.202',
    type: 'network',
    network_addresses:
      '0x016804023e76616c696461746f722e30343332313962372d666465362d343064662d613765312d3561636535303836326161632e6170746f732e6269736f6e2e72756e0524180720ef5d1ef362d6b1a174fa72b9e3b6b2a422e938a5ab62d802a55c64fc104fad080800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e30343332313962372d666465362d343064662d613765312d3561636535303836326161632e6170746f732e6269736f6e2e72756e05261807201205240564e9950bc672fd1bee151015211b793a14c9b1b09e4e70efec5a83610800',
    status: 'success',
    country: 'Singapore',
    city: 'Singapore',
    lat: 1.28009,
    lon: 103.851,
    query: '52.74.27.210',
  },
  {
    validator_index: 4,
    network:
      '/dns/validator.043219b7-fde6-40df-a7e1-5ace50862aac.aptos.bison.run/tcp/6180/noise-ik/ef5d1ef362d6b1a174fa72b9e3b6b2a422e938a5ab62d802a55c64fc104fad08/handshake/0',
    networkIp: '52.74.27.210',
    fullnode:
      '/dns/fullnode.043219b7-fde6-40df-a7e1-5ace50862aac.aptos.bison.run/tcp/6182/noise-ik/1205240564e9950bc672fd1bee151015211b793a14c9b1b09e4e70efec5a8361/handshake/0',
    fullnodeIp: '52.220.0.202',
    type: 'fullnode',
    network_addresses:
      '0x016804023e76616c696461746f722e30343332313962372d666465362d343064662d613765312d3561636535303836326161632e6170746f732e6269736f6e2e72756e0524180720ef5d1ef362d6b1a174fa72b9e3b6b2a422e938a5ab62d802a55c64fc104fad080800',
    fullnode_addresses:
      '0x016704023d66756c6c6e6f64652e30343332313962372d666465362d343064662d613765312d3561636535303836326161632e6170746f732e6269736f6e2e72756e05261807201205240564e9950bc672fd1bee151015211b793a14c9b1b09e4e70efec5a83610800',
    status: 'success',
    country: 'Singapore',
    city: 'Singapore',
    lat: 1.28009,
    lon: 103.851,
    query: '52.220.0.202',
  },
  {
    validator_index: 15,
    network:
      '/dns/j8jgu3570d8t3clz.node3.cloud-b.mainnet.aptoslabs.com/tcp/6180/noise-ik/e05a0bd3f3a6bae45c79954b37be2baceaa37a0dd5d0f8177d2ed9c54acb8215/handshake/0',
    networkIp: '107.21.56.141',
    fullnode:
      '/dns/node3.cloud-b.mainnet.aptoslabs.com/tcp/6182/noise-ik/1e9561eaa52ce411cb52062aa531658d7e6ffa531310e5db810c75fb3e21fa55/handshake/0',
    fullnodeIp: '35.169.144.167',
    type: 'network',
    network_addresses:
      '0x015e0402346a386a67753335373064387433636c7a2e6e6f6465332e636c6f75642d622e6d61696e6e65742e6170746f736c6162732e636f6d0524180720e05a0bd3f3a6bae45c79954b37be2baceaa37a0dd5d0f8177d2ed9c54acb82150800',
    fullnode_addresses:
      '0x014d0402236e6f6465332e636c6f75642d622e6d61696e6e65742e6170746f736c6162732e636f6d05261807201e9561eaa52ce411cb52062aa531658d7e6ffa531310e5db810c75fb3e21fa550800',
    status: 'success',
    country: 'United States',
    city: 'Ashburn',
    lat: 39.0438,
    lon: -77.4874,
    query: '107.21.56.141',
  },
  {
    validator_index: 15,
    network:
      '/dns/j8jgu3570d8t3clz.node3.cloud-b.mainnet.aptoslabs.com/tcp/6180/noise-ik/e05a0bd3f3a6bae45c79954b37be2baceaa37a0dd5d0f8177d2ed9c54acb8215/handshake/0',
    networkIp: '107.21.56.141',
    fullnode:
      '/dns/node3.cloud-b.mainnet.aptoslabs.com/tcp/6182/noise-ik/1e9561eaa52ce411cb52062aa531658d7e6ffa531310e5db810c75fb3e21fa55/handshake/0',
    fullnodeIp: '35.169.144.167',
    type: 'fullnode',
    network_addresses:
      '0x015e0402346a386a67753335373064387433636c7a2e6e6f6465332e636c6f75642d622e6d61696e6e65742e6170746f736c6162732e636f6d0524180720e05a0bd3f3a6bae45c79954b37be2baceaa37a0dd5d0f8177d2ed9c54acb82150800',
    fullnode_addresses:
      '0x014d0402236e6f6465332e636c6f75642d622e6d61696e6e65742e6170746f736c6162732e636f6d05261807201e9561eaa52ce411cb52062aa531658d7e6ffa531310e5db810c75fb3e21fa550800',
    status: 'success',
    country: 'United States',
    city: 'Ashburn',
    lat: 39.0438,
    lon: -77.4874,
    query: '35.169.144.167',
  },
  {
    validator_index: 17,
    network:
      '/ip4/34.176.79.135/tcp/6180/noise-ik/bf5c7ea2f09e39473e6ec91ea9eec3f0ba9bc0359bcd1a7d66a13ec51b945673/handshake/0',
    networkIp: '34.176.79.135',
    fullnode:
      '/ip4/34.176.25.175/tcp/6182/noise-ik/9ee8f934db91612bd448f575483b900668e3628cf8f636a39cebbffbf5516a5b/handshake/0',
    fullnodeIp: '34.176.25.175',
    type: 'network',
    network_addresses:
      '0x012d040022b04f870524180720bf5c7ea2f09e39473e6ec91ea9eec3f0ba9bc0359bcd1a7d66a13ec51b9456730800',
    fullnode_addresses:
      '0x012d040022b019af05261807209ee8f934db91612bd448f575483b900668e3628cf8f636a39cebbffbf5516a5b0800',
    status: 'success',
    country: 'Chile',
    city: 'Santiago',
    lat: -33.4488,
    lon: -70.6692,
    query: '34.176.79.135',
  },
  {
    validator_index: 17,
    network:
      '/ip4/34.176.79.135/tcp/6180/noise-ik/bf5c7ea2f09e39473e6ec91ea9eec3f0ba9bc0359bcd1a7d66a13ec51b945673/handshake/0',
    networkIp: '34.176.79.135',
    fullnode:
      '/ip4/34.176.25.175/tcp/6182/noise-ik/9ee8f934db91612bd448f575483b900668e3628cf8f636a39cebbffbf5516a5b/handshake/0',
    fullnodeIp: '34.176.25.175',
    type: 'fullnode',
    network_addresses:
      '0x012d040022b04f870524180720bf5c7ea2f09e39473e6ec91ea9eec3f0ba9bc0359bcd1a7d66a13ec51b9456730800',
    fullnode_addresses:
      '0x012d040022b019af05261807209ee8f934db91612bd448f575483b900668e3628cf8f636a39cebbffbf5516a5b0800',
    status: 'success',
    country: 'Chile',
    city: 'Santiago',
    lat: -33.4488,
    lon: -70.6692,
    query: '34.176.25.175',
  },
  {
    validator_index: 44,
    network:
      '/dns/00b4e55n60s5skgu.node1.cloud-b.mainnet.aptoslabs.com/tcp/6180/noise-ik/50a32192e02f53080a76ed76c7408311f7925c2d3d268a4abe6fc8e523749120/handshake/0',
    networkIp: '13.244.80.115',
    fullnode:
      '/dns/node1.cloud-b.mainnet.aptoslabs.com/tcp/6182/noise-ik/003cc2ed36e7d486539ac2c411b48d962f1ef17d884c3a7109cad43f16bd5008/handshake/0',
    fullnodeIp: '13.246.79.52',
    type: 'network',
    network_addresses:
      '0x015e040234303062346535356e36307335736b67752e6e6f6465312e636c6f75642d622e6d61696e6e65742e6170746f736c6162732e636f6d052418072050a32192e02f53080a76ed76c7408311f7925c2d3d268a4abe6fc8e5237491200800',
    fullnode_addresses:
      '0x014d0402236e6f6465312e636c6f75642d622e6d61696e6e65742e6170746f736c6162732e636f6d0526180720003cc2ed36e7d486539ac2c411b48d962f1ef17d884c3a7109cad43f16bd50080800',
    status: 'success',
    country: 'South Africa',
    city: 'Johannesburg',
    lat: -26.2041,
    lon: 28.0473,
    query: '13.244.80.115',
  },
  {
    validator_index: 44,
    network:
      '/dns/00b4e55n60s5skgu.node1.cloud-b.mainnet.aptoslabs.com/tcp/6180/noise-ik/50a32192e02f53080a76ed76c7408311f7925c2d3d268a4abe6fc8e523749120/handshake/0',
    networkIp: '13.244.80.115',
    fullnode:
      '/dns/node1.cloud-b.mainnet.aptoslabs.com/tcp/6182/noise-ik/003cc2ed36e7d486539ac2c411b48d962f1ef17d884c3a7109cad43f16bd5008/handshake/0',
    fullnodeIp: '13.246.79.52',
    type: 'fullnode',
    network_addresses:
      '0x015e040234303062346535356e36307335736b67752e6e6f6465312e636c6f75642d622e6d61696e6e65742e6170746f736c6162732e636f6d052418072050a32192e02f53080a76ed76c7408311f7925c2d3d268a4abe6fc8e5237491200800',
    fullnode_addresses:
      '0x014d0402236e6f6465312e636c6f75642d622e6d61696e6e65742e6170746f736c6162732e636f6d0526180720003cc2ed36e7d486539ac2c411b48d962f1ef17d884c3a7109cad43f16bd50080800',
    status: 'success',
    country: 'South Africa',
    city: 'Johannesburg',
    lat: -26.2041,
    lon: 28.0473,
    query: '13.246.79.52',
  },
  {
    validator_index: 47,
    network:
      '/ip4/35.198.30.222/tcp/6180/noise-ik/5c37eb57684ced6a80eefc4e434f635acba094a66f7550bbada806b89d8fb35c/handshake/0',
    networkIp: '35.198.30.222',
    fullnode:
      '/ip4/35.199.94.103/tcp/6182/noise-ik/98b923097936cc53df5138a8a1a67c18bd2b33421777b55b808652fff513e166/handshake/0',
    fullnodeIp: '35.199.94.103',
    type: 'network',
    network_addresses:
      '0x012d040023c61ede05241807205c37eb57684ced6a80eefc4e434f635acba094a66f7550bbada806b89d8fb35c0800',
    fullnode_addresses:
      '0x012d040023c75e67052618072098b923097936cc53df5138a8a1a67c18bd2b33421777b55b808652fff513e1660800',
    status: 'success',
    country: 'Brazil',
    city: 'Sao Paulo',
    lat: -23.5505,
    lon: -46.6333,
    query: '35.198.30.222',
  },
  {
    validator_index: 47,
    network:
      '/ip4/35.198.30.222/tcp/6180/noise-ik/5c37eb57684ced6a80eefc4e434f635acba094a66f7550bbada806b89d8fb35c/handshake/0',
    networkIp: '35.198.30.222',
    fullnode:
      '/ip4/35.199.94.103/tcp/6182/noise-ik/98b923097936cc53df5138a8a1a67c18bd2b33421777b55b808652fff513e166/handshake/0',
    fullnodeIp: '35.199.94.103',
    type: 'fullnode',
    network_addresses:
      '0x012d040023c61ede05241807205c37eb57684ced6a80eefc4e434f635acba094a66f7550bbada806b89d8fb35c0800',
    fullnode_addresses:
      '0x012d040023c75e67052618072098b923097936cc53df5138a8a1a67c18bd2b33421777b55b808652fff513e1660800',
    status: 'success',
    country: 'Brazil',
    city: 'Sao Paulo',
    lat: -23.5505,
    lon: -46.6333,
    query: '35.199.94.103',
  },
  {
    validator_index: 72,
    network:
      '/dns/mainnet.aptos-validator.com/tcp/6180/noise-ik/c5f1d24f85c892781f4218e100d5ad92ba05650369ff23833bfec4ccc6f1347d/handshake/0',
    networkIp: '34.165.171.196',
    fullnode:
      '/dns/mainnet.aptos-fullnode.com/tcp/6182/noise-ik/e3430bc567682235924291181123d27944faafbb7b8ee2d61178558974f48d57/handshake/0',
    fullnodeIp: '34.165.12.219',
    type: 'network',
    network_addresses:
      '0x014504021b6d61696e6e65742e6170746f732d76616c696461746f722e636f6d0524180720c5f1d24f85c892781f4218e100d5ad92ba05650369ff23833bfec4ccc6f1347d0800',
    fullnode_addresses:
      '0x014404021a6d61696e6e65742e6170746f732d66756c6c6e6f64652e636f6d0526180720e3430bc567682235924291181123d27944faafbb7b8ee2d61178558974f48d570800',
    status: 'success',
    country: 'Israel',
    city: 'Tel Aviv',
    lat: 32.0852,
    lon: 34.7817,
    query: '34.165.171.196',
  },
  {
    validator_index: 72,
    network:
      '/dns/mainnet.aptos-validator.com/tcp/6180/noise-ik/c5f1d24f85c892781f4218e100d5ad92ba05650369ff23833bfec4ccc6f1347d/handshake/0',
    networkIp: '34.165.171.196',
    fullnode:
      '/dns/mainnet.aptos-fullnode.com/tcp/6182/noise-ik/e3430bc567682235924291181123d27944faafbb7b8ee2d61178558974f48d57/handshake/0',
    fullnodeIp: '34.165.12.219',
    type: 'fullnode',
    network_addresses:
      '0x014504021b6d61696e6e65742e6170746f732d76616c696461746f722e636f6d0524180720c5f1d24f85c892781f4218e100d5ad92ba05650369ff23833bfec4ccc6f1347d0800',
    fullnode_addresses:
      '0x014404021a6d61696e6e65742e6170746f732d66756c6c6e6f64652e636f6d0526180720e3430bc567682235924291181123d27944faafbb7b8ee2d61178558974f48d570800',
    status: 'success',
    country: 'Israel',
    city: 'Tel Aviv',
    lat: 32.0852,
    lon: 34.7817,
    query: '34.165.12.219',
  },
  {
    validator_index: 53,
    network:
      '/dns/aptos-validator.nelrann.org/tcp/6180/noise-ik/cc8de9fb7b570bed6b8f0a41aafb22fd77bc6ba0ccce46bda426acf8f81a7156/handshake/0',
    networkIp: '146.19.24.221',
    fullnode:
      '/dns/aptos-fullnode.nelrann.org/tcp/6182/noise-ik/f5b2d9a0d334df6501d1e7c6bb92f15f9ecfaa43d2e1c545a9e9be030d990206/handshake/0',
    fullnodeIp: '185.16.39.30',
    type: 'network',
    network_addresses:
      '0x014504021b6170746f732d76616c696461746f722e6e656c72616e6e2e6f72670524180720cc8de9fb7b570bed6b8f0a41aafb22fd77bc6ba0ccce46bda426acf8f81a71560800',
    fullnode_addresses:
      '0x014404021a6170746f732d66756c6c6e6f64652e6e656c72616e6e2e6f72670526180720f5b2d9a0d334df6501d1e7c6bb92f15f9ecfaa43d2e1c545a9e9be030d9902060800',
    status: 'success',
    country: 'Poland',
    city: 'Warsaw',
    lat: 52.1957,
    lon: 20.9921,
    query: '146.19.24.221',
  },
  {
    validator_index: 53,
    network:
      '/dns/aptos-validator.nelrann.org/tcp/6180/noise-ik/cc8de9fb7b570bed6b8f0a41aafb22fd77bc6ba0ccce46bda426acf8f81a7156/handshake/0',
    networkIp: '146.19.24.221',
    fullnode:
      '/dns/aptos-fullnode.nelrann.org/tcp/6182/noise-ik/f5b2d9a0d334df6501d1e7c6bb92f15f9ecfaa43d2e1c545a9e9be030d990206/handshake/0',
    fullnodeIp: '185.16.39.30',
    type: 'fullnode',
    network_addresses:
      '0x014504021b6170746f732d76616c696461746f722e6e656c72616e6e2e6f72670524180720cc8de9fb7b570bed6b8f0a41aafb22fd77bc6ba0ccce46bda426acf8f81a71560800',
    fullnode_addresses:
      '0x014404021a6170746f732d66756c6c6e6f64652e6e656c72616e6e2e6f72670526180720f5b2d9a0d334df6501d1e7c6bb92f15f9ecfaa43d2e1c545a9e9be030d9902060800',
    status: 'success',
    country: 'Poland',
    city: 'Warsaw',
    lat: 52.1957,
    lon: 20.9921,
    query: '185.16.39.30',
  },
  {
    validator_index: 37,
    network:
      '/dns/aptos-validator0.taras.uno/tcp/6180/noise-ik/0d2cab67c6e6ee8dc0fb513d2ca1964d52a503049f0782ef21919a495027ab0e/handshake/0',
    networkIp: '45.77.61.76',
    fullnode:
      '/dns/aptos-fullnode0.taras.uno/tcp/6182/noise-ik/5fa606e4701e26282bee851ca473bd4e7b23672bf557b816879c1c2ca8c33f7a/handshake/0',
    fullnodeIp: '217.69.15.243',
    type: 'network',
    network_addresses:
      '0x014404021a6170746f732d76616c696461746f72302e74617261732e756e6f05241807200d2cab67c6e6ee8dc0fb513d2ca1964d52a503049f0782ef21919a495027ab0e0800',
    fullnode_addresses:
      '0x01430402196170746f732d66756c6c6e6f6465302e74617261732e756e6f05261807205fa606e4701e26282bee851ca473bd4e7b23672bf557b816879c1c2ca8c33f7a0800',
    status: 'success',
    country: 'France',
    city: 'Aubervilliers',
    lat: 48.9163,
    lon: 2.3869,
    query: '45.77.61.76',
  },
  {
    validator_index: 37,
    network:
      '/dns/aptos-validator0.taras.uno/tcp/6180/noise-ik/0d2cab67c6e6ee8dc0fb513d2ca1964d52a503049f0782ef21919a495027ab0e/handshake/0',
    networkIp: '45.77.61.76',
    fullnode:
      '/dns/aptos-fullnode0.taras.uno/tcp/6182/noise-ik/5fa606e4701e26282bee851ca473bd4e7b23672bf557b816879c1c2ca8c33f7a/handshake/0',
    fullnodeIp: '217.69.15.243',
    type: 'fullnode',
    network_addresses:
      '0x014404021a6170746f732d76616c696461746f72302e74617261732e756e6f05241807200d2cab67c6e6ee8dc0fb513d2ca1964d52a503049f0782ef21919a495027ab0e0800',
    fullnode_addresses:
      '0x01430402196170746f732d66756c6c6e6f6465302e74617261732e756e6f05261807205fa606e4701e26282bee851ca473bd4e7b23672bf557b816879c1c2ca8c33f7a0800',
    status: 'success',
    country: 'France',
    city: 'Aubervilliers',
    lat: 48.9163,
    lon: 2.3869,
    query: '217.69.15.243',
  },
  {
    validator_index: 48,
    network:
      '/ip4/95.143.188.159/tcp/6180/noise-ik/4ef267beac90191dcb61a607333f48ca0b762a27370ca037d198a56fa0d38327/handshake/0',
    networkIp: '95.143.188.159',
    fullnode:
      '/ip4/95.143.188.159/tcp/6182/noise-ik/6ab230dac7d30c3f3f33f41dc37a2c958015f11b10d77a79d3f5c94e614eb778/handshake/0',
    fullnodeIp: '95.143.188.159',
    type: 'network',
    network_addresses:
      '0x012d04005f8fbc9f05241807204ef267beac90191dcb61a607333f48ca0b762a27370ca037d198a56fa0d383270800',
    fullnode_addresses:
      '0x012d04005f8fbc9f05261807206ab230dac7d30c3f3f33f41dc37a2c958015f11b10d77a79d3f5c94e614eb7780800',
    status: 'success',
    country: 'Russia',
    city: 'Moscow',
    lat: 55.7483,
    lon: 37.6171,
    query: '95.143.188.159',
  },
  {
    validator_index: 48,
    network:
      '/ip4/95.143.188.159/tcp/6180/noise-ik/4ef267beac90191dcb61a607333f48ca0b762a27370ca037d198a56fa0d38327/handshake/0',
    networkIp: '95.143.188.159',
    fullnode:
      '/ip4/95.143.188.159/tcp/6182/noise-ik/6ab230dac7d30c3f3f33f41dc37a2c958015f11b10d77a79d3f5c94e614eb778/handshake/0',
    fullnodeIp: '95.143.188.159',
    type: 'fullnode',
    network_addresses:
      '0x012d04005f8fbc9f05241807204ef267beac90191dcb61a607333f48ca0b762a27370ca037d198a56fa0d383270800',
    fullnode_addresses:
      '0x012d04005f8fbc9f05261807206ab230dac7d30c3f3f33f41dc37a2c958015f11b10d77a79d3f5c94e614eb7780800',
    status: 'success',
    country: 'Russia',
    city: 'Moscow',
    lat: 55.7483,
    lon: 37.6171,
    query: '95.143.188.159',
  },
  {
    validator_index: 83,
    network:
      '/dns/validator.aptos.quantnode.tech/tcp/6180/noise-ik/3ffd66c98ce69e5ef6d5834ef47626408d820090d75dd99f937404cdf611c657/handshake/0',
    networkIp: '78.46.41.90',
    fullnode:
      '/dns/fullnode.aptos.quantnode.tech/tcp/6182/noise-ik/5ef7eeb152008d69e49b43286c4380512f392ab2b3ff1267f5bcd283f148a400/handshake/0',
    fullnodeIp: '176.9.54.206',
    type: 'network',
    network_addresses:
      '0x014804021e76616c696461746f722e6170746f732e7175616e746e6f64652e7465636805241807203ffd66c98ce69e5ef6d5834ef47626408d820090d75dd99f937404cdf611c6570800',
    fullnode_addresses:
      '0x014704021d66756c6c6e6f64652e6170746f732e7175616e746e6f64652e7465636805261807205ef7eeb152008d69e49b43286c4380512f392ab2b3ff1267f5bcd283f148a4000800',
    status: 'success',
    country: 'Germany',
    city: 'Falkenstein',
    lat: 50.475,
    lon: 12.365,
    query: '78.46.41.90',
  },
  {
    validator_index: 83,
    network:
      '/dns/validator.aptos.quantnode.tech/tcp/6180/noise-ik/3ffd66c98ce69e5ef6d5834ef47626408d820090d75dd99f937404cdf611c657/handshake/0',
    networkIp: '78.46.41.90',
    fullnode:
      '/dns/fullnode.aptos.quantnode.tech/tcp/6182/noise-ik/5ef7eeb152008d69e49b43286c4380512f392ab2b3ff1267f5bcd283f148a400/handshake/0',
    fullnodeIp: '176.9.54.206',
    type: 'fullnode',
    network_addresses:
      '0x014804021e76616c696461746f722e6170746f732e7175616e746e6f64652e7465636805241807203ffd66c98ce69e5ef6d5834ef47626408d820090d75dd99f937404cdf611c6570800',
    fullnode_addresses:
      '0x014704021d66756c6c6e6f64652e6170746f732e7175616e746e6f64652e7465636805261807205ef7eeb152008d69e49b43286c4380512f392ab2b3ff1267f5bcd283f148a4000800',
    status: 'success',
    country: 'Germany',
    city: 'Falkenstein',
    lat: 50.475,
    lon: 12.365,
    query: '176.9.54.206',
  },
  {
    validator_index: 71,
    network:
      '/dns/aptos-mainnet-validator.stakemind.io/tcp/6180/noise-ik/f3be389778ca4e291a7c8accf07e5b5a82bf204f65d0660c92dc4fe98b8e911a/handshake/0',
    networkIp: '159.69.136.153',
    fullnode:
      '/dns/aptos-mainnet-fullnode.stakemind.io/tcp/6182/noise-ik/113e6ff4cbc04cac4c2b2ba001dd4e8a197565d743067812db4d6083e3470719/handshake/0',
    fullnodeIp: '138.201.95.220',
    type: 'network',
    network_addresses:
      '0x014e0402246170746f732d6d61696e6e65742d76616c696461746f722e7374616b656d696e642e696f0524180720f3be389778ca4e291a7c8accf07e5b5a82bf204f65d0660c92dc4fe98b8e911a0800',
    fullnode_addresses:
      '0x014d0402236170746f732d6d61696e6e65742d66756c6c6e6f64652e7374616b656d696e642e696f0526180720113e6ff4cbc04cac4c2b2ba001dd4e8a197565d743067812db4d6083e34707190800',
    status: 'success',
    country: 'Germany',
    city: 'Nuremberg',
    lat: 49.4423,
    lon: 11.0191,
    query: '159.69.136.153',
  },
  {
    validator_index: 71,
    network:
      '/dns/aptos-mainnet-validator.stakemind.io/tcp/6180/noise-ik/f3be389778ca4e291a7c8accf07e5b5a82bf204f65d0660c92dc4fe98b8e911a/handshake/0',
    networkIp: '159.69.136.153',
    fullnode:
      '/dns/aptos-mainnet-fullnode.stakemind.io/tcp/6182/noise-ik/113e6ff4cbc04cac4c2b2ba001dd4e8a197565d743067812db4d6083e3470719/handshake/0',
    fullnodeIp: '138.201.95.220',
    type: 'fullnode',
    network_addresses:
      '0x014e0402246170746f732d6d61696e6e65742d76616c696461746f722e7374616b656d696e642e696f0524180720f3be389778ca4e291a7c8accf07e5b5a82bf204f65d0660c92dc4fe98b8e911a0800',
    fullnode_addresses:
      '0x014d0402236170746f732d6d61696e6e65742d66756c6c6e6f64652e7374616b656d696e642e696f0526180720113e6ff4cbc04cac4c2b2ba001dd4e8a197565d743067812db4d6083e34707190800',
    status: 'success',
    country: 'Germany',
    city: 'Falkenstein',
    lat: 50.475,
    lon: 12.365,
    query: '138.201.95.220',
  },
  {
    validator_index: 93,
    network:
      '/dns/premainnet.lagosian.xyz/tcp/6180/noise-ik/b2287fa15820f46104b2e3bc76d05a668dd5cebe5c7eff1bd2829348239dc620/handshake/0',
    networkIp: '108.61.117.113',
    fullnode: null,
    type: 'network',
    network_addresses:
      '0x01410402177072656d61696e6e65742e6c61676f7369616e2e78797a0524180720b2287fa15820f46104b2e3bc76d05a668dd5cebe5c7eff1bd2829348239dc6200800',
    fullnode_addresses: '0x00',
    status: 'success',
    country: 'Netherlands',
    city: 'Amsterdam',
    lat: 52.3891,
    lon: 4.6563,
    query: '108.61.117.113',
  },
  {
    validator_index: 32,
    network:
      '/dns/aptos.mindheartsoul.org/tcp/6180/noise-ik/15e05ac0fca1988a19e813022bf5d77671670d5ecf64a3ccaa83ef4556d9d372/handshake/0',
    networkIp: '142.132.139.167',
    fullnode:
      '/dns/aptos.mindheartsoul.org/tcp/6182/noise-ik/fa2b01e09879fc1b030ea75f6a9a358f2f855c098ddf5172c26455e224e8bc16/handshake/0',
    fullnodeIp: '142.132.139.167',
    type: 'network',
    network_addresses:
      '0x01410402176170746f732e6d696e646865617274736f756c2e6f7267052418072015e05ac0fca1988a19e813022bf5d77671670d5ecf64a3ccaa83ef4556d9d3720800',
    fullnode_addresses:
      '0x01410402176170746f732e6d696e646865617274736f756c2e6f72670526180720fa2b01e09879fc1b030ea75f6a9a358f2f855c098ddf5172c26455e224e8bc160800',
    status: 'success',
    country: 'Germany',
    city: 'Falkenstein',
    lat: 50.4777,
    lon: 12.3649,
    query: '142.132.139.167',
  },
  {
    validator_index: 32,
    network:
      '/dns/aptos.mindheartsoul.org/tcp/6180/noise-ik/15e05ac0fca1988a19e813022bf5d77671670d5ecf64a3ccaa83ef4556d9d372/handshake/0',
    networkIp: '142.132.139.167',
    fullnode:
      '/dns/aptos.mindheartsoul.org/tcp/6182/noise-ik/fa2b01e09879fc1b030ea75f6a9a358f2f855c098ddf5172c26455e224e8bc16/handshake/0',
    fullnodeIp: '142.132.139.167',
    type: 'fullnode',
    network_addresses:
      '0x01410402176170746f732e6d696e646865617274736f756c2e6f7267052418072015e05ac0fca1988a19e813022bf5d77671670d5ecf64a3ccaa83ef4556d9d3720800',
    fullnode_addresses:
      '0x01410402176170746f732e6d696e646865617274736f756c2e6f72670526180720fa2b01e09879fc1b030ea75f6a9a358f2f855c098ddf5172c26455e224e8bc160800',
    status: 'success',
    country: 'Germany',
    city: 'Falkenstein',
    lat: 50.4777,
    lon: 12.3649,
    query: '142.132.139.167',
  },
  {
    validator_index: 31,
    network:
      '/ip4/167.179.89.132/tcp/6180/noise-ik/caaebd25ad702242e94fbbdf391aa81aa041a937815851015eba8ade96c6fc71/handshake/0',
    networkIp: '167.179.89.132',
    fullnode:
      '/ip4/45.77.183.251/tcp/6182/noise-ik/b0c58e2ef9958ccd3ac1e6fcafa8752594c76b5808b3642d3bc09c6ea4bd9059/handshake/0',
    fullnodeIp: '45.77.183.251',
    type: 'network',
    network_addresses:
      '0x012d0400a7b359840524180720caaebd25ad702242e94fbbdf391aa81aa041a937815851015eba8ade96c6fc710800',
    fullnode_addresses:
      '0x012d04002d4db7fb0526180720b0c58e2ef9958ccd3ac1e6fcafa8752594c76b5808b3642d3bc09c6ea4bd90590800',
    status: 'success',
    country: 'Japan',
    city: 'Shinagawa',
    lat: 35.6092,
    lon: 139.73,
    query: '167.179.89.132',
  },
  {
    validator_index: 31,
    network:
      '/ip4/167.179.89.132/tcp/6180/noise-ik/caaebd25ad702242e94fbbdf391aa81aa041a937815851015eba8ade96c6fc71/handshake/0',
    networkIp: '167.179.89.132',
    fullnode:
      '/ip4/45.77.183.251/tcp/6182/noise-ik/b0c58e2ef9958ccd3ac1e6fcafa8752594c76b5808b3642d3bc09c6ea4bd9059/handshake/0',
    fullnodeIp: '45.77.183.251',
    type: 'fullnode',
    network_addresses:
      '0x012d0400a7b359840524180720caaebd25ad702242e94fbbdf391aa81aa041a937815851015eba8ade96c6fc710800',
    fullnode_addresses:
      '0x012d04002d4db7fb0526180720b0c58e2ef9958ccd3ac1e6fcafa8752594c76b5808b3642d3bc09c6ea4bd90590800',
    status: 'success',
    country: 'Japan',
    city: 'Shinagawa',
    lat: 35.6092,
    lon: 139.73,
    query: '45.77.183.251',
  },
  {
    validator_index: 33,
    network:
      '/dns/vn.mainnet.aptos.eu.org/tcp/6180/noise-ik/c30bc1e1aad627d791ef6884016ea29c93fd07562b5f337799f6bc1368323b6a/handshake/0',
    networkIp: '192.99.233.2',
    fullnode:
      '/dns/mainnet.aptos.eu.org/tcp/6182/noise-ik/1b91523ee77cef70192b0d20197049d53d208a61fc89391eb6c067a9d4b49a5d/handshake/0',
    fullnodeIp: '116.202.84.31',
    type: 'network',
    network_addresses:
      '0x0141040217766e2e6d61696e6e65742e6170746f732e65752e6f72670524180720c30bc1e1aad627d791ef6884016ea29c93fd07562b5f337799f6bc1368323b6a0800',
    fullnode_addresses:
      '0x013e0402146d61696e6e65742e6170746f732e65752e6f726705261807201b91523ee77cef70192b0d20197049d53d208a61fc89391eb6c067a9d4b49a5d0800',
    status: 'success',
    country: 'Canada',
    city: 'Montreal',
    lat: 45.5063,
    lon: -73.5794,
    query: '192.99.233.2',
  },
  {
    validator_index: 33,
    network:
      '/dns/vn.mainnet.aptos.eu.org/tcp/6180/noise-ik/c30bc1e1aad627d791ef6884016ea29c93fd07562b5f337799f6bc1368323b6a/handshake/0',
    networkIp: '192.99.233.2',
    fullnode:
      '/dns/mainnet.aptos.eu.org/tcp/6182/noise-ik/1b91523ee77cef70192b0d20197049d53d208a61fc89391eb6c067a9d4b49a5d/handshake/0',
    fullnodeIp: '116.202.84.31',
    type: 'fullnode',
    network_addresses:
      '0x0141040217766e2e6d61696e6e65742e6170746f732e65752e6f72670524180720c30bc1e1aad627d791ef6884016ea29c93fd07562b5f337799f6bc1368323b6a0800',
    fullnode_addresses:
      '0x013e0402146d61696e6e65742e6170746f732e65752e6f726705261807201b91523ee77cef70192b0d20197049d53d208a61fc89391eb6c067a9d4b49a5d0800',
    status: 'success',
    country: 'Germany',
    city: 'Falkenstein',
    lat: 50.475,
    lon: 12.365,
    query: '116.202.84.31',
  },
  {
    validator_index: 40,
    network:
      '/dns/validator.mainnet.aptos.movemove.org/tcp/6180/noise-ik/9e571606d7287014a887ffd1d590049e600c2af0e1f01173dfcd7f2960c7c722/handshake/0',
    networkIp: '139.162.14.168',
    fullnode:
      '/dns/fullnode.mainnet.aptos.movemove.org/tcp/6182/noise-ik/30d434dca09c79413cbf885dae074a2390f3803371cd170f4e3c51a773522c4a/handshake/0',
    fullnodeIp: '139.180.212.27',
    type: 'network',
    network_addresses:
      '0x014e04022476616c696461746f722e6d61696e6e65742e6170746f732e6d6f76656d6f76652e6f726705241807209e571606d7287014a887ffd1d590049e600c2af0e1f01173dfcd7f2960c7c7220800',
    fullnode_addresses:
      '0x014d04022366756c6c6e6f64652e6d61696e6e65742e6170746f732e6d6f76656d6f76652e6f7267052618072030d434dca09c79413cbf885dae074a2390f3803371cd170f4e3c51a773522c4a0800',
    status: 'success',
    country: 'Singapore',
    city: 'Singapore',
    lat: 1.35208,
    lon: 103.82,
    query: '139.162.14.168',
  },
  {
    validator_index: 40,
    network:
      '/dns/validator.mainnet.aptos.movemove.org/tcp/6180/noise-ik/9e571606d7287014a887ffd1d590049e600c2af0e1f01173dfcd7f2960c7c722/handshake/0',
    networkIp: '139.162.14.168',
    fullnode:
      '/dns/fullnode.mainnet.aptos.movemove.org/tcp/6182/noise-ik/30d434dca09c79413cbf885dae074a2390f3803371cd170f4e3c51a773522c4a/handshake/0',
    fullnodeIp: '139.180.212.27',
    type: 'fullnode',
    network_addresses:
      '0x014e04022476616c696461746f722e6d61696e6e65742e6170746f732e6d6f76656d6f76652e6f726705241807209e571606d7287014a887ffd1d590049e600c2af0e1f01173dfcd7f2960c7c7220800',
    fullnode_addresses:
      '0x014d04022366756c6c6e6f64652e6d61696e6e65742e6170746f732e6d6f76656d6f76652e6f7267052618072030d434dca09c79413cbf885dae074a2390f3803371cd170f4e3c51a773522c4a0800',
    status: 'success',
    country: 'Singapore',
    city: 'Singapore',
    lat: 1.32123,
    lon: 103.695,
    query: '139.180.212.27',
  },
  {
    validator_index: 41,
    network:
      '/ip4/135.148.34.229/tcp/6180/noise-ik/08b62a1f9b882eb7955ab3ed49942554c3a6c2163565a7f59fef453d737d1555/handshake/0',
    networkIp: '135.148.34.229',
    fullnode:
      '/ip4/69.174.96.162/tcp/6182/noise-ik/06b93e83ff852d12012d87c4c6357c3218388c722fd9c867937fac641b82bd1a/handshake/0',
    fullnodeIp: '69.174.96.162',
    type: 'network',
    network_addresses:
      '0x012d0400879422e5052418072008b62a1f9b882eb7955ab3ed49942554c3a6c2163565a7f59fef453d737d15550800',
    fullnode_addresses:
      '0x012d040045ae60a2052618072006b93e83ff852d12012d87c4c6357c3218388c722fd9c867937fac641b82bd1a0800',
    status: 'success',
    country: 'United States',
    city: 'Reston',
    lat: 38.9555,
    lon: -77.3643,
    query: '135.148.34.229',
  },
  {
    validator_index: 41,
    network:
      '/ip4/135.148.34.229/tcp/6180/noise-ik/08b62a1f9b882eb7955ab3ed49942554c3a6c2163565a7f59fef453d737d1555/handshake/0',
    networkIp: '135.148.34.229',
    fullnode:
      '/ip4/69.174.96.162/tcp/6182/noise-ik/06b93e83ff852d12012d87c4c6357c3218388c722fd9c867937fac641b82bd1a/handshake/0',
    fullnodeIp: '69.174.96.162',
    type: 'fullnode',
    network_addresses:
      '0x012d0400879422e5052418072008b62a1f9b882eb7955ab3ed49942554c3a6c2163565a7f59fef453d737d15550800',
    fullnode_addresses:
      '0x012d040045ae60a2052618072006b93e83ff852d12012d87c4c6357c3218388c722fd9c867937fac641b82bd1a0800',
    status: 'success',
    country: 'United States',
    city: 'Secaucus',
    lat: 40.7876,
    lon: -74.06,
    query: '69.174.96.162',
  },
  {
    validator_index: 38,
    network:
      '/ip4/65.109.70.119/tcp/6180/noise-ik/a63e63ed35e7d3a41d1e1c81790bccb1b2ce622378e3b3086d382d57892fbc4b/handshake/0',
    networkIp: '65.109.70.119',
    fullnode:
      '/ip4/65.109.88.152/tcp/6182/noise-ik/3b3aa2faaf3f8c3a5ef4da88587376965ee5dadfd9ff9aac78bdb9b1f7370162/handshake/0',
    fullnodeIp: '65.109.88.152',
    type: 'network',
    network_addresses:
      '0x012d0400416d46770524180720a63e63ed35e7d3a41d1e1c81790bccb1b2ce622378e3b3086d382d57892fbc4b0800',
    fullnode_addresses:
      '0x012d0400416d589805261807203b3aa2faaf3f8c3a5ef4da88587376965ee5dadfd9ff9aac78bdb9b1f73701620800',
    status: 'success',
    country: 'Finland',
    city: 'Helsinki',
    lat: 60.1797,
    lon: 24.9344,
    query: '65.109.70.119',
  },
  {
    validator_index: 38,
    network:
      '/ip4/65.109.70.119/tcp/6180/noise-ik/a63e63ed35e7d3a41d1e1c81790bccb1b2ce622378e3b3086d382d57892fbc4b/handshake/0',
    networkIp: '65.109.70.119',
    fullnode:
      '/ip4/65.109.88.152/tcp/6182/noise-ik/3b3aa2faaf3f8c3a5ef4da88587376965ee5dadfd9ff9aac78bdb9b1f7370162/handshake/0',
    fullnodeIp: '65.109.88.152',
    type: 'fullnode',
    network_addresses:
      '0x012d0400416d46770524180720a63e63ed35e7d3a41d1e1c81790bccb1b2ce622378e3b3086d382d57892fbc4b0800',
    fullnode_addresses:
      '0x012d0400416d589805261807203b3aa2faaf3f8c3a5ef4da88587376965ee5dadfd9ff9aac78bdb9b1f73701620800',
    status: 'success',
    country: 'Finland',
    city: 'Helsinki',
    lat: 60.1797,
    lon: 24.9344,
    query: '65.109.88.152',
  },
  {
    validator_index: 42,
    network:
      '/ip4/144.76.114.5/tcp/6180/noise-ik/f2e7f1e0d23ee6f06c687e1cddf05070239a755208a2f2df252c246785afa318/handshake/0',
    networkIp: '144.76.114.5',
    fullnode:
      '/ip4/103.224.244.210/tcp/6182/noise-ik/ea03450ef44fc52dd39e30b1786eb999d6bf6d22f6d3e5341730707c5f164c1c/handshake/0',
    fullnodeIp: '103.224.244.210',
    type: 'network',
    network_addresses:
      '0x012d0400904c72050524180720f2e7f1e0d23ee6f06c687e1cddf05070239a755208a2f2df252c246785afa3180800',
    fullnode_addresses:
      '0x012d040067e0f4d20526180720ea03450ef44fc52dd39e30b1786eb999d6bf6d22f6d3e5341730707c5f164c1c0800',
    status: 'success',
    country: 'Germany',
    city: 'Falkenstein',
    lat: 50.475,
    lon: 12.365,
    query: '144.76.114.5',
  },
  {
    validator_index: 42,
    network:
      '/ip4/144.76.114.5/tcp/6180/noise-ik/f2e7f1e0d23ee6f06c687e1cddf05070239a755208a2f2df252c246785afa318/handshake/0',
    networkIp: '144.76.114.5',
    fullnode:
      '/ip4/103.224.244.210/tcp/6182/noise-ik/ea03450ef44fc52dd39e30b1786eb999d6bf6d22f6d3e5341730707c5f164c1c/handshake/0',
    fullnodeIp: '103.224.244.210',
    type: 'fullnode',
    network_addresses:
      '0x012d0400904c72050524180720f2e7f1e0d23ee6f06c687e1cddf05070239a755208a2f2df252c246785afa3180800',
    fullnode_addresses:
      '0x012d040067e0f4d20526180720ea03450ef44fc52dd39e30b1786eb999d6bf6d22f6d3e5341730707c5f164c1c0800',
    status: 'success',
    country: 'India',
    city: 'Navi Mumbai',
    lat: 19.0565,
    lon: 73.0656,
    query: '103.224.244.210',
  },
  {
    validator_index: 35,
    network:
      '/ip4/52.67.71.156/tcp/6180/noise-ik/db1679d36960c0f05ff9c5f49b7fd6529f902a11fe456fe6d95747f945f9477d/handshake/0',
    networkIp: '52.67.71.156',
    fullnode:
      '/ip4/52.67.118.223/tcp/6182/noise-ik/8c9255c8b64a0c01d726045dfc3ca0b512e51e41e74fc96a1152b98b1a5bfe41/handshake/0',
    fullnodeIp: '52.67.118.223',
    type: 'network',
    network_addresses:
      '0x012d04003443479c0524180720db1679d36960c0f05ff9c5f49b7fd6529f902a11fe456fe6d95747f945f9477d0800',
    fullnode_addresses:
      '0x012d0400344376df05261807208c9255c8b64a0c01d726045dfc3ca0b512e51e41e74fc96a1152b98b1a5bfe410800',
    status: 'success',
    country: 'Brazil',
    city: 'São Paulo',
    lat: -23.5505,
    lon: -46.6333,
    query: '52.67.71.156',
  },
  {
    validator_index: 35,
    network:
      '/ip4/52.67.71.156/tcp/6180/noise-ik/db1679d36960c0f05ff9c5f49b7fd6529f902a11fe456fe6d95747f945f9477d/handshake/0',
    networkIp: '52.67.71.156',
    fullnode:
      '/ip4/52.67.118.223/tcp/6182/noise-ik/8c9255c8b64a0c01d726045dfc3ca0b512e51e41e74fc96a1152b98b1a5bfe41/handshake/0',
    fullnodeIp: '52.67.118.223',
    type: 'fullnode',
    network_addresses:
      '0x012d04003443479c0524180720db1679d36960c0f05ff9c5f49b7fd6529f902a11fe456fe6d95747f945f9477d0800',
    fullnode_addresses:
      '0x012d0400344376df05261807208c9255c8b64a0c01d726045dfc3ca0b512e51e41e74fc96a1152b98b1a5bfe410800',
    status: 'success',
    country: 'Brazil',
    city: 'São Paulo',
    lat: -23.5505,
    lon: -46.6333,
    query: '52.67.118.223',
  },
  {
    validator_index: 36,
    network:
      '/dns/validator.mainnet.aptos.nodes.center/tcp/6180/noise-ik/7da1a825a6375123a1b264497ec665ad993a77fc30ffae3f06f7a7b263449828/handshake/0',
    networkIp: '216.238.66.193',
    fullnode:
      '/dns/fullnode.mainnet.aptos.nodes.center/tcp/6182/noise-ik/630fb419660d6e57b92822f487bb5db6b0293f96f1f8631777ccfbeb366a4339/handshake/0',
    fullnodeIp: '216.238.69.109',
    type: 'network',
    network_addresses:
      '0x014e04022476616c696461746f722e6d61696e6e65742e6170746f732e6e6f6465732e63656e74657205241807207da1a825a6375123a1b264497ec665ad993a77fc30ffae3f06f7a7b2634498280800',
    fullnode_addresses:
      '0x014d04022366756c6c6e6f64652e6d61696e6e65742e6170746f732e6e6f6465732e63656e7465720526180720630fb419660d6e57b92822f487bb5db6b0293f96f1f8631777ccfbeb366a43390800',
    status: 'success',
    country: 'Mexico',
    city: 'Querétaro City',
    lat: 20.5762,
    lon: -100.2951,
    query: '216.238.66.193',
  },
  {
    validator_index: 36,
    network:
      '/dns/validator.mainnet.aptos.nodes.center/tcp/6180/noise-ik/7da1a825a6375123a1b264497ec665ad993a77fc30ffae3f06f7a7b263449828/handshake/0',
    networkIp: '216.238.66.193',
    fullnode:
      '/dns/fullnode.mainnet.aptos.nodes.center/tcp/6182/noise-ik/630fb419660d6e57b92822f487bb5db6b0293f96f1f8631777ccfbeb366a4339/handshake/0',
    fullnodeIp: '216.238.69.109',
    type: 'fullnode',
    network_addresses:
      '0x014e04022476616c696461746f722e6d61696e6e65742e6170746f732e6e6f6465732e63656e74657205241807207da1a825a6375123a1b264497ec665ad993a77fc30ffae3f06f7a7b2634498280800',
    fullnode_addresses:
      '0x014d04022366756c6c6e6f64652e6d61696e6e65742e6170746f732e6e6f6465732e63656e7465720526180720630fb419660d6e57b92822f487bb5db6b0293f96f1f8631777ccfbeb366a43390800',
    status: 'success',
    country: 'Mexico',
    city: 'Querétaro City',
    lat: 20.5762,
    lon: -100.2951,
    query: '216.238.69.109',
  },
  {
    validator_index: 52,
    network:
      '/ip4/162.19.204.3/tcp/6180/noise-ik/b310eb2306b2651dbb1c202c2a67dde8d20a7d73bf2a2542dad0e882e9ff9e08/handshake/0',
    networkIp: '162.19.204.3',
    fullnode:
      '/ip4/46.38.255.44/tcp/6182/noise-ik/7cc49b1b576b04b667b1e69926182ffd902255953ec6d3d6d7d580a03074a538/handshake/0',
    fullnodeIp: '46.38.255.44',
    type: 'network',
    network_addresses:
      '0x012d0400a213cc030524180720b310eb2306b2651dbb1c202c2a67dde8d20a7d73bf2a2542dad0e882e9ff9e080800',
    fullnode_addresses:
      '0x012d04002e26ff2c05261807207cc49b1b576b04b667b1e69926182ffd902255953ec6d3d6d7d580a03074a5380800',
    status: 'success',
    country: 'Germany',
    city: 'Limburg an der Lahn',
    lat: 50.3986,
    lon: 8.07958,
    query: '162.19.204.3',
  },
  {
    validator_index: 52,
    network:
      '/ip4/162.19.204.3/tcp/6180/noise-ik/b310eb2306b2651dbb1c202c2a67dde8d20a7d73bf2a2542dad0e882e9ff9e08/handshake/0',
    networkIp: '162.19.204.3',
    fullnode:
      '/ip4/46.38.255.44/tcp/6182/noise-ik/7cc49b1b576b04b667b1e69926182ffd902255953ec6d3d6d7d580a03074a538/handshake/0',
    fullnodeIp: '46.38.255.44',
    type: 'fullnode',
    network_addresses:
      '0x012d0400a213cc030524180720b310eb2306b2651dbb1c202c2a67dde8d20a7d73bf2a2542dad0e882e9ff9e080800',
    fullnode_addresses:
      '0x012d04002e26ff2c05261807207cc49b1b576b04b667b1e69926182ffd902255953ec6d3d6d7d580a03074a5380800',
    status: 'success',
    country: 'Germany',
    city: 'Nuremberg',
    lat: 49.4521,
    lon: 11.0767,
    query: '46.38.255.44',
  },
  {
    validator_index: 34,
    network:
      '/dns/aptos.validator.nodemover.com/tcp/6180/noise-ik/7087e90c49704f26e3a2ec47b1ad364b7024680b9559a12deca94c96d5963b0d/handshake/0',
    networkIp: '15.235.53.60',
    fullnode:
      '/dns/aptos.vfn.nodemover.com/tcp/6182/noise-ik/942efab5d95d7db0f2326102bf20c600d7ac06831fc41c507172b0c46f2e4751/handshake/0',
    fullnodeIp: '207.148.26.44',
    type: 'network',
    network_addresses:
      '0x014704021d6170746f732e76616c696461746f722e6e6f64656d6f7665722e636f6d05241807207087e90c49704f26e3a2ec47b1ad364b7024680b9559a12deca94c96d5963b0d0800',
    fullnode_addresses:
      '0x01410402176170746f732e76666e2e6e6f64656d6f7665722e636f6d0526180720942efab5d95d7db0f2326102bf20c600d7ac06831fc41c507172b0c46f2e47510800',
    status: 'success',
    country: 'Canada',
    city: 'Victoria',
    lat: 48.4574,
    lon: -123.3436,
    query: '15.235.53.60',
  },
  {
    validator_index: 34,
    network:
      '/dns/aptos.validator.nodemover.com/tcp/6180/noise-ik/7087e90c49704f26e3a2ec47b1ad364b7024680b9559a12deca94c96d5963b0d/handshake/0',
    networkIp: '15.235.53.60',
    fullnode:
      '/dns/aptos.vfn.nodemover.com/tcp/6182/noise-ik/942efab5d95d7db0f2326102bf20c600d7ac06831fc41c507172b0c46f2e4751/handshake/0',
    fullnodeIp: '207.148.26.44',
    type: 'fullnode',
    network_addresses:
      '0x014704021d6170746f732e76616c696461746f722e6e6f64656d6f7665722e636f6d05241807207087e90c49704f26e3a2ec47b1ad364b7024680b9559a12deca94c96d5963b0d0800',
    fullnode_addresses:
      '0x01410402176170746f732e76666e2e6e6f64656d6f7665722e636f6d0526180720942efab5d95d7db0f2326102bf20c600d7ac06831fc41c507172b0c46f2e47510800',
    status: 'success',
    country: 'United States',
    city: 'Piscataway',
    lat: 40.5511,
    lon: -74.4606,
    query: '207.148.26.44',
  },
  {
    validator_index: 39,
    network:
      '/ip4/65.109.70.110/tcp/6180/noise-ik/cea3bc52d574788ae39e581947c19b8d20bd1740ccc215af7df6e1ff52b37961/handshake/0',
    networkIp: '65.109.70.110',
    fullnode:
      '/ip4/195.3.223.190/tcp/6182/noise-ik/338c4da1614934a16d553264cadfd4909fd13161b83717ef93861fc7a8c91622/handshake/0',
    fullnodeIp: '195.3.223.190',
    type: 'network',
    network_addresses:
      '0x012d0400416d466e0524180720cea3bc52d574788ae39e581947c19b8d20bd1740ccc215af7df6e1ff52b379610800',
    fullnode_addresses:
      '0x012d0400c303dfbe0526180720338c4da1614934a16d553264cadfd4909fd13161b83717ef93861fc7a8c916220800',
    status: 'success',
    country: 'Finland',
    city: 'Helsinki',
    lat: 60.1797,
    lon: 24.9344,
    query: '65.109.70.110',
  },
  {
    validator_index: 39,
    network:
      '/ip4/65.109.70.110/tcp/6180/noise-ik/cea3bc52d574788ae39e581947c19b8d20bd1740ccc215af7df6e1ff52b37961/handshake/0',
    networkIp: '65.109.70.110',
    fullnode:
      '/ip4/195.3.223.190/tcp/6182/noise-ik/338c4da1614934a16d553264cadfd4909fd13161b83717ef93861fc7a8c91622/handshake/0',
    fullnodeIp: '195.3.223.190',
    type: 'fullnode',
    network_addresses:
      '0x012d0400416d466e0524180720cea3bc52d574788ae39e581947c19b8d20bd1740ccc215af7df6e1ff52b379610800',
    fullnode_addresses:
      '0x012d0400c303dfbe0526180720338c4da1614934a16d553264cadfd4909fd13161b83717ef93861fc7a8c916220800',
    status: 'success',
    country: 'Poland',
    city: 'Warsaw',
    lat: 52.1914,
    lon: 21.0002,
    query: '195.3.223.190',
  },
  {
    validator_index: 49,
    network:
      '/dns/validator.aptoslabs.ltd/tcp/6180/noise-ik/8db73be4c908e5bab823e27ac222cd85aea6f4d0d61e5e157bbac43403dfd455/handshake/0',
    networkIp: '89.163.220.70',
    fullnode:
      '/dns/fullnode.aptoslabs.ltd/tcp/6182/noise-ik/9801bf1bb28f45cebe83cdd33550eff87c4727d3e85edbd001f047fdb1038f7c/handshake/0',
    fullnodeIp: '65.109.39.154',
    type: 'network',
    network_addresses:
      '0x014104021776616c696461746f722e6170746f736c6162732e6c746405241807208db73be4c908e5bab823e27ac222cd85aea6f4d0d61e5e157bbac43403dfd4550800',
    fullnode_addresses:
      '0x014004021666756c6c6e6f64652e6170746f736c6162732e6c746405261807209801bf1bb28f45cebe83cdd33550eff87c4727d3e85edbd001f047fdb1038f7c0800',
    status: 'success',
    country: 'Germany',
    city: 'Düsseldorf',
    lat: 51.2277,
    lon: 6.77346,
    query: '89.163.220.70',
  },
  {
    validator_index: 49,
    network:
      '/dns/validator.aptoslabs.ltd/tcp/6180/noise-ik/8db73be4c908e5bab823e27ac222cd85aea6f4d0d61e5e157bbac43403dfd455/handshake/0',
    networkIp: '89.163.220.70',
    fullnode:
      '/dns/fullnode.aptoslabs.ltd/tcp/6182/noise-ik/9801bf1bb28f45cebe83cdd33550eff87c4727d3e85edbd001f047fdb1038f7c/handshake/0',
    fullnodeIp: '65.109.39.154',
    type: 'fullnode',
    network_addresses:
      '0x014104021776616c696461746f722e6170746f736c6162732e6c746405241807208db73be4c908e5bab823e27ac222cd85aea6f4d0d61e5e157bbac43403dfd4550800',
    fullnode_addresses:
      '0x014004021666756c6c6e6f64652e6170746f736c6162732e6c746405261807209801bf1bb28f45cebe83cdd33550eff87c4727d3e85edbd001f047fdb1038f7c0800',
    status: 'success',
    country: 'Finland',
    city: 'Helsinki',
    lat: 60.1797,
    lon: 24.9344,
    query: '65.109.39.154',
  },
  {
    validator_index: 59,
    network:
      '/dns/v.aptoslabs.cc/tcp/6180/noise-ik/50fb8258d65e8e55f4e683e7c1828e8bf8df41b437a03751cfa71ee09b822d7c/handshake/0',
    networkIp: '65.109.70.253',
    fullnode:
      '/dns/f.aptoslabs.cc/tcp/6182/noise-ik/b8d25776ffffc2dcd328df80debaa651068cf3dd7e909e962289b935298e026b/handshake/0',
    fullnodeIp: '65.109.38.34',
    type: 'network',
    network_addresses:
      '0x013804020e762e6170746f736c6162732e6363052418072050fb8258d65e8e55f4e683e7c1828e8bf8df41b437a03751cfa71ee09b822d7c0800',
    fullnode_addresses:
      '0x013804020e662e6170746f736c6162732e63630526180720b8d25776ffffc2dcd328df80debaa651068cf3dd7e909e962289b935298e026b0800',
    status: 'success',
    country: 'Finland',
    city: 'Helsinki',
    lat: 60.1797,
    lon: 24.9344,
    query: '65.109.70.253',
  },
  {
    validator_index: 59,
    network:
      '/dns/v.aptoslabs.cc/tcp/6180/noise-ik/50fb8258d65e8e55f4e683e7c1828e8bf8df41b437a03751cfa71ee09b822d7c/handshake/0',
    networkIp: '65.109.70.253',
    fullnode:
      '/dns/f.aptoslabs.cc/tcp/6182/noise-ik/b8d25776ffffc2dcd328df80debaa651068cf3dd7e909e962289b935298e026b/handshake/0',
    fullnodeIp: '65.109.38.34',
    type: 'fullnode',
    network_addresses:
      '0x013804020e762e6170746f736c6162732e6363052418072050fb8258d65e8e55f4e683e7c1828e8bf8df41b437a03751cfa71ee09b822d7c0800',
    fullnode_addresses:
      '0x013804020e662e6170746f736c6162732e63630526180720b8d25776ffffc2dcd328df80debaa651068cf3dd7e909e962289b935298e026b0800',
    status: 'success',
    country: 'Finland',
    city: 'Helsinki',
    lat: 60.1797,
    lon: 24.9344,
    query: '65.109.38.34',
  },
  {
    validator_index: 58,
    network:
      '/dns/validator.dott3.click/tcp/6180/noise-ik/c381325a62643e3d717ffb80a520b397a3d6e4a25941ebb9dd570d85b8afd72c/handshake/0',
    networkIp: '13.114.143.80',
    fullnode:
      '/dns/vfn.dott3.click/tcp/6182/noise-ik/0c9ffb2abeee02eb2b6a7430b48831ba163971603ebb2e3bcb063e92b1657d60/handshake/0',
    fullnodeIp: '13.231.21.187',
    type: 'network',
    network_addresses:
      '0x013f04021576616c696461746f722e646f7474332e636c69636b0524180720c381325a62643e3d717ffb80a520b397a3d6e4a25941ebb9dd570d85b8afd72c0800',
    fullnode_addresses:
      '0x013904020f76666e2e646f7474332e636c69636b05261807200c9ffb2abeee02eb2b6a7430b48831ba163971603ebb2e3bcb063e92b1657d600800',
    status: 'success',
    country: 'Japan',
    city: 'Tokyo',
    lat: 35.6895,
    lon: 139.692,
    query: '13.114.143.80',
  },
  {
    validator_index: 58,
    network:
      '/dns/validator.dott3.click/tcp/6180/noise-ik/c381325a62643e3d717ffb80a520b397a3d6e4a25941ebb9dd570d85b8afd72c/handshake/0',
    networkIp: '13.114.143.80',
    fullnode:
      '/dns/vfn.dott3.click/tcp/6182/noise-ik/0c9ffb2abeee02eb2b6a7430b48831ba163971603ebb2e3bcb063e92b1657d60/handshake/0',
    fullnodeIp: '13.231.21.187',
    type: 'fullnode',
    network_addresses:
      '0x013f04021576616c696461746f722e646f7474332e636c69636b0524180720c381325a62643e3d717ffb80a520b397a3d6e4a25941ebb9dd570d85b8afd72c0800',
    fullnode_addresses:
      '0x013904020f76666e2e646f7474332e636c69636b05261807200c9ffb2abeee02eb2b6a7430b48831ba163971603ebb2e3bcb063e92b1657d600800',
    status: 'success',
    country: 'Japan',
    city: 'Tokyo',
    lat: 35.6895,
    lon: 139.692,
    query: '13.231.21.187',
  },
  {
    validator_index: 61,
    network:
      '/ip4/5.22.216.240/tcp/6180/noise-ik/69db73af2b6c12b4d15d8cc7875f7770bbc3b1dc4d8f0f73b2b95bddddc8351e/handshake/0',
    networkIp: '5.22.216.240',
    fullnode:
      '/ip4/194.62.99.198/tcp/6182/noise-ik/7341e5ef2a6a997c8ffa5ee9c3ded95e44fa2373b200e0432035eb052f5a3e7a/handshake/0',
    fullnodeIp: '194.62.99.198',
    type: 'network',
    network_addresses:
      '0x012d04000516d8f0052418072069db73af2b6c12b4d15d8cc7875f7770bbc3b1dc4d8f0f73b2b95bddddc8351e0800',
    fullnode_addresses:
      '0x012d0400c23e63c605261807207341e5ef2a6a997c8ffa5ee9c3ded95e44fa2373b200e0432035eb052f5a3e7a0800',
    status: 'success',
    country: 'Spain',
    city: 'Madrid',
    lat: 40.4163,
    lon: -3.6934,
    query: '5.22.216.240',
  },
  {
    validator_index: 61,
    network:
      '/ip4/5.22.216.240/tcp/6180/noise-ik/69db73af2b6c12b4d15d8cc7875f7770bbc3b1dc4d8f0f73b2b95bddddc8351e/handshake/0',
    networkIp: '5.22.216.240',
    fullnode:
      '/ip4/194.62.99.198/tcp/6182/noise-ik/7341e5ef2a6a997c8ffa5ee9c3ded95e44fa2373b200e0432035eb052f5a3e7a/handshake/0',
    fullnodeIp: '194.62.99.198',
    type: 'fullnode',
    network_addresses:
      '0x012d04000516d8f0052418072069db73af2b6c12b4d15d8cc7875f7770bbc3b1dc4d8f0f73b2b95bddddc8351e0800',
    fullnode_addresses:
      '0x012d0400c23e63c605261807207341e5ef2a6a997c8ffa5ee9c3ded95e44fa2373b200e0432035eb052f5a3e7a0800',
    status: 'success',
    country: 'Spain',
    city: 'Madrid',
    lat: 40.4168,
    lon: -3.70379,
    query: '194.62.99.198',
  },
  {
    validator_index: 55,
    network:
      '/dns/validator.mainnet.aptos.forgoo.com/tcp/6180/noise-ik/28ea9abf5fe2d80c809ba3fed52022d1f846bbf8c388a097b9050a837d058505/handshake/0',
    networkIp: '170.187.195.248',
    fullnode:
      '/dns/fullnode.mainnet.aptos.forgoo.com/tcp/6182/noise-ik/8f49c6d7d4c49ac7297b31cc34ed185d30934b22e6d30ef7e44a1be8435c7656/handshake/0',
    fullnodeIp: '139.177.196.240',
    type: 'network',
    network_addresses:
      '0x014c04022276616c696461746f722e6d61696e6e65742e6170746f732e666f72676f6f2e636f6d052418072028ea9abf5fe2d80c809ba3fed52022d1f846bbf8c388a097b9050a837d0585050800',
    fullnode_addresses:
      '0x014b04022166756c6c6e6f64652e6d61696e6e65742e6170746f732e666f72676f6f2e636f6d05261807208f49c6d7d4c49ac7297b31cc34ed185d30934b22e6d30ef7e44a1be8435c76560800',
    status: 'success',
    country: 'Canada',
    city: 'Toronto',
    lat: 43.6547,
    lon: -79.3623,
    query: '170.187.195.248',
  },
  {
    validator_index: 55,
    network:
      '/dns/validator.mainnet.aptos.forgoo.com/tcp/6180/noise-ik/28ea9abf5fe2d80c809ba3fed52022d1f846bbf8c388a097b9050a837d058505/handshake/0',
    networkIp: '170.187.195.248',
    fullnode:
      '/dns/fullnode.mainnet.aptos.forgoo.com/tcp/6182/noise-ik/8f49c6d7d4c49ac7297b31cc34ed185d30934b22e6d30ef7e44a1be8435c7656/handshake/0',
    fullnodeIp: '139.177.196.240',
    type: 'fullnode',
    network_addresses:
      '0x014c04022276616c696461746f722e6d61696e6e65742e6170746f732e666f72676f6f2e636f6d052418072028ea9abf5fe2d80c809ba3fed52022d1f846bbf8c388a097b9050a837d0585050800',
    fullnode_addresses:
      '0x014b04022166756c6c6e6f64652e6d61696e6e65742e6170746f732e666f72676f6f2e636f6d05261807208f49c6d7d4c49ac7297b31cc34ed185d30934b22e6d30ef7e44a1be8435c76560800',
    status: 'success',
    country: 'Canada',
    city: 'Toronto',
    lat: 43.6547,
    lon: -79.3623,
    query: '139.177.196.240',
  },
  {
    validator_index: 80,
    network:
      '/dns/validator.aptos.digitalflare.cc/tcp/6180/noise-ik/2661d2c95f73af09ad8e28159223639a5d0f69ef8a80880045f24224ee57ac1c/handshake/0',
    networkIp: '216.238.72.99',
    fullnode:
      '/dns/fullnode.aptos.digitalflare.cc/tcp/6182/noise-ik/2e3e0280c3a1f64945ace65ed6042ad25ff2a9520e85c8380290465ec2793d35/handshake/0',
    fullnodeIp: '216.238.70.90',
    type: 'network',
    network_addresses:
      '0x014904021f76616c696461746f722e6170746f732e6469676974616c666c6172652e636305241807202661d2c95f73af09ad8e28159223639a5d0f69ef8a80880045f24224ee57ac1c0800',
    fullnode_addresses:
      '0x014804021e66756c6c6e6f64652e6170746f732e6469676974616c666c6172652e636305261807202e3e0280c3a1f64945ace65ed6042ad25ff2a9520e85c8380290465ec2793d350800',
    status: 'success',
    country: 'Mexico',
    city: 'Querétaro City',
    lat: 20.5762,
    lon: -100.2951,
    query: '216.238.72.99',
  },
  {
    validator_index: 80,
    network:
      '/dns/validator.aptos.digitalflare.cc/tcp/6180/noise-ik/2661d2c95f73af09ad8e28159223639a5d0f69ef8a80880045f24224ee57ac1c/handshake/0',
    networkIp: '216.238.72.99',
    fullnode:
      '/dns/fullnode.aptos.digitalflare.cc/tcp/6182/noise-ik/2e3e0280c3a1f64945ace65ed6042ad25ff2a9520e85c8380290465ec2793d35/handshake/0',
    fullnodeIp: '216.238.70.90',
    type: 'fullnode',
    network_addresses:
      '0x014904021f76616c696461746f722e6170746f732e6469676974616c666c6172652e636305241807202661d2c95f73af09ad8e28159223639a5d0f69ef8a80880045f24224ee57ac1c0800',
    fullnode_addresses:
      '0x014804021e66756c6c6e6f64652e6170746f732e6469676974616c666c6172652e636305261807202e3e0280c3a1f64945ace65ed6042ad25ff2a9520e85c8380290465ec2793d350800',
    status: 'success',
    country: 'Mexico',
    city: 'Querétaro City',
    lat: 20.5762,
    lon: -100.2951,
    query: '216.238.70.90',
  },
  {
    validator_index: 82,
    network:
      '/ip4/141.95.99.105/tcp/6180/noise-ik/009dd45df09a4bacac5274a7c85334470263e87cdd6865532eb3c565c1a20b39/handshake/0',
    networkIp: '141.95.99.105',
    fullnode:
      '/ip4/142.132.159.28/tcp/6182/noise-ik/50463736bd117095c43a67c41691495c2cee66ebeafdab2106fc71716b21dc67/handshake/0',
    fullnodeIp: '142.132.159.28',
    type: 'network',
    network_addresses:
      '0x012d04008d5f63690524180720009dd45df09a4bacac5274a7c85334470263e87cdd6865532eb3c565c1a20b390800',
    fullnode_addresses:
      '0x012d04008e849f1c052618072050463736bd117095c43a67c41691495c2cee66ebeafdab2106fc71716b21dc670800',
    status: 'success',
    country: 'Germany',
    city: 'Limburg an der Lahn',
    lat: 50.3986,
    lon: 8.07958,
    query: '141.95.99.105',
  },
  {
    validator_index: 82,
    network:
      '/ip4/141.95.99.105/tcp/6180/noise-ik/009dd45df09a4bacac5274a7c85334470263e87cdd6865532eb3c565c1a20b39/handshake/0',
    networkIp: '141.95.99.105',
    fullnode:
      '/ip4/142.132.159.28/tcp/6182/noise-ik/50463736bd117095c43a67c41691495c2cee66ebeafdab2106fc71716b21dc67/handshake/0',
    fullnodeIp: '142.132.159.28',
    type: 'fullnode',
    network_addresses:
      '0x012d04008d5f63690524180720009dd45df09a4bacac5274a7c85334470263e87cdd6865532eb3c565c1a20b390800',
    fullnode_addresses:
      '0x012d04008e849f1c052618072050463736bd117095c43a67c41691495c2cee66ebeafdab2106fc71716b21dc670800',
    status: 'success',
    country: 'Germany',
    city: 'Falkenstein',
    lat: 50.4777,
    lon: 12.3649,
    query: '142.132.159.28',
  },
  {
    validator_index: 60,
    network:
      '/ip4/173.230.134.190/tcp/6180/noise-ik/c0a2f47a886d0b917c626faac4bbd1e695770d1671620a77d505ef568259ea45/handshake/0',
    networkIp: '173.230.134.190',
    fullnode:
      '/ip4/173.230.134.190/tcp/6182/noise-ik/bee72d524443ecd5aaedf38b05800b338cebac74474d73e1a411512a6bda492a/handshake/0',
    fullnodeIp: '173.230.134.190',
    type: 'network',
    network_addresses:
      '0x012d0400ade686be0524180720c0a2f47a886d0b917c626faac4bbd1e695770d1671620a77d505ef568259ea450800',
    fullnode_addresses:
      '0x012d0400ade686be0526180720bee72d524443ecd5aaedf38b05800b338cebac74474d73e1a411512a6bda492a0800',
    status: 'success',
    country: 'United States',
    city: 'Atlanta',
    lat: 33.7485,
    lon: -84.3871,
    query: '173.230.134.190',
  },
  {
    validator_index: 60,
    network:
      '/ip4/173.230.134.190/tcp/6180/noise-ik/c0a2f47a886d0b917c626faac4bbd1e695770d1671620a77d505ef568259ea45/handshake/0',
    networkIp: '173.230.134.190',
    fullnode:
      '/ip4/173.230.134.190/tcp/6182/noise-ik/bee72d524443ecd5aaedf38b05800b338cebac74474d73e1a411512a6bda492a/handshake/0',
    fullnodeIp: '173.230.134.190',
    type: 'fullnode',
    network_addresses:
      '0x012d0400ade686be0524180720c0a2f47a886d0b917c626faac4bbd1e695770d1671620a77d505ef568259ea450800',
    fullnode_addresses:
      '0x012d0400ade686be0526180720bee72d524443ecd5aaedf38b05800b338cebac74474d73e1a411512a6bda492a0800',
    status: 'success',
    country: 'United States',
    city: 'Atlanta',
    lat: 33.7485,
    lon: -84.3871,
    query: '173.230.134.190',
  },
  {
    validator_index: 85,
    network:
      '/dns/aptos.mainnet.validator.justlstn.dev/tcp/6180/noise-ik/58ca3e58bc16bd213ebed2714b0dd225d495b51f1df4518e8b00539e2e3b1123/handshake/0',
    networkIp: '146.59.84.88',
    fullnode:
      '/dns/aptos.mainnet.fullnode.justlstn.dev/tcp/6182/noise-ik/ffd6994f31ec642f84cdc159fc2f313d3d95afd56737dc1de1aba39d467db65d/handshake/0',
    fullnodeIp: '146.59.70.231',
    type: 'network',
    network_addresses:
      '0x014e0402246170746f732e6d61696e6e65742e76616c696461746f722e6a7573746c73746e2e646576052418072058ca3e58bc16bd213ebed2714b0dd225d495b51f1df4518e8b00539e2e3b11230800',
    fullnode_addresses:
      '0x014d0402236170746f732e6d61696e6e65742e66756c6c6e6f64652e6a7573746c73746e2e6465760526180720ffd6994f31ec642f84cdc159fc2f313d3d95afd56737dc1de1aba39d467db65d0800',
    status: 'success',
    country: 'Poland',
    city: 'Warsaw',
    lat: 52.2251,
    lon: 21.0477,
    query: '146.59.84.88',
  },
  {
    validator_index: 85,
    network:
      '/dns/aptos.mainnet.validator.justlstn.dev/tcp/6180/noise-ik/58ca3e58bc16bd213ebed2714b0dd225d495b51f1df4518e8b00539e2e3b1123/handshake/0',
    networkIp: '146.59.84.88',
    fullnode:
      '/dns/aptos.mainnet.fullnode.justlstn.dev/tcp/6182/noise-ik/ffd6994f31ec642f84cdc159fc2f313d3d95afd56737dc1de1aba39d467db65d/handshake/0',
    fullnodeIp: '146.59.70.231',
    type: 'fullnode',
    network_addresses:
      '0x014e0402246170746f732e6d61696e6e65742e76616c696461746f722e6a7573746c73746e2e646576052418072058ca3e58bc16bd213ebed2714b0dd225d495b51f1df4518e8b00539e2e3b11230800',
    fullnode_addresses:
      '0x014d0402236170746f732e6d61696e6e65742e66756c6c6e6f64652e6a7573746c73746e2e6465760526180720ffd6994f31ec642f84cdc159fc2f313d3d95afd56737dc1de1aba39d467db65d0800',
    status: 'success',
    country: 'Poland',
    city: 'Warsaw',
    lat: 52.2251,
    lon: 21.0477,
    query: '146.59.70.231',
  },
  {
    validator_index: 92,
    network:
      '/ip4/65.109.64.57/tcp/6180/noise-ik/df86b51ad92950ba4757bd0bcfca9f816dc4875ad6996c8c26423eaafda4a370/handshake/0',
    networkIp: '65.109.64.57',
    fullnode:
      '/ip4/65.109.64.57/tcp/6182/noise-ik/2722e1aeaf68eb3368984eddf05199e0284e54aefc989399098c3848d3450048/handshake/0',
    fullnodeIp: '65.109.64.57',
    type: 'network',
    network_addresses:
      '0x012d0400416d40390524180720df86b51ad92950ba4757bd0bcfca9f816dc4875ad6996c8c26423eaafda4a3700800',
    fullnode_addresses:
      '0x012d0400416d403905261807202722e1aeaf68eb3368984eddf05199e0284e54aefc989399098c3848d34500480800',
    status: 'success',
    country: 'Finland',
    city: 'Helsinki',
    lat: 60.1797,
    lon: 24.9344,
    query: '65.109.64.57',
  },
  {
    validator_index: 92,
    network:
      '/ip4/65.109.64.57/tcp/6180/noise-ik/df86b51ad92950ba4757bd0bcfca9f816dc4875ad6996c8c26423eaafda4a370/handshake/0',
    networkIp: '65.109.64.57',
    fullnode:
      '/ip4/65.109.64.57/tcp/6182/noise-ik/2722e1aeaf68eb3368984eddf05199e0284e54aefc989399098c3848d3450048/handshake/0',
    fullnodeIp: '65.109.64.57',
    type: 'fullnode',
    network_addresses:
      '0x012d0400416d40390524180720df86b51ad92950ba4757bd0bcfca9f816dc4875ad6996c8c26423eaafda4a3700800',
    fullnode_addresses:
      '0x012d0400416d403905261807202722e1aeaf68eb3368984eddf05199e0284e54aefc989399098c3848d34500480800',
    status: 'success',
    country: 'Finland',
    city: 'Helsinki',
    lat: 60.1797,
    lon: 24.9344,
    query: '65.109.64.57',
  },
  {
    validator_index: 70,
    network:
      '/ip4/93.115.25.122/tcp/6180/noise-ik/4da04f388b8428746842a969cc8a1515eb3eea08705bee0da41c60370709f72e/handshake/0',
    networkIp: '93.115.25.122',
    fullnode:
      '/ip4/162.55.233.238/tcp/6182/noise-ik/0d7904e0f3b6aa2b1c8475b06db994e65e1268fee2a23c221fcc00dc19bd8071/handshake/0',
    fullnodeIp: '162.55.233.238',
    type: 'network',
    network_addresses:
      '0x012d04005d73197a05241807204da04f388b8428746842a969cc8a1515eb3eea08705bee0da41c60370709f72e0800',
    fullnode_addresses:
      '0x012d0400a237e9ee05261807200d7904e0f3b6aa2b1c8475b06db994e65e1268fee2a23c221fcc00dc19bd80710800',
    status: 'success',
    country: 'Lithuania',
    city: 'Šiauliai',
    lat: 55.921,
    lon: 23.2941,
    query: '93.115.25.122',
  },
  {
    validator_index: 70,
    network:
      '/ip4/93.115.25.122/tcp/6180/noise-ik/4da04f388b8428746842a969cc8a1515eb3eea08705bee0da41c60370709f72e/handshake/0',
    networkIp: '93.115.25.122',
    fullnode:
      '/ip4/162.55.233.238/tcp/6182/noise-ik/0d7904e0f3b6aa2b1c8475b06db994e65e1268fee2a23c221fcc00dc19bd8071/handshake/0',
    fullnodeIp: '162.55.233.238',
    type: 'fullnode',
    network_addresses:
      '0x012d04005d73197a05241807204da04f388b8428746842a969cc8a1515eb3eea08705bee0da41c60370709f72e0800',
    fullnode_addresses:
      '0x012d0400a237e9ee05261807200d7904e0f3b6aa2b1c8475b06db994e65e1268fee2a23c221fcc00dc19bd80710800',
    status: 'success',
    country: 'Germany',
    city: 'Falkenstein',
    lat: 50.475,
    lon: 12.365,
    query: '162.55.233.238',
  },
  {
    validator_index: 102,
    network:
      '/ip4/34.168.31.202/tcp/6180/noise-ik/5862ad06025b6c607cbdf74a04319c295450a4e529c6a5f891dad70cf8271868/handshake/0',
    networkIp: '34.168.31.202',
    fullnode:
      '/ip4/34.82.138.71/tcp/6182/noise-ik/5aa160757b63b68fb2667f598f18b9964c62800fb878f590ad13226408328453/handshake/0',
    fullnodeIp: '34.82.138.71',
    type: 'network',
    network_addresses:
      '0x012d040022a81fca05241807205862ad06025b6c607cbdf74a04319c295450a4e529c6a5f891dad70cf82718680800',
    fullnode_addresses:
      '0x012d040022528a4705261807205aa160757b63b68fb2667f598f18b9964c62800fb878f590ad132264083284530800',
    status: 'success',
    country: 'United States',
    city: 'The Dalles',
    lat: 45.5945,
    lon: -121.1786,
    query: '34.168.31.202',
  },
  {
    validator_index: 102,
    network:
      '/ip4/34.168.31.202/tcp/6180/noise-ik/5862ad06025b6c607cbdf74a04319c295450a4e529c6a5f891dad70cf8271868/handshake/0',
    networkIp: '34.168.31.202',
    fullnode:
      '/ip4/34.82.138.71/tcp/6182/noise-ik/5aa160757b63b68fb2667f598f18b9964c62800fb878f590ad13226408328453/handshake/0',
    fullnodeIp: '34.82.138.71',
    type: 'fullnode',
    network_addresses:
      '0x012d040022a81fca05241807205862ad06025b6c607cbdf74a04319c295450a4e529c6a5f891dad70cf82718680800',
    fullnode_addresses:
      '0x012d040022528a4705261807205aa160757b63b68fb2667f598f18b9964c62800fb878f590ad132264083284530800',
    status: 'success',
    country: 'United States',
    city: 'The Dalles',
    lat: 45.5945,
    lon: -121.1786,
    query: '34.82.138.71',
  },
  {
    validator_index: 103,
    network:
      '/ip4/3.66.156.72/tcp/6180/noise-ik/f1d7b741c64239502de71ace5da3d374ea411b18b3b576b680a090510c913c16/handshake/0',
    networkIp: '3.66.156.72',
    fullnode:
      '/ip4/35.157.217.22/tcp/6182/noise-ik/f4e05d83bbf653e860eb208a46b47888ca5dad493ed125a54139f82df7aa6c6b/handshake/0',
    fullnodeIp: '35.157.217.22',
    type: 'network',
    network_addresses:
      '0x012d040003429c480524180720f1d7b741c64239502de71ace5da3d374ea411b18b3b576b680a090510c913c160800',
    fullnode_addresses:
      '0x012d0400239dd9160526180720f4e05d83bbf653e860eb208a46b47888ca5dad493ed125a54139f82df7aa6c6b0800',
    status: 'success',
    country: 'Germany',
    city: 'Frankfurt am Main',
    lat: 50.1109,
    lon: 8.68213,
    query: '3.66.156.72',
  },
  {
    validator_index: 103,
    network:
      '/ip4/3.66.156.72/tcp/6180/noise-ik/f1d7b741c64239502de71ace5da3d374ea411b18b3b576b680a090510c913c16/handshake/0',
    networkIp: '3.66.156.72',
    fullnode:
      '/ip4/35.157.217.22/tcp/6182/noise-ik/f4e05d83bbf653e860eb208a46b47888ca5dad493ed125a54139f82df7aa6c6b/handshake/0',
    fullnodeIp: '35.157.217.22',
    type: 'fullnode',
    network_addresses:
      '0x012d040003429c480524180720f1d7b741c64239502de71ace5da3d374ea411b18b3b576b680a090510c913c160800',
    fullnode_addresses:
      '0x012d0400239dd9160526180720f4e05d83bbf653e860eb208a46b47888ca5dad493ed125a54139f82df7aa6c6b0800',
    status: 'success',
    country: 'Germany',
    city: 'Frankfurt am Main',
    lat: 50.1109,
    lon: 8.68213,
    query: '35.157.217.22',
  },
]
export const AppUpdater = () => {
  const dispatch = useAppDispatch()
  // const appFocused = useAppFocused()

  // useMarketInfoQuery(undefined, {
  //   pollingInterval: appFocused ? 60 * 1000 : 0,
  //   refetchOnFocus: true,
  // })

  // useStatsQuery(undefined, {
  //   pollingInterval: appFocused ? 5000 : 0,
  //   refetchOnFocus: true,
  // })

  // const { data } = useGeoQuery()

  useEffect(() => {
    dispatch(
      setGeo(
        data.map((item: any) => {
          return {
            address: item.type === 'fullnode' ? item.fullnode_addresses : item.network_addresses,
            network: item.type === 'fullnode' ? item.fullnode : item.network,
            country: item.country,
            city: item.city,
            lat: item.lat,
            lon: item.lon,
            ip: item.query,
          }
        })
      )
    )
  }, [data, dispatch])

  return null
}
