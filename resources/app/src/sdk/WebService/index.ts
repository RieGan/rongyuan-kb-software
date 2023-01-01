//全部web接口和本地数据库
import axios, { AxiosResponse } from 'axios'
import { User, Config, Macro, DeviceType, CurrentConfig } from '../DB'
import { detectSubject, devlistList } from '../DriverIO/usb/DetectSupportDevice'

import { MouseInterface } from '../DriverIO/DeviceAPI/MouseInterface'
import { KeyboardInterface } from '../DriverIO/DeviceAPI/KeyboardInterface'
import { equals } from 'ramda'
import { SessionUser } from '../DB/entity/session_user'
import { Subject } from 'rxjs'
import { GA } from '../GA/ga'
import moment from 'moment'
import { CreateDeviceByDeviceType } from '../DriverIO/DeviceAPI/DevFactory'
import * as fs from 'fs'
import * as path from 'path'

import AdmZip from 'adm-zip'
import { appPath, kCompany, kSeverAddr } from '../../appConfig'
import { Not } from 'typeorm'
import { MusicLightConfig } from '../../res/lightLayout/rongyuanRGBLayout'
import { mobxStore } from '../../mobxStore/store'
import { sleep } from '../../unitys/timeFunc'
import { setLightType } from '../DriverIO/usb/client'


moment.locale('zh-cn')
export type ReturnMSG<T = {}> =
  | {
    errCode: 0 //0是成功
    data: T
    response?: AxiosResponse<any>
  }
  | {
    errCode: -1 | '本地DB错误'
    errMsg: string
    response?: AxiosResponse<any>
  }


axios.defaults.adapter = require('axios/lib/adapters/http') //指定 使用 node



export const userChangeSubject = new Subject<User | undefined>()
let currentUser: User | undefined = undefined
export const getCurrentUser = async () => {
  //console.log('CCCUUUURRRREEENNNTTTT', currentUser)
  const session = await SessionUser.getSession()
  if (session === undefined) {
    if (currentUser !== undefined)
      userChangeSubject.next(undefined)
    currentUser = undefined
    return undefined
  }
  //console.log('SSSSEEESSSIIIOOONNNN', session)

  const res = await User.findOne(session.userId, {
    where: { company: kCompany },
    relations: [
      'macros',
      'configs',
      'deviceTypes',
      'macros.deviceType',
      'configs.deviceType',
    ],
  })

  if (!equals(currentUser, res))
    userChangeSubject.next(res)
  currentUser = res
  //console.log('RRREEESSSSS', res)
  return res
}

const saveUser = async <T extends { user: any }>(
  data: T
): Promise<ReturnMSG<User>> => {
  //console.log(data)
  const userData = data.user
  const user = new User()
  Object.assign(user, userData)
  try {
    user.configs = undefined
    user.macros = undefined
    if (user.deviceTypes !== undefined) {
      const devList: DeviceType[] = []
      for (let index = 0; index < user.deviceTypes.length; index++) {
        const devObj = user.deviceTypes[index]
        const dev = new DeviceType()
        Object.assign(dev, devObj)
        devList.push(dev)
      }
      user.deviceTypes = devList
    }
    //user.deviceTypes = undefined
    const tU = await User.findOne(user.id, { relations: ['deviceTypes'] })
    if (tU !== undefined && tU.deviceTypes !== undefined) {
      const localDevArr = tU.deviceTypes
      let tmpArr = user.deviceTypes === undefined ? [] : [...user.deviceTypes]
      localDevArr.forEach(v => {
        tmpArr = tmpArr.filter(v2 => (v2.pid !== v.pid) && (v2.vid !== v.vid))
      })
      user.deviceTypes = localDevArr.concat(tmpArr)
      //console.log('LLLLLL', tU, user.deviceTypes)
    }
    //console.log('!!!!!!!', user.deviceTypes)
    let userRes
    try {
      userRes = await user.save()
    } catch (error) {
      const tmpUser = await User.find({
        where: [{ email: user.email }]
      })
      await User.remove(tmpUser)
      userRes = await user.save()
    }

    console.log(userRes)
    if (userRes.id === undefined)
      throw 'user id === undefine 本地数据库User表可能被删除了'

    userChangeSubject.next(userRes)

    return {
      errCode: 0,
      data: userRes,
    }
  } catch (error: any) {
    return {
      errCode: '本地DB错误',
      errMsg: error,
    }
  }
}

