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
import { Miner } from './Plugins/web3/Miner';
import { RpcInfo } from './Plugins/web3/RpcInfo';
import { Center } from './Center';
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
        Eth.CheckCookieForAccount()
    }

    update(deltaTime: number) {
        if (!RpcInfo.isConnect) {
            return
        }
        if (!Utils.isEmpty(Eth.account)) {
            this.SetConnectLabel(Eth.account.slice(0, 8))
        }


    }


    SetSlimeLabel(txt: string) {
        //史萊姆等級
        Center.instance.SlimeLevel_Label.string = txt
    }

    SetSlimeExpLabel(txt: string) {
        //史萊姆經驗
        Center.instance.SlimeExp_Label.string = txt
    }

    SetCrystalEarnLabel(txt: string) {
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

    SetMonsterSprite(txt: string) {
        //史萊姆圖片動畫
        Center.instance.MonsterSprite.play('slime_idle_lv5')
        
    }

    SetSlimeAnim(speed: number) {
        //史萊姆速度
        console.log("speed up")
        
    }
    

    /**
     * Connect 
    */
    SetConnectLabel(txt: string) {
        Center.instance.Connect_Label.string = txt
    }
    async ConnetWallet() {
        Eth.ConnetWallet();
    }

    /**
     * Monster GrowUp
     */
    MonsterGrowUp() {
        /*Center.instance.MonsterSprite.spriteFrame = Center.instance.GrowImages[1]

        if (Center.instance.MonsterSprite.spriteFrame == Center.instance.GrowImages[1]) {
            let vec = Center.instance.MonsterSprite.getComponent(UITransform).contentSize;



            Center.instance.MonsterSprite.getComponent(UITransform).setContentSize(new Size(vec.x + 10, vec.y + 10))
        }*/
    }

    /**
     * Miner Func
     */

    async GetDetail() {
        console.log("Pool :" + await Miner.GetPoolBalance());
        console.log("Egg :" + await Miner.GetMyEgg());
        console.log("Miner :" + await Miner.GetMyMiners());
    }



    Buy() {
        // 入金
        console.log("Buy Function")
    }    

    Compound() {
        //Miner.Compound()
        console.log("Compound Function")
        this.MonsterGrowUp()
    }

    SellMiner() {
        console.log("Sell Function")
        Miner.Pocket()
    }

    /**
     * OpenUrl
     */

    OpenWhitePaper() {
        Utils.OpenURL("/Whitepaper")
    }






}