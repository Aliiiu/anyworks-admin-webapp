import { DashboardLayout } from 'src/components/dashboard';
import {
	FilterButton,
	StyledPageHeader,
	StyledTableContainer,
} from 'src/styles/commonStyle';
import searchIcon from 'src/assets/images/common/search.svg';
import filterIcon from 'src/assets/images/common/filter.svg';
import styled from 'styled-components';
import ArtisanTable from 'src/components/artisan/ArtisanTable';

const StyledArtisanContainer = styled.div`
	.wrapper {
		padding-right: 20px;
	}

	.table_divider {
		background: #f2f4f7;
		margin-top: 20px;
		width: 100%;
		height: 1px;
	}
`;
const Artisan = () => {
	return (
		<DashboardLayout>
			<StyledArtisanContainer>
				<StyledPageHeader>
					<h2>Artisans</h2>
					<div className='header_action_wrapper'>
						<div className='search_bar'>
							<img src={searchIcon} alt='' width={20} height='20px' />
							<input
								type='text'
								placeholder='Search'
								className='search_input'
							/>
						</div>
					</div>
				</StyledPageHeader>
				<StyledTableContainer>
					<div className='wrapper'>
						<div style={{ width: 120 }} className='table_summary'>
							782 Artisans
						</div>
						<FilterButton>
							<img src={filterIcon} alt='' width={24} height='24px' />
							Filter
						</FilterButton>
					</div>
					<div className='table_divider'></div>
					<ArtisanTable />
				</StyledTableContainer>
			</StyledArtisanContainer>
		</DashboardLayout>
	);
};

export default Artisan;
