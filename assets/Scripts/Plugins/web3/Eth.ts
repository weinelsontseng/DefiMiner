import * as cc from 'cc';
import { MaticSlimeContract } from './MaticSlimeContract';
import { RpcInfo } from './RpcInfo';



export class Eth {

    static account = ""

    /**
     * 連接錢包
     */
    static async ConnetWallet(callback) {
        // metamsk
        if ((window as any).ethereum) {

            RpcInfo.RequestBNB_Testnet(callback);

        } else {
            console.log("No Provider")
        }

        (window as any).ethereum.on('connect', function (_info) {
            console.log(_info);
        });

        (window as any).ethereum.on("accountsChanged", function () {
            location.reload();
        });
        (window as any).ethereum.on('chainChanged', function (_chainId) {
            location.reload();
            console.log(_chainId);
        });
    }
    /**
     * 連接錢包的Callback
     * @param accounts 
     */
    static AccountHandler(accounts) {
        console.log(accounts)
        Eth.account = accounts[0]
        localStorage.setItem("account", accounts[0])
        MaticSlimeContract.init()
    }

    /**
     * Read Ether Balance
     */
    static async GetBalance() {
        if (!this.account) {
            if (localStorage.getItem("account") === null) {
                //ConnetWallet();
            } else {
                this.account = localStorage.getItem("account");
            }
        } else {
            const k = await RpcInfo.web3.eth.getBalance(this.account);
            console.log(k);
        }
    }
    /**
     * Cookie auto Connect
     */
    static async CheckCookieForAccount() {
        console.log("Check")
        if (localStorage.getItem("account") === null) {
            //Eth.ConnetWallet();
            console.log("Request Account")
        } else {
            //Eth.ConnetWallet();
            console.log("Loading Account :" + Eth.account)

        }


    }

}