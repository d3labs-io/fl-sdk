import { BlockchainConfig } from "src/config/blockchain.config";
import axios, { AxiosInstance } from 'axios';
import { GetFileRes } from "./types";

export class Ipfs {
    private ipfsHttp: AxiosInstance;

    constructor(config: BlockchainConfig) {
        this.ipfsHttp = axios.create({
            baseURL: config.ipfsUrl,
            headers: {
                Authorization: `Bearer ${config.ipfsToken}`
            },
        })

    }

    async uploadFile(fileBuffer: Buffer): Promise<string> {
        const response = await this.ipfsHttp.postForm('/add', {
            file: fileBuffer
        });
        if (response.status >= 200 && response.status < 300 === false) {
            throw new Error(`failed, status code: ${response.status}, status text: ${response.statusText}`)
        }
        const data = response.data;
        return data.cid;
    }

    async getFile(cid: string): Promise<GetFileRes> {
        const response = await this.ipfsHttp.get(`/ipfs/${cid}`, {
            responseType: 'arraybuffer',
        })
        if (response.status >= 200 && response.status < 300 === false) {
            throw new Error(`failed to fetch, status code: ${response.status}, message: ${response.statusText}`);
        }
        return {
            fileBuffer: response.data,
            contentType: response.headers['content-type'],
        };
    }
}