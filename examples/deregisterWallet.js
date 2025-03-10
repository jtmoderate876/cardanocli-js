const CardanocliJs = require("../index.js");
const os = require("os");
const path = require("path");

const dir = path.join(os.homedir(), "testnet");
const shelleyPath = path.join(
  os.homedir(),
  "testnet",
  "testnet-shelley-genesis.json"
);

const cardanocliJs = new CardanocliJs({
  era: "allegra",
  network: "testnet-magic 1097911063",
  dir: dir,
  shelleyGenesisPath: shelleyPath,
});

const deregisterWallet = (wallet) => {
  let account = wallet.name;
  let keyDeposit = cardanocliJs.queryProtcolParameters().keyDeposit;
  let stakeCert = cardanocliJs.stakeAddressDeregistrationCertificate(account);
  let paymentAddress = cardanocliJs.wallet(account).paymentAddr;
  let balance = cardanocliJs.wallet(account).balance;
  let tx = {
    txIn: cardanocliJs.queryUtxo(paymentAddress),
    txOut: [{ address: paymentAddress, amount: balance + keyDeposit }],
    certs: [stakeCert],
    witnessCount: 2,
  };
  let txBodyRaw = cardanocliJs.transactionBuildRaw(tx);
  let fee = cardanocliJs.transactionCalculateMinFee({
    ...tx,
    txBody: txBodyRaw,
  });
  tx.txOut[0].amount -= fee;
  let txBody = cardanocliJs.transactionBuildRaw({ ...tx, fee });
  let txSigned = cardanocliJs.transactionSign({
    txBody,
    signingKeys: [
      cardanocliJs.wallet(account).file("payment.skey"),
      cardanocliJs.wallet(account).file("stake.skey"),
    ],
  });

  return txSigned;
};

let wallet = cardanocliJs.wallet("Test");

console.log(wallet);

let tx = deregisterWallet(wallet);

let txHash = cardanocliJs.transactionSubmit(tx);

console.log("TxHash: " + txHash);
