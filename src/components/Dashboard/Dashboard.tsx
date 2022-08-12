import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { taskSlice } from 'src/store/reducers/TaskSlice';
import { ITask } from 'src/types/ITask';
import Modal from '../Modal/Modal';
import st from './Dashboard.module.scss';

const Dashboard = () => {
	useEffect(() => {
		updateDashboard()
	}, [])
	const { db } = useAppSelector(state => state.userReducer);
	const { tasks } = useAppSelector(state => state.taskReducer);
	const [isModalActive, setModalActive] = useState(false);
	const { updateTasks } = taskSlice.actions;
	const dispatch = useAppDispatch();

	const updateDashboard = async (): Promise<void> => {
		dispatch(updateTasks(await db.getTasks()))
	}

	const deleteTask = async (id?: number): Promise<void> => {
		if (confirm('Do you really want to delete the task?')) {
			await db.removeTask(id);
			updateDashboard();
		}
	}

	const completeTask = async (task: ITask): Promise<void> => {
		await db.updateTask(task);
		updateDashboard();
	}

	return (
		<div className={st.wrapper}>
			<div className={st.dashboard}>
				{tasks.map(task => {
					const { id, text, done } = task
					return (
						<div key={id} className={st.task}>
							<div className={done ? st.done : ''}>
								<span onClick={() => completeTask(task)} title='Mark a task as completed' />
								<p>{text}</p>
							</div>
							<button onClick={() => deleteTask(id)} title='Delete task' />
						</div>
					)
				})}
				<button onClick={() => setModalActive(true)} className={st.add_task} title='Add new task'>Add new task</button>
				{isModalActive && <Modal setModalActive={setModalActive} />}
			</div>
		</div>
	)
}

export default Dashboard;

