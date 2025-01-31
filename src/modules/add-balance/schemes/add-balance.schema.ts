import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type AddBalanceDocument = HydratedDocument<AddBalance>

@Schema()
export class AddBalance {
	@Prop({ type: String, required: true })
	name: string

	@Prop({ type: String, required: true })
	balance: string

	@Prop({ required: true, default: new Date() })
	date: Date
}

export const AddBalanceSchema = SchemaFactory.createForClass(AddBalance)
