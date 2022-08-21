import { JsonAsset } from "cc";
import { Utils } from "../Utils";
import { Eth } from "./Eth";
import { RpcInfo } from "./RpcInfo";
import "./web3.min.js"

export class MaticSlimeContract {
    public static Address: string;
    public static ABI: any;

    static ContractInstance: any

    static async init() {

        let asset = await Utils.loadResSync("config", JsonAsset);

        //console.log("Data :" + asset.json)

        MaticSlimeContract.Address = asset.json.ContractAddress;
        MaticSlimeContract.ABI = asset.json.ContractABI;

        MaticSlimeContract.ContractInstance = new RpcInfo.web3.eth.Contract(MaticSlimeContract.ABI, MaticSlimeContract.Address);


    }

    static async Buy(ref: string, val: Number) {
        if (Utils.isEmpty(ref)) {
            ref = Eth.account
        }

        let amountToSend = await RpcInfo.web3.utils.toWei(val.toString(), "ether")
        MaticSlimeContract.ContractInstance.methods.Buy(ref).send({ from: Eth.account, value: amountToSend, gasPrice: undefined })
            .then(function (result) {
                console.log(result)
                Eth.EthEvent.emit("updateSlime")
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
        MaticSlimeContract.ContractInstance.methods.Compound(ref).send({ from: Eth.account, gasPrice: undefined })
            .then(function (result) {
                console.log(result)
                Eth.EthEvent.emit("updateSlime")
            })
            .catch(function (error) {
                console.log(error.message)
                if (error.code === 4001) {
                    //user rejected the transaction

                }
            })
    }

    static async Sell() {
        MaticSlimeContract.ContractInstance.methods.Sell().send({ from: Eth.account, gasPrice: undefined })
            .then(function (result) {
                console.log(result)
                Eth.EthEvent.emit("updateSlime")
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
        //console.log(k)
        let EtherValue = await RpcInfo.web3.utils.fromWei(k, "ether")
        return EtherValue

    }

    static async GetMyCrystals() {
        const k = await MaticSlimeContract.ContractInstance.methods.GetMyCrystals().call({ from: Eth.account });
        //console.log(k)
        let EtherValue = await RpcInfo.web3.utils.fromWei(k, "ether")
        return EtherValue
    }

    static async GetCrystalValue() {
        const myCrystals = await MaticSlimeContract.ContractInstance.methods.GetMyCrystals().call({ from: Eth.account });

        if (myCrystals == 0) {
            return 0
        }

        const k = await MaticSlimeContract.ContractInstance.methods.calculateCrystalSell(myCrystals).call({ from: Eth.account });
        //console.log(k)
        let EtherValue = await RpcInfo.web3.utils.fromWei(k, "ether")
        return EtherValue
    }

    static async GetOneDayMaxCrystalValue() {
        const OneDay = 86400;
        const baseSlime = await MaticSlimeContract.GetMySlimes()
        //console.log("Slime :" + baseSlime)

        const MaxCrystal = Number(baseSlime) * OneDay
        //console.log("Max Crystal :" + MaxCrystal)

        if (MaxCrystal == 0) {
            return 0
        }

        const k = await MaticSlimeContract.ContractInstance.methods.calculateCrystalSell(MaxCrystal).call({ from: Eth.account });
        let EtherValue = await RpcInfo.web3.utils.fromWei(k, "ether")
        console.log("Max Crystal Value :" + k)
        return EtherValue
    }

    static async GetMySlimes() {
        const k = await MaticSlimeContract.ContractInstance.methods.GetMySlimes().call({ from: Eth.account });
        //console.log(k)
        return k.toString()
    }

    static async GetMyExp() {
        const k = await MaticSlimeContract.ContractInstance.methods.GetMyExp().call({ from: Eth.account });
        //console.log(k)
        return k.toString()
    }

    static async GetSecondsPassed() {
        const k = await MaticSlimeContract.ContractInstance.methods.GetSecondsPassed(Eth.account).call({ from: Eth.account });
        //console.log(k)
        return k.toString()
    }

    // 等級-水晶加成
    static async GetBonus_Crystal_Per_Slime(lv: Number) {
        const k = await MaticSlimeContract.ContractInstance.methods.GetBonus_Crystal_Per_Slime(lv).call({ from: Eth.account });
        //console.log(k)
        return k.toString()
    }

    // 等級-反傭加成
    static async GetBonus_Ref(lv: Number) {
        const k = await MaticSlimeContract.ContractInstance.methods.GetBonus_Ref(lv).call({ from: Eth.account });
        //console.log(k)
        return k.toString()
    }


    static async GetPlayerInfo() {
        const k = await MaticSlimeContract.ContractInstance.methods.player(Eth.account).call({ from: Eth.account });
        //console.log(k)
        //let j = JSON.parse(k)

        return k;
    }





}