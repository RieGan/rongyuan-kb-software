import { action, observable } from 'mobx'
import { DBService, webService, ReturnMSG } from '../sdk/WebService'
import { Config } from '../sdk/DB'
import { BaseStore } from './baseStore'
import { mobxStore } from './store'
import { res } from '../res'

export class ConfigStore extends BaseStore {
  constructor() {
    super()
  }
  @observable
  configList: Config[] = []

  @action.bound
  getConfigListFormDB() {
    this.doAsync(DBService.getConfigs, (v) => {
      //console.log('LEEEEETNNNNNNGGGGGGGGTH', v.length, v)
      this.configList = [...v]
      //console.log('CCCOOOFFFIIIIIGGGGGG',v)
    })
  }
  @action.bound
  async getConfigListFormDBSync() { //分享同步
    await this.doAsync(DBService.getConfigs, (v) => {
      //console.log('LEEEEETNNNNNNGGGGGGGGTH', v.length, v)
      this.configList = [...v]
      //console.log('CCCOOOFFFIIIIIGGGGGG',v)
    })
  }

  @action.bound
  deleteConfig(config: Config) {
    //console.log('DDDEEELLLLCCCOoofing', config)
    if (config.localId === mobxStore.deviceStore.currentConfig.localId) {
      mobxStore.toastStore.setInfo(res.text.当前正在使用的配置无法删除请切换配置后重试())
      return
    }
    this.doAsync(
      DBService.deleteConfig,
      (v) => {
        //console.log('DDDEEEELLLTTTEEEEE')
        this.getConfigListFormDB()
      },
      config
    )
  }

  @action.bound
  saveConfig(config: Config) {
    this.doAsync(
      DBService.saveConfig,
      (v) => {
        this.getConfigListFormDB()
        //
        if (config.localId === mobxStore.deviceStore.currentConfig.localId) {
          if (config.name !== undefined)
            mobxStore.deviceStore.renameCurrentConfig(config)
        }
        //
      },
      config
    )
  }

  @action.bound
  uploadConfigs() {
    //console.log('上传配置')
    this.doAsync(webService.uploadConfigs, (v) => {

      this.getConfigListFormDB()
    })
  }
  @action.bound
  downloadConfigs() {
    // console.log('下载配置')
    this.doAsync(webService.downloadConfigs, (v) => {
      mobxStore.macroStore.refreshMacroList()
      this.getConfigListFormDB()
    })
  }
  commonHandleErr = (err: any) => {
    mobxStore.toastStore.setErr(err)
  }
  commonHandleSuccess = (v: any) => {
    const ret = v as ReturnMSG
    if (ret === undefined) return
    if (ret.errCode === undefined) return
    if (ret.errCode !== 0 && ret.errMsg !== undefined) {
      mobxStore.toastStore.setErr(ret.errMsg)
    }
  }
}
