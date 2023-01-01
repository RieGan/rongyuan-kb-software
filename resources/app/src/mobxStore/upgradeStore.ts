import { remote } from 'electron'
import { observable, action, computed } from 'mobx'
import { ReturnUpgradeMSG, server_path, webUpgradeService } from '../sdk/WebUpgradeService'
import { kAppVersion, kSDKVersion } from '../appConfig'
import { res } from '../res'
import { DeviceType } from '../sdk/DB'
import { BaseStore } from './baseStore'
import { mobxStore } from './store'
import zlib from 'zlib'

let timer: NodeJS.Timeout | undefined
export class UpgradeStore extends BaseStore {
    constructor() {
        super()
        //autorun(() => console.log('nnnnneeeeeddddd', this.upgradeProgressApp))
    }
    @observable
    appVersion = kAppVersion

    @observable
    appNeedUpgrade = false
    @observable
    appDownloadPath: string | undefined
    @observable
    devNeedUpgrade = false
    @observable
    devDownloadPath: string | undefined
    @observable
    iotNeedUpgrade = false
    @observable
    iotType: webUpgradeService.IotType | undefined

    @observable
    upgradeProgressDev = 1

    @observable
    upgradeProgressApp = 1

    @observable
    count = 3

    @action.bound
    startCountDwon() {
        this.count = 3
        this.stopCountDwon()
        timer = setInterval(() => {
            if (this.count <= 0) this.stopCountDwon()
            this.count--
        }, 1000)
    }

    @action.bound
    stopCountDwon() {
        if (timer) clearInterval(timer)
    }
    @action.bound
    setUpgradeProgressDev(p: number) {
        this.upgradeProgressDev = p
    }
    @action.bound
    setUpgradeProgressApp(p: number) {
        this.upgradeProgressApp = p
    }
    @action.bound
    setAppNeedUpgrade = (t: boolean) => {
        this.appNeedUpgrade = t
    }
    @action.bound
    setDevNeedUpgrade = (t: boolean) => {
        this.devNeedUpgrade = t
    }
    @action.bound
    setIotNeedUpgrade = (t: boolean) => {
        this.iotNeedUpgrade = t
    }
    @computed
    get appNeedUpgrade_() {
        return this.appNeedUpgrade
    }
    @computed
    get devNeedUpgrade_() {
        return this.devNeedUpgrade
    }

    reloadAPP() {
        mobxStore.toastStore.setInfo(res.text.驱动升级成功将自动重启())
        setTimeout(() => {
            remote.app.relaunch()
            remote.app.quit()
        }, 4000);
    }

