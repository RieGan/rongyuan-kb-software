import { lightK401tLayout } from "./res/lightLayout/lightK401tLayout"
import { lightYC200NJ80MacLayout } from "./res/lightLayout/lightNJ80layout"
import { yc200CommonLayout, yc200CommonLayoutThree } from "./res/lightLayout/yc200CommonLayout"
import { yzwcommonLayout2 } from "./res/lightLayout/yzwcommonLayout"
import { OtherKeydous, yc200LEDOtherH32, yc200Other } from "./res/otherSetting/yc200Other"
import { SupportDevType } from "./supportDev"

const kRGBGroup = 'rongyuan_k_rgb'
export const supportYC400Dev: SupportDevType[] = [
    {
        id: -2147482959,
        vid: 0x25a7,
        pid: 0x2422,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc400_nj68',
        displayName: 'nj68 WAP',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'Keydous',
        layout: process.platform === 'darwin' ? lightYC200NJ80MacLayout : yc200CommonLayout,
        fnLayer: 1,
        otherSetting: OtherKeydous
    },
    {
        id: 689,
        vid: 0x3151,
        pid: 0x4007,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc400_nj68',
        displayName: 'nj68 AP',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'Keydous',
        layout: process.platform === 'darwin' ? lightYC200NJ80MacLayout : yc200CommonLayout,
        fnLayer: 1,
        otherSetting: OtherKeydous
    },
    {
        id: 646,
        vid: 0x3151,
        pid: 0x4007,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc400_k403t_uk',
        displayName: 'keyboard3',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'ZONwirelesskeyboard',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: -2147483002,
        vid: 0x25a7,
        pid: 0x2422,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc400_k403t_uk',
        displayName: 'keyboard3',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'ZONwirelesskeyboard',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: 645,
        vid: 0x3151,
        pid: 0x4007,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc400_k401t_uk',
        displayName: 'keyboard4',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'ZONwirelesskeyboard',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: -2147483003,
        vid: 0x25a7,
        pid: 0x2422,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc400_k401t_uk',
        displayName: 'keyboard4',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'ZONwirelesskeyboard',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: 635,
        vid: 0x3151,
        pid: 0x4007,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc400_a84',
        displayName: 'A84',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'ATYT',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: -2147483013,
        vid: 0x25a7,
        pid: 0x2422,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc400_a84',
        displayName: 'A84',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'ATYT',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: 634,
        vid: 0x3151,
        pid: 0x4007,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc400_y98',
        displayName: 'Y98',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'ROYALAXE',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: -2147483014,
        vid: 0x25a7,
        pid: 0x2422,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc400_y98',
        displayName: 'Y98',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'ROYALAXE',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: 631,
        vid: 0x3151,
        pid: 0x4007,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc400_y87',
        displayName: 'Y87',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'ROYALAXE',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: -2147483017,
        vid: 0x25a7,
        pid: 0x2422,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc400_y87',
        displayName: 'Y87',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'ROYALAXE',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: 629,
        vid: 0x3151,
        pid: 0x4007,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc200_nj80',
        displayName: 'nj80 AP',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'Keydous',
        layout: process.platform === 'darwin' ? lightYC200NJ80MacLayout : yc200CommonLayout,
        fnLayer: 1,
        otherSetting: OtherKeydous
    },
    {
        id: -2147483019,
        vid: 0x25a7,
        pid: 0x2422,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc200_nj80',
        displayName: 'nj80 AP',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'Keydous',
        layout: process.platform === 'darwin' ? lightYC200NJ80MacLayout : yc200CommonLayout,
        fnLayer: 1,
        otherSetting: OtherKeydous
    },
    {
        id: 612,
        vid: 0x3151,
        pid: 0x4007,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yzw_dk67',
        displayName: 'DK67',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'OUSAID',
        layout: yzwcommonLayout2,
        layer: 1
    },
    {
        id: 605,
        vid: 0x3151,
        pid: 0x4007,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc400_dk67_langao3',
        displayName: 'DK67Pro',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'OUSAID',
        layout: yc200CommonLayoutThree,
        fnLayer: 1,
        layer: 4,
        otherSetting: yc200Other,
    },
    {
        id: -2147483043,
        vid: 0x25a7,
        pid: 0x2422,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc400_dk67_langao3',
        displayName: 'DK67Pro',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'OUSAID',
        layout: yc200CommonLayoutThree,
        fnLayer: 1,
        layer: 4,
        otherSetting: yc200Other,
    },
    {
        id: 600,
        vid: 0x3151,
        pid: 0x4007,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc300_r87',
        displayName: 'ROYALAXE R87',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'ROYALAXE',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: -2147483048,
        vid: 0x25a7,
        pid: 0x2422,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc300_r87',
        displayName: 'ROYALAXE R87',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'ROYALAXE',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: 599,
        vid: 0x3151,
        pid: 0x4007,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc300_y68',
        displayName: 'ROYALAXE Y68',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'ROYALAXE',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: -2147483049,
        vid: 0x25a7,
        pid: 0x2422,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc300_y68',
        displayName: 'ROYALAXE Y68',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'ROYALAXE',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: -2147483082,
        vid: 0x25a7,
        pid: 0x2422,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc400_p98',
        displayName: 'P98',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: '虎八兔',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: 566,
        vid: 0x3151,
        pid: 0x4007,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc400_p98',
        displayName: 'P98',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: '虎八兔',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: -2147483083,
        vid: 0x25a7,
        pid: 0x2422,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc300_k401t',
        displayName: 'K401T',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'DASFUDE',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: 565,
        vid: 0x3151,
        pid: 0x4007,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc300_k401t',
        displayName: 'K401T',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'DASFUDE',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: 557,
        vid: 0x3151,
        pid: 0x4007,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc300_k402t',
        displayName: 'R100',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'ROYALAXE',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: -2147483091,
        vid: 0x25a7,
        pid: 0x2422,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc300_k402t',
        displayName: 'R100',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'ROYALAXE',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: 556,
        vid: 0x3151,
        pid: 0x4007,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc200_k401t',
        displayName: 'R68',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'ROYALAXE',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: -2147483092,
        vid: 0x25a7,
        pid: 0x2422,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc200_k401t',
        displayName: 'R68',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'ROYALAXE',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
    {
        id: 554,
        vid: 0x3151,
        pid: 0x4007,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc300_k403t',
        displayName: 'R108',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'ROYALAXE',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },

    {
        id: -2147483094,
        vid: 0x25a7,
        pid: 0x2422,
        usage: 0x02,
        usagePage: 0xffff,
        name: 'yc300_k403t',
        displayName: 'R108',
        support_onboard: 2,
        type: 'keyboard',
        group: kRGBGroup,
        featureReportByteLength: 65,
        company: 'ROYALAXE',
        layout: lightK401tLayout,
        layer: 3,
        fnLayer: 1,
        otherSetting: yc200Other,
    },
]