import { USBDevice } from '../usb/USBDevice'

import { equals } from 'ramda'
import { valueForKey, valueForIndex } from '../../../unitys/tableValueForKey'
import { setBitTo0, getUint8Bit0Index, getBit, setBit } from '../../../unitys/bitOperation'
import { KeyboardInterface } from './KeyboardInterface'
import { MouseKey } from './DeviceInterface'
import { sleep } from '../../../unitys/timeFunc'
import { defaultMatrix_dk2017 } from './dk2017matrix'
import * as fs from 'fs'
import { mobxStore } from '../../../mobxStore/store'
import { res } from '../../../res'
import { arrTo16, numToByte4, specialFunTablectionArr, specialFunTablectionMap } from '../../../res/映射'
import { getDevFnLayer, getDevLayer } from '../../../unitys/getDevLyaer'
import { numToRgb } from '../../../unitys/rgbNum'
import { sendMsg, watchSystemInfo } from '../usb/client'
import { devArr } from '../usb/DetectSupportDevice'


const delay = 500
export type REDATA = {
  profile: number,
  matrix: Buffer | undefined
  marcroBuf: Buffer[]
}
export class Dk2017 extends USBDevice implements KeyboardInterface {

  FEA_CMD_SET_REV = 0x00
  FEA_CMD_GET_REV = 0x80
  FEA_CMD_GET_INFOR = 0x8F
  FEA_CMD_SET_RESERT = 0x0a
  FEA_CMD_GET_BATTERY = 0x83
  FEA_CMD_SET_REPORT = 0x01
  FEA_CMD_GET_REPORT = 0x81
  FEA_CMD_SET_PROFILE = 0x02
  FEA_CMD_GET_PROFILE = 0x82
  FEA_CMD_SET_KBOPTION = 0x03
  FEA_CMD_GET_KBOPTION = 0x83
  FEA_CMD_SET_LEDPARAM = 0x04
  FEA_CMD_GET_LEDPARAM = 0x84
  FEA_CMD_SET_SLEDPARAM = 0x08
  FEA_CMD_GET_SLEDPARAM = 0x88
  FEA_CMD_SET_KEYMATRIX = 0x09
  FEA_CMD_GET_KEYMATRIX = 0x89
  FEA_CMD_SET_KEYENABLE = 0x0A
  FEA_CMD_GET_KEYENABLE = 0x8A
  FEA_CMD_SET_MACRO = 0x0B
  FEA_CMD_GET_MACRO = 0x8B
  FEA_CMD_SET_USERPIC = 0x0C
  FEA_CMD_GET_USERPIC = 0x8C
  FEA_CMD_SET_AUDIO = 0x0E
  FEA_CMD_SET_WINDOS = 0x0F
  G_CMD_LEN = 0x7E
  G_CMD_TEST_MODE = 0x7A
  G_CMD_CHECK_STUTAS = 0x7B
  G_CMD_GET_READY = 0x7C
  FEA_CMD_SET_BOOTLOATER = 0x7F
  FEA_CMD_SET_DEBOUNCE = 0x11
  FEA_CMD_GET_DEBOUNCE = 0x91
  FEA_CMD_SET_SLEEPTIME = 0x12
  FEA_CMD_GET_SLEEPTIME = 0x92
  FEA_CMD_SET_OLEDGIFDATA = 0x24
  FEA_CMD_SETTFTLCDDATA = 0x25
  FEA_CMD_GETTFTLCDDATA = 0xA5
  FEA_CMD_SET_SCREEN_24BITDATA = 0x29
  FEA_CMD_GET_SCREEN_24BITDATA = 0xA9
  FEA_CMD_SET_OLEDOPTION = 0x22

  MACROMAX = 20
  //0x0c45, 0x7044, 0x01, 0xff13
  type: 'keyboard' = 'keyboard'
  defaultMatrix = defaultMatrix_dk2017
  currentProfile: number | undefined = undefined
  allLayerConfigs: {
    isFn: boolean,
    profile: number,
    macro: ConfigMacro
  }[] | undefined = undefined
  reComData: REDATA = {
    profile: 0,
    matrix: undefined,
    marcroBuf: new Array(),
  }
  reFnData: REDATA = {
    profile: 0,
    matrix: undefined,
    marcroBuf: new Array(),
  }
  lightPic: UserPicItem[] | undefined = undefined
  isFn: boolean = false
  fnIndex: number = 0;
  setReDataReSet = () => {
    this.currentProfile = 0
    this.reComData = {
      profile: 0,
      matrix: Buffer.from(this.defaultMatrix),
      marcroBuf: new Array()
    }
    this.reFnData = {
      profile: 0,
      matrix: undefined,
      marcroBuf: new Array()
    }
    this.lightPic = undefined
    this.allLayerConfigs = []
  }
  setScreen = async (uint8ClampedArray: Uint8ClampedArray) => {
    const b = new Array(1)
    b[0] = this.FEA_CMD_SET_WINDOS

    const sendArr = b.concat(...uint8ClampedArray)
    const sendBuf = Buffer.from(sendArr.concat(new Array(64 - sendArr.length)))
    // console.log(sendBuf, uint8ClampedArray)
    const res = this.writeFeatureCmd(sendBuf, 0)
    // console.timeEnd('uint8ClampedArray')
    return res
  }

  setMusicFollow = async (arr: Array<number>, flag: number) => {
    //console.time('uint8array')
    const b = new Array(8)
    b[0] = this.FEA_CMD_SET_AUDIO

    let hanleArr = arr.slice(flag, flag + 32)

    while (hanleArr.filter(v => v !== 0).length < 5 && flag > 0) {
      flag--
      hanleArr = arr.slice(flag, flag + 32)
    }

    const sendArr = b.concat(...hanleArr)

    const sendBuf = Buffer.from(sendArr.concat(new Array(64 - sendArr.length)))
    //console.log(sendBuf, uint8array)
    const res = this.writeFeatureCmd(sendBuf, 0)
    // const light = await this.getLightSetting()
    // console.error("llllllllllllllll", light?.type);

    //console.timeEnd('uint8array')
    return res
  }


  getFirmwareVersion = async () => {
    const b = Buffer.alloc(64)
    b[0] = this.FEA_CMD_GET_REV
    const buf = await this.commomFeature(b)
    //console.log('version', buf)
    return buf?.readUInt16LE(1)
  }
  setReportRate = async (
    rate: 1000 | 500 | 250 | 125,

  ) => {
    let num
    switch (rate) {
      case 1000:
        num = 0x01
        break
      case 500:
        num = 0x02
        break
      case 250:
        num = 0x04
        break
      case 125:
        num = 0x08
        break
      default:
        num = 0x00
        break
    }
    const b = Buffer.alloc(64)
    b[0] = this.FEA_CMD_SET_REPORT
    b[1] = this.currentProfile ? this.currentProfile : 0
    b[2] = num

    return await this.writeFeatureCmd(b)
  }

  getReportRate = async () => {
    const b = Buffer.alloc(64)
    b[0] = this.FEA_CMD_GET_REPORT
    b[1] = this.currentProfile ? this.currentProfile : 0
    const buf = await this.commomFeature(b)
    const num = buf?.readUInt8(2)
    switch (num) {
      case 0x01:
        return 1000
      case 0x02:
        return 500
      case 0x04:
        return 250
      case 0x08:
        return 125

      default:
        return 'err'
    }
  }
  //0-7
  setCurrentProfile = async (profile: number = 0) => {
    const b = Buffer.alloc(64)
    b[0] = this.FEA_CMD_SET_PROFILE
    b[1] = profile

    const res = await this.writeFeatureCmd(b)
    if (res) {
      this.currentProfile = profile
      await sleep(500)
      return true
    }
    return false
  }

  getCurrentProfile = async () => {
    // if (this.currentProfile !== undefined)
    //   return this.currentProfile
    // else {
    const b = Buffer.alloc(64)
    b[0] = this.FEA_CMD_GET_PROFILE
    const buf = await this.commomFeature(b)
    if (buf === undefined) return undefined
    const num = buf.readUInt8(1)
    if (num != undefined && num >= 0) this.currentProfile = num
    return num
    // }
  }
  /*
    Bit0: Win Key App Key Lock Control   0: unlock/1: lock
    Bit1: Keyboard Lock Control
    Bit2: WASD Key and Arrow Key Exchange
    Bit3: Win Key and Fn Key Exchange
    Bit4: Repeat Key
    Bit5: Reserve
    Bit6: Reserve
    Bit7: Reserve
    */

  setKeyboardOption = async (option: KeyboardOption) => {
    const b = Buffer.alloc(64)
    b[0] = this.FEA_CMD_SET_KBOPTION
    b[1] = this.currentProfile ? this.currentProfile : 0

    const byte1_bit0 = Number(option.winKeyLockControl)
    const byte1_bit2 = Number(option.system)
    const byte1_bit3 = Number(option.wasdKeyAndArrowKeyExchange)
    const byte1_bit4 = Number(option.ledOff)
    const byte1_bit5 = Number(option.sLedOff)
    const byte1_bit6 = Number(option.keyboardMode)
    const byte1_bit7 = Number(option.keyboardLockControl)

    const byte2_bit0 = Number(option.keyboardFnKeyMatrix)

    b[2] = byte1_bit0
      | (0 << 1)
      | (byte1_bit2 << 2)
      | (byte1_bit3 << 3)
      | (byte1_bit4 << 4)
      | (byte1_bit5 << 5)
      | (byte1_bit6 << 6)
      | (byte1_bit7 << 7)

    b[3] = byte2_bit0

    return await this.writeFeatureCmd(b)
  }

