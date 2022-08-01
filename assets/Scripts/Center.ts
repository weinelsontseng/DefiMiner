import { _decorator, Component, Node, Texture2D, SpriteFrame, Label, Sprite, AnimationState, animation, AnimationClip, AnimationComponent, Prefab, EditBox, ProgressBarComponent, AudioSourceComponent } from 'cc';
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
    @property(ProgressBarComponent)
    Profit_ProgressBar: ProgressBarComponent
    @property(AudioSourceComponent)
    BGM_AudioSource: AudioSourceComponent
    @property(Sprite)
    BGM_Sprite: Sprite
    @property(SpriteFrame)
    BGM_SpriteFrameOn: SpriteFrame
    @property(SpriteFrame)
    BGM_SpriteFrameOff: SpriteFrame

    @property(AudioSourceComponent)
    Sound_AudioSource: AudioSourceComponent


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

