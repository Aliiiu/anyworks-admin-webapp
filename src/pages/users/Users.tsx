import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DashboardLayout } from 'src/components/dashboard';
import { UsersTable } from 'src/components/users';
import { Input } from 'src/components/inputs';
import searchIcon from 'src/assets/images/input/searchIcon.svg';
import userServices from 'src/service/userServices';
import { useLoading } from 'src/hooks';
import { Loader } from 'src/components/common';
import { toast, ToastContainer } from 'react-toastify';
const UsersContainer = styled.div``;

interface Props {
	handleChange: (e: any) => void;
}

export const RhsHeading: React.FC<Props> = ({ handleChange }) => (
	<Input
		icon={<img src={searchIcon} alt='searchIcon' />}
		type='search'
		placeholder='Search'
		handleChange={handleChange}
	/>
);

const usersInitialState: UsersListTypes = {
	display_picture: '',
	email: '',
	first_name: '',
	gender: '',
	last_name: '',
	_id: '',
};

const Users = () => {
	const [searchField, setSearchField] = useState('');
	const [usersList, setUsersList] = useState<UsersListTypes[]>([]);
	const {
		loading: fetchingUsers,
		startLoading: startFetchingUsers,
		stopLoading: stopFetchingUsers,
	} = useLoading(false);
	const fetchUsers = () => {
		startFetchingUsers();
		userServices
			.getUsers()
			.then((res) => {
				// console.log(res?.data?.payload?.data);
				setUsersList(res?.data?.payload?.data || usersInitialState);
			})
			.catch((err) => {
				console.log(err?.response?.data?.error?.message);
				toast.error(err?.response?.data?.error?.message);
			})
			.finally(() => stopFetchingUsers());
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const filteredData = usersList.filter((data) => {
		return (
			data?.first_name?.toLowerCase().includes(searchField.toLowerCase()) ||
			data?.last_name?.toLowerCase().includes(searchField.toLowerCase()) ||
			data?.email?.toLowerCase().includes(searchField.toLowerCase())
		);
	});

	const handleChange = (e: any) => {
		setSearchField(e.target.value);
	};

	useEffect(() => {
		document.title = "User's Page";
	}, []);

	return (
		<DashboardLayout
			pageTitle='Users'
			rhsHeading={<RhsHeading handleChange={handleChange} />}
		>
			<ToastContainer />
			<UsersContainer>
				{fetchingUsers ? (
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
					<UsersTable rows={filteredData} />
				) : (
					<p className='table-entry-status'>No User Found</p>
				)}
			</UsersContainer>
		</DashboardLayout>
	);
};

export default Users;
