import {
    _decorator,
    Component,
    UITransform,
    Size,
    Sprite,
    SpriteFrame,
    AnimationClip,
    ButtonComponent,
    setDisplayStats,
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
    Ref: string

    onLoad() {
        Manager.instance = this;
        setDisplayStats(false);


    }

    start() {
        this.SetRef()
        Eth.CheckCookieForAccount()

        let Storage_Volume = localStorage.getItem("BGM");
        if (Storage_Volume == "On" || Storage_Volume == undefined) {
            Center.instance.BGM_Sprite.spriteFrame = Center.instance.BGM_SpriteFrameOn

            Center.instance.BGM_AudioSource.volume = 1;

        } else {
            Center.instance.BGM_Sprite.spriteFrame = Center.instance.BGM_SpriteFrameOff

            Center.instance.BGM_AudioSource.volume = 0;

        }
    }

    update(deltaTime: number) {
        if (!RpcInfo.isConnect) {
            return
        }
    }



    SetRef() {
        let params = new URLSearchParams(location.search)
        Manager.instance.Ref = params.get("ref")
        console.log("Ref :", Manager.instance.Ref)
    }



    SetBGM() {
        //let volume = Center.instance.BGM_AudioSource.volume;
        let Storage_Volume = localStorage.getItem("BGM");
        let volume = 1;
        if (Storage_Volume == "On" || Storage_Volume == undefined) {
            localStorage.setItem("BGM", "On")
            volume = 1
        } else {
            volume = 0;
        }
        if (volume == 0) {
            Center.instance.BGM_Sprite.spriteFrame = Center.instance.BGM_SpriteFrameOn
            // Center.instance.BGM_Sprite.getComponent(ButtonComponent).normalSprite = Center.instance.BGM_SpriteFrameOn
            Center.instance.BGM_AudioSource.volume = 1;
            localStorage.setItem("BGM", "On")

        } else {
            Center.instance.BGM_Sprite.spriteFrame = Center.instance.BGM_SpriteFrameOff
            // Center.instance.BGM_Sprite.getComponent(ButtonComponent).normalSprite = Center.instance.BGM_SpriteFrameOff
            Center.instance.BGM_AudioSource.volume = 0;
            localStorage.setItem("BGM", "Off")

        }

    }

    SetMaticProfitBar(secondsPass: number) {
        const OneDay = 86400;
        let progress = (secondsPass / OneDay)
        //console.log(progress)
        Center.instance.Profit_ProgressBar.progress = progress
    }


    SetSlimeLevelLabel(level: Number) {
        // 史萊姆等級
        Center.instance.SlimeLevel_Label.string = "Lv. " + level.toString();
    }

    SetSlimeExpLabel(min: Number, max: Number) {
        // 史萊姆經驗條 
        Center.instance.SlimeExp_Label.string = min.toString() + " / " + max.toString();
    }

    //Daily Yield Profit
    SetDailyYieldLabel(txt: string) {  // 討論~~
        //Crystal數量
        Center.instance.DailyYield_Label.string = txt
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

        //console.log(index)
        //console.log(speed)
        //console.log(c)
        //史萊姆速度
        c.speed = speed
        //console.log("speed up")

        //史萊姆圖片動畫
        Center.instance.MonsterSprite.defaultClip = c
        Center.instance.MonsterSprite.play()



    }

    SetSlimeSize(lv: number) {
        let c = Center.instance.MonsterSprite.getComponent(UITransform)
        let len = 150 * (lv * 0.5 + 1);

        c.setContentSize(new Size(len, len))
    }

    InitSlimeSize() {
        let c = Center.instance.MonsterSprite.getComponent(UITransform)
        c.setContentSize(new Size(0, 0))
    }

    InitSlimeExpLabel() {
        // 史萊姆等級
        Center.instance.SlimeLevel_Label.string = "Lv. 0";
        // 史萊姆經驗條 
        Center.instance.SlimeExp_Label.string = "0 / 120";
    }

    PlayButtonSound() {
        Center.instance.Sound_AudioSource.play()
    }


    /**
     * Connect 
    */
    static SetConnectLabel(txt: string) {
        Center.instance.Connect_Label.string = txt
    }
    async ConnetWallet() {
        Eth.ConnetWallet(Eth.AccountHandler);
        this.PlayButtonSound()

    }




    /**
     * MaticSlimeContract Func
     */

    Buy() {
        // 入金        
        console.log("Buy Function")
        let maticInput = Number(Center.instance.MaticInput_EditBox.textLabel.string)
        MaticSlimeContract.Buy(Manager.instance.Ref, maticInput).then(function () {

        })
        this.PlayButtonSound()
        //Slime.instance.UpdateSlime()
    }

    Compound() {
        console.log("Compound Function")
        MaticSlimeContract.Compound(Manager.instance.Ref).then(function () {

        })
        this.PlayButtonSound()
        //Slime.instance.UpdateSlime()
    }

    Sell() {
        console.log("Sell Function")
        MaticSlimeContract.Sell().then(function () {

        })
        this.PlayButtonSound()
        //Slime.instance.UpdateSlime()
    }

    /**
     * OpenUrl
     */

    OpenWhitePaper() {
        this.PlayButtonSound()
        Utils.OpenURL("/Whitepaper")

    }

    Reffer() {
        //console.log("Refferal Function")
        const url = new URL(document.URL)
        let RefUrl = url.origin + url.pathname + "?ref=" + Eth.account
        navigator.clipboard.writeText(RefUrl)
            .then(() => {
                console.log("Text copied to clipboard :" + RefUrl)
            })
            .catch(err => {
                console.log('Refferal Url Copy Error', err);
            })

        this.PlayButtonSound()

    }






}