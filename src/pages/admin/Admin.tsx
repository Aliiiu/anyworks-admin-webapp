import { AiOutlinePlus } from 'react-icons/ai';
import { DashboardLayout } from 'src/components/dashboard';
import styled from 'styled-components';
import searchIcon from 'src/assets/images/common/search.svg';
import addIcon from 'src/assets/images/common/add.svg';
import AdminTable from 'src/components/admin/AdminTable';
import { useState } from 'react';
import AddAdminModal from 'src/components/admin/addAdminModal/AddAdminModal';

const AdminContainer = styled.div`
	.pageHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		h2 {
			font-size: 36px;
			font-weight: 700;
			color: ${(props) => props.theme.colors.text_01};
		}
		.header_action_wrapper {
			display: flex;
			gap: 15px;
			.search_bar {
				border-radius: 8px;
				background: #ffffff;
				width: 402px;
				height: 50px;
				padding: 10px 0 10px 40px;
				border: none;
				display: flex;
				align-items: center;
				gap: 20px;
				.search_input {
					color: #98a2b3;
					font-size: 20px;
					width: 100%;
					border: none;
					outline: none;
				}
			}
			.add_admin_btn {
				background: ${(props) => props.theme.colors.purple};
				color: #ffffff;
				font-weight: 500;
				font-szie: 16px;
				display: flex;
				gap: 10px;
				justify-content: center;
				align-items: center;
				border-radius: 8px;
				padding: 12px 20px;
			}
		}
	}
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
				<div className='pageHeader'>
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
				</div>
				<div className='table_wrapper'>
					<div className='table_summary'>10 Admin</div>
					<AdminTable />
				</div>
			</AdminContainer>
		</DashboardLayout>
	);
};

export default Admin;
