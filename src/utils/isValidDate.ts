export const isValidDate = (date: any) => Boolean(new Date(date).toString() !== 'Invalid Date')

export default isValidDate
