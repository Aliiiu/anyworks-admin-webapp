import { useEffect, useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styled from 'styled-components';
import { usePagination } from 'src/hooks/usePagination';
import { Flex, Table } from 'src/components/ui';
import { FilterButton } from 'src/styles/commonStyle';
import filterIcon from 'src/assets/images/common/filter.svg';
import { DateRangeFilter } from 'src/components/common';
import { addDays } from 'date-fns';
import { theme } from 'src/styles/Theme';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const BookingsContainer = styled.div`
	background-color: ${(props) => props.theme.colors.white};
	margin: 3rem 0;
	border-radius: 16px;
	padding: 20px 0;

	.heading {
		padding: 0 20px 10px 20px;

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

		.title {
			font-weight: 700;
			font-size: 18px;
			line-height: 28px;
			color: ${(props) => props.theme.colors.text_01};
			margin-bottom: 1rem;
			padding: 0 20px;
		}
	}

	.MuiTabs-root {
		min-height: auto;
		padding: 0 20px;
	}

	.MuiTabs-scroller {
		border-bottom: 1px solid ${(props) => props.theme.colors.gray_03};
	}
	.MuiButtonBase-root {
		border: none;
		cursor: pointer;
		font-size: 15px;
		background-color: transparent;
		text-transform: capitalize;
		color: ${(props) => props.theme.colors.text_01};
		height: fit-content;
		min-height: auto;
		padding: 10px;
		width: 110px;

		&:hover {
			color: ${(props) => props.theme.colors.text_02};
		}
	}
	.MuiTabs-root .Mui-selected {
		color: ${(props) => props.theme.colors.text_01};
	}
	.MuiTabs-indicator {
		background-color: ${(props) => props.theme.colors.text_01};
		height: 3px;
	}
	.MuiTabPanel-root {
		padding: 0;
	}
	.pd-20 {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50px;
		font-style: italic;
		font-weight: 600;
	}
`;

interface Props {
	rows: any[];
	BookingsTableHeaders: any;
	title: any;
	onRowClick?: Function;
	allowRowClick?: boolean;
	searchParams?: any;
	setSearchParams?: any;
}

export const DisputeTabs: React.FC<Props> = ({
	rows,
	BookingsTableHeaders,
	title,
	onRowClick,
	allowRowClick = true,
	searchParams,
	setSearchParams,
}) => {
	const [value, setValue] = useState('1');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
		if (newValue === '1') {
			setSearchParams({ tabStatus: 'all' });
		}
		if (newValue === '2') {
			setSearchParams({ tabStatus: 'pending' });
		}
		if (newValue === '3') {
			setSearchParams({ tabStatus: 'resolved' });
		}
	};
	//Date filter
	useEffect(() => {
		searchParams.get('tabStatus') === 'all' && setValue('1');
		searchParams.get('tabStatus') === 'active' && setValue('2');
		searchParams.get('tabStatus') === 'resolved' && setValue('3');
	}, [searchParams]);

	const tabData = (status: string) => {
		if (status !== 'all') {
			return rows.filter((data) => {
				return data.status?.toLowerCase().includes(status.toLowerCase() || '');
			});
		} else {
			return rows;
		}
	};

	const { page, limit, Pagination } = usePagination({
		page: 1,
		limit: 10,
		total: tabData(searchParams.get('tabStatus') || '').length,
	});
	const paginatedRows = tabData(searchParams.get('tabStatus') || '').slice(
		(page - 1) * limit,
		page * limit
	);

	return (
		<BookingsContainer>
			<>
				<TabContext value={value}>
					<div>
						<TabList onChange={handleChange} aria-label='lab API tabs example'>
							<Tab label='All' value='1' />
							<Tab label='Active' value='2' />
							<Tab label='Resolved' value='3' />
						</TabList>
					</div>
					<div>
						<TabPanel value='1'>
							{paginatedRows.length > 0 ? (
								<>
									<Table
										rows={paginatedRows}
										headers={BookingsTableHeaders}
										showHead={true}
										allowRowClick={allowRowClick}
										onRowClick={onRowClick}
									/>
									<Pagination />
								</>
							) : (
								<p className='pd-20'>No Data Found</p>
							)}
						</TabPanel>
						<TabPanel value='2'>
							{paginatedRows.length > 0 ? (
								<>
									<Table
										rows={paginatedRows}
										headers={BookingsTableHeaders}
										showHead={true}
										allowRowClick={allowRowClick}
										onRowClick={onRowClick}
									/>
									<Pagination />
								</>
							) : (
								<p className='pd-20'>No Data Found</p>
							)}
						</TabPanel>
						<TabPanel value='3'>
							{paginatedRows.length > 0 ? (
								<>
									<Table
										rows={paginatedRows}
										headers={BookingsTableHeaders}
										showHead={true}
										allowRowClick={allowRowClick}
										onRowClick={onRowClick}
									/>

									<Pagination />
								</>
							) : (
								<p className='pd-20'>No Data Found</p>
							)}
						</TabPanel>
					</div>
				</TabContext>
			</>
		</BookingsContainer>
	);
};

export default DisputeTabs;