  getKeyboardOption = async () => {
    const b = Buffer.alloc(64)
    b[0] = this.FEA_CMD_GET_KBOPTION
    b[1] = this.currentProfile ? this.currentProfile : 0
    const buf = await this.commomFeature(b)

    const byte_1 = buf?.readUInt8(2)
    const byte_2 = buf?.readUInt8(3)
    const byte_3 = buf?.readUInt8(4)
    if (byte_1 === undefined || byte_2 === undefined) return
    const keyboardOption: KeyboardOption = {
      winKeyLockControl: !!(byte_1 & 0b1),
      system: !!((byte_1 & 0b10) + (byte_1 & 0b100)),
      wasdKeyAndArrowKeyExchange: !!(byte_1 & 0b1000),
      ledOff: !!(byte_1 & 0b10000),
      sLedOff: !!(byte_1 & 0b100000),
      keyboardMode: !!(byte_1 & 0b1000000),
      keyboardLockControl: !!(byte_1 & 0b10000000),
      keyboardFnKeyMatrix: !!(byte_2 & 0b1),
      powerSaveMode: Boolean(byte_3)
    }

    return keyboardOption
  }
  //brightness 0~6
  setLightSetting = async (lightSet: dk2017LightSetting) => {
    const b = Buffer.alloc(64)
    b[0] = this.FEA_CMD_SET_LEDPARAM

    let effect: number = 0
    let speed: number = 0
    let brightness: number = 0
    let option: number = 0

    switch (lightSet.type) {
      case 'LightOff':
        effect = 0x00
        break
      case 'LightAlwaysOn':
        effect = 0x01
        brightness = lightSet.value
        break
      case 'LightBreath':
        effect = 0x02
        speed = lightSet.speed
        break
      case 'LightWave':
        effect = 0x03
        speed = lightSet.speed
        option = lightSet.option === 'right' ? 0 : 1
        break
      case 'LightRipple':
        effect = 0x04
        speed = lightSet.speed
        option = lightSet.option === 'full' ? 0 : 1
        break
      case 'LightRaindrop':
        effect = 0x05
        speed = lightSet.speed
        break
      case 'LightSnake':
        effect = 0x06
        speed = lightSet.speed
        option = lightSet.option === 'z' ? 0 : 1
        break
      case 'LightPressAction':
        effect = 0x07
        speed = lightSet.speed
        option = lightSet.option === 'onToOff' ? 0 : 1
        break
      case 'LightConverage':
        effect = 0x08
        speed = lightSet.speed
        break
      case 'LightUserPicture':
        effect = 0x09
        option = 0
        break
      default:
        break
    }

    b[1] = effect
    b[2] = 5 - speed
    b[3] = brightness
    b[4] = option

    return await this.writeFeatureCmd(b)
  }

  getLightSetting = async (): Promise<LightSetting | undefined> => {
    const b = Buffer.alloc(64)
    b[0] = this.FEA_CMD_GET_LEDPARAM
    const buf = await this.commomFeature(b)
    if (buf === undefined) return undefined
    const effect = buf[1]
    const speed = 5 - buf[2]
    const brightness = buf[3]
    const option = buf[4]
    //console.log('!!!!!', effect, option)
    switch (effect) {
      case 0:
        return {
          type: 'LightOff',
        }
      case 1:
        return {
          type: 'LightAlwaysOn',
          value: brightness,
          rgb: 0,
        }
      case 2:
        return {
          type: 'LightBreath',
          value: 0,
          speed: speed,
          rgb: 0,
        }
      case 3:
        return {
          type: 'LightWave',
          value: 0,
          speed: speed,
          option: option === 0 ? 'right' : 'left',
        }
      case 4:
        return {
          type: 'LightRipple',
          value: 0,
          speed: speed,
          option: option === 0 ? 'full' : 'single',
        }
      case 5:
        return {
          type: 'LightRaindrop',
          value: 0,
          speed: speed,
        }
      case 6:
        return {
          type: 'LightSnake',
          value: 0,
          speed: speed,
          option: option === 0 ? 'z' : 'return',
        }
      case 7:
        return {
          type: 'LightPressAction',
          value: 0,
          speed: speed,
          option: option === 0 ? 'onToOff' : 'offToOn',
        }
      case 8:
        return {
          type: 'LightConverage',
          value: 0,
          speed: speed,
        }
      case 9:
        return {
          type: 'LightUserPicture',
          value: 0,
        }
      default:
        return undefined
    }
  }

  setMode = async (mode: 'gaming' | 'normal', profile: number = 0) => {
    const b = Buffer.alloc(64)
    b[0] = 0x05
    b[1] = profile
    b[2] = mode === 'gaming' ? 1 : 0
    return await this.writeFeatureCmd(b)
  }

  getMode = async (profile: number = 0) => {
    const b = Buffer.alloc(64)
    b[0] = 0x85
    b[1] = profile
    const buf = await this.commomFeature(b)
    const num = buf?.readUInt8(2)
    if (num === undefined) return num
    return num === 0 ? 'normal' : 'gaming'
  }
  getAllLayerMacros = async () => {
    const layer = getDevLayer(this.deviceType!.id!) === 0 ? 1 : getDevLayer(this.deviceType!.id!)
    const allLayerConfigs: {
      isFn: boolean,
      profile: number,
      macro: ConfigMacro
    }[] = []

    const profile = this.currentProfile === undefined ? 0 : this.currentProfile
    for (let i = 0; i < layer; i++) {
      let c
      if (!this.isFn && i === profile && this.reComData.matrix) {
        const matrix = new Array<number>()
        for (let i = 0; i < this.reComData.matrix?.length; i++) {
          matrix.push(this.reComData.matrix[i])
        }
        c = await this.matrixToConfigValues(matrix, false)
      } else
        c = await this.getKeyConfig(i, true)
      if (c === undefined) continue
      c.map(v => {
        if (v.type === 'ConfigMacro') {
          allLayerConfigs.push({
            isFn: false,
            profile: i,
            macro: v
          })
        }
      })
      if (this.deviceType.is24 || this.deviceType.isblue)
        await sleep(5) // 避免菊花超时
    }

    const fnLayer = getDevFnLayer(this.deviceType!.id!)
    for (let i = 0; i < fnLayer; i++) {
      const c = await this.getFnKeyConfig(i, true)
      if (c === undefined) continue
      c.map(v => {
        if (v.type === 'ConfigMacro') {
          allLayerConfigs.push({
            isFn: false,
            profile: i,
            macro: v
          })
        }
      })
      if (this.deviceType.is24 || this.deviceType.isblue)
        await sleep(5) // 避免菊花超时
    }

    this.allLayerConfigs = allLayerConfigs
    return allLayerConfigs
  }

