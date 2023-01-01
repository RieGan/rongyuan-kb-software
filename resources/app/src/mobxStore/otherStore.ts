import { action, observable } from "mobx";
import { BaseStore } from "./baseStore";

export const devOther: Other = {}
export class OtherStore extends BaseStore {
    constructor() {
        super()
        if (this.currentOther === {}) {
            this.currentOther = devOther
        }
    }

    @observable currentOther: Other = {}

    @action.bound
    setCurrentOther(tmp: Other) {
        this.currentOther = tmp
    }

    @action.bound
    setCurrentOtherKey(key: any, str: 'deBounce' | 'sleep') {
        this.currentOther[str] = key
    }
}