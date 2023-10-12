import{ethers as e}from"ethers";import{Axios as t}from"axios";import{Validator as r}from"jsonschema";var n=/*#__PURE__*/function(){function t(e){this.jsonRpcProvider=void 0,this.jsonRpcProvider=e.jsonRpcProvider}var r=t.prototype;return r.createWallet=function(){try{var t=e.Wallet.createRandom();return Promise.resolve({address:t.address,privateKey:t.privateKey})}catch(e){return Promise.reject(e)}},r.getTransaction=function(t){try{var r=new e.JsonRpcProvider(this.jsonRpcProvider);return Promise.resolve(r.getTransaction(t))}catch(e){return Promise.reject(e)}},r.getTransactionReceipt=function(t){try{var r=new e.JsonRpcProvider(this.jsonRpcProvider);return Promise.resolve(r.getTransactionReceipt(t))}catch(e){return Promise.reject(e)}},t}(),i=/*#__PURE__*/function(){function e(e){this.ipfsHttp=void 0,this.ipfsHttp=new t({baseURL:e.ipfsUrl,headers:{Authorization:"Bearer "+e.ipfsToken}})}var r=e.prototype;return r.uploadFile=function(e){try{var t=new FormData;return t.append("file",new Blob([e])),Promise.resolve(this.ipfsHttp.post("/add",t)).then(function(e){if(e.status>=200&&e.status<300==0)throw new Error("failed, status code: "+e.status+", status text: "+e.statusText);return JSON.parse(e.data).cid})}catch(e){return Promise.reject(e)}},r.getFile=function(e){try{return Promise.resolve(this.ipfsHttp.get("/ipfs/"+e,{responseType:"arraybuffer"})).then(function(e){if(e.status>=200&&e.status<300==0)throw new Error("failed to fetch, status code: "+e.status+", message: "+e.statusText);return{fileBuffer:e.data,contentType:e.headers["content-type"]}})}catch(e){return Promise.reject(e)}},e}(),s=[{anonymous:!1,inputs:[{indexed:!1,internalType:"address",name:"add",type:"address"},{indexed:!1,internalType:"string",name:"symbol",type:"string"}],name:"Created",type:"event"},{inputs:[{internalType:"string",name:"name_",type:"string"},{internalType:"string",name:"symbol_",type:"string"}],name:"create",outputs:[],stateMutability:"nonpayable",type:"function"}],o=[{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!0,internalType:"uint256",name:"tokenId",type:"uint256"}],name:"Transfer",type:"event"},{inputs:[{internalType:"address",name:"to",type:"address"},{internalType:"string",name:"uri",type:"string"}],name:"safeMint",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"tokenURI",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"}],a=/*#__PURE__*/function(){function t(e){this.jsonRpcProvider=void 0,this.nftFactoryAddress=void 0,this.ipfs=void 0,this.jsonRpcProvider=e.jsonRpcProvider,this.nftFactoryAddress=e.nftFactoryAddress,this.ipfs=new i(e)}var n=t.prototype;return n.createSmartContract=function(t,r,n,i){try{var o=new e.JsonRpcProvider(this.jsonRpcProvider),a=new e.Wallet(t,o),c=new e.Contract(this.nftFactoryAddress,s,a);return Promise.resolve(c.create(r,n)).then(function(e){return i?{trxHash:e.hash}:Promise.resolve(e.wait()).then(function(e){return{address:e.logs.find(function(e){return"Created"===e.fragment.name}).args[0],trxHash:e.hash}})})}catch(e){return Promise.reject(e)}},n.mint=function(t,r,n,i){try{var s=new e.JsonRpcProvider(this.jsonRpcProvider),a=new e.Wallet(t,s),c=new e.Contract(r,o,a);return Promise.resolve(c.safeMint(a.getAddress(),n)).then(function(e){return i?{trxHash:e.hash}:Promise.resolve(e.wait()).then(function(t){return{tokenId:t.logs[0].args[2].toString(),trxHash:e.hash}})})}catch(e){return Promise.reject(e)}},n.getTokenURI=function(t,r){try{var n=new e.JsonRpcProvider(this.jsonRpcProvider),i=new e.Contract(t,o,n);return Promise.resolve(i.tokenURI(r))}catch(e){return Promise.reject(e)}},n.generateMetadata=function(e){try{var t=function(){var e=Buffer.from(JSON.stringify(n));return Promise.resolve(r.ipfs.uploadFile(e)).then(function(e){return"ipfs://"+e})},r=this,n={name:e.name,description:e.description,timestamp:e.timestamp},i=function(){if(e.file)return Promise.resolve(r.ipfs.uploadFile(e.file)).then(function(e){n.file="ipfs://"+e})}();return Promise.resolve(i&&i.then?i.then(t):t())}catch(e){return Promise.reject(e)}},n.getJSONMetadata=function(e,t){try{var r=this;return Promise.resolve(r.getTokenURI(e,t)).then(function(e){return Promise.resolve(r.ipfs.getFile(e.replace("ipfs://",""))).then(function(e){return e.fileBuffer.toString()})})}catch(e){return Promise.reject(e)}},n.getTokenFile=function(e,t){try{var r=this;return Promise.resolve(r.getJSONMetadata(e,t)).then(function(e){var t=JSON.parse(e);return t.file?Promise.resolve(r.ipfs.getFile(t.file.replace("ipfs://",""))):null})}catch(e){return Promise.reject(e)}},n.checkMetadataSchema=function(e){try{var t=new r,n=JSON.parse(e);return Promise.resolve(t.validate(n,{title:"Token Metadata",type:"object",properties:{name:{type:"string"},description:{type:"string"},timestamp:{type:"number"},file:{type:"string",optional:!0}},required:["name","description","timestamp"],additionalProperties:!1}).valid)}catch(e){return Promise.reject(e)}},t}(),c=function(e){this.nfts=void 0,this.general=void 0,this.ipfs=void 0,this.nfts=new a(e),this.general=new n(e),this.ipfs=new i(e)};export{c as SeaseedNFTSdk};
