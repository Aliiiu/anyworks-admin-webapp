import { AiOutlinePlus } from 'react-icons/ai';
import { DashboardLayout } from 'src/components/dashboard';
import styled from 'styled-components';
import searchIcon from 'src/assets/images/common/search.svg';
import addIcon from 'src/assets/images/common/add.svg';
import AdminTable from 'src/components/admin/AdminTable';
import { useState } from 'react';
import AddAdminModal from 'src/components/admin/addAdminModal/AddAdminModal';
import { StyledPageHeader } from 'src/styles/commonStyle';

const AdminContainer = styled.div`
	.table_wrapper {
		background-color: ${(props) => props.theme.colors.white};
		margin: 30px 0;
		border-radius: 16px;
		padding: 20px 0;
		.table_summary {
			background: #f2f4f7;
			border-radius: 16px;
			color: #7e00c4;
			font-weight: 700;
			font-size: 18px;
			margin-left: 20px;
			width: 100px;
			height: 30px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
`;
const Admin = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<DashboardLayout>
			<AdminContainer>
				<StyledPageHeader>
					<h2>Admin</h2>
					<div className='header_action_wrapper'>
						<div className='search_bar'>
							<img src={searchIcon} alt='' width={20} height='20px' />
							<input
								type='text'
								placeholder='Search'
								className='search_input'
							/>
						</div>
						<button onClick={handleOpen} className='add_admin_btn'>
							<img src={addIcon} alt='' width={24} height='24px' /> Add new
							admin
						</button>
						<AddAdminModal open={open} handleClose={handleClose} />
					</div>
				</StyledPageHeader>
				<div className='table_wrapper'>
					<div className='table_summary'>10 Admin</div>
					<AdminTable />
				</div>
			</AdminContainer>
		</DashboardLayout>
	);
};

export default Admin;
