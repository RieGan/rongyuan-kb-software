import { action, observable, autorun, when, reaction } from 'mobx'
import { webService, ReturnMSG } from '../sdk/WebService'
import { BaseStore } from './baseStore'
import { mobxStore } from './store'
import { Macro, Config } from '../sdk/DB'
import { res } from '../res'

export type RankType = 'time' | 'count'
export class ShareStore extends BaseStore {
    constructor() {
        super()
        setTimeout(() => {
            when(() => mobxStore.pageStore.pageIndex === this.macrosPage, () => {
                this.autoRefresh()
            })
            reaction(() => mobxStore.deviceStore.currentDev, v => {
                this.autoRefresh()
            })
        }, 100)

    }
    @observable currentShareListType: 'macro' | 'config' = 'config'
    @observable currentShareListNum: 0 | 1 = 0 // 1'macro' 0'config'

    @observable configShareList: webService.SharedConfig[] = []
    @observable macroShareList: webService.SharedMacro[] = []
    @observable configPageIndex = 0
    @observable configPageCount = 1
    @observable configPageType: RankType = 'time'
    @observable macrosPageindex = 0
    @observable macrosPageCount = 1
    @observable macrosPageType: RankType = 'time'
    // @observable statesCount=0
    @observable inputDescribre: string = ''
    @observable macrosPage: number = 3


    // @action.bound getConfigShareList = this.ioFuncCompose(webService.getSharedConfigList, data => this.configShareList = [...data])
    // @action.bound getMacroShareListthis = this.ioFuncCompose(webService.getSharedMacroList, data => this.macroShareList = [...data])
    // @action.bound downloadSharedConfig = this.ioFuncCompose(webService.downloadSharedConfig, () => mobxStore.configStore.getConfigListFormDB())
    // @action.bound downloadSharedMacro = this.ioFuncCompose(webService.downloadSharedMacro, () => { })
    // @action.bound shareMacro = this.ioFuncCompose(webService.shareMacro, () => { })
    // @action.bound shareConfig = this.ioFuncCompose(webService.shareConfig, () => { })
    @action.bound
    setmacrosPage(p: number) {
        this.macrosPage = p
    }
    //分享描述
    @action.bound
    setinputDescribre(p: string) {
        this.inputDescribre = p
    }
    @action.bound
    setCurrentShareListNum(p: 0 | 1) {
        this.currentShareListNum = p
    }

    @action.bound
    setPageCount() {
        this.configPageIndex = 0
        this.macrosPageindex = 0
        // this.statesCount=0
    }

    @action.bound
    setShareListPage(type: 'macro' | 'config', rankType: RankType) {
        this.currentShareListType = type
        if (this.currentShareListType === 'config') {
            this.configPageType = rankType
            this.currentShareListNum = 0
        }
        else if (this.currentShareListType === 'macro') {
            this.macrosPageType = rankType
            this.currentShareListNum = 1
        }
    }

    @action.bound
    autoRefresh() {
        if (mobxStore.pageStore.pageIndex === this.macrosPage && mobxStore.deviceStore.currentDev !== undefined) {
            if (this.currentShareListType === 'config') {
                this.getConfigShareList(this.configPageType, 0)
            }
            else if (this.currentShareListType === 'macro') { this.getMacroShareList(this.macrosPageType, 0) }
        }
    }
    @action.bound
    setCurrentShareListType(type: 'macro' | 'config') {
        if (type === this.currentShareListType) return
        this.currentShareListType = type
        if (type === 'macro' && this.macroShareList.length === 0) {
            this.getMacroShareList(this.macrosPageType, 0)
        }
        if (type === 'config' && this.configShareList.length === 0) {
            this.getConfigShareList(this.configPageType, 0)
        }


    }
    @action.bound
    getConfigShareList(rankType: RankType, page: number) {
        console.log('刷新刷新刷新!!!!!!!!')
        this.doAsync(webService.getSharedConfigList, (v) => {
            if (v.errCode !== 0) {
                mobxStore.toastStore.setErr('刷新太频繁啦歇会吧')
                return
            }
            this.configShareList = [...v.data.shareList]
            this.configPageIndex = page
            this.configPageCount = Math.ceil(v.data.itemCount / 10)
            this.configPageType = rankType
            //console.log( 'SSSSSSSSSSS',v,Math.ceil(v.data.itemCount / 10),v.data.itemCount)
        }, rankType, page)
    }
    @action.bound
    getMacroShareList(rankType: RankType, page: number) {
        this.doAsync(webService.getSharedMacroList, (v) => {
            if (v.errCode !== 0) {
                mobxStore.toastStore.setErr('刷新太频繁啦歇会吧')
                return
            }
            this.macroShareList = [...v.data.shareList]
            this.macrosPageindex = page
            this.macrosPageCount = Math.ceil(v.data.itemCount / 10)
            this.macrosPageType = rankType
            // console.log('macro',rankType,page, this.configPageIndex,this.configPageIndexTime);
        }, rankType, page)
    }

