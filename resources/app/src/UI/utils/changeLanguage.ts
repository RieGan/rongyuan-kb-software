import * as path from 'path'
import * as fs from 'fs'

export const Obj2Str = (obj: any) => {
    // const tmp = Object.values(obj)
    const tmpKey = Object.keys(obj)
    const tmpValue = Object.values(obj)
    let str = ''
    for (let i = 0; i < tmpKey.length; i++) {
        let value = ''
        let key: string | unknown = ''
        if (typeof (tmpValue[i]) !== 'undefined') {
            value = '    \"' + tmpKey[i] + '\": '
            key = typeof (tmpValue[i]) === 'string'
                ? '\"' + tmpValue[i] + '\",\n'
                : tmpValue[i] + ',\n'

            if (typeof (tmpValue[i]) === 'object')
                key = JSON.stringify(tmpValue[i]) + ',\n'

            str += value + key
        }
    }

    str = str.substring(0, str.length - 2)
    return '{\n' + str + '\n}'
}

export const changeLanguage = (bCloud: boolean | string, key: boolean | undefined = undefined) => {
    const currentC_p = path.join('..', 'CurrentCompany.json')
    const currentCompany = require(currentC_p) as {
        'currentCompany': string
    }
    const true_p = path.join(__dirname, '..', 'company', 'company_' + currentCompany.currentCompany, 'CONFIG.json')
    const cObj = require(true_p);

    let aa = cObj
    aa.blockCloud = bCloud;
    if (key)
        aa.click = key;
    else
        aa.click = undefined

    const str = Obj2Str(aa)
    fs.writeFile(true_p, str, (err: any) => {
        if (err)
            console.error(err)
    })
}