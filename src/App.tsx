import React from 'react';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { useAppSelector } from './hooks/redux';
import { useMediaQuery } from 'react-responsive'
import './styles/main.scss';

const App = () => {
	const { isAuth } = useAppSelector(state => state.userReducer)
	const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 800px)' })

	if (!isAuth) {
		return (
			<Auth />
		)
	}
	return (
		<div className='wrapper'>
			{isDesktopOrLaptop && <div className='cap' />}
			<Header />
			<Dashboard />
			{isDesktopOrLaptop && <Footer />}
		</div>
	)
}



export default App;
