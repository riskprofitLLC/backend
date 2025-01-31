import { Injectable } from '@nestjs/common'
import { User, UserDocument } from '../user/schemes/user.schema'
import { RegisterUserDTO, LoginUserDTO } from './dto'
import * as bcrypt from 'bcrypt'
import { PublicUserResponse } from '../user/response'
import { UserService } from '../user/user.service'
import { TokenService } from '../token/token.service'
import { LoginUserResponse, RegisterUserResponse } from './response'
import { AddBalanceService } from '../add-balance/add-balance.service'
import { AddBalanceDocument } from '../add-balance/schemes/add-balance.schema'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly tokenService: TokenService,
		private readonly addBalanceService: AddBalanceService
	) {}

	async hashPassword(password: string): Promise<string> {
		try {
			return bcrypt.hash(password, 10)
		} catch (e: unknown) {
			throw new Error(e as string)
		}
	}

	async registerUser(dto: RegisterUserDTO): Promise<LoginUserResponse> {
		try {
			dto.password = await this.hashPassword(dto.password)
			const existUser: User = await this.userService.getUserByName(dto.name)
			if (existUser) return { result: false, message: 'User already exist' }
			const createdUser: UserDocument = new this.userService.userModel({ ...dto, balance: dto.balance.toString() })
			const registeredUser: User = await createdUser.save()
			// console.log(registeredUser)
			if (registeredUser && registeredUser.name == dto.name) {
				const balance: AddBalanceDocument = new this.addBalanceService.addBalanceModel({
					name: dto.name,
					balance: dto.balance.toString().toString(),
					date: registeredUser.date
				})
				const addedBalance = await balance.save()
				if (!addedBalance && addedBalance.name == dto.name) return { result: false, message: 'Cannot add balance to Mongo' }
				const { password, __v, ..._registeredUser } = registeredUser['_doc'] as any
				const token: string = this.tokenService.generateJwtToken(_registeredUser)
				return { result: true, message: 'User registered', data: { user: _registeredUser as PublicUserResponse, token } }
			} else return { result: false, message: 'Cannot register user' }
		} catch (e: unknown) {
			throw new Error(e as string)
		}
	}

	async loginUser(dto: LoginUserDTO): Promise<LoginUserResponse> {
		try {
			const existUser: User = await this.userService.getUserByName(dto.name)
			if (!existUser) return { result: false, message: 'User not found' }
			const validatePassword: boolean = await bcrypt.compare(dto.password, existUser.password)
			if (!validatePassword) return { result: false, message: 'Incorrect password' }
			const user: PublicUserResponse = await this.userService.getPublicUser(dto.name)
			const token: string = this.tokenService.generateJwtToken(user)
			// console.log({ user, token })
			return { result: true, message: 'User found', data: { user, token } }
		} catch (e: unknown) {
			throw new Error(e as string)
		}
	}
}
