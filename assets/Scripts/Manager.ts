import {
    _decorator,
    Component,
    UITransform,
    Size,
    Sprite,
    SpriteFrame,
    AnimationClip,
} from 'cc';
import { Eth } from './Plugins/web3/Eth';
import { Utils } from './Plugins/Utils';
import { MaticSlimeContract } from './Plugins/web3/MaticSlimeContract';
import { RpcInfo } from './Plugins/web3/RpcInfo';
import { Center } from './Center';
import { Slime } from './Slime';
const {
    ccclass,
    property
} = _decorator;





@ccclass('Manager')
export class Manager extends Component {
    static instance: Manager

    onLoad() {
        Manager.instance = this;
    }

    start() {
        Eth.CheckCookieForAccount(this.AccountHandler)
    }

    update(deltaTime: number) {
        if (!RpcInfo.isConnect) {
            return
        }



    }


    SetSlimeLevelLabel(level: Number) {
        // 史萊姆等級
        Center.instance.SlimeLevel_Label.string = "Lv. " + level.toString();
    }

    SetSlimeExpLabel(min: Number, max: Number) {
        // 史萊姆經驗條 
        Center.instance.SlimeExp_Label.string = min.toString() + " / " + max.toString();
    }

    SetCrystalEarnLabel(txt: string) {  // 討論~~
        //Crystal數量
        Center.instance.CrystalEarn_Label.string = txt
    }

    SetMaticProfitLabel(txt: string) {
        //Matic賺取數量
        Center.instance.MaticProfit_Label.string = txt
    }

    SetSlimeAmountLabel(txt: string) {
        //史萊姆總數
        Center.instance.SlimeAmount_Label.string = txt
    }

    SetMonsterSprite(index: any) {

        let c = Center.instance.MonsterSprite.clips[index]

        Center.instance.MonsterSprite.defaultClip = c
        Center.instance.MonsterSprite.play()

    }

    SetSlimeAnimAndSpeed(index: any, speed: number) {
        let c = Center.instance.MonsterSprite.clips[index]
        //史萊姆圖片動畫
        Center.instance.MonsterSprite.defaultClip = c
        Center.instance.MonsterSprite.play()

        //史萊姆速度
        c.speed = speed
        console.log("speed up")

    }

    SetSlimeSize(lv: number) {
        let c = Center.instance.MonsterSprite.getComponent(UITransform)
        let len = 300 * (lv * 0.5 + 1);
        c.setContentSize(new Size(len, len))
    }


    /**
     * Connect 
    */
    static SetConnectLabel(txt: string) {
        Center.instance.Connect_Label.string = txt
    }
    async ConnetWallet() {
        Eth.ConnetWallet(this.AccountHandler);
    }

    AccountHandler(accounts) {
        console.log(accounts)
        Eth.account = accounts[0]
        localStorage.setItem("account", accounts[0])
        Manager.SetConnectLabel(Eth.account.slice(0, 8))
        MaticSlimeContract.init()
    }


    /**
     * MaticSlimeContract Func
     */

    Buy() {
        // 入金        
        console.log("Buy Function")
        let maticInput = Number(Center.instance.MaticInput_EditBox.string)
        MaticSlimeContract.Buy("", maticInput)
        Slime.instance.UpdateSlime()
    }

    Compound() {
        console.log("Compound Function")
        MaticSlimeContract.Compound("")
        Slime.instance.UpdateSlime()
    }

    Sell() {
        console.log("Sell Function")
        MaticSlimeContract.Sell()
        Slime.instance.UpdateSlime()
    }

    /**
     * OpenUrl
     */

    OpenWhitePaper() {
        Utils.OpenURL("/Whitepaper")
    }






}