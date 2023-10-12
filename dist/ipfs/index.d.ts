/// <reference types="node" />
import { BlockchainConfig } from "src/config/blockchain.config";
import { GetFileRes } from "./types";
export declare class Ipfs {
    private ipfsHttp;
    constructor(config: BlockchainConfig);
    uploadFile(fileBuffer: Buffer): Promise<string>;
    getFile(cid: string): Promise<GetFileRes>;
}
