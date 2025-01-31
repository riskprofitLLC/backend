export interface IUserState {
	name: string
	balance: { noIncome: string; withIncome: string }
	profit: { balance: string; percent: number; yearPercent: number }
}
