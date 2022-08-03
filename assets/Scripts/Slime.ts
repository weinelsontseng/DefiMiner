import { _decorator, Component, Node } from 'cc';
import { Center } from './Center';
import { Manager } from './Manager';
import { Eth } from './Plugins/web3/Eth';
import { MaticSlimeContract } from './Plugins/web3/MaticSlimeContract';
import { RpcInfo } from './Plugins/web3/RpcInfo';
const { ccclass, property } = _decorator;

@ccclass('Slime')
export class Slime extends Component {
    static instance: Slime
    Crystal: string
    OneDay = 86400;
    PlayerInfo: any;

    onLoad() {
        Slime.instance = this;
        Eth.EthEvent.on("connected", this.OnConnected)
        Eth.EthEvent.on("updateSlime", Slime.instance.UpdateSlime)
    }

    start() {

    }

    update(deltaTime: number) {
        if (!RpcInfo.isConnect) {
            return
        }
        this.UpdateEarn()
    }

    async OnConnected() {
        Slime.instance.UpdateSlime()
        console.log("OnConnected")
    }



    async UpdateEarn() {
        //console.log("Update Earn")
        // TODO : Update Earn
        let profit = await MaticSlimeContract.GetCrystalValue()
        Manager.instance.SetMaticProfitLabel(Number(profit).toFixed(5));

        let seconds = await MaticSlimeContract.GetSecondsPassed()
        Manager.instance.SetMaticProfitBar(seconds)


        let Slimes = await MaticSlimeContract.GetMySlimes() + " Slimes"
        Manager.instance.SetSlimeAmountLabel(Slimes);






    }



    async UpdateSlime() {
        let myExp = Number(await MaticSlimeContract.GetMyExp());

        let lv = Math.floor(myExp / 120)

        // TODO : Update Size
        Manager.instance.SetSlimeSize(lv);

        // TODO : Set Slime Anim Speed
        Manager.instance.SetSlimeAnimAndSpeed(lv, (1 + lv * 0.2 - 0.1));

        // TODO : Set Slime Exp & Level        
        let maxExp = (lv + 1) * 120;
        if (maxExp > 600) {
            maxExp = 600;
        }
        Manager.instance.SetSlimeExpLabel(myExp, maxExp);
        Manager.instance.SetSlimeLevelLabel(lv);


        let OneDayProfit = Number(await MaticSlimeContract.GetMySlimes()) * Slime.instance.OneDay
        OneDayProfit = await RpcInfo.web3.utils.fromWei(OneDayProfit.toString(), "ether")

        Slime.instance.PlayerInfo = await MaticSlimeContract.GetPlayerInfo()
        console.log(Slime.instance.PlayerInfo)

        let principal = Number(Slime.instance.PlayerInfo.Principal)
        principal = await RpcInfo.web3.utils.fromWei(principal.toString(), "ether")


        let dailyYield = (Number(OneDayProfit) / Number(principal)) * 100
        console.log(dailyYield)

        Manager.instance.SetDailyYieldLabel(dailyYield.toFixed(2).toString() + "%")

    }
}

