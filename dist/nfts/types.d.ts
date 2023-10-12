/// <reference types="node" />
import { AxiosHeaderValue } from "axios";
export declare type CreateSmartContractRes = {
    trxHash: string;
    address?: string;
};
export declare type MintTokenRes = {
    trxHash: string;
    tokenId?: string;
};
export declare type GenerateMetadataReq = {
    name: string;
    description: string;
    timestamp: number;
    file?: Buffer;
};
export declare type GetTokenFileRes = {
    fileBuffer: Buffer;
    contentType: AxiosHeaderValue;
};
