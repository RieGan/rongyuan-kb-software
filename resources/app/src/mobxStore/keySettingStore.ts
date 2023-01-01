import { observable } from "mobx";
import { BaseStore } from "./baseStore";



export class KeySettingStore extends BaseStore {


    @observable
    currentSelcetSettingsIndex = 0


}