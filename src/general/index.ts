import { CreateWalletRes } from './types';
import { TransactionResponse, ethers, TransactionReceipt } from 'ethers'
import { BlockchainConfig } from '../config/blockchain.config'

export class General {
    private jsonRpcProvider: string;

    constructor(config: BlockchainConfig) {
        this.jsonRpcProvider = config.jsonRpcProvider;
    }

    async createWallet(): Promise<CreateWalletRes> {
        const wallet = ethers.Wallet.createRandom()
        return {
            address: wallet.address,
            privateKey: wallet.privateKey,
        }
    }

    async getTransaction(trxHash: string): Promise<TransactionResponse> {
        const provider = new ethers.JsonRpcProvider(
            this.jsonRpcProvider,
        );
        const transaction = await provider.getTransaction(trxHash);
        return transaction;
    }

    async getTransactionReceipt(trxHash: string): Promise<TransactionReceipt> {
        const provider = new ethers.JsonRpcProvider(
            this.jsonRpcProvider,
        )
        const receipt = await provider.getTransactionReceipt(trxHash);
        return receipt
    }
}