import Web3 from "./web3.min.js";



export class RpcInfo {

    static web3: any;
    static isConnect: boolean = false

    /**
     * 新增 BNB Testnet & 獲得錢包地址 array
     * @param callBack Handle Account
     */
    static async RequestBNB_Testnet(callBack) {
        // BNB Testnet
        (window as any).ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: '0x61',
                chainName: 'BSC Testnet',
                nativeCurrency: {
                    name: 'BNB Coin',
                    symbol: 'BNB',
                    decimals: 18
                },
                rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
                blockExplorerUrls: ['https://testnet.bscscan.com'],

            }]
        }).then(async () => {
            // connect popup
            RpcInfo.web3 = new Web3((window as any).ethereum);
            let chainId = await RpcInfo.web3.eth.getChainId()
            if (chainId != 97) {
                console.log("Chain Error")
            } else {
                RpcInfo.RequestAccounts(callBack)
            }

        })
            .catch((error) => {
                console.log(error);
            });





        //console.log(accounts);
        //this.account = accounts[0];

    }

    static RequestAccounts(callBack) {
        (window as any).ethereum.request({
            method: 'eth_requestAccounts',
        })
            .then((accounts) => {

                callBack(accounts)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * 新增 BNB Mainnet & 獲得錢包地址 array
     * @param callBack Handle Account
     */
    static async RequestBNB_Mainnet(callBack) {
        // BNB
        (window as any).ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: '0x38',
                chainName: 'BSC',
                nativeCurrency: {
                    name: 'BNB Coin',
                    symbol: 'BNB',
                    decimals: 18
                },
                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                blockExplorerUrls: ['https://bscscan.com/'],

            }]
        }).then(async () => {
            // connect popup
            RpcInfo.web3 = new Web3((window as any).ethereum);
            let chainId = await RpcInfo.web3.eth.getChainId()
            if (chainId != 56) {
                console.log("Chain Error")
            } else {
                RpcInfo.RequestAccounts(callBack)
            }
        })

            .catch((error) => {
                console.log(error);
            });


    }

}