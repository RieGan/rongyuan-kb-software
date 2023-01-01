import React from 'react'
import { res } from '../../res'

import { useStore } from '../../mobxStore/store'
import { useObserver } from 'mobx-react-lite'

import { 键鼠布局 } from '../../res/layout'
import { store } from '../store'
import { defaultLayout } from '../../sdk/DriverIO/DeviceAPI/DeviceInterface'
import { UpgradeStore } from '../../mobxStore/upgradeStore'
import { supportYC500Dev } from '../../supportYC500Dev'
import { equals } from 'ramda'

export interface LightProp {
  light: LightSetting
  lightLayout: {
    isRgb: boolean
    isFormal?: boolean
    types: {
      type: string
      maxSpeed?: number
      minSpeed?: number
      maxValue?: number
      minValue?: number
      options?: string[]
      rgb?: boolean
      dazzle?: boolean
    }[]
  }
  setLight: (light: LightSetting) => void
  deviceName: string
  deviceLayout: { layout: 键鼠布局[]; delt: { deltX: number; deltY: number } }
  lightPic: UserPicItem[]
  setLightPic: (lightPic: UserPicItem[], simpleKey?: UserPicItem) => void
}

export interface SleepProp {
  sleepTime: SleepKeyTime
  setSleepTime: (time: SleepKeyTime) => void
}

export interface LightProp2 {
  light: 'LightAlwaysOn'
  lightLayout: {
    isRgb: boolean
    types: {
      type: string
      maxSpeed?: number
      minSpeed?: number
      maxValue?: number
      minValue?: number
      options?: string[]
      rgb?: boolean
    }[]
  }
  setLight: (light: LightSetting) => void
  deviceName: string
  deviceLayout: { layout: 键鼠布局[]; delt: { deltX: number; deltY: number } }
  lightPic: UserPicItem[]
  setLightPic: (lightPic: UserPicItem[]) => void
}

export const wheelSleepData = () => {
  const { deviceStore } = useStore()
  const { otherStore } = useStore()
  return useObserver<SleepProp>(() => {
    return {
      //   sleepTime: deviceStore.currentConfig.other?.sleep
      //     ? {
      //       time_bt: deviceStore.currentConfig.other.sleep.time_bt,
      //       time_24: deviceStore.currentConfig.other.sleep.time_24,
      //       deepTime_bt: deviceStore.currentConfig.other.sleep.deepTime_bt,
      //       deepTime_24: deviceStore.currentConfig.other.sleep.deepTime_24,
      //     }
      //     : {
      //       time_bt: 0,
      //       time_24: 0,
      //       deepTime_bt: 0,
      //       deepTime_24: 0,
      //     },
      //   setSleepTime: (time: SleepKeyTime) => deviceStore.setSleepTime(time),
      // }
      sleepTime: otherStore.currentOther?.sleep
        ? {
          time_bt: otherStore.currentOther.sleep.time_bt,
          time_24: otherStore.currentOther.sleep.time_24,
          deepTime_bt: otherStore.currentOther.sleep.deepTime_bt,
          deepTime_24: otherStore.currentOther.sleep.deepTime_24,
        }
        : {
          time_bt: 0,
          time_24: 0,
          deepTime_bt: 0,
          deepTime_24: 0,
        },
      setSleepTime: (time: SleepKeyTime) => deviceStore.setSleepTime(time),
    }
  })
}
export const ledOtherData = () => {
  const { deviceStore } = useStore()
  const { otherStore } = useStore()
  return useObserver<SleepProp>(() => {
    return {

      sleepTime: otherStore.currentOther?.sleep
        ? {
          time_bt: otherStore.currentOther.sleep.time_bt,
          time_24: otherStore.currentOther.sleep.time_24,
          deepTime_bt: otherStore.currentOther.sleep.deepTime_bt,
          deepTime_24: otherStore.currentOther.sleep.deepTime_24,
        }
        : {
          time_bt: 0,
          time_24: 0,
          deepTime_bt: 0,
          deepTime_24: 0,
        },
      setSleepTime: (time: SleepKeyTime) => deviceStore.setSleepTime(time),
    }
  })
}
export const wheelLightLEDData = () => {
  const { deviceStore } = useStore()

  return useObserver<LightProp>(() => {
    const deviceName = deviceStore.currentDev
      ? deviceStore.currentDev.deviceType.name
        ? deviceStore.currentDev.deviceType.name
        : 'default'
      : 'default'
    const isLayoutExit = deviceName in res.键鼠坐标

    return {
      light:
        deviceStore.currentConfig.logoLight != null
          ? deviceStore.currentConfig.logoLight
          : { type: 'LightOff' },
      lightLayout: deviceStore.currentDev
        ? deviceStore.currentDev.deviceType.logoLayout
          ? deviceStore.currentDev.deviceType.logoLayout['light']
          : {
            isRgb: false,
            types: [
              {
                type: 'LightAlwaysOn',
                maxSpeed: 1,
                minSpeed: 2,
                maxValue: 3,
                minValue: 4,
                options: [''],
                rgb: false,
              },
            ],
          }
        : {
          isRgb: false,
          types: [
            {
              type: 'LightAlwaysOn',
              maxSpeed: 1,
              minSpeed: 2,
              maxValue: 3,
              minValue: 4,
              options: [''],
              rgb: false,
            },
          ],
        },
      setLight: deviceStore.setSLEDParam,
      deviceName: deviceName,
      deviceLayout: res.键鼠坐标[isLayoutExit ? deviceName : 'default'],


      lightPic: [],
      setLightPic: (lightPic: UserPicItem[]) => {

      },
    }
  })
}