    @action.bound
    async upgradeApp() {
        //console.log('@@@@@######$$$$$$')
        await this.checkAppVersion()
        await this.checkIotVersion()
        if (this.appNeedUpgrade === false || this.appDownloadPath === undefined) {
            mobxStore.toastStore.setInfo(res.text.驱动已经是最新版本无需更新())
            return
        }
        this.setUpgradeProgressApp(0)
        const progress = (v: number) => {
            let process = v
            if (this.iotNeedUpgrade && this.iotType !== undefined)
                process = v * 0.9
            this.setUpgradeProgressApp(process)
        }
        this.doAsync(webUpgradeService.downloadAppUpgradeFile, () => {
            if (this.iotNeedUpgrade && this.iotType !== undefined) {
                this.doAsync(webUpgradeService.downloadIotFile, () => {
                    this.setUpgradeProgressApp(1)
                    this.reloadAPP()
                }, this.iotType, process.platform === 'darwin' ? 'mac' : 'win')
            } else {
                this.reloadAPP()
            }

        }, this.appDownloadPath, progress)
    }
    @action.bound
    async upgradeIot() {
        await this.checkIotVersion()
        this.setUpgradeProgressApp(0)

        if (!this.iotNeedUpgrade || this.iotType === undefined) return
        this.doAsync(webUpgradeService.downloadIotFile, () => {
            this.setUpgradeProgressApp(1)
            this.reloadAPP()
        }, this.iotType, process.platform === 'darwin' ? 'mac' : 'win')
    }
    @action.bound
    async upgradeDev() {

        //if (this.currentDev?.deviceType.upgradeFileName === undefined || this.currentDev?.deviceType.upgradeFileName === null) {
        await this.checkFwVersion()
        if (this.devNeedUpgrade === false || this.devDownloadPath === undefined) {
            //console.log('!!!!!!!!!',res.text.固件已经是最新版本无需更新())
            mobxStore.toastStore.setInfo(res.text.固件已经是最新版本无需更新())
            return
        }
        //}
        this.setUpgradeProgressDev(0)
        const progress = (v: number) => {
            this.setUpgradeProgressDev(v)
        }
        if (mobxStore.deviceStore?.currentDev?.deviceType.id === undefined) return
        // iot / fw ==> buf =>> zlib.deflateRawSync(buf)
        this.doAsync(webUpgradeService.downloadDevUpgradeFile, v => {
            if (v.errCode !== 0 || mobxStore.deviceStore.currentDev === undefined) return
            const data = zlib.inflateRawSync(v.data)
            this.doAsync(mobxStore.deviceStore.currentDev.upgrade, v1 => {
                if (v1) {
                    mobxStore.deviceStore.getDevVersion()
                }
            }, data, progress)
        }, this.devDownloadPath)
    }
    appVersionV1BiggerThanV2 = (v1: string, v2: string) => {
        const v1a = v1.split('.')
        const v2a = v2.split('.')

        if (v1a.length !== v2a.length || v1a.length < 3) {
            console.log('非法版本号')
            return false
        }
        console.error(v1, v2)
        const v1Nmuber = Number(v1a[0]) * 100000 + Number(v1a[1]) * 1000 + Number(v1a[2])
        const v2Nmuber = Number(v2a[0]) * 100000 + Number(v2a[1]) * 1000 + Number(v2a[2])
        console.log('v1:', v1Nmuber, '  v2:', v2Nmuber)
        return v1Nmuber > v2Nmuber

    }

    @action.bound
    getAppVersion() {
        return new Promise<webUpgradeService.AppType | undefined>(reslove => {
            this.doAsync(webUpgradeService.getAppVersion, v => {
                if (v.errCode !== 0) return reslove(undefined)
                return reslove(v.data)
            })
        })
    }

    @action.bound
    getFwVersion() {
        return new Promise<webUpgradeService.FwType | undefined>(reslove => {
            if (mobxStore.deviceStore.currentDev?.deviceType.id === undefined)
                return reslove(undefined)
            this.doAsync(webUpgradeService.getFwVersion, v => {
                if (v.errCode !== 0)
                    return reslove(undefined)
                return reslove(v.data)
            }, mobxStore.deviceStore.currentDev?.deviceType.id)
        })
    }

    @action.bound
    getIotVersion() {
        return new Promise<webUpgradeService.IotType | undefined>(reslove => {
            this.doAsync(webUpgradeService.getIotVersion, v => {
                if (v.errCode !== 0)
                    return reslove(undefined)
                return reslove(v.data)
            }, process.platform === 'darwin' ? 'mac' : 'win')
        })
    }

    @action.bound
    async checkAppVersion() {
        this.appDownloadPath = undefined
        const appVersion = await this.getAppVersion()

        if (appVersion === undefined) return
        if (this.appVersionV1BiggerThanV2(appVersion.lowest_version_str, this.appVersion)) {
            mobxStore.toastStore.setInfo(res.text.当前驱动版本过低请重新下载安装())
            this.setAppNeedUpgrade(false)
            this.appDownloadPath = undefined
        } else {
            const bol = this.appVersionV1BiggerThanV2(appVersion.version_str, this.appVersion)
            this.setAppNeedUpgrade(bol)
            if (bol)
                this.appDownloadPath = appVersion.file_path
        }
    }