const httpClient = async <T>(
  url: string,
  data?: any
): Promise<ReturnMSG<T>> => {
  const session = await SessionUser.getSession()

  let localCookie = ''
  if (session === undefined) localCookie = ''
  else {
    const end = session.session.indexOf('; Path');
    if (end === -1) localCookie = session.session
    else localCookie = session.session.slice(0, end)
  }
  //console.log(JSON.stringify(data))
  const beginTime = new Date().getTime()
  try {
    const response = await axios.post(url,
      {
        ...data,
        company: kCompany
      },
      {
        headers: {
          Cookie: localCookie,
          "platform": process.platform
          //'Content-Type': 'application/json'
        },
        //baseURL: 'http://localhost.charlesproxy.com:3000/v1',

        baseURL: kSeverAddr,
        withCredentials: true,
        timeout: 8000,
        validateStatus: (status) => true, //无论 status 是多少 都 解析
      })
    console.log(response)
    if (response.data.errCode === 2) {
      await SessionUser.delSession()
      userChangeSubject.next(undefined)
    }
    const endTime = new Date().getTime()
    GA.trackTime('httpSuccess', url, endTime - beginTime)
    return {
      ...response.data,
      response,
    }
  } catch (error: any) {
    console.log(error.request)
    console.log('EEERRRROOORRRR', error)
    const endTime = new Date().getTime()
    GA.trackTime('httpFailed', url, endTime - beginTime, error.code)
    return {
      errCode: -1,
      errMsg: error.code + '  ' + error.config.url,
    }
  }
}
const httpDownload = async (
  url: string,
  saveFileName: string,
  data?: any,
  onDownloadProgress?: (v: number) => void
): Promise<string> => {
  const beginTime = new Date().getTime()
  try {

    const response = await axios.post(url,
      {
        ...data,
        company: kCompany
      },
      {
        responseType: 'stream',
        baseURL: kSeverAddr,
        withCredentials: true,
        timeout: 20000,

      })
    //console.log('返回成功', response.data)

    const filePath = path.join(__dirname, saveFileName)


    console.log(saveFileName, filePath)
    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer)

    const endTime = new Date().getTime()

    const totalLength = response.headers['content-length']
    let curLength = 0
    response.data.on('data', (v: Buffer) => {
      curLength = curLength + v.length
      if (onDownloadProgress)
        onDownloadProgress(curLength / totalLength)
    })
    return new Promise((resolve, reject) => {
      writer.on("finish", () => {
        GA.trackTime('httpDownloadSuccess', url, endTime - beginTime)
        resolve(filePath)
      });
      writer.on("error", (err) => reject({ msg: '写入文件错误!!', err }));
    });

  } catch (error: any) {
    console.log(error.request)
    console.log('EEERRRROOORRRR', error)
    const endTime = new Date().getTime()
    GA.trackTime('httpDwonloadFailed', url, endTime - beginTime, error.code)
    return new Promise((_, reject) => {
      reject(error)
    })
  }
}

export const downloadDevUpgradeFile = async (deviceId: number): Promise<string | undefined> => {
  return await httpDownload('/downloadDevUpgradeFile', 'devUpgrade_' + deviceId, { "deviceId": deviceId })

}
export const downloadAppUpgradeFile = async (progress: (p: number) => void): Promise<void> => {
  const zippath = await httpDownload('/downloadAppUpgradeFile', 'upgrade_dist.zip', {}, (v) => {

    progress(v * 0.85)

  })
  const zip = new AdmZip(zippath)

  var zipEntries = zip.getEntries() // an array of ZipEntry records
  //console.log(zipEntries, zipEntries.map(v => v.entryName))

  // if (fs.existsSync(__dirname)) {
  //   fs.readdirSync(__dirname).forEach(v => {
  //     try {
  //       if (!v.includes('.dll'))
  //         fs.unlinkSync(path.join(__dirname, v))
  //     } catch (error) {
  //       console.log('删除文件失败', error)
  //     }

  //   })
  // }
  const zipProgress = 0.85
  zipEntries.forEach((v, i) => {
    console.log('vvvv', v.entryName, path.join(__dirname, '..', 'company', 'company_' + kCompany, v.entryName))

    console.error(zipProgress + ((i / zipEntries.length) * 0.14))
    progress(zipProgress + ((i / zipEntries.length) * 0.14))
    if (v.entryName !== 'dist.zip') {
      zip.extractEntryTo(v.entryName, path.join(__dirname, '..', 'company', 'company_' + kCompany), true, true)

      return
    }
    //console.log('1111111111111111')
    zip.extractEntryTo(v.entryName, __dirname, false, true)
    console.log('dist.zip  :::: path ====   ', path.join(__dirname, 'dist.zip'))
    const zipdist = new AdmZip(path.join(__dirname, 'dist.zip'))
    var zipdistEntries = zipdist.getEntries()
    zipdistEntries.forEach((p, j) => {
      if (p.entryName === 'dist/' || p.entryName.includes('_MACOSX/')) {
        return
      }
      if (p.entryName.includes('.dll')) {

        zipdist.extractEntryTo(p.entryName, path.join(appPath(), 'dll'), false, true)
        return
      }
      console.log('dddiissstttt', p.entryName)
      zipdist.extractEntryTo(/*entry name*/p.entryName, /*target path*/__dirname, /*maintainEntryPath*/false, /*overwrite*/true);
    })

  })

  //zip.extractEntryTo(/*entry name*/'dist/', /*target path*/__dirname, /*maintainEntryPath*/false, /*overwrite*/true);

  progress(1)
  //console.log('zipEntrieszipEntrieszipEntries', zipEntries)
  //zip.extractAllTo(/*target path*/__dirname, /*overwrite*/true);
}
export const test = async () => {
  // const t = await Macro.find()
  // const macro = t[0]
  // macro.category = '改之前/改之前/改之前/改之前/改之前/改之前'
  // await DBService.saveMacro(macro)
  // console.log(
  //   'TTTTTTJ::::',
  //   DBService.macrosToFolder(await DBService.getMacros())
  // )
  // macro.category = '改之后/改之后'
  // await DBService.saveMacro(macro)
  // console.log(
  //   'TTTTTTJ2222',
  //   DBService.macrosToFolder(await DBService.getMacros())
  // )

  //await DBService.getConfigs()
  console.log(
    'userRegister:  ',
    await webService.userRegister('mailtest', 'male', '81423609@qq.com', '2123456')
  )
  console.log(
    'userLogin:  ',
    await webService.userLogin('81423609@qq.com', '2123456')
  )
  // console.log(
  //   'reqFindPassVerifyCode:  ',
  //   await webService.reqFindPassVerifyCode('381423609@qq.com')
  // )
  // console.log(
  //   'reqFindPassVerifyCode:  ',
  //   await webService.findPassword('381423609@qq.com','2W3SQP','111111')
  // )

  // console.log('userInfo:  ', await webService.userInfo())
  // console.log('userChangePassword:  ', await userChangePassword('123456','2123456'))
  // console.log('userInfo:  ', await userInfo())
  //console.log('userLogout:  ', await webService.userLogout())
  // console.log('userInfo:  ', await webService.userInfo())
  // console.log(
  //   '-----------downloadConfigs: ',
  //   await webService.downloadConfigs()
  // )
  //await testData()
  //const c = await Config.find()
  // const m = await Macro.find()
  // console.log('c :', c, 'm :', m)
  // console.log('shareConfig: ', await webService.shareConfig(c[0]))
  // console.log(
  //   'getSharedConfigList: ',
  //   await webService.getSharedConfigList('time', 0)
  // )
  // //console.log('shareMacro: ', await webService.shareMacro(m[0]))
  //console.log('uploadConfigs: ', await webService.uploadConfigs())
  //console.log('downloadConfigs: ', await webService.downloadConfigs())
}