export const wheelLightData = () => {
  const { deviceStore } = useStore()

  return useObserver<LightProp>(() => {
    const deviceName = deviceStore.currentDev
      ? deviceStore.currentDev.deviceType.name
        ? deviceStore.currentDev.deviceType.name
        : 'default'
      : 'default'
    const isLayoutExit = deviceName in res.键鼠坐标

    const light: LightSetting = deviceStore.currentConfig.light != null
      ? deviceStore.currentConfig.light
      : { type: 'LightOff' }
    const lightLayout = deviceStore.currentDev
      ? deviceStore.currentDev.deviceType.layout
        ? deviceStore.currentDev.deviceType.layout['light']
        : {
          isRgb: false,
          types: [
            {
              type: 'LightAlwaysOn',
              maxSpeed: 1,
              minSpeed: 2,
              maxValue: 3,
              minValue: 4,
              options: [''],
              rgb: false,
            },
          ],
        }
      : {
        isRgb: false,
        types: [
          {
            type: 'LightAlwaysOn',
            maxSpeed: 1,
            minSpeed: 2,
            maxValue: 3,
            minValue: 4,
            options: [''],
            rgb: false,
          },
        ],
      }
    return {
      light: light,
      lightLayout: lightLayout,
      setLight: deviceStore.setLightSetting,
      deviceName: deviceName,
      deviceLayout: res.键鼠坐标[isLayoutExit ? deviceName : 'default'],
      lightPic: deviceStore.currentLightPic
        ? deviceStore.currentLightPic
        : [],
      setLightPic: (lightPic: UserPicItem[], simpleKey?: UserPicItem) => {
        if (supportYC500Dev.some(v => equals(v.id, deviceStore.currentDev?.deviceType.id))) {
          if (simpleKey === undefined) {
            deviceStore.setLightPic(lightPic)
            return
          }

          const index = lightLayout.types.findIndex(v => equals(v.type, "LightUserPicture"))
          if (index !== -1 && equals(deviceStore.currentConfig.lightPic, deviceStore.currentLightPic)) {
            deviceStore.setLightPicSimple(
              simpleKey,
              'option' in light
                ? lightLayout.types[index].options?.findIndex(v => equals(v, light.option))
                : 0,
            )
            return
          }
        }
        deviceStore.setLightPic(lightPic)
        //console.error('!!!!!!!!!!!!!!!!!!!')
      },
    }
  })
}

export const logoLightData = () => {
  const { deviceStore } = useStore()
  const deviceName = deviceStore.currentDev
    ? deviceStore.currentDev.deviceType.name
      ? deviceStore.currentDev.deviceType.name
      : 'default'
    : 'default'
  const isLayoutExit = deviceName in res.键鼠坐标

  return useObserver<LightProp>(() => ({
    light:
      deviceStore.currentConfig.logoLight != null
        ? deviceStore.currentConfig.logoLight
        : { type: 'LightOff' },
    lightLayout:
      deviceStore.currentDev?.deviceType.layout === undefined
        ? defaultLayout['light']
        : deviceStore.currentDev?.deviceType.layout['light'],
    setLight: deviceStore.setLogoLightSetting,
    deviceName: deviceName,
    deviceLayout: res.键鼠坐标[isLayoutExit ? deviceName : 'default'],
    lightPic: deviceStore.currentConfig.lightPic
      ? deviceStore.currentConfig.lightPic
      : [],
    setLightPic: (lightPic: UserPicItem[]) => {
      deviceStore.setLightPic(lightPic)
    },
  }))
}

export interface HomeProp {
  dpi: number[]
  dpiLayout: Layout['dpi']
  setDpi: (dpi: number[]) => void
  deviceLayout: { layout: 键鼠布局[]; delt: { deltX: number; deltY: number } }
  deviceName: string
  keyValue: any[]
  reportRate: number
  setReportRate: (rate: 500 | 125 | 1000 | 250) => void
}

