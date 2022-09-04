import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Flex, Table } from 'src/components/ui'
import { usePagination } from 'src/hooks/usePagination'

const KycTableContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 16px;
  padding-bottom: 20px;
  margin: 3rem 0;
  
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

export const KycTable = ({ rows }: Props) => {
  const navigate = useNavigate()

  const KycTableHeaders = [
    {
      title: 'Name',
      render: (row: any) => (
        <Flex gap="10px" align="center">
          <img style={{ width: '40px' }} src={row.img} alt="" /> {row.name}
        </Flex>
      ),
    },
    {
      title: 'Means of Identification',
      render: (row: any) => `${row.meansOfId}`,
    },
    {
      title: 'Date',
      render: (row: any) => `${row.date}`,
    },
  ]

  const { page, limit, Pagination } = usePagination({
    page: 1,
    limit: 4,
    total: rows.length,
  })
  const paginatedRows = rows.slice((page - 1) * limit, page * limit)

  return (
    <KycTableContainer>
      <div className="heading">
        <p className="count">{rows.length} Pending Kyc</p>
      </div>
      <Table
        rows={paginatedRows}
        headers={KycTableHeaders}
        showHead={true}
        onRowClick={() => {
          navigate('/kyc/artisan')
        }}
      />
      <Pagination />
    </KycTableContainer>
  )
}

export default KycTable