export namespace webService {
  export const userRegister = async (
    userName: string,
    gender: 'male' | 'female',
    email: string,
    password: string
  ) => {
    return await httpClient('/register', {
      userName,
      gender,
      email,
      password,
    })
  }

  export const userLogin = async (email: string, password: string) => {
    const res = await httpClient<{ user: any }>('/login', {
      email,
      password,
    })
    if (res.errCode !== 0) return res as ReturnMSG<User>

    if (res.response === undefined) return (res as any) as ReturnMSG<User>

    const cookie = res.response.headers['set-cookie']

    if (cookie !== undefined && cookie.length !== 0) {
      let session: string = cookie[0]
      const num = session.indexOf('; Path')
      if (num !== -1)
        session = session.slice(0, num)

      SessionUser.setSession(session, res.data.user.id)
    }

    return await saveUser(res.data)
  }

  export const userInfo = async () => {
    const res = await httpClient<{ user: any }>('/get_user_info')
    if (res.errCode !== 0) return res
    return await saveUser(res.data)
  }

  export const userLogout = async () => {
    const res = await httpClient('/logout')
    if (res.errCode !== 0) return res
    await SessionUser.delSession()
    userChangeSubject.next(undefined)
    return res
  }

  export const userChangePassword = async (
    oldPassword: string,
    newPassword: string
  ) => {
    return await httpClient('/change_password', { oldPassword, newPassword })
  }

  export const reqFindPassVerifyCode = async (email: string) => {
    return await httpClient('/req_find_password_verify_code', { email })
  }

  export const findPassword = async (
    email: string,
    verifyCode: string,
    password: string
  ) => {
    return await httpClient('/find_password', { email, verifyCode, password })
  }

  export const downloadConfigs = async () => {
    const user = await getCurrentUser()
    if (user === undefined) throw '没登录 无法调用 downloadConfigs'

    const res = await httpClient<{ configs: any; macros: any }>(
      '/download_configs'
    )

    if (res.errCode !== 0) return res

    const { configs, macros } = res.data

    for (let i = 0; i < configs.length; i++) {
      const config = new Config()
      Object.assign(config, configs[i])
      config.hasUpload = true
      config.user = user
      const tmp = await Config.findOne({ where: { serverId: config.serverId } })
      if (tmp !== undefined) config.localId = tmp.localId
      //console.log('ccccooonnfffiigggsssss', config)
      await config.save()
    }
    for (let i = 0; i < macros.length; i++) {
      const macro = new Macro()
      Object.assign(macro, macros[i])
      macro.hasUpload = true
      macro.user = user
      const tmp = await Macro.findOne({ where: { serverId: macro.serverId } })
      if (tmp !== undefined) macro.localId = tmp.localId
      await macro.save()
    }

    return res
  }

