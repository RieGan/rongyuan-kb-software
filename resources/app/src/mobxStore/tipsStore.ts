import { action, observable } from "mobx";

export class TipsStore {
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
}