import { observable, action, computed } from 'mobx'
import { detectSubject, devArr, devInfoSubject } from '../sdk/DriverIO/usb/DetectSupportDevice';
import { venderDelayTime, venderSubject } from '../sdk/DriverIO/DeviceAPI/DevFactory'
import { sleep } from '../unitys/timeFunc';
import { BaseStore } from './baseStore'
import { mobxStore } from './store';
import { DeviceType } from '../sdk/DB';
import { equals } from 'ramda';

let timer: NodeJS.Timer;
let venderTimer: NodeJS.Timer;
let sleepTimer: NodeJS.Timer;

export class ToastStore extends BaseStore {
    constructor() {
        super()
        detectSubject.subscribe(async v => {
            if (v.type === '设备插入') {
                const sNum = this.sleepDevArr.findIndex(sv => equals(sv.deviceType.id, v.deviceType.id)
                    && equals(sv.deviceType.devAddr, v.deviceType.devAddr))
                if (sNum !== -1) {
                    this.sleepDevArr[sNum].status = false
                }
            } else {
                const sNum = this.sleepDevArr.findIndex(sv => equals(sv.deviceType.id, v.deviceType.id)
                    && equals(sv.deviceType.devAddr, v.deviceType.devAddr))
                if (sNum !== -1) {
                    this.sleepDevArr.splice(sNum, 1)
                }
            }
        })

        devInfoSubject.subscribe(async v => {
            // if (!mobxStore.deviceStore.currentDev?.deviceType.is24) return
            // console.error("vvvvvvvvvvvvvv: ", v.type);

            if (v.type === "设备睡眠") {
                const sNum = this.sleepDevArr.findIndex(sv => equals(sv.deviceType, v.deviceType))
                if (sNum === -1) {
                    this.sleepDevArr.push({
                        deviceType: v.deviceType,
                        status: true,
                    })
                } else {
                    this.sleepDevArr[sNum].status = true
                }
                console.error("____SLEEP");
                this.devSleepTipsShow = true
                this.devSleeping = true
                clearInterval(sleepTimer)
                if (!mobxStore.deviceStore.currentDev?.deviceType.is24 && !mobxStore.deviceStore.currentDev?.deviceType.isblue) return
                sleepTimer = setInterval(async () => {
                    const len = mobxStore.deviceStore.deviceArr.length
                    const dev = devArr.find(v => {
                        const isonline = (v.dev?.isonline
                            || v.danglecommondev?.keyboard?.status?.isOnline
                            || v.danglecommondev?.mouse?.status?.isOnline)
                        const arr = mobxStore.deviceStore.deviceArr

                        let id = 0
                        let path = ''
                        if (v?.dev !== undefined && v.dev.isonline) {
                            id = v.dev.id
                            path = v.dev.path
                        }

                        if (v.danglecommondev) {
                            if (v.danglecommondev.keyboard?.status?.isOnline) {
                                id = v.danglecommondev.keyboardId
                                path = v.danglecommondev.path
                            }

                            if (v.danglecommondev.mouse?.status?.isOnline) {
                                id = v.danglecommondev.mouseId
                                path = v.danglecommondev.path
                            }
                        }

                        return isonline
                            && arr.some(dv => equals(dv.deviceType.id, id)
                                && equals(dv.deviceType.devAddr.toString(), path))
                    })
                    if (dev === undefined) return
                    const num = mobxStore.deviceStore.deviceArr.findIndex(v => {
                        let id = 0
                        let path = ''
                        if (dev.dev) {
                            id = dev.dev.id
                            path = dev.dev.path
                        }

                        if (dev.danglecommondev?.keyboard?.status?.isOnline) {
                            id = dev.danglecommondev.keyboardId
                            path = dev.danglecommondev.path
                        }

                        if (dev.danglecommondev?.mouse?.status?.isOnline) {
                            id = dev.danglecommondev.mouseId
                            path = dev.danglecommondev.path
                        }

                        return equals(id, v.deviceType.id) && equals(path, v.deviceType.devAddr)
                    })

                    const currentStatus = this.sleepDevArr.find(sv =>
                        equals(sv.deviceType.id, mobxStore.deviceStore.currentDev?.deviceType.id)
                        && equals(sv.deviceType.devAddr, mobxStore.deviceStore.currentDev?.deviceType.devAddr))?.status

                    if (currentStatus !== undefined && currentStatus && num !== -1 && num !== mobxStore.deviceStore.currentSelectIndex && this.devSleepTipsShow && len > 1) {
                        clearInterval(sleepTimer)
                        await sleep(1000)
                        this.devSleepTipsShow = false
                        await mobxStore.deviceStore.setCurrentSelectIndex(num)
                        console.error("设备切换:", v.deviceType.id, "===>", mobxStore.deviceStore.currentDev?.deviceType.id);
                        console.error(v.deviceType.id, v.deviceType.is24 ? '24G' : v.deviceType.isblue ? 'BLUE' : '有线');
                        console.error(mobxStore.deviceStore.currentDev?.deviceType.id, mobxStore.deviceStore.currentDev?.deviceType.is24 ? '24G' : mobxStore.deviceStore.currentDev?.deviceType.isblue ? 'BLUE' : '有线');
                    }
                    if (mobxStore.deviceStore.currentDev?.deviceType.is24 || mobxStore.deviceStore.currentDev?.deviceType.isblue) {
                        this.devSleepTipsShow = true
                    }
                }, 1 * 1000)
            } else {
                const sNum = this.sleepDevArr.findIndex(sv => equals(sv.deviceType, v.deviceType))
                if (sNum === -1) {
                    this.sleepDevArr.push({
                        deviceType: v.deviceType,
                        status: false,
                    })
                } else {
                    this.sleepDevArr[sNum].status = false
                }
                if (equals(mobxStore.deviceStore.currentDev?.deviceType, v.deviceType)) {
                    console.error("WAKE_____2");
                    clearInterval(sleepTimer)
                    await sleep(1 * 1000)
                    this.devSleepTipsShow = false
                    this.devSleeping = false
                }
            }
        })

        venderSubject.subscribe(async v => {
            const devType = devArr.some(v => v.danglecommondev
                && -v.danglecommondev.mouseId === mobxStore.deviceStore.currentDev?.deviceType.id)
                ? 'mouse'
                : 'keyboard'
            if (v.devType !== devType) return
            const str = 'vender'
            if (v.type === '开始') {
                // console.error("开始开始开始开始");
                clearTimeout(venderTimer)
                if (!this.senders.some(v => v === str)) {
                    this.setState('bussy', str)
                    venderTimer = setTimeout(() => {
                        this.setState('idle', str)
                    }, 5 * 1000)
                }
            }
            if (v.type === '停止') {
                //console.error("停止停止停止停止");
                clearTimeout(venderTimer)
                if (this.senders.some(v => v === str)) {
                    venderTimer = setTimeout(() => {
                        this.setState('idle', str)
                    }, venderDelayTime)
                }
            }
        })
        //autorun(() => console.log('SSTTTTAAAATTT', this.state, this.errMsg))
    }
    @observable devSleepTipsShow: boolean = false
    @observable devSleeping: boolean = false
    @observable sleepDevArr: {
        deviceType: DeviceType,
        status: boolean// true睡眠 false在线
    }[] = []

