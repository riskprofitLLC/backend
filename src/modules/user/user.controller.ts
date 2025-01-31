import { Body, Controller, Delete, Patch, Req, UseGuards } from '@nestjs/common'
import { UpdateUserDTO } from './dto'
import { UserService } from './user.service'
import { JwtAuthGuard } from '../../helpers/strategy/guards/jwt-guard'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(JwtAuthGuard)
	@Patch()
	updateUsers(@Body() updateDto: UpdateUserDTO, @Req() request): Promise<UpdateUserDTO | null> {
		const user = request.user
		console.log(user)
		return this.userService.updateUser(user.name, updateDto)
	}

	@UseGuards(JwtAuthGuard)
	@Delete()
	deleteUser(@Req() request): Promise<boolean> {
		const user = request.user
		return this.userService.deleteUser(user.name)
	}
}
