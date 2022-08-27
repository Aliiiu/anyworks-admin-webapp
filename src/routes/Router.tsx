import Dashboard from 'src/pages/dashboard/Dashboard';
import Kyc from 'src/pages/kyc/Kyc';
import { Routes, Route } from 'react-router-dom';
import ForgetPassword from 'src/pages/forgetPassword/ForgetPassword';
import GetCode from 'src/pages/forgetPassword/GetCode';
import NewPassword from 'src/pages/forgetPassword/NewPassword';
import Login from 'src/pages/auth/Login';
import ArtisanKyc from 'src/pages/kyc/ArtisanKyc';
import Settings from 'src/pages/settings.tsx/Settings';

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
			<Route path='/setting' element={<Settings />} />
		</Routes>
	);
};

export default Router;
