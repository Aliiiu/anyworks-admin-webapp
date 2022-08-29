import React from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import prevPageIcon from './icons/prevPageIcon.svg'
import nextPageIcon from './icons/nextPageIcon.svg'
import { Flex, Button, ButtonClass } from 'src/components/ui'

const PaginationContainer = styled.div`
  color: ${(props) => props.theme.colors.text_01};
  border-top: 1px solid ${(props) => props.theme.colors.gray_03};
  padding: 10px 20px 0 20px;

  /* .limit-changer {
    display: flex;
    align-items: center;
    gap: 1rem;

    & > :last-child {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  } */

  /* select {
    appearance: none;
    outline: none;
    border: 2px solid ${(props) => props.theme.colors.inputBorder};
    border-radius: 4px;
    color: ${(props) => props.theme.colors.text_02};
    background-color: ${(props) => props.theme.colors.white};
    background-image: url(caretDownIcon);
    background-repeat: no-repeat;
    background-position: calc(100% - 10px) center;
    background-size: 10px;
    border-radius: 4px;
    padding: 4px 10px;
    line-height: 20px;
    letter-spacing: 0.25px;
    padding: 4px calc(10px + 1rem) 4px 10px;
    cursor: pointer;
    transition: 0.5s;

    &:focus {
      border: 2px solid ${(props) => props.theme.colors.primaryColor};
    }
  } */

  .pagination {
    display: flex;
    gap: 5px;
    align-items: center;

    ul {
      li {
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 37px;
          height: 37px;
          padding: 2px 4px;
          background-color: ${(props) => props.theme.colors.transparent};
          border-radius: 2px;
          border: none;
          outline: none;
          cursor: pointer;
          font-weight: 500;
          font-size: 16px;
          line-height: 20px;

          &[disabled] {
            opacity: 0.4;
          }
        }
      }
    }

    .page-numbers {
      list-style-type: none;
      display: flex;
      gap: 5px;
      padding: 0;
      margin: 0;

      .page-numbers__link--active {
        background-color: ${(props) => props.theme.colors.lilac};
        color: ${(props) => props.theme.colors.purple};
      }
    }
  }
`

interface Props {
  page?: any
  setPage?: any
  limit?: any
  setLimit?: any
  total?: any
  pageNumbers?: any
  disablePrevPage?: any
  disableNextPage?: any
  gotoPrevPage?: any
  gotoNextPage?: any
}

export const Pagination: React.FC<Props> = ({
  page,
  setPage,
  limit,
  setLimit,
  total,
  pageNumbers,
  disablePrevPage,
  disableNextPage,
  gotoPrevPage,
  gotoNextPage,
  ...rest
}) => {
  // const limitOptions = [10, 15, 20, 25, 30, 40, 50, 100]

  return (
    <PaginationContainer {...rest}>
      {/* <div className="limit-changer">
        <span>Show</span>
        <select
          value={limit}
          onChange={(e) => {
            const { value } = e.target
            setLimit(Number(value))
          }}
        >
          {limitOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span>
          <span>of</span>
          <span>{total}</span>
        </span>
      </div> */}

      {pageNumbers.length > 0 && (
        <div className="pagination">
          <Flex justify="space-between" align="center" style={{ width: '100%' }}>
            <div>
              <Button
                classes={[ButtonClass.OUTLINED, ButtonClass.WITH_ICON]}
                disabled={disablePrevPage}
                onClick={gotoPrevPage}
              >
                {' '}
                <img src={prevPageIcon} alt="<" />
                <span>Previous</span>
              </Button>
            </div>

            <ul className="page-numbers">
              {pageNumbers.map((number: any) => (
                <li key={number}>
                  <button
                    type="button"
                    onClick={() => setPage(number)}
                    className={clsx({
                      'page-numbers__link--active': page === number,
                    })}
                  >
                    {number}
                  </button>
                </li>
              ))}
            </ul>
            <div>
              {' '}
              <Button
                classes={[ButtonClass.OUTLINED, ButtonClass.WITH_ICON]}
                disabled={disableNextPage}
                onClick={gotoNextPage}
              >
                {' '}
                <img src={nextPageIcon} alt=">" />
                <span>Next</span>
              </Button>
            </div>
          </Flex>
        </div>
      )}
    </PaginationContainer>
  )
}
