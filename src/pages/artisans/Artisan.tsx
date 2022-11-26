import ArtisanTable from 'src/components/artisan/ArtisanTable';
import { DashboardLayout } from 'src/components/dashboard';
import { Input } from 'src/components/inputs';
import searchIcon from 'src/assets/images/input/searchIcon.svg';
import { useEffect, useState } from 'react';
import { useLoading } from 'src/hooks';
import { ArtisansServices } from 'src/service/ArtisansServices';
import { Loader } from 'src/components/common';
import { toast, ToastContainer } from 'react-toastify';
import { Button, ButtonClass, Flex } from 'src/components/ui';
import { theme } from 'src/styles/Theme';
import { SendNotificationModal } from 'src/components/users';

interface Props {
	handleChangeSearch: (e: any) => void;
	handleOpen: (e: any) => void;
}

export const RhsHeading: React.FC<Props> = ({
	handleChangeSearch,
	handleOpen,
}) => {
	return (
		<Flex wrap='wrap'>
			<Input
				icon={<img src={searchIcon} alt='searchIcon' />}
				type='search'
				placeholder='Search'
				handleChange={handleChangeSearch}
			/>
			<Button
				onClick={handleOpen}
				classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}
				style={{ backgroundColor: theme.colors.purple, height: '48px' }}
			>
				<span>Notify all artisans</span>
			</Button>
		</Flex>
	);
};

const Artisan = () => {
	const [searchField, setSearchField] = useState('');
	const [allArtisans, setAllArtisans] = useState([]);
	const { loading, startLoading, stopLoading } = useLoading();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		document.title = "Artisan's Page";
	}, []);

	const fetchAllArtisans = () => {
		startLoading();
		ArtisansServices.getAllArtisans()
			.then((res) => {
				console.log(res?.data?.payload?.data);
				setAllArtisans(res?.data?.payload?.data);
			})
			.catch((err: any) => {
				console.log(err?.response?.data?.error?.message);
				toast.error(err?.response?.data?.error?.message);
			})
			.finally(() => stopLoading());
	};

	useEffect(() => {
		fetchAllArtisans();
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
			pageTitle='Vendor'
			rhsHeading={
				<RhsHeading
					handleChangeSearch={handleChangeSearch}
					handleOpen={handleOpen}
				/>
			}
		>
			<SendNotificationModal
				open={open}
				userId={['']}
				handleClose={handleClose}
			/>
			<ToastContainer />
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
			) : filteredData.length > 0 ? (
				<ArtisanTable filteredRow={filteredData} />
			) : (
				<p className='table-entry-status'>No Vendor Found</p>
			)}
		</DashboardLayout>
	);
};

export default Artisan;
