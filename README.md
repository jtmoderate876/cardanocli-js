# cardanocli-js

## Overview

This is a library, which wraps the cardano-cli with JavaScript and makes it possible to interact with the cli-commands much faster and more efficient.

###### This library is brought to you by <b><a href="http://pipool.online/">Berry Pool</a></b>. You can support our work by delegating to our pool.

## Prerequisites

- `cardano-node 1.24.2`
- `node.js >= 12.19.0`

## Install

#### NPM

```bash
npm install cardanocli-js
```

#### From source

```bash
git clone https://github.com/Berry-Pool/cardanocli-js.git
cd cardanocli-js
npm install
```

## Getting started

```javascript
const CardanocliJs = require("cardanocli-js");
const shelleyGenesisPath = "/home/ada/mainnet-shelley-genesis.json";

const cardanocliJs = new CardanocliJs({ era: "allegra", shelleyGenesisPath });

const createWallet = (accout) => {
  cardanocliJs.addressKeyGen(accout);
  cardanocliJs.stakeAddressKeyGen(accout);
  cardanocliJs.stakeAddressBuild(accout);
  cardanocliJs.addressBuild(accout);
  return cardanocliJs.wallet(accout);
};

const createPool = (name) => {
  cardanocliJs.nodeKeyGenKES(name);
  cardanocliJs.nodeKeyGen(name);
  cardanocliJs.nodeIssueOpCert(name);
  cardanocliJs.nodeKeyGenVRF(name);
  return cardanocliJs.pool(name);
};

const wallet = createWallet("Ada");
const pool = createPool("Berry");

console.log(wallet.paymentAddr);
console.log(pool.file("vrf.vkey"));
```

Check /examples for more use cases.

## API

- <a href="./API.md">API Documentation</a>

## Structure

All files will be stored and used in the directory you choose when instantiating CardanocliJs (<code>dir</code>).
The directory is split in two subfolders <code>tmp</code> and <code>priv</code>.
In the <code>tmp</code> folder are stored protocol paramters, raw transactions, signed transactions and witnesses with unique identifiers.
The <code>priv</code> folder is again divided into two subolders holding on one site the pools <code>pool</code> and on the other side the wallets <code>wallet</code> (like <a href="https://cardano-community.github.io/guild-operators/#/">CNTools</a> structure).

Example structure:

```
dir
    tmp
        <tx_1.raw>
        ...
    priv
        pool
            Berry
                <Berry.node.vkey>
                <Berry.node.skey>
                <Berry.vrf.vkey>
                ...
        wallet
            Lovelace
                <Lovelace.payment.vkey>
                <Lovelace.stake.skey>
                ...
```
