export type Output = CoinOutput | ContractOutput | WithdrawalOutput | ChangeOutput | VariableOutput | ContractCreated
export type CoinOutput = {
	__typename: string
	to: string
	amount: number
	color: string
}
export type ContractOutput = {
	__typename: string
	inputIndex: number
	balanceRoot: string
	stateRoot: string
}
export type WithdrawalOutput = {
	__typename: string
	to: string
	amount: number
	color: string
}
export type ChangeOutput = {
	__typename: string
	to: string
	amount: number
	color: string
}
export type VariableOutput = {
	__typename: string
	to: string
	amount: number
	color: string
}
export type ContractCreated = {
	__typename: string
	contractId: string
}