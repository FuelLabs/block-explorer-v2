export const Transactions: {
  type: string;
  txHash: string;
  recipients: {
    from: string;
    to?: string;
  }[];
  timestamp: "34 secs ago";
}[] = [
  {
    type: "Script",
    txHash: "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
    recipients: [
      {
        from: "0xc5d2460186f7233c927e7db2dcc703c0e500",
        to: "0xc5d2460186f7233c927e7db2dcc703c0e500"
      },
      {
        from: "0xc5d2460186f7233c927e7db2dcc703c0e500",
        to: "0xc5d2460186f7233c927e7db2dcc703c0e500"
      },
      {
        from: "0xc5d2460186f7233c927e7db2dcc703c0e500",
        to: "0xc5d2460186f7233c927e7db2dcc703c0e500"
      },
      {
        from: "0xc5d2460186f7233c927e7db2dcc703c0e500",
        to: "0xc5d2460186f7233c927e7db2dcc703c0e500"
      }
    ],
    timestamp: "34 secs ago"
  },
  {
    type: "Create",
    txHash: "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
    recipients: [
      {
        from: "0xc5d2460186f7233c927e7db2dcc703c0e500"
      }
    ],
    timestamp: "34 secs ago"
  },
  {
    type: "Script",
    txHash: "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
    recipients: [
      {
        from: "0xc5d2460186f7233c927e7db2dcc703c0e500",
        to: "0xc5d2460186f7233c927e7db2dcc703c0e500"
      }
    ],
    timestamp: "34 secs ago"
  },
  {
    type: "Create",
    txHash: "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
    recipients: [
      {
        from: "0xc5d2460186f7233c927e7db2dcc703c0e500"
      }
    ],
    timestamp: "34 secs ago"
  }
];
