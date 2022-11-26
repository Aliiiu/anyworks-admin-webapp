const TOKEN_KEY = 'anyworkx_admin_token';

export const setAuthToken = (token: string) => {
	return localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};

export const resetAuthToken = () => setAuthToken('');

export const getAuthToken = () => {
	try {
		return localStorage[TOKEN_KEY] ? JSON.parse(localStorage[TOKEN_KEY]) : '';
	} catch (error) {
		void error;
		logout();
	}
	return '';
};

export const isLoggedIn = () => !!getAuthToken();

export const logout = (callback: Function = (): any => null) => {
	resetAuthToken();
	if (callback) callback();
};

export const AuthUtils = {
	getAuthToken,
	isLoggedIn,
	logout,
	resetAuthToken,
	setAuthToken,
};

export default AuthUtils;
