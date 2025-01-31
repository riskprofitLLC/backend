import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AddBalance } from './schemes/add-balance.schema'
import { IUserAddBalance } from './interface'
import { UserService } from '../user/user.service'
import { IUser } from '../auth/interface'

@Injectable()
export class AddBalanceService {
	constructor(
		@InjectModel(AddBalance.name) public addBalanceModel: Model<AddBalance>,
		private readonly userService: UserService
	) {}

	// update = this.updateAddBalance()

	async updateAddBalance(): Promise<IUserAddBalance[]> {
		const users: IUser[] = await this.userService.getUsers()
		let addBalance: IUserAddBalance[] = await this.getAddBalance()
		let _addBalance: IUserAddBalance[] = addBalance
		users.forEach(user => (_addBalance = _addBalance.filter(add => user.name != add.name)))
		if (!_addBalance && _addBalance.length == 0) return null
		for (const _add of _addBalance) {
			const { deletedCount } = await this.addBalanceModel.deleteOne({ name: _add.name })
			if (deletedCount != 0) addBalance = addBalance.filter(add => _add.name != add.name)
		}
		console.log(addBalance)
		return addBalance
	}

	async addAddBalance(): Promise<IUserAddBalance[]> {
		try {
			return (await this.addBalanceModel.find({}, { __v: false }).sort({ date: 1 })) as IUserAddBalance[]
		} catch (e: unknown) {
			throw new Error(e as string)
		}
	}

	async getAddBalance(): Promise<IUserAddBalance[]> {
		try {
			return (await this.addBalanceModel.find({}, { __v: false }).sort({ date: 1 })) as IUserAddBalance[]
		} catch (e: unknown) {
			throw new Error(e as string)
		}
	}
}
