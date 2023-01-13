import React, { useState } from 'react';
import { usePagination } from 'src/hooks';
import miscService from 'src/service/miscServices';
import { AdminTableContainer } from '../admin/admin-style';
import { ActionMenu, Table } from '../ui';
import EditOccupationModal from './EditOccupation';
import { CiEdit } from 'react-icons/ci';
import { IoTrashBin } from 'react-icons/io5';
import { toast, ToastContainer } from 'react-toastify';
import { logout } from 'src/utils/AuthUtils';
import ModalContent from '../common/ModalContent';
import AppModal from '../ui/widget/Modal/Modal';
import { useNavigate } from 'react-router-dom';

type Props = { rows: any; fetchOccupation: Function };

const OccupationTable = ({ rows, fetchOccupation }: Props) => {
	// let navigate = useNavigate();
	const [rowId, setRowId] = useState('');
	const [showModal, setShowModal] = useState<boolean | null>(false);
	const [allowRowClick, setAllowRowClick] = useState(true);
	const [occupationID, setOccupationID] = useState('');
	const [occupationDetails, setOccupationDetails] = useState({});
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	// console.log(id);

	const handleClose = () => setOpen(false);

	const deleteOccupationHandler = (id: string) => {
		miscService
			.deleteOccupations(id)
			.then((res) => {
				console.log(res.data);
				// toast.success(res.data.message);
			})
			.catch((err) => {
				console.error(err.response);
				toast.error(err.response);
			})
			.finally(() => {
				fetchOccupation();
				// setShowModal(false);
			});
	};

	const TableHeaders = [
		{
			title: 'Icon',
			render: (row: any) => (
				<img
					style={{
						width: '40px',
						height: 40,
						borderRadius: '50%',
						objectFit: 'cover',
					}}
					src={row?.image || ''}
					alt=''
				/>
			),
		},
		{ title: 'Occupations', render: (row: any) => `${row?.name || ''}` },
		{
			title: 'Category',
			render: (row: any) => `${row?.category_slug || ''}`,
		},
		{
			title: '',
			render: (row: any) => (
				<ActionMenu
					setAllowRowClick={(bool: boolean) => {
						setAllowRowClick(bool);
					}}
					actions={[
						{
							title: (
								<div className='w-full flex cursor-pointer items-center gap-4'>
									<CiEdit size={15} />
									<span>Edit</span>
								</div>
							),
							onClick: () => {
								setOccupationDetails(row);
								// console.log(row?.name);
								handleOpen();
								setOccupationID(row._id);
							},
						},
						{
							title: (
								<div className='w-full flex cursor-pointer items-center gap-4'>
									<IoTrashBin size={15} className='text-red-500' />
									<span>Delete</span>
								</div>
							),
							onClick: () => {
								// deleteOccupationHandler(row._id);
								setRowId(row._id);
								setShowModal(true);
							},
						},
					]}
				/>
			),
		},
	];
	const { page, limit, Pagination } = usePagination({
		page: 1,
		limit: 10,
		total: rows.length,
	});
	const paginatedRows = rows.slice((page - 1) * limit, page * limit);

	return (
		<AdminTableContainer>
			<ToastContainer />
			<div className='heading'>
				<p className='count'>{rows.length} Occupations</p>
			</div>
			<EditOccupationModal
				id={occupationID}
				data={occupationDetails}
				open={open}
				fetchOccupation={fetchOccupation}
				handleClose={handleClose}
			/>
			{paginatedRows.length > 0 ? (
				<Table rows={paginatedRows} headers={TableHeaders} showHead={true} />
			) : (
				<div className='flex justify-center py-4'>
					{' '}
					No Available Occupation{' '}
				</div>
			)}

			<Pagination />
			<AppModal
				open={showModal}
				onClose={() => setShowModal(false)}
				content={
					<ModalContent
						// content1={rowId}
						content2='Are you sure you want to delete this occupation?'
						btnAction={() => {
							deleteOccupationHandler(rowId);
						}}
						linkContent='Delete'
						onClick={() => setShowModal(false)}
					/>
				}
			/>
		</AdminTableContainer>
	);
};
export default OccupationTable;
