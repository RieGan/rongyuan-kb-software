import { arrTo16, specialFunTablectionArr } from "../../../../res/映射"
import { numToRgb, rgbToNum } from "../../../../unitys/rgbNum"
import { valueForKey } from "../../../../unitys/tableValueForKey"
import { sleep } from "../../../../unitys/timeFunc"
import { YZWCommon } from "./YZWCommon"
import { defaultMatrix_yzw_k68 } from "./yzw_k68Matrix"

const commonBrightness = 6
export class YZW_K68 extends YZWCommon {
    defaultMatrix = defaultMatrix_yzw_k68

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
                option = lightSet.option !== undefined ? (this.WAVEOP[lightSet.option] << 4 | n) : (this.WAVEOP['right'] << 4 | n)
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
                option = lightSet.option !== undefined ? this.USEROP[lightSet.option] : 0
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
                option = this.MP[lightSet.option] << 4 | musicKey
                brightness = lightSet.value
                break
            case 'LightScreenColor':
                effect = 0x12
                brightness = commonBrightness
                option = 0
                break
            case 'LightMusicFollow2':
                effect = 0x13
                brightness = lightSet.value
                option = lightSet.option === undefined || lightSet.option === 'upright' ? (0 << 4) | musicKey : this.MP[lightSet.option] << 4 | musicKey
                break
            default:
                break
        }

        b[1] = effect
        b[2] = this.MAXSPEED - speed
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
        const rgbMap: { [key: number]: number } = this.COMMONCOLOR
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_GET_LEDPARAM
        const buf = await this.commomFeature(b, 0)
        if (buf === undefined) return undefined
        const effect = buf[1]
        const speed = this.MAXSPEED - buf[2]
        const brightness = buf[3]
        const option = buf[4]
        let rgb = rgbToNum(buf[5], buf[6], buf[7])
        const option1 = option >> 4
        const option2 = option & 0b1111
        const optionToRgb = (op: number) => {
            if (op === this.NORMAL || op === this.DAZZLE) return
            const trgb = rgbMap[op]
            if (trgb !== undefined) rgb = trgb

        }
        const dazzle = option2 === this.DAZZLE ? true : false
        const musicDazzle = option2 === 0 ? true : false

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
                const uOp = valueForKey(this.USEROP, option1)
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
                const op = valueForKey(this.MP, option1)
                return {
                    type: 'LightMusicFollow',
                    value: brightness,
                    option: op === undefined ? 'upright' : op,
                    rgb: rgbToNum(buf[5], buf[6], buf[7]),
                    dazzle: musicDazzle
                }
            case 0x12:
                return {
                    type: 'LightScreenColor',
                    value: commonBrightness,
                }
            case 0x13:
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


    protected _setLightPic = async (buf: Buffer) => {
        const b = Buffer.alloc(8)
        b[0] = this.FEA_CMD_SET_USERPIC
        b[1] = 0
        const length = 64 * this.picsCount
        const lenthBuf = Buffer.alloc(2)
        lenthBuf.writeUInt16LE(length)
        b[2] = lenthBuf[0]
        b[3] = lenthBuf[1]



        for (let i = 0; i < 7; i++) {
            b[4] = i
            //const h = await this.writeFeatureCmd(b)

            //if (h === false) return false
            let ms = [...buf.slice(i * 56, 56 + i * 56)]
            if (ms.length < 56) {
                ms = ms.concat(new Array(56 - ms.length).fill(0))
            }
            const bufS = Buffer.from([...b, ...ms])

            const sucess = await this.writeFeatureCmd(bufS, 0, this.LITTLECMDDELAY)

            if (!sucess) return false
        }
        await sleep(this.BIGCMDDELAY)
        return true
    }

    protected _setKeyConfig = async (matrix: number[]) => {
        //console.error('1111111')
        const b = new Array(8).fill(0)
        b[0] = this.FEA_CMD_SET_KEYMATRIX
        b[1] = this.currentProfile ? this.currentProfile : 0
        b[2] = 0xf8
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
            let sum = 0
            for (let n = 0; n < 7; n++) {
                sum += b[n]
            }
            b[7] = 255 - (sum & 0xff)

            // 旋钮功能处理
            for (let j = 0; j < ms.length / 4; j++) {
                let specialKey = ms.slice(j * 4, 4 + j * 4)
                specialFunTablectionArr.map((v) => {
                    if (specialKey[2] !== 0 && specialKey[2] === arrTo16(v)) {
                        // console.error("special key:", specialKey, ", vvvvv: ", v)
                        specialKey = v
                        specialKey.map((v, k) => {
                            ms.splice(j * 4 + k, 1, v)
                        })
                    }
                })
            }
            const buf = Buffer.from(b.concat(ms))

            const sucess = await this.writeFeatureCmd(buf)

            if (!sucess) return false
        }
        await sleep(1000)
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
            const sucess = await this.writeFeatureCmd(bufS, 0)

            // console.error('bufSbufSbufS', bufS);
            // console.error('sucesssucess', sucess);
            if (!sucess) return false



        }
        await sleep(this.BIGCMDDELAY)
        return true
    }
}