  export const uploadConfigs = async () => {
    const user = await getCurrentUser()

    if (user === undefined) {
      throw '用户没登录无法调用 uploadConfigs'
    }

    //本地如果有 没登录时 制作的 宏 或者 方案  , 谁第一个登录 就算谁的
    const configsAll = await Config.find({
      where: [{ user: null, hasUpload: false }, { user: user, hasUpload: false }],
      relations: ['deviceType'],
    })
    const macrosAll = await Macro.find({
      where: [{ user: null, hasUpload: false }, { user: user, hasUpload: false }],
      relations: ['deviceType'],
    })
    //



    const needDeleteConfigIds = configsAll
      .filter((v) => v.needDelete === true && v.serverId !== undefined)
      .map((v) => v.serverId)
    const needDeleteMacroIds = macrosAll
      .filter((v) => v.needDelete === true && v.serverId !== undefined)
      .map((v) => v.serverId)

    const configs = configsAll.filter((v) => v.needDelete === false)
    const macros = macrosAll.filter((v) => v.needDelete === false)

    const res = await httpClient<{
      configServerIdArr: {
        localId: number
        serverId: number
      }[]
      macroServerIdArr: {
        localId: number
        serverId: number
      }[]
    }>('/upload_configs', {
      configs,
      macros,
      needDeleteConfigIds,
      needDeleteMacroIds,
    })

    if (res.errCode !== 0) return res

    const newConfigs = configs.map((v) => {
      v.hasUpload = true
      v.user = user
      return v
    })
    const newMacros = macros.map((v) => {
      v.hasUpload = true
      v.user = user
      return v
    })

    await Config.save(newConfigs)
    await Macro.save(newMacros)

    ///

    const { configServerIdArr, macroServerIdArr } = res.data

    for (let i = 0; i < configServerIdArr.length; i++) {
      const idobj = configServerIdArr[i]
      const config = await Config.findOne(idobj.localId)
      if (config === undefined) throw 'config 里找不到服务器返回的local id'
      config.serverId = idobj.serverId
      await config.save()
    }

    for (let i = 0; i < macroServerIdArr.length; i++) {
      const idobj = macroServerIdArr[i]
      const macro = await Macro.findOne(idobj.localId)
      if (macro === undefined) throw 'macro 里找不到服务器返回的local id'
      macro.serverId = idobj.serverId
      await macro.save()
    }
    ///
    await Config.remove(configsAll.filter((v) => v.needDelete === true))
    await Macro.remove(macrosAll.filter((v) => v.needDelete === true))

    return res
  }
  export const checkVersion = async () => {
    const res = await httpClient<{
      devVersion: {
        devId: number,
        version: number,
        lowestAppVersion: string,
      }[],
      appVersion: string,
      baseAppVersion: string
    }>('/getVersion')
    return res
  }
  export const shareConfig = async (config: Config, describe: string) => {
    config.isShared = true
    const res = await httpClient<{ server_id: number }>('/share_config', { config, describe })
    ///console.log('RRRSSSSSS', res, config, await getCurrentUser())
    if (res.errCode !== 0) return res
    config.serverId = res.data.server_id
    await config.save()

    return res
  }

  export const shareMacro = async (macro: Macro, describe: string) => {
    macro.isShared = true
    const res = await httpClient<{ server_id: number }>('/share_macro', { macro, describe })
    // console.error("macro: ", macro);
    // console.error("xxxx: ", res);
    if (res.errCode !== 0) return res
    macro.serverId = res.data.server_id
    await macro.save()

    return res
  }
  export type SharedConfig = {
    describe: string
    config: Config
    createAt: string
    downloadTimes: number
    id: number
    updatedAt: string
  }
  export const getSharedConfigList = async (
    rankType: 'time' | 'count',
    page: number
  ) => {
    //{ rankType, page, deviceGroup, deviceType }
    const deviceGroup = DBService.getCurrentDev()?.deviceType.group
    const deviceType = DBService.getCurrentDev()?.deviceType.type
    // console.log('DDDEEEVVVTTTYYYPPPPEEE', deviceType)
    const res = await httpClient<{
      configs: SharedConfig[];
      currentPage: number;
      configsCount: number;
    }>('/shared_config_list', {
      rankType,
      page,
      deviceGroup,
      deviceType,
    })
    console.log('res', res)
    if (res.errCode !== 0) return res
    const shareList = new Array<SharedConfig>()
    for (let i = 0; i < res.data.configs.length; i++) {
      const obj = res.data.configs[i]
      const share: SharedConfig = {
        describe: '',
        config: new Config(),
        createAt: '',
        updatedAt: '',
        id: 0,
        downloadTimes: 0,
      }
      Object.assign(share, obj)
      const config = new Config()
      Object.assign(config, obj.config)
      share.config = config
      shareList.push(share)
      //
      const updatedDate = Date.parse(share.updatedAt)
      share.updatedAt = moment(updatedDate).fromNow()
      const createDate = Date.parse(share.createAt)
      share.createAt = moment(createDate).fromNow()

      //
      //config 里的 user 不是 class 只读
      //console.log(share)
    }
    //console.log(res)
    const r = {
      errCode: res.errCode,
      data: {
        shareList,
        itemCount: res.data.configsCount
      }
    }
    return r
  }
  export type SharedMacro = {
    describe: string
    macro: Macro
    createAt: string
    downloadTimes: number
    id: number
    updatedAt: string
  }
  export const getSharedMacroList = async (
    rankType: 'time' | 'count',
    page: number
  ) => {
    const res = await httpClient<{
      macros: SharedMacro[];
      currentPage: number;
      macrosCount: number;
    }>('/shared_macro_list', {
      rankType,
      page,
    })
    if (res.errCode !== 0) return res

    const shareList = new Array<SharedMacro>()
    for (let i = 0; i < res.data.macros.length; i++) {
      const obj = res.data.macros[i]
      const share: SharedMacro = {
        describe: '',
        macro: new Macro(),
        createAt: '',
        updatedAt: '',
        id: 0,
        downloadTimes: 0,
      }
      Object.assign(share, obj)
      const macro = new Macro()
      Object.assign(macro, obj.macro)
      share.macro = macro
      shareList.push(share)
      //
      const updatedDate = Date.parse(share.updatedAt)
      share.updatedAt = moment(updatedDate).fromNow()
      const createDate = Date.parse(share.createAt)
      share.createAt = moment(createDate).fromNow()

      //
      //macro 里的 user 不是 class 只读
    }

    const r = {
      errCode: res.errCode,
      data: {
        shareList,
        itemCount: res.data.macrosCount
      }
    }
    return r
  }

