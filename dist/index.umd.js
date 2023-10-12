!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("ethers"),require("axios")):"function"==typeof define&&define.amd?define(["exports","ethers","axios"],t):t((e||self).flSdk={},e.ethers,e.axios)}(this,function(e,t,r){var n=/*#__PURE__*/function(){function e(e){this.jsonRpcProvider=void 0,this.jsonRpcProvider=e.jsonRpcProvider}var r=e.prototype;return r.createWallet=function(){try{var e=t.ethers.Wallet.createRandom();return Promise.resolve({address:e.address,privateKey:e.privateKey})}catch(e){return Promise.reject(e)}},r.getTransaction=function(e){try{var r=new t.ethers.JsonRpcProvider(this.jsonRpcProvider);return Promise.resolve(r.getTransaction(e))}catch(e){return Promise.reject(e)}},r.getTransactionReceipt=function(e){try{var r=new t.ethers.JsonRpcProvider(this.jsonRpcProvider);return Promise.resolve(r.getTransactionReceipt(e))}catch(e){return Promise.reject(e)}},e}(),s=/*#__PURE__*/function(){function e(e){this.ipfsHttp=void 0,this.ipfsHttp=new r.Axios({baseURL:e.ipfsUrl,headers:{Authorization:"Bearer "+e.ipfsToken}})}var t=e.prototype;return t.uploadFile=function(e){try{var t=new FormData;return t.append("file",new Blob([e])),Promise.resolve(this.ipfsHttp.post("/add",t)).then(function(e){if(e.status>=200&&e.status<300==0)throw new Error("failed, status code: "+e.status+", status text: "+e.statusText);return JSON.parse(e.data).cid})}catch(e){return Promise.reject(e)}},t.getFile=function(e){try{return Promise.resolve(this.ipfsHttp.get("/ipfs/"+e,{responseType:"arraybuffer"})).then(function(e){if(e.status>=200&&e.status<300==0)throw new Error("failed to fetch, status code: "+e.status+", message: "+e.statusText);return{fileBuffer:e.data,contentType:e.headers["content-type"]}})}catch(e){return Promise.reject(e)}},e}(),i=[{anonymous:!1,inputs:[{indexed:!1,internalType:"address",name:"add",type:"address"},{indexed:!1,internalType:"string",name:"symbol",type:"string"}],name:"Created",type:"event"},{inputs:[{internalType:"string",name:"name_",type:"string"},{internalType:"string",name:"symbol_",type:"string"}],name:"create",outputs:[],stateMutability:"nonpayable",type:"function"}],o=[{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!0,internalType:"uint256",name:"tokenId",type:"uint256"}],name:"Transfer",type:"event"},{inputs:[{internalType:"address",name:"to",type:"address"},{internalType:"string",name:"uri",type:"string"}],name:"safeMint",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"tokenURI",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"}],a=/*#__PURE__*/function(){function e(e){this.jsonRpcProvider=void 0,this.nftFactoryAddress=void 0,this.jsonRpcProvider=e.jsonRpcProvider,this.nftFactoryAddress=e.nftFactoryAddress}var r=e.prototype;return r.createSmartContract=function(e,r,n,s){try{var o=new t.ethers.JsonRpcProvider(this.jsonRpcProvider),a=new t.ethers.Wallet(e,o),d=new t.ethers.Contract(this.nftFactoryAddress,i,a);return Promise.resolve(d.create(r,n)).then(function(e){return s?{trxHash:e.hash}:Promise.resolve(e.wait()).then(function(e){return{address:e.logs.find(function(e){return"Created"===e.fragment.name}).args[0],trxHash:e.hash}})})}catch(e){return Promise.reject(e)}},r.mint=function(e,r,n,s){try{var i=new t.ethers.JsonRpcProvider(this.jsonRpcProvider),a=new t.ethers.Wallet(e,i),d=new t.ethers.Contract(r,o,a);return Promise.resolve(d.safeMint(a.getAddress(),n)).then(function(e){return s?{trxHash:e.hash}:Promise.resolve(e.wait()).then(function(t){return{tokenId:t.logs[0].args[2].toString(),trxHash:e.hash}})})}catch(e){return Promise.reject(e)}},r.getTokenURI=function(e,r){try{var n=new t.ethers.JsonRpcProvider(this.jsonRpcProvider),s=new t.ethers.Contract(e,o,n);return Promise.resolve(s.tokenURI(r))}catch(e){return Promise.reject(e)}},e}();e.SeaseedNFTSdk=function(e){this.nfts=void 0,this.general=void 0,this.ipfs=void 0,this.nfts=new a(e),this.general=new n(e),this.ipfs=new s(e)}});
