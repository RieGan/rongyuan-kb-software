import { numToRgb, rgbToNum } from "../../../../unitys/rgbNum";
import { valueForKey } from "../../../../unitys/tableValueForKey";
import { sleep } from "../../../../unitys/timeFunc";
// import { valueForKey } from "../../../unitys/tableValueForKey";
import { K68 } from "./k68";
// import { K68_K219 } from "./k68_k219";
// import { defaultMatrix_k68_k220 } from "./k68_k220Matrix";
import { defaultMatrix_k68_magnet } from "./k68_magnetMatrix";


const mp = {
    'upright': 0,
    'separate': 1,
    'intersect': 2
}
export class K68_MAGNET extends K68 {
    defaultMatrix = defaultMatrix_k68_magnet

    setLightSetting = async (lightSet: LightSetting) => {
        const b = Buffer.alloc(64)
        b[0] = 0x04

        let effect: number = 0
        let speed: number = 0
        let brightness: number = 0
        let option: number = 7
        let dazzle = lightSet.dazzle
        const n = dazzle ? 6 : option

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
                option = lightSet.option === 'right' ? 0 : 1
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
                brightness = lightSet.value
                option = 0 << 4 | n
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
            case 'LightSingleRipple':
                effect = 0x0B
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightKaleidoscope':
                effect = 0x0C
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightRingWaterFall':
                effect = 0x0D
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightMusicFollow':
                effect = 0x0E
                option = mp[lightSet.option] << 4
                brightness = lightSet.value
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
        return await this.writeFeatureCmd(b)
    }

    getLightSetting = async (): Promise<LightSetting | undefined> => {
        const rgbMap: {
            [key: number]: number
        } = {
            0: 0xff0000,
            1: 0x00ff00,
            2: 0x0000ff,
            3: 0x00ffff,
            4: 0xff00ff,
            5: 0xffff00,
            6: 0xffffff,
        }
        const b = Buffer.alloc(64)
        b[0] = 0x84
        const buf = await this.commomFeature(b)
        if (buf === undefined) return undefined
        const effect = buf[1]
        const speed = 5 - buf[2]
        const brightness = buf[3]
        const option = buf[4]
        let rgb = rgbToNum(buf[5], buf[6], buf[7])
        const optionToRgb = (op: number) => {
            if (op === 7 || op === 6) return
            const trgb = rgbMap[op]
            if (trgb !== undefined) rgb = trgb

        }
        if (rgb === 0xfafffa) rgb = 0xffffff

        const dazzle = option === 6 ? true : false
        //console.error('!!!!!', effect, option)
        switch (effect) {
            case 0:
                return {
                    type: 'LightOff',
                }
            case 1:
                optionToRgb(option)
                return {
                    type: 'LightAlwaysOn',
                    value: brightness,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 2:
                optionToRgb(option)
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
                    dazzle: dazzle
                }
            case 4:
                return {
                    type: 'LightWave',
                    value: brightness,
                    speed: speed,
                    option: (option & 0b1111) === 0 ? 'right' : 'left',
                    dazzle: dazzle
                }
            case 5:
                optionToRgb(option)
                return {
                    type: 'LightRipple',
                    value: brightness,
                    speed: speed,
                    option: (option & 0b1111) === 0 ? 'full' : 'single',
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 6:
                optionToRgb(option)
                return {
                    type: 'LightRaindrop',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 7:
                optionToRgb(option)
                return {
                    type: 'LightSnake',
                    value: brightness,
                    speed: speed,
                    option: (option & 0b1111) === 0 ? 'z' : 'return',
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 8:
                optionToRgb(option)
                return {
                    type: 'LightPressAction',
                    value: brightness,
                    speed: speed,
                    option: (option & 0b1111) === 0 ? 'onToOff' : 'offToOn',
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 9:
                optionToRgb(option)
                return {
                    type: 'LightConverage',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 10:
                optionToRgb(option)
                return
            case 11:
                optionToRgb(option)
                return {
                    type: 'LightSingleRipple',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 12:
                optionToRgb(option)
                return {
                    type: 'LightKaleidoscope',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 13:
                optionToRgb(option)
                return {
                    type: 'LightRingWaterFall',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 14:
                const op = valueForKey(mp, option)
                return {
                    type: 'LightMusicFollow',
                    value: brightness,
                    option: op === undefined ? 'upright' : op,
                    rgb: rgb,
                    dazzle: dazzle
                }
            default:
                return undefined
        }
    }

    setReSet = async () => {
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_SET_RESERT
        const res = await this.writeFeatureCmd(b)
        await sleep(4000)
        if (res) {
            this.currentProfile = 0
            this.reComData = {
                profile: 0,
                matrix: Buffer.from(this.defaultMatrix),
                marcroBuf: new Array()
              }
              this.reFnData = {
                profile: 0,
                matrix: undefined,
                marcroBuf: new Array()
              }
            this.lightPic = undefined
            this.allLayerConfigs = []
        }
        return res
    }
}