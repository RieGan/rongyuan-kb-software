import { DeviceType } from '..'
import { kCompany } from '../../../appConfig'
import { supportDev } from '../../../supportDev'


export const config = supportDev.map(v => new DeviceType(v))
config.push(new DeviceType({
  id: 999,
  vid: 0x0c45,
  pid: 0x7040,
  usage: 1,
  usagePage: 12,
  name: 'help',
  displayName: 'help',
  support_onboard: 2,
  type: 'keyboard',
  group: 'rongyuan_k_rgb',
  company: kCompany,
}))
config.push(new DeviceType({
  id: 998,
  vid: 0x0461,
  pid: 0x4001,
  usage: 6,
  usagePage: 1,
  name: 'helpYZW',
  displayName: 'help',
  support_onboard: 2,
  type: 'keyboard',
  group: 'rongyuan_k_rgb',
  company: kCompany,
}))
config.push(new DeviceType({
  id: 997,
  vid: 0x0461,
  pid: 0x4001,
  usage: 1,
  usagePage: 0xff01,
  name: 'helpYZW',
  displayName: 'help',
  support_onboard: 2,
  type: 'keyboard',
  group: 'rongyuan_k_rgb',
  company: kCompany,
}))
config.push(new DeviceType({
  id: 996,
  vid: 0x25a7,
  pid: 0x2300,
  usage: 6,
  usagePage: 1,
  name: 'helpBK',
  displayName: 'help',
  support_onboard: 2,
  type: 'keyboard',
  group: 'rongyuan_k_rgb',
  company: kCompany,
}))