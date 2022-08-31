import filterIcon from 'src/assets/images/common/filter.svg';
import { FilterButton } from 'src/styles/commonStyle';
import styled from 'styled-components';
import WalletTable from './WalletTable';

const StyledWalletContainer = styled.div`
	background-color: ${(props) => props.theme.colors.white};
	margin: 3rem 0;
	border-radius: 16px;
	padding: 16px 0px;
	.header {
		display: flex;
		justify-content: space-between;
		padding: 0px 20px;
	}
`;
const WalletContainer = () => {
	return (
		<StyledWalletContainer>
			<div className='header'>
				<h3>Wallet Transactions</h3>
				<FilterButton>
					<img src={filterIcon} alt='' width={24} height='24px' />
					Filter
				</FilterButton>
			</div>
			<WalletTable />
		</StyledWalletContainer>
	);
};

export default WalletContainer;
