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

const pool = cardanocliJs.pool("BerryJs");

console.log("Generating new KES keys and Node Operational certificate");
cardanocliJs.nodeKeyGenKES(pool.name);
cardanocliJs.nodeIssueOpCert(pool.name);
