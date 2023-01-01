import { DeviceType } from "../../DB/entity/device_type"
import { BK100COMMON } from "./bk100/bk100common"
import { BK100_3087RF_24_2M } from "./bk100/bk100_3087rf_24_2m"
import { BK100_3108S } from "./bk100/bk100_3108s"




export const findBK100Dev = (dev: DeviceType, devName?: string) => {
    switch (devName) {
        case 'bk100common':
            return new BK100COMMON(dev)
        case 'bk100_3108s':
            return new BK100_3108S(dev)
        case 'bk100_3087rf_24_2m':
            return new BK100_3087RF_24_2M(dev)
        default:
            return undefined
    }
}