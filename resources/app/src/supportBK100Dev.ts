import { BK100Other } from "./res/otherSetting/yc200Other"
import { SupportDevType } from "./supportDev"

const kRGBGroup = 'rongyuan_k_rgb'
export const supportBK100Dev: SupportDevType[] = [
    // {
    //     id: 9999,
    //     vid: 0x25a7,
    //     pid: 0x2301,
    //     usage: 6,
    //     usagePage: 1,
    //     name: 'bk100common',
    //     displayName: 'bk2635v100',
    //     support_onboard: 2,
    //     type: 'keyboard',
    //     group: kRGBGroup,
    //     featureReportByteLength: 65,
    //     company: 'rongyuan',
    //     layer: 8,
    //     fnLayer: 1,
    //     otherSetting:BK100Other
    // },
    {
        id: 567,
        vid: 0x25a7,
        pid: 0x2301,
        usage: 6,
        usagePage: 1,
        name: 'bk100_3087rf_24_2m',
        displayName: '3087rf',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'akko',
        layer: 4,
        fnLayer: 1,
        otherSetting:BK100Other
    },
    {
        id: 548,
        vid: 0x25a7,
        pid: 0x2301,
        usage: 6,
        usagePage: 1,
        name: 'bk100_3108s',
        displayName: '3108rf',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'akko',
        layer: 4,
        fnLayer: 1,
        otherSetting:BK100Other
    },
]