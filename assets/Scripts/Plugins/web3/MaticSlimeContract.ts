import { Utils } from "../Utils";
import { Eth } from "./Eth";
import { RpcInfo } from "./RpcInfo";

export class MaticSlimeContract {
    private static Address: string = "0x881B85CCb15AcB95649A528FB9Cd5137Ae5E0Cd4"
    private static ABI: any = [{ "inputs": [{ "internalType": "address", "name": "ref", "type": "address" }], "name": "Buy", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "ref", "type": "address" }], "name": "Compound", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "Sell", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "StartMarket", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "uint256", "name": "eth", "type": "uint256" }, { "internalType": "uint256", "name": "contractBalance", "type": "uint256" }], "name": "calculateCrystalBuy", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "crystals", "type": "uint256" }], "name": "calculateCrystalSell", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "rt", "type": "uint256" }, { "internalType": "uint256", "name": "rs", "type": "uint256" }, { "internalType": "uint256", "name": "bs", "type": "uint256" }], "name": "calculateTrade", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ceoAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "claimedCrystalsMap", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Crystal_Per_Slime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "devFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "adr", "type": "address" }], "name": "GetCrystalsSinceLastCompound", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "GetMyCrystals", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "GetMyExp", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "GetMySlimes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "GetPoolBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "initialized", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "lastCompoundMap", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "marketCrystals", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "player", "outputs": [{ "internalType": "uint256", "name": "Principal", "type": "uint256" }, { "internalType": "uint256", "name": "Exp", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "referralsMap", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "SlimesMap", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];

    static ContractInstance: any

    static init() {
        MaticSlimeContract.ContractInstance = new RpcInfo.web3.eth.Contract(MaticSlimeContract.ABI, MaticSlimeContract.Address);
    }

    static async Buy(ref: string, val: Number) {
        if (Utils.isEmpty(ref)) {
            ref = Eth.account
        }

        let amountToSend = RpcInfo.web3.utils.toWei(val, "ether")
        MaticSlimeContract.ContractInstance.methods.Buy(ref).send({ from: Eth.account, value: amountToSend })
            .then(function (result) {

            })
            .catch(function (error) {
                console.log(error.message)
                if (error.code === 4001) {

                    //user rejected the transaction

                }
            })


    }

    static async Compound(ref: string) {
        if (Utils.isEmpty(ref)) {
            ref = Eth.account
        }
        MaticSlimeContract.ContractInstance.methods.Compound(ref).send({ from: Eth.account })
            .then(function (result) {

            })
            .catch(function (error) {
                console.log(error.message)
                if (error.code === 4001) {
                    //user rejected the transaction

                }
            })
    }

    static async Sell() {
        MaticSlimeContract.ContractInstance.methods.Sell().send({ from: Eth.account })
            .then(function (result) {

            })
            .catch(function (error) {
                console.log(error.message)
                if (error.code === 4001) {
                    //user rejected the transaction

                }
            })
    }

    //合約 資金池
    static async GetPoolBalance() {
        const k = await MaticSlimeContract.ContractInstance.methods.GetPoolBalance().call({ from: Eth.account });
        let EtherValue = RpcInfo.web3.utils.fromWei(k, "ether")
        return EtherValue

    }

    static async GetMyCrystals() {
        const k = await MaticSlimeContract.ContractInstance.methods.GetMyCrystals().call({ from: Eth.account });
        let EtherValue = RpcInfo.web3.utils.fromWei(k, "ether")
        return EtherValue
    }

    static async GetMySlimes() {
        const k = await MaticSlimeContract.ContractInstance.methods.GetMySlimes().call({ from: Eth.account });
        return k.toString()
    }

    static async GetMyExp() {
        const k = await MaticSlimeContract.ContractInstance.methods.GetMyExp().call({ from: Eth.account });
        return k.toString()
    }

    static async GetSecondsPassed() {
        const k = await MaticSlimeContract.ContractInstance.methods.GetSecondsPassed().call({ from: Eth.account });
        return k.toString()
    }

    // 等級-水晶加成
    static async GetBonus_Crystal_Per_Slime() {
        const k = await MaticSlimeContract.ContractInstance.methods.GetBonus_Crystal_Per_Slime().call({ from: Eth.account });
        return k.toString()
    }

    // 等級-反傭加成
    static async GetBonus_Ref() {
        const k = await MaticSlimeContract.ContractInstance.methods.GetBonus_Ref().call({ from: Eth.account });
        return k.toString()
    }


}