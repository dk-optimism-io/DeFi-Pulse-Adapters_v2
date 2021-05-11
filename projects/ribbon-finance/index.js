/*==================================================
  Modules
  ==================================================*/

const sdk = require("../../sdk");
const abi = require("./abi");

const ethCallVault = "0x0fabaf48bbf864a3947bdd0ba9d764791a60467a";
const wbtcCallVault = "0x8b5876f5B0Bf64056A89Aa7e97511644758c3E8c";
const ethPutVault = "0x16772a7f4a3ca291C21B8AcE76F9332dDFfbb5Ef";

const weth = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const wbtc = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
const usdc = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

const zero = "0";

/*==================================================
  TVL
  ==================================================*/

async function tvl(timestamp, block) {
  let ethCallVaultBalance = 0;
  let wbtcCallVaultBalance = 0;
  let ethPutVaultBalance = 0;

  try {
    ethCallVaultBalance = (
      await sdk.api.abi.call({
        target: ethCallVault,
        block,
        abi: abi.totalBalance,
      })
    ).output;
  } catch (err) {}

  try {
    wbtcCallVaultBalance = (
      await sdk.api.abi.call({
        target: wbtcCallVault,
        block,
        abi: abi.totalBalance,
      })
    ).output;
  } catch (err) {}

  try {
    ethPutVaultBalance = (
      await sdk.api.abi.call({
        target: ethPutVault,
        block,
        abi: abi.totalBalance,
      })
    ).output;
  } catch (err) {}

  let balances = {
    [weth]: ethCallVaultBalance,
    [wbtc]: wbtcCallVaultBalance,
    [usdc]: ethPutVaultBalance,
  };

  return balances;
}

/*==================================================
  Exports
  ==================================================*/

module.exports = {
  name: "Ribbon Finance",
  token: null,
  category: "derivatives",
  start: 1618185600,
  tvl,
};
