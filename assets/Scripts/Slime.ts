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

    PlayerInfo: any

    UpdateInterval: any


    onLoad() {
        Slime.instance = this;
        Eth.EthEvent.on("connected", this.OnConnected)
        Eth.EthEvent.on("updateSlime", Slime.instance.UpdateSlime)
    }

    start() {
        Manager.instance.InitSlimeSize();
        Manager.instance.InitSlimeExpLabel();


    }

    update(deltaTime: number) {


    }

    async OnConnected() {
        Slime.instance.UpdateSlime()
        console.log("OnConnected")
        Slime.instance.UpdateInterval = setInterval(Slime.instance.UpdateEarn, 2000)
    }



    async UpdateEarn() {
        //console.log("Update Earn")
        // TODO : Update Earn
        if (!RpcInfo.isConnect) {
            console.log("Disconnected")
            return
        }
        let OneDayProfit = Number(await MaticSlimeContract.GetCrystalValue())
        Manager.instance.SetMaticProfitLabel(OneDayProfit.toPrecision(5));
        //console.log(Slime.instance.OneDayProfit)

        let seconds = await MaticSlimeContract.GetSecondsPassed()
        Manager.instance.SetMaticProfitBar(seconds)


        let Slimes = await MaticSlimeContract.GetMySlimes() + " Slimes"
        Manager.instance.SetSlimeAmountLabel(Slimes);


    }



    async UpdateSlime() {

        let myExp = Number(await MaticSlimeContract.GetMyExp());

        let mySlime = Number(await MaticSlimeContract.GetMySlimes());

        if (mySlime == 0) {
            return;
        }

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


        await Slime.instance.GetDailyYield()



    }


    // 日利率
    async GetDailyYield() {
        Slime.instance.PlayerInfo = await MaticSlimeContract.GetPlayerInfo()
        //console.log(Slime.instance.PlayerInfo)

        let InvestValue = Number(Slime.instance.PlayerInfo.InvestValue)
        InvestValue = await RpcInfo.web3.utils.fromWei(InvestValue.toString(), "ether")
        //console.log(principal)

        let OneDayProfit = await MaticSlimeContract.GetOneDayMaxCrystalValue()

        //console.log("Profit / Principal :", OneDayProfit, principal)
        let dailyYield = 0;

        if (Number(InvestValue) == 0) {

        } else {
            dailyYield = ((OneDayProfit) / Number(InvestValue) * 100)
            //console.log(dailyYield)
        }

        Manager.instance.SetDailyYieldLabel(dailyYield.toFixed(5) + "%")
    }
}

