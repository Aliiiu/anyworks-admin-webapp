import dayjs from 'dayjs'
import { isValidDate } from 'src/utils'

export const formatDate = (date:any, format = 'DD MMM YYYY') => {
  if (date && isValidDate(date)) return dayjs(date).format(format)
  return date
}




