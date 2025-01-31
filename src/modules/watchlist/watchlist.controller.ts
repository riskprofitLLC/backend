import { Body, Controller, Delete, Get, Post, Query, Req, UseGuards } from '@nestjs/common'
import { WatchlistService } from './watchlist.service'
import { CreateUserListDTO } from './dto'
import { JwtAuthGuard } from '../../helpers/strategy/guards/jwt-guard'
import { UserRequest } from '../user/request'
import { WatchlistResponse } from './response'

@Controller('watchlist')
export class WatchlistController {
	constructor(private readonly watchListService: WatchlistService) {}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	createUserList(@Body() dto: CreateUserListDTO, @Req() request): Promise<WatchlistResponse> {
		const user: UserRequest = request.user
		// console.log('user=======', user)
		return this.watchListService.createUserList(user, dto)
	}

	@UseGuards(JwtAuthGuard)
	@Delete()
	deleteUserList(@Query('_id') assetId: string, @Req() request): Promise<boolean> {
		const { _id } = request.user
		return this.watchListService.deleteUserList(_id, assetId)
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	getUserList(@Query('name') _name: string, @Req() request): Promise<WatchlistResponse | null> {
		const { name } = request.user
		// console.log(name)
		return name == _name ? this.watchListService.getUserList(name) : null
	}
}