  export const downloadSharedConfig = async (sharedConfig: SharedConfig) => {
    const config = new Config()
    Object.assign(config, sharedConfig.config)
    config.serverId = undefined
    config.user = await getCurrentUser()
    console.log('下载:', config.localId)
    const t = await config.save()
    console.log('tttt', t.localId)
    const res = await httpClient('/download_config', { 'sharedId': sharedConfig.id })
    //console.log('RRREEEESSSS', res)
    return res
  }

  export const downloadSharedMacro = async (sharedConfig: SharedMacro) => {
    const macro = new Macro()
    Object.assign(macro, sharedConfig.macro)
    macro.serverId = undefined
    macro.user = await getCurrentUser()
    macro.save()
    return await httpClient('/download_macro', { sharedId: sharedConfig.id })
  }

  export const uploadUserDevices = async (devices: DeviceType[]) => {
    //console.log('!!!!!!!!!!!!!!!!!')
    return await httpClient('/upload_user_devices', { devices })
  }
}

export namespace DBService {
  export type DeviceListChange = {
    type: '设备插入' | '设备拔出'
    deviceType: DeviceType
  }

  //因为是同步的 所以这条 api 要在 initUSBDetect 之前调用才能收到已经插入设备的通知
  export const deviceListChangeSubject = new Subject<DeviceListChange>()

  const deviceInstanceArr: (MouseInterface | KeyboardInterface)[] = []
  let currentSelectIndex = 0
  //let currentDev: MouseInterface | KeyboardInterface | undefined = undefined

  detectSubject.subscribe(async (v) => {
    if (v?.type === '设备插入') {
      const dev = await CreateDeviceByDeviceType(v.deviceType)
      if (dev === undefined) return

      // stop data    避免音律/光影数据发太快 无法收到dev.getFirmwareVersion()
      const devicePath = dev.deviceType.devAddr.toString()
      const id = dev.deviceType.id
      if (devlistList.some(
        v => id && (v.danglecommondev?.keyboardId === -id || v.danglecommondev?.mouseId === -id))) {
        if (id && devlistList.some(v => v.danglecommondev?.keyboardId === -id))
          await setLightType(devicePath, 2, 0, 1)
        if (id && devlistList.some(v => v.danglecommondev?.mouseId === -id))
          await setLightType(devicePath, 2, 0, 2)
      } else {
        await setLightType(devicePath, 2)
      }

      deviceInstanceArr.push(dev)
      const version = await dev.getFirmwareVersion()

      if (version) {
        //判断固件版本是否支持音乐律动(雷神兼容性问题)

        if (version >= 1000 && dev.deviceType.company === "雷神") {
          if (!dev.deviceType.layout?.light.types.some(v => v.type === 'LightMusicFollow'))
            dev.deviceType.layout?.light.types.push(MusicLightConfig)
        }
        dev.deviceType.version = version.toString()
      }
      await dev.deviceType.save()
      GA.gaDevice(dev.deviceType)
      //上传用户设备
      getCurrentUser().then(async (user) => {
        if (user === undefined) return
        if (user.deviceTypes === undefined) return
        const res = user.deviceTypes.some(
          (devT) =>
            devT.id === v.deviceType.id
        )
        console.log('RREEESSS', res)
        if (!res) {
          user.deviceTypes.push(v.deviceType)

          webService
            .uploadUserDevices(user.deviceTypes)
            .then(async (v) => await user.save())
        }
      })
      //
    } else {
      let deleteNumber = -1
      deviceInstanceArr.forEach((dev, i) => {
        if (equals(dev.deviceType.devAddr, v?.deviceType.devAddr)) {
          deleteNumber = i
        }
      })
      if (deleteNumber === -1) return
      deviceInstanceArr.splice(deleteNumber, 1)
      if (deleteNumber === currentSelectIndex) currentSelectIndex = 0 //把当前设备拔了就默认第0个
      if (deleteNumber < currentSelectIndex) currentSelectIndex-- //把前面的拔了 index 往前移动 , 后面的不影响
    }

    deviceListChangeSubject.next({
      type: v.type,
      deviceType: v.deviceType,
    })
  })
  export const getDeviceInstanceArr = () => [...deviceInstanceArr]
  export const getCurrentDev = () => {
    if (deviceInstanceArr.length === 0) {
      //currentDev = undefined
      return undefined
    }
    return deviceInstanceArr[currentSelectIndex]
    // if (currentDev === undefined) return deviceInstanceArr[0]
    // return currentDev
  }
  export const getDeviceSelectIndex = () => currentSelectIndex
  export const setDeviceSelectIndex = (index: number) => {
    if (index > deviceInstanceArr.length || index < 0) return
    //currentDev = deviceInstanceArr[index]
    if (index !== currentSelectIndex) {
      currentSelectIndex = index
    }
  }