    @action.bound
    async checkFwVersion() {
        this.appDownloadPath = undefined
        this.devDownloadPath = undefined
        const appVersion = await this.getAppVersion()

        if (appVersion === undefined) return
        if (this.appVersionV1BiggerThanV2(appVersion.lowest_version_str, this.appVersion)) {
            mobxStore.toastStore.setInfo(res.text.当前驱动版本过低请重新下载安装())
            this.setAppNeedUpgrade(false)
        } else {
            const bol = this.appVersionV1BiggerThanV2(appVersion.version_str, this.appVersion)
            this.setAppNeedUpgrade(bol)
            if (bol)
                this.appDownloadPath = appVersion.file_path
        }

        const fwVersion = await this.getFwVersion()
        if (fwVersion === undefined) {
            console.log('该设备不在服务器中')
            return
        }

        const fwv = this.fwVersionToNum(fwVersion.version_str, 'fw')
        if (fwv === undefined) {
            console.log('该设备不在服务器中')
            return
        }

        const bol = Number(mobxStore.deviceStore.currentDevVersion) !== fwv
        console.log('FWVERSION:', mobxStore.deviceStore.currentDevVersion, fwVersion, bol)
        this.setDevNeedUpgrade(bol)
        if (bol) this.devDownloadPath = fwVersion.file_path

        if (this.appVersionV1BiggerThanV2(appVersion.lowest_version_str, kAppVersion)) {
            this.setDevNeedUpgrade(false)
            this.devDownloadPath = undefined
            mobxStore.toastStore.setErr(res.text.当前驱动版本过低已无法适配最新固件请更新驱动())
            return
        }

        if (mobxStore.deviceStore.currentDev === undefined)
            return

        // mobxStore.deviceStore.currentDev.deviceType.severVersion = fwVersion.version_str.toString()
        mobxStore.deviceStore.currentDev.deviceType.severVersion = fwv.toString()
        DeviceType.find().then(v1 => {
            //console.log(this.devNeedUpgrade)
            v1.forEach(vv => {
                vv.severVersion = fwv.toString()
            })
            if (!this.devNeedUpgrade) {
                //mobxStore.toastStore.setInfo('已经是最新版本,无需更新')
            }

        })
    }

    @action.bound
    async checkIotVersion() {
        this.iotType = undefined
        const iotVersion = await this.getIotVersion()
        if (iotVersion === undefined) return
        const v1 = this.fwVersionToNum(kSDKVersion, 'iot')
        const v2 = this.fwVersionToNum(iotVersion.iot_driver_version_str, 'iot')
        if (v1 === undefined || v2 === undefined) return
        const bol = v1 < v2
        this.setIotNeedUpgrade(bol)
        if (bol) this.iotType = iotVersion
        console.error("BBBB: ", bol);

    }

    fwVersionToNum(version: string, type: 'fw' | 'iot') {
        if (version[0].toLocaleLowerCase() !== 'v') return undefined
        const str = version.slice(1, version.length)
        if (Number(str) === NaN) return undefined

        if (type === 'iot') return Number(str)

        return parseInt(str, 16)
    }

    commonHandleErr = (err: any) => {
        // mobxStore.toastStore.setErr(err)
        if (err.request !== undefined) {
            mobxStore.toastStore.setErr(res.text.网络连接失败())
        } else {
            mobxStore.toastStore.setErr(err)
        }
    }
    commonHandleSuccess = (v: any) => {
        if (v === undefined) return
        //if ('errCode' in v && v.errCode !== undefined) {
        const ret = v as ReturnUpgradeMSG
        if (ret.errCode !== 0 && ret.errMsg !== undefined) {
            if (ret.response?.config.url===server_path+'/get_app_version'&&ret.errMsg==='Record not found') {
                return
            }
            mobxStore.toastStore.setErr(ret.errCode < 0 ? res.text.网络连接失败() : ret.errMsg.toString())

        }
        //}



    }
}
