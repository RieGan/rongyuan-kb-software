import { DeviceType } from "../../DB"
import { Dk2017 } from "./dk2017"
import { KeyboardInterface } from "./KeyboardInterface"
import { MouseInterface } from "./MouseInterface"
// import { TestKeyboard } from "./testKeyboard"
// import { TestMouse } from "./testMouse"
import { sleep } from "../../../unitys/timeFunc"
// import { V25s } from "./v25s"
import { kCompany } from "../../../appConfig"
// sonix
import { K68Help } from "./sonix/k68Help"

import { Common } from "./Common"
import { equals } from "ramda"
import { Subject } from "rxjs"

// yzw
import { YZWCommon } from "./yzw/YZWCommon"
import { YZWHelp } from "./yzw/YZWHelp"

// yc200
import { findSonixDev } from "./findSonixDev"
import { findYZWDev } from "./findYZWDev"
import { findYC300Dev } from "./findYC300Dev"
import { client } from "../usb/client"
import { Empty } from "../proto/driver_pb"
import { findBK100Dev } from "./findBK100Dev"
import { findYC500Dev } from "./findYC500Dev"
import { BKHelp } from "./bk100/bkHelp"


const venderEventType = ['开始', '停止', '切灯效', '切侧灯效', '切配置', '重置', '切WIN', '切MAC', '省电模式', '常规模式', '切睡眠', undefined] as const

export type VenderEvent = {
    type: typeof venderEventType[number],
    devType: 'mouse' | 'keyboard'
    // venderAddress: string
}

//因为是同步的 所以这条 api 要在 initUSBDetect 之前调用才能收到已经插入设备的通知
export const venderSubject = new Subject<VenderEvent>()
export const venderDelayTime: number = 500
let sendTimer: NodeJS.Timer
let type_p: typeof venderEventType[number] | undefined = undefined
export const CreateDeviceByDeviceType = async (dtemp: DeviceType): Promise<MouseInterface | KeyboardInterface | undefined> => {
    console.log('DDDTTTTEEEMMMMPPP', dtemp, dtemp.name)
    let res1 = await DeviceType.find({ where: { pid: dtemp.pid, vid: dtemp.vid } })

    if (res1 === undefined || res1.length === 0) {
        res1 = await DeviceType.find({ where: { pid: dtemp.pid, vid: 0x0461 } })
        // console.error("EEEEEEEE ", res1)
    }


    if (res1.length === 1 || res1[0].displayName === 'help') {
        switch (dtemp.name) {
            case 'common':
                return new Common(dtemp)
            case 'YZWCommon':
                return new YZWCommon(dtemp)
            case 'help':
                return new K68Help(dtemp)
            case 'helpYZW':
                return new YZWHelp(dtemp)
            case 'helpBK':
                return new BKHelp(dtemp)
            case 'v25s':
            //return new V25s(dtemp)
            case 'dk2017':
                return new Dk2017(dtemp)
            case '小潘鼠标':
            //return new TestMouse(dtemp)
            case 'test_dj':
            //return new TestMouse(dtemp)
            default: {
                console.error("单台设备未处理")
                return undefined
            }
        }
    }

    await sleep(500)

    // const usbDev = new USBDevice(dtemp)

    // vender
    client.watchVender(new Empty()).on('data', res => {
        if (res) {
            const devType = res.getMsg_asU8()[0] === 0x0c ? 'mouse' : 'keyboard'
            const arr = res.getMsg_asU8().slice(1, 4)

            let type: typeof venderEventType[number] | undefined = undefined

            if (equals([...arr], [0xf, 1, 0])) type = '开始'

            if (equals([...arr], [0xf, 0, 0])) type = '停止'

            if (type) {
                venderSubject.next({
                    type: type,
                    devType: devType
                })
            }

            /////////////////////////////
            if (equals([...arr], [0xd, 0, 0])) type_p = '重置'

            if (equals([...arr], [0x13, 0, 0])) type_p = '切睡眠'

            if (arr[0] >= 4 && arr[0] <= 7) type_p = '切灯效'

            if (arr[0] >= 8 && arr[0] <= 0x0b) type_p = '切侧灯效'
            if (arr[0] === 1) type_p = '切配置'

            if (arr[0] === 3) {
                if (arr[2] === 9)
                    type_p = arr[2] ? '省电模式' : '常规模式'

                if (arr[2] === 0 || arr[2] === 2) {
                    type_p = arr[2] & 2 ? '切MAC' : '切WIN'
                }
            }


            clearTimeout(sendTimer)

            if (type === '停止' || type === undefined) {
                if (type_p === undefined) return
                sendTimer = setTimeout(() => {
                    if (type_p === undefined) return
                    console.error("typetypetypetype", type_p);
                    venderSubject.next({
                        type: type_p,
                        devType: devType
                    })
                    type_p = undefined
                }, venderDelayTime)
            }
        }
    })

    await sleep(1000)
    let devId: number | bigint | undefined;

    let cout = 0

    const allDevs = await DeviceType.find()
    while (devId === 0 || devId === undefined) {
        await sleep(200)
        devId = dtemp.id
        // const id =300
        // let tt = Buffer.alloc(64)
        // tt[0] = 143
        // tt[1] = id & 0x00FF
        // tt[2] = id >> 8
        // tt[3] = 0
        // tt[4] = 0 | 0b10000000
        // tt[5] = 1
        // tt[6] = 0
        // tt[7] = 112
        // console.log("___________:", tt?.readInt32LE(1), tt[2] << 8 | tt[1]);
        console.log('DDDEEEVVUUUUIIIIDDDD', devId)
        if (!allDevs.some(v => v.id === devId)) {
            devId = 0
        }
        cout++
        if (dtemp.is24 === false) {
            if (cout > 5) {
                break
            }
        }

    }

    if (devId === 0 || devId === undefined) {

        console.log('设备id返回错误', devId)

        return undefined
    }

    const dev = await DeviceType.findOne({
        where: {
            id: devId,
            company: kCompany
        }
    })


    console.log('DDDEEEVVV', dev, devId, dev?.name)

    if (dev === undefined) return undefined
    dev.vid = dtemp.vid
    dev.devAddr = dtemp.devAddr
    dev.venderAddr = dtemp.venderAddr
    dev.is24 = dtemp.is24
    if (dev.otherSetting === undefined || dev.otherSetting === null)
        dev.otherSetting = {}
    dev.isblue = dtemp.isblue

    let tmp = findSonixDev(dev, dev.name)
    if (tmp === undefined) tmp = findYZWDev(dev, dev.name)
    if (tmp === undefined) tmp = findYC300Dev(dev, dev.name)
    if (tmp === undefined) tmp = findYC500Dev(dev, dev.name)
    if (tmp === undefined) tmp = findBK100Dev(dev, dev.name)
    if (tmp === undefined)
        console.error("未找到对应实现", dev)
    return tmp
}