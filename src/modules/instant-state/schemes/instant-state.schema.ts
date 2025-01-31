import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { IUserState } from '../interface'

export type InstantStateDocument = HydratedDocument<InstantState>

@Schema()
export class InstantState {
	@Prop({ type: Object, required: true })
	balance: { noIncome: string; withIncome: string }

	@Prop({ type: Object, required: true })
	profit: { balance: string; percent: number; yearPercent: number }

	@Prop({ required: true })
	users: IUserState[]

	@Prop({ required: true })
	date: Date
}

export const InstantStateSchema = SchemaFactory.createForClass(InstantState)
