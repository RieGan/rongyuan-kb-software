
import { sleep } from "../../../../unitys/timeFunc";
import { RY108 } from "./RY108";
import * as fs from 'fs'
import { log16Num } from "../../../../unitys/log16Num";
import { devlistList, HIDAttachSwich } from "../../usb/DetectSupportDevice";

import { DJDev } from "../../proto/driver_pb";
import { equals } from "ramda";
export class YZWCommon extends RY108 {
  BIGCMDDELAY = process.platform == 'darwin' ? 1000 : 100
  LITTLECMDDELAY = 20
  DAZZLE = 6;
  NORMAL = 7;
  USEROP = {
    '1': 0x00,
    '2': 0x10,
    '3': 0x20,
    '4': 0x30,
    '5': 0x40,
  };
  WAVEOP = {
    'right': 0,
    'left': 1,
    'down': 2,
    'up': 3
  };
  MP = {
    'upright': 0,
    'separate': 1,
    'intersect': 2
  };
  COMMONCOLOR: { [key: number]: number } = {
    0: 0xff0000,
    1: 0x00ff00,
    2: 0x0000ff,
    3: 0xff5000,
    4: 0xff00ff,
    5: 0xffff00,
    6: 0xffffff,
  }
  MAXSPEED = 5

  send64 = async (arr: number[], checkSumType: 0 | 1 | 2 = 2, value: string = this.deviceType.devAddr.toString()) => {
    //console.log(arr.concat(new Array(64 - arr.length)).length)
    let sendBuf = Buffer.from(arr.concat(new Array(64 - arr.length)))
    return await this.writeFeatureCmd(sendBuf, checkSumType, 0, value)
  }

  upgrade = async (filePath: Buffer, progressCallBack: (v: number) => void) => {

    HIDAttachSwich(false)
    //进入 bootloader
    //进入 bootloader
    let devicePath: string | undefined = undefined
    if (this.deviceType.pid !== 0x4001) {
      console.log('发进入boot命令 0x7f , 0x55 , 0xaa , 0x55 , 0x82')
      const r = await this.send64([0x7f, 0x55, 0xaa, 0x55, 0xaa, 0, 0, 0x82], 0)
      if (!r) {
        HIDAttachSwich(true)
        throw '发送 进入 boot 命令失败'
      }
      console.log('开始等待')
      await sleep(1000 * 1)
      console.log('等待结束')
      const config
        = [
          { vid: 0x0461, pid: 0x4001, usage: 6, usagePage: 1, featureReportByteLength: 65, boot: 'yzw' },
          { vid: 0x0461, pid: 0x4001, usage: 1, usagePage: 0xff01, featureReportByteLength: 65, boot: 'yzw' },
          { vid: 0x3151, pid: 0x4001, usage: 6, usagePage: 1, featureReportByteLength: 65, boot: 'yzw' },
          { vid: 0x3151, pid: 0x4001, usage: 1, usagePage: 0xff01, featureReportByteLength: 65, boot: 'yzw' },
        ]
      const yzwD = config.filter(v => v.boot === 'yzw')
      if (yzwD.length === 0) {
        HIDAttachSwich(true)
        throw 'config 没有配置boot:yzw'
      }
      console.log('开始扫描 hid 设备')

      let devUpList: DJDev.AsObject[] | undefined
      let findCount = 0

      while ((devUpList?.length === 0 || devUpList === undefined) && findCount < 100) {
        console.error("!!!!!!!!!!!!!")
        await sleep(500)

        devUpList = devlistList.filter(v => {
          console.error(v);
          return v.dev && v.dev.devtype === 1
        })

        findCount++
      }

      if (devUpList?.length === 0 || devUpList === undefined) {
        //alert('未检测到支持设备')
        HIDAttachSwich(true)
        console.error('找不到', yzwD)
        return false
      }

      console.error("devUpList: ", devUpList)

      if (equals(devUpList[0].dev?.path, '')) {
        console.error('找不到devicePath')
        return false
      }

      await sleep(1000)

      devicePath = devUpList[0].dev?.path

    }

    devicePath = devicePath === undefined ? this.deviceType.devAddr.toString() : devicePath
    // return false;

    const rawBuf = filePath
    //0x1010000
    //const ib = rawBuf.indexOf(Buffer.from([0x01, 0x01, 0x00, 0x00]))

    const fBuf = rawBuf.slice(0x10000)

    console.log('升级文件大小：', fBuf.length / 1024 + 'kb')

    const onePackDataLength = 64
    const _dataPacketNum = Math.ceil(fBuf.length / (onePackDataLength))
    const allDataPacketNumInt16Buff = Buffer.alloc(2)
    allDataPacketNumInt16Buff.writeInt16LE(_dataPacketNum)
    console.log('发送数据包总数', _dataPacketNum)

    const int3buffLenth = Buffer.alloc(4)
    int3buffLenth.writeInt32LE(fBuf.length, 0)

    //cmd_ota_start
    let bac0Res
    while (bac0Res === undefined) {
      await this.send64([0xba, 0xc0, ...allDataPacketNumInt16Buff, ...int3buffLenth.slice(0, 3)], 2, devicePath)
      log16Num('cmd_ota_start:', [0xba, 0xc0, ...allDataPacketNumInt16Buff, ...int3buffLenth.slice(0, 3)])

      bac0Res = await this.readFeatureCmd(5, devicePath)
      await sleep(1000)
    }


    log16Num('cmd_ota_start_H:', bac0Res)


    //cmd_ota_data
    for (let i = 0; i < _dataPacketNum; i++) {
      console.time('数据包发送' + i)
      const packDataLength = i * onePackDataLength > fBuf.length ? onePackDataLength - (i * onePackDataLength - fBuf.length) : onePackDataLength

      await this.send64([...fBuf.slice(i * onePackDataLength, i * onePackDataLength + packDataLength)], 2, devicePath)

      progressCallBack(i / _dataPacketNum)
      console.timeEnd('数据包发送' + i)
    }

    const checkSum = fBuf.reduce((p, c) => p + c)
    const int3CheckSum = Buffer.alloc(4)
    int3CheckSum.writeInt32LE(checkSum)

    //cmd_ota_end
    await this.send64([0xba, 0xc2, ...allDataPacketNumInt16Buff, ...int3CheckSum.slice(0, 3), ...int3buffLenth.slice(0, 3)], 2, devicePath)

    log16Num('cmd_ota_end', [0xba, 0xc2, ...allDataPacketNumInt16Buff, ...int3CheckSum.slice(0, 3), ...int3buffLenth.slice(0, 3)])
    const cmd_ota_end_h = await this.readFeatureCmd(5, devicePath)

    log16Num('cmd_ota_end_h', cmd_ota_end_h)
    progressCallBack(1)
    HIDAttachSwich(true)

    return true
  }