    @action.bound
    downloadSharedConfig(sharedConfig: webService.SharedConfig) {

        if (mobxStore.userStore.user === undefined) {
            mobxStore.toastStore.setInfo(res.text.请先登录())
            return
        }
        const config = sharedConfig.config
        if (config.value === undefined) throw 'downloadSharedConfig value empty'
        if (config.deviceType?.layout?.light.isRgb !== mobxStore.deviceStore.currentDev?.deviceType.layout?.light.isRgb) {
            config.light = { type: 'LightOff' }
        }
        for (let i = 0; i < config.value.length; i++) {
            const cv = config.value[i]
            if (cv.type === 'ConfigMacro') {
                if (mobxStore.deviceStore.currentDev?.checkMacroLenthIsFull(cv.macro)) {
                    mobxStore.toastStore.setInfo(res.text.宏过长与当前设备不适配())
                    return
                }
            }
        }

        this.doAsync(webService.downloadSharedConfig, (v) => {
            sharedConfig.downloadTimes++
            this.configShareList = [...this.configShareList]
            mobxStore.configStore.getConfigListFormDB()
        }, sharedConfig)
    }
    @action.bound
    downloadSharedMacro(sharedMacro: webService.SharedMacro) {
        if (mobxStore.userStore.user === undefined) {
            mobxStore.toastStore.setInfo(res.text.请先登录())
            return
        }
        if (sharedMacro.macro.value?.macro === undefined) throw 'downloadSharedMacro empty'
        if (mobxStore.deviceStore.currentDev?.checkMacroLenthIsFull(sharedMacro.macro.value?.macro)) {
            mobxStore.toastStore.setInfo(res.text.宏过长与当前设备不适配())
            return
        }

        this.macroShareList = [...this.macroShareList]
        this.doAsync(webService.downloadSharedMacro, (v) => {
            sharedMacro.downloadTimes++
            this.macroShareList = [...this.macroShareList]
            mobxStore.macroStore.refreshMacroList()
        }, sharedMacro)
    }

    @action.bound
    shareMacro(macro: Macro, describe: string) {
        if (mobxStore.userStore.user === undefined) {
            mobxStore.toastStore.setInfo(res.text.请先登录())
            return
        }
        this.doAsync(webService.shareMacro, (v) => {

        }, macro, describe)
    }

    @action.bound
    shareConfig(config: Config, describe: string) {

        if (mobxStore.userStore.user === undefined) {
            mobxStore.toastStore.setInfo(res.text.请先登录())
            return
        }
        this.doAsync(webService.shareConfig, (v) => {

        }, config, describe)
    }
    commonHandleErr = (err: any) => {
        mobxStore.toastStore.setErr(err)
    }
    commonHandleSuccess = (v: any) => {
        const ret = v as ReturnMSG
        if (ret.errCode === undefined) return
        if (ret.errCode !== 0 && ret.errMsg !== undefined) {

            mobxStore.toastStore.setErr(ret.errCode < 0 ? res.text.网络连接失败() : ret.errMsg.toString())

        }
    }
}






























    // import { Macro, Config } from '../sdk/DB'



    // @action.bound
    // getConfigShareList(rankType: 'time' | 'count', page: number) {
    //     this.doAsync(webService.getSharedConfigList, (v) => {
    //         if (v.errCode !== 0) {
    //             this.state = 'error'
    //             return
    //         }
    //         this.configShareList = [...v.data]
    //     }, rankType, page)
    // }
    // @action.bound
    // getMacroShareList(rankType: 'time' | 'count', page: number) {
    //     this.doAsync(webService.getSharedMacroList, (v) => {
    //         if (v.errCode !== 0) {
    //             this.state = 'error'
    //             return
    //         }
    //         this.macroShareList = [...v.data]
    //     }, rankType, page)
    // }

    // @action.bound
    // downloadSharedConfig(sharedConfig: webService.SharedConfig) {
    //     this.doAsync(webService.downloadSharedConfig, (v) => {
    //         mobxStore.configStore.getConfigListFormDB()
    //     }, sharedConfig)
    // }
    // @action.bound
    // downloadSharedMacro(sharedMacro: webService.SharedMacro) {
    //     this.doAsync(webService.downloadSharedMacro, (v) => { }, sharedMacro)
    // }

    // @action.bound
    // shareMacro(macro: Macro) {
    //     this.doAsync(webService.shareMacro, (v) => { }, macro)
    // }

    // @action.bound
    // shareConfig(config: Config) {
    //     this.doAsync(webService.shareConfig, (v) => { }, config)
    // }