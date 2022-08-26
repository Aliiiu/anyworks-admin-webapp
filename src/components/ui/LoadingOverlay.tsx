import React from 'react'
import styled from 'styled-components'

const LoadingContainer = styled.div`
    position: absolute;
    pointer-events: none;
    background-color: rgba(255,255,255,.8);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`
interface Props {
  children: any
}

const LoadingOverlay: React.FC<Props> = ({ children }) => {

  return <LoadingContainer>{children}</LoadingContainer>
}

export default LoadingOverlay
