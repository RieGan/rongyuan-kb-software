import { numToRgb, rgbToNum } from "../../../../unitys/rgbNum"
import { valueForKey } from "../../../../unitys/tableValueForKey"
import { sleep } from "../../../../unitys/timeFunc"
import { YZW_K68 } from "./yzw_k68"
import { defaultMatrix_yzw_lp84 } from "./yzw_lp84matrix"


const mp = {
    'upright': 0,
    'separate': 1,
    'intersect': 2
}
const uesrOp = {
    '1': 0x00,
    '2': 0x10,
    '3': 0x20,
    '4': 0x30,
}
const waveOp = {
    'right': 0,
    'left': 1,
    'down': 2,
    'up': 3
}

const commonBrightness = 6
export class YZW_LP84 extends YZW_K68 {
    defaultMatrix = defaultMatrix_yzw_lp84

    setLightSetting = async (lightSet: LightSetting) => {
        const b = Buffer.alloc(64)


        b[0] = this.FEA_CMD_SET_LEDPARAM

        let effect: number = 0
        let speed: number = 0
        let brightness: number = 0
        let option: number = 7
        let dazzle = lightSet.dazzle
        const n = dazzle ? this.DAZZLE : this.NORMAL
        const musicKey = dazzle ? 0 : 4

        switch (lightSet.type) {
            case 'LightOff':
                effect = 0x00
                break
            case 'LightAlwaysOn':
                effect = 0x01
                brightness = lightSet.value
                option = n
                break
            case 'LightBreath':
                effect = 0x02
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightNeon':
                effect = 0x03
                speed = lightSet.speed
                brightness = lightSet.value
                break
            case 'LightWave':
                effect = 0x04
                speed = lightSet.speed
                option = lightSet.option !== undefined ? (waveOp[lightSet.option] << 4 | n) : (waveOp['right'] << 4 | n)
                brightness = lightSet.value
                break
            case 'LightRipple':
                effect = 0x05
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightRaindrop':
                effect = 0x06
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightSnake':
                effect = 0x07
                speed = lightSet.speed
                option = lightSet.option === 'z' || lightSet.option === undefined ? (0 << 4 | n) : (1 << 4 | n)
                brightness = lightSet.value
                break
            case 'LightPressAction':
                effect = 0x08
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightConverage':
                effect = 0x09
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightSineWave':
                effect = 0x0a
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightKaleidoscope':
                effect = 0x0b
                speed = lightSet.speed
                option = lightSet.option === 'out' || lightSet.option === undefined ? (0 << 4 | n) : (1 << 4 | n)
                // option = 0 << 4 | n
                brightness = lightSet.value
                break
            case 'LightLineWave':
                effect = 0x0c
                speed = lightSet.speed
                brightness = lightSet.value
                option = this.DAZZLE
                break
            case 'LightUserPicture':
                effect = 0x0d
                option = lightSet.option !== undefined ? uesrOp[lightSet.option] : 0
                brightness = lightSet.value
                break
            case 'LightLaser':
                effect = 0x0e
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightCircleWave':
                effect = 0x0f
                speed = lightSet.speed
                brightness = lightSet.value
                option = lightSet.option === 'anti-clockwise' || lightSet.option === undefined ? (0 << 4 | n) : (1 << 4 | n)
                break

            case 'LightDazzing':
                effect = 0x10
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightMusicFollow':
                effect = 0x11
                option = mp[lightSet.option] << 4 | musicKey
                brightness = lightSet.value
                break
            case 'LightScreenColor':
                effect = 0x12
                brightness = commonBrightness
                option = 0
                break
            default:
                break
        }

        b[1] = effect
        b[2] = 5 - speed
        b[3] = brightness
        b[4] = option
        if ('rgb' in lightSet && lightSet.rgb !== undefined) {
            let rgbTemp = lightSet.rgb
            if (rgbTemp === 0xffffff) rgbTemp = 0xfafffa
            const rgb = numToRgb(rgbTemp)
            b[5] = rgb.r
            b[6] = rgb.g
            b[7] = rgb.b
        }
        if (lightSet.type === 'LightUserPicture') {
            b[5] = 0
            b[6] = 0xc8
            b[7] = 0xc8
        }

        const buf = await this.writeFeatureCmd(b, 1, this.BIGCMDDELAY)
        if (!buf) return false
        await sleep(this.BIGCMDDELAY)
        return true
    }

