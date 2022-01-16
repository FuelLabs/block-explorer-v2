import { Transaction } from "./model"

export type Block = {
	id: string
	height: number
	producer: string
	transactions?: Transaction[]
	time: string
}

export type Receipt = any

export type Status = {
	__typename: string
} & (SubmittedStatus | SuccessStatus | FailureStatus)

export type SubmittedStatus = {
	time: string
}

export type SuccessStatus = {
	blockId: string
	programState: string
	time: string
}

export type FailureStatus = {
	blockId: string
	reason: string
	time: string
}

export type Chain = {
	baseChainHeight: number,
	name: "Fuel.testnet",
	peerCount: number,
}
