import { DashboardLayout } from 'src/components/dashboard';
import { StyledPageHeader } from 'src/styles/commonStyle';
import searchIcon from 'src/assets/images/common/search.svg';
import styled from 'styled-components';
import ArtisanTable from 'src/components/artisan/ArtisanTable';
import { ARTISANData } from 'src/constants/ARTISANDATA';
import { useState } from 'react';

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
	const [searchField, setSearchField] = useState('');

	const filteredData = ARTISANData.filter((data) => {
		return (
			data.name.toLowerCase().includes(searchField.toLowerCase()) ||
			data.email.toLowerCase().includes(searchField.toLowerCase())
		);
	});
	const handleChange = (e: any) => {
		setSearchField(e.target.value);
	};
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
								onChange={handleChange}
							/>
						</div>
					</div>
				</StyledPageHeader>
				<ArtisanTable filteredData={filteredData} />
			</StyledArtisanContainer>
		</DashboardLayout>
	);
};

export default Artisan;
