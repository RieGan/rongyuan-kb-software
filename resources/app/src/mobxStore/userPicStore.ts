import { observable, action } from 'mobx'
import { BaseStore } from './baseStore'


export class UserPicStore extends BaseStore {
    @observable
    colorArr = new Array<{
        x: number;
        y: number;
        width: number;
        height: number;
        hid: number;
        index: undefined | number;
        rgb: { r: number, g: number, b: number }
    }>()
    @observable
    userColor = {
        r: 0, g: 0, b: 0
    }

    @observable popUp: boolean = false
    @action.bound
    setPopUp(state: boolean) {
        this.popUp = state
    }
}
