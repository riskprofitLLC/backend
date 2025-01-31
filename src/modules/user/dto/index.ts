import { IsDate, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class UpdateUserDTO {
	@IsString()
	name: string

	@IsDate()
	@Type(() => Date)
	date: Date
}

export class UpdatePasswordDTO {
	@IsString()
	oldPassword: string

	@IsString()
	newPassword: string
}
