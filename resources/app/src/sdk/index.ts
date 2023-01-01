
import { openSDK } from '../sdkAPI'
import {
  initUSBDetect,
  detectSubject,
} from './DriverIO/usb/DetectSupportDevice'
import { connectDB } from './DB'
import { webService } from './WebService'
import { DBService } from './WebService'
import { getCurrentUser } from './WebService'

/** @deprecated */
export const sdk = {
  init: async () => {
    openSDK()
    await connectDB()
    detectSubject.subscribe((v) => console.log(v))
    await initUSBDetect()
    // await WebTest()
    //await dk2017Test()
  },

  ioFunc: {
    ...DBService,
    ...webService, //这个根本就不是webService
    getCurrentUser,
  },
} //as any as '___废弃___ 别用了 ！！！'
