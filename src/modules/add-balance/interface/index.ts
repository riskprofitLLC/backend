import * as mongoose from 'mongoose'

export interface IUserAddBalance {
	_id: mongoose.Types.ObjectId
	name: string
	balance: string
	date: Date
}
