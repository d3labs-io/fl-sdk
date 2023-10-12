import { CreateSmartContractRes, GenerateMetadataReq, GetTokenFileRes, MintTokenRes } from './types';
import { ethers } from 'ethers'
import { BlockchainConfig } from '../config/blockchain.config'
import * as JSON_SEASEEDNFTFACTORY from './assets/SeaseedNFTFactory.json';
import * as JSON_SEASEEDNFT from './assets/SeaseedNFT.json';
import { Ipfs } from 'src/ipfs';
import { Validator } from 'jsonschema';

export class Nfts {
    private jsonRpcProvider: string;
    private nftFactoryAddress: string;
    private ipfs: Ipfs;

    constructor(config: BlockchainConfig) {
        this.jsonRpcProvider = config.jsonRpcProvider;
        this.nftFactoryAddress = config.nftFactoryAddress;
        this.ipfs = new Ipfs(config);
    }

    async createSmartContract(privateKey: string, name: string, symbol: string, trxHashOnly?: boolean): Promise<CreateSmartContractRes> {
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
        if (trxHashOnly) {
            return {
                trxHash: trx.hash
            };
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
        privateKey: string, contractAddress: string, tokenURI: string, trxHashOnly?: boolean
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
        if (trxHashOnly) {
            return {
                trxHash: trx.hash
            };
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

    async generateMetadata(generateMetadataReq: GenerateMetadataReq): Promise<string> {
        const metadata = {
            name: generateMetadataReq.name,
            description: generateMetadataReq.description,
            timestamp: generateMetadataReq.timestamp,
        }

        if (generateMetadataReq.file) {
            const cid = await this.ipfs.uploadFile(generateMetadataReq.file);
            metadata['file'] = `ipfs://${cid}`;
        }

        const metadataJson = Buffer.from(JSON.stringify(metadata));
        const metadataCid = await this.ipfs.uploadFile(metadataJson);
        return `ipfs://${metadataCid}`;
    }

    async getJSONMetadata(contractAddress: string, tokenId: string) {
        const tokenURI = await this.getTokenURI(contractAddress, tokenId);
        const { fileBuffer } = await this.ipfs.getFile(tokenURI.replace('ipfs://', ''));
        return fileBuffer.toString();
    }

    async getTokenFile(contractAddress: string, tokenId: string): Promise<GetTokenFileRes> {
        const jsonMetadata = await this.getJSONMetadata(contractAddress, tokenId);
        const metadata = JSON.parse(jsonMetadata);
        if (!metadata.file) {
            return null;
        }
        const fileData = await this.ipfs.getFile(metadata.file.replace('ipfs://', ''))
        return fileData;
    }

    async checkMetadataSchema(jsonMetadata: string): Promise<boolean> {
        const validator = new Validator();
        const metadata = JSON.parse(jsonMetadata);
        const metadataSchema = {
            "title": "Token Metadata",
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "timestamp": {
                    "type": "number"
                },
                "file": {
                    "type": "string",
                    "optional": true,
                },
            },
            "required": ["name", "description", "timestamp"],
            "additionalProperties": false,
        };
        return validator.validate(metadata, metadataSchema).valid;
    }
}