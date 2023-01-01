import { commonLayout } from "./res/lightLayout/commonLayout"
import { lightAbtX90Layout } from "./res/lightLayout/lightAbtX90Layout"
import { lightBOYILayout } from "./res/lightLayout/lightBOYILayout"
import { fulingRGBLayout } from "./res/lightLayout/lightFuLingLayout"
import { lightHFLayout } from "./res/lightLayout/lightHFLayout"
import { lightmhxLayout } from "./res/lightLayout/lightmhxLayout"
import { rongyuanMusicLayout, rongyuanMusicNoPicValueLayout } from "./res/lightLayout/lightMusicLayout"
import { rongyuanSK1RGBLayout } from "./res/lightLayout/lightSK1Layout"
import { lightTaoDiLayout } from "./res/lightLayout/lightTaoDiLayout"
import { rongyuanRGBLayout, rongyuanRGBLayout4, rongyuanRGBLayoutKB, rongyuanRGBLayout2, rongyuanNoRGBLayout2, rongyuanNoRGBLayout } from "./res/lightLayout/rongyuanRGBLayout"
import { supportBK100Dev } from "./supportBK100Dev"
import { supportYC200Dev } from "./supportYC200Dev"
import { supportYC400Dev } from "./supportYC400Dev"
import { supportYC500Dev } from "./supportYC500Dev"
import { supportYZWDev } from "./supportYZWDev"
export type OtherSetting = {
    deBounce?: number
    auto?: boolean
    sleep_24?: {
        min: number
        max: number
        min_deep: number
        max_deep: number
    }
    sleep_bt?: {
        min: number
        max: number
        min_deep: number
        max_deep: number
    }
    LED?: {
        isRgb: false | '16' | '24'
        kbW: number
        kbH: number
        size: number
        change?: boolean
        date?: boolean
        isInfro?: boolean
    }
}



export interface Layout {
    dpi?: {
        count: number
        min: number
        max: number
        delt: number
    }
    light: {
        isRgb: boolean
        isFormal?: boolean
        types: {
            type: string
            maxSpeed?: number
            minSpeed?: number
            maxValue?: number
            minValue?: number
            options?: string[]
            rgb?: boolean
            dazzle?: boolean
        }[]
    }
    reportRate: number[]
}

export type SupportDevType = {
    id: number,
    vid: number,
    pid: number,
    name: string,
    type: 'mouse' | 'keyboard',//鼠标还是键盘,
    support_onboard: 0 | 1 | 2 | 3,//0 不支持 1 不支持mousemove 2 支持mousemove, 3 支持多套板载
    usage: number,
    usagePage: number
    version?: string,
    layout?: Layout
    group?: string
    displayName?: string
    company?: string
    featureReportByteLength?: number
    layer?: number
    fnLayer?: number
    logoLayout?: Layout
    otherSetting?: OtherSetting
}


