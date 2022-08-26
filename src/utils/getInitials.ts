export const getInitials = (string:any) => {
    return string
      .match(/\b(\w)/g)
      .join('')
      .toUpperCase()
  }
  
  export default getInitials
  