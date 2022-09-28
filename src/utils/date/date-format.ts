import { format, fromUnixTime } from 'date-fns'

export const formatStripeTime = (stripeTime: number) => {
  const formattedTime = format(fromUnixTime(stripeTime), 'PP')

  return formattedTime
}

export const dateConversion = (date: Date | string) => {
  if (date) {
    return format(new Date(date), 'PP')
  }

  return 'N/A'
}