  configsToMatrix = async (configs: ConfigValue[]) => {
    const profile = this.currentProfile === undefined ? 0 : this.currentProfile
    const macros = [...(configs.filter((v) => v.type === 'ConfigMacro') as ConfigMacro[])]
    configs.map(v => {
      v.type === 'ConfigMacro' && (v.macroIndex = undefined)
    })

    if (macros.length > this.MACROMAX && configs[configs.length - 1].type === 'ConfigMacro') {
      // throw Error('宏最多写入20条')

      mobxStore.toastStore.setErr(res.text.宏最多写入20条())
      return
    }

    if (this.allLayerConfigs !== undefined) {
      let index = this.allLayerConfigs.findIndex(v =>
        v.isFn === this.isFn
        && (this.isFn ? v.profile === this.fnIndex : v.profile === profile)
        && !macros.some(mv => equals(v.macro.index, mv.index)
          && equals(v.macro.macro, mv.macro)
          && equals(v.macro.macroType, mv.macroType)
          && equals(v.macro.original, mv.original)
          && equals(v.macro.repeatCount, mv.repeatCount)
          && equals(v.macro.type, mv.type)))
      while (index !== -1) {
        this.allLayerConfigs.splice(index, 1)
        index = this.allLayerConfigs.findIndex(v =>
          v.isFn === this.isFn
          && (this.isFn ? v.profile === this.fnIndex : v.profile === profile)
          && !macros.some(mv => equals(v.macro.index, mv.index)
            && equals(v.macro.macro, mv.macro)
            && equals(v.macro.macroType, mv.macroType)
            && equals(v.macro.original, mv.original)
            && equals(v.macro.repeatCount, mv.repeatCount)
            && equals(v.macro.type, mv.type)))
      }
    }
    const canUseMacroIndexs = new Array<number>()
    if (this.allLayerConfigs === undefined) {
      this.allLayerConfigs = await this.getAllLayerMacros()
    }

    console.error("ALLLAYERCONGIGS: ", this.allLayerConfigs.map(v => ({
      isFn: v.isFn,
      profile: v.profile,
      macro: v.macro
    })));

    const ams = [...this.allLayerConfigs]
    if (macros.length > 0) {
      for (let i = 0; i < ams.length; i++) {
        const macro = ams[i].macro
        if (macro.macroIndex === undefined) continue;
        if (macro.macroIndex > this.MACROMAX) continue;
        canUseMacroIndexs.push(macro.macroIndex)
      }
    }

    for (let i = 0; i < macros.length; i++) {
      const macro = macros[i]

      if (!ams.some(av => av.isFn === this.isFn && (this.isFn ? av.profile === this.fnIndex : av.profile === profile) && (equals(av.macro.index, macro.index)
        && equals(av.macro.macro, macro.macro)
        && equals(av.macro.macroType, macro.macroType)
        && equals(av.macro.original, macro.original)
        && equals(av.macro.repeatCount, macro.repeatCount)
        && equals(av.macro.type, macro.type))
      )) {
        ams.push({
          isFn: this.isFn,
          profile: this.isFn ? this.fnIndex : profile,
          macro: macro
        })
      }
    }

    if (ams.length > this.MACROMAX) {
      mobxStore.toastStore.setErr(res.text.宏最多写入20条())
      return
    }

    const allChangeArr: {
      changeArr: number[],
      orginHid: number,
      index?: number
    }[] = []
    for (let i = 0; i < configs.length; i++) {
      let changeArr: number[] = [0, 0, 0, 0]
      const config = configs[i]
      switch (config.type) {
        case 'forbidden':
          changeArr = [0, 0, 0, 0]
          break
        case 'combo':
          // 特殊按键恢复默认
          if (specialFunTablectionArr.findIndex(v => arrTo16(v) === config.original && arrTo16(v) === config.key) === -1) {
            changeArr = [0, skeyToHidTable[config.skey], config.key, config.key2]
          } else {
            changeArr = [...numToByte4(config.key)]
          }
          break
        case 'ConfigChangeToMouseBtn':
          if (mouseKeyTable[config.key] !== undefined)
            changeArr = [...mouseKeyTable[config.key]]
          break
        case 'ConfigFunction':
          changeArr = [...specialFunTablectionMap[config.key]]
          break
        case 'ConfigUnknown':
          changeArr = [...config.value]
          break
        case 'ConfigMacro':
          let mt: number
          switch (config.macroType) {
            case 'repeat_times':
              mt = 0
              break
            case 'touch_repeat':
              mt = 2
              break
            case 'on_off':
              mt = 1
              break
            default:
              mt = 0
              break
          }
          /**
           * config里不存在macroIndex  未下载过该宏
           */
          if (!this.allLayerConfigs.some(v => v.isFn === this.isFn
            && (this.isFn ? v.profile === this.fnIndex : v.profile === profile)
            && (equals(v.macro.index, config.index)
              && equals(v.macro.macro, config.macro)
              && equals(v.macro.macroType, config.macroType)
              && equals(v.macro.original, config.original)
              && equals(v.macro.repeatCount, config.repeatCount)
              && equals(v.macro.type, config.type)))) {
            if (config.macroIndex === undefined) {
              console.error("MMMM-1111");
              let index = 0
              while (index >= this.MACROMAX || changeArr[0] !== 0x09) {
                if (canUseMacroIndexs.some(v => v === index)) {
                  index++
                } else {
                  canUseMacroIndexs.push(index)
                  changeArr = [9, mt, index, 0]
                  config.macroIndex = index
                  this.allLayerConfigs.push({
                    isFn: this.isFn,
                    profile: this.isFn ? this.fnIndex : profile,
                    macro: config
                  })
                  if (!(await this.setMacro(config, index)))
                    throw Error('写入宏失败')
                }
              }
            }
          } else {
            console.error("MMMM-2222");
            const sameConfig = this.allLayerConfigs.find(v =>
              equals(v.macro.index, config.index)
              && equals(v.macro.macro, config.macro)
              && equals(v.macro.macroType, config.macroType)
              && equals(v.macro.original, config.original)
              && equals(v.macro.repeatCount, config.repeatCount)
              && equals(v.macro.type, config.type))?.macro
            if (sameConfig !== undefined) {
              console.error("MMMM-3333");
              if (sameConfig.macroIndex !== undefined) {
                console.error("MMMM-4444");
                changeArr = [9, mt, sameConfig.macroIndex, 0]
                config.macroIndex = sameConfig.macroIndex
              }
            }
          }

          console.error("CCCCCAAAAARRRRR: ", changeArr);
          if (equals(changeArr, [0, 0, 0, 0])) break;
          // 查询宏的位置
          const tmp = this.allLayerConfigs?.findIndex(v => (this.isFn ? v.profile === this.fnIndex : v.profile === profile)
            && v.macro.original === config.original && this.isFn === v.isFn)

          const tmpConfig: ConfigMacro = {
            index: config.index,
            macro: config.macro,
            macroIndex: config.macroIndex,
            macroType: config.macroType,
            original: config.original,
            repeatCount: config.repeatCount,
            type: config.type,
          }
          if (tmp !== undefined && tmp !== -1 && this.allLayerConfigs) {
            this.allLayerConfigs[tmp] = {
              isFn: this.isFn,
              profile: this.isFn ? this.fnIndex : profile,
              macro: tmpConfig
            }
          } else {
            this.allLayerConfigs?.push({
              isFn: this.isFn,
              profile: this.isFn ? this.fnIndex : profile,
              macro: tmpConfig
            })
          }
          break
        default:
          changeArr = [0, 0, 0, 0]
          break
      }

      allChangeArr.push({
        changeArr: changeArr,
        orginHid: config.original,
        index: config.index
      })
    }

    console.error("ALLLAYERCONGIGS-END: ", this.allLayerConfigs.map(v => ({
      isFn: v.isFn,
      profile: v.profile,
      macro: v.macro
    })));

    const matrix = this.changeAllConfig(allChangeArr)
    console.log('下命令 ! ! ! : ', matrix)
    return matrix
  }

  setKeyConfig = async (configs: ConfigValue[]) => {
    this.isFn = false
    const matrix = await this.configsToMatrix(configs)
    if (matrix === undefined) return undefined
    this.reComData.matrix = Buffer.from(matrix)
    return await this._setKeyConfig(matrix)
  }
  setFnKeyConfig = async (configs: ConfigValue[], fnindex: number) => {
    this.isFn = true
    this.fnIndex = fnindex
    const matrix = await this.configsToMatrix(configs)
    if (matrix === undefined) return undefined
    this.reFnData.matrix = Buffer.from(matrix)
    return await this._setFnKeyConfig(matrix, fnindex)
  }

  protected _setFnKeyConfig = async (matrix: number[], fnindex: number) => {
    //console.error('1111111')
    const b = new Array(8).fill(0)
    b[0] = 0x10
    b[1] = fnindex
    b[2] = 0xf8
    b[3] = 0x01
    /////

    ////
    //console.log('下命令 ！！！：', matrix)
    for (let i = 0; i < 9; i++) {
      b[4] = i

      let ms = matrix.slice(i * 56, 56 + i * 56)
      if (ms.length < 56) {
        ms = ms.concat(new Array(56 - ms.length).fill(0))
      }
      //console.error('SSSSS', b, b.concat(ms))
      let sum = 0
      for (let n = 0; n < 7; n++) {
        sum += b[n]
      }
      b[7] = 255 - (sum & 0xff)
      const buf = Buffer.from(b.concat(ms))
      const sucess = await this.writeFeatureCmd(buf)

      if (!sucess) return false
    }
    await sleep(50)
    return true
  }

  protected _setKeyConfig = async (matrix: number[]) => {
    const b = Buffer.alloc(64)
    b[0] = 0x06
    b[1] = this.currentProfile ? this.currentProfile : 0
    b[2] = 0xc0
    b[3] = 0x01
    /////
    const h = await this.writeFeatureCmd(b)
    if (!h) return undefined
    ////
    //console.log('下命令 ！！！：', matrix)
    for (let i = 0; i < 7; i++) {

      // console.log('第', i, '条', i * 64, ' : ', 64 + i * 64, matrix.slice(i * 64, 64 + i * 64))
      const buf = Buffer.from(matrix.slice(i * 64, 64 + i * 64))
      const sucess = await this.writeFeatureCmd(buf)
      if (!sucess) return false
    }
    return true
  }
  /*
  /////
  //fn 键暂时先不改 后面再说， 协议里有 但是 码比较特殊(已处理)
  // 协议 不支持 狙击键 和 火力键
  setKeyMatrix = async (config: ConfigValue, profile: number = 0) => {
    const currentMatrix = await this._getKeyMatrix(profile)
    // console.log('currentMatrix :', currentMatrix)
    if (currentMatrix === undefined) return undefined
    if (currentMatrix.length != 448) return undefined
    const b = Buffer.alloc(64)
    b[0] = 0x06
    b[1] = profile
    b[2] = 0xc0
    b[3] = 0x01

    let changeArr: Array<number>
    let macroIndex = 0
    switch (config.type) {
      case 'forbidden':
        changeArr = [0, 0, 0, 0]
        break
      case 'combo':
        changeArr = [0, skeyToHidTable[config.skey], config.key, config.key2]
        break
      case 'ConfigChangeToMouseBtn':
        changeArr = [...mouseKeyTable[config.key]]
        break
      case 'ConfigFunction':
        changeArr = [...specialFunTablectionMap[config.key]]
        break
      case 'ConfigMacro':
        const configs = await this.matrixToConfigValues([...currentMatrix])
        const macros = configs.filter((v) => v.type === 'ConfigMacro')
        macroIndex = macros.length
        //console.log('macroIndex', macroIndex)
        if (macros.length > 19) return Error('宏最多写入19条')
        let mt: number
        switch (config.macroType) {
          case 'repeat_times':
            mt = 0
            break
          case 'touch_repeat':
            mt = 1
            break
          case 'on_off':
            mt = 2
            break
          default:
            mt = 0
            break
        }
        changeArr = [9, mt, macroIndex, 0]
        //console.log(changeArr)
        //写入宏
        if (!(await this.setMacro(config, macroIndex)))
          return Error('写入宏失败')
        //macroIndex++
        break
      default:
        changeArr = [0, 0, 0, 0]
        break
    }
    const matrix = changeMatrix(config.original, changeArr, [...currentMatrix])

    if (matrix === undefined) return undefined

    /////
    const h = await this.writeFeatureCmd(b)
    if (!h) return undefined
    ////
    console.log('下命令 ！！！：', matrix)
    for (let i = 0; i < 7; i++) {
      // console.log('第', i, '条', i * 64, ' : ', 64 + i * 64, matrix.slice(i * 64, 64 + i * 64))
      const buf = Buffer.from(matrix.slice(i * 64, 64 + i * 64))
      const sucess = await this.writeFeatureCmd(buf)
      if (!sucess) return false
    }

    return true
  }*/

