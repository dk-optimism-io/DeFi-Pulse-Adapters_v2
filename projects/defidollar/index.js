/*==================================================
  Modules
  ==================================================*/

const sdk = require("../../sdk");
const abi = require("./abi.json");
const IBBTC = "0xc4E15973E6fF2A35cC804c2CF9D2a1b817a8b40F";
const yCRV = "0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8";
const yCrvPeak = "0xA89BD606d5DadDa60242E8DEDeebC95c41aD8986";

/*==================================================
  TVL
  ==================================================*/

async function tvl(timestamp, block) {
  let balances = {};

  if (block > 10909861){
    const yCrvDistribution = await sdk.api.abi.call({
      block,
      target: yCrvPeak,
      abi: abi.yCrvDistribution,
    });
    balances[yCRV] = yCrvDistribution.output.total;
  }
  if (block > 12342123){
    const ibbtcSupply = await sdk.api.erc20.totalSupply({
      target: IBBTC,
      block,
    });
    balances[IBBTC] = ibbtcSupply.output;
  }

  if (block < 10909861) {
    balances = {
      [yCRV]: 0,
      [IBBTC]: 0,
    };
  }

  return balances;
}

/*==================================================
  Exports
  ==================================================*/

module.exports = {
  name: "DefiDollar",
  token: "DFD", // null, or token symbol if project has a custom token
  category: "Assets",
  start: 1600745136, // Aug-26-2020 04:12:19 AM +UTC
  tvl,
};
