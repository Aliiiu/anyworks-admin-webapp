import ArtisanTable from 'src/components/artisan/ArtisanTable';
import { DashboardLayout } from 'src/components/dashboard';
import { Input } from 'src/components/inputs';
import searchIcon from 'src/assets/images/input/searchIcon.svg';
import { useEffect, useState } from 'react';
import { useLoading } from 'src/hooks';
import { ArtisansServices } from 'src/service/ArtisansServices';
import { Loader } from 'src/components/common';

interface Props {
	handleChangeSearch: (e: any) => void;
}

export const RhsHeading: React.FC<Props> = ({ handleChangeSearch }) => (
	<Input
		icon={<img src={searchIcon} alt='searchIcon' />}
		type='search'
		placeholder='Search'
		handleChange={handleChangeSearch}
	/>
);

const Artisan = () => {
	const [searchField, setSearchField] = useState('');
	const [allArtisans, setAllArtisans] = useState([]);
	const { loading, startLoading, stopLoading } = useLoading();

	const fetchAllArtisans = () => {
		startLoading();
		ArtisansServices.getAllArtisans()
			.then((res) => setAllArtisans(res.data.payload.data))
			.catch((err: any) => console.log(err.response))
			.finally(() => stopLoading());
	};

	useEffect(() => {
		fetchAllArtisans();
		console.log(allArtisans);
	}, []);
	const filteredData = allArtisans.filter((data: any) => {
		return (
			data?.first_name?.toLowerCase().includes(searchField.toLowerCase()) ||
			data?.last_name?.toLowerCase().includes(searchField.toLowerCase()) ||
			data?.email?.toLowerCase().includes(searchField.toLowerCase()) ||
			data?.occupation?.toLowerCase().includes(searchField.toLowerCase()) ||
			data?.gender?.toLowerCase().includes(searchField.toLowerCase())
		);
	});

	const handleChangeSearch = (e: any) => {
		setSearchField(e.target.value);
	};
	return (
		<DashboardLayout
			pageTitle='Artisans'
			rhsHeading={<RhsHeading handleChangeSearch={handleChangeSearch} />}
		>
			{loading ? (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '100px',
					}}
				>
					<Loader>loading...</Loader>{' '}
				</div>
			) : (
				<ArtisanTable filteredRow={filteredData} />
			)}
		</DashboardLayout>
	);
};

export default Artisan;
