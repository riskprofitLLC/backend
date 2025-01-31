import * as mongoose from 'mongoose'

export interface IUser {
	_id: mongoose.Types.ObjectId
	name: string
	role: ERole
	balance: string
	password: string
	date: Date
}

export enum ERole {
	admin = 'admin',
	user = 'user'
}
