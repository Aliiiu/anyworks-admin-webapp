import { DashboardLayout } from 'src/components/dashboard';
import styled from 'styled-components';
import searchIcon from 'src/assets/images/input/searchIcon.svg';
import addIcon from 'src/assets/images/common/add.svg';
import AdminTable from 'src/components/admin/AdminTable';
import { useState } from 'react';
import AddAdminModal from 'src/components/admin/addAdminModal/AddAdminModal';
import { theme } from 'src/styles/Theme';
import { Input } from 'src/components/inputs';
import { Flex, Button, ButtonClass } from 'src/components/ui';
import { ADMINData } from 'src/constants/ADMINDATA';

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
	const [searchField, setSearchField] = useState('');

	const filteredData = ADMINData.filter((data) => {
		return (
			data.admin.toLowerCase().includes(searchField.toLowerCase()) ||
			data.role.toLowerCase().includes(searchField.toLowerCase()) ||
			data.status.toLowerCase().includes(searchField.toLowerCase())
		);
	});
	const handleChange = (e: any) => {
		setSearchField(e.target.value);
	};
	return (
		<DashboardLayout
		pageTitle="Admin"
			rhsHeading={
				<RhsHeading handleChange={handleChange} handleOpen={handleOpen} />
			}
		>
			<AdminContainer>
				<AddAdminModal open={open} handleClose={handleClose} />
				<AdminTable rows={filteredData} />
			</AdminContainer>
		</DashboardLayout>
	);
};

export default Admin;
