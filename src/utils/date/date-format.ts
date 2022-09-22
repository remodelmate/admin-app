import { format, fromUnixTime } from 'date-fns'

export const formatStripeTime = (stripeTime: number) => {
  const formattedTime = format(fromUnixTime(stripeTime), 'PP')

  return formattedTime
}
