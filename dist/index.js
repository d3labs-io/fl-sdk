var e=require("ethers"),t=require("axios"),r=/*#__PURE__*/function(){function t(e){this.jsonRpcProvider=void 0,this.jsonRpcProvider=e.jsonRpcProvider}var r=t.prototype;return r.createWallet=function(){try{var t=e.ethers.Wallet.createRandom();return Promise.resolve({address:t.address,privateKey:t.privateKey})}catch(e){return Promise.reject(e)}},r.getTransaction=function(t){try{var r=new e.ethers.JsonRpcProvider(this.jsonRpcProvider);return Promise.resolve(r.getTransaction(t))}catch(e){return Promise.reject(e)}},r.getTransactionReceipt=function(t){try{var r=new e.ethers.JsonRpcProvider(this.jsonRpcProvider);return Promise.resolve(r.getTransactionReceipt(t))}catch(e){return Promise.reject(e)}},t}(),n=/*#__PURE__*/function(){function e(e){this.ipfsHttp=void 0,this.ipfsHttp=new t.Axios({baseURL:e.ipfsUrl,headers:{Authorization:"Bearer "+e.ipfsToken}})}var r=e.prototype;return r.uploadFile=function(e){try{var t=new FormData;return t.append("file",new Blob([e])),Promise.resolve(this.ipfsHttp.post("/add",t)).then(function(e){if(e.status>=200&&e.status<300==0)throw new Error("failed, status code: "+e.status+", status text: "+e.statusText);return JSON.parse(e.data).cid})}catch(e){return Promise.reject(e)}},r.getFile=function(e){try{return Promise.resolve(this.ipfsHttp.get("/ipfs/"+e,{responseType:"arraybuffer"})).then(function(e){if(e.status>=200&&e.status<300==0)throw new Error("failed to fetch, status code: "+e.status+", message: "+e.statusText);return{fileBuffer:e.data,contentType:e.headers["content-type"]}})}catch(e){return Promise.reject(e)}},e}(),s=[{anonymous:!1,inputs:[{indexed:!1,internalType:"address",name:"add",type:"address"},{indexed:!1,internalType:"string",name:"symbol",type:"string"}],name:"Created",type:"event"},{inputs:[{internalType:"string",name:"name_",type:"string"},{internalType:"string",name:"symbol_",type:"string"}],name:"create",outputs:[],stateMutability:"nonpayable",type:"function"}],i=[{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!0,internalType:"uint256",name:"tokenId",type:"uint256"}],name:"Transfer",type:"event"},{inputs:[{internalType:"address",name:"to",type:"address"},{internalType:"string",name:"uri",type:"string"}],name:"safeMint",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"tokenURI",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"}],a=/*#__PURE__*/function(){function t(e){this.jsonRpcProvider=void 0,this.nftFactoryAddress=void 0,this.jsonRpcProvider=e.jsonRpcProvider,this.nftFactoryAddress=e.nftFactoryAddress}var r=t.prototype;return r.createSmartContract=function(t,r,n,i){try{var a=new e.ethers.JsonRpcProvider(this.jsonRpcProvider),o=new e.ethers.Wallet(t,a),c=new e.ethers.Contract(this.nftFactoryAddress,s,o);return Promise.resolve(c.create(r,n)).then(function(e){return i?{trxHash:e.hash}:Promise.resolve(e.wait()).then(function(e){return{address:e.logs.find(function(e){return"Created"===e.fragment.name}).args[0],trxHash:e.hash}})})}catch(e){return Promise.reject(e)}},r.mint=function(t,r,n,s){try{var a=new e.ethers.JsonRpcProvider(this.jsonRpcProvider),o=new e.ethers.Wallet(t,a),c=new e.ethers.Contract(r,i,o);return Promise.resolve(c.safeMint(o.getAddress(),n)).then(function(e){return s?{trxHash:e.hash}:Promise.resolve(e.wait()).then(function(t){return{tokenId:t.logs[0].args[2].toString(),trxHash:e.hash}})})}catch(e){return Promise.reject(e)}},r.getTokenURI=function(t,r){try{var n=new e.ethers.JsonRpcProvider(this.jsonRpcProvider),s=new e.ethers.Contract(t,i,n);return Promise.resolve(s.tokenURI(r))}catch(e){return Promise.reject(e)}},t}();exports.SeaseedNFTSdk=function(e){this.nfts=void 0,this.general=void 0,this.ipfs=void 0,this.nfts=new a(e),this.general=new r(e),this.ipfs=new n(e)};
