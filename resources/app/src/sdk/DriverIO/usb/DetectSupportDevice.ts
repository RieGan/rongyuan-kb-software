import { equals } from "ramda";
import { Subject } from "rxjs";

import { kCompany } from "../../../appConfig";
import { Device, DeviceList, DJDev, Empty } from "../proto/driver_pb";
import { DeviceType } from '../../DB';
import { client } from "./client";
import { supportYC500Dev } from "../../../supportYC500Dev";

export type DetctEvent = {
    type: '设备插入' | '设备拔出'
    deviceType: DeviceType
}

export type DevInfoEvent = {
    type: '设备唤醒' | '设备睡眠'
    battery: number
    batteryState: 0 | 1 | 2 | undefined
    deviceType: DeviceType
}

//因为是同步的 所以这条 api 要在 initUSBDetect 之前调用才能收到已经插入设备的通知
export const detectSubject = new Subject<DetctEvent>()
export const devInfoSubject = new Subject<DevInfoEvent>()

// export const currentDev: {
//     id: number,
//     vid: number,
//     pid: number,
//     path: string,
//     is24?: boolean,
//     isblue?: boolean,
// }[] = []
export const currentDev: DJDev.AsObject[] = []
const currentDeviceType: DeviceType[] = []
// let currentVenderPathArr: string[] = []

let supportDevices: DeviceType[]

let devList: DeviceList.AsObject

export let devlistList: DJDev.AsObject[] = []
export let devArr: DJDev.AsObject[] = []

const initDevArr = () => {
    devArr = []
    for (let i = 0; i < devlistList.length; i++) {
        const d = devlistList[i]
        if (d.dev !== undefined && (d.dev.devtype === 0 || d.dev.devtype === 1))
            devArr.push(d)
        const dangle = d.danglecommondev
        if (dangle !== undefined) {
            if (dangle.keyboardId !== 0) {
                const tmp: DJDev.AsObject = {
                    dev: undefined,
                    danglecommondev: {
                        keyboard: dangle.keyboard,
                        keyboardId: dangle.keyboardId,
                        mouse: undefined,
                        mouseId: 0,
                        path: dangle.path,
                        pid: dangle.pid,
                        vid: dangle.vid
                    }
                }
                devArr.push(tmp)
            }

            if (dangle.mouseId !== 0) {
                const tmp: DJDev.AsObject = {
                    dev: undefined,
                    danglecommondev: {
                        keyboard: undefined,
                        keyboardId: 0,
                        mouse: dangle.mouse,
                        mouseId: dangle.mouseId,
                        path: dangle.path,
                        pid: dangle.pid,
                        vid: dangle.vid
                    }
                }
                devArr.push(tmp)
            }
        }
    }
}

