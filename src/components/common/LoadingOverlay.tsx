import React from 'react'
import styled from 'styled-components'

const LoadingOverlayContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface Props {
  children: any
}

export const LoadingOverlay: React.FC<Props> = ({ children }) => {
  return <LoadingOverlayContainer>{children}</LoadingOverlayContainer>
}

export default LoadingOverlay
