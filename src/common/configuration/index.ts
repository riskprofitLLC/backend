import * as process from 'node:process'

export default () => ({
	port: parseInt(process.env.PORT, 10) || 3000,
	mongo: {
		url: process.env.MONGO_URL,
		database: process.env.MONGO_DATABASE,
		jwt: { secret: process.env.SECRET_JWT, expire: process.env.EXPIRE_JWT }
	}
})
