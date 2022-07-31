import { _decorator, Component, Node, Texture2D, SpriteFrame, Label, Sprite, AnimationState, animation, AnimationClip, AnimationComponent, Prefab, EditBox } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Center')
export class Center extends Component {


    static instance: Center

    /*@property(SpriteFrame)
    GrowImages: SpriteFrame[] = []*/

    @property(Label)
    Connect_Label: Label
    @property(Label)
    SlimeLevel_Label: Label
    @property(Label)
    SlimeExp_Label: Label
    @property(Label)
    CrystalEarn_Label: Label
    @property(Label)
    MaticProfit_Label: Label
    @property(Label)
    SlimeAmount_Label: Label
    @property(EditBox)
    MaticInput_EditBox: EditBox



    @property(AnimationComponent)
    MonsterSprite: AnimationComponent


    onLoad() {
        Center.instance = this;
    }

    start() {

    }

    update(deltaTime: number) {

    }


}

