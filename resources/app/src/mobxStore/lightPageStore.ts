import { observable, action } from 'mobx'
import { BaseStore } from './baseStore'


export class LightPageStore extends BaseStore {
    @observable pageIndex: number = 0;

    @action.bound
    setPageIndex(index: number) {
        this.pageIndex = index
    }
}