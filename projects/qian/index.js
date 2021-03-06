// /*==================================================
//   Modules
// ==================================================*/

const abi = require("./abi");
const sdk = require("../../sdk");
const BigNumber = require("bignumber.js");

// /*==================================================
// Addresses
// ==================================================*/

const AssetAddress = "0x6a2469944d3F0AA54531DfA6dCB4350F4A150b67";
const ASSET_START = 11097351;
const EnvAddress = "0x3719C6ff935623A7B125952df5D849ef53B08cAc";
const BalanceAddress = "0x2336817CCC263B17725D7c15D687510D1d10a1b6";

// /*==================================================
//   Helpers
// ==================================================*/

async function _tokens(block) {
  return (
    await sdk.api.abi.call({
      target: EnvAddress,
      abi: abi.env.tokens,
      block
    })
  ).output;
}

// /*==================================================
// Main
// ==================================================*/

async function tvl(timestamp, block) {
  let balances = {
    "0x0000000000000000000000000000000000000000" : 0
  };
  if (block > ASSET_START) {
    let tokens = await _tokens(block);

    for (let i in tokens) {
      let token = tokens[i];
      let output = (
        await sdk.api.abi.call({
          block,
          target: AssetAddress,
          params: token,
          abi: abi.asset.balances,
        })
      ).output;
      balances[token] = balances[token]
        ? balances[token].plus(output)
        : new BigNumber(output);
    }
  }

  return balances;
}

module.exports = {
  name: "QIAN",
  token: "KUN",
  category: "Lending",
  start: 1603254836, // 2020/10/21 6:34:47 (+UTC)
  tvl,
};
