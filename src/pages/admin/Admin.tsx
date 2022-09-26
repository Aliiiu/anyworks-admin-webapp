import { DashboardLayout } from 'src/components/dashboard';
import styled from 'styled-components';
import searchIcon from 'src/assets/images/input/searchIcon.svg';
import addIcon from 'src/assets/images/common/add.svg';
import AdminTable from 'src/components/admin/AdminTable';
import { useEffect, useState } from 'react';
import AddAdminModal from 'src/components/admin/addAdminModal/AddAdminModal';
import { theme } from 'src/styles/Theme';
import { Input } from 'src/components/inputs';
import { Flex, Button, ButtonClass } from 'src/components/ui';
import { AdminServices } from 'src/service/AdminServices';
import { AdminTypes } from './adminTypes';
import Loader from 'src/components/common/Loader';
import { useLoading } from 'src/hooks';

const AdminContainer = styled.div``;
interface Props {
	handleOpen: (e: any) => void;
	handleChange: (e: any) => void;
}

export const RhsHeading: React.FC<Props> = ({ handleChange, handleOpen }) => (
	<Flex wrap='wrap'>
		<Input
			icon={<img src={searchIcon} alt='searchIcon' />}
			type='search'
			placeholder='Search'
			handleChange={handleChange}
		/>

		<Button
			onClick={handleOpen}
			classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}
			style={{ backgroundColor: theme.colors.purple, height: '48px' }}
		>
			<img src={addIcon} alt='plus' width={24} height='24px' />
			<span>Add new admin</span>
		</Button>
	</Flex>
);

const Admin = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [allAdmins, setAllAdmins] = useState<AdminTypes[]>([]);
	const [searchField, setSearchField] = useState('');
	const {
		loading: fetchingAdmins,
		startLoading: startFetchingAdmins,
		stopLoading: stopFetchingAdmins,
	} = useLoading(false);

	useEffect(() => {
		document.title = 'Admin Page';
	}, []);

	const getAllAdmins = () => {
		startFetchingAdmins();
		AdminServices.getAllAdmins()
			.then((res: any) => {
				// console.log(res.data.payload.data);
				res.data.payload.data && setAllAdmins(res.data.payload.data);
			})
			.catch((err: any) => console.log(err.response))
			.finally(() => stopFetchingAdmins());
	};

	useEffect(() => {
		getAllAdmins();
		// console.log(allAdmins);
	}, []);

	const filteredData = allAdmins.filter((data) => {
		return (
			data.first_name.toLowerCase().includes(searchField.toLowerCase()) ||
			data.last_name.toLowerCase().includes(searchField.toLowerCase()) ||
			data.suspended.toLowerCase().includes(searchField.toLowerCase())
		);
	});
	const handleChange = (e: any) => {
		setSearchField(e.target.value);
	};
	return (
		<DashboardLayout
			pageTitle='Admin'
			rhsHeading={
				<RhsHeading handleChange={handleChange} handleOpen={handleOpen} />
			}
		>
			<AdminContainer>
				<AddAdminModal
					open={open}
					fetchAdmins={getAllAdmins}
					handleClose={handleClose}
				/>
				{fetchingAdmins ? (
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
					<AdminTable rows={filteredData} fetchAdmins={getAllAdmins} />
				)}
			</AdminContainer>
		</DashboardLayout>
	);
};

export default Admin;
