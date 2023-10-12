# FL-SDK

## Features

### NFT Features
- **Feature 1**: Create Wallet.
- **Feature 2**: Create Smart Contract.
- **Feature 3**: Mint Token.
- **Feature 4**: Get TokenURI.

### General Features
- **Feature 1**: Get Transaction Data.
- **Feature 2**: Get Transaction Receipt Data.

### IPFS Features
- **Feature 1**: Upload File.
- **Feature 2**: Get File.

## Getting Started

Follow these steps to quickly get started with fl-sdk:

### Installation

```bash
npm install https://github.com/d3labs-io/fl-sdk
```

or

```bash
yarn add https://github.com/d3labs-io/fl-sdk
```

### Usage

```javascript
# Provide code snippets or examples on how to use your SDK
const flSdk = require('fl-sdk');

# Instantiate the SDK
const sdk = new sdk.SeaseedNFTSdk({
    jsonRpcProvider: env.JSON_RPC_PROVIDER,
    nftFactoryAddress: env.NFT_FACTORY_ADDRESS,
})

# Use the SDK to perform a task
const wallet = await sdk.general.createWallet();
```

### Examples

* Create Wallet
```javascript
const flSdk = require('fl-sdk');

const sdk = new sdk.SeaseedNFTSdk({
    jsonRpcProvider: env.JSON_RPC_PROVIDER,
    nftFactoryAddress: env.NFT_FACTORY_ADDRESS,
})

const wallet = await sdk.general.createWallet();

// output:
// {
//   address: '0x759dBe532109660bac1F29c662f6c65DB0603a36',
//   privateKey: '0x326b679f2c5d6a8a5aa85a900e5a88c5c29fca555cee0a2127f4eab8dba5f94c'
// }
```

* Create Smart Contract
```javascript
const flSdk = require('fl-sdk');

const sdk = new sdk.SeaseedNFTSdk({
    jsonRpcProvider: env.JSON_RPC_PROVIDER,
    nftFactoryAddress: env.NFT_FACTORY_ADDRESS,
})

const contract = await sdk.nfts.createSmartContract(privateKey, contractName, contractSymbol);

// output:
// {
//   address: '0x98C9DA77E3Bb684150Cd2aFEb73B4fbdF11A7B6d',
//   trxHash: '0xacb311a3b2603a8ea1baf05fc252eb125dd3efa778a9944b811474d66d167ea6'
// }
```

* Mint Token
```javascript
const flSdk = require('fl-sdk');

const sdk = new sdk.SeaseedNFTSdk({
    jsonRpcProvider: env.JSON_RPC_PROVIDER,
    nftFactoryAddress: env.NFT_FACTORY_ADDRESS,
})

const token = await nftSdk.nfts.mint(privateKey, contractAddress, tokenURI);

// output:
// {
//   tokenId: '0',
//   trxHash: '0xa246fee29e336600025e27656f62eba8a808860a27117fbd5cd11b04b8e23469'
// }
```

* Get TokenURI
```javascript
const flSdk = require('fl-sdk');

const sdk = new sdk.SeaseedNFTSdk({
    jsonRpcProvider: env.JSON_RPC_PROVIDER,
    nftFactoryAddress: env.NFT_FACTORY_ADDRESS,
})

const tokenURI = await nftSdk.nfts.getTokenURI(contractAddress, tokenId);

// output:
// ipfs://QmdzScmzzBw6g4K4c3gBGZs2kKA3chg8Q2U1UoY4Pxayja
```

* IPFS Upload File
```javascript
const flSdk = require('fl-sdk');

const sdk = new sdk.SeaseedNFTSdk({
    ipfsUrl: env.IPFS_URL,
    ipfsToken: env.IPFS_TOKEN,
})

const metadata = {
    title: eventId,
    type: "object",
    properties: {
        name: {
            type: "string",
            description: eventName,
        },
        description: {
            type: "string",
            description: eventDesc,
        },
    }
}

const cid = await nftSdk.ipfs.uploadFile(Buffer.from(JSON.stringify(metadata)));

// output:
// QmdzScmzzBw6g4K4c3gBGZs2kKA3chg8Q2U1UoY4Pxayja
```

* IPFS Get File
```javascript
const flSdk = require('fl-sdk');

const sdk = new sdk.SeaseedNFTSdk({
    ipfsUrl: env.IPFS_URL,
    ipfsToken: env.IPFS_TOKEN,
})

const cid = 'QmdzScmzzBw6g4K4c3gBGZs2kKA3chg8Q2U1UoY4Pxayja';
const fileData = await nftSdk.ipfs.getFile(cid);

// output:
// {
//   fileBuffer: <Buffer 74 68 69 73 20 69 73 20 66 69 6c 65 20 66 6f 72 20 74 65 73 74 69 6e 67>,
//   contentType: 'text/plain; charset=utf-8'
// }
```