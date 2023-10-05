import { BlockchainConfig } from './config/blockchain.config';
import { General } from './general';
import { Nfts } from './nfts';
export declare class SeaseedNFTSdk {
    nfts: Nfts;
    general: General;
    constructor(blockchainConfig: BlockchainConfig);
}
