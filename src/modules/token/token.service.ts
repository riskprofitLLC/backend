import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

import { PublicUserResponse } from '../user/response'

@Injectable()
export class TokenService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	generateJwtToken(user: PublicUserResponse): string {
		return this.jwtService.sign(
			{ user },
			{
				secret: this.configService.get('mongo.jwt.secret'),
				expiresIn: this.configService.get('mongo.jwt.expire')
			}
		)
	}
}
