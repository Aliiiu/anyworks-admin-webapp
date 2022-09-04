import { useState } from 'react'

export const useBoolean = (defaultValue: boolean) => {
  const [value, setValue] = useState(!!defaultValue)

  const setTrue = () => setValue(true)
  const setFalse = () => setValue(false)
  const toggle = () => setValue((val) => !val)

  return { value, setValue, setTrue, setFalse, toggle }
}

export default useBoolean
