import { numToRgb, rgbToNum } from "../../../../unitys/rgbNum";
import { valueForKey } from "../../../../unitys/tableValueForKey";
import { sleep } from "../../../../unitys/timeFunc";
import { defaultMatrix_yc200 } from "./yc200Matrix";
import { YZW_3098 } from "../yzw/yzw_3098";

export class YC200Common extends YZW_3098 {
    FEA_CMD_SET_KBOPTION = 0x06
    FEA_CMD_GET_KBOPTION = 0x86
    FEA_CMD_SET_OLEDGIFDATA = 0x24
    FEA_CMD_SET_OLEDLUANGAGE = 0x27
    FEA_CMD_SET_OLEDCLOCK = 0x28

    DAZZLE = 8;
    NORMAL = 7;
    COMMONCOLOR: { [key: number]: number } = {
        0: 0xff0000,
        1: 0xff8000,
        2: 0xffff00,
        3: 0x00ff00,
        4: 0x00ffff,
        5: 0x0000ff,
        6: 0xff00ff,
    };
    MAXSPEED = 4;
    USEROP = {
        '1': 0x00,
        '2': 0x10,
        '3': 0x20,
        '4': 0x30,
        '5': 0x40,
    };
    BIGCMDDELAY: number = 1000;
    COMMONDELAY: number = 500
    defaultMatrix = defaultMatrix_yc200
    setKeyboardOption = async (option: KeyboardOption) => {
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_SET_KBOPTION
        b[1] = this.currentProfile ? this.currentProfile : 0

        const byte1_bit0 = Number(option.winKeyLockControl)
        const byte1_bit2 = Number(option.system)
        const byte1_bit3 = Number(option.wasdKeyAndArrowKeyExchange)
        const byte1_bit4 = Number(option.ledOff)
        const byte1_bit5 = Number(option.sLedOff)
        const byte1_bit6 = Number(option.keyboardMode)
        const byte1_bit7 = Number(option.keyboardLockControl)

        const byte2 = Number(option.keyboardFnKeyMatrix)
        const byte3 = Number(option.powerSaveMode)
        b[2] = byte1_bit0
            | (0 << 1)
            | (byte1_bit2 << 2)
            | (byte1_bit3 << 3)
            | (byte1_bit4 << 4)
            | (byte1_bit5 << 5)
            | (byte1_bit6 << 6)
            | (byte1_bit7 << 7)

        b[3] = byte2
        b[4] = byte3

        return await this.writeFeatureCmd(b, 0)
    }

    getKeyboardOption = async () => {
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_GET_KBOPTION
        b[1] = this.currentProfile ? this.currentProfile : 0
        const buf = await this.commomFeature(b, 0)

        const byte_1 = buf?.readUInt8(2)
        const byte_2 = buf?.readUInt8(3)
        const byte_3 = buf?.readUInt8(4)
        if (byte_1 === undefined || byte_2 === undefined) return

        const keyboardOption: KeyboardOption = {
            winKeyLockControl: !!(byte_1 & 0b1),
            system: !!((byte_1 & 0b10) + (byte_1 & 0b100)),
            wasdKeyAndArrowKeyExchange: !!(byte_1 & 0b1000),
            ledOff: !!(byte_1 & 0b10000),
            sLedOff: !!(byte_1 & 0b100000),
            keyboardMode: !!(byte_1 & 0b1000000),
            keyboardLockControl: !!(byte_1 & 0b10000000),
            keyboardFnKeyMatrix: !!(byte_2 & 0b1),
            powerSaveMode: Boolean(byte_3)
        }

        return keyboardOption
    }

    getDeBounce = async () => {
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_GET_DEBOUNCE
        const buf = await this.commomFeature(b, 0)

        if (buf !== undefined) {
            return buf[2]
        }
        return undefined
    }

    setDeBounce = async (debounce: number) => {
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_SET_DEBOUNCE

        b[2] = debounce
        const buf = await this.writeFeatureCmd(b, 0)
        if (!buf) return false
        await sleep(this.COMMONDELAY)
        return true
    }

