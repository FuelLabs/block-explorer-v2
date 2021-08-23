export const Transactions: {
    hash: string,
    type: string,
    timestamp: string,
    subTransactions: {
        from: string,
        to?: string,
        value?: number,
        coin?: string,
        fee?: number,
    }[]
}[] = [
    {
        hash: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
        type: 'Script',
        timestamp: '30 sec ago',
        subTransactions: [{
            from: '0xc5d2460186f7233c927e7db2dcc703c0e500',
            to: '0xc5d2460186f7233c927e7db2dcc703c0e500',
            value: 300,
            coin: 'USDC',
            fee: 0.20,
        }, {
            from: '0xc5d2460186f7233c927e7db2dcc703c0e500',
            to: '0xc5d2460186f7233c927e7db2dcc703c0e500',
            value: 43,
            coin: 'DAI',
        }, {
            from: '0xc5d2460186f7233c927e7db2dcc703c0e500',
            to: '0xc5d2460186f7233c927e7db2dcc703c0e500',
            value: 0.00000123,
            coin: 'ETH',
        }, {
            from: '0xc5d2460186f7233c927e7db2dcc703c0e500',
            to: '0xc5d2460186f7233c927e7db2dcc703c0e500',
            value: 1246344,
            coin: 'ETH',
        }]
    }, {
        hash: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
        type: 'Script',
        timestamp: '2 days 3 hrs ago',
        subTransactions: [{
            from: '0xc5d2460186f7233c927e7db2dcc703c0e500',
            to: '0xc5d2460186f7233c927e7db2dcc703c0e500',
            value: 300,
            coin: 'USDC',
            fee: 1.44,
        }]
    }, {
        hash: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
        type: 'Create',
        timestamp: '1 year 45 days ago',
        subTransactions: [{
            from: '0xc5d2460186f7233c927e7db2dcc703c0e500',
            fee: 0.77,
        }]
    }
]
