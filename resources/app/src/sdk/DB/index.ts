import { Config } from './entity/config'
import { DeviceType } from './entity/device_type'
import { Macro } from './entity/macro'
import { User } from './entity/user'
import * as path from 'path'

import { createConnection } from 'typeorm'
import { config } from './entity/support_config'
import { SessionUser } from './entity/session_user'
import { CurrentConfig } from './entity/currentConfig'
import { remote } from 'electron'
import * as fs from 'fs'
import { AddDeviceLayer1628226949563 } from './migration/1628226949563-AddDeviceLayer'
import { CImage } from './entity/cimage'
export { Config, DeviceType, Macro, User, SessionUser, CurrentConfig }

const kFirstLanuch = 'kFirstLanuch____'

const appPath = remote.app.getPath('userData')
console.log('dbPath:', appPath)


let retryTimes = 0
export const connectDB = async () => {
  const firstLuanch = localStorage.getItem(kFirstLanuch)
  const dbPath = path.join(appPath, 'db')
  try {
    const connect = await createConnection({
      type: 'sqlite',
      database: dbPath, //打包可能有问题
      synchronize: true, //firstLuanch === undefined ? true : false,
      logging: false,
      entities: [Config, DeviceType, Macro, User, SessionUser, CurrentConfig, CImage],
      //migrationsTableName:'device_type_123',
      //migrations: [AddDeviceLayer1628226949563],
      subscribers: [],
      cli: {
        migrationsDir: "./"
      },
    })
    //await connect.runMigrations()
  } catch (error) {
    console.error('数据库 建立错误', error)
    retryTimes++
    if (retryTimes < 4) {
      fs.unlinkSync(dbPath)
      await connectDB()
    }

    return
  }

  //if (firstLuanch === undefined)
  try {
    console.log('插入本地支持设备数据')
    await DeviceType.save(config)
  } catch (error) {
    console.error('device 初始化错误', error)
    return
  }

  localStorage.setItem(kFirstLanuch, 'true')
  /*test
    try {
        const user = new User()
        user.email = '123'
        user.name = '123'
        await user.save()
        console.log(await User.find())
    } catch (error) {
        console.log(error)
    }
    */
}
