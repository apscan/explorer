import camelcaseKeys, { Options } from 'camelcase-keys'

export const camelcase = (obj: any, options?: Options) => {
  return camelcaseKeys(obj, options)
}
