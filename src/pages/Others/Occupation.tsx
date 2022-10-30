import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { DashboardLayout, MetricsCard } from 'src/components/dashboard';
import { DashboardContainer } from '../dashboard/Dashboard';
import user from 'src/assets/images/metrics/user.svg';
import artisan from 'src/assets/images/metrics/artisan.svg';
import miscService from 'src/service/miscServices';
import { ScaleLoader } from 'react-spinners';
import { useLoading } from 'src/hooks';
import BankTable from 'src/components/Others/BankTable';
import OccupationTable from 'src/components/Others/OccupationTable';
import { RhsHeading } from '../admin/Admin';
import AddOccupationModal from 'src/components/Others/AddOccupationModal';

type Props = {};

const Occupation = (props: Props) => {
	const [occupations, setOccupation] = useState([]);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [searchField, setSearchField] = useState('');

	const {
		loading: fetchingOccupation,
		startLoading: startFetchingOccupation,
		stopLoading: stopFetchingOccupation,
	} = useLoading();

	const fetchAllOccupations = () => {
		startFetchingOccupation();
		miscService
			.getOccupations()
			.then((res) => {
				// console.log(res?.data?.payload?.data);
				setOccupation(res?.data?.payload.data);
			})
			.catch((err) => console.log(err.response))
			.finally(() => stopFetchingOccupation());
	};

	useEffect(() => {
		fetchAllOccupations();
	}, []);
	const handleChange = (e: any) => {
		setSearchField(e.target.value);
	};

	const filteredData = occupations.filter((data: any) => {
		return data.name.toLowerCase().includes(searchField.toLowerCase());
	});

	return (
		<DashboardLayout
			pageTitle='Occupations'
			rhsHeading={
				<RhsHeading
					handleChange={handleChange}
					handleOpen={handleOpen}
					action='Occupation'
				/>
			}
		>
			<DashboardContainer>
				<ToastContainer />
				<AddOccupationModal
					open={open}
					fetchAdmins={fetchAllOccupations}
					handleClose={handleClose}
				/>
				{fetchingOccupation ? (
					<div className='loader-container'>
						<ScaleLoader color='#7E00C4' height={50} width={8} />
					</div>
				) : (
					<OccupationTable rows={filteredData} />
				)}
			</DashboardContainer>
		</DashboardLayout>
	);
};

export default Occupation;
