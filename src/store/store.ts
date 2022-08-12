import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/UserSlice'
import taskReducer from './reducers/TaskSlice'

const rootReducer = combineReducers({
	userReducer,
	taskReducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: []
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

