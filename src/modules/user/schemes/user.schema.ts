import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { ERole } from '../../auth/interface'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
	@Prop({ type: String, required: true })
	name: string

	@Prop({ type: String, required: true, enum: Object.values(ERole), default: ERole.user })
	role: ERole

	@Prop({ type: String, required: true })
	balance: string

	@Prop({ type: String, required: true }) // select: false
	password: string

	@Prop({ type: Date, required: true, default: new Date() })
	date: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
