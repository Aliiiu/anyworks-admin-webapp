import Dashboard from 'src/pages/dashboard/Dashboard';
import Kyc from 'src/pages/kyc/Kyc';
import { Routes, Route } from 'react-router-dom';
import ForgetPassword from 'src/pages/forgetPassword/ForgetPassword';
import GetCode from 'src/pages/forgetPassword/GetCode';
import NewPassword from 'src/pages/forgetPassword/NewPassword';
import Login from 'src/pages/auth/Login';
import ArtisanKyc from 'src/pages/kyc/ArtisanKyc';
import Settings from 'src/pages/settings/Settings';
import Admin from 'src/pages/admin/Admin';
import AdminProfile from 'src/pages/admin/AdminProfile';
import Users from 'src/pages/users/Users';
import Profile from 'src/pages/users/UserProfile';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Login />} />
			<Route path='forget-password' element={<ForgetPassword />} />
			<Route path='get-code' element={<GetCode />} />
			<Route path='new-password' element={<NewPassword />} />
			<Route path='/dashboard' element={<Dashboard />} />
			<Route path='/kyc' element={<Kyc />} />
			<Route path='/artisan-kyc' element={<ArtisanKyc />} />
			<Route path='/users' element={<Users />} />
			<Route path='/users/profile' element={<Profile />} />
			<Route path='/admin' element={<Admin />} />
			<Route path='/admin/:id' element={<AdminProfile />} />
			<Route path='/settings' element={<Settings />} />
		</Routes>
	);
};

export default Router;
