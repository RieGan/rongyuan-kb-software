import { DeviceStore } from "./deviceStore"
import { createContext, useContext } from "react"
import { ConfigStore } from "./configStore"
import { ShareStore } from "./shareStore"
import { UserStore } from "./userStore"
import { MacroStore } from "./macroStore"
import { ToastStore } from "./toastStore"
import { PageStore } from "./pageStore"
import { ColorPickerStore } from "./colorPickerStore"
import { UpgradeStore } from "./upgradeStore"
import { HelpStore } from "./helpStroe"
import { MusicFollowStore } from "./musicFollowStore"
import { IsKeyStore } from "./IsKeyStore"
import { ScreenStore } from "./screenStore"
import { ShopStore } from "./shopStore"
import { LightPageStore } from "./lightPageStore"
import { BatteryStore } from "./batteryStore"
import { OtherStore } from "./otherStore"
import { KeySettingStore } from "./keySettingStore"
import { DrawStore } from "./drawStore"
import { TipsStore } from "./tipsStore"
import { UserPicStore } from "./userPicStore"
import { ShareImageStore } from "./shareImageStore"


export const mobxStore = {
    deviceStore: new DeviceStore(),
    configStore: new ConfigStore(),
    shareStore: new ShareStore(),
    userStore: new UserStore(),
    macroStore: new MacroStore(),
    toastStore: new ToastStore(),
    pageStore: new PageStore(),
    colorPickerStore: new ColorPickerStore(),
    upgradeStore: new UpgradeStore(),
    helpStore: new HelpStore(),
    musicFollowStore: new MusicFollowStore(),
    screenStore: new ScreenStore(),
    isKeyStore: new IsKeyStore(),
    shopStore: new ShopStore(),
    lightPageStore: new LightPageStore(),
    batteryStore: new BatteryStore(),
    otherStore: new OtherStore(),
    keySettingStore: new KeySettingStore(),
    drawStore: new DrawStore(),
    tipsStore: new TipsStore(),
    userPicStore: new UserPicStore(),
    shareImageStore: new ShareImageStore()
}
export const MobxStoreContext = createContext(mobxStore)
export const useStore = () => {
    return useContext(MobxStoreContext)
}