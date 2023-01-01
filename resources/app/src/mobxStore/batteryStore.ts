import { observable } from "mobx";
import { devInfoSubject } from "../sdk/DriverIO/usb/DetectSupportDevice";
// import { batterySubject } from "../sdk/DriverIO/usb/USBDevice";
import { BaseStore } from "./baseStore";
import { mobxStore } from "./store";
// let tmp = 0;
export class BatteryStore extends BaseStore {
    constructor() {
        super()

        // batterySubject.subscribe(async v => {
        //     if (v.battery === 0 && mobxStore.deviceStore.currentDev?.deviceType.is24) return


        //     tmp = 0
        //     if (this.batteryArr.length >= 10) {
        //         this.batteryArr = this.batteryArr.filter((_v, i) => i !== 0)
        //     }

        //     this.batteryArr.push(v.battery)
        //     if (this.batteryArr.length <= 3) {
        //         this.battery = {
        //             battery: v.battery,
        //             state: v.state
        //         }
        //     } else {
        //         const max = Math.max(...this.batteryArr)
        //         const min = Math.min(...this.batteryArr)
        //         if (max === min) tmp = max
        //         else {
        //             const tmpArr = new Array()
        //             const maxIndex = this.batteryArr.findIndex(v => v === max)
        //             const minIndex = this.batteryArr.findIndex(v => v === min)
        //             this.batteryArr.map((v, i) => {
        //                 if (i !== maxIndex && i !== minIndex) tmpArr.push(v)
        //             })
        //             tmpArr.map(v => tmp += v)
        //             tmp = Math.floor(tmp / tmpArr.length)
        //         }
        //         this.battery = {
        //             battery: tmp,
        //             state: v.state
        //         }
        //     }


        // })

        devInfoSubject.subscribe(async v => {
            if (v.battery === 0
                && (mobxStore.deviceStore.currentDev?.deviceType.is24 || mobxStore.deviceStore.currentDev?.deviceType.isblue)) return
            this.battery = {
                battery: v.battery,
                state: v.batteryState
            }
        })
    }

    num: number = 0
    @observable battery: { battery: number, state: number | undefined, } | undefined
    @observable batteryArr: number[] = new Array()
}