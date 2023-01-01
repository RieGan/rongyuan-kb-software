import { observable, action } from 'mobx'
import { BaseStore } from './baseStore'


export class IsKeyStore extends BaseStore {
    @observable popUpKey: boolean = false
    @action.bound
    setPopUpKey(state: boolean) {
        this.popUpKey = state
    }

    @observable customKey: boolean = false//判断是否炫彩 炫彩false无法在驱动使用键盘
    @action.bound
    setCustomKey(state: boolean) {
        this.customKey = state
    }

    @observable dazzleKey: boolean = false//判断是否炫彩
    @action.bound
    setDazzleKey(state: boolean) {
        this.dazzleKey = state
    }


    @observable lightKey: boolean = true//判断是否在灯光页面
    @action.bound
    setLightKey(state: boolean) {
        this.lightKey = state
    }

    @observable textKey: boolean = true//判断提示文字是否消失
    @action.bound
    setTextKey(state: boolean) {
        this.textKey = state
    }

    @observable keyIsOpen: boolean = false//判断是否打开键盘设置
    @action.bound
    setIsOpen(state: boolean) {
        this.keyIsOpen = state
    }

    @observable colorPickerKey: boolean = true//判断色盘是否打开
    @action.bound
    setColorPickerKey(state: boolean) {
        this.colorPickerKey = state
    }

    @observable loginTipBoxKey: boolean = false//判断登录界面是否打开
    @action.bound
    setLoginTipBoxKey(state: boolean) {
        this.loginTipBoxKey = state
    }
    @observable isShareOpen: boolean = false//判断登录界面是否打开
    @action.bound
    setIsShareOpen(state: boolean) {
        this.isShareOpen = state
    }

    @observable macroAddClickKey: boolean = false
    @observable macroAddTouchKey: boolean = false
    @action.bound
    setMacroAddClickKey(state: boolean) {
        this.macroAddClickKey = state
    }

    @action.bound
    setMacroAddTouchKey(state: boolean) {
        this.macroAddTouchKey = state
    }

    @observable isKnobKey: boolean = false
    @action.bound
    setIsKnobKey(state: boolean) {
        this.isKnobKey = state
    }
    @observable isLine: number = -1
    @action.bound
    setIsline(isLine: number) {
        this.isLine = isLine
    }
    @observable isSetFile: boolean = false //配置文件
    @action.bound
    setIsSetFile(state: boolean) {
        this.isSetFile = state

    }
    @observable isLanguae: boolean = false //语言设置
    @action.bound
    setisLanguae(state: boolean) {
        this.isLanguae = state
    }
    @observable isforbit: boolean = false //禁用
    @action.bound
    setisforbit(state: boolean) {
        this.isforbit = state
    }

    @observable isShowDisabled: boolean = false
    @action.bound
    setIsShowDisabled(state: boolean) {
        this.isShowDisabled = state
    }

    @observable isShowLightSelect: boolean = false
    @action.bound
    setIsShowLightSelect(state: boolean) {
        this.isShowLightSelect = state
    }

    @observable isShowLightMethodSelect: boolean = false
    @action.bound
    setIsShowLightMethodSelect(state: boolean) {
        this.isShowLightMethodSelect = state
    }

    @observable isShowProfileSelect: boolean = false
    @action.bound
    setIsShowProfileSelect(state: boolean) {
        this.isShowProfileSelect = state
    }


    @observable isShow24GCloseSelect: boolean = false
    @action.bound
    setIsShow24GCloseSelect(state: boolean) {
        this.isShow24GCloseSelect = state
    }

    @observable isShowBluetoothCloseSelect: boolean = false
    @action.bound
    setIsShowBluetoothCloseSelect(state: boolean) {
        this.isShowBluetoothCloseSelect = state
    }

    @observable isShow24GSleepSelect: boolean = false
    @action.bound
    setIsShow24GSleepSelect(state: boolean) {
        this.isShow24GSleepSelect = state
    }

    @observable isShowBluetoothSleepSelect: boolean = false
    @action.bound
    setIsShowBluetoothSleepSelect(state: boolean) {
        this.isShowBluetoothSleepSelect = state
    }

    @observable isShowLanguageSelect: boolean = false
    @action.bound
    setIsShowLanguageSelect(state: boolean) {
        this.isShowLanguageSelect = state
    }

    @observable isDevUpdate: boolean = false
    @action.bound
    setIsDevUpdate(state: boolean) {
        this.isDevUpdate = state
    }

    @observable isShare: boolean = false
    @action.bound
    setIsShare(state: boolean) {
        this.isShare = state
    }
    @observable personmm: boolean = false
    @action.bound
    setpersonmme(state: boolean) {
        this.personmm = state
    }
    @observable isMultiSelect: boolean = false
    @action.bound
    setIsMultiSelect(state: boolean) {
        this.isMultiSelect = state
    }
    @observable
    isDelay: boolean = false
    @action.bound
    setIsDelay(key: boolean) {
        this.isDelay = key
    }
    @observable isShowMusicSelect: boolean = false
    @action.bound
    setIsShowMusicSelect(state: boolean) {
        this.isShowMusicSelect = state
    }
}
