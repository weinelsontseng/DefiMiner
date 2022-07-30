import {
    _decorator,
    Component,
    UITransform,
    Size,
} from 'cc';
import { Eth } from './Plugins/web3/Eth';
import { Utils } from './Plugins/Utils';
import { MaticSlimeContract } from './Plugins/web3/MaticSlimeContract';
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
     * MaticSlimeContract Func
     */

    Buy() {
        // 入金
        console.log("Buy Function")
    }

    Compound() {
        //Miner.Compound()
        this.MonsterGrowUp()
    }

    Sell() {

    }

    /**
     * OpenUrl
     */

    OpenWhitePaper() {
        Utils.OpenURL("/Whitepaper")
    }






}