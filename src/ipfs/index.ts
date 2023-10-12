import { BlockchainConfig } from "src/config/blockchain.config";
import { Axios } from 'axios';
import { GetFileRes } from "./types";

export class Ipfs {
    private ipfsHttp: Axios;

    constructor(config: BlockchainConfig) {
        this.ipfsHttp = new Axios({
            baseURL: config.ipfsUrl,
            headers: {
                Authorization: `Bearer ${config.ipfsToken}`
            }
        })
    }

    async uploadFile(fileBuffer: Buffer): Promise<string> {
        const formData = new FormData;
        formData.append('file', new Blob([fileBuffer]));
        const response = await this.ipfsHttp.post('/add', formData);
        if (response.status >= 200 && response.status < 300 === false) {
            throw new Error(`failed, status code: ${response.status}, status text: ${response.statusText}`)
        }
        const data = JSON.parse(response.data);
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