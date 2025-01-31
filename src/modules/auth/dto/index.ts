import { IsEnum, IsNumber, IsString } from 'class-validator'
import { ERole } from '../interface'

export class RegisterUserDTO {
	@IsString()
	name: string

	@IsEnum(ERole)
	role: ERole

	@IsNumber()
	balance: number

	@IsString()
	password: string
}

export class LoginUserDTO {
	@IsString()
	name: string

	@IsString()
	password: string
}
