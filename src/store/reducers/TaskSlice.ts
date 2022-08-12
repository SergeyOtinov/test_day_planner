import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from 'src/types/ITask';

interface TaskState {
	tasks: ITask[],
	currentDate: Date,
	formatDate: string
}

const initialState: TaskState = {
	tasks: [],
	currentDate: new Date(),
	formatDate: format(new Date())
}

function format(date: Date) {
	return date.toLocaleDateString('en-GB', { day: "numeric", month: "numeric", year: "2-digit" }).split('/').join('.')
}

export const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		updateTasks(state, action: PayloadAction<ITask[]>) {
			state.tasks = action.payload
			state.tasks = state.tasks.filter((task: ITask) => { if (task.date === state.formatDate) return task })
		},
		nextDay(state) {
			state.currentDate.setDate(state.currentDate.getDate() + 1)
			state.formatDate = format(state.currentDate)
		},
		previousDay(state) {
			state.currentDate.setDate(state.currentDate.getDate() - 1)
			state.formatDate = format(state.currentDate)
		},
	}
})

export default taskSlice.reducer;