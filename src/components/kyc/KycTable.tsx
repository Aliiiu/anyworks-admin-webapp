import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Flex, Table } from 'src/components/ui';
import { usePagination } from 'src/hooks/usePagination';
import { FormGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';
import { Popover } from 'react-tiny-popover';
import { FilterButton } from 'src/styles/commonStyle';
import { PopupContainer } from '../artisan/artisan-style';
import { useState } from 'react';
import { useBoolean } from 'src/hooks';
import filterIcon from 'src/assets/images/common/filter.svg';
// import { formatDate } from 'src/utils/helpers'
// import { DateRangeFilter } from 'src/components/common'
// import { FilterButton } from 'src/styles/commonStyle'
// import filterIcon from 'src/assets/images/common/filter.svg'
// import { addDays } from 'date-fns'
// import { theme } from 'src/styles/Theme'
// import { useState } from 'react'

const KycTableContainer = styled.div`
	background-color: ${(props) => props.theme.colors.white};
	border-radius: 16px;
	padding-bottom: 20px;
	margin: 2rem 0;

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
`;
interface Props {
	rows: any;
	header?: any;
	title?: string;
}

export const KycTable = ({ rows, header, title }: Props) => {
	const navigate = useNavigate();
	const [selectedFilterValue, setSelectedFilterValue] = useState('all');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedFilterValue(event.target.value);
	};

	//Date filter
	// const [openDateFilter, setOpenDateFilter] = useState(false)
	// const handleOpenDateFilter = () => setOpenDateFilter(true)
	// const handleCloseDateFilter = () => setOpenDateFilter(false)

	// const [state, setState] = useState([
	//   {
	//     startDate: new Date('2020-01-01'),
	//     endDate: addDays(new Date(), 8),
	//     key: 'selection',
	//     color: theme.colors.darkPurple,
	//   },
	// ])

	// const startDate = state[0]?.startDate
	// const endDate = state[0]?.endDate

	// const dateFilteredData = rows.filter((a: any) => {
	//   const date = new Date(a.date)
	//   return date >= new Date(startDate) && date <= new Date(endDate)
	// })

	const sortedData = () => {
		if (selectedFilterValue === 'all') {
			return rows;
		} else if (selectedFilterValue === 'pending') {
			return rows.filter((item: any) =>
				item.status.toLowerCase().includes('pending')
			);
		} else if (selectedFilterValue === 'upgrade') {
			return rows.filter((item: any) =>
				item.status.toLowerCase().includes('upgrade')
			);
		} else {
			return rows;
		}
	};

	const { page, limit, Pagination } = usePagination({
		page: 1,
		limit: 10,
		total: sortedData().length,
	});
	const paginatedRows = sortedData().slice((page - 1) * limit, page * limit);
	const { value: isOpen, setFalse: closeAction, toggle } = useBoolean(false);

	return (
		<KycTableContainer>
			{/* <DateRangeFilter
        open={openDateFilter}
        handleClose={handleCloseDateFilter}
        state={state}
        setState={setState}
      /> */}

			<div className='heading'>
				<Flex justify='space-between' align='center'>
					<p className='count'>
						{sortedData().length} {title}
					</p>
					<Popover
						isOpen={isOpen}
						padding={1}
						positions={['right', 'left', 'bottom', 'top']}
						content={
							<PopupContainer tabIndex={-1}>
								<FormGroup>
									<FormControlLabel
										style={{ padding: '0px 0 0 18px' }}
										control={
											<Checkbox
												checked={selectedFilterValue === 'pending'}
												onChange={handleChange}
												value='pending'
												name='radio-buttons'
											/>
										}
										label='Pending'
									/>
									<div style={{ borderBottom: '1px solid #F2F4F7' }}></div>
									<FormControlLabel
										style={{ padding: '0px 0 0 18px' }}
										control={
											<Checkbox
												checked={selectedFilterValue === 'upgrade'}
												onChange={handleChange}
												value='upgrade'
												name='radio-buttons'
											/>
										}
										label='Upgrade'
									/>
									<div style={{ borderBottom: '1px solid #F2F4F7' }}></div>
									<FormControlLabel
										style={{ padding: '0px 0 0 18px' }}
										control={
											<Checkbox
												checked={selectedFilterValue === 'all'}
												onChange={handleChange}
												value='all'
												name='radio-buttons'
											/>
										}
										label='All'
									/>
								</FormGroup>
							</PopupContainer>
						}
						onClickOutside={closeAction}
					>
						<FilterButton onClick={toggle}>
							<img src={filterIcon} alt='' width={24} height='24px' />
							Filter
						</FilterButton>
					</Popover>
				</Flex>
			</div>
			<Table
				rows={paginatedRows}
				headers={header}
				showHead={true}
				onRowClick={(index) => {
					navigate(`${index}/nin-validation`);
				}}
			/>
			<Pagination />
		</KycTableContainer>
	);
};

export default KycTable;
