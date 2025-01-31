import { Module } from '@nestjs/common'
import { WatchlistController } from './watchlist.controller'
import { WatchlistService } from './watchlist.service'
import { Watchlist, WatchlistSchema } from './schemes/watchlist.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { InstantStateModule } from '../instant-state/instant-state.module'
import { UserModule } from '../user/user.module'

@Module({
	imports: [MongooseModule.forFeature([{ name: Watchlist.name, schema: WatchlistSchema }]), UserModule, InstantStateModule],
	controllers: [WatchlistController],
	providers: [WatchlistService],
	exports: [WatchlistService]
})
export class WatchlistModule {}
