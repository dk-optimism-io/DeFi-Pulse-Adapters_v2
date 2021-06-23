module.exports = {
  /* Project Metadata */
  name: 'O3 Swap Token', // project name
  token: 'O3', // null, or token symbol if project has a custom token
  category: 'Assets', // allowed values as shown on DefiPulse: 'Derivatives', 'DEXes', 'Lending', 'Payments', 'Assets'
  start: 1614589793,
  /* required for fetching token balances */
  tokenHolderMap: [{
    tokens: [
      '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
    ],
    holders: [
      '0x250e76987d838a75310c34bf422ea9f1AC4Cc906', // Treasury 1
    ],
  }],
};
