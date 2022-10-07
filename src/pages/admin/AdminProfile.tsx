import { DashboardLayout } from 'src/components/dashboard';
import filterIcon from 'src/assets/images/common/filter.svg';
import { useEffect, useState } from 'react';
import { FilterButton } from 'src/styles/commonStyle';
import { Link, useParams } from 'react-router-dom';
import { Flex, Table, Button, ButtonClass } from 'src/components/ui';
import arrowLeft from 'src/assets/images/common/arrowLeft.svg';
import { theme } from 'src/styles/Theme';
import { formatDateDmy } from 'src/utils/helpers';
import { DateRangeFilter } from 'src/components/common';
import { addDays } from 'date-fns';
import { AdminServices } from 'src/service/AdminServices';
import { AdminTypes } from './adminTypes';
import AdminProfileDetails from 'src/components/admin/AdminProfileDetails';
import { ADMINLOG } from 'src/constants/ADMINLOG';
import {
	AdminActivityTableContainer,
	StyledAdminProfileComponent,
	StyledProfileHeader,
} from 'src/components/admin/admin-style';
import { useLoading } from 'src/hooks';
import { ScaleLoader } from 'react-spinners';

const AdminProfile = () => {
	const AdminActivityTableHeaders = [
		{
			title: 'Date',
			render: (row: any) => formatDateDmy(row.date),
		},
		{
			title: 'Action Type',
			render: (row: any) => `${row.type}`,
		},
	];

	//Date filter
	const [openDateFilter, setOpenDateFilter] = useState(false);
	const handleOpenDateFilter = () => setOpenDateFilter(true);
	const handleCloseDateFilter = () => setOpenDateFilter(false);

	const [state, setState] = useState([
		{
			startDate: new Date('2020-01-01'),
			endDate: addDays(new Date(), 0),
			key: 'selection',
			color: theme.colors.darkPurple,
		},
	]);

	const startDate = state[0]?.startDate;
	const endDate = state[0]?.endDate;

	const dateFilteredData = ADMINLOG.filter((a: any) => {
		const date = new Date(a.date);
		return date >= startDate && date <= endDate;
	});
	const { id } = useParams();
	const [adminEntry, setAdminEntry] = useState<AdminTypes>({
		first_name: '',
		last_name: '',
		email: '',
		role: [],
		suspended: '',
		display_picture: '',
	});
	const { loading, startLoading, stopLoading } = useLoading();
	const getAdmin = (id: string) => {
		startLoading();
		AdminServices.getAdmin(id)
			.then((res: any) => {
				// console.log(res.data.payload.data);
				res?.data.payload.data && setAdminEntry(res.data.payload.data);
			})
			.catch((err: any) => console.log(err.response))
			.finally(() => stopLoading());
	};
	useEffect(() => {
		id && getAdmin(id);
	}, []);

	return (
		<DashboardLayout>
			<DateRangeFilter
				open={openDateFilter}
				handleClose={handleCloseDateFilter}
				state={state}
				setState={setState}
			/>
			<StyledAdminProfileComponent>
				<StyledProfileHeader>
					<h2>
						{adminEntry.first_name} {adminEntry.last_name}'s profile
					</h2>
					<Link to='/admins'>
						<Button
							classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}
							style={{ backgroundColor: theme.colors.purple }}
						>
							{' '}
							<img src={arrowLeft} alt='back' />
							<span>Back to Admins</span>
						</Button>
					</Link>
				</StyledProfileHeader>
				{loading ? (
					<div className='loader-container'>
						<ScaleLoader color='#7E00C4' height={50} width={8} />
					</div>
				) : (
					<AdminProfileDetails adminEntry={adminEntry} getAdmin={getAdmin} />
				)}

				<AdminActivityTableContainer>
					<div className='heading'>
						<Flex justify='space-between' align='center'>
							<p className='title'> Activity Log</p>
							<FilterButton onClick={handleOpenDateFilter}>
								<img src={filterIcon} alt='' width={24} height='24px' />
								Filter
							</FilterButton>
						</Flex>
					</div>

					<Table
						rows={dateFilteredData}
						headers={AdminActivityTableHeaders}
						showHead
						allowRowClick={false}
					/>
				</AdminActivityTableContainer>
			</StyledAdminProfileComponent>
		</DashboardLayout>
	);
};

export default AdminProfile;