  export const getConfigs = async () => {
    const user = await getCurrentUser()
    const configs = await Config.createQueryBuilder('config')
      .leftJoinAndSelect('config.deviceType', 'deviceType')
      .leftJoinAndSelect('config.user', 'user')
      .where('(config.user_id is NULL OR config.user_id = :userid)', {
        userid: user?.id,
      })
      .andWhere('config.needDelete =:nd', { nd: false })
      .andWhere('deviceType.type = :type', { type: getCurrentDev()?.type })
      .andWhere('deviceType.company = :company', { company: kCompany })
      .getMany();

    //console.log("QQQQQQQ", configs, user)
    return configs
  }
  export interface MacroFolder {
    name: string
    id: string
    macros: Macro[]
    folders: MacroFolder[]
  }

  export const macrosToFolder = (macros: Macro[]) => {
    const rootFolder: MacroFolder = {
      name: 'root',
      macros: [],
      folders: [],
      id: '/',
    }

    macros.forEach((v) => {
      const category = v.category
      //console.log('cccaaattteeegggooorryyy', v.category)
      if (category === undefined || category === '/') {
        rootFolder.macros.push(v)
        return
      }
      const carr = category.split('/')
      //console.log(carr, '!!!!')
      let tmpFoler: MacroFolder = rootFolder
      for (let i = 0; i < carr.length; i++) {
        const cv = carr[i]
        if (cv === '') continue
        const findFolder = tmpFoler.folders.find((w) => w.name === cv)
        if (findFolder) {
          tmpFoler = findFolder
        } else {
          //const index = category.lastIndexOf(cv)
          let path = ''
          for (let j = 0; j <= i; j++) {
            path += carr[j] + '/'
          }

          const tf = {
            name: cv,
            macros: [],
            folders: [],
            id: path//category.slice(0, index) + cv,
          }
          //console.log(category,category.split(cv),category.split(cv)[0] + cv)
          tmpFoler.folders.push(tf)
          tmpFoler = tf
        }
      }
      tmpFoler.macros.push(v)
      //console.log('tmpFoler :', tmpFoler)
    })
    //console.log('ROOTFOLDER_____', rootFolder)
    return rootFolder
  }

  export const getMacros = async () => {
    const user = await getCurrentUser()
    const macros = await Macro.find({
      where: [
        { user: null, needDelete: false },
        { user: user, needDelete: false },
      ],
      relations: ['deviceType', 'user'],
    })

    return macros.filter(v => v.deviceType?.company === kCompany)
  }

  export const deleteConfig = async (config: Config) => {
    config.needDelete = true
    config.hasUpload = false
    await config.save()
    const curs = await CurrentConfig.find({
      where: { currentConfig: config }
    })
    await CurrentConfig.remove(curs)
  }
  export const deleteMacros = async (macros: Macro[]) => {
    macros.forEach(v => {
      v.needDelete = true
      v.hasUpload = false
    })
    await Macro.save(macros)
  }

  export const deleteMacro = async (macro: Macro) => {
    macro.needDelete = true
    macro.hasUpload = false
    await macro.save()
  }

  export const saveConfig = async (config: Config) => {
    config.user = await getCurrentUser()
    config.deviceType = getCurrentDev()?.deviceType
    if (config.light === undefined) config.light = { type: 'LightOff' }
    return await config.save()
  }
  export const saveMacros = async (macros: Macro[]) => {
    const cUser = await getCurrentUser()
    macros.forEach(macro => {
      if (macro.value === undefined) return
      macro.user = cUser
      macro.deviceType = getCurrentDev()?.deviceType
      const marcoArr: MacroEvent[] = []
      //合并重复时间
      let tmpDely: Delay | undefined = undefined
      for (let i = 0; i < macro.value.macro.length; i++) {
        const tmpME = macro.value.macro[i]
        // console.log('tmpME', tmpME.type)
        if (tmpDely !== undefined) {
          if (tmpME.type === 'delay') {
            tmpDely.value += tmpME.value
            if (tmpDely.value > 65535) {
              tmpDely.value = 65535
            }
          } else {
            if (tmpDely.value !== 0 && tmpDely.value <= 65535) {
              //0值 和 超值 忽略
              marcoArr.push(tmpDely)
            }
            marcoArr.push(tmpME)
            tmpDely = undefined
          }
        } else {
          if (tmpME.type === 'delay') {
            tmpDely = { ...tmpME }
          } else {
            marcoArr.push(tmpME)
          }
        }
      }
      if (tmpDely !== undefined) marcoArr.push(tmpDely)
      macro.value.macro = marcoArr
    })
    return await Macro.save(macros)
  }
  export const saveMacro = async (macro: Macro) => {
    return await saveMacros([macro])
  }

