import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { User } from '../../user/schemes/user.schema'
import * as mongoose from 'mongoose'
import { ERole } from '../../auth/interface'

export type WatchlistDocument = HydratedDocument<Watchlist>

@Schema()
export class Watchlist {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	userId: User | mongoose.Types.ObjectId

	@Prop({ required: true })
	name: string

	@Prop({ type: String, required: true, enum: Object.values(ERole), default: ERole.user })
	role: ERole

	@Prop({ type: Object, required: true })
	balance: { noIncome: string; withIncome: string }

	@Prop({ type: Object, required: true })
	profit: { balance: string; percent: number; yearPercent: number }

	@Prop({ type: Object, required: true })
	date: { now: Date; state: Date; start: Date }
}

export const WatchlistSchema = SchemaFactory.createForClass(Watchlist)
