import { valueForKey } from "../../../../unitys/tableValueForKey";
import { numToRgb, rgbToNum } from "../../../../unitys/rgbNum";
import { sleep } from "../../../../unitys/timeFunc";
import { defaultMatrix_yzw_5108 } from "../yzw/yzw_5108Matrix";
import { YC200Common } from "./YC200Common";

export class YC200AKKOCommon extends YC200Common {
    defaultMatrix = defaultMatrix_yzw_5108
    DAZZLE = 7;
    NORMAL = 8;
    COMMONCOLOR: { [key: number]: number } = {
        0: 0xff0000,
        1: 0x00ff00,
        2: 0x0000ff,
        3: 0xff5500,
        4: 0x7700ff,
        5: 0xffff00,
        6: 0xffffff,
    };

    setSLEDParam = async (lightSet: LightSetting) => {

        const b = Buffer.alloc(64)


        b[0] = this.FEA_CMD_SET_SLEDPARAM

        let effect: number = 0
        let speed: number = 0
        let brightness: number = 0
        let option: number = 7
        let dazzle = lightSet.dazzle
        const musicKey = dazzle ? 0 : 4
        const n = dazzle ? this.DAZZLE : this.NORMAL

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
                option = lightSet.option !== undefined ? (this.WAVEOP[lightSet.option] << 4 | n) : (this.WAVEOP['right'] << 4 | n)
                brightness = lightSet.value
                break
            case 'LightSnake':
                effect = 0x05
                speed = lightSet.speed
                option = lightSet.option === 'z' || lightSet.option === undefined ? (0 << 4 | n) : (1 << 4 | n)
                brightness = lightSet.value
                break
            case 'LightMusicFollow3':
                b[0] = this.FEA_CMD_SET_LEDPARAM
                effect = 0x14
                option = lightSet.option === undefined || lightSet.option === 'upright' ? (0 << 4) | musicKey : this.MP[lightSet.option] << 4 | musicKey
                brightness = lightSet.value
                break
            case 'LightScreenColor':
                b[0] = this.FEA_CMD_SET_LEDPARAM
                effect = 0x15
                brightness = 4
                break
            case 'LightMusicFollow2':
                b[0] = this.FEA_CMD_SET_LEDPARAM
                effect = 0x16
                brightness = lightSet.value
                option = lightSet.option === undefined || lightSet.option === 'upright' ? (0 << 4) | musicKey : this.MP[lightSet.option] << 4 | musicKey
                break
            default:
                break
        }

        b[1] = effect
        b[2] = speed
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
        //console.log(lightSet, b)
        const buf = await this.writeFeatureCmd(b, 1, 500)
        if (!buf) return false
        await sleep(this.COMMONDELAY)
        return true
    }

    getSLEDParam = async (): Promise<LightSetting | undefined> => {
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_GET_SLEDPARAM
        const buf = await this.commomFeature(b, 0)
        // buf 

        if (buf === undefined) return undefined
        const effect = buf[1]
        const speed = buf[2]
        const brightness = buf[3]
        const option = buf[4]
        const option1 = option >> 4
        let rgb = rgbToNum(buf[5], buf[6], buf[7])

        const option2 = option & 0b1111

        const optionToRgb = (op: number) => {
            if (op === this.DAZZLE || op === this.NORMAL) return
            const trgb = this.COMMONCOLOR[op]
            if (trgb !== undefined) rgb = trgb
        }
        const musicDazzle = option2 === 0 ? true : false
        const dazzle = option2 === this.DAZZLE ? true : false

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
                    speed: speed
                }
            case 4:
                optionToRgb(option2)
                const wOp = valueForKey(this.WAVEOP, option1)
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
                    type: 'LightSnake',
                    value: brightness,
                    speed: speed,
                    option: option1 === 0 ? 'z' : 'return',
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 0x14:
                const op = valueForKey(this.MP, option1)
                return {
                    type: 'LightMusicFollow3',
                    value: brightness,
                    option: op === undefined ? 'upright' : op,
                    rgb: rgbToNum(buf[5], buf[6], buf[7]),
                    dazzle: musicDazzle
                }
            case 0x15:
                return {
                    type: 'LightScreenColor',
                    value: 4,
                }
            case 0x16:
                const op2 = valueForKey(this.MP, option1)
                return {
                    type: 'LightMusicFollow2',
                    option: op2 === undefined ? 'upright' : op2,
                    value: brightness,
                    rgb: rgbToNum(buf[5], buf[6], buf[7]),
                    dazzle: musicDazzle
                }
            default:
                return undefined
        }
    }
}