  export const devToConfig = async (isFn = false, fnindex: number, manual: boolean = false) => {
    const dev = getCurrentDev()
    if (dev === undefined) return
    const config = new Config()
    const res1 = await dev.getReportRate()
    if (res1 !== 'err') config.reportRate = res1
    else config.reportRate = 125
    if (dev.type === 'keyboard') {
      config.value = isFn ? await (dev as KeyboardInterface).getFnKeyConfig(fnindex, manual) : await dev.getKeyConfig(undefined, manual)
    } else {
      config.value = await dev.getKeyConfig()
    }
    config.light = await dev.getLightSetting()
    if (dev.type === 'keyboard') {
      if (dev.deviceType.logoLayout !== null) {
        config.logoLight = await dev.getSLEDParam()
        if (config.light?.type.indexOf('LightMusicFollow2') !== -1 || config.light?.type.indexOf('LightMusicFollow3') !== -1 || config.light?.type.indexOf('LightScreenColor') !== -1) {
          config.logoLight = config.light
        }
      }
      if (dev.deviceType.otherSetting !== undefined && dev.deviceType.otherSetting !== null) {
        const tmp = dev.deviceType.otherSetting
        if (tmp.deBounce)
          mobxStore.otherStore.currentOther.deBounce = await dev.getDeBounce()
        if (tmp.sleep_24 || tmp.sleep_bt)
          mobxStore.otherStore.currentOther.sleep = await dev.getSleepKeyTime()
        if (tmp.auto) {
          mobxStore.deviceStore.isAuto = await dev.getAutoOsen()
        }
      }
      // if (config.other === undefined) {
      //   config.other = {}
      //   config.other.deBounce = await dev.getDeBounce()
      //   config.other.sleep = await dev.getSleepKeyTime()
      // }
    }

    if (dev.type === 'mouse') {
      config.dpi = await dev.getDpi()
      config.logoLight = await dev.getLogoLightSetting()
      //console.log('DDDPPPPPIIIII',config.dpi)
    } else {
      config.lightPic = await dev.getLightPic()
      // console.log('CCCOOOFFFIIIIGGGG', config.lightPic)
    }

    if (dev.type === 'keyboard' && dev.allLayerConfigs === undefined) {
      await dev.getAllLayerMacros()
    }
    return config
  }

  export const configToDev = async (config: Config, isFn: boolean = false) => {
    const dev = getCurrentDev()
    if (dev === undefined) throw 'error dev === undefined'
    if (dev.type !== config.deviceType?.type || dev.deviceType.group !== config.deviceType.group) {
      throw '该方案不匹配当前设备'
    }

    if (config.light !== undefined) await dev.setLightSetting(config.light)
    if (dev.type === 'keyboard') {
      if (config.logoLight !== undefined && config.logoLight !== null) await dev.setSLEDParam(config.logoLight)
      else {
        mobxStore.deviceStore.getSLEDParam()
      }
    }
    if (config.reportRate !== undefined) {
      if (process.platform === 'darwin') await sleep(1000)
      let res: 1000 | 500 | 250 | 125 = 1000
      switch (config.reportRate) {
        case 1000:
          res = 1000
          break
        case 500:
          res = 500
          break
        case 250:
          res = 250
          break
        case 125:
          res = 125
          break
        default:
          break
      }
      if (!(await dev.setReportRate(res))) throw 'configToDev 设置报包率失败'
    }
    if (config.value !== undefined) {
      if (dev.type === 'keyboard' && isFn)
        await (dev as KeyboardInterface).setFnKeyConfig(config.value, dev.fnIndex)
      else await dev.setKeyConfig(config.value)
    }

    if (dev.type === 'mouse') {
      if (config.dpi !== undefined) await dev.setDPI(config.dpi)
    } else {
      if (config.light !== undefined)
        await dev.setLightSetting(config.light)
      if (config.lightPic !== undefined && config.lightPic !== null) {
        if (process.platform === 'darwin') await sleep(1000)
        await dev.setLightPic(config.lightPic)
      }
    }
  }

