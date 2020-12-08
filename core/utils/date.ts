import dayjs from 'dayjs'
export function localDate(v?: Date): Date {
  const d = new Date(v || Date.now())
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d
}

export function formatQueryDatetoUtc(v: string): Date {
  return new Date(dayjs(v).format('YYYY-MM-DD HH:mm:ss'))
}