  getKeyConfig = async (profile?: number, manual: boolean = false) => {
    let buf: Buffer | undefined
    if (this.reComData.matrix && this.reComData.profile === this.currentProfile && !manual)
      buf = this.reComData.matrix
    else
      buf = await this._getKeyMatrix(profile)
    if (buf === undefined) return undefined
    console.log('读出来的 matirx', buf)

    if (!manual || (!this.isFn && profile === this.currentProfile)) {
      this.reComData.matrix = buf
      this.reComData.profile = this.currentProfile ? this.currentProfile : 0
    }

    return await this.matrixToConfigValues([...buf], false)
  }
  getFnKeyConfig = async (fnindex: number, manual: boolean = false) => {
    this.fnIndex = fnindex
    let buf: Buffer | undefined
    // if (manual) {
    //   buf = await this._getFnKeyMatrix(fnindex)
    // } else {
    //   if (this.reFnData.matrix && this.reFnData.profile === fnindex)
    //     buf = this.reFnData.matrix
    //   else
    buf = await this._getFnKeyMatrix(fnindex)
    // }
    if (buf === undefined) return undefined
    console.log('读出来的 matirx2', buf)

    this.reFnData.matrix = buf
    this.reFnData.profile = fnindex
    return await this.matrixToConfigValues([...buf], true)
  }

  protected async _getFnKeyMatrix(fnidex: number) {
    const b = Buffer.alloc(64)
    b[0] = 0x90
    b[1] = fnidex

    let res = Buffer.alloc(0)
    for (let i = 0; i < 8; i++) {
      b[2] = i
      const buf = await this.commomFeature(b, 0)

      //if (buf === undefined) return undefined
      //const b1 = await this.readFeatureCmd(10)
      //console.error('BBBBBB', b, b[2])
      if (buf === undefined) throw '_getFnKeyMatrix !!!undefine'

      res = Buffer.concat([res, buf])
    }
    return res
  }

  protected async _getKeyMatrix(profile?: number) {
    const b = Buffer.alloc(64)
    b[0] = 0x86
    b[1] = profile !== undefined
      ? profile
      : this.currentProfile
        ? this.currentProfile
        : 0
    const buf = await this.commomFeature(b)

    if (buf === undefined) return undefined
    let res = Buffer.alloc(0)
    for (let i = 0; i < 7; i++) {
      const b = await this.readFeatureCmd(100)
      //console.error('BBBBBB', i, b)
      if (b === undefined) throw '_getKeyMatrix !!!undefine'

      if (b != undefined) res = Buffer.concat([res, b])
    }
    return res
  }
  checkMacroLenthIsFull = (marcoArr: MacroEvent[]) => {
    let bufIndex = 0
    bufIndex += 2
    let needDely = false

    for (let i = 0; i < marcoArr.length; i++) {

      const setAttr = (cur: MouseButton | MouseMove | KeyBoard) => {
        let attrNum = 0
        if (i + 1 < marcoArr.length) {
          const m = marcoArr[i + 1]
          if (m.type === 'delay' && m.value <= 127) {
            attrNum = m.value
          }
        }

        if (cur.type !== 'mouse_move')
          attrNum = (attrNum << 1) | (cur.action === 'down' ? 1 : 0)
        bufIndex++
        needDely = true
        if (attrNum > 1) {
          needDely = false
          i++
        }
      }
      const tmpME = marcoArr[i]

      if (tmpME.type !== 'delay' && needDely === true) {
        bufIndex += 2
      }
      switch (tmpME.type) {
        case 'delay':
          if (needDely) {
            bufIndex += 2
          } else {
            bufIndex += 2
            bufIndex += 2
          }
          needDely = false
          break
        case 'keyboard':
          bufIndex++
          needDely = true//写这里为了消除警告 tslint bug
          setAttr(tmpME)
          break
        case 'mouse_button':
          bufIndex++
          setAttr(tmpME)
          break
        case 'mouse_move':
          bufIndex++
          setAttr(tmpME)
          bufIndex++
          bufIndex++
          break
        default:
          break
      }
      if (bufIndex >= 256 - 8) return true
      //console.log('第i次 buf', buf, i, needDely, tmpME)
    }
    return false
  }
  setMacro = async (macros: ConfigMacro, index: number) => {

    console.log('setMacrosetMacrosetMacrosetMacrosetMacrosetMacrosetMacrosetMacrosetMacro', macros)


    const marcoArr: MacroEvent[] = macros.macro

    const buf = Buffer.alloc(256)
    let bufIndex = 0
    //写入重复次数
    buf.writeUInt16LE(macros.repeatCount, 0)
    bufIndex += 2
    let needDely = false
    //
    console.log('marcoArrmarcoArrmarcoArrmarcoArr', marcoArr)
    for (let i = 0; i < marcoArr.length; i++) {

      const setAttr = (cur: MouseButton | MouseMove | KeyBoard) => {
        let attrNum = 0
        if (i + 1 < marcoArr.length) {
          const m = marcoArr[i + 1]
          if (m.type === 'delay' && m.value <= 127) {
            attrNum = m.value
          }
        }
        if (cur.type !== 'mouse_move')
          attrNum = cur.action === 'down' ? setBit(attrNum, 7, 1) : setBit(attrNum, 7, 0)
        console.log('attrNum :', attrNum)
        buf.writeUInt8(attrNum, bufIndex)
        bufIndex++
        needDely = true
        if ((attrNum & 0x7f) > 0) {
          needDely = false
          i++
        }

      }
      const tmpME = marcoArr[i]
      console.log('tmpMEtmpMEtmpMEtmpMEtmpME', tmpME, i, needDely)
      if (tmpME.type !== 'delay' && needDely === true) {
        buf.writeUInt16LE(0, bufIndex) //必须有间隔
        bufIndex += 2
      }


      switch (tmpME.type) {
        case 'delay':
          if (needDely) {
            buf.writeUInt16LE(tmpME.value, bufIndex)
            bufIndex += 2
          } else {
            buf.writeUInt16LE(0, bufIndex)
            bufIndex += 2
            buf.writeUInt16LE(tmpME.value, bufIndex)
            bufIndex += 2
          }
          needDely = false
          break
        case 'keyboard':
          buf.writeUInt8(tmpME.value, bufIndex)
          bufIndex++
          needDely = true//写这里为了消除警告 tslint bug
          setAttr(tmpME)
          break
        case 'mouse_button':
          buf.writeUInt8(mouseKeyTable[tmpME.value][2], bufIndex)
          bufIndex++
          setAttr(tmpME)
          break
        case 'mouse_move':
          /*v1
                    0x00 0xf9 [   0x00 0x00  ]
                    Y    X    [  delay       ]
          */
          /*v2
                    xy:
                    
                    delay<127
                    
                    0xf9  | delay | x | y
                    
                    delay>= 127
                    
                    0xf9 | 0 | x | y | delay_L | delay_H

          */
          buf.writeUInt8(0xf9, bufIndex)
          bufIndex++
          setAttr(tmpME)
          buf.writeInt8(tmpME.dx, bufIndex)
          bufIndex++
          buf.writeInt8(tmpME.dy, bufIndex)
          bufIndex++
          break
        default:
          break
      }
      //console.log('第i次 buf', buf, i, needDely, tmpME)
    }
    //

    // console.error('11111111111 L   ::: ', buf)
    console.log('写入的红', [...buf].map(v => v.toString(16)))

    if (this.isFn)
      this.reFnData.marcroBuf[index] = buf
    else
      this.reComData.marcroBuf[index] = buf
    return await this._setMacro(buf, index)
  }
  protected _setMacro = async (buf: Buffer, index: number) => {
    const b = Buffer.alloc(64)
    b[0] = 0x08
    b[1] = index
    b[2] = 0x00
    b[3] = 0x01
    const h = await this.writeFeatureCmd(b)
    if (h === false) return false
    for (let i = 0; i < 4; i++) {

      const bufS = Buffer.from([...buf.slice(i * 64, 64 + i * 64)])

      const sucess = await this.writeFeatureCmd(bufS)

      if (!sucess) return false
    }
    return true
  }
  //关掉 按键 的 hid 数组
  setLightPic = async (pic: UserPicItem[]) => {
    const b = Buffer.alloc(64)
    b[0] = 0x09
    b[1] = 0
    b[2] = 0x14
    b[3] = 0x00

    const buf = Buffer.alloc(64).fill(0x00)
    const indexArr = pic.map((v) => this.findIndexInDefaultMatrix(v.hid))
    console.log('user pic indexArr', pic, indexArr)
    for (let i = 0; i < indexArr.length; i++) {
      const index = indexArr[i]
      //console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', index)
      if (index === undefined)
        continue
      // throw Error('setLightPic 没有找到对应的hid')
      const n = buf.readUInt8(Math.floor(index / 8))
      buf.writeUInt8(setBitTo0(n, index % 8), Math.floor(index / 8))
    }
    //
    const h = await this.writeFeatureCmd(b)
    if (h === false) return false
    console.log('BBBBUUUUFFFF', buf)

    const res = await this.writeFeatureCmd(buf)
    if (res) {
      this.lightPic = pic
    }
    return res
  }

