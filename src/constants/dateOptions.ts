import { subDays, subMonths, format } from 'date-fns'

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
    value: format(subDays(new Date(), 7), 'YYY-MM-dd'),
    label: 'Last 7 days'
  },
  {
    value: format(subDays(new Date(), 30), 'YYY-MM-dd'),
    label: 'Last 30 days'
  },
  {
    value: format(subMonths(new Date(), 6), 'YYY-MM-dd'),
    label: 'Last 6 months'
  },
  {
    value: format(subMonths(new Date(), 12), 'YYY-MM-dd'),
    label: 'Last 12 months'
  }
]