const findSupportDevice = async () => {
    if (!openAttach) return
    initDevArr()
    for (let i = 0; i < devArr.length; i++) {
        const line = devArr[i]
        if (line.dev !== undefined) {
            const dev = line.dev
            const d = currentDeviceType.find(v => (v.is24 || v.isblue)
                && v.id === dev.id
                && equals(v.devAddr, dev.path))
            if (d !== undefined) {
                devInfoSubject.next({
                    type: dev.isonline ? '设备唤醒' : '设备睡眠',
                    battery: dev.battery,
                    batteryState: 0,
                    deviceType: d
                })
            }
        }

        if (line.danglecommondev !== undefined) {
            const dev = line.danglecommondev
            if (dev.keyboardId !== 0) {
                const d = currentDeviceType.find(v => v.id === -dev.keyboardId && equals(v.devAddr, dev.path))
                if (d !== undefined) {
                    devInfoSubject.next({
                        type: dev.keyboard?.status?.isOnline ? '设备唤醒' : '设备睡眠',
                        battery: dev.keyboard?.status?.battery === undefined ? 0 : dev.keyboard?.status?.battery,
                        batteryState: 0,
                        deviceType: d
                    })
                }
            }

            if (dev.mouseId !== 0) {
                const d = currentDeviceType.find(v => v.id === -dev.mouseId && equals(v.devAddr, dev.path))
                if (d !== undefined) {
                    devInfoSubject.next({
                        type: dev.mouse?.status?.isOnline ? '设备唤醒' : '设备睡眠',
                        battery: dev.mouse?.status?.battery === undefined ? 0 : dev.mouse?.status?.battery,
                        batteryState: 0,
                        deviceType: d
                    })
                }
            }
        }
    }
    if (devList.type === 2 || devList.type === 3) {
        // 设备拔出
        const len = currentDev.length
        currentDev.forEach((v, i) => {
            if (v.dev !== undefined) {
                const dev = v.dev
                const still = devArr.some(dv => dv.dev && equals(dv.dev.id, dev.id) && equals(dv.dev.path, dev.path))
                if (still === false) {
                    const index = currentDeviceType.findIndex(dType => {
                        return (equals(dType.id, dev.id) || dType.pid === 0x4001 || dType.pid === 0x7040)
                            && equals(dType.devAddr, dev.path)
                    })

                    if (index !== -1) {
                        detectSubject.next({
                            type: '设备拔出',
                            deviceType: currentDeviceType[index],
                        })
                        currentDeviceType.splice(index, 1)

                        const devIndex = currentDev.findIndex(cv => cv.dev && equals(cv.dev.id, dev.id) && equals(cv.dev.path, dev.path))
                        if (devIndex !== -1)
                            currentDev.splice(devIndex, 1)
                    }
                }
            }

            if (v.danglecommondev !== undefined) {
                const dev = v.danglecommondev
                const still = devArr.some(dv => dv.danglecommondev && equals(dv.danglecommondev.path, dev.path))
                const dangleDev = currentDev.filter(dv => dv.danglecommondev && equals(dv.danglecommondev.path, dev.path))
                if (still === false) {
                    for (let i = 0; i < dangleDev.length; i++) {
                        const dangle = dangleDev[i].danglecommondev
                        if (dangle === undefined) return
                        const id = dangle.keyboardId !== 0
                            ? dangle.keyboardId
                            : dangle.mouseId !== 0
                                ? dangle.mouseId
                                : 0
                        const index = currentDeviceType.findIndex(dType => {
                            return (equals(dType.id, -id) || dType.pid === 0x4001 || dType.pid === 0x7040)
                                && equals(dType.devAddr, dev.path)
                        })

                        if (index !== -1) {
                            detectSubject.next({
                                type: '设备拔出',
                                deviceType: currentDeviceType[index],
                            })
                            currentDeviceType.splice(index, 1)
                        }
                        const devIndex = currentDev.findIndex(cv => cv.danglecommondev && equals(cv.danglecommondev.path, dev.path))
                        if (devIndex !== -1)
                            currentDev.splice(devIndex, 1)
                    }
                }
            }
        })
        if (len > currentDev.length)
            console.error("设备拔出 currentDev: ", currentDev);
    }

    if (!openAttach) return
    for (let i = 0; i < devArr.length; i++) {
        const line = devArr[i]

        const isExit = currentDev.some(v => equals(line, v))
        if (isExit) continue

        if (line.dev !== undefined) {
            const dev = line.dev

            if (dev.is24 && !dev.isonline) continue
            if (checkIsBlue(dev.id, dev.vid, dev.pid) && !dev.isonline) continue
            const d = devToDeviceType(dev)
            if (d === undefined) continue

            if (!currentDeviceType.some(v => equals(v, d))) {
                detectSubject.next({
                    type: '设备插入',
                    deviceType: d,
                })
                devInfoSubject.next({
                    type: '设备唤醒',
                    battery: dev.battery,
                    batteryState: 0,
                    deviceType: d
                })
                currentDeviceType.push(d)
                currentDev.push(line)
            }
            console.error("dev currentDev: ", currentDev);
        }

        if (line.danglecommondev !== undefined) {
            const dangle = line.danglecommondev
            const id = dangle.keyboardId !== 0
                ? dangle.keyboardId
                : dangle.mouseId !== 0
                    ? dangle.mouseId
                    : 0
            const dangleStatus = dangle.keyboard !== undefined
                ? dangle.keyboard
                : dangle.mouse !== undefined
                    ? dangle.mouse
                    : undefined
            const dev: Device.AsObject = {
                devtype: 0,
                is24: true,
                path: dangle.path,
                id: -id,
                battery: dangleStatus?.status !== undefined
                    ? dangleStatus.status.battery
                    : 0,
                isonline: Boolean(dangleStatus?.status?.isOnline),
                vid: dangle.vid,
                pid: dangle.pid,
            }
            if (!dev.isonline) continue

            const d = devToDeviceType(dev)
            if (d === undefined) continue

            if (!currentDeviceType.some(v => equals(v, d))) {
                detectSubject.next({
                    type: '设备插入',
                    deviceType: d,
                })
                devInfoSubject.next({
                    type: '设备唤醒',
                    battery: dev.battery,
                    batteryState: 0,
                    deviceType: d
                })
                currentDeviceType.push(d)
                currentDev.push(line)
            }
            console.error("danglecommondev currentDev: ", currentDev);
        }
    }
}

const devToDeviceType = (dev: Device.AsObject) => {
    let dt = supportDevices.find(d => dev.id === d.id)

    if (dev.devtype === 1) {
        if (dev.pid === 0x4001) {
            dt = supportDevices.find(d => d.vid === 0x0461 && d.pid === 0x4001)
        } else if (dev.pid === 0x2300) {
            dt = supportDevices.find(d => d.vid === 0x25a7 && d.pid === 0x2300)
        } else {
            dt = supportDevices.find(d => d.vid === 0x0c45 && d.pid === 0x7040)
        }
    }

    if (dt === undefined) return undefined

    const d = new DeviceType()
    Object.assign(d, dt)
    d.devAddr = dev.path
    d.is24 = dev.is24

    d.isblue = checkIsBlue(dev.id, dev.vid, dev.pid)

    return d
}

const checkIsBlue = (id: number, vid: number, pid: number) => {
    if (supportYC500Dev.some(v => id > 0 && v.id === id)) {
        if (vid === 0x3151)
            return pid !== 0x4010 && pid !== 0x4015
        return false
    }
    return false

}

let openAttach = true
export const HIDAttachSwich = (open: boolean) => openAttach = open
export const initUSBDetect = async () => {

    supportDevices = await DeviceType.find({ where: { company: kCompany } })
    console.log(supportDevices)

    try {
        client.watchDevList(new Empty()).on('data', async res => {
            if (res === undefined) return
            devList = res.toObject()
            devlistList = [...devList.devlistList]
            console.error("devList: ", devList);

            findSupportDevice() //<----

        })
    } catch (e) {
        console.error("err: ", e);

    }
}