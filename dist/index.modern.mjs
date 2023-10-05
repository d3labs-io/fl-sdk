import{ethers as t}from"ethers";class e{constructor(t){this.jsonRpcProvider=void 0,this.jsonRpcProvider=t.jsonRpcProvider}async createWallet(){const e=t.Wallet.createRandom();return{address:e.address,privateKey:e.privateKey}}async getTransaction(e){const n=new t.JsonRpcProvider(this.jsonRpcProvider);return await n.getTransaction(e)}async getTransactionReceipt(e){const n=new t.JsonRpcProvider(this.jsonRpcProvider);return await n.getTransactionReceipt(e)}}var n=[{anonymous:!1,inputs:[{indexed:!1,internalType:"address",name:"add",type:"address"},{indexed:!1,internalType:"string",name:"symbol",type:"string"}],name:"Created",type:"event"},{inputs:[{internalType:"string",name:"name_",type:"string"},{internalType:"string",name:"symbol_",type:"string"}],name:"create",outputs:[],stateMutability:"nonpayable",type:"function"}],s=[{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!0,internalType:"uint256",name:"tokenId",type:"uint256"}],name:"Transfer",type:"event"},{inputs:[{internalType:"address",name:"to",type:"address"},{internalType:"string",name:"uri",type:"string"}],name:"safeMint",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"tokenURI",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"}];class r{constructor(t){this.jsonRpcProvider=void 0,this.nftFactoryAddress=void 0,this.jsonRpcProvider=t.jsonRpcProvider,this.nftFactoryAddress=t.nftFactoryAddress}async createSmartContract(e,s,r,a){const i=new t.JsonRpcProvider(this.jsonRpcProvider),o=new t.Wallet(e,i),d=new t.Contract(this.nftFactoryAddress,n,o),c=await d.create(s,r);if(a)return{trxHash:c.hash};const p=await c.wait();return{address:p.logs.find(t=>"Created"===t.fragment.name).args[0],trxHash:p.hash}}async mint(e,n,r,a){const i=new t.JsonRpcProvider(this.jsonRpcProvider),o=new t.Wallet(e,i),d=new t.Contract(n,s,o),c=await d.safeMint(o.getAddress(),r);return a?{trxHash:c.hash}:{tokenId:(await c.wait()).logs[0].args[2].toString(),trxHash:c.hash}}async getTokenURI(e,n){const r=new t.JsonRpcProvider(this.jsonRpcProvider),a=new t.Contract(e,s,r);return await a.tokenURI(n)}}class a{constructor(t){this.nfts=void 0,this.general=void 0,this.nfts=new r(t),this.general=new e(t)}}export{a as SeaseedNFTSdk};
