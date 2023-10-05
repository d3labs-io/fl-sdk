import { CreateWalletRes } from './types';
import { TransactionResponse } from 'ethers';
import { BlockchainConfig } from '../config/blockchain.config';
export declare class General {
    private jsonRpcProvider;
    constructor(config: BlockchainConfig);
    createWallet(): Promise<CreateWalletRes>;
    getTransaction(trxHash: string): Promise<TransactionResponse>;
}
