import { IsString } from 'class-validator'

export class CreateUserListDTO {
	@IsString()
	name: string
}
