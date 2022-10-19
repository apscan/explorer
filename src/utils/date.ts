import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import memoizeOne from 'memoize-one'

dayjs.extend(utc)

export const getUTC = memoizeOne(() => {
  const date = dayjs()
    .format()
    .match(/\+(\d\d):(\d\d)$/)

  const [, hours, minutes] = date || []

  return minutes === '00' ? `+${Number(hours)}` : `+${Number(hours)}:${minutes}`
})

export const plural = (value: number, str: string) => {
  if (value < 0) return ''
  if (value === 0) return `${value} ${str}s`
  if (value === 1) return `${value} ${str}`
  return `${value} ${str}s`
}

export const fromNow = (value: string | number | dayjs.Dayjs | Date = 0): string => {
  // Microseconds
  if (typeof value === 'string' && /^\d{16}$/.test(value)) {
    value = Number(BigInt(value) / 1000n)
  }

  const now = dayjs()
  const target = dayjs(value)
  const diff = dayjs(now).diff(target, 'seconds')
  const diffDate = dayjs.unix(diff).utc()

  const minutes = dayjs(now).diff(target, 'minutes')
  const hours = dayjs(now).diff(target, 'hours')
  const days = dayjs(now).diff(target, 'days')

  const secondStr = `${diffDate.get('seconds')}s`
  const minuteStr = `${diffDate.get('minutes')}m`
  const hourStr = `${diffDate.get('hours')}h`
  const dayStr = `${days}d`

  if (days) {
    return `${dayStr} ${hourStr} ${minuteStr} ${secondStr} ago`
  }

  if (hours) {
    return `${hourStr} ${minuteStr} ${secondStr} ago`
  }

  if (minutes) {
    return `${minuteStr} ${secondStr} ago`
  }

  return `${secondStr} ago`
}

export const formatDate = (
  value?: string | number | dayjs.Dayjs | Date,
  {
    withUTCPostfix = true,
  }: {
    withUTCPostfix?: boolean
  } = {}
) => {
  const age = fromNow(value)

  // Microseconds
  if (typeof value === 'string' && /^\d{16}$/.test(value)) {
    value = Number(BigInt(value) / 1000n)
  }

  if (typeof value === 'number' && /^\d{16}$/.test(value.toString())) {
    value = Number(BigInt(value) / 1000n)
  }

  let time = dayjs(value)
  let local = time.format('YYYY-MM-DD HH:mm:ss.SSS')

  time = time.utc()

  let utc = time.format('YYYY-MM-DD HH:mm:ss.SSS')

  if (withUTCPostfix) {
    local += ` UTC${getUTC()}`
    utc += ` UTC${getUTC()}`
  }

  return {
    age,
    local,
    utc,
  }
}
