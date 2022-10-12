import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { DashboardLayout, MetricsCard } from 'src/components/dashboard';
import { Flex } from 'src/components/ui';
import { theme } from 'src/styles/Theme';
import { DashboardContainer } from '../dashboard/Dashboard';
import user from 'src/assets/images/metrics/user.svg';
import artisan from 'src/assets/images/metrics/artisan.svg';
import miscService from 'src/service/miscServices';
import { ScaleLoader } from 'react-spinners';
import { useLoading } from 'src/hooks';
import BankTable from 'src/components/Others/BankTable';
import OccupationTable from 'src/components/Others/OccupationTable';

type Props = {};

const Occupation = (props: Props) => {
	const [occupations, setOccupation] = useState([]);
	const [banks, setBanks] = useState([]);

	const {
		loading: fetchingOccupation,
		startLoading: startFetchingOccupation,
		stopLoading: stopFetchingOccupation,
	} = useLoading();
	const {
		loading: fetchingBanks,
		startLoading: startFetchingBanks,
		stopLoading: stopFetchingBanks,
	} = useLoading();

	useEffect(() => {
		startFetchingOccupation();
		miscService
			.getOccupations()
			.then((res) => {
				// console.log(res?.data?.payload?.data);
				setOccupation(res?.data?.payload.data);
			})
			.catch((err) => console.log(err.response))
			.finally(() => stopFetchingOccupation());
	}, []);
	useEffect(() => {
		startFetchingBanks();
		miscService
			.getBanks()
			.then((res) => {
				// console.log(res?.data?.payload?.data);
				setBanks(res?.data?.payload.data);
			})
			.catch((err) => console.log(err.response))
			.finally(() => stopFetchingBanks());
	}, []);
	const otherMetrics = [
		{
			count: occupations.length,
			key: 'Total Occupations',
			img: user,
			color: theme.colors.purple,
		},
		{
			count: banks.length,
			key: 'Total Banks',
			img: artisan,
			color: theme.colors.blue,
		},
	];
	return (
		<DashboardLayout pageTitle='Dashboard'>
			<DashboardContainer>
				<ToastContainer />
				<div className='metrics__cards'>
					<Flex wrap='wrap' gap='1.5rem'>
						{otherMetrics.map((metric) => {
							return <MetricsCard key={metric.key} metric={metric} />;
						})}
					</Flex>
				</div>
				{/* {fetchingOccupation ? (
					<div className='loader-container'>
						<ScaleLoader color='#7E00C4' height={50} width={8} />
					</div>
				) : (
					<OccupationTable rows={occupations} />
				)} */}
				{fetchingBanks ? (
					<div className='loader-container'>
						<ScaleLoader color='#7E00C4' height={50} width={8} />
					</div>
				) : (
					<BankTable rows={banks} />
				)}
			</DashboardContainer>
		</DashboardLayout>
	);
};

export default Occupation;
