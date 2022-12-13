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

  let now = dayjs()
  let target = dayjs(value)
  let diff = dayjs(now).diff(target, 'seconds')
  let diffDate = dayjs.unix(diff).utc()
  let age = 'ago'

  if (now.unix() < target.unix()) {
    age = 'later'
    now = dayjs.unix(0)
    target = diffDate
    diff = dayjs(now).diff(target, 'seconds')
    diffDate = dayjs.unix(diff).utc()
  }

  const minutes = dayjs(now).diff(target, 'minutes')
  const hours = dayjs(now).diff(target, 'hours')
  const days = dayjs(now).diff(target, 'days')
  const weeks = dayjs(now).diff(target, 'weeks')
  const years = dayjs(now).diff(target, 'years')

  const secondStr = `${diffDate.get('seconds')}s`
  const minuteStr = `${diffDate.get('minutes')}m`
  const hourStr = `${diffDate.get('hours')}h`
  const yearStr = `${diffDate.get('years')}y`

  if (years) {
    const weeks = Math.floor((days - years * 365) / 7)
    const dayStr = `${days - years * 365 - weeks * 7}d`
    return `${yearStr} ${weeks}w ${dayStr} ${age}`
  }

  if (weeks) {
    const dayStr = `${days - weeks * 7}d`

    return `${weeks}w ${dayStr} ${hourStr} ${age}`
  }

  if (days) {
    return `${days}d ${hourStr} ${minuteStr} ${age}`
  }

  if (hours) {
    return `${hourStr} ${minuteStr} ${secondStr} ${age}`
  }

  if (minutes) {
    return `${minuteStr} ${secondStr} ${age}`
  }

  return `${secondStr} ${age}`
}

export const formatDate = (
  value?: string | number | dayjs.Dayjs | Date,
  {
    withUTCPostfix = true,
    full = false,
  }: {
    full?: boolean
    withUTCPostfix?: boolean
  } = {}
) => {
  const age = fromNow(value)
  const formatString = full ? 'YYYY-MM-DD HH:mm:ss.SSS' : 'YYYY-MM-DD HH:mm:ss'

  // Microseconds
  if (typeof value === 'string' && /^\d{16}$/.test(value)) {
    value = Number(BigInt(value) / 1000n)
  }

  if (typeof value === 'number' && /^\d{16}$/.test(value.toString())) {
    value = Number(BigInt(value) / 1000n)
  }

  let time = dayjs(value)
  let local = time.format(formatString)
  let localFull = time.format('YYYY-MM-DD HH:mm:ss.SSS')

  time = time.utc()

  let utc = time.format(formatString)

  if (withUTCPostfix) {
    local += ` UTC${getUTC()}`
    utc += ` UTC${getUTC()}`
  }

  return {
    age,
    local,
    utc,
    localFull,
  }
}
