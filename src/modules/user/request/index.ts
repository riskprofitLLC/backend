import { IsEnum, IsString } from 'class-validator'
import { ERole } from '../../auth/interface'

export class UserRequest {
	@IsString()
	_id: string

	@IsString()
	name: string

	@IsEnum(ERole)
	role: ERole

	@IsString()
	balance: string

	@IsString()
	date: string
}