const kRGBGroup = 'rongyuan_k_rgb'
const kNoRGBGroup = 'rongyuan_k'
export const supportSONIXDev: SupportDevType[] = [
    // {
    //     id: 197,//测试id随便定义
    //     vid: 0x0461,
    //     pid: 0x4002,
    //     usage: 6,
    //     usagePage: 1,
    //     name: 'yzw_test',
    //     displayName: 'test',
    //     support_onboard: 2,
    //     type: 'keyboard',
    //     group: kRGBGroup,
    //     featureReportByteLength: 65,
    //     company: 'rongyuan',
    //     layer: 8,
    //     layout: yzwcommonLayout3
    // },
    {
        id: 427,
        vid: 0x05AC,
        pid: 0x024F,
        usage: 6,
        usagePage: 1,
        name: 'k68_htk663',
        displayName: 'Skyfall Wrls',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'Hator',
        layout: fulingRGBLayout
    },
    {
        id: 562,
        vid: 0x05AC,
        pid: 0x024F,
        usage: 6,
        usagePage: 1,
        name: 'k68_k237',
        displayName: 'FL980V2',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: '腹灵',
        layout: fulingRGBLayout
    },
    {
        id: 64,
        vid: 0x0c45,
        pid: 0x7044,
        usage: 0x01,
        usagePage: 0xff13,
        name: 'k68_m61_2m',
        displayName: 'Hot-swap',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: 'BOYI',
        layout: lightBOYILayout
    },
    // {
    //     id: 60,
    //     vid: 0x0c45,
    //     pid: 0x7044,
    //     usage: 0x01,
    //     usagePage: 0xff13,
    //     name: 'k68_k220',
    //     displayName: 'FL980CPS_normal',
    //     support_onboard: 2,
    //     type: 'keyboard',
    //     group: kRGBGroup,
    //     company: '腹灵',
    //     layout: lightAbtX90Layout
    // },
    {
        id: 59,
        vid: 0x0c45,
        pid: 0x7044,
        usage: 0x01,
        usagePage: 0xff13,
        name: 'k68_hf68',
        displayName: 'HF68',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: 'rongyuan',
        layout: lightHFLayout
    },
    {
        id: 55,
        vid: 0x05AC,
        pid: 0x024F,
        usage: 6,
        usagePage: 1,
        name: 'k68_k223',
        displayName: 'FL1080',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: '腹灵',
        layout: fulingRGBLayout
    },
    {
        id: 45,
        vid: 0x0c45,
        pid: 0x7044,
        usage: 0x01,
        usagePage: 0xff13,
        name: 'k68_pro',
        displayName: '雷神KC3068',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: '雷神',
        layout: rongyuanRGBLayout,
    },
    {
        id: 43,
        vid: 0x0c45,
        pid: 0x7044,
        usage: 0x01,
        usagePage: 0xff13,
        name: 'k68_mk1',
        displayName: 'SK1',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: '泰亿SK1',
        layout: rongyuanMusicNoPicValueLayout
    },
    {
        id: 40,
        vid: 0x0C45,
        pid: 0x7044,
        usage: 0x01,
        usagePage: 0xff13,
        name: 'k68_magnet',
        displayName: 'MAGNET',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: '星际堡垒',
        layout: rongyuanRGBLayout4,
        layer: 3,
    },
    {
        id: 38,
        vid: 0x0c45,
        pid: 0x7044,
        usage: 0x01,
        usagePage: 0xff13,
        name: 'k68_g68',
        displayName: 'G68',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: '韬迪',
        layout: lightTaoDiLayout,
    },
    {
        id: 35,
        vid: 0x05AC,
        pid: 0x024F,
        usage: 6,
        usagePage: 1,
        name: 'k68_k669',
        displayName: 'FL870',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: '腹灵',
        layout: fulingRGBLayout
    },
    {
        id: 31,
        vid: 0x0c45,
        pid: 0x7044,
        usage: 0x01,
        usagePage: 0xff13,
        name: 'k68_kg008',
        displayName: 'EK387W',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: '微技',
        layout: rongyuanRGBLayout
    },
    {
        id: 29,
        vid: 0x0c45,
        pid: 0x7044,
        usage: 0x01,
        usagePage: 0xff13,
        name: 'k68_x90_3m',
        displayName: 'X90三模',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: '阿比特',
        layout: lightAbtX90Layout
    },
    {
        id: 27,
        vid: 0x0c45,
        pid: 0x7044,
        usage: 0x01,
        usagePage: 0xff13,
        name: 'k68_k84_2m',
        displayName: '狂麟0824',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: 'EdraVietnam',
        layout: rongyuanRGBLayout
    },
    {
        id: 26,
        vid: 0x05AC,
        pid: 0x024F,
        usage: 6,
        usagePage: 1,
        name: 'k68_sk1',
        displayName: 'SK1',
        support_onboard: 3,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: '比乐',
        layout: rongyuanSK1RGBLayout
    },
    {
        id: 25,
        vid: 0x05AC,
        pid: 0x024F,
        usage: 6,
        usagePage: 1,
        name: 'k68_k220',
        displayName: 'FL980CPM',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: '腹灵',
        layout: fulingRGBLayout
    },
    {
        id: 24,
        vid: 0x0c45,
        pid: 0x7044,
        usage: 0x01,
        usagePage: 0xff13,
        name: 'k68_kb61',
        displayName: '跬步61',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: '跬步',
        layout: rongyuanRGBLayoutKB
    },
    {
        id: 23,
        vid: 0x0c45,
        pid: 0x7044,
        usage: 0x01,
        usagePage: 0xff13,
        name: 'k68_vl96',
        displayName: '狂麟VL96',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: 'rongyuan',
        layout: rongyuanRGBLayout
    },
    {
        id: 22,
        vid: 0x0c45,
        pid: 0x7044,
        usage: 0x01,
        usagePage: 0xff13,
        name: 'k68_voyager68',
        displayName: 'VOYAGER68',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: '泰亿',
        layout: rongyuanRGBLayout
    },
    {
        id: 19,
        vid: 0x05AC,
        pid: 0x024F,
        usage: 6,
        usagePage: 1,
        name: 'k68_tk568',
        displayName: 'TK568',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'rongyuan',
        layout: rongyuanRGBLayout2
    },
    {
        id: 17,
        vid: 0x05AC,
        pid: 0x024F,
        usage: 6,
        usagePage: 1,
        name: 'k68_hyekyu',
        displayName: 'HYEKYU',
        support_onboard: 2,
        type: 'keyboard',
        group: kNoRGBGroup,
        featureReportByteLength: 65,
        company: 'HYEKYU',
        layout: rongyuanNoRGBLayout2
    },
    {
        id: 13,
        vid: 0x05AC,
        pid: 0x024F,
        usage: 6,
        usagePage: 1,
        name: 'k68_k219',
        displayName: 'FL680',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: '腹灵',
        layout: fulingRGBLayout
    },
    {
        id: 11,
        vid: 0x0c45,
        pid: 0x7044,
        usage: 0x01,
        usagePage: 0xff13,
        name: 'k68_kl68_dm',
        displayName: 'VX6',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: 'vortexSeries',
        layout: rongyuanRGBLayout
    },
    {
        id: 10,
        vid: 0x0C45,
        pid: 0x7044,
        usage: 0x01,
        usagePage: 0xff13,
        name: 'k68_lp87',
        displayName: 'LP87',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: 'rongyuan',
        layout: rongyuanRGBLayout
    },
    {
        id: 9,
        vid: 0x0c45,
        pid: 0x7044,
        usage: 0x01,
        usagePage: 0xff13,
        name: 'k68_k84_dm',
        displayName: 'EK384',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: 'EdraVietnam',
        layout: rongyuanRGBLayout
    },
    {
        id: 8,
        vid: 0x0c45,
        pid: 0x7044,
        usage: 0x01,
        usagePage: 0xff13,
        name: 'k68_kl',
        displayName: '狂麟68',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: '狂麟',
        layout: rongyuanRGBLayout
    },
    {
        id: 7,
        vid: 0x0c45,
        pid: 0x7044,
        usage: 0x01,
        usagePage: 0xff13,
        name: 'k68_mhx',
        displayName: 'DAGK 6064',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: 'DAGK',
        layout: lightmhxLayout
    },
    {
        id: 6,
        vid: 0x05AC,
        pid: 0x024F,
        usage: 6,
        usagePage: 1,
        name: 'k68_k217',
        displayName: 'CMK87',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: '腹灵',
        layout: fulingRGBLayout
    },
    {
        id: 5,
        vid: 0x0c45,
        pid: 0x7044,
        usage: 0x01,
        usagePage: 0xff13,
        name: 'k68_k84',
        displayName: '狂麟0824',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: 'rongyuan',
        layout: rongyuanMusicLayout
    },
    {
        id: 4,
        vid: 0x0c45,
        pid: 0x7044,
        usage: 0x01,
        usagePage: 0xff13,
        name: 'k68_elite_pro',
        displayName: 'Elite Pro',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: 'Elite',
        layout: rongyuanRGBLayout
    },
    {
        id: 3,
        vid: 0x0c45,
        pid: 0x7044,
        usage: 0x01,
        usagePage: 0xff13,
        name: 'k68_elite',
        displayName: 'Elite',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: 'Elite',
        layout: rongyuanRGBLayout
    },
    {
        id: 2,
        vid: 0x0c45,
        pid: 0x7044,
        usage: 0x01,
        usagePage: 0xff13,
        name: 'k68',
        displayName: '雷神KC3068',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: '雷神',
        layout: rongyuanRGBLayout,
    },
    {
        id: 1,//05AC  024F
        vid: 0x05ac,
        pid: 0x024F,
        usage: 6,
        usagePage: 1,
        name: 'dk2017',
        support_onboard: 2,
        type: 'keyboard',
        group: kNoRGBGroup,
        layout: rongyuanNoRGBLayout,
        featureReportByteLength: 65,
        company: 'rongyuan',
    },
    {
        // id: 65535,
        id: -1,
        vid: 0x0c45,
        pid: 0x7d12,
        name: 'ry108',
        displayName: 'ROYUAN108',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        company: 'rongyuan',
        layout: commonLayout,
        usage: 6,
        usagePage: 1,
        featureReportByteLength: 65,
    },
    // {
    //     id: -1,
    //     vid: 0x24ae,
    //     pid: 0x2013,
    //     usage: 14,
    //     usagePage: 65280,
    //     name: 'test_dj',
    //     displayName: '测试iphone',
    //     support_onboard: 2,
    //     type: 'keyboard',
    //     group: 'rongyuan_m',
    //     company: 'rongyuan',
    //     layout: {
    //         dpi: {
    //             count: 7,
    //             max: 1000,
    //             min: 0,
    //             delt: 10,
    //         },
    //         ...rongyuanRGBLayout
    //     }
    // },


    // {
    //     id: -3,
    //     vid: 0x25A7,
    //     pid: 0x2456,
    //     usage: 6,
    //     usagePage: 1,
    //     name: '小潘鼠标',
    //     support_onboard: 0,
    //     type: 'mouse',
    //     group: 'rongyuan_m',
    //     company: 'rongyuan',
    //     layout: {
    //         dpi: {
    //             count: 7,
    //             max: 1000,
    //             min: 0,
    //             delt: 10,
    //         },
    //         ...rongyuanRGBLayout
    //     }
    // },
]


export const supportDev: SupportDevType[] = [
    ...supportSONIXDev,
    ...supportYZWDev,
    ...supportYC200Dev,
    ...supportBK100Dev,
    ...supportYC400Dev,
    ...supportYC500Dev,
]