  getLightPic = async () => {
    const b = Buffer.alloc(64)
    b[0] = 0x89
    b[1] = 0

    const buf = await this.commomFeature(b, 0)
    if (buf === undefined) return buf

    const res = await this.readFeatureCmd()
    if (res === undefined) return undefined

    console.log('RRRREEEESSSS ', res)
    let hidArr: number[] = []

    for (let i = 0; i < res.length; i++) {
      const resI = res[i]
      if (resI !== 0xff) {
        const indexArr = getUint8Bit0Index(resI)
        //console.log('getUint8Bit0Index!!!!!', indexArr)
        hidArr = hidArr.concat(indexArr.map((v) => {
          //console.log('findHidWithIndexInMatrix', v + i * 8, '------->>>>', this.findHidWithIndexInMatrix(v + i * 8))
          return this.findHidWithIndexInMatrix(v + i * 8)
        }))
      }
    }
    // console.log('PICPIChidArrhidArrhidArrhidArr!!!!!', hidArr.filter(v => v !== undefined).map(v => {
    //   return {
    //     hid: v,
    //     rgb: 0
    //   }
    // }))

    const tmp = hidArr.filter(v => v !== undefined).map(v => {
      return {
        hid: v,
        rgb: 0
      }
    })
    this.lightPic = tmp
    return tmp

  }
  getMacro = async (index: number) => {
    let res = Buffer.alloc(0)
    if (this.isFn) {
      if (this.reFnData.marcroBuf[index] === undefined) {
        const b = Buffer.alloc(64)
        b[0] = 0x88
        b[1] = index
        const buf = await this.commomFeature(b)
        if (buf === undefined) return undefined
        for (let i = 0; i < 4; i++) {
          const b = await this.readFeatureCmd()
          if (b != undefined) res = Buffer.concat([res, b])
        }
        this.reFnData.marcroBuf[index] = res
      } else {
        res = this.reFnData.marcroBuf[index]
      }
    } else {
      if (this.reComData.marcroBuf[index] === undefined) {
        const b = Buffer.alloc(64)
        b[0] = 0x88
        b[1] = index
        const buf = await this.commomFeature(b)
        if (buf === undefined) return undefined
        for (let i = 0; i < 4; i++) {
          const b = await this.readFeatureCmd()
          if (b != undefined) res = Buffer.concat([res, b])
        }
        this.reComData.marcroBuf[index] = res
      } else {
        res = this.reComData.marcroBuf[index]
      }
    }
    return this.buffToMacroEvents(res)
  }
  setReSet = async () => {
    const b = Buffer.alloc(64)
    b[0] = this.FEA_CMD_SET_RESERT
    const res = await this.writeFeatureCmd(b)
    if (res) {
      this.currentProfile = 0
      this.reComData = {
        profile: 0,
        matrix: Buffer.from(this.defaultMatrix),
        marcroBuf: new Array()
      }
      this.reFnData = {
        profile: 0,
        matrix: undefined,
        marcroBuf: new Array()
      }
      this.lightPic = undefined
      this.allLayerConfigs = []
    }
    return res
  }


  matrixToConfigValues = async (matrix: Array<number>, isFn: boolean) => {
    if (matrix.length !== this.defaultMatrix.length) return []
    const configArr: Array<ConfigValue> = []
    for (let i = 0; i < matrix.length; i += 4) {
      const nArr4 = matrix.slice(i, i + 4)
      const dArr4 = this.defaultMatrix.slice(i, i + 4)
      let index: number = 0
      if (!equals(nArr4, dArr4)) {
        for (let j = 0; j < i; j += 4) {
          if (equals(dArr4, this.defaultMatrix.slice(j, j + 4))) {
            index++
          }
        }
        let orginHid = dArr4[2]
        //功能键 判断
        const tmpArr = specialFunTablectionArr.find(v => equals(v, dArr4))
        if (tmpArr) {
          orginHid = arrTo16(tmpArr)
        }
        // if (equals(dArr4, [0x0a, 0x01, 0, 0])) {
        //   orginHid = 0x0a010000
        // }
        const tmpArr2 = specialFunTablectionArr.find(v => equals(v, nArr4))
        if (equals(nArr4, [0, 0, 1, 0])) {
          configArr.push({
            type: 'ConfigUnknown',
            original: orginHid,
            value: nArr4
          })
        } else if (equals(nArr4, [0, 0, 0, 0])) {
          //禁用
          configArr.push({
            type: 'forbidden',
            original: orginHid,
            index: index === 0 ? undefined : index
          })
        } else if (nArr4[0] === 0) {
          //组合键[0, skeyToHidTable[config.skey], config.key, config.key2]
          configArr.push({
            type: 'combo',
            original: orginHid,
            skey: valueForKey(skeyToHidTable, nArr4[1])!, // as SpecialKey,
            key: nArr4[2],
            key2: nArr4[3],
            index: index === 0 ? undefined : index
          })
        } else if (nArr4[0] === 1) {
          //鼠标键 [...mouseKeyTable[config.key]]
          configArr.push({
            type: 'ConfigChangeToMouseBtn',
            original: orginHid,
            key: valueForIndex(mouseKeyTable, nArr4)!, //Number(valueForKey(mouseKeyTable, nArr4))
            index: index === 0 ? undefined : index
          })
        } else if (nArr4[0] === 3 || nArr4[0] === 0x0a || nArr4[0] === 0x0d || nArr4[0] === 0x0e || nArr4[0] === 0x12 || nArr4[0] === 0x08 || nArr4[0] === 0x13) {
          //特殊功能 [...specialFunTablectionMap[config.key]]
          const p = valueForKey(specialFunTablectionMap, [...nArr4])
          if (p === undefined) {
            configArr.push({
              type: 'ConfigUnknown',
              original: orginHid,
              value: nArr4,
              index: index === 0 ? undefined : index
            })
          } else {
            configArr.push({
              type: 'ConfigFunction',
              original: orginHid,
              key: p, // as CommonSpecialFuntion
              index: index === 0 ? undefined : index
            })
          }

        } else if (nArr4[0] === 9) {
          //宏
          let mt: MacroRepeatType
          switch (nArr4[1]) {
            case 0:
              mt = 'repeat_times'
              break
            case 2:
              mt = 'touch_repeat'
              break
            case 1:
              mt = 'on_off'
              break
            default:
              mt = 'repeat_times'
              break
          }
          let macroEventArr

          const res = await this.getMacro(nArr4[2])
          if (res !== undefined)
            macroEventArr = res

          configArr.push({
            type: 'ConfigMacro',
            original: orginHid,
            macro: macroEventArr === undefined ? [] : macroEventArr.macroEvents,
            macroType: mt,
            repeatCount: macroEventArr === undefined ? 0 : macroEventArr.repeatCount,
            index: index === 0 ? undefined : index,
            macroIndex: nArr4[2]
          })
        }
        else if (tmpArr2 && equals(nArr4, tmpArr2)) {
          configArr.push({
            type: 'combo',
            original: orginHid,
            skey: 'none',
            key: arrTo16(tmpArr2),
            key2: 0,
            index: index === 0 ? undefined : index
          })
        }
        // else if (equals(nArr4, [0x0a, 0x01, 0, 0])) {//改建改为fn 正常不会发生
        //   console.log('改 fn 按键', nArr4, dArr4)
        //   configArr.push({
        //     type: 'combo',
        //     original: orginHid,
        //     skey: 'none',
        //     key: 0x0a010000,
        //     key2: 0,
        //     index: index === 0 ? undefined : index
        //   })
        // }
        else {
          console.error('matrix 未知类型:', nArr4)
        }
      }
    }
    return configArr
  }



