import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true }) //
	const configService: ConfigService = app.get(ConfigService)
	await app.listen(configService.get<string>('port') ?? 3000)
	app.useGlobalPipes(new ValidationPipe())
	await app.init()
}
bootstrap()
