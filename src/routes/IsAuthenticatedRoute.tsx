import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/AuthUtils';

interface Props {
	children: any;
}

const IsAuthenticatedRoute: React.FC<Props> = ({ children }) => {
	if (isLoggedIn()) {
		return <Navigate to='/dashboard' replace />;
	}

	return children || null;
};

export default IsAuthenticatedRoute;
