import { BlockchainConfig } from './config/blockchain.config';
import { General } from './general';
import { Nfts } from './nfts';

export class SeaseedNFTSdk {
    nfts: Nfts;
    general: General;

    constructor(blockchainConfig: BlockchainConfig) {
        this.nfts = new Nfts(blockchainConfig);
        this.general = new General(blockchainConfig);
    }
}