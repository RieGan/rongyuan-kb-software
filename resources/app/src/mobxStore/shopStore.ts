import { action, observable } from 'mobx'
import { BaseStore } from './baseStore'

let timer: NodeJS.Timeout | undefined = undefined
export class ShopStore extends BaseStore {
    @observable shopKey: boolean = false
    @observable rotIndex: number = 0
    @observable rotLen: number = 4;

    @action
    setShopKey(key: boolean) {
        this.shopKey = key
    }

    @action
    setRotIndex(index: number) {
        this.rotIndex = index
    }

    @action
    setRotLen(len: number) {
        this.rotLen = len
    }

    @action
    start() {
        if (timer !== undefined) clearInterval(timer)
        timer = setInterval(() => {
            this.rotIndex++;
            if (this.rotIndex > this.rotLen - 1) this.rotIndex = 0
        }, 3000)
    }

    @action
    stop() {
        if (timer !== undefined) clearInterval(timer)
    }
}