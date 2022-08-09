import { startOfDay, subDays, subMonths } from 'date-fns'

export type DateOption = {
  value?: string
  label: string
}

export const dateOptions: DateOption[] = [
  {
    value: undefined,
    label: 'All time'
  },
  {
    value: startOfDay(subDays(new Date(), 7)).toISOString(),
    label: 'Last 7 days'
  },
  {
    value: startOfDay(subDays(new Date(), 30)).toISOString(),
    label: 'Last 30 days'
  },
  {
    value: startOfDay(subMonths(new Date(), 6)).toISOString(),
    label: 'Last 6 months'
  },
  {
    value: startOfDay(subMonths(new Date(), 12)).toISOString(),
    label: 'Last 12 months'
  }
]
