import { CreateSmartContractRes, MintTokenRes } from './types';
import { BlockchainConfig } from '../config/blockchain.config';
export declare class Nfts {
    private jsonRpcProvider;
    private nftFactoryAddress;
    constructor(config: BlockchainConfig);
    createSmartContract(privateKey: string, name: string, symbol: string, waitReceipt?: boolean): Promise<CreateSmartContractRes | string>;
    mint(privateKey: string, contractAddress: string, tokenURI: string, waitReceipt?: boolean): Promise<MintTokenRes>;
    getTokenURI(contractAddress: string, tokenId: string): Promise<string>;
}