export const homeData = () => {
  const { deviceStore } = useStore()
  return useObserver<HomeProp>(() => {
    const dpiLayout = deviceStore.currentDev
      ? deviceStore.currentDev.deviceType.layout
        ? deviceStore.currentDev.deviceType.layout['dpi']
          ? deviceStore.currentDev.deviceType.layout['dpi']
          : {
            count: 0,
            min: 0,
            max: 0,
            delt: 0,
          }
        : {
          count: 0,
          min: 0,
          max: 0,
          delt: 0,
        }
      : {
        count: 0,
        min: 0,
        max: 0,
        delt: 0,
      }

    const deviceName = deviceStore.currentDev
      ? deviceStore.currentDev.deviceType.name
        ? deviceStore.currentDev.deviceType.name
        : 'default'
      : 'default'
    const isLayoutExit = deviceName in res.键鼠坐标

    return {
      dpi: deviceStore.currentConfig.dpi
        ? deviceStore.currentConfig.dpi
        : [500, 500, 500, 500, 500, 500, 500],
      dpiLayout: dpiLayout,
      setDpi: (dpis: number[]) => deviceStore.setDpi(dpis),
      deviceLayout: res.键鼠坐标[isLayoutExit ? deviceName : 'default'],
      deviceName: deviceName,
      keyValue: deviceStore.currentConfig.value
        ? deviceStore.currentConfig.value
        : [],
      reportRate: deviceStore.currentConfig.reportRate
        ? deviceStore.currentConfig.reportRate
        : 125,
      setReportRate: (rate: 500 | 125 | 1000 | 250) =>
        deviceStore.setReportRate(rate),
    }
  })
}
export interface AppUpgradeProp {
  progress: number
  errType: 'error' | 'info'
  errMsg: string
  upgrade: () => void
  close: () => void
}

export const AppUpgradeData = () => {
  const { upgradeStore, toastStore } = useStore()
  return useObserver<AppUpgradeProp>(() => {
    return {
      progress: upgradeStore.upgradeProgressApp,
      errType: toastStore.errType,
      errMsg: toastStore.errMsg,
      upgrade: () => {
        if (upgradeStore.appNeedUpgrade && upgradeStore.appDownloadPath !== undefined) {
          upgradeStore.upgradeApp()
          return
        }

        if (upgradeStore.iotNeedUpgrade && upgradeStore.iotNeedUpgrade !== undefined) {
          upgradeStore.upgradeIot()
          return
        }

        upgradeStore.upgradeApp()
      },
      close: () => store.setState.appUpgrdeOpen(false),
    }
  })
}

export interface DevUpgradeProp {
  deviceType: 'mouse' | 'keyboard' | undefined
  deviceName: string
  version: string
  progress: number
  errType: 'error' | 'info'
  errMsg: string
  upgrade: () => Promise<void>
  close: () => void
}

export const DevUpgradeData = () => {
  const { deviceStore, upgradeStore, toastStore } = useStore()

  return useObserver<DevUpgradeProp>(() => {
    return {
      deviceType: deviceStore.currentDev?.type,
      deviceName: deviceStore.currentDev
        ? deviceStore.currentDev.deviceType.name
          ? deviceStore.currentDev.deviceType.name
          : 'default'
        : 'default',
      version: deviceStore.currentDevVersion,
      progress: upgradeStore.upgradeProgressDev,
      errType: toastStore.errType,
      errMsg: toastStore.errMsg,
      upgrade: () => upgradeStore.upgradeDev(),
      close: () => {
        store.setState.devUpgradeOpen(false)
        upgradeStore.stopCountDwon()
      },
    }
  })
}

export interface SupportProp {
  devVersion: string
  appVersion: string
  checkAppVersion: () => Promise<unknown>
  checkFwVersion: () => Promise<unknown>
  checkIotVersion: () => Promise<unknown>
  devNeedUpgrade: boolean
  upgradeStore: UpgradeStore
}

export const SupportData = () => {
  const { deviceStore, upgradeStore } = useStore()

  return useObserver<SupportProp>(() => {
    return {
      devVersion: deviceStore.currentDevVersion,
      appVersion: upgradeStore.appVersion,
      // checkAppVersion: upgradeStore.checkAppVersion,
      checkAppVersion: async () => { },
      checkFwVersion: upgradeStore.checkFwVersion,
      checkIotVersion: async () => { },
      // checkIotVersion: upgradeStore.checkIotVersion,
      devNeedUpgrade: upgradeStore.devNeedUpgrade,
      upgradeStore: upgradeStore,
    }
  })
}

export const withProps = <T extends { [key: string]: any }>(
  Component: React.FC<T>,
  input: () => T
) => () => <Component {...input()} />
