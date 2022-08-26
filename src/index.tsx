import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgetPassword from './pages/forgetPassword/ForgetPassword';
import GetCode from './pages/forgetPassword/GetCode';
import NewPassword from './pages/forgetPassword/NewPassword';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<BrowserRouter>
		<React.StrictMode>
			<Routes>
				<Route path='/' element={<App />} />
				<Route path='forget-password' element={<ForgetPassword />} />
				<Route path='get-code' element={<GetCode />} />
				<Route path='new-password' element={<NewPassword />} />
			</Routes>
		</React.StrictMode>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
