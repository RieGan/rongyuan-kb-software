import { action, observable } from 'mobx'

import { BaseStore } from './baseStore'

import { User } from '../sdk/DB'
import { userChangeSubject } from '../sdk/WebService'
import { mobxStore } from './store'
let TTTTCont = 0
export class UserStore extends BaseStore {

    constructor() {
        super()
        userChangeSubject.subscribe(v => {
            //console.log('11111111',v)
            this.setCurrentUser(v)
            if (TTTTCont !== 0) {
                mobxStore.macroStore.refreshMacroList()
                if(mobxStore.macroStore.currentSelectMacro?.user?.id!=this.user?.id){
                    mobxStore.macroStore.setCurrentSelectMacro(undefined)
                }
                mobxStore.configStore.getConfigListFormDB()
            }
            TTTTCont++
        })
    }

    @observable user: User | undefined

    @action.bound
    private setCurrentUser(user: User | undefined) {
        this.user = user
    }
}
