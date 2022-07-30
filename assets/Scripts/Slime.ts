import { _decorator, Component, Node } from 'cc';
import { Center } from './Center';
const { ccclass, property } = _decorator;

@ccclass('Slime')
export class Slime extends Component {
    static instance: Slime
    Crystal: string

    onLoad() {
        Slime.instance = this;
    }

    start() {

    }

    update(deltaTime: number) {

    }

    UpdateEarn() {
        // TODO : Update Earn
    }



    UpdateSlime() {
        // TODO : Update Size

        // TODO : Set Slime Anim Speed

        // TODO : Set Slime Exp & Level
    }


    // 設定顯示 - 史萊姆 經驗條 
    SetSlimeExpLabel(min: Number, max: Number) {
        Center.instance.SlimeExp_Label.string = min.toString() + " / " + max.toString();
    }
    // 設定顯示 - 史萊姆 等級
    SetSlimeLevelLabel(level: Number) {
        Center.instance.SlimeLevel_Label.string = "Lv. " + level.toString();
    }
}

