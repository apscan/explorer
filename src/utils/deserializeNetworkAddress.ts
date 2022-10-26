import { BCS, HexString, TxnBuilderTypes } from 'aptos'
import { TextEncoder, TextDecoder } from 'util'
import ip from 'ipaddr.js'

export const deserializeNetworkAddress = (str: string) => {
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
