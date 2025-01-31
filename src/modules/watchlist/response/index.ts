import { IsBoolean, IsEnum, IsNumber, IsObject, IsString } from 'class-validator'
import * as mongoose from 'mongoose'
import { ERole } from '../../auth/interface'

export class WatchlistResponse {
	@IsBoolean()
	result: boolean

	@IsString()
	message: string

	@IsObject()
	data?: WatchlistData
}

export class WatchlistData {
	@IsObject()
	_id: mongoose.Types.ObjectId

	@IsObject()
	userId: mongoose.Types.ObjectId

	@IsString()
	name: string

	@IsEnum(ERole)
	role: ERole

	@IsObject()
	balance: { noIncome: string; withIncome: string }

	@IsObject()
	profit: { balance: string; percent: number; yearPercent: number }

	@IsObject()
	date: { now: Date; state: Date; start: Date }

	@IsNumber()
	__v?: number
}
