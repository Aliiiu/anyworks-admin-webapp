import { entity } from 'simpler-state';

interface IAuthUser {
	[x: string]: any;
}
const initialState = { authUser: {} as IAuthUser };

export const auth = entity(initialState);

export const setAuthUser = (payload = {}) =>
	auth.set((value) => ({ ...value, authUser: payload }));

export const resetAuthUser = () => setAuthUser();
