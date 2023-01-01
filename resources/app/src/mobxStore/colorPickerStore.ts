import { observable, action } from 'mobx'
import { BaseStore } from './baseStore'


export class ColorPickerStore extends BaseStore {
    constructor() {
        super()
    }
    @observable colorPickerEditState: 'open' | 'close' = 'close'

    @action.bound
    setColorPickerEditState(state: 'open' | 'close') {
        this.colorPickerEditState = state
    }
}
