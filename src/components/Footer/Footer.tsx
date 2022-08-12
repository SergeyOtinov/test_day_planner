import React from 'react';
import st from './Footer.module.scss';
import Weather from '../UI/Weather/Weather';

import user_icon from '../../assets/images/svg/user-icon.svg'
import { userSlice } from 'src/store/reducers/UserSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';

const Footer = () => {
	const { logout } = userSlice.actions;
	const { user } = useAppSelector(state => state.userReducer)
	const dispatch = useAppDispatch();

	return (
		<footer className={st.footer}>
			<div className={st.user_block}>
				<div style={{ backgroundImage: `url(${user_icon})` }} />
				<p>{user?.username || 'User'}</p>
				<button onClick={() => dispatch(logout())}>sign out</button>
			</div>
			<Weather />
		</footer>
	)
}

export default Footer;
