import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { InstantState } from './schemes/instant-state.schema'

@Injectable()
export class InstantStateService {
	constructor(@InjectModel(InstantState.name) private instantStatesModel: Model<InstantState>) {}

	async getLastInstantState(): Promise<InstantState | null> {
		try {
			return await this.instantStatesModel.findOne({}, { _id: false, __v: false }).sort({ date: -1 }).exec()
		} catch (e: unknown) {
			throw new Error(e as string)
		}
	}
}