    getSleepKeyTime = async () => {
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_GET_SLEEPTIME//0x12
        const buf = await this.commomFeature(b, 0)

        let sleep: SleepKeyTime = {
            time_bt: 120,
            time_24: 120,
            deepTime_bt: 28 * 60,
            deepTime_24: 28 * 60,
        }

        if (buf !== undefined) {
            sleep = {
                time_bt: buf[2] << 8 | buf[1],
                time_24: buf[4] << 8 | buf[3],
                deepTime_bt: buf[6] << 8 | buf[5],
                deepTime_24: buf[8] << 8 | buf[7],
            }

            if (this.deviceType.otherSetting?.sleep_24) {
                const tmp = this.deviceType.otherSetting.sleep_24
                sleep.time_24 = sleep.time_24 < tmp.min * 60
                    ? tmp.min * 60
                    : sleep.time_24 > tmp.max * 60
                        ? tmp.max * 60
                        : sleep.time_24

                sleep.deepTime_24 = sleep.deepTime_24 < tmp.min_deep * 60
                    ? tmp.min_deep * 60
                    : sleep.deepTime_24 > tmp.max_deep * 60
                        ? tmp.max_deep * 60
                        : sleep.deepTime_24
            } else {
                sleep.time_24 = 0
                sleep.deepTime_24 = 0
            }

            if (this.deviceType.otherSetting?.sleep_bt) {
                const tmp = this.deviceType.otherSetting.sleep_bt
                sleep.time_bt = sleep.time_bt < tmp.min * 60
                    ? tmp.min * 60
                    : sleep.time_bt > tmp.max * 60
                        ? tmp.max * 60
                        : sleep.time_bt

                sleep.deepTime_bt = sleep.deepTime_bt < tmp.min_deep * 60
                    ? tmp.min_deep * 60
                    : sleep.deepTime_bt > tmp.max_deep * 60
                        ? tmp.max_deep * 60
                        : sleep.deepTime_bt
            } else {
                sleep.time_bt = 0
                sleep.deepTime_bt = 0
            }
        }
        return sleep
    }

    setSleepKeyTime = async (sleeps: SleepKeyTime) => {
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_SET_SLEEPTIME
        b[8] = sleeps.time_bt - ((sleeps.time_bt >> 8) << 8);
        b[9] = sleeps.time_bt >> 8;
        b[10] = sleeps.time_24 - ((sleeps.time_24 >> 8) << 8);
        b[11] = sleeps.time_24 >> 8;
        b[12] = sleeps.deepTime_bt - ((sleeps.deepTime_bt >> 8) << 8);
        b[13] = sleeps.deepTime_bt >> 8;
        b[14] = sleeps.deepTime_24 - ((sleeps.deepTime_24 >> 8) << 8);
        b[15] = sleeps.deepTime_24 >> 8;
        const buf = await this.writeFeatureCmd(b, 0)
        if (!buf) return false
        await sleep(this.COMMONDELAY)
        return true
    }

    setScreen = async (uint8ClampedArray: Uint8ClampedArray) => {
        // if (this.deviceType.is24) {
        //     await this.fe_24_set_next_pack_length(8)
        // }

        const b = new Array(1)
        b[0] = this.FEA_CMD_SET_WINDOS

        const sendArr = b.concat(...uint8ClampedArray)


        const sendBuf = Buffer.from(sendArr.concat(new Array(64 - sendArr.length)))
        const res = this.writeFeatureCmd(sendBuf, 0, 0)
        return res
    }

    setMusicFollow = async (arr: Array<number>, flag: number, needfe: boolean = false) => {
        let hanleArr = arr.slice(flag, flag + 32)
        if (this.deviceType.is24 && needfe) {
            // 加上开始的FEA_CMD_SET_AUDIO
            await this.fe_24_set_next_pack_length(hanleArr.length / 2 + 1)
        }

        const b = new Array(this.deviceType.is24 ? 1 : 8)
        b[0] = this.FEA_CMD_SET_AUDIO

        while (hanleArr.filter(v => v !== 0).length < 5 && flag > 0) {
            flag--
            hanleArr = arr.slice(flag, flag + 32)
        }

        if (!this.deviceType.is24)
            b[7] = 255 - (b[0] & 0xff)

        const sendArr = b.concat(...hanleArr)

        const sendBuf = Buffer.from(sendArr.concat(new Array(64 - sendArr.length)))

        let tmp = Buffer.alloc(sendBuf.length);
        tmp = sendBuf
        if (this.deviceType.is24) {
            tmp[0] = this.FEA_CMD_SET_AUDIO
            for (var i = 0; i < hanleArr.length / 2; i++) {
                tmp[i + 1] = hanleArr[2 * i] | hanleArr[2 * i + 1] << 4;
            }
        }
        if (this.deviceType.is24) {
            return await this.writeRawFeatureCmd(tmp, 2, 0)
        } else {
            return await this.writeRawFeatureCmd(tmp, 0, 0)
        }


    }

