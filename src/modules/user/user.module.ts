import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schemes/user.schema'
import { UserController } from './user.controller'

@Module({
	imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
	providers: [UserService],
	controllers: [UserController],
	exports: [UserService]
})
export class UserModule {}
