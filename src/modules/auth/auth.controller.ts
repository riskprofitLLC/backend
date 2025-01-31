import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterUserDTO, LoginUserDTO } from './dto'
import { JwtAuthGuard } from '../../helpers/strategy/guards/jwt-guard'
import { LoginUserResponse } from './response'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	register(@Body() dto: RegisterUserDTO): Promise<LoginUserResponse> {
		// console.log(dto)
		return this.authService.registerUser(dto)
	}

	@Post('login')
	login(@Body() dto: LoginUserDTO): Promise<LoginUserResponse> {
		return this.authService.loginUser(dto)
	}

	@UseGuards(JwtAuthGuard)
	@Post('test')
	test(): boolean {
		return true
	}
}
