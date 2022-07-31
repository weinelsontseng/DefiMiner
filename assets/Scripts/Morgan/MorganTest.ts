import { _decorator, Component, Node } from 'cc';
import { Eth } from '../Plugins/web3/Eth';
import { MaticSlimeContract } from '../Plugins/web3/MaticSlimeContract';
const { ccclass, property } = _decorator;

@ccclass('MorganTest')
export class MorganTest extends Component {
    start() {
        Eth.ConnetWallet(this.AccountHandler)
    }

    update(deltaTime: number) {

    }

    async AccountHandler(accounts) {
        console.log(accounts)
        Eth.account = accounts[0]
        localStorage.setItem("account", accounts[0])
        MaticSlimeContract.init()

        //MaticSlimeContract.Buy("", 0.1)
        //MaticSlimeContract.Compound("")
        MaticSlimeContract.Sell()
        console.log("Crystal :", await MaticSlimeContract.GetMyCrystals())
        console.log("Crystal Value(Matic):", await MaticSlimeContract.GetCrystalValue())
        console.log("MyExp :", await MaticSlimeContract.GetMyExp())
        console.log("Slimes :", await MaticSlimeContract.GetMySlimes())
        console.log("Pool :", await MaticSlimeContract.GetPoolBalance())
        console.log("SecondsPassed :", await MaticSlimeContract.GetSecondsPassed())
        console.log("Lv Bouns for Ref :", await MaticSlimeContract.GetBonus_Ref(1))
        console.log("Lv Bonus for  Crystal_Per_Slime :", await MaticSlimeContract.GetBonus_Crystal_Per_Slime(2))

    }
}

