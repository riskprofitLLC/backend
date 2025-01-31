import { IsDate, IsEnum, IsObject, IsString } from 'class-validator'
import { ERole } from '../../auth/interface'

export class PublicUserResponse {
	@IsObject()
	_id: object | string

	@IsString()
	name: string

	@IsEnum(ERole)
	role: ERole

	@IsString()
	balance: string

	@IsDate()
	date: Date
}
