import * as path from 'path'
import * as url from 'url'
import { kCompany } from '../../appConfig'
import { mobxStore } from '../../mobxStore/store'




export const getKeyPath = () => {
    if (mobxStore.deviceStore.currentDev)
        return url.pathToFileURL(path.join(__dirname, '..', 'company', 'company_' + kCompany, 'dev', mobxStore.deviceStore.currentDev!.deviceType.name! + '.png')).toString()
    else
        return ''
}