  setScreen = async (uint8ClampedArray: Uint8ClampedArray) => {
    const b = new Array(1)
    b[0] = this.FEA_CMD_SET_WINDOS

    const sendArr = b.concat(...uint8ClampedArray)


    const sendBuf = Buffer.from(sendArr.concat(new Array(64 - sendArr.length)))
    let sum = 0
    for (let i = 0; i < 7; i++) {
      sum += sendBuf[i]
    }
    sendBuf[7] = 255 - (sum & 0xff)

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
    b[7] = 255 - (b[0] & 0xff)

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
    // const b = Buffer.alloc(64)
    // b[0] = this.FEA_CMD_GET_REV
    // const buf = await this.commomFeature(b)
    // return buf?.readUInt16LE(1)
    const b = Buffer.alloc(64)
    b[0] = this.FEA_CMD_GET_REV
    const buf = await this.commomFeature(b, 0)


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
    const res = await this.writeFeatureCmd(b, 0)
    await sleep(this.BIGCMDDELAY)
    return res
  }

  getReportRate = async () => {
    const b = Buffer.alloc(64)
    b[0] = this.FEA_CMD_GET_REPORT
    b[1] = this.currentProfile ? this.currentProfile : 0
    const buf = await this.commomFeature(b, 0)
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

  setCurrentProfile = async (profile: number = 0) => {
    const b = Buffer.alloc(64)
    b[0] = this.FEA_CMD_SET_PROFILE
    b[1] = profile


    const res = await this.writeFeatureCmd(b, 0)
    if (res) {
      this.currentProfile = profile
      return true
    }
    return false
  }

  getCurrentProfile = async () => {
    // if (this.currentProfile !== undefined) return this.currentProfile
    // else {
    const b = Buffer.alloc(64)
    b[0] = this.FEA_CMD_GET_PROFILE
    const buf = await this.commomFeature(b, 0)
    if (buf === undefined) return undefined
    const num = buf.readUInt8(1)
    if (num != undefined && num >= 0) this.currentProfile = num
    return num
    // }

  }

  // setKeyboardOption = async (option: KeyboardOption) => {
  //   const b = Buffer.alloc(64)
  //   b[0] = this.FEA_CMD_SET_KBOPTION
  //   b[1] = this.currentProfile

  //   const bit0 = Number(option.winKeyAppKeyLockControl)
  //   const bit1 = Number(option.keyboardLockControl)
  //   const bit2 = Number(option.wasdKeyAndArrowKeyExchange)
  //   const bit3 = Number(option.winKeyAndFnKeyExchange)
  //   const bit4 = Number(option.repeateKey)

  //   b[2] = bit0 | (bit1 << 1) | (bit2 << 2) | (bit3 << 3) | (bit4 << 4)
  //   const newB = await this.getBufSe(b)
  //   return await this.writeFeatureCmd(newB)
  // }

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

    return await this.writeFeatureCmd(b, 0)
  }

