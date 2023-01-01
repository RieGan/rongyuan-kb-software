import * as path from 'path'
import * as fs from 'fs'
import { remote } from 'electron'
import { kSDKVersion } from './appConfig'
import child_process from 'child_process'
import { equals } from 'ramda'

export const openSDK = () => {
    closeIotSDK()

    // try {
    //   child_process.spawn(sdk_path, [], { detached: !0, windowsHide: !0, stdio: "ignore" })
    // } catch (e) {
    //   console.error("eeee: ", e);
    // }
    if (process.platform === 'win32') remote.shell.openItem(sdk_path);

    if (process.platform === 'darwin') {
        try {
            child_process.spawn(sdk_path, [], { detached: !0, windowsHide: !0, stdio: "ignore" })
        } catch (e) {
            console.error("eeee: ", e);
        }
    }

}

export const closeIotSDK = () => {
    if (process.platform !== 'darwin') {
        try {
            let tasklist = child_process.execSync('tasklist').toString()

            tasklist = tasklist.replace(/\s+/g, ' ').trim()
            let exeArr = tasklist.split(" ")

            exeArr.map(v => {
                let n = v.trim()
                if (n.indexOf('iot_driver') !== -1) {
                    child_process.execSync(`taskkill /f /t /im ${n}`)
                }
            })
        } catch (e) {
            console.error("ee: ", e);
        }

    } else {
        let t = ''
        try {
            t = child_process.execSync('lsof -i :3814').toString()
        } catch (e) {
            t = ''
            // console.log("error: ", e);
        }

        if (equals(t, '')) return
        const numArr = t.match(/\d+/g)
        if (numArr === null || numArr.length === 0) return
        child_process.execSync(`kill ${numArr[0]}`)
    }
}

export const compareSDKVersion = (dv: string, cv: string) => {
    const dva = dv.match(/\d+/g)// 驱动sdk版本
    const cva = cv.match(/\d+/g)// 用户目录的sdk版本

    if (dva === null || cva === null) return false

    if (dva.length !== cva.length || dva.length > 1) {
        console.log('非法版本号')
        return false
    }
    const v1Nmuber = Number(dva[0])
    const v2Nmuber = Number(cva[0])
    return v1Nmuber > v2Nmuber
}

// 后续需要删除
if (process.platform === 'win32') {
    // 避免360
    try {
        let tasklist = child_process.execSync('tasklist').toString()
        tasklist = tasklist.replace(/\s+/g, ' ').trim()
        let exeArr = tasklist.split(" ")

        exeArr.map(v => {
            let n = v.trim()
            if (n.indexOf('dj_hid_sdk_rs') !== -1) {
                child_process.execSync(`taskkill /f /t /im ${n}`)
            }
        })
    } catch (e) {
        console.error("ddd: ", e);
    }
    // 用户目录删除dj_hid_sdk_rs
    const t = remote.app.getPath("userData")
    // console.error("zzzzzz: ", t, fs.existsSync(t));

    if (fs.existsSync(t)) {
        const fffs = fs.readdirSync(t)// string[]
        fffs.map(v => {
            if (v.indexOf('dj_hid_sdk_rs') !== -1)
                fs.unlinkSync(path.join(t, v));
        })
    }
}

const sdk_exe = process.platform === 'darwin' ? 'iot_driver' : 'iot_driver.exe'
const sdk = process.platform === 'darwin'
    ? 'iot_driver_' + kSDKVersion
    : 'iot_driver_' + kSDKVersion + '.exe'
const filepath = remote.app.getPath("userData")
let sdk_path = path.join(filepath, sdk)

if (fs.existsSync(filepath)) {
    if (!fs.existsSync(sdk_path)) {
        closeIotSDK();
        let cPath = path.join(__dirname, "..", sdk_exe)
        if (process.platform === 'win32') {
            const fbuf = fs.readFileSync(cPath)
            fs.writeFileSync(sdk_path, fbuf)
        }
        if (process.platform === 'darwin') {
            fs.copyFileSync(cPath, sdk_path)
        }
        console.log("SDK created successfully");
    }

    const files = fs.readdirSync(filepath)
    const file = files.find(v => v.indexOf('iot_driver_') !== -1)
    if (file !== undefined) {
        if (compareSDKVersion(kSDKVersion, file)) {
            closeIotSDK();
            fs.unlinkSync(path.join(filepath, file))
            console.log("Old version SDK deleted successfully");
        } else {
            sdk_path = path.join(filepath, file)
        }
    }
}
