import { numToRgb, rgbToNum } from "../../../unitys/rgbNum";
import { valueForKey } from "../../../unitys/tableValueForKey";
import { defaultMatrix_Common } from "./CommonMatrix";
import { K68 } from "./sonix/k68";
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
    '5': 0x40,
}

export class Common extends K68 {

    defaultMatrix = defaultMatrix_Common

    FEA_CMD_SET_REV = 0x00
    FEA_CMD_GET_REV = 0x80
    FEA_CMD_GET_INFOR = 0x8F
    FEA_CMD_SET_RESERT = 0x02
    FEA_CMD_GET_BATTERY = 0x83
    FEA_CMD_SET_REPORT = 0x04
    FEA_CMD_GET_REPORT = 0x84
    FEA_CMD_SET_PROFILE = 0x05
    FEA_CMD_GET_PROFILE = 0x85
    FEA_CMD_SET_KBOPTION = 0x06
    FEA_CMD_GET_KBOPTION = 0x86
    FEA_CMD_SET_LEDPARAM = 0x07
    FEA_CMD_GET_LEDPARAM = 0x87
    FEA_CMD_SET_SLEDPARAM = 0x08
    FEA_CMD_GET_SLEDPARAM = 0x88
    FEA_CMD_SET_KEYMATRIX = 0x09
    FEA_CMD_GET_KEYMATRIX = 0x89
    FEA_CMD_SET_KEYENABLE = 0x0A
    FEA_CMD_GET_KEYENABLE = 0x8A
    FEA_CMD_SET_MACRO = 0x0B
    FEA_CMD_GET_MACRO = 0x8B
    FEA_CMD_SET_USERPIC = 0x0C
    FEA_CMD_GET_USERPIC = 0x8C
    FEA_CMD_SET_AUDIO = 0x0D

