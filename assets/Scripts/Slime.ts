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

    onLoad() {
        Slime.instance = this;
        Eth.EthEvent.on("connected", this.OnConnected)
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
        // TODO : Update Earn
        let profit = await MaticSlimeContract.GetCrystalValue()
        Manager.instance.SetMaticProfitLabel(Number(profit).toFixed(5));
        let Slimes = await MaticSlimeContract.GetMySlimes() + " Slimes"
        Manager.instance.SetSlimeAmountLabel(Slimes);
    }



    async UpdateSlime() {
        let myExp = Number(await MaticSlimeContract.GetMyExp());
        let lv = myExp / 120;

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
    }
}

