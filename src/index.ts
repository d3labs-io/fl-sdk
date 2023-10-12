import { BlockchainConfig } from './config/blockchain.config';
import { General } from './general';
import { Ipfs } from './ipfs';
import { Nfts } from './nfts';

export class SeaseedNFTSdk {
    nfts: Nfts;
    general: General;
    ipfs: Ipfs;

    constructor(blockchainConfig: BlockchainConfig) {
        this.nfts = new Nfts(blockchainConfig);
        this.general = new General(blockchainConfig);
        this.ipfs = new Ipfs(blockchainConfig);
    }
}