import adminServiceApi from 'src/utils/AdminServiceApi';

const userServices = {
	getUsers: async () => {
		return adminServiceApi().get('user/v1/');
	},
	getUsersVerification: async () => {
		return adminServiceApi().get('user/v1/verification');
	},
	getUserVerification: async (user_id: string) => {
		return adminServiceApi().get(`user/v1/verification/${user_id}`);
	},
	getUser: async (user_id: string) => {
		return adminServiceApi().get(`user/v1/profile/${user_id}`);
	},
};

export default userServices;
