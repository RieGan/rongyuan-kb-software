import { remote } from 'electron'
import * as path from 'path'
import * as url from 'url'
import version = require('../APP_VERSION.json')
import { langueLocaleKArr } from './res/string/languageC'

const currentC_p = path.join('..', 'CurrentCompany.json')

const currentCompany = require(currentC_p) as {
    'currentCompany': string
}
const json_p = path.join('..', 'company', 'company_' + currentCompany.currentCompany, 'CONFIG.json')
const companyJson = require(json_p) as {
    'company': string,
    'displayName': string,
    'blockCloud': string,
    'shop': boolean,
    'click': boolean,
    'language': string[],
    "singleLanguage": boolean,
}
export const appPath = () => remote.app.getPath('userData')
export const kBaseAppVersion = version.BaseAppVersion
export const kAppVersion = version.AppVersion
export const kSDKVersion = version.SDKVersion
//export const kSeverAddr = 'http://127.0.0.1:3000/v1'

// export const kSeverAddr = 'http://api.rongyuan.tech:3000/v1'
export const kSeverAddr = 'https://api.rongyuan.tech:3814/v1'

export const kImageSeverAddr = 'https://api3.rongyuan.tech:3816/api/v2'
export const kImageSeverDownLoadAddr = 'https://api3.rongyuan.tech:3816/download/bit_image_file'
// export const kImageSeverAddr = 'https://192.168.1.19:3816/api/v2'
// export const kImageSeverDownLoadAddr = 'https://192.168.1.19:3816/download/bit_image_file'
// export const kImageSeverAddr = 'http://192.168.1.19:3817/api/v2'
// export const kImageSeverDownLoadAddr = 'http://192.168.1.19:3817/download/bit_image_file'

export const kCompany = companyJson['company']
export const kCompanyDisplayName = companyJson['displayName']



export const blockCloud = companyJson['blockCloud']
export const ShopKey = companyJson['shop']
export const ClickKey = companyJson['click']
export const kLanguage = companyJson['language'] ? companyJson['language'] : [langueLocaleKArr[0], langueLocaleKArr[1]]
export const kSingleLanguage = companyJson['singleLanguage']

export const icon_p = path.join(__dirname, '..', 'company', 'company_' + kCompany, 'icon.png')
export const APP_p = path.join(__dirname, '..', 'company', 'company_' + kCompany, 'APP.png')
export const default_logo_p = path.join(__dirname, '..', 'company', 'company_' + kCompany, 'default_logo.png')
export const login_logo_p = path.join(__dirname, '..', 'company', 'company_' + kCompany, 'login_logo.png')
export const topnav_logo_p = path.join(__dirname, '..', 'company', 'company_' + kCompany, 'topnav_logo.png')

export const urlStr = (s: string) => url.pathToFileURL(s).toString()