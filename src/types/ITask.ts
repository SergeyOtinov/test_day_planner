export interface ITask {
	readonly id?: number,
	user: string,
	date: string,
	text: string,
	done: boolean
}