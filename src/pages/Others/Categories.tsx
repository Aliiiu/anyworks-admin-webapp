import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { DashboardLayout } from 'src/components/dashboard';
import { DashboardContainer } from '../dashboard/Dashboard';
import miscService from 'src/service/miscServices';
import { ScaleLoader } from 'react-spinners';
import { useLoading } from 'src/hooks';
import { RhsHeading } from '../admin/Admin';
import AddOccupationModal from 'src/components/Others/AddOccupationModal';
import CategoryTable from 'src/components/Others/CategoriesTable';
import AddCategoriesModal from 'src/components/Others/AddCategoriesModal';

type Props = {};

const Categories = (props: Props) => {
	const [categories, setCategories] = useState([]);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [searchField, setSearchField] = useState('');

	const { loading, startLoading, stopLoading } = useLoading();

	const fetchAllCategories = () => {
		startLoading();
		miscService
			.getCategories()
			.then((res) => {
				setCategories(res?.data?.payload.data);
			})
			.catch((err) => console.log(err.response))
			.finally(() => stopLoading());
	};

	useEffect(() => {
		fetchAllCategories();
	}, []);
	const handleChange = (e: any) => {
		setSearchField(e.target.value);
	};

	const filteredData = categories.filter((data: any) => {
		return data.name.toLowerCase().includes(searchField.toLowerCase());
	});

	return (
		<DashboardLayout
			pageTitle='Categories'
			rhsHeading={
				<RhsHeading
					handleChange={handleChange}
					handleOpen={handleOpen}
					action='Categories'
				/>
			}
		>
			<DashboardContainer>
				<ToastContainer />
				<AddCategoriesModal
					open={open}
					fetchCategories={fetchAllCategories}
					handleClose={handleClose}
				/>
				{loading ? (
					<div className='loader-container'>
						<ScaleLoader color='#7E00C4' height={50} width={8} />
					</div>
				) : (
					<CategoryTable rows={filteredData} />
				)}
			</DashboardContainer>
		</DashboardLayout>
	);
};

export default Categories;