  //////
  buffToMacroEvents = (macroBuff: Buffer) => {
    console.log('读出来的宏', macroBuff)
    const macroEvents: MacroEvent[] = []
    const repeatConut = macroBuff.readUInt16LE(0)
    let index = 2
    let tBuff = macroBuff.slice(index, index + 4)
    index += 4
    while (index < macroBuff.length) {
      //console.log(tBuff, index, macroBuff.length)
      if (tBuff[0] === 0xf9) {//指针移动
        /*v1
                  0x00 0xf9 [   0x00 0x00  ]
                  Y    X    [  delay       ]
        */
        /*v2
                  xy:
                  
                  delay<127
                  
                  0xf9  | delay | x | y
                  
                  delay>= 127
                  
                  0xf9 | 0 | x | y | delay_L | delay_H
  
        */
        macroEvents.push({
          type: 'mouse_move',
          dx: tBuff[2],
          dy: tBuff[3],
        })
        let delay = 0
        if (tBuff[1] !== 0) {
          delay = tBuff[1] >> 1
        } else {
          const t = macroBuff.slice(index, index + 2)
          index += 2
          delay = t.readUInt16LE(0)
        }
        macroEvents.push({
          type: 'delay',
          value: delay
        })
        // const t = macroBuff.slice(index, index + 4)
        // index += 4

        // macroEvents.push({
        //   type: 'mouse_move',
        //   dy: t.readInt8(0),
        //   dx: t.readInt8(1),
        // })
        // const delay = t.readUInt16LE(2)
        // macroEvents.push({
        //   type: 'delay',
        //   value: delay
        // })
      } else {//按键
        if (tBuff[0] <= 0xef && tBuff[0] >= 0x04) {//键盘

          console.error('!!!!!!!!!!!!!!! 0::::', tBuff[0], '         1:::', tBuff[1], getBit(tBuff[1], 7))
          macroEvents.push({
            type: 'keyboard',
            action: getBit(tBuff[1], 7) === 0 ? 'up' : 'down',
            value: tBuff[0]
          })
        } else {
          const mk = valueForKey(mouseKeyTable, [0x01, 0, tBuff[0], 0])
          if (mk !== undefined) {
            macroEvents.push({
              type: 'mouse_button',
              action: getBit(tBuff[1], 7) === 0 ? 'up' : 'down',
              value: Number(mk)
            })
          }
        }
        let delay = 0
        if ((tBuff[1] & 0x7f) !== 0) {

          delay = tBuff[1] & 0x7f
          index -= 2

        } else {
          delay = tBuff.readUInt16LE(2)
        }
        macroEvents.push({
          type: 'delay',
          value: delay
        })

      }




      tBuff = macroBuff.slice(index, index + 4)
      if (equals(tBuff, Buffer.from([0, 0, 0, 0]))) break
      index += 4


    }
    // const t = macroEvents[macroEvents.length - 1]
    // if (t.type === 'delay' && t.value === 0) {
    //   macroEvents.pop()
    // }
    console.log('@@@@@', macroEvents.filter(v => !(v.type === 'delay' && v.value === 0)))
    return {
      macroEvents: macroEvents.filter(v => !(v.type === 'delay' && v.value === 0)),
      repeatCount: repeatConut
    }
  }


  findHidWithIndexInMatrix = (index: number) => {


    const tmp = this.defaultMatrix.slice(index * 4, index * 4 + 4)

    const tempIndex = specialFunTablectionArr.find(v => equals(v, tmp))
    if (tempIndex) {
      // const buf = Buffer.from(tempIndex)
      // console.error(buf.readInt32BE().toString(16))
      return tempIndex[0] << 24 | tempIndex[1] << 16 | tempIndex[2] << 8 | tempIndex[3]
    }

    if (tmp[0] !== 0 || tmp[1] !== 0 || tmp[3] !== 0) {
      // 处理未加入映射specialFncComboKey/specialBasicFnc的特殊按键
      return tmp[0] << 24 | tmp[1] << 16 | tmp[2] << 8 | tmp[3]
    }

    return this.defaultMatrix[index * 4 + 2]
  }
  findIndexInDefaultMatrix = (hid: number, findIndex?: number) => {
    let currentFindeIndex = 0
    const numArr = new Array()
    for (var i = 0; i < specialFunTablectionArr.length; i++) {
      const tmp = arrTo16(specialFunTablectionArr[i])
      numArr.push(tmp)
    }
    const tmpNum = numArr.find(v => equals(v, hid))
    let index = 0
    if (tmpNum) {//fn 特殊处理
      for (let i = 0; i < this.defaultMatrix.length; i += 4) {
        const buf = Buffer.from(this.defaultMatrix.slice(i, i + 4))
        if (hid === buf.readUInt32BE()) {
          if (findIndex === undefined || findIndex == currentFindeIndex) {
            return index
          } else {
            currentFindeIndex++
          }

        }
        index++
      }
    }

    for (let i = 0; i < this.defaultMatrix.length; i += 4) {
      const dArr4 = this.defaultMatrix.slice(i, i + 4)
      if (equals([0, 0, hid, 0], dArr4)) {
        if (findIndex === undefined || findIndex == currentFindeIndex) {
          return index
        } else {
          currentFindeIndex++
        }
      }

      if (hid > 0xff) { // 处理未加入映射specialFncComboKey/specialBasicFnc的特殊按键
        if (equals(numToByte4(hid), dArr4)) {
          if (findIndex === undefined || findIndex == currentFindeIndex) {
            return index
          } else {
            currentFindeIndex++
          }
        }
      }
      index++
    }
    return undefined
  }

  findCurrentIndexInDefaultMatrix = (hid: number, findIndex?: number) => {
    const tmpArr = specialFunTablectionArr.find(v => arrTo16(v) === hid)

    let currentKeyIndex: number | undefined
    let index = findIndex
    let searchCount = 0
    for (let j = 0; j < this.defaultMatrix.length; j += 4) {
      const nArr4 = this.defaultMatrix.slice(j, j + 4)
      if (
        (equals(nArr4, tmpArr) && tmpArr !== undefined)
        || equals(nArr4, [0, 0, hid, 0])
      ) {
        if (index === undefined || searchCount === index) {
          currentKeyIndex = j
          break
        } else {
          searchCount++
          continue
        }
      }
    }

    return currentKeyIndex
  }
  changeAllConfig = (changeArr: {
    changeArr: number[],
    orginHid: number,
    index?: number
  }[]) => {
    let res = [...this.defaultMatrix]
    changeArr.forEach(v => {
      const t = this.changeMatrix(v.orginHid, v.changeArr, res, v.index)
      if (t !== undefined) res = t
    })
    return res
  }

  changeMatrix = (
    orginHid: number,
    changeArr: Array<number>,
    currentMatrix: Array<number>,
    index?: number
  ) => {
    // console.error('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', orginHid, changeArr)
    const copyMatrix = [...currentMatrix]
    let i = 2
    let isExist = false
    let searchCount = 0
    const numArr = new Array()
    for (let n = 0; n < specialFunTablectionArr.length; n++) {
      const tmp = arrTo16(specialFunTablectionArr[n])
      numArr.push(tmp)
    }
    for (; i < this.defaultMatrix.length; i += 4) {
      //判断fn
      const tmpIndex = numArr.findIndex((v: number) => equals(v, orginHid))
      if (tmpIndex !== -1) {
        if (equals(this.defaultMatrix.slice(i - 2, i + 2), specialFunTablectionArr[tmpIndex])) {
          if (index === undefined || searchCount === index) {
            isExist = true
            break
          } else {
            searchCount++
            continue
          }
        }
      }
      // if (orginHid === 0x0a010000) {
      //   //改建为fn
      //   if (equals(this.defaultMatrix.slice(i - 2, i + 2), [0x0a, 0x01, 0, 0])) {
      //     if (index === undefined || searchCount === index) {
      //       isExist = true
      //       break
      //     } else {
      //       searchCount++
      //       continue
      //     }
      //   }
      // }

      if (equals(this.defaultMatrix.slice(i - 2, i + 2), [0, 0, orginHid, 0])) {
        if (index === undefined || searchCount === index) {
          isExist = true
          break
        } else {
          searchCount++
          continue
        }
      }
    }

    if (!isExist) return undefined

    copyMatrix[i - 1 - 1] = changeArr[0]
    copyMatrix[i - 1] = changeArr[1]
    copyMatrix[i] = changeArr[2]
    copyMatrix[i + 1] = changeArr[3]
    return copyMatrix
  }
  send64 = async (arr: number[]) => {
    //console.log(arr.concat(new Array(64 - arr.length)).length)
    let sendBuf = Buffer.from(arr.concat(new Array(64 - arr.length)))
    return await this.writeFeatureCmd(sendBuf, 2)
  }
  getBattery = async () => {
    const b = Buffer.alloc(64)
    b[0] = 0x83
    const buf = await this.commomFeature(b, 0)

    let battery: Battery = {
      battery: 0,
      status: 'uncharing'
    }
    if (buf !== undefined) {
      battery = {
        battery: buf[1],
        status: buf[2] === 0
          ? 'uncharing'
          : buf[2] === 1
            ? 'charing'
            : 'full'
      }
    }
    return battery
  }

  getSLEDParam = async (): Promise<LightSetting | undefined> => {
    const b = Buffer.alloc(64)
    b[0] = this.FEA_CMD_GET_SLEDPARAM
    const buf = await this.commomFeature(b, 0)
    if (buf === undefined) return undefined
    const effect = buf[1]
    const speed = 5 - buf[2]
    const brightness = buf[3]

    switch (effect) {
      case 0:
        return {
          type: 'LightOff',
        }
      case 1:
        return {
          type: 'LightAlwaysOn',
          value: brightness,
          rgb: 0,
        }
      case 2:
        return {
          type: 'LightBreath',
          value: 0,
          speed: speed,
          rgb: 0,
        }
      default:
        return undefined
    }
  }

