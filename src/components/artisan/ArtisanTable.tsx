import { ARTISANData } from 'src/constants/ARTISANDATA';
import navIcon from 'src/assets/images/common/nav.svg';
import { useNavigate } from 'react-router-dom';
import { TableContainer } from '../admin/AdminTable';
import { usePagination } from 'src/hooks/usePagination';
import { useState } from 'react';
import SendMailModal from '../users/SendMailModal';
import SendNotificationModal from '../users/SendNotificationModal';

interface ColumnProps {
	field: string;
}
const tableColumn: ColumnProps[] = [
	{
		field: 'Admin',
	},
	{
		field: 'Email',
	},
	{
		field: 'Registration Date',
	},
	{
		field: 'Last Login',
	},
	{
		field: 'Status',
	},
	{
		field: '',
	},
];

const ArtisanTable = () => {
	const [popUp, setPopUp] = useState<any>(null);
	const [openSendNotificationModal, setOpenSendNotificationModal] =
		useState(false);
	const handleOpenNotificationModal = () => setOpenSendNotificationModal(true);
	const handleCloseNotificationModal = () =>
		setOpenSendNotificationModal(false);

	const [openSendMailModal, setOpenSendMailModal] = useState(false);
	const handleOpenMailModal = () => setOpenSendMailModal(true);
	const handleCloseMailModal = () => setOpenSendMailModal(false);
	let navigate = useNavigate();
	const { page, limit, Pagination } = usePagination({
		page: 1,
		limit: 4,
		total: ARTISANData.length,
	});

	const paginatedRows = ARTISANData.slice((page - 1) * limit, page * limit);
	return (
		<TableContainer>
			<SendMailModal
				open={openSendMailModal}
				handleClose={handleCloseMailModal}
			/>
			<SendNotificationModal
				open={openSendNotificationModal}
				handleClose={handleCloseNotificationModal}
			/>
			<table>
				<thead>
					<tr>
						{tableColumn.map((item, id) => (
							<th
								key={id}
								style={{ width: item.field === 'Admin' ? 350 : 'auto' }}
							>
								{item.field}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{paginatedRows.map((item, id) => (
						<tr key={id + 1}>
							<td>
								<div className='admin_profile'>
									<img src={item.img} alt='' width={40} />
									{item.name}
								</div>
							</td>
							<td>{item.email}</td>
							<td>{item.registrationDate}</td>
							<td>{item.lastLogin}</td>
							<td
								style={{
									color: item.status === 'Online' ? '#55C4F1' : '#FFAD4A',
								}}
							>
								{item.status}
							</td>
							<td>
								<div className='popup_root'>
									<button
										onClick={() => {
											popUp ? setPopUp(null) : setPopUp(id + 1);
										}}
									>
										<img src={navIcon} alt='' width={24} height='24px' />
									</button>
									{popUp === id + 1 ? (
										<div className='popup_wrapper'>
											<button
												onClick={() => navigate(`/artisans/${id + 1}`)}
												style={{ borderBottom: '1px solid #F2F4F7' }}
												className='popup_item'
											>
												View profile
											</button>
											<button
												onClick={handleOpenMailModal}
												style={{ borderBottom: '1px solid #F2F4F7' }}
												className='popup_item'
											>
												Send email
											</button>
											<button
												onClick={handleOpenNotificationModal}
												style={{ borderBottom: '1px solid #F2F4F7' }}
												className='popup_item'
											>
												Send notification
											</button>
										</div>
									) : null}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			x
			<Pagination />
		</TableContainer>
	);
};

export default ArtisanTable;
