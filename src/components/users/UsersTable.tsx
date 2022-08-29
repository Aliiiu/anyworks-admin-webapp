import styled from 'styled-components'
import { Flex, Table, ActionMenu } from 'src/components/ui'
import { useNavigate } from 'react-router-dom'
import { usePagination } from 'src/hooks'

const UsersTableContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  margin: 3rem 0;
  border-radius: 16px;
  padding-bottom: 20px;
  .heading {
    border-bottom: 1px solid ${(props) => props.theme.colors.gray_03};
    padding: 20px;

    .count {
      font-weight: 700;
      font-size: 17px;
      line-height: 27px;
      color: ${(props) => props.theme.colors.purple};
      background-color: ${(props) => props.theme.colors.gray_04};
      padding: 4px 12px;
      width: max-content;
      border-radius: 16px;
    }
  }
`

interface Props {
  rows: any
}

export const UsersTable = ({ rows }: Props) => {
  const navigate = useNavigate()

  const UsersTableHeaders = [
    {
      title: 'Name',
      render: (row: any) => (
        <Flex gap="10px" align="center">
          <img style={{ width: '40px' }} src={row.img} alt="" /> {row.name}
        </Flex>
      ),
    },
    { title: 'Email', render: (row: any) => `${row.email}` },
    { title: 'Registration Date', render: (row: any) => `${row.lastLogin}` },
    { title: 'Last Login', render: (row: any) => `${row.registrationDate}` },
    {
      title: '',
      render: (row: any) => (
        <ActionMenu
          actions={[
            {
              title: 'View profile',
              onClick: () => navigate('/users/profile'),
            },
            {
              title: 'Send email',
              onClick: () => console.log('Send email'),
            },
            {
              title: 'Send notification',
              onClick: () => console.log('Send notification'),
            },
          ]}
        />
      ),
    },
  ]

  const { page, limit, Pagination } = usePagination({
    page: 1,
    limit: 2,
    total: rows.length,
  })
  const paginatedRows = rows.slice((page - 1) * limit, page * limit)

  console.log(rows)
  return (
    <UsersTableContainer>
      <div className="heading">
        <p className="count">{rows.length} Users</p>
      </div>
      <Table rows={paginatedRows} headers={UsersTableHeaders} showHead={true} />
      <Pagination />
    </UsersTableContainer>
  )
}

export default UsersTable
