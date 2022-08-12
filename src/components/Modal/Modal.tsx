import React, { Dispatch, SetStateAction, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { taskSlice } from 'src/store/reducers/TaskSlice';
import { ITask } from 'src/types/ITask';

import st from './Modal.module.scss';

const Modal = (prop: { setModalActive: Dispatch<SetStateAction<boolean>> }) => {
	const { db, user } = useAppSelector(state => state.userReducer);
	const [text, setText] = useState('New task');
	const { formatDate } = useAppSelector(state => state.taskReducer);
	const { updateTasks } = taskSlice.actions;
	const dispatch = useAppDispatch();
	const { setModalActive } = prop;

	const addTask = async () => {
		const newTask: ITask = {
			user: user?.username || '',
			date: formatDate,
			text: text,
			done: false
		}
		const result = await db.createTask(newTask);
		dispatch(updateTasks(await db.getTasks()));
		if (result) setModalActive(false)
	}

	return (
		<div className={st.wrapper}>
			<div className={st.modal}>
				<h2>Add new task</h2>
				<textarea value={text} onChange={e => setText(e.target.value)} />
				<button onClick={addTask}>Add</button>
				<span onClick={() => setModalActive(false)}>&#10006;</span>
			</div>
		</div>
	)
}

export default Modal;