  setSLEDParam = async (lightSet: LightSetting) => {
    const b = Buffer.alloc(64)


    b[0] = this.FEA_CMD_SET_SLEDPARAM

    let effect: number = 0
    let speed: number = 0
    let brightness: number = 0
    let option: number = 7
    let dazzle = lightSet.dazzle
    const n = dazzle ? 7 : 8

    switch (lightSet.type) {
      case 'LightOff':
        effect = 0x00
        break
      case 'LightAlwaysOn':
        effect = 0x01
        brightness = lightSet.value
        option = n
        break
      case 'LightBreath':
        effect = 0x02
        speed = lightSet.speed
        brightness = lightSet.value
        option = n
        break
      default:
        break
    }

    b[1] = effect
    b[2] = 4 - speed
    b[3] = brightness
    b[4] = option
    if ('rgb' in lightSet && lightSet.rgb !== undefined) {
      let rgbTemp = lightSet.rgb
      if (rgbTemp === 0xffffff) rgbTemp = 0xfafffa
      const rgb = numToRgb(rgbTemp)
      b[5] = rgb.r
      b[6] = rgb.g
      b[7] = rgb.b
    }
    if (lightSet.type === 'LightUserPicture') {
      b[5] = 0
      b[6] = 0xc8
      b[7] = 0xc8
    }
    //console.log(lightSet, b)
    const buf = await this.writeFeatureCmd(b, 1, 500)
    if (!buf) return false
    await sleep(500)
    return true
  }

  getSleepKeyTime = async () => {
    return {
      time_bt: 120,
      time_24: 120,
      deepTime_bt: 28 * 60,
      deepTime_24: 28 * 60,
    }
  }

  setSleepKeyTime = async (sleeps: SleepKeyTime) => {
    // const b = Buffer.alloc(64)
    // b[0] = this.FEA_CMD_SET_SLEEPTIME

    // b[1] = sleeps.time >> 8
    // b[2] = sleeps.time - ((sleeps.time >> 8) << 8);
    // b[3] = sleeps.deepTime >> 8
    // b[4] = sleeps.deepTime - ((sleeps.deepTime >> 8) << 8);
    // const newB = await this.getBufEi(b)
    // const buf = await this.writeFeatureCmd(newB)
    // if (!buf) return false
    // await sleep(delay)
    return true
  }

  getDeBounce = async () => {
    const b = Buffer.alloc(64)
    console.error('------', b);

    b[0] = this.FEA_CMD_GET_DEBOUNCE
    const buf = await this.commomFeature(b, 0)

    if (buf !== undefined) return buf[2]
    return undefined
  }

  setDeBounce = async (debounce: number) => {
    const b = Buffer.alloc(64)
    b[0] = this.FEA_CMD_SET_DEBOUNCE

    b[2] = debounce
    const buf = await this.writeFeatureCmd(b, 0)
    if (!buf) return false
    await sleep(delay)
    return true
  }

  upgrade = async (filePath: Buffer, progressCallBack: (v: number) => void) => {

    await this.send64([0xAA, 0x55, 0xA5, 0x5A, 0xFF, 0x00, 0x33, 0xCC, 0x52])

    await this.send64([0x01, 0xAA, 0x55])

    const r1 = await this.readFeatureCmd()
    console.log(r1)

    await this.send64([0x03, 0xAA, 0x55])

    await this.send64([0x05, 0xAA, 0x55, 0x00, 0, 0, 0, 0, 0, 0x04])

    const r2 = await this.readFeatureCmd()
    console.log(r2)
    const fBuf = fs.readFileSync(filePath)
    console.log(fBuf.slice(0, 100))
    console.log('升级文件大小：', fBuf.length / 1024 + 'kb')
    for (let i = 0; i < fBuf.length; i += 64) {
      let p: Buffer
      if (i + 64 > fBuf.length) {
        p = fBuf.slice(i)
      } else {
        p = fBuf.slice(i, 64 + i)
      }
      progressCallBack(i / fBuf.length)
      //console.log(i, p)
      await this.send64([...p])
    }
    const res = await this.readFeatureCmd()
    console.log('升级结果', res)
    await this.send64([0x07, 0xAA, 0x55, 0, 0, 0, 0, 0, 0, 0xFF])
    progressCallBack(1)
    return true

  }
  setOLEDLanguage = async (isSwitch: boolean) => false

  setKeyConfigSimple = async (config: ConfigValue) => false
  setLightPicSimple = async (simplePic: UserPicItem, layer?: number) => false
  setFnKeyConfigSimple = async (config: ConfigValue, fnindex: number) => false
  setAutoOsen = async (auto: boolean) => false
  getAutoOsen = async () => false
  setTFTLCDData = async (gif: UImgData, progressCallBack?: (v: number) => void) => {
    const b = Buffer.alloc(8)
    b[0] = this.FEA_CMD_SET_OLEDGIFDATA
    b[1] = gif.isGIF ? gif.frameNum - 1 : 0
    b[3] = gif.currentFrame
    b[4] = gif.frameDelay
    b[5] = gif.layer
    //超过

    let len = Math.ceil(gif.imgDataArr.length / 56)
    const path = this.deviceType.devAddr.toString()
    const dangledevtype = devArr.some(v => v.danglecommondev?.mouseId === this.deviceType.id)
      ? 2
      : devArr.some(v => v.danglecommondev?.keyboardId === this.deviceType.id)
        ? 1
        : 0
    for (let j = 0; j < len; j++) {
      b[2] = j
      let ms = [...gif.imgDataArr.slice(j * 56, j * 56 + 56)]
      if (ms.length < 56) {
        ms = ms.concat(new Array(56 - ms.length).fill(0))
      }
      const bufS = Buffer.from([...b, ...ms])
      if (gif.isGIF) {
        if (!this.deviceType.is24 && !this.deviceType.isblue) {
          await sleep(1)
          const res = await sendMsg(path, bufS, 0, dangledevtype)
          if (!res) return false
        } else {
          if (progressCallBack !== undefined)
            progressCallBack(j / len)
          if (this.deviceType.isblue) {
            await sleep(15)
          }
          // 蓝牙15ms一笔    24G 80ms(有发送fb时间够不处理)
          const res = await this.writeFeatureCmd(bufS, 0, 5) // 5 + 10
          if (!res) return false
        }
      } else {
        if (progressCallBack !== undefined)
          progressCallBack(j / len)
        const res = await this.writeFeatureCmd(bufS, 0, 0) // 0 + 10
        if (!res) return false
      }
    }
    if (progressCallBack !== undefined)
      progressCallBack(1)
    return true
  }

  getTFTLCDDataRGBImg = async (
    bit: '16' | '24',
    data: UImgRGBData & ImgStyle,
  ) => {
    // const path = this.deviceType.devAddr.toString()
    const b = Buffer.alloc(12)
    b[0] = bit === '16'
      ? this.FEA_CMD_GETTFTLCDDATA
      : bit === '24'
        ? this.FEA_CMD_GET_SCREEN_24BITDATA
        : this.FEA_CMD_GETTFTLCDDATA
    b[1] = data.currentFrame// 当前是第几帧图片
    b[2] = data.frameNum// Total frames
    b[3] = data.frameDelay// frames Delay
    const lenBuf = Buffer.alloc(2)
    lenBuf.writeUInt16LE(data.imgDataArr.length)
    b[4] = lenBuf[0]
    b[5] = lenBuf[1]
    b[6] = 0
    b[8] = data.left
    b[9] = data.top
    b[10] = data.right
    b[11] = data.bottom

    await this.writeFeatureCmd(b, 0)
    let buf = await this.readFeatureCmd(100)
    // let buf = await this.commomFeature(b, 0)
    let i = 0
    while (buf === undefined || (buf !== undefined && buf[1] === 0x00) && i < 10) {
      await sleep(100)
      i++
      await this.writeFeatureCmd(b, 0)
      buf = await this.readFeatureCmd(100)
    }
    if (buf === undefined) return false
    return buf[1] === 0x01
  }


