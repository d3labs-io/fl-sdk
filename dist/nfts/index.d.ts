import { CreateSmartContractRes, MintTokenRes } from './types';
import { BlockchainConfig } from '../config/blockchain.config';
export declare class Nfts {
    private jsonRpcProvider;
    private nftFactoryAddress;
    constructor(config: BlockchainConfig);
    createSmartContract(privateKey: string, name: string, symbol: string): Promise<CreateSmartContractRes>;
    mint(privateKey: string, contractAddress: string, tokenURI: string): Promise<MintTokenRes>;
    getTokenURI(contractAddress: string, tokenId: string): Promise<string>;
}
