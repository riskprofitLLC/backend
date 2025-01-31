import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { PublicUserResponse } from '../../modules/user/response'
import { JwtPayload } from './interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('mongo.jwt.secret'),
			passReqToCallback: true
		})
	}

	async validate(request: Request, payload: JwtPayload): Promise<PublicUserResponse> {
		// console.log(payload)
		// console.log(request)
		return payload.user
	}
}