  setTFTLCDDataRGBImg = async (
    bit: '16' | '24',
    data: UImgRGBData & ImgStyle,
    progressCallBack?: (v: number) => void
  ) => {
    const len = Math.ceil(data.imgDataArr.length / 56)
    const b = Buffer.alloc(8);
    b[0] = bit === '16'
      ? this.FEA_CMD_SETTFTLCDDATA
      : bit === '24'
        ? this.FEA_CMD_SET_SCREEN_24BITDATA
        : this.FEA_CMD_SETTFTLCDDATA
    b[1] = data.currentFrame// 当前是第几帧图片
    b[2] = data.frameNum// Total frames
    b[3] = data.frameDelay// frames Delay
    const dangledevtype = devArr.some(v => v.danglecommondev?.mouseId === this.deviceType.id)
      ? 2
      : devArr.some(v => v.danglecommondev?.keyboardId === this.deviceType.id)
        ? 1
        : 0
    for (let i = 0; i < len; i++) {
      if (progressCallBack !== undefined)
        progressCallBack(i / len)
      let ms = [...data.imgDataArr.slice(i * 56, i * 56 + 56)]
      let clen = ms.length
      // console.error("iiii: ", ms, clen);

      if (ms.length < 56) {
        ms = ms.concat(new Array(56 - ms.length).fill(0))
      }

      const lenBuf = Buffer.alloc(2)
      lenBuf.writeUInt16LE(i)
      b[4] = lenBuf[0]
      b[5] = lenBuf[1]

      b[6] = clen

      const sendBuf = Buffer.from([...b, ...ms])
      if (this.deviceType.isblue) {
        await sleep(50)
      }

      await sleep(5 + 4)
      const res = await sendMsg(this.deviceType.devAddr.toString(), sendBuf, 0, dangledevtype)

      if (!res) {
        if (progressCallBack !== undefined)
          progressCallBack(1)
        return false
      }
    }
    if (progressCallBack !== undefined)
      progressCallBack(1)
    return true
  }
  setOLEDSysInfo = async () => {
    const b = Buffer.alloc(64)
    const path = this.deviceType.devAddr.toString()
    const data = await watchSystemInfo()
    if (data === undefined) return
    const diskCurrent = data.diskSpceAvailable;
    const diskTotal = data.diskSpaceTotal;
    const memoryCurrent = data.memUsed;
    const memoryTotal = data.memTotal;
    const cpu = data.cpuUsage;
    const cpuTemp = data.cpuTemperater;
    const netUp = data.netWorkTotalUp;
    const netDown = data.netWorkTotalDown

    console.error("send data:", {
      diskCurrent: Math.round(diskCurrent / 1024 / 1024 / 1024).toString(16),
      diskTotal: Math.round(diskTotal / 1024 / 1024 / 1024).toString(16),
      memoryCurrent: Math.round(memoryCurrent / 1024 / 1024).toString(16),
      memoryTotal: Math.round(memoryTotal / 1024 / 1024).toString(16),
      cpu: cpu.toString(16),
      cpuTemp: cpuTemp.toString(16),
      netUp: Math.floor(netUp / 1024).toString(16),
      netDown: Math.floor(netDown / 1024).toString(16),
    });
    const dangledevtype = devArr.some(v => v.danglecommondev?.mouseId === this.deviceType.id)
      ? 2
      : devArr.some(v => v.danglecommondev?.keyboardId === this.deviceType.id)
        ? 1
        : 0

    b[0] = this.FEA_CMD_SET_OLEDOPTION
    // disk
    const diskCurrentInt16Buf = Buffer.alloc(2)
    diskCurrentInt16Buf.writeInt16LE(Math.round(diskCurrent / 1024 / 1024 / 1024))
    const diskTotalInt16Buf = Buffer.alloc(2)
    diskTotalInt16Buf.writeInt16LE(Math.round(diskTotal / 1024 / 1024 / 1024))
    b[8] = diskCurrentInt16Buf[0]
    b[9] = diskCurrentInt16Buf[1]
    b[10] = diskTotalInt16Buf[0]
    b[11] = diskTotalInt16Buf[1]
    // memory
    const memoryCurrentInt16Buf = Buffer.alloc(2)
    memoryCurrentInt16Buf.writeInt16LE(Math.round(memoryCurrent / 1024 / 1024))
    const memoryTotalInt16Buf = Buffer.alloc(2)
    memoryTotalInt16Buf.writeInt16LE(Math.round(memoryTotal / 1024 / 1024))
    b[12] = memoryCurrentInt16Buf[0]
    b[13] = memoryCurrentInt16Buf[1]
    b[14] = memoryTotalInt16Buf[0]
    b[15] = memoryTotalInt16Buf[1]
    // cpu
    b[16] = cpu
    b[17] = cpuTemp
    const netUpInt16Buf = Buffer.alloc(2)
    netUpInt16Buf.writeInt16LE(Math.floor(netUp / 1024))
    const netDownInt16Buf = Buffer.alloc(2)
    netDownInt16Buf.writeInt16LE(Math.floor(netDown / 1024))
    b[18] = netUpInt16Buf[0]
    b[19] = netUpInt16Buf[1]
    b[20] = netDownInt16Buf[0]
    b[21] = netDownInt16Buf[1]

    const res = await sendMsg(path, b, 0, dangledevtype)
    if (!res) return false
    return true
  }


  setOLEDClock = async () => false
}




const mouseKeyTable: { [key in number]: Array<number> } = {
  [MouseKey.Left]: [0x01, 0x00, 0xf0, 0x00],
  [MouseKey.Right]: [0x01, 0x00, 0xf1, 0x00],
  [MouseKey.Middle]: [0x01, 0x00, 0xf2, 0x00],
  [MouseKey.Forward]: [0x01, 0x00, 0xf3, 0x00],
  [MouseKey.Back]: [0x01, 0x00, 0xf4, 0x00],
  [MouseKey.WheelLeft]: [0x01, 0x00, 0xf5, 0x00],
  [MouseKey.WheelRight]: [0x01, 0x00, 0xf6, 0x00],
  [MouseKey.WheelForward]: [0x01, 0x00, 0xf7, 0x00],
  [MouseKey.WheelBack]: [0x01, 0x00, 0xf8, 0x00],
  [MouseKey.Dpi]: [],
  [MouseKey.Key_1]: [],
  [MouseKey.Key_2]: [],
  [MouseKey.SCROLLUP]: [0x01, 0x00, 0xf5, 0x01],
  [MouseKey.SCROLLDOWN]: [0x01, 0x00, 0xf5, 0xff],
  [MouseKey.XUP]: [0x01, 0x00, 0xf6, 0xfb],
  [MouseKey.XDOWN]: [0x01, 0x00, 0xf6, 0x05],
  [MouseKey.YUP]: [0x01, 0x00, 0xf7, 0xfb],
  [MouseKey.YDOWN]: [0x01, 0x00, 0xf7, 0x05],
}

const skeyToHidTable: { [key in SpecialKey]: number } = {
  none: 0x00,
  alt: 226,
  ctrl: 224,
  shift: 0xe1,
  win: 227,
}

export const test = async () => {
  // console.log(
  //   'valueForKey:::  ',
  //   typeof valueForKey(mouseKeyTable, [0x01, 0x00, 0xf0, 0x00])
  // )
  // //console.log(await DeviceType.find())
  // const dev = await DeviceType.findOne({ where: { pid: 0x7044, vid: 0x0c45 } })
  // if (dev === undefined) throw '数据库里没这个设备'
  // const dk2017 = new Dk2017(dev)
  // console.log('open dk2017', await dk2017.open())

  // console.log('set report rate ', await dk2017.setReportRate(1000, 0))
  // console.log('get report rate ', await dk2017.getReportRate(0))

  // // console.log('firmware version', await dk2017.getFirmwareVersion())
  // // console.log('set current profile ', await dk2017.setCurrentProfile(1))
  // // console.log('get current profile ', await dk2017.getCurrentProfile())
  // // console.log('set keyboard option ', await dk2017.setKeyboardOption({
  // //     winKeyAppKeyLockControl: true,
  // //     keyboardLockControl: true,
  // //     wasdKeyAndArrowKeyExchange: false,
  // //     winKeyAndFnKeyExchange: true,
  // //     repeateKey: true
  // // }, 0))
  // // console.log('get keyboard option ', await dk2017.getKeyboardOption(0))
  // // console.log('set lightsetting ', await dk2017.setLightSetting({
  // //     type: 'LightWave',
  // //     speed: 1,//0~5,
  // //     option: 'right'
  // // }))
  // // console.log('get LightSetting ', await dk2017.getLightSetting())

  // console.log('set mode ', await dk2017.setMode('gaming', 0))
  // // console.log('get mode ', await dk2017.getMode(0))

  // //console.log('set key matrix', await dk2017.setKeyMatrix(0, { type: 'forbidden', original: 41 }))

  // // console.log('set key matrix', await dk2017.setKeyMatrix(0, {
  // //     type: 'ConfigMacro',
  // //     original: 9,//f
  // //     macro: [
  // //         { type: 'keyboard', action: 'down', value: 4 },
  // //         { type: 'delay', value: 0.5 },
  // //         { type: 'delay', value: 0.5 },
  // //         { type: 'keyboard', action: 'up', value: 4 },
  // //         { type: 'keyboard', action: 'down', value: 4 },
  // //         { type: 'delay', value: 0.5 },
  // //         { type: 'keyboard', action: 'up', value: 4 }],
  // //     macroType: 'repeat_times',
  // //     repeatCount: 10
  // // }))
  // console.log(
  //   'set key matrix',
  //   await dk2017.setKeyMatrix({
  //     type: 'ConfigMacro',
  //     original: 41, //esc
  //     macro: [
  //       { type: 'keyboard', action: 'down', value: 5 },
  //       { type: 'delay', value: 0.5 },
  //       { type: 'delay', value: 0.5 },
  //       { type: 'keyboard', action: 'up', value: 5 },
  //       { type: 'keyboard', action: 'down', value: 5 },
  //       { type: 'delay', value: 0.5 },
  //       { type: 'keyboard', action: 'up', value: 5 },
  //     ],
  //     macroType: 'repeat_times',
  //     repeatCount: 10,
  //   })
  // )
  // console.log(
  //   'set key matrix',
  //   await dk2017.setKeyMatrix({
  //     type: 'combo',
  //     skey: 'none',
  //     key: 91,
  //     key2: 0,
  //     original: 0x0a010000,
  //   })
  // )

  // console.log('getKeyMatrix  ', await dk2017.getKeyMatrix(0))
  //console.log('getMacro  ', await dk2017.getMacro())
  // console.log('setLightPic   ', await dk2017.setLightPic([4]))
  // console.log('getLightPic   ', await dk2017.getLightPic())

  //console.log('setReSet  ', await dk2017.setReSet())
  // setTimeout(async () => {
  //     console.log(await dk2017.getKeyMatrix(0))
  // }, 50);


}
