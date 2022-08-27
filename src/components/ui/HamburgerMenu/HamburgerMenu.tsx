import clsx from 'clsx'
import React from 'react'
import styled from 'styled-components'
import closeIcon from './icons/close.svg'
import menuIcon from './icons/menu.svg'

const HamburgerMenuContainer = styled.div`
  display: none;

  @media (max-width: ${(props) => props.theme.breakpoint.md}) {
    display: block;
  }

  img{
    filter: brightness(0) saturate(100%) invert(19%) sepia(85%) saturate(3852%) hue-rotate(274deg) brightness(73%) contrast(127%);
    width: 20px;
    height: 20px;
  }

  button {
    display: flex;
    align-items: center;
    min-height: 32px;
    background-color: ${(props) => props.theme.colors.transparent};
    border: none;
    position: relative;

    &:hover {
      cursor: pointer;
    }
  }

  &.always-visible {
    display: block;
  }
`

interface Props {
  isOpen: boolean
  alwaysVisibile?: boolean
  onClick: any
}

export const HamburgerMenu  : React.FC<Props> = ({ onClick, isOpen, alwaysVisibile = false }) => {
  return (
    <HamburgerMenuContainer className={clsx('hamburger-menu', { 'always-visible': alwaysVisibile })}>
      <button onClick={onClick}>
        {isOpen === true ? (
          <img src={closeIcon} width={28} height={28} alt="close menu" />
        ) : (
          <img src={menuIcon} width={32} height={32} alt="open menu" />
        )}
      </button>
    </HamburgerMenuContainer>
  )
}

export default HamburgerMenu
