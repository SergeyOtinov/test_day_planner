import React from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { taskSlice } from 'src/store/reducers/TaskSlice';
import st from './CalendarSheet.module.scss';

const CalendarSheet = () => {
	const { formatDate } = useAppSelector(state => state.taskReducer);
	const { nextDay, previousDay } = taskSlice.actions;
	const { updateTasks } = taskSlice.actions;
	const { db } = useAppSelector(state => state.userReducer);
	const dispatch = useAppDispatch();

	async function next() {
		dispatch(nextDay())
		dispatch(updateTasks(await db.getTasks()))
	}

	async function previous() {
		dispatch(previousDay());
		dispatch(updateTasks(await db.getTasks()))
	}

	return (
		<div className={st.wrapper}>
			<button onClick={previous} className={st.previous} title='Previous day'></button>
			<p>{formatDate}</p>
			<button onClick={next} className={st.next} title='Next day'></button>
		</div>
	)
}

export default CalendarSheet;
