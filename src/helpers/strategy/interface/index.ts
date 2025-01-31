import { PublicUserResponse } from '../../../modules/user/response'

export interface JwtPayload {
	user: PublicUserResponse
	iat?: number
	exp?: number
	jti?: string
}
