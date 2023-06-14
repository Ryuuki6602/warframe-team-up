import moment from 'moment'
import timezone from 'moment-timezone'
import type { Moment } from 'moment'
const myTimezone = 'Asia/Shanghai'

export const diffTimeFromNow = (source: Date) => {
  var timepassed = Math.round(new Date()) - moment(source).valueOf()
  let secondPassed = Math.round(timepassed / 1000)
  var postfix = secondPassed > 0 ? '前' : '后'
  timepassed = Math.abs(secondPassed)
  // var arrr = ['秒', '分钟', '小时', '天', '星期', '个月', '年']
  // var arrn = [1, 60, 3600, 86400, 604800, 2592000, 31536000]
  var arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒']
  var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1]
  for (let i = 0; i < 7; i++) {
    var inm = Math.floor(secondPassed / arrn[i])
    if (inm != 0) {
      return inm + arrr[i] + postfix
    }
  }
}

export const toDateTime = (date: Date) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

export const dateTime = () => {
  return moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
}

export const compareDate = (source: Date, target: Date): boolean => {
  return moment(source).isBefore(target)
}

export const betweenDate = (source: Date, target: Date): string => {
  return moment(target).from(source)
}

export const converUTCToTimeStamp = (UTC: string): number => {
  return Number(timezone.tz(UTC, myTimezone))
}

export const formatUTC = (UTC: string): string => {
  return timezone.tz(UTC, myTimezone).format('YYYY-MM-DD HH:mm:ss')
}

export const isSameDay = (UTC: string): boolean => {
  return moment(new Date()).isSame(timezone.tz(UTC, myTimezone), 'day')
}

export const isSameHour = (UTC: string): boolean => {
  return moment(new Date()).isSame(timezone.tz(UTC, myTimezone), 'hour')
}

export const getMyBirthDay = (): Moment => {
  return moment([moment().get('year'), 11, 16])
}

export const getMyBirthDayTimestamp = (): number => {
  return timezone.tz(getMyBirthDay(), 'Asia/Shanghai').valueOf()
}
