import type { VercelRequest, VercelResponse } from '@vercel/node'
import { BCS, HexString } from 'aptos'
import ip from 'ipaddr.js'
import axios from 'axios'
import dns from 'node:dns'

const deserializeNetworkAddress = (str: string) => {
  if (!str || typeof str !== 'string') return

  const deserializer = new BCS.Deserializer(new HexString(str).toUint8Array())
  deserializer.deserializeBytes()
  const length = deserializer.deserializeUleb128AsU32()

  let result = ''

  for (let i = 0; i < length; i++) {
    const index = deserializer.deserializeUleb128AsU32()
    // Ip4([127, 0, 0, 1]) => "/ip4/127.0.0.1",
    // Ip6([0x2601, 0, .., 0, 0xfebc]) => "/ip6/2601::febc",
    // Dns("example.com") => "/dns/example.com",
    // Dns4("example.com") => "/dns4/example.com",
    // Dns6("example.com") => "/dns6/example.com",
    // Tcp(6080) => "/tcp/6080",
    // Memory(1234) => "/memory/1234",
    // NoiseIK(b"080e287879c918794170e258bfaddd75acac5b3e350419044655e4983a487120") =>
    //     "/noise-ik/080e287879c918794170e258bfaddd75acac5b3e350419044655e4983a487120",
    // Handshake(0) => "/handshake/0",
    if (index === 0) {
      result += `/ip4/${ip.fromByteArray(Array.from(deserializer.deserializeFixedBytes(4)))}`
    } else if (index === 1) {
      result += `/ip4/${ip.fromByteArray(Array.from(deserializer.deserializeFixedBytes(4)))}`
    } else if (index === 2) {
      result += `/dns/${deserializer.deserializeStr()}`
    } else if (index === 3) {
      result += `/dns4/${deserializer.deserializeStr()}`
    } else if (index === 4) {
      result += `/dns6/${deserializer.deserializeStr()}`
    } else if (index === 5) {
      result += `/tcp/${deserializer.deserializeU16()}`
    } else if (index === 6) {
      result += `/memory/${deserializer.deserializeU16()}`
    } else if (index === 7) {
      result += `/noise-ik/${HexString.fromUint8Array(deserializer.deserializeBytes()).noPrefix()}`
    } else if (index === 8) {
      result += `/handshake/${deserializer.deserializeU8()}`
    } else {
      throw new Error(`unknown enum ${index} on ${str}`)
    }
  }

  return result
}

let result = deserializeNetworkAddress(
  '0x014404021a76616c696461746f722e6170746f732e6e6f6465732e6775727505241807203deb2d94d3d75438e2e3afdd3aec98cf57505baa329045fe05415b96260d8f440800'
)

export default async function (req: VercelRequest, res: VercelResponse) {
  //
  // const { name = 'World' } = req.query

  const response = await axios.get('https://api.apscan.io/active_validators', {
    headers: {
      prefer: 'count=exact',
      'Range-Unit': 'items',
      Range: `0-0`,
    },
  })

  const count = Number(response.headers['content-range'].split('/')[1])

  const page = Math.ceil(count / 50)

  const responses = await Promise.all(
    [...new Array(page)].map((_, page) => {
      return axios.get('https://api.apscan.io/active_validators', {
        headers: {
          'Range-Unit': 'items',
          Range: [0, 49].map((i) => page + i).join('-'),
        },
      })
    })
  )

  const validators = responses
    .map((r) => r.data)
    .flat()
    .map((v) => {
      const network = deserializeNetworkAddress(v.network_addresses)

      return {
        ...v,
        network,
        ip: network!.match(/^\/(ip4|dns)\/(.*?)\//)?.[2],
      }
    })

  res.setHeader('Cache-Control', 'public,max-age=300')

  const validatorWithIp = await Promise.all([
    ...validators.map((o) => {
      return dns.promises
        .lookup(o.ip, {
          family: 4,
        })
        .then((r) => {
          return {
            ...o,
            ip: r.address,
          }
        })
    }),
  ])

  const geoResponses = await Promise.all(
    [...new Array(Math.ceil(validatorWithIp.length / 100))].map((_, page) => {
      return axios
        .post(
          'http://ip-api.com/batch?fields=57553',
          validatorWithIp.map((i) => i.ip).slice(page * 100, (page + 1) * 100)
        )
        .then((r) => r.data)
    })
  )

  const geoMap = geoResponses.flat().reduce((r, current) => {
    r[current.query] = current
    return r
  }, {})

  const validatorWithGeo = validatorWithIp.map((o) => {
    return {
      validator_index: o.validator_index,
      ...geoMap[o.ip],
    }
  })

  res.json(validatorWithGeo)
}
