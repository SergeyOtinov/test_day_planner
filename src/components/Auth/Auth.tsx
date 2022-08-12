import axios from 'axios';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import useInput from 'src/hooks/useInput';
import { userSlice } from 'src/store/reducers/UserSlice';
import { IUser } from 'src/types/IUser';
import st from './Auth.module.scss';

const Auth = () => {
	const { db, API_KEY } = useAppSelector(state => state.userReducer);
	const { login } = userSlice.actions;
	const dispatch = useAppDispatch();
	const username = useInput('')
	const password = useInput('')
	const city = useInput('Kyiv')

	const [isLoading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const getCoordinates = async (): Promise<any> => {
		try {
			const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city.value}&key=${API_KEY}`);
			if (data.status === 'ZERO_RESULTS') {
				return { message: 'We could not find such a city!' };
			}
			const { lat, lng } = data.results[0].geometry.location
			return { lat, lon: lng, currentCity: city.value }
		} catch (e) {
			console.log(e);
		}
	}

	const auth = async (): Promise<IUser | void> => {
		if (!username.value) {
			setError('The <Username> field cannot be empty')
			return
		}
		if (!password.value) {
			setError('The <Password> field cannot be empty')
			return
		}
		const city = await getCoordinates();
		if (city.message) {
			setError(city.message)
			return
		}
		const { lat, lon, currentCity } = city;
		const user = {
			username: username.value,
			password: password.value,
			city: currentCity || 'Kyiv',
			lon: lon,
			lat: lat
		}
		setLoading(true);
		db.connectDB();
		const result = await db.auth(user)
		switch (Object.keys(result)[0]) {
			case 'message':
				setLoading(false)
				setError(result.message)
				break
			case 'newUser':
				dispatch(login(result.newUser))
				break
			default:
				dispatch(login(result))
		}
	}

	return (
		<div className={st.wrapper}>
			<h2>Login or sign up</h2>
			<input {...username} type="text" placeholder='Login' />
			<input {...password} type="text" placeholder='Password' />
			<input {...city} type="text" placeholder='City' />
			<button disabled={isLoading} onClick={auth}>Login / Sign up</button>
			{error && <p>{error}</p>}

		</div>
	)
}

export default Auth;