    picsCount = Math.floor(this.defaultMatrix.length / 4 * 3 / 64)//应该用ceil  固件没有对齐
    //brightness 0~6
    setLightSetting = async (lightSet: LightSetting) => {
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_SET_LEDPARAM

        let effect: number = 0
        let speed: number = 0
        let brightness: number = 0
        let option: number = 7

        switch (lightSet.type) {
            case 'LightOff':
                effect = 0x00
                break
            case 'LightAlwaysOn':
                effect = 0x01
                brightness = lightSet.value
                break
            case 'LightBreath':
                effect = 0x02
                speed = lightSet.speed
                brightness = lightSet.value
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
                option = lightSet.option === 'full' ? (7 << 4) | 0 : (7 << 4) | 1
                brightness = lightSet.value
                break
            case 'LightRaindrop':
                effect = 0x06
                speed = lightSet.speed
                brightness = lightSet.value
                break
            case 'LightSnake':
                effect = 0x07
                speed = lightSet.speed
                option = lightSet.option === 'z' ? (7 << 4) | 0 : (7 << 4) | 1
                brightness = lightSet.value
                break
            case 'LightPressAction':
                effect = 0x08
                speed = lightSet.speed
                option = lightSet.option === 'onToOff' ? (7 << 4) | 0 : (7 << 4) | 1
                brightness = lightSet.value
                break
            case 'LightConverage':
                effect = 0x09
                speed = lightSet.speed
                brightness = lightSet.value
                break
            case 'LightSineWave':
                effect = 0x0a
                speed = lightSet.speed
                brightness = lightSet.value
                break
            case 'LightKaleidoscope':
                effect = 0x0b
                speed = lightSet.speed
                option = lightSet.option === 'out' ? (7 << 4) | 0 : (7 << 4) | 1
                brightness = lightSet.value
                break
            case 'LightLineWave':
                effect = 0x0c
                speed = lightSet.speed
                brightness = lightSet.value
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
                break
            case 'LightCircleWave':
                effect = 0x0f
                speed = lightSet.speed
                brightness = lightSet.value
                break

            case 'LightDazzing':
                effect = 0x10
                speed = lightSet.speed
                brightness = lightSet.value
                break
            case 'LightMusicFollow':
                effect = 0x11
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
        //console.log(lightSet, b)
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
        b[0] = this.FEA_CMD_GET_LEDPARAM
        const buf = await this.commomFeature(b)
        if (buf === undefined) return undefined
        const effect = buf[1]
        const speed = 5 - buf[2]
        const brightness = buf[3]
        const option = buf[4]
        let rgb = rgbToNum(buf[5], buf[6], buf[7])
        const optionToRgb = (op: number) => {
            if (op === 7) return
            const trgb = rgbMap[op]
            if (trgb !== undefined) rgb = trgb

        }
        if (rgb === 0xfafffa) rgb = 0xffffff
        //console.log('!!!!!', effect, option)
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
                }
            case 2:
                optionToRgb(option)
                return {
                    type: 'LightBreath',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                }
            case 3:
                return {
                    type: 'LightNeon',
                    value: brightness,
                    speed: speed
                }
            case 4:
                return {
                    type: 'LightWave',
                    value: brightness,
                    speed: speed,
                    option: (option & 0b1111) === 0 ? 'right' : 'left',
                }
            case 5:
                optionToRgb(option >> 4)
                return {
                    type: 'LightRipple',
                    value: brightness,
                    speed: speed,
                    option: (option & 0b1111) === 0 ? 'full' : 'single',
                    rgb: rgb
                }
            case 6:
                optionToRgb(option)
                return {
                    type: 'LightRaindrop',
                    value: brightness,
                    speed: speed,
                    rgb: rgb
                }
            case 7:
                optionToRgb(option)
                return {
                    type: 'LightSnake',
                    value: brightness,
                    speed: speed,
                    option: (option & 0b1111) === 0 ? 'z' : 'return',
                    rgb: rgb
                }
            case 8:
                optionToRgb(option >> 4)
                return {
                    type: 'LightPressAction',
                    value: brightness,
                    speed: speed,
                    option: (option & 0b1111) === 0 ? 'onToOff' : 'offToOn',
                    rgb: rgb
                }
            case 9:
                optionToRgb(option)
                return {
                    type: 'LightConverage',
                    value: brightness,
                    speed: speed,
                    rgb: rgb
                }
            case 0x0a:
                optionToRgb(option)
                return {
                    type: 'LightSineWave',
                    value: brightness,
                    speed: speed,
                    rgb: rgb
                }
            case 0x0b:
                optionToRgb(option)
                return {
                    type: 'LightKaleidoscope',
                    option: (option & 0b1111) === 0 ? 'out' : 'in',
                    value: brightness,
                    speed: speed,
                    rgb: rgb
                }
            case 0x0c:
                optionToRgb(option)
                return {
                    type: 'LightLineWave',
                    value: brightness,
                    speed: speed,
                    rgb: rgb
                }

            /*
            case 'LightSineWave':
            effect = 0x0a
            speed = lightSet.speed
            brightness = lightSet.value
            break
        case 'LightKaleidoscope':
            effect = 0x0b
            speed = lightSet.speed
            option = lightSet.option === 'out' ? (7 << 4) | 0 : (7 << 4) | 1
            brightness = lightSet.value
            break
        case 'LightLineWave':
            effect = 0x0c
            speed = lightSet.speed
            brightness = lightSet.value
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
            break
        case 'LightCircleWave':
            effect = 0x0f
            speed = lightSet.speed
            brightness = lightSet.value
            break

        case 'LightDazzing':
            effect = 0x10
            speed = lightSet.speed
            brightness = lightSet.value
            break
            */
            case 0x0d:
                const uOp = valueForKey(uesrOp, option)
                return {
                    type: 'LightUserPicture',
                    value: 0,
                    option: uOp === undefined ? '1' : uOp,
                }
            case 0x0e:
                optionToRgb(option)
                return {
                    type: 'LightLaser',
                    value: brightness,
                    speed: speed,
                    rgb: rgb
                }
            case 0x0f:
                optionToRgb(option)
                return {
                    type: 'LightCircleWave',
                    value: brightness,
                    speed: speed,
                    rgb: rgb
                }
            case 0x10:
                optionToRgb(option)
                return {
                    type: 'LightDazzing',
                    value: brightness,
                    speed: speed,
                    rgb: rgb
                }
            case 0x11:
                const op = valueForKey(mp, option)
                return {
                    type: 'LightMusicFollow',
                    value: 0,
                    option: op === undefined ? 'upright' : op,
                    rgb: rgb
                }
            default:
                return undefined
        }
    }
    protected _setLightPic = async (buf: Buffer) => {
        const b = Buffer.alloc(8)
        b[0] = this.FEA_CMD_SET_USERPIC
        b[1] = 0
        const length = 64 * this.picsCount
        const lenthBuf = Buffer.alloc(2)
        lenthBuf.writeUInt16LE(length)
        b[2] = lenthBuf[0]
        b[3] = lenthBuf[1]



        console.log('BBBBUUUUFFFF', buf)
        //

        for (let i = 0; i < 7; i++) {
            b[4] = i
            const h = await this.writeFeatureCmd(b)

            if (h === false) return false
            const bufS = Buffer.from([...b, ...buf.slice(i * 56, 56 + i * 56)])

            const sucess = await this.writeFeatureCmd(bufS)

            if (!sucess) return false
        }
        return true
    }

    protected _getLightPic = async () => {
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_GET_USERPIC
        b[1] = 0



        let res = Buffer.alloc(0)



        for (let i = 0; i < 6; i++) {
            b[2] = i
            const buf = await this.commomFeature(b)
            if (buf === undefined) return undefined

            res = Buffer.concat([res, buf])
            // console.error(' bbbbbbbBBBBBBBBBBBB BBB',b)
        }
        return res
    }


    protected async _getKeyMatrix(profile?: number) {
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_GET_KEYMATRIX
        b[1] = profile === undefined ? this.currentProfile : profile

        let res = Buffer.alloc(0)
        for (let i = 0; i < 8; i++) {
            b[2] = i
            const buf = await this.commomFeature(b)

            //if (buf === undefined) return undefined
            //const b1 = await this.readFeatureCmd(10)
            //console.error('BBBBBB', b, b[2])
            if (buf === undefined) throw '_getKeyMatrix !!!undefine'

            res = Buffer.concat([res, buf])
        }
        return res
    }
    protected _setKeyConfig = async (matrix: number[]) => {
        //console.error('1111111')
        const b = new Array(8).fill(0)
        b[0] = this.FEA_CMD_SET_KEYMATRIX
        b[1] = this.currentProfile
        b[2] = 0xc0
        b[3] = 0x01
        /////

        ////
        //console.log('下命令 ！！！：', matrix)
        for (let i = 0; i < 9; i++) {
            b[4] = i

            let ms = matrix.slice(i * 56, 56 + i * 56)
            if (ms.length < 56) {
                ms = ms.concat(new Array(56 - ms.length).fill(0))
            }
            //console.error('SSSSS', b, b.concat(ms))
            const buf = Buffer.from(b.concat(ms))
            const sucess = await this.writeFeatureCmd(buf)
            if (!sucess) return false
        }
        return true
    }
    protected _setMacro = async (buf: Buffer, index: number) => {
        const b = Buffer.alloc(8)
        b[0] = this.FEA_CMD_SET_MACRO
        b[1] = index
        b[2] = 0x00
        b[3] = 0x01
        for (let i = 0; i < 5; i++) {
            b[4] = i

            let ms = [...buf.slice(i * 56, 56 + i * 56)]
            if (ms.length < 56) {
                ms = ms.concat(new Array(56 - ms.length).fill(0))
            }

            const bufS = Buffer.from([...b, ...ms])

            const sucess = await this.writeFeatureCmd(bufS)

            if (!sucess) return false
        }
        return true
    }
    getMacro = async (index: number) => {
        //for dev
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_GET_MACRO
        b[1] = index

        let res = Buffer.alloc(0)
        for (let i = 0; i < 4; i++) {
            b[2] = i
            const buf = await this.commomFeature(b)
            if (buf === undefined) return undefined

            res = Buffer.concat([res, buf])
        }
        return this.buffToMacroEvents(res)
    }
}