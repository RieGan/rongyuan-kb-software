import { Dk2017 } from "../dk2017";
import { defaultMatrix_k68_hyekyu} from "./k68_hyekyuMatrix";

export class K68_HYEKYU extends Dk2017 {
    defaultMatrix = defaultMatrix_k68_hyekyu

    setLightSetting = async (lightSet: LightSetting) => {
        console.error(lightSet)
        const b = Buffer.alloc(64)
        b[0] = 0x04

        let effect: number = 0
        let speed: number = 0
        let brightness: number = 0
        let option: number = 0

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
            case 'LightWave':
                effect = 0x03
                speed = lightSet.speed
                option = lightSet.option === 'right' ? 0 : 1
                brightness = lightSet.value
                break
            case 'LightRipple':
                effect = 0x04
                speed = lightSet.speed
                option = lightSet.option === 'full' ? 0 : 1
                brightness = lightSet.value
                break
            case 'LightRaindrop':
                effect = 0x05
                speed = lightSet.speed
                brightness = lightSet.value
                break
            case 'LightSnake':
                effect = 0x06
                speed = lightSet.speed
                option = lightSet.option === 'z' ? 0 : 1
                brightness = lightSet.value
                break
            case 'LightPressAction':
                effect = 0x07
                speed = lightSet.speed
                option = lightSet.option === 'onToOff' ? 0 : 1
                brightness = lightSet.value
                break
            case 'LightConverage':
                effect = 0x08
                speed = lightSet.speed
                brightness = lightSet.value
                break
            case 'LightUserPicture':
                effect = 0x09
                brightness = lightSet.value
                break
            case 'LightSingleRipple':
                effect = 0x0a
                speed = lightSet.speed
                brightness = lightSet.value
                break
            case 'LightRoundRipple':
                effect = 0x0b
                speed = lightSet.speed
                brightness = lightSet.value
                break
            default:
                break
        }

        b[1] = effect
        b[2] = 5 - speed
        b[3] = brightness
        b[4] = option

        return await this.writeFeatureCmd(b)
    }

    getLightSetting = async (): Promise<LightSetting | undefined> => {
        const b = Buffer.alloc(64)
        b[0] = 0x84
        const buf = await this.commomFeature(b)
        if (buf === undefined) return undefined
        const effect = buf[1]
        const speed = 5 - buf[2]
        const brightness = buf[3]
        const option = buf[4]
        //console.log('!!!!!', effect, option)
        switch (effect) {
            case 0:
                return {
                    type: 'LightOff',
                }
            case 1:
                return {
                    type: 'LightAlwaysOn',
                    value: brightness,
                    rgb: 0,
                }
            case 2:
                return {
                    type: 'LightBreath',
                    value: brightness,
                    speed: speed,
                    rgb: 0,
                }
            case 3:
                return {
                    type: 'LightWave',
                    value: brightness,
                    speed: speed,
                    option: option === 0 ? 'right' : 'left',
                }
            case 4:
                return {
                    type: 'LightRipple',
                    value: brightness,
                    speed: speed,
                    option: option === 0 ? 'full' : 'single',
                }
            case 5:
                return {
                    type: 'LightRaindrop',
                    value: brightness,
                    speed: speed,
                }
            case 6:
                return {
                    type: 'LightSnake',
                    value: brightness,
                    speed: speed,
                    option: option === 0 ? 'z' : 'return',
                }
            case 7:
                return {
                    type: 'LightPressAction',
                    value: brightness,
                    speed: speed,
                    option: option === 0 ? 'onToOff' : 'offToOn',
                }
            case 8:
                return {
                    type: 'LightConverage',
                    value: brightness,
                    speed: speed,
                }
            case 9:
                return {
                    type: 'LightUserPicture',
                    value: brightness,
                }
            case 10:
                return {
                    type: 'LightSingleRipple',
                    value: brightness,
                    speed: speed,
                }
            case 11:
                return {
                    type: 'LightRoundRipple',
                    value: brightness,
                    speed: speed,
                }
            default:
                return undefined
        }
    }
}