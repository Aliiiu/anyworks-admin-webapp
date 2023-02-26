import dayjs from 'dayjs';
import { isValidDate } from 'src/utils';

export const formatDate = (date: any, format = 'DD MMM YYYY') => {
	if (date && isValidDate(date)) return dayjs(date).format(format);
	return date;
};

export const formatDateYmd = (date: any) => {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
};

export const formatDateDmy = (date: any) => {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [day, month, year].join('/');
};

export const formatTime = (data: any) => {
	var H = '' + data.getHours(),
		i = '' + data.getMinutes();
	if (H.length < 2) H = '0' + H;
	if (i.length < 2) i = '0' + i;
	return [H, i].join(':');
};

export function numberWithCommas(num: number) {
	if (num) return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	// else return '';
}
