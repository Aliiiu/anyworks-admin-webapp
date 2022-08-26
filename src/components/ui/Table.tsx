import React from 'react'
import styled from 'styled-components'
import clsx from 'clsx'

const TableOverviewContainer = styled.div`
  overflow-x: auto;
  margin: 20px 0;

  table {
    width: 100%;
    text-align: left;
    font-size: 15px;
    border-collapse: collapse;

    .align--right {
      text-align: right;
    }

    thead {
      tr {
        background-color: ${(props) => props.theme.colors.ui_07};

        th {
          font-weight: bold;
          line-height: 19px;
          color: ${(props) => props.theme.colors.text_06};
          border-bottom: 1px solid #ddd;
          border-top: 1px solid #ddd;
          padding: 5px 10px;
          white-space: nowrap;

          &:first-child {
            padding-left: 30px;
          }

          &:last-child {
            padding-right: 30px;
          }
        }
      }
    }

    tbody {
      color: ${(props) => props.theme.colors.text_01};

      tr.clickable {
        cursor: pointer;
        &:hover {
          background-color: ${(props) => props.theme.colors.tableRowHover};
        }
      }

      tr:nth-child(even) {
        background-color: ${(props) => props.theme.colors.ui_07};
      }

      td {
        border-bottom: 1px solid #ddd;
        padding: 10px;
        white-space: nowrap;

        &:first-child {
          padding-left: 30px;
        }

        &:last-child {
          padding-right: 30px;
        }
      }

      td.status {
        display: flex;
        align-items: center;
      }
    }
  }

  .modal-heading {
    display: flex;
    justify-content: space-between;

    h2 {
      font-size: 24px;
      line-height: 24px;
      letter-spacing: 0.25px;
      color: ${(props) => props.theme.colors.primaryColor};
    }

    button {
      border: none;
      background-color: ${(props) => props.theme.colors.transparent};
      outline: none;
    }
  }

  /* media-queries */
  @media (max-width: ${(props) => props.theme.breakpoint.sm}) {
    table tbody td:last-child {
      padding-right: 15px;
    }

    table thead tr th:first-child,
    table tbody td:first-child {
      padding-left: 15px;
    }
  }
`

interface headerType {
  title: string;
  align: string;
  render: Function
}



// type headerType = headerInt[];

interface Props {
  rows: [],
  headers: headerType[],
  showHead: boolean
  onRowClick: Function
}

export const Table : React.FC<Props> = ({ headers, rows, showHead = true, onRowClick, ...rest }) => {
  return (
    <TableOverviewContainer {...rest}>
      <table>
        {showHead && (
          <thead>
            <tr>
              {headers.map((header) => {
                return (
                  <th
                    key={header.title}
                    className={clsx({
                      'align--right': header.align === 'right',
                    })}
                  >
                    {header.title}
                  </th>
                )
              })}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              onClick={typeof onRowClick === 'function' ? () => onRowClick({ row, index }) : undefined}
              className={clsx({ clickable: onRowClick })}
            >
              {headers.map((header) => {
                return (
                  <td
                    key={header.title}
                    className={clsx({
                      'align--right': header.align === 'right',
                    })}
                  >
                    {header.render(row)}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </TableOverviewContainer>
  )
}

export default Table
