import { Module } from '@nestjs/common'
import { AddBalanceService } from './add-balance.service'
import { MongooseModule } from '@nestjs/mongoose'
import { AddBalance, AddBalanceSchema } from './schemes/add-balance.schema'
import { UserModule } from '../user/user.module'

@Module({
	imports: [MongooseModule.forFeature([{ name: AddBalance.name, schema: AddBalanceSchema }]), UserModule],
	providers: [AddBalanceService],
	exports: [AddBalanceService]
})
export class AddBalanceModule {}