  const getCurrentConfigByCurrentDev = async () => {
    const curDev = getCurrentDev()
    const cUser = await getCurrentUser()
    if (curDev === undefined) return undefined
    const currentConfig = await CurrentConfig.createQueryBuilder(
      'CurrentConfig'
    )
      .leftJoinAndSelect('CurrentConfig.currentConfig', 'config')
      .leftJoinAndSelect('config.deviceType', 'deviceType')
      .where('deviceType.pid =:pid AND deviceType.vid =:vid', {
        pid: curDev.deviceType.pid,
        vid: curDev.deviceType.vid,
      })
      .andWhere('(config.user_id is NULL OR config.user_id = :userid)', {
        userid: cUser?.id,
      })
      .andWhere('config.needDelete =:nd', { nd: false })
      .getOne()

    //console.log('PPPPP', currentConfig?.currentConfig?.name, currentConfig?.currentConfig, currentConfig?.currentConfig?.deviceType, curDev.deviceType.name)
    return currentConfig
  }
  export const loadCurrentConfig = async () => {
    const curDev = getCurrentDev()
    //console.log('CCUURRRDDDEEEVVV', curDev?.deviceType.name)
    if (curDev === undefined) return undefined

    const currentConfig = await getCurrentConfigByCurrentDev()
    //console.log('CURRENTTTTCOOONFIG', currentConfig?.currentConfig?.name)
    if (currentConfig !== undefined) {
      return currentConfig.currentConfig
    }
    const configList = await getConfigs()
    if (configList.length === 0) return undefined
    const curC = new CurrentConfig()
    curC.currentConfig = configList[0]
    await curC.save()
    return configList[0]
  }

  export const setCurrentConfig = async (config: Config) => {
    const needDelCurrentConfig = await getCurrentConfigByCurrentDev()
    if (needDelCurrentConfig !== undefined)
      await CurrentConfig.delete(needDelCurrentConfig)

    const curC = new CurrentConfig()
    curC.currentConfig = config
    await curC.save()
  }
  export const getCurrentComanyDevList = async () => {
    return await DeviceType.find({ where: { company: kCompany, displayName: Not('help') } })
  }
  export const findSameConfig = async (config: Config) => {
    const configs = await getConfigs()
    return configs.find(v => {
      return checkConfigValueEqual(v, config)
    })
  }
  export const checkConfigValueEqual = (config1: Config, config2: Config) => {
    if (config1.dpi === null) config1.dpi = undefined
    if (config2.dpi === null) config2.dpi = undefined
    if (config1.lightPic === null) config1.lightPic = undefined
    if (config2.lightPic === null) config2.lightPic = undefined
    if (config1.logoLight === null) config1.logoLight = undefined
    if (config2.logoLight === null) config2.logoLight = undefined
    let vEq = true

    config1.value?.map(v => {
      if (v.index === undefined) v.index = undefined
      return v
    }).forEach(v => {
      const res = config2.value?.map(v => {
        if (v.index === undefined) v.index = undefined
        return v
      }).some(v2 => {
        if (v.type === "ConfigMacro" && v2.type === "ConfigMacro") {
          return equals(v.index, v2.index)
            && equals(v.macro, v2.macro)
            && equals(v.macroType, v2.macroType)
            && equals(v.original, v2.original)
            && equals(v.repeatCount, v2.repeatCount)
            && equals(v.type, v2.type)
        }
        return equals(v, v2)
      })
      if (res === false) vEq = false
    })
    config2.value?.map(v => {
      if (v.index === undefined) v.index = undefined
      return v
    }).forEach(v => {
      const res = config1.value?.map(v => {
        if (v.index === undefined) v.index = undefined
        return v
      }).some(v2 => {
        if (v.type === "ConfigMacro" && v2.type === "ConfigMacro") {
          return equals(v.index, v2.index)
            && equals(v.macro, v2.macro)
            && equals(v.macroType, v2.macroType)
            && equals(v.original, v2.original)
            && equals(v.repeatCount, v2.repeatCount)
            && equals(v.type, v2.type)
        }
        return equals(v, v2)
      })
      if (res === false) vEq = false
    })

    if (config1.value === config2.value) vEq = true
    // console.log('灯:', config1.light, config2.light, equals(config1.light, config2.light))
    // console.log(
    //   'dpi:',
    //   config1.dpi,
    //   config2.dpi,
    //   equals(config1.dpi, config2.dpi)
    // )
    // console.log('reportRate:', equals(config1.reportRate, config2.reportRate))
    // console.log(
    //   'value',
    //   config1.value,
    //   config2.value,
    //   vEq
    // )
    // console.log('userPicture: ', config1.lightPic, config2.lightPic, equals(config1.lightPic?.map(v => {
    //   if (!('index' in v)) {
    //     v.index = undefined
    //   }
    //   return v
    // }), config2.lightPic))
    config1.lightPic?.map(v => {
      if (!('index' in v)) {
        v.index = undefined
      }
      return v
    })
    // console.log(config1.light, config2.light, equals(config1.light, config2.light));
    // console.log(config1.dpi, config2.dpi, equals(config1.dpi, config2.dpi));
    // console.log(config1.reportRate, config2.reportRate, equals(config1.reportRate, config2.reportRate));
    // console.log(config1.lightPic, config2.lightPic, equals(config1.lightPic, config2.lightPic));

    return (
      // equals(config1.light, config2.light) &&
      equals(config1.dpi, config2.dpi) &&
      equals(config1.reportRate, config2.reportRate) &&
      vEq &&
      equals(config1.lightPic, config2.lightPic)
      // && equals(config1.logoLight, config2.logoLight)
      // && equals(config1.other, config2.other)
    )
  }
}
