export interface ICity {
	lon: number,
	lat: number
}

export interface IUser {
	username: string,
	password?: string,
	city: string,
	lon: number,
	lat: number
}