import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '../user/user.module'
import { JwtStrategy } from '../../helpers/strategy'
import { Module } from '@nestjs/common'
import { TokenModule } from '../token/token.module'
import { AddBalanceModule } from '../add-balance/add-balance.module'

@Module({
	imports: [UserModule, TokenModule, AddBalanceModule],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
	exports: [AuthService]
})
export class AuthModule {}
