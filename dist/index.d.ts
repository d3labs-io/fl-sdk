import { BlockchainConfig } from './config/blockchain.config';
import { General } from './general';
import { Ipfs } from './ipfs';
import { Nfts } from './nfts';
export declare class SeaseedNFTSdk {
    nfts: Nfts;
    general: General;
    ipfs: Ipfs;
    constructor(blockchainConfig: BlockchainConfig);
}
