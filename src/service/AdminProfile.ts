import {adminServiceApi} from 'src/utils/AdminServiceApi';

const AdminProfile = {
	getMe: async () => {
		return adminServiceApi().get('profile');
	},
};

export default AdminProfile;
