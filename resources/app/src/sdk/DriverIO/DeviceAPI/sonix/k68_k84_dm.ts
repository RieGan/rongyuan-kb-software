
import { numToRgb, rgbToNum } from "../../../../unitys/rgbNum";
import { K68_K84 } from "./k68_k84";
import { defaultMatrix_k68_k84_dm } from "./k68_k84_dmMatrix";

export class K68_K84_DM extends K68_K84 {
    defaultMatrix = defaultMatrix_k68_k84_dm

    setLightSetting = async (lightSet: LightSetting) => {
        const b = Buffer.alloc(64)
        b[0] = 0x04

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
                option = lightSet.option === 'full' ? (0 << 4) | 7 : (1 << 4) | 7
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
                option = lightSet.option === 'z' ? (0 << 4) | 7 : (1 << 4) | 7
                brightness = lightSet.value
                break
            case 'LightPressAction':
                effect = 0x08
                speed = lightSet.speed
                brightness = lightSet.value
                break
            case 'LightConverage':
                effect = 0x09
                speed = lightSet.speed
                brightness = lightSet.value
                break
            case 'LightUserPicture':
                effect = 0x0a
                option = 0
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
        b[0] = 0x84
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
                    value: 0,
                    speed: speed,
                    rgb: rgb,
                }
            case 3:
                return {
                    type: 'LightNeon',
                    value: 0,
                    speed: speed
                }
            case 4:
                return {
                    type: 'LightWave',
                    value: 0,
                    speed: speed,
                    option: (option & 0b1111) === 0 ? 'right' : 'left',
                }
            case 5:
                optionToRgb(option >> 4)
                return {
                    type: 'LightRipple',
                    value: 0,
                    speed: speed,
                    option: (option & 0b1111) === 0 ? 'full' : 'single',
                    rgb: rgb
                }
            case 6:
                optionToRgb(option)
                return {
                    type: 'LightRaindrop',
                    value: 0,
                    speed: speed,
                    rgb: rgb
                }
            case 7:
                optionToRgb(option)
                return {
                    type: 'LightSnake',
                    value: 0,
                    speed: speed,
                    option: (option & 0b1111) === 0 ? 'z' : 'return',
                    rgb: rgb
                }
            case 8:
                optionToRgb(option >> 4)
                return {
                    type: 'LightPressAction',
                    value: 0,
                    speed: speed,
                    option: (option & 0b1111) === 0 ? 'onToOff' : 'offToOn',
                    rgb: rgb
                }
            case 9:
                optionToRgb(option)
                return {
                    type: 'LightConverage',
                    value: 0,
                    speed: speed,
                    rgb: rgb
                }
            case 10:
                return {
                    type: 'LightUserPicture',
                    value: 0
                }
            default:
                return undefined
        }
    }

    protected _setLightPic = async (buf: Buffer) => {
        const b = Buffer.alloc(64)
        b[0] = 0x09
        b[1] = 0
        const length = 64 * this.picsCount
        const lenthBuf = Buffer.alloc(2)
        lenthBuf.writeUInt16LE(length)
        b[2] = lenthBuf[0]
        b[3] = lenthBuf[1]
        const h = await this.writeFeatureCmd(b)
        console.log('hhhhh', h)
        if (h === false) return false


        console.log('BBBBUUUUFFFF', buf)
        //

        for (let i = 0; i < this.picsCount; i++) {
            const bufS = Buffer.from([...buf.slice(i * 64, 64 + i * 64)])

            const sucess = await this.writeFeatureCmd(bufS)

            if (!sucess) return false
        }
        return true
    }
    setLightPic = async (pic: UserPicItem[]) => {
        //console.error(pic)


        const buf = Buffer.alloc(600).fill(0x00)
        // console.log(pic.map(v => {
        //     return {
        //         hid: v.hid,
        //         name: HidMapping.hidCodeMapKeyName(v.hid),
        //         rgb: v.rgb.toString(16)
        //     }
        // }))
        const indexArr = pic.map((v) => this.findIndexInDefaultMatrix(v.hid, v.index))
        for (let i = 0; i < indexArr.length; i++) {
            //console.log('setLightPic', i, indexArr.length)
            const index = indexArr[i]
            if (index === undefined) {
                console.log(pic)
                continue
                // throw Error('setLightPic 没有找到对应的hid' + pic[i].hid)
            }
            const rgb = numToRgb(pic[i].rgb)
            buf[index * 3] = rgb.r
            buf[index * 3 + 1] = rgb.g
            buf[index * 3 + 2] = rgb.b
            // console.log('第 :', Math.floor(i), '个按键,matirx第:', index, '设置为 ', {
            //     hid: pic[Math.floor(i)].hid,
            //     name: HidMapping.hidCodeMapKeyName(pic[Math.floor(i)].hid),
            //     rgb: pic[Math.floor(i)].rgb.toString(16)
            // })
        }

        const res = await this._setLightPic(buf)
        if (res) {
            this.lightPic = pic
        }
        return res

    }


    protected _getLightPic = async () => {
        const b = Buffer.alloc(64)
        b[0] = 0x89
        b[1] = 0

        const buf = await this.commomFeature(b)
        if (buf === undefined) return undefined

        let res = Buffer.alloc(0)



        for (let i = 0; i < this.picsCount; i++) {
            const b = await this.readFeatureCmd()
            if (b != undefined) res = Buffer.concat([res, b])
            // console.error(' bbbbbbbBBBBBBBBBBBB BBB',b)
        }
        return res
    }
    getLightPic = async () => {

        const res = await this._getLightPic()
        console.log('RRRREEEESSSS ', res)
        if (res === undefined) return undefined
        let picArr: UserPicItem[] = []


        for (let i = 0; i < res.length; i += 3) {
            const rgb = rgbToNum(res[i], res[i + 1], res[i + 2])
            const hid = this.findHidWithIndexInMatrix(Math.floor(i / 3))
            const findHid = picArr.filter(v => v.hid === hid)

            // console.log('第 :', Math.floor(i / 3), '个按键修改为 ', {
            //     hid: hid,
            //     name: HidMapping.hidCodeMapKeyName(hid),
            //     rgb: rgb.toString(16)
            // })
            if (hid === 0 || hid === undefined) {
                //wconsole.log('userpic hid 为0', hid, Math.floor(i / 3))
                continue
            }
            picArr.push({
                hid: hid,
                rgb: rgb,
                index: findHid.length === 0 ? undefined : findHid.length
            })
        }
        //console.error(picArr)
        this.lightPic = picArr
        return picArr

    }
}