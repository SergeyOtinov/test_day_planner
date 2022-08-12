import React, { useState } from 'react';
import st from './Weather.module.scss';
import { useEffect } from 'react';
import axios from 'axios';
import { useAppSelector } from 'src/hooks/redux';

const Weather = () => {
	useEffect(() => {
		getWeatherForecast()
	}, [])
	const { user } = useAppSelector(state => state.userReducer)
	const [weather, setWeather] = useState({
		forecast: `Great weather in Kyiv today`,
		temp: 20
	})

	const getWeatherForecast = async () => {
		const result = await axios.get(`http://www.7timer.info/bin/api.pl?lon=${user?.lon}&lat=${user?.lat}&product=astro&output=json`)
		if (result) {
			const { prec_type, temp2m } = result.data.dataseries[0];
			let now: string;
			switch (prec_type) {
				case 'snow': {
					now = `Today it is cloudy in ${user?.city}, snow is possible`;
					break
				}
				case 'rain': {
					now = `Today it is cloudy in ${user?.city}, rain is possible`;
					break
				}
				case 'frzr': {
					now = `Today it is cloudy in ${user?.city}, sleet is possible`;
					break
				}
				case 'icep': {
					now = `Today it is cloudy in ${user?.city}, hail is possible`;
					break
				}
				default: {
					now = `Great weather in ${user?.city} today`;
				}
			}
			setWeather({ forecast: now, temp: temp2m })
		}
	}

	return (
		<div className={st.wrapper}>
			<h2>{`${user?.city}, ${weather.temp}`}&#8451;</h2>
			<p>{`${weather.forecast}, ${user?.username}`}</p>
		</div>
	)
}

export default Weather;
