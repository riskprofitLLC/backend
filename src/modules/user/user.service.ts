import { Injectable } from '@nestjs/common'
import { User } from './schemes/user.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { PublicUserResponse } from './response'
import { UpdateUserDTO } from './dto'
import { IUser } from '../auth/interface'

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) public userModel: Model<User>) {}

	async getUsers(): Promise<IUser[]> {
		try {
			return (await this.userModel.find({}, { __v: false }).exec()) as IUser[]
		} catch (e: unknown) {
			throw new Error(e as string)
		}
	}

	async getPublicUser(name: string): Promise<PublicUserResponse> {
		try {
			return (await this.userModel.findOne({ name }, { password: false, __v: false }).exec()) as PublicUserResponse
		} catch (e: unknown) {
			throw new Error(e as string)
		}
	}

	async getUserByName(name: string): Promise<User> {
		try {
			return await this.userModel.findOne({ name }, { _id: false, __v: false }).exec()
		} catch (e: unknown) {
			throw new Error(e as string)
		}
	}

	async updateUser(name: string, dto: UpdateUserDTO): Promise<UpdateUserDTO | null> {
		try {
			const { upsertedCount } = await this.userModel.updateOne({ name }, { $set: { date: dto.date } })
			return upsertedCount == 1 ? dto : null
		} catch (e: unknown) {
			throw new Error(e as string)
		}
	}

	async deleteUser(name: string): Promise<boolean> {
		try {
			const { deletedCount } = await this.userModel.deleteOne({ name })
			return deletedCount == 1
		} catch (e: unknown) {
			throw new Error(e as string)
		}
	}
}
