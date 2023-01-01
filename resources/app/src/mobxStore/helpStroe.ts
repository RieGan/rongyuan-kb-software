import { observable, action } from 'mobx'
import { DeviceType } from '../sdk/DB'
import { DBService } from '../sdk/WebService'
import { BaseStore } from './baseStore'
import { mobxStore } from './store'

export class HelpStore extends BaseStore {
    constructor() {
        super()
        //autorun(() => console.log('SSTTTTAAAATTT', this.state, this.errMsg))
    }
    @observable currentComanyDevList: DeviceType[] = []

    @observable finalList: { displayName: string | undefined, dev: DeviceType[] }[] = new Array()//整合

    @action.bound
    async getCurrentComanyDevList() {
        await this.doAsync(DBService.getCurrentComanyDevList, v => {
            this.finalList.length=0
            this.currentComanyDevList = v
                .filter(v => {
                    if (mobxStore.deviceStore.currentDev?.deviceType.name === "help") {
                        return v.id! < 66 && v.id! > 0
                    }
                    if (mobxStore.deviceStore.currentDev?.deviceType.name === "helpYZW" || mobxStore.deviceStore.currentDev?.deviceType.name === "helpBK") {
                        return v.id! >= 66
                    }
                    // if (mobxStore.deviceStore.currentDev?.deviceType.name === "helpBK") {
                    //     return v.pid === 0x2301
                    // }
                    return;
                })
            const tmp: { displayName: string | undefined, dev: DeviceType[] }[] = new Array()
            //相同的排在一起
            // console.error("zzzz: ", this.currentComanyDevList);

            this.currentComanyDevList.map(v => {
                const disName = v.displayName
                if (!tmp.some(v_tmp => disName === v_tmp.displayName)) {
                    tmp.push({
                        displayName: disName,
                        dev: [v]
                    })
                } else {
                    tmp.map(v_tmp => {
                        if (disName === v_tmp.displayName) {
                            v_tmp.dev.push(v)
                            return
                        }
                    })
                }
            })

            //相同的名字排列排在前面
            for (let i = 0; i < tmp.length; i++) {
                for (let j = 0; j < tmp.length - 1 - i; j++) {
                    if (tmp[j].dev.length < tmp[j + 1].dev.length) {
                        const temp = tmp[j]
                        tmp[j] = tmp[j + 1]
                        tmp[j + 1] = temp
                    }
                }
            }
            //同名字大小排序
            for (let i = 0; i < tmp.length; i++) {
                if (tmp[i].dev.length > 1) {
                    for (let j = 0; j < tmp.length - 1 - i; j++) {
                        if (tmp[j].dev.length > tmp[j + 1].dev.length && tmp[j + 1].dev.length !== 1) {
                            const temp = tmp[j]
                            tmp[j] = tmp[j + 1]
                            tmp[j + 1] = temp

                        }
                    }
                } else {
                    continue;
                }
            }
            // console.error("zzzz: ", tmp);
            tmp.map((v => {
                this.finalList.push(v)
            }))

            return this.finalList
        })

    }

}