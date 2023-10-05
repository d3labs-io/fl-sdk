import{ethers as e}from"ethers";var t=/*#__PURE__*/function(){function t(e){this.jsonRpcProvider=void 0,this.jsonRpcProvider=e.jsonRpcProvider}var n=t.prototype;return n.createWallet=function(){try{var t=e.Wallet.createRandom();return Promise.resolve({address:t.address,privateKey:t.privateKey})}catch(e){return Promise.reject(e)}},n.getTransaction=function(t){try{var n=new e.JsonRpcProvider(this.jsonRpcProvider);return Promise.resolve(n.getTransaction(t))}catch(e){return Promise.reject(e)}},n.getTransactionReceipt=function(t){try{var n=new e.JsonRpcProvider(this.jsonRpcProvider);return Promise.resolve(n.getTransactionReceipt(t))}catch(e){return Promise.reject(e)}},t}(),n=[{anonymous:!1,inputs:[{indexed:!1,internalType:"address",name:"add",type:"address"},{indexed:!1,internalType:"string",name:"symbol",type:"string"}],name:"Created",type:"event"},{inputs:[{internalType:"string",name:"name_",type:"string"},{internalType:"string",name:"symbol_",type:"string"}],name:"create",outputs:[],stateMutability:"nonpayable",type:"function"}],r=[{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!0,internalType:"uint256",name:"tokenId",type:"uint256"}],name:"Transfer",type:"event"},{inputs:[{internalType:"address",name:"to",type:"address"},{internalType:"string",name:"uri",type:"string"}],name:"safeMint",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"tokenURI",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"}],s=/*#__PURE__*/function(){function t(e){this.jsonRpcProvider=void 0,this.nftFactoryAddress=void 0,this.jsonRpcProvider=e.jsonRpcProvider,this.nftFactoryAddress=e.nftFactoryAddress}var s=t.prototype;return s.createSmartContract=function(t,r,s,i){try{var o=new e.JsonRpcProvider(this.jsonRpcProvider),a=new e.Wallet(t,o),c=new e.Contract(this.nftFactoryAddress,n,a);return Promise.resolve(c.create(r,s)).then(function(e){return i?Promise.resolve(e.wait()).then(function(e){return{address:e.logs.find(function(e){return"Created"===e.fragment.name}).args[0],trxHash:e.hash}}):{trxHash:e.hash}})}catch(e){return Promise.reject(e)}},s.mint=function(t,n,s,i){try{var o=new e.JsonRpcProvider(this.jsonRpcProvider),a=new e.Wallet(t,o),c=new e.Contract(n,r,a);return Promise.resolve(c.safeMint(a.getAddress(),s)).then(function(e){return i?Promise.resolve(e.wait()).then(function(t){return{tokenId:t.logs[0].args[2].toString(),trxHash:e.hash}}):{trxHash:e.hash}})}catch(e){return Promise.reject(e)}},s.getTokenURI=function(t,n){try{var s=new e.JsonRpcProvider(this.jsonRpcProvider),i=new e.Contract(t,r,s);return Promise.resolve(i.tokenURI(n))}catch(e){return Promise.reject(e)}},t}(),i=function(e){this.nfts=void 0,this.general=void 0,this.nfts=new s(e),this.general=new t(e)};export{i as SeaseedNFTSdk};
