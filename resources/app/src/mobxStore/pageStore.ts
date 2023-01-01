import { observable, action, autorun } from 'mobx'
import { GA } from '../sdk/GA/ga'
import { BaseStore } from './baseStore'

const kPageMap: {
    [key: number]: string
} = {
    0: '主要设置',
    1: '灯光设置',
    2: '宏编辑',
    3: '方案共享',
    4: '个人中心',
    5: '支持'
}

export class PageStore extends BaseStore {
    constructor() {
        super()
        autorun(() => {
            //console.log('IITTTEEEEMMM', item)
            GA.trackPage(kPageMap[this.pageIndex])
        })
    }
    @observable pageIndex = 0

    @action.bound
    setPageIndex(index: number) {
        this.pageIndex = index
    }
}
