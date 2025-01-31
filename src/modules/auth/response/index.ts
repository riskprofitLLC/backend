import { IsBoolean, IsObject, IsString } from 'class-validator'
import { PublicUserResponse } from '../../user/response'

export class RegisterUserResponse {
	@IsBoolean()
	result: boolean

	@IsString()
	message: string

	@IsObject()
	data?: PublicUserResponse
}

export class LoginUserResponse {
	@IsBoolean()
	result: boolean

	@IsString()
	message: string

	@IsObject()
	data?: LoginUserData
}

export class LoginUserData {
	@IsObject()
	user?: PublicUserResponse

	@IsString()
	token?: string
}