  getKeyboardOption = async () => {
    const b = Buffer.alloc(64)
    b[0] = this.FEA_CMD_GET_KBOPTION
    b[1] = this.currentProfile ? this.currentProfile : 0
    const buf = await this.commomFeature(b, 0)

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

  setMode = async (mode: 'gaming' | 'normal', profile: number = 0) => {
    const b = Buffer.alloc(64)
    b[0] = 0x05
    b[1] = profile
    b[2] = mode === 'gaming' ? 1 : 0
    return await this.writeFeatureCmd(b, 0)
  }

  getMode = async (profile: number = 0) => {
    const b = Buffer.alloc(64)
    b[0] = 0x85
    b[1] = profile
    const buf = await this.commomFeature(b, 0)
    const num = buf?.readUInt8(2)
    if (num === undefined) return num
    return num === 0 ? 'normal' : 'gaming'
  }

  protected async _getKeyMatrix(profile?: number) {
    const b = Buffer.alloc(64)
    b[0] = this.FEA_CMD_GET_KEYMATRIX
    b[1] = profile !== undefined
      ? profile
      : this.currentProfile
        ? this.currentProfile
        : 0

    let res = Buffer.alloc(0)
    for (let i = 0; i < 8; i++) {
      b[2] = i

      const buf = await this.commomFeature(b, 0)

      //if (buf === undefined) return undefined
      //const b1 = await this.readFeatureCmd(10)
      //console.error('BBBBBB', b, b[2])
      if (buf === undefined) throw '_getKeyMatrix !!!undefine'

      res = Buffer.concat([res, buf])
    }
    return res
  }
  protected _setKeyConfig = async (matrix: number[]) => {
    //console.error('1111111')
    const b = new Array(8).fill(0)
    b[0] = this.FEA_CMD_SET_KEYMATRIX
    b[1] = this.currentProfile
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
    await sleep(this.BIGCMDDELAY)
    return true
  }



  protected _setMacro = async (buf: Buffer, index: number) => {
    const b = Buffer.alloc(64)
    b[0] = 0x08
    b[1] = index
    b[2] = 0x00
    b[3] = 0x01

    const h = await this.writeFeatureCmd(b, 0)
    if (h === false) return false
    for (let i = 0; i < 4; i++) {

      const bufS = Buffer.from([...buf.slice(i * 64, 64 + i * 64)])

      const sucess = await this.writeFeatureCmd(bufS)

      if (!sucess) return false




    }

    return true
  }

  // getLightPic = async () => {
  //   const b = Buffer.alloc(64)
  //   b[0] = 0x89
  //   b[1] = 0

  //   const newB = await this.getBufSe(b)
  //   const buf = await this.commomFeature(newB)
  //   if (buf === undefined) return buf

  //   const res = await this.readFeatureCmd()
  //   if (res === undefined) return undefined

  //   console.log('RRRREEEESSSS ', res)
  //   let hidArr: number[] = []

  //   for (let i = 0; i < res.length; i++) {
  //     const resI = res[i]
  //     if (resI !== 0xff) {
  //       const indexArr = getUint8Bit0Index(resI)
  //       //console.log('getUint8Bit0Index!!!!!', indexArr)
  //       hidArr = hidArr.concat(indexArr.map((v) => {
  //         //console.log('findHidWithIndexInMatrix', v + i * 8, '------->>>>', this.findHidWithIndexInMatrix(v + i * 8))
  //         return this.findHidWithIndexInMatrix(v + i * 8)
  //       }))
  //     }
  //   }
  //   console.log('PICPIChidArrhidArrhidArrhidArr!!!!!', hidArr.filter(v => v !== undefined).map(v => {
  //     return {
  //       hid: v,
  //       rgb: 0
  //     }
  //   }))
  //   return hidArr.filter(v => v !== undefined).map(v => {
  //     return {
  //       hid: v,
  //       rgb: 0
  //     }
  //   })
  // }

  setReSet = async () => {
    const b = Buffer.alloc(64)
    b[0] = this.FEA_CMD_SET_RESERT
    const res = await this.writeFeatureCmd(b, 0)
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
}