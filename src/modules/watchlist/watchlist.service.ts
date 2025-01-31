import { Injectable } from '@nestjs/common'
import { Watchlist, WatchlistDocument } from './schemes/watchlist.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { InstantStateService } from '../instant-state/instant-state.service'
import { InstantState } from '../instant-state/schemes/instant-state.schema'
import { IUserState } from '../instant-state/interface'
import { CreateUserListDTO } from './dto'
import { UserService } from '../user/user.service'
import { PublicUserResponse } from '../user/response'
import { Cron, CronExpression } from '@nestjs/schedule'
import { WatchlistData, WatchlistResponse } from './response'
import { sleep } from '../../helpers/utils'
import { UserRequest } from '../user/request'

@Injectable()
export class WatchlistService {
	constructor(
		@InjectModel(Watchlist.name) public watchlistModel: Model<Watchlist>,
		private readonly userService: UserService,
		private readonly instantStatesService: InstantStateService
	) {
		this.updateWatchlist()
	}

	@Cron(CronExpression.EVERY_HOUR)
	async updateWatchlist(): Promise<boolean> {
		try {
			await sleep(10_000)
			const state: InstantState | null = await this.instantStatesService.getLastInstantState()
			if (!state) return false
			const watchlist: Watchlist[] = await this.getWatchlist()
			let checkAddOrUpdate = false
			for (const user of state.users) {
				const userList: Watchlist[] = watchlist.filter(wl => wl.name == user.name)
				if (userList.length != 1) {
					checkAddOrUpdate = !!(await this.addUserList(user.name))
					continue
				}
				if (userList[0].date.state.getTime() == state.date.getTime()) continue
				const { modifiedCount } = await this.watchlistModel.updateOne(
					{ name: user.name },
					{
						$set: {
							date: { now: new Date(), state: state.date, start: userList[0].date.start },
							balance: user.balance,
							profit: user.profit
						}
					}
				)
				checkAddOrUpdate = modifiedCount == 1
			}
			return checkAddOrUpdate
		} catch (e) {
			throw new Error(String(e))
		}
	}

	async getWatchlist(): Promise<Watchlist[]> {
		try {
			return await this.watchlistModel.find({}, { __v: false }).exec()
		} catch (e: unknown) {
			throw new Error(String(e))
		}
	}

	async getUserList(name: string): Promise<WatchlistResponse> {
		try {
			const data: WatchlistData = (await this.watchlistModel.findOne({ name }, { __v: false }).sort('-1').exec()) as WatchlistData
			// console.log('data==', data)
			return data ? { result: true, message: 'Watchlist Found', data } : { result: false, message: 'Watchlist Not Found' }
		} catch (e: unknown) {
			throw new Error(String(e))
		}
	}

	async createUserList(user: UserRequest, dto: CreateUserListDTO): Promise<WatchlistResponse> {
		try {
			if (user.name != dto.name) return { result: false, message: 'Incorrect name. Watchlist Not Created' }
			const createdWatchlist: WatchlistDocument = new this.watchlistModel({
				userId: user._id,
				name: dto.name,
				role: user.role,
				balance: { noIncome: user.balance, withIncome: user.balance },
				profit: { balance: '0', percent: 0, yearPercent: 0 },
				date: {
					now: new Date(),
					state: new Date(user.date),
					start: new Date(user.date)
				}
			})
			const data: WatchlistData = (await createdWatchlist.save()) as WatchlistData
			return data ? { result: true, message: 'Watchlist Created', data } : { result: false, message: 'Watchlist Not Created' }
		} catch (e) {
			throw new Error(String(e))
		}
	}

	async addUserList(name: string): Promise<Watchlist> {
		try {
			const state: InstantState = await this.instantStatesService.getLastInstantState()
			const userState: IUserState[] = state.users.filter(user => user.name == name)
			const user: PublicUserResponse = await this.userService.getPublicUser(name)
			const createdWatchlist: WatchlistDocument = new this.watchlistModel({
				userId: user._id,
				name: name,
				role: user.role,
				date: {
					now: new Date(),
					state: state.date,
					start: user.date
				},
				balance: userState[0].balance,
				profit: userState[0].profit
			})
			return createdWatchlist.save()
		} catch (e) {
			throw new Error(String(e))
		}
	}

	async deleteUserList(userId: string, assetId: string): Promise<boolean> {
		try {
			const { deletedCount } = await this.watchlistModel.deleteOne({ _id: assetId, userId })
			return deletedCount == 1
		} catch (e) {
			throw new Error(String(e))
		}
	}
}
