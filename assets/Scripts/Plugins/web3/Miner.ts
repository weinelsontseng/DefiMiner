import { Eth } from "./Eth";
import { RpcInfo } from "./RpcInfo";

export class Miner {
    private static Address: string = "0xBdA2Cbd33C2A5250E4B9e456f08A90Bf3651FAE6"
    private static ABI: any = [{ "inputs": [{ "internalType": "address", "name": "ref", "type": "address" }], "name": "Compound", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "ref", "type": "address" }], "name": "Hire", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "Pocket", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "seedMarket", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "uint256", "name": "eth", "type": "uint256" }, { "internalType": "uint256", "name": "contractBalance", "type": "uint256" }], "name": "calculateEggBuy", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "eth", "type": "uint256" }], "name": "calculateEggBuySimple", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "eggs", "type": "uint256" }], "name": "calculateEggSell", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "rt", "type": "uint256" }, { "internalType": "uint256", "name": "rs", "type": "uint256" }, { "internalType": "uint256", "name": "bs", "type": "uint256" }], "name": "calculateTrade", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ceoAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "claimedEggs", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "devFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "EGGS_TO_HATCH_1MINERS", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "adr", "type": "address" }], "name": "getEggsSinceLastHatch", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMyEggs", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMyMiners", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "hatcheryMiners", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "initialized", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "lastHatch", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "marketEggs", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "player", "outputs": [{ "internalType": "uint256", "name": "Principal", "type": "uint256" }, { "internalType": "uint256", "name": "Exp", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "referrals", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }]

    static ContractInstance: any

    static init() {
        Miner.ContractInstance = new RpcInfo.web3.eth.Contract(Miner.ABI, Miner.Address);
    }



    static async Hire() {
        Miner.ContractInstance.methods.Hire(Eth.account).send({ from: Eth.account })
            .then(function (result) {

            })
            .catch(function (error) {
                console.log(error.message)
                if (error.code === 4001) {

                    //user rejected the transaction

                }
            })


    }

    static async Compound() {
        Miner.ContractInstance.methods.Compound(Eth.account).send({ from: Eth.account })
            .then(function (result) {

            })
            .catch(function (error) {
                console.log(error.message)
                if (error.code === 4001) {
                    //user rejected the transaction

                }
            })
    }

    static async Pocket() {
        Miner.ContractInstance.methods.Pocket().send({ from: Eth.account })
            .then(function (result) {

            })
            .catch(function (error) {
                console.log(error.message)
                if (error.code === 4001) {
                    //user rejected the transaction

                }
            })
    }

    static async GetMyEgg() {
        const k = await Miner.ContractInstance.methods.getMyEggs().call({ from: Eth.account });
        return k.toString()
    }

    static async GetPoolBalance() {
        const k = await Miner.ContractInstance.methods.getBalance().call({ from: Eth.account });
        return k.toString()

    }

    static async GetMyMiners() {
        const k = await Miner.ContractInstance.methods.getMyMiners().call({ from: Eth.account });
        return k.toString()
    }
}