    getFirmwareVersion = async () => {
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_GET_REV
        const buf = await this.commomFeature(b, 0)
        return buf?.readUInt16LE(1)
    }

    setReportRate = async (
        rate: 1000 | 500 | 250 | 125,
    ) => {
        let num
        switch (rate) {
            case 1000:
                num = 0x01
                break
            case 500:
                num = 0x02
                break
            case 250:
                num = 0x04
                break
            case 125:
                num = 0x08
                break
            default:
                num = 0x00
                break
        }
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_SET_REPORT
        b[1] = this.currentProfile ? this.currentProfile : 0
        b[2] = num
        const res = await this.writeFeatureCmd(b, 0)
        await sleep(this.BIGCMDDELAY)
        return res
    }

    getReportRate = async () => {
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_GET_REPORT
        b[1] = this.currentProfile ? this.currentProfile : 0
        const buf = await this.commomFeature(b, 0)
        const num = buf?.readUInt8(2)
        switch (num) {
            case 0x01:
                return 1000
            case 0x02:
                return 500
            case 0x04:
                return 250
            case 0x08:
                return 125
            default:
                return 'err'
        }
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
            //console.error('SSSSS', b, b.concat(ms))
            let sum = 0
            for (let n = 0; n < 7; n++) {
                sum += b[n]
            }
            b[7] = 255 - (sum & 0xff)
            const buf = Buffer.from(b.concat(ms))

            // if (this.deviceType.is24) {
            //     const res = await this.checkStatus(true);
            //     if (res === undefined) return false;
            //     if (!res.isSend) return false;
            // }


            const sucess = await this.writeFeatureCmd(buf)

            if (!sucess) return false
        }
        await sleep(this.BIGCMDDELAY)
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

            // if (this.deviceType.is24) {
            //     const res = await this.checkStatus(true);
            //     if (res === undefined) return false;
            //     if (!res.isSend) return false;
            // }

            const sucess = await this.writeFeatureCmd(bufS, 0)

