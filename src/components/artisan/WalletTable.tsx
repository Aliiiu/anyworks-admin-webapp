import { usePagination } from 'src/hooks/usePagination'
import { Flex, Table } from 'src/components/ui'
import filterIcon from 'src/assets/images/common/filter.svg'
import { FilterButton } from 'src/styles/commonStyle'
import styled from 'styled-components'
import { WALLETData } from 'src/constants/WALLETDATA'


const WalletTableContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  margin: 3rem 0;
  border-radius: 16px;
  padding-bottom: 20px;
  .heading {
    border-bottom: 1px solid ${(props) => props.theme.colors.gray_03};
    padding: 20px;

	.title {
		font-weight: 700;
		font-size: 18px;
		line-height: 28px;
		color: ${(props) => props.theme.colors.text_01};
	}
  }
`

const WalletTable = () => {

 const WalletTableHeaders = [
	
	{
	  title: 'Date',
	  render: (row: any) => `${row.date}`,
	},
	{
	  title: 'Type',
	  render: (row: any) => `${row.type}`,
	},
	{
	  title: 'Amount',
	  render: (row: any) => `${row.amount}`,
	},
	{
	  title: 'Remarks/narration',
	  render: (row: any) => `${row.remarks}`,
	},


  ]

  const { page, limit, Pagination } = usePagination({
    page: 1,
    limit: 2,
    total: WALLETData.length,
  })
  const paginatedRows = WALLETData.slice((page - 1) * limit, page * limit)

  return (

      <WalletTableContainer>
        <div className="heading">
          <Flex justify="space-between" align="center">
            <p className="title"> Wallet Transactions</p>
            <FilterButton >
                <img src={filterIcon} alt="" width={24} height="24px" />
                Filter
              </FilterButton>
          </Flex>
        </div>

        <Table
          rows={paginatedRows}
          headers={WalletTableHeaders}
          showHead
		  allowRowClick={false}
        />
        <Pagination />
      </WalletTableContainer>
  )
}

export default WalletTable
