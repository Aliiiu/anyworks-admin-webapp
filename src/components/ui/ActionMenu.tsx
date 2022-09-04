import React, { useEffect } from 'react'
import { useBoolean } from 'src/hooks/useBoolean'
import { Popover } from 'react-tiny-popover'
import styled from 'styled-components'
import actionTrigger from 'src/assets/images/common/action.svg'

const ActionMenuListContainer = styled.button`
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
  border-radius: 8px;

  ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }

  li {
    display: block;

    button {
      width: 100%;
      display: block;
      text-align: left;
      width: 10rem;
      padding: 10px 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 14px;
      line-height: 24px;
      color: ${(props) => props.theme.colors.text_01};
      border-bottom: 1px solid ${(props) => props.theme.colors.gray_03};

      &:focus,
      &:hover {
        background-color: ${(props) => props.theme.colors.gray_03};
        cursor: pointer;
      }
    }

    &:first-child {
      button {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
    }

    &:last-child {
      button {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        border-bottom: 0;
      }
    }
  }
`

const ActionMenuTriggerButtonEl = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 1.5rem;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: background-color 0.5s ease-out;

  &:focus,
  &:hover {
    background-color: ${(props) => props.theme.colors.ui_01};
    cursor: pointer;
  }
`

interface Props {
  children?: any
  actions: any
  positions?: any
  padding?: number
  setAllowRowClick?: (x: boolean) => void
}

export const ActionMenu: React.FC<Props> = ({
  actions = [],
  padding = 8,
  positions = ['right', 'left', 'bottom', 'top'],
  children = null,
  setAllowRowClick = () => null,
}) => {
  const { value: isOpen, setTrue: openAction, setFalse: closeAction, toggle } = useBoolean(false)

  useEffect(() => {
    setAllowRowClick(!isOpen)
  }, [isOpen])

  return (
    <Popover
      isOpen={isOpen}
      padding={padding}
      positions={positions} // preferred positions by priority
      content={
        <ActionMenuListContainer tabIndex={-1}>
          <ul>
            {actions.map((action: any, index: any) => (
              <li key={index}>
                <button
                  type="button"
                  className={action.classes || ''}
                  onClick={() => {
                    if (action.onClick) action.onClick()

                    closeAction()
                  }}
                >
                  {action.title || 'Untitled'}
                </button>
              </li>
            ))}
          </ul>
        </ActionMenuListContainer>
      }
      onClickOutside={closeAction}
    >
      <ActionMenuTriggerButtonEl
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          toggle()
        }}
      >
        {children ? children : <img src={actionTrigger} alt="click" />}
      </ActionMenuTriggerButtonEl>
    </Popover>
  )
}

export default ActionMenu