    getLightSetting = async (): Promise<LightSetting | undefined> => {
        const rgbMap: {
            [key: number]: number
        } = {
            0: 0xff0000,
            1: 0x00ff00,
            2: 0x0000ff,
            3: 0xff5000,
            4: 0xff00ff,
            5: 0xffff00,
            6: 0xffffff,
        }
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_GET_LEDPARAM
        const buf = await this.commomFeature(b, 0)
        if (buf === undefined) return undefined
        const effect = buf[1]
        const speed = 4 - buf[2]
        const brightness = buf[3]
        const option = buf[4]
        let rgb = rgbToNum(buf[5], buf[6], buf[7])
        const option1 = option >> 4
        const option2 = option & 0b1111
        const optionToRgb = (op: number) => {
            if (op === 7 || op === 6) return
            const trgb = rgbMap[op]
            if (trgb !== undefined) rgb = trgb

        }
        const dazzle = option2 === 6 ? true : false
        const musicDazzle = option === 0 ? true : false

        if (rgb === 0xfafffa) rgb = 0xffffff
        //console.log('!!!!!', effect, option)
        switch (effect) {
            case 0:
                return {
                    type: 'LightOff',
                }
            case 1:
                optionToRgb(option2)
                return {
                    type: 'LightAlwaysOn',
                    value: brightness,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 2:
                optionToRgb(option2)
                return {
                    type: 'LightBreath',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 3:
                return {
                    type: 'LightNeon',
                    value: brightness,
                    speed: speed,
                    option: option1 === 0 ? 'Default' : 'Random',
                }
            case 4:
                optionToRgb(option2)
                const wOp = valueForKey(waveOp, option1)
                return {
                    type: 'LightWave',
                    value: brightness,
                    speed: speed,
                    option: wOp === undefined ? 'right' : wOp,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 5:
                optionToRgb(option2)

                return {
                    type: 'LightRipple',
                    value: brightness,
                    speed: speed,
                    option: option1 === 0 ? 'full' : 'single',
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 6:
                optionToRgb(option2)
                return {
                    type: 'LightRaindrop',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 7:
                optionToRgb(option2)
                return {
                    type: 'LightSnake',
                    value: brightness,
                    speed: speed,
                    option: option1 === 0 ? 'z' : 'return',
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 8:
                optionToRgb(option2)
                return {
                    type: 'LightPressAction',
                    value: brightness,
                    speed: speed,
                    option: option1 === 0 ? 'onToOff' : 'offToOn',
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 9:
                optionToRgb(option2)
                return {
                    type: 'LightConverage',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 0x0a:
                optionToRgb(option2)
                return {
                    type: 'LightSineWave',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 0x0b:
                optionToRgb(option2)
                return {
                    type: 'LightKaleidoscope',
                    option: option1 === 0 ? 'out' : 'in',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 0x0c:
                optionToRgb(option2)
                return {
                    type: 'LightLineWave',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 0x0d:
                const uOp = valueForKey(uesrOp, option1)
                return {
                    type: 'LightUserPicture',
                    value: brightness,
                    option: uOp === undefined ? '1' : uOp,
                }
            case 0x0e:
                optionToRgb(option2)
                return {
                    type: 'LightLaser',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 0x0f:
                optionToRgb(option2)
                return {
                    type: 'LightCircleWave',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    option: option1 === 0 ? 'anti-clockwise' : 'clockwise',
                    dazzle: dazzle
                }
            case 0x10:
                optionToRgb(option2)
                return {
                    type: 'LightDazzing',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 0x11:
                const op = valueForKey(mp, option1)
                return {
                    type: 'LightMusicFollow',
                    value: brightness,
                    option: op === undefined ? 'upright' : op,
                    rgb: rgb,
                    dazzle: musicDazzle
                }
            case 0x12:
                return {
                    type: 'LightScreenColor',
                    value: commonBrightness,
                }
            default:
                return undefined
        }
    }
}