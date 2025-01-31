import { Module, ValidationPipe } from '@nestjs/common'
import { AppController } from './app.controller'
import { APP_PIPE } from '@nestjs/core'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from '../common/configuration'
import { AuthModule } from '../modules/auth/auth.module'
import { WatchlistModule } from '../modules/watchlist/watchlist.module'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
			cache: true,
			expandVariables: true
		}),
		// MongooseModule.forRoot('mongodb://localhost:27017/user'),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('mongo.url'),
				dbName: configService.get<string>('mongo.database')
			}),
			inject: [ConfigService]
		}),
		ScheduleModule.forRoot(),
		AuthModule,
		WatchlistModule
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_PIPE,
			useClass: ValidationPipe
		}
	]
})
export class AppModule {}