            // console.error('bufSbufSbufS', bufS);
            // console.error('sucesssucess', sucess);
            if (!sucess) return false
        }
        await sleep(this.BIGCMDDELAY)
        return true
    }

    setSLEDParam = async (lightSet: LightSetting) => {

        const b = Buffer.alloc(64)


        b[0] = this.FEA_CMD_SET_SLEDPARAM

        let effect: number = 0
        let speed: number = 0
        let brightness: number = 0
        let option: number = 7
        let dazzle = lightSet.dazzle
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
        const buf = await this.writeFeatureCmd(b, 1, 500)
        if (!buf) return false
        await sleep(this.COMMONDELAY)
        return true
    }

    getSLEDParam = async (): Promise<LightSetting | undefined> => {
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_GET_SLEDPARAM
        const buf = await this.commomFeature(b, 0)
        if (buf === undefined) return undefined
        const effect = buf[1]
        const speed = this.MAXSPEED - buf[2]
        const brightness = buf[3]
        const option = buf[4]
        let rgb = rgbToNum(buf[5], buf[6], buf[7])

        const option2 = option & 0b1111

        const optionToRgb = (op: number) => {
            if (op === this.DAZZLE || op === this.NORMAL) return
            const trgb = this.COMMONCOLOR[op]
            if (trgb !== undefined) rgb = trgb
        }

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
            default:
                return undefined
        }
    }

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
                effect = 0x0A
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightKaleidoscope':
                effect = 0x0B
                speed = lightSet.speed
                option = lightSet.option === 'out' || lightSet.option === undefined ? (0 << 4 | n) : (1 << 4 | n)
                brightness = lightSet.value
                break
            case 'LightLineWave':
                effect = 0x0C
                speed = lightSet.speed
                brightness = lightSet.value
                option = lightSet.option === 'right' || lightSet.option === undefined ? (0 << 4 | n) : (1 << 4 | n)
                break
            case 'LightUserPicture':
                effect = 0x0D
                option = lightSet.option !== undefined ? this.USEROP[lightSet.option] : 0
                brightness = lightSet.value
                break
            case 'LightLaser':
                effect = 0x0E
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightCircleWave':
                effect = 0x0F
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
            case 'LightRainDown':
                effect = 0x11
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightMeteor':
                effect = 0x12
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightPressActionOff':
                effect = 0x13
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightMusicFollow3':
                effect = 0x14
                option = lightSet.option === undefined || lightSet.option === 'upright' ? (0 << 4) | musicKey : this.MP[lightSet.option] << 4 | musicKey
                brightness = lightSet.value
                break
            case 'LightScreenColor':
                effect = 0x15
                brightness = 4
                break
            case 'LightMusicFollow2':
                effect = 0x16
                brightness = lightSet.value
                option = lightSet.option === undefined || lightSet.option === 'upright' ? (0 << 4) | musicKey : this.MP[lightSet.option] << 4 | musicKey
                break
            case 'LightTrain':
                effect = 0x17
                speed = lightSet.speed
                brightness = lightSet.value
                option = n
                break
            case 'LightFireWorks':
                effect = 0x18
                speed = lightSet.speed
                brightness = lightSet.value
                option = lightSet.option === 'right' || lightSet.option === undefined ? (0 << 4 | n) : (1 << 4 | n)
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

        const buf = await this.writeFeatureCmd(b, 1, 500)

        if (!buf) return false
        await sleep(this.COMMONDELAY)
        return true
    }

    getLightSetting = async (): Promise<LightSetting | undefined> => {
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
            if (op === this.DAZZLE || op === this.NORMAL) return
            const trgb = this.COMMONCOLOR[op]
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
                    option: option1 === 0 ? 'right' : 'left',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 0x0E:
                optionToRgb(option2)
                return {
                    type: 'LightLaser',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 0x0F:
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
                optionToRgb(option2)
                return {
                    type: 'LightRainDown',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 0x12:
                optionToRgb(option2)
                return {
                    type: 'LightMeteor',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 0x13:
                optionToRgb(option2)
                return {
                    type: 'LightPressActionOff',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 0x0D:
                const uOp = valueForKey(this.USEROP, option)
                return {
                    type: 'LightUserPicture',
                    value: brightness,
                    option: uOp === undefined ? '1' : uOp,
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
            case 0x17:
                optionToRgb(option2)
                return {
                    type: 'LightTrain',
                    value: brightness,
                    speed: speed,
                    rgb: rgb,
                    dazzle: dazzle
                }
            case 0x18:
                optionToRgb(option2)
                return {
                    type: 'LightFireWorks',
                    value: brightness,
                    speed: speed,
                    option: option1 === 0 ? 'right' : 'left',
                    rgb: rgb,
                    dazzle: dazzle
                }
            default:
                return undefined
        }
    }

    setOLEDLanguage = async (isSwitch: boolean) => {
        const b = Buffer.alloc(8)
        b[0] = this.FEA_CMD_SET_OLEDLUANGAGE
        b[1] = isSwitch ? 0 : 1

        return await this.writeFeatureCmd(b, 0)
    }
    setOLEDClock = async () => {
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_SET_OLEDCLOCK
        let date = new Date()
        const length = date.getFullYear()
        const lenthBuf = Buffer.alloc(2)
        lenthBuf.writeUInt16LE(length)
        b[8] = lenthBuf[1]
        b[9] = lenthBuf[0]
        b[10] = date.getMonth() + 1
        b[11] = date.getDate()
        b[12] = date.getHours()
        b[13] = date.getMinutes()
        b[14] = date.getSeconds()
        return await this.writeFeatureCmd(b, 0)
    }
}