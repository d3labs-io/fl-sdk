import { CreateSmartContractRes, GenerateMetadataReq, GetTokenFileRes, MintTokenRes } from './types';
import { BlockchainConfig } from '../config/blockchain.config';
export declare class Nfts {
    private jsonRpcProvider;
    private nftFactoryAddress;
    private ipfs;
    constructor(config: BlockchainConfig);
    createSmartContract(privateKey: string, name: string, symbol: string, trxHashOnly?: boolean): Promise<CreateSmartContractRes>;
    mint(privateKey: string, contractAddress: string, tokenURI: string, trxHashOnly?: boolean): Promise<MintTokenRes>;
    getTokenURI(contractAddress: string, tokenId: string): Promise<string>;
    generateMetadata(generateMetadataReq: GenerateMetadataReq): Promise<string>;
    getJSONMetadata(contractAddress: string, tokenId: string): Promise<string>;
    getTokenFile(contractAddress: string, tokenId: string): Promise<GetTokenFileRes>;
    checkMetadataSchema(jsonMetadata: string): Promise<boolean>;
}
