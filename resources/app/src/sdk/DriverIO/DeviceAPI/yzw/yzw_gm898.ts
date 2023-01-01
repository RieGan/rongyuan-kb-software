import { numToRgb, rgbToNum } from "../../../../unitys/rgbNum"
import { valueForKey } from "../../../../unitys/tableValueForKey"
import { sleep } from "../../../../unitys/timeFunc"
import { defaultMatrix_yzw_gm898 } from "./yzw_gm898Matrix"
import { YZW_K68 } from "./yzw_k68"


const commonBrightness = 4
export class YZW_GM898 extends YZW_K68 {
    defaultMatrix = defaultMatrix_yzw_gm898
    DAZZLE = 8;
    NORMAL = 10;

    setLightSetting = async (lightSet: LightSetting) => {
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_SET_LEDPARAM

        let effect: number = 0
        let speed: number = 0
        let brightness: number = 0
        let option: number = 7
        let dazzle = lightSet.dazzle
        const n = dazzle ? this.DAZZLE : this.NORMAL
        const musicKey = 0

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
                option = lightSet.option !== undefined ? (this.WAVEOP[lightSet.option] << 4 | this.DAZZLE) : (this.WAVEOP['right'] << 4 | this.DAZZLE)
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
                effect = 0x0A
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightKaleidoscope':
                effect = 0x0B
                speed = lightSet.speed
                option = lightSet.option === 'out' || lightSet.option === undefined ? (0 << 4 | n) : (1 << 4 | n)
                // option = 0 << 4 | n
                brightness = lightSet.value
                break
            case 'LightLineWave':
                effect = 0x0C
                speed = lightSet.speed
                brightness = lightSet.value
                option = 0x08
                break

            case 'LightLaser':
                effect = 0x0D
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightCircleWave':
                effect = 0x0E
                speed = lightSet.speed
                brightness = lightSet.value
                option = lightSet.option === 'anti-clockwise' || lightSet.option === undefined ? (0 << 4 | n) : (1 << 4 | n)
                break
            case 'LightDazzing':
                effect = 0x0F
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightRainDown':
                effect = 0x10
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightMeteor':
                effect = 0x11
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightPressActionOff':
                effect = 0x12
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightUserPicture':
                effect = 0x13
                option = lightSet.option !== undefined ? this.USEROP[lightSet.option] : 0
                brightness = lightSet.value
                break
            case 'LightMusicFollow':
                effect = 0x14
                option = lightSet.option === undefined || lightSet.option === 'upright' ? (0 << 4) | musicKey : this.MP[lightSet.option] << 4 | musicKey
                brightness = 4
                break
            case 'LightScreenColor':
                effect = 0x15
                brightness = commonBrightness
                option = 0
                break
            case 'LightMusicFollow2':
                effect = 0x16
                brightness = 4
                option = lightSet.option === undefined || lightSet.option === 'upright' ? (0 << 4) | musicKey : this.MP[lightSet.option] << 4 | musicKey
                break
            default:
                break
        }

        b[1] = effect
        b[2] = 4 - speed
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
        // const newB = await this.getBufEi(b)
        const buf = await this.writeFeatureCmd(b,1, 500)
        if (!buf) return false
        await sleep(this.BIGCMDDELAY)
        return true
    }

    getLightSetting = async (): Promise<LightSetting | undefined> => {
        const rgbMap: {
            [key: number]: number
        } = {
            0: 0xff0000,
            1: 0xff4400,
            2: 0xffdd00,
            3: 0x00dd00,
            4: 0x00dd33,
            5: 0x0000ee,
            6: 0xff00ee,
            7: 0xffddee,
        }
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_GET_LEDPARAM
        // const newB = await this.getBufSe(b)
        const buf = await this.commomFeature(b,0)
        if (buf === undefined) return undefined
        const effect = buf[1]
        const speed = 4 - buf[2]
        const brightness = buf[3]
        const option = buf[4]
        let rgb = rgbToNum(buf[5], buf[6], buf[7])
        const option1 = option >> 4
        const option2 = option & 0b1111
        const optionToRgb = (op: number) => {
            if (op >= this.DAZZLE) return
            const trgb = rgbMap[op]
            if (trgb !== undefined) rgb = trgb

        }
        const dazzle = option2 === this.DAZZLE ? true : false
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
                const wOp = valueForKey(this.WAVEOP, option1)
                return {
                    type: 'LightWave',
                    value: brightness,
                    speed: speed,
                    option: wOp === undefined ? 'right' : wOp,
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
            case 0x0A:
                optionToRgb(option2)
                return {
                    type: 'LightSineWave',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 0x0B:
                optionToRgb(option2)
                return {
                    type: 'LightKaleidoscope',
                    option: option1 === 0 ? 'out' : 'in',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 0x0C:
                optionToRgb(option2)
                return {
                    type: 'LightLineWave',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 0x0D:
                optionToRgb(option2)
                return {
                    type: 'LightLaser',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 0x0E:
                optionToRgb(option2)
                return {
                    type: 'LightCircleWave',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    option: option1 === 0 ? 'anti-clockwise' : 'clockwise',
                    dazzle: dazzle
                }
            case 0x0F:
                optionToRgb(option2)
                return {
                    type: 'LightDazzing',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 0x10:
                optionToRgb(option2)
                return {
                    type: 'LightRainDown',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 0x11:
                optionToRgb(option2)
                return {
                    type: 'LightMeteor',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 0x12:
                optionToRgb(option2)
                return {
                    type: 'LightPressActionOff',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 0x13:
                const uOp = valueForKey(this.USEROP, option1)
                return {
                    type: 'LightUserPicture',
                    value: brightness,
                    option: uOp === undefined ? '1' : uOp,
                }
            case 0x14:
                const op = valueForKey(this.MP, option1)
                return {
                    type: 'LightMusicFollow',
                    value: 4,
                    option: op === undefined ? 'upright' : op,
                    rgb: rgbToNum(buf[5], buf[6], buf[7]),
                    dazzle: musicDazzle
                }
            case 0x15:
                return {
                    type: 'LightScreenColor',
                    value: commonBrightness,
                }
            case 0x16:
                const op2 = valueForKey(this.MP, option)
                return {
                    type: 'LightMusicFollow2',
                    option: op2 === undefined ? 'upright' : op2,
                    value: 4,
                    rgb: rgbToNum(buf[5], buf[6], buf[7]),
                    dazzle: musicDazzle
                }
            default:
                return undefined
        }
    }

}