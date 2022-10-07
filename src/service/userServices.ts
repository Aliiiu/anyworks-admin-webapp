import userServiceApi from 'src/utils/userServiceApi';

const userServices = {
	getUsers: async () => {
		return userServiceApi().get('');
	},
	getUser: async (user_id: string) => {
		return userServiceApi().get(`profile/${user_id}`);
	},
};

export default userServices;
