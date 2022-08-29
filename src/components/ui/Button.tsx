import React from 'react'
import styled from 'styled-components'
import clsx from 'clsx'

const ButtonContainer = styled.div`
  flex: 1;
  white-space: nowrap;

  .btn {
    outline: none;
    border: none;
    cursor: pointer;
    transition: 0.3s;
    font-size: 16px;
    border-radius: 8px;
    height: 46px;
    padding: 14px 22px;
    line-height: 24px;
    font-weight: 500;
  }

  .btn--w-140 {
    width: 140px;
  }

  .btn--lg {
    padding: 0 20px;
  }

  .btn--full {
    width: 100%;
  }

  .btn--solid {
    background-color: ${(props) => props.theme.colors.mustard};
    border: ${(props) => props.theme.colors.mustard};
    color: ${(props) => props.theme.colors.white};
    &:focus,
    &:hover {
      box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
        0px 1px 3px 0px rgb(0 0 0 / 12%);
    }
  }

  .btn--outlined {
    background-color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.gray_05};
    color: ${(props) => props.theme.colors.text_01};
    height: 33px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    padding: 0 13px;

    &:focus,
    &:hover {
      color: ${(props) => props.theme.colors.purple};
      border: 1px solid ${(props) => props.theme.colors.purple};

      img {
        filter: brightness(0) saturate(100%) invert(15%) sepia(86%) saturate(5352%)
          hue-rotate(278deg) brightness(76%) contrast(120%);
      }
    }
  }

  .btn--with-icon {
    display: flex;
    gap: 12px;
    justify-content: center;
    align-items: center;
  }

  .btn--no-bg {
    background-color: ${(props) => props.theme.colors.transparent};
    text-align: left;
    outline: none;
    border: none;
    cursor: pointer;
  }

  .btn--text-only {
    height: auto;
    font-weight: 500;
    color: ${(props) => props.theme.colors.primaryColor};
    &:focus,
    &:hover {
      text-decoration: underline;
    }
  }

  .btn--icon-only {
    height: auto;
    &:focus,
    &:hover {
      opacity: 0.7;
    }
  }

  .btn--font-bold {
    font-weight: bold;
  }

  .btn[disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  @keyframes button-loading {
    from {
      transform: rotate(0turn);
    }

    to {
      transform: rotate(2turn);
    }
  }

  .btn--loading {
    pointer-events: none;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border: 2px solid transparent;
      border-color: white white white transparent;
      border-radius: 50%;
      animation: button-loading 1s ease infinite;
    }
  }
`

export const ButtonClass = {
  SOLID: 'SOLID',
  OUTLINED: 'OUTLINED',
  WITH_ICON: 'WITH_ICON',
  NO_BG: 'NO_BG',
  TEXT_ONLY: 'TEXT_ONLY',
  ICON_ONLY: 'ICON_ONLY',
  FONT_BOLD: 'FONT_BOLD',
}

export const ButtonSize = {
  LARGE: 'large',
  FULL: 'full',
  WIDTH_140: '140px',
}

interface Props {
  children?: any
  classes?: any
  type?: any
  size?: any
  disabled?: any
  loading?: any
  onClick?: any
  style?: any
}

export const Button: React.FC<Props> = ({
  children,
  classes = [],
  type = 'button',
  size,
  disabled = false,
  loading = false,
  onClick = () => null,
  style,
  ...rest
}) => {
  return (
    <ButtonContainer>
      <button
        type={type}
        style={style}
        className={clsx(`btn`, classes, {
          'btn--solid': classes.includes(ButtonClass.SOLID),
          'btn--outlined': classes.includes(ButtonClass.OUTLINED),
          'btn--with-icon': classes.includes(ButtonClass.WITH_ICON),
          'btn--no-bg': classes.includes(ButtonClass.NO_BG),
          'btn--text-only': classes.includes(ButtonClass.TEXT_ONLY),
          'btn--icon-only': classes.includes(ButtonClass.ICON_ONLY),
          'btn--font-bold': classes.includes(ButtonClass.FONT_BOLD),
          'btn--lg': size === ButtonSize.LARGE,
          'btn--full': size === ButtonSize.FULL,
          'btn--w-140': size === ButtonSize.WIDTH_140,
          'btn--loading': loading,
        })}
        onClick={onClick}
        disabled={disabled}
        {...rest}
      >
        {loading ? '' : children}
      </button>
    </ButtonContainer>
  )
}

export default Button
