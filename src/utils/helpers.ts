import dayjs from 'dayjs'
import { isValidDate } from 'src/utils'

export const formatDate = (date:any, format = 'DD MMM YYYY') => {
  if (date && isValidDate(date)) return dayjs(date).format(format)
  return date
}

export const formatDateYmd = (date: any) =>{
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;

  return [year, month, day].join('-');
}