    @observable state: 'bussy' | 'idle' = 'idle'
    senders: string[] = []
    @observable errMsg = ''

    @observable errType: 'error' | 'info' = 'error'

    @action.bound
    closeErr() {
        this.errMsg = ''
    }
    @action.bound
    setInfo(str: string) {
        this.errType = 'info'
        this.errMsg = str
    }
    @action.bound
    setErr(str: string) {
        this.errType = 'error'
        this.errMsg = str
    }
    @action.bound
    setState(s: 'bussy' | 'idle' = 'idle', sender: string) {
        if (s === 'bussy') {
            clearInterval(timer)
            this.senders.push(sender)
            timer = setTimeout(() => {
                if (this.senders.some(v => v === sender)) {
                    this.setState('idle', sender)
                }
            }, 12 * 1000);
        }
        else {
            this.senders.splice(this.senders.indexOf(sender), 1)
        }
        if (this.senders.length === 0) {
            this.state = 'idle'
        } else {
            this.state = 'bussy'
        }
        // console.error('sender=:::::', sender, 'sssss::::', s, this.senders)
    }

    @action.bound
    setGIFState(s: 'bussy' | 'idle' = 'idle', sender: string) {
        if (s === 'bussy') {
            this.senders.push(sender)
        }
        else {
            this.senders.splice(this.senders.indexOf(sender), 1)
        }
        if (this.senders.length === 0) {
            this.state = 'idle'
        } else {
            this.state = 'bussy'
        }
        // console.error('sender=:::::', sender, 'sssss::::', s, this.senders)
    }
    @computed
    get isError() {
        return this.errType === 'error' && this.errMsg !== ''
    }
}
