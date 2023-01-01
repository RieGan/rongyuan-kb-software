
import { timeOutFUNC as timeOut } from '../../../unitys/timeFunc'
import { DeviceType } from '../../DB'
import { venderSubject } from '../DeviceAPI/DevFactory'
import { Subject } from 'rxjs'
import { readMsg, readRawFeature, sendMsg, sendRawFeature } from './client'
import { devArr } from './DetectSupportDevice'




export type SleepEvent = {
  type: '设备睡眠' | '设备唤醒'
  deviceType: DeviceType
}
export type BatteryEvent = {
  battery: number
  state: number | undefined
}

//因为是同步的 所以这条 api 要在 initUSBDetect 之前调用才能收到已经插入设备的通知
export const sleepSubject = new Subject<SleepEvent>()
export const batterySubject = new Subject<BatteryEvent>()

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export type DeviceState = {
  battery: number
  isOnline: boolean
}

export class USBDevice {
  public deviceType: DeviceType
  public batteryChecking: boolean = false

  private block = false
  private timer: NodeJS.Timeout | undefined = undefined

  private devPath: string = ''
  deviceState: DeviceState = {
    battery: 100,
    isOnline: true
  }

  constructor(device: DeviceType) {
    this.deviceType = device
    this.devPath = device.devAddr.toString()

    venderSubject.subscribe(v => {
      const devType = devArr.some(v => v.danglecommondev
        && -v.danglecommondev.mouseId === this.deviceType.id)
        ? 'mouse'
        : 'keyboard'
      if (v.devType !== devType) return
      if (v.type === '开始') {
        this.block = true
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.block = false
        }, 5 * 1000)
      }

      if (v.type === '停止') {
        this.block = false
        if (this.timer) clearTimeout(this.timer)
      }
    })
  }

  fe_24_set_next_pack_length = async (len: number) => {
    const b = Buffer.alloc(64)
    b[0] = 0xfe
    b[1] = len

    const dangledevtype = devArr.some(v => v.danglecommondev?.mouseId === this.deviceType.id)
      ? 2
      : devArr.some(v => v.danglecommondev?.keyboardId === this.deviceType.id)
        ? 1
        : 0
    await sendRawFeature(this.devPath, b, 2, dangledevtype)
    // await this.usb.sendFeature(b)
    await sleep(10)
  }


  commomFeature = async (cmdBuf: Buffer, checkSumType: 0 | 1 | 2 = 2) => {
    // 0----7   1-----8   2-----init
    if ((await this.writeFeatureCmd(cmdBuf, checkSumType, 10, this.devPath, false)) === false) return undefined

    return await this.readFeatureCmd(5)
  }

  writeFeatureCmd = timeOut(async (buf: Buffer, checkSumType: 0 | 1 | 2 = 2, sleepTime: number = 10, value: string = this.devPath, delayBlue: boolean = true) => {
    // 0----7   1-----8   2-----init
    while (this.block) {
      await sleep(100)
    }

    await sleep(sleepTime)
    if (this.deviceType.isblue && delayBlue) {
      await sleep(60)
    }

    const dangledevtype = devArr.some(v => this.deviceType.id !== undefined && v.danglecommondev?.mouseId === -this.deviceType.id)
      ? 2
      : devArr.some(v => this.deviceType.id !== undefined && v.danglecommondev?.keyboardId === -this.deviceType.id)
        ? 1
        : 0
    const res = await sendMsg(value, buf, checkSumType, dangledevtype)

    return res
  })

  readFeatureCmd = timeOut(async (sleepTime = 5, value: string = this.devPath) => {

    while (this.block) {
      await sleep(100)
    }

    await sleep(sleepTime)

    const res = await readMsg(value);

    return res
  })

  writeRawFeatureCmd = timeOut(async (buf: Buffer, checkSumType: 0 | 1 | 2 = 2, sleepTime: number = 10, value: string = this.devPath) => {
    // 0----7   1-----8   2-----init
    while (this.block) {
      await sleep(100)
    }

    await sleep(sleepTime)
    const dangledevtype = devArr.some(v => v.danglecommondev?.mouseId === this.deviceType.id)
      ? 2
      : devArr.some(v => v.danglecommondev?.keyboardId === this.deviceType.id)
        ? 1
        : 0
    const res = await sendRawFeature(value, buf, checkSumType, dangledevtype)

    return res
  })

  readRawFeatureCmd = timeOut(async (sleepTime = 5, value: string = this.devPath) => {

    while (this.block) {
      await sleep(100)
    }

    await sleep(sleepTime)

    const res = await readRawFeature(value);

    return res
  })
}
