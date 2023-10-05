import { CreateSmartContractRes, MintTokenRes } from './types';
import { ethers } from 'ethers'
import { BlockchainConfig } from '../config/blockchain.config'
import * as JSON_SEASEEDNFTFACTORY from './assets/SeaseedNFTFactory.json';
import * as JSON_SEASEEDNFT from './assets/SeaseedNFT.json';

export class Nfts {
    private jsonRpcProvider: string;
    private nftFactoryAddress: string;

    constructor(config: BlockchainConfig) {
        this.jsonRpcProvider = config.jsonRpcProvider;
        this.nftFactoryAddress = config.nftFactoryAddress;
    }

    async createSmartContract(privateKey: string, name: string, symbol: string, waitReceipt = true): Promise<CreateSmartContractRes | string> {
        const provider = new ethers.JsonRpcProvider(
            this.jsonRpcProvider,
        );
        const signer = new ethers.Wallet(
            privateKey,
            provider,
        );
        const contract = new ethers.Contract(
            this.nftFactoryAddress,
            JSON_SEASEEDNFTFACTORY.abi,
            signer,
        );
        const trx = await contract.create(name, symbol);
        if (!waitReceipt) {
            return trx.hash;
        }

        const receipt = await trx.wait();
        const createdEventLog = receipt.logs.find(
            (log) => log.fragment.name === 'Created',
        );
        const seaseedNFTAddress = createdEventLog.args[0];
        return {
            address: seaseedNFTAddress,
            trxHash: receipt.hash,
        };
    }

    async mint(
        privateKey: string, contractAddress: string, tokenURI: string, waitReceipt = true
    ): Promise<MintTokenRes> {
        const provider = new ethers.JsonRpcProvider(
            this.jsonRpcProvider,
        );
        const signer = new ethers.Wallet(
            privateKey,
            provider,
        );
        const contract = new ethers.Contract(
            contractAddress,
            JSON_SEASEEDNFT.abi,
            signer,
        );
        const trx = await contract.safeMint(signer.getAddress(), tokenURI);
        if (!waitReceipt) {
            return trx.hash;
        }
        const receipt = await trx.wait();
        const tokenId = receipt.logs[0].args[2].toString();
        return {
            tokenId,
            trxHash: trx.hash,
        };
    }

    async getTokenURI(
        contractAddress: string,
        tokenId: string,
    ): Promise<string> {
        const provider = new ethers.JsonRpcProvider(
            this.jsonRpcProvider,
        );
        const contract = new ethers.Contract(
            contractAddress,
            JSON_SEASEEDNFT.abi,
            provider,
        );
        const tokenURI = await contract.tokenURI(tokenId);

        return tokenURI;
    }
}