import React from 'react';
import CalendarSheet from '../UI/CalendarSheet/CalendarSheet';
import st from './Header.module.scss';

const Header = () => {
	return (
		<header className={st.header}>
			<h1>My tasks</h1>
			<CalendarSheet />
		</header>
	)
}

export default Header;
