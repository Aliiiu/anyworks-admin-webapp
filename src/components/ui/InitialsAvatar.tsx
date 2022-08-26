import React from 'react'
import styled from 'styled-components'
import { getInitials } from 'src/utils'

const InitialsAvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.gray_01};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 21px;
  line-height: 17px;
  color: ${(props) => props.theme.colors.text_01};
`

interface Props {
  name: string
}

export const InitialsAvatar : React.FC<Props> = ({name}) => {
  return <InitialsAvatarContainer>{getInitials(name)}</InitialsAvatarContainer>
}

export default InitialsAvatar
