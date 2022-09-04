import React from 'react'
import styled from 'styled-components'
import { Flex } from 'src/components/ui'

const InputContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  padding: 10px 10px 10px 40px;
  min-width: 359px;
  height: 48px;
  display: flex;
  border: 1px solid ${(props) => props.theme.colors.white};

  @media (max-width: ${(props) => props.theme.breakpoint.md}) {
    min-width: auto;
  }
  @media (max-width: ${(props) => props.theme.breakpoint.sm}) {
    padding: 10px;
    width: 100%;
  }

  &:focus-within {
    border: 1px solid ${(props) => props.theme.colors.purple};
  }

  input {
    color: ${(props) => props.theme.colors.text_01};
    font-size: 18px;
    border: 0;
    outline: none;
    width: 100%;
    font-weight: 400;
    font-family: 'Raleway';

    &::placeholder {
      font-size: 18px;
      line-height: 30px;
      color: ${(props) => props.theme.colors.text_02};
      font-family: 'Raleway';
    }
  }
  img {
    width: 17px;
  }
`
interface Props {
  handleChange: (e: any) => void
  type?: string
  placeholder?: string
  icon: any
}

export const Input: React.FC<Props> = ({
  handleChange,
  placeholder = 'Search',
  type = 'text',
  icon,
  ...rest
}) => {
  return (
    <InputContainer>
      <Flex style={{ width: '100%' }}>
        {icon}
        <input {...rest} type={type} placeholder={placeholder} onChange={handleChange} />
      </Flex>
    </InputContainer>
  )
}

export default Input
