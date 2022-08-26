import React from 'react'

interface Props {
  children?: any,
  className?: string,
  direction?: string,
  gap ?: string,
  justify?: string,
  align?: string,
  wrap?: string,
  flexGrow?: string,
  style?: any,
}

export const Flex : React.FC<Props> = ({
  children,
  className,
  direction,
  gap = '1rem',
  justify,
  align,
  wrap = 'nowrap',
  flexGrow,
  style,
  ...rest
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction,
        flexWrap: wrap,
        gap,
        justifyContent: justify,
        alignItems: align,
        flexGrow: flexGrow,
        ...style,
        ...rest,
      }}
      className={className}
    >
      {children}
    </div>
  )
}

export default Flex
