# FL-SDK

## Features

### NFT Features
- **Feature 1**: Create Wallet.
- **Feature 2**: Create Smart Contract.
- **Feature 3**: Mint Token.
- **Feature 4**: Get TokenURI.
- **Feature 5**: Generate Metadata.
- **Feature 6**: Get JSON Metadata.
- **Feature 7**: Get Token File.
- **Feature 8**: Check Metadata Schema.

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
const sdk = new flSdk.SeaseedNFTSdk({
    jsonRpcProvider: env.JSON_RPC_PROVIDER,
    nftFactoryAddress: env.NFT_FACTORY_ADDRESS,
    ipfsUrl: env.IPFS_URL,
    ipfsToken: env.IPFS_TOKEN,
})

# Use the SDK to perform a task
const wallet = await sdk.general.createWallet();
```

### Examples

#### NFT Features

* Create Wallet
```javascript
const flSdk = require('fl-sdk');

const sdk = new flSdk.SeaseedNFTSdk({
    jsonRpcProvider: env.JSON_RPC_PROVIDER,
    nftFactoryAddress: env.NFT_FACTORY_ADDRESS,
    ipfsUrl: env.IPFS_URL,
    ipfsToken: env.IPFS_TOKEN,
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

const sdk = new flSdk.SeaseedNFTSdk({
    jsonRpcProvider: env.JSON_RPC_PROVIDER,
    nftFactoryAddress: env.NFT_FACTORY_ADDRESS,
    ipfsUrl: env.IPFS_URL,
    ipfsToken: env.IPFS_TOKEN,
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

const sdk = new flSdk.SeaseedNFTSdk({
    jsonRpcProvider: env.JSON_RPC_PROVIDER,
    nftFactoryAddress: env.NFT_FACTORY_ADDRESS,
    ipfsUrl: env.IPFS_URL,
    ipfsToken: env.IPFS_TOKEN,
})

const token = await sdk.nfts.mint(privateKey, contractAddress, tokenURI);

// output:
// {
//   tokenId: '0',
//   trxHash: '0xa246fee29e336600025e27656f62eba8a808860a27117fbd5cd11b04b8e23469'
// }
```

* Get TokenURI
```javascript
const flSdk = require('fl-sdk');

const sdk = new flSdk.SeaseedNFTSdk({
    jsonRpcProvider: env.JSON_RPC_PROVIDER,
    nftFactoryAddress: env.NFT_FACTORY_ADDRESS,
    ipfsUrl: env.IPFS_URL,
    ipfsToken: env.IPFS_TOKEN,
})

const tokenURI = await sdk.nfts.getTokenURI(contractAddress, tokenId);

// output:
// ipfs://QmdzScmzzBw6g4K4c3gBGZs2kKA3chg8Q2U1UoY4Pxayja
```

* Generate Metadata
```javascript
const flSdk = require('fl-sdk');

const sdk = new flSdk.SeaseedNFTSdk({
    jsonRpcProvider: env.JSON_RPC_PROVIDER,
    nftFactoryAddress: env.NFT_FACTORY_ADDRESS,
    ipfsUrl: env.IPFS_URL,
    ipfsToken: env.IPFS_TOKEN,
})

const fileBuffer = fs.readFileSync('test_file.txt');

const metadataURI = await sdk.nfts.generateMetadata({
    name: "string",
    description: "string",
    timestamp: Date.now(),
    fileBuffer,
});

// output:
// ipfs://QmdzScmzzBw6g4K4c3gBGZs2kKA3chg8Q2U1UoY4Pxayja
```

* Get JSON Metadata
```javascript
const flSdk = require('fl-sdk');

const sdk = new flSdk.SeaseedNFTSdk({
    jsonRpcProvider: env.JSON_RPC_PROVIDER,
    nftFactoryAddress: env.NFT_FACTORY_ADDRESS,
    ipfsUrl: env.IPFS_URL,
    ipfsToken: env.IPFS_TOKEN,
})

const jsonMetadata = await sdk.nfts.getJSONMetadata(contractAddress, tokenId);

// output:
// {"name":"EVENT-01-NAME","description":"testing event 1 description","timestamp":1697123523965,"file":"ipfs://QmYiPAWa7AGYwpFYYWLejP8uB8pgx3ovCMV88HDJgKJ65H"}
```

* Get Token File
```javascript
const flSdk = require('fl-sdk');

const sdk = new flSdk.SeaseedNFTSdk({
    jsonRpcProvider: env.JSON_RPC_PROVIDER,
    nftFactoryAddress: env.NFT_FACTORY_ADDRESS,
    ipfsUrl: env.IPFS_URL,
    ipfsToken: env.IPFS_TOKEN,
})

const fileData = await sdk.nfts.getTokenFile(contractAddress, tokenId);

// output:
// {
//   fileBuffer: <Buffer 74 68 69 73 20 69 73 20 66 69 6c 65 20 66 6f 72 20 74 65 73 74 69 6e 67>,
//   contentType: 'text/plain; charset=utf-8'
// }
```

* Check Metadata Schema
```javascript
const flSdk = require('fl-sdk');

const sdk = new flSdk.SeaseedNFTSdk({
    jsonRpcProvider: env.JSON_RPC_PROVIDER,
    nftFactoryAddress: env.NFT_FACTORY_ADDRESS,
    ipfsUrl: env.IPFS_URL,
    ipfsToken: env.IPFS_TOKEN,
})
const jsonMetadata = await sdk.nfts.getJSONMetadata(contractAddress, tokenId);
const isValid = await sdk.nfts.checkMetadataSchema(jsonMetadata);

// output:
// true
```


#### IPFS Features

* IPFS Upload File
```javascript
const flSdk = require('fl-sdk');

const sdk = new flSdk.SeaseedNFTSdk({
    jsonRpcProvider: env.JSON_RPC_PROVIDER,
    nftFactoryAddress: env.NFT_FACTORY_ADDRESS,
    ipfsUrl: env.IPFS_URL,
    ipfsToken: env.IPFS_TOKEN,
})

const metadata = {
    name: "test",
    description: "test",
    timestamp: Date.now(),
}

const cid = await sdk.ipfs.uploadFile(Buffer.from(JSON.stringify(metadata)));

// output:
// QmdzScmzzBw6g4K4c3gBGZs2kKA3chg8Q2U1UoY4Pxayja
```

* IPFS Get File
```javascript
const flSdk = require('fl-sdk');

const sdk = new flSdk.SeaseedNFTSdk({
    jsonRpcProvider: env.JSON_RPC_PROVIDER,
    nftFactoryAddress: env.NFT_FACTORY_ADDRESS,
    ipfsUrl: env.IPFS_URL,
    ipfsToken: env.IPFS_TOKEN,
})

const cid = 'QmdzScmzzBw6g4K4c3gBGZs2kKA3chg8Q2U1UoY4Pxayja';
const fileData = await sdk.ipfs.getFile(cid);

// output:
// {
//   fileBuffer: <Buffer 74 68 69 73 20 69 73 20 66 69 6c 65 20 66 6f 72 20 74 65 73 74 69 6e 67>,
//   contentType: 'text/plain; charset=utf-8'
// }
```