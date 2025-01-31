import { Module } from '@nestjs/common'
import { InstantStateService } from './instant-state.service'
import { MongooseModule } from '@nestjs/mongoose'
import { InstantState, InstantStateSchema } from './schemes/instant-state.schema'

@Module({
	imports: [MongooseModule.forFeature([{ name: InstantState.name, schema: InstantStateSchema }])],
	providers: [InstantStateService],
	exports: [InstantStateService]
})
export class InstantStateModule {}
