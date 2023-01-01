//http://hp.vector.co.jp/authors/VA003720/lpproj/others/kbdjpn.htm


/*
arr = [...document.querySelector('table').children[0].children].slice(2).map(
    v => {
        let len = v.children.length
        return {
            'value': v.children[1].innerText,
            'scanCode': Number('0x' +v.children[len - 5].innerText.split(' / ')[0]),
            'hidCode': Number('0x' +v.children[len - 1].innerText),
        }
    }
)

JSON.stringify(arr, null, 4)
*/
const j = [
    {
        'value': '`',
        'scanCode': 41,
        'hidCode': 53,
        'keyCode': 192
    },
    {
        'value': '1',
        'scanCode': 2,
        'hidCode': 30,
        'keyCode': 49
    },
    {
        'value': '2',
        'scanCode': 3,
        'hidCode': 31,
        'keyCode': 50
    },
    {
        'value': '3',
        'scanCode': 4,
        'hidCode': 32,
        'keyCode': 51
    },
    {
        'value': '4',
        'scanCode': 5,
        'hidCode': 33,
        'keyCode': 52
    },
    {
        'value': '5',
        'scanCode': 6,
        'hidCode': 34,
        'keyCode': 53
    },
    {
        'value': '6',
        'scanCode': 7,
        'hidCode': 35,
        'keyCode': 54
    },
    {
        'value': '7',
        'scanCode': 8,
        'hidCode': 36,
        'keyCode': 55
    },
    {
        'value': '8',
        'scanCode': 9,
        'hidCode': 37,
        'keyCode': 56
    },
    {
        'value': '9',
        'scanCode': 10,
        'hidCode': 38,
        'keyCode': 57
    },
    {
        'value': '0',
        'scanCode': 11,
        'hidCode': 39,
        'keyCode': 48
    },
    {
        'value': '-',
        'scanCode': 12,
        'hidCode': 45,
        'keyCode': 189
    },
    {
        'value': '=',
        'scanCode': 13,
        'hidCode': 46,
        'keyCode': 187
    },
    {
        'value': '__¥',
        'scanCode': 125,
        'hidCode': 137,
        'keyCode': null
    },
    {
        'value': 'BackSpace',
        'scanCode': 14,
        'hidCode': 42,
        'keyCode': 8
    },
    {
        'value': 'Tab',
        'scanCode': 15,
        'hidCode': 43,
        'keyCode': 9
    },
    {
        'value': 'Q',
        'scanCode': 16,
        'hidCode': 20,
        'keyCode': 81
    },
    {
        'value': 'W',
        'scanCode': 17,
        'hidCode': 26,
        'keyCode': 87
    },
    {
        'value': 'E',
        'scanCode': 18,
        'hidCode': 8,
        'keyCode': 69
    },
    {
        'value': 'R',
        'scanCode': 19,
        'hidCode': 21,
        'keyCode': 82
    },
    {
        'value': 'T',
        'scanCode': 20,
        'hidCode': 23,
        'keyCode': 84
    },
    {
        'value': 'Y',
        'scanCode': 21,
        'hidCode': 28,
        'keyCode': 89
    },
    {
        'value': 'U',
        'scanCode': 22,
        'hidCode': 24,
        'keyCode': 85
    },
    {
        'value': 'I',
        'scanCode': 23,
        'hidCode': 12,
        'keyCode': 73
    },
    {
        'value': 'O',
        'scanCode': 24,
        'hidCode': 18,
        'keyCode': 79
    },
    {
        'value': 'P',
        'scanCode': 25,
        'hidCode': 19,
        'keyCode': 80
    },
    {
        'value': '[',
        'scanCode': 26,
        'hidCode': 47,
        'keyCode': 219
    },
    {
        'value': ']',
        'scanCode': 27,
        'hidCode': 48,
        'keyCode': 221
    },
    {
        'value': '\\',
        'scanCode': 43,
        'hidCode': 49,
        'keyCode': 220
    },
    {
        'value': 'Caps Lock',
        'scanCode': 58,
        'hidCode': 57,
        'keyCode': 20
    },
    {
        'value': 'A',
        'scanCode': 30,
        'hidCode': 4,
        'keyCode': 65
    },
    {
        'value': 'S',
        'scanCode': 31,
        'hidCode': 22,
        'keyCode': 83
    },
    {
        'value': 'D',
        'scanCode': 32,
        'hidCode': 7,
        'keyCode': 68
    },
    {
        'value': 'F',
        'scanCode': 33,
        'hidCode': 9,
        'keyCode': 70
    },
    {
        'value': 'G',
        'scanCode': 34,
        'hidCode': 10,
        'keyCode': 71
    },
    {
        'value': 'H',
        'scanCode': 35,
        'hidCode': 11,
        'keyCode': 72
    },
    {
        'value': 'J',
        'scanCode': 36,
        'hidCode': 13,
        'keyCode': 74
    },
    {
        'value': 'K',
        'scanCode': 37,
        'hidCode': 14,
        'keyCode': 75
    },
    {
        'value': 'L',
        'scanCode': 38,
        'hidCode': 15,
        'keyCode': 76
    },
    {
        'value': ';',
        'scanCode': 39,
        'hidCode': 51,
        'keyCode': 186
    },
    {
        'value': '\'',
        'scanCode': 40,
        'hidCode': 52,
        'keyCode': 222
    },
    {
        'value': '__]',
        'scanCode': 43,
        'hidCode': 50,
        'keyCode': null
    },
    {
        'value': 'Enter',
        'scanCode': 28,
        'hidCode': 40,
        'keyCode': 13
    },
    {
        'value': 'Shift',
        'scanCode': 42,
        'hidCode': 0xe1,
        'keyCode': 16
    },
    {
        'value': '_\\',
        'scanCode': 86,
        'hidCode': 100,
        'keyCode': null
    },
    {
        'value': 'Z',
        'scanCode': 44,
        'hidCode': 29,
        'keyCode': 90
    },
    {
        'value': 'X',
        'scanCode': 45,
        'hidCode': 27,
        'keyCode': 88
    },
    {
        'value': 'C',
        'scanCode': 46,
        'hidCode': 6,
        'keyCode': 67
    },
    {
        'value': 'V',
        'scanCode': 47,
        'hidCode': 25,
        'keyCode': 86
    },
    {
        'value': 'B',
        'scanCode': 48,
        'hidCode': 5,
        'keyCode': 66
    },
    {
        'value': 'N',
        'scanCode': 49,
        'hidCode': 17,
        'keyCode': 78
    },
    {
        'value': 'M',
        'scanCode': 50,
        'hidCode': 16,
        'keyCode': 77
    },
    {
        'value': ',',
        'scanCode': 51,
        'hidCode': 54,
        'keyCode': 188
    },
    {
        'value': '.',
        'scanCode': 52,
        'hidCode': 55,
        'keyCode': 190
    },
    {
        'value': '/',
        'scanCode': 53,
        'hidCode': 56,
        'keyCode': 191
    },
    {
        'value': '__\\',
        'scanCode': 115,
        'hidCode': 135,
        'keyCode': null
    },
    {
        'value': 'r_Shift',
        'scanCode': 54,
        'hidCode': 229,
        'keyCode': 16
    },
    {
        'value': 'Ctrl',
        'scanCode': 29,
        'hidCode': 224,
        'keyCode': 17
    },
    {
        'value': 'Alt',
        'scanCode': 56,
        'hidCode': 226,
        'keyCode': 18
    },
    {
        'value': '(space)',
        'scanCode': 57,
        'hidCode': 44,
        'keyCode': 32
    },
    {
        'value': 'r_Alt',
        'scanCode': 0xe38,
        'hidCode': 230,
        'keyCode': 18
    },
    {
        'value': 'r_Ctrl',
        'scanCode': 0xe1d,
        'hidCode': 228,
        'keyCode': 17
    },
    {
        'value': 'Insert',
        'scanCode': 0xee52,
        'hidCode': 73,
        'keyCode': 45
    },
    {
        'value': 'Delete',
        'scanCode': 0xee53,
        'hidCode': 76,
        'keyCode': 46
    },
    {
        'value': '←',
        'scanCode': 0xee4B,
        'hidCode': 80,
        'keyCode': 37
    },
    {
        'value': 'Home',
        'scanCode': 0xee47,
        'hidCode': 74,
        'keyCode': 36
    },
    {
        'value': 'End',
        'scanCode': 0xee4f,
        'hidCode': 77,
        'keyCode': 35
    },
    {
        'value': '↑',
        'scanCode': 0xee48,
        'hidCode': 82,
        'keyCode': 38
    },
    {
        'value': '↓',
        'scanCode': 0xee50,
        'hidCode': 81,
        'keyCode': 40
    },
    {
        'value': 'Page\nUp',
        'scanCode': 0xee49,
        'hidCode': 75,
        'keyCode': 33
    },
    {
        'value': 'Page\nDown',
        'scanCode': 0xee51,
        'hidCode': 78,
        'keyCode': 34
    },
    {
        'value': '→',
        'scanCode': 0xee4d,
        'hidCode': 79,
        'keyCode': 39
    },
    {
        'value': 'Num\nLock',
        'scanCode': 69,
        'hidCode': 83,
        'keyCode': 144
    },
    {
        'value': 'num_7',
        'scanCode': 71,
        'hidCode': 95,
        'keyCode': 103
    },
    {
        'value': 'num_Home',
        'scanCode': 3655,
        'hidCode': 0x4A,
        'keyCode': null
    },
    {
        'value': 'num_4',
        'scanCode': 75,
        'hidCode': 92,
        'keyCode': 100
    },
    {
        'value': 'num_←',
        'scanCode': 57419,
        'hidCode': 0x50,
        'keyCode': 37
    },
    {
        'value': 'num_1',
        'scanCode': 79,
        'hidCode': 89,
        'keyCode': 97
    },
    {
        'value': 'num_End',
        'scanCode': 3663,
        'hidCode': 0x4D,
        'keyCode': 0
    },
    {
        'value': 'num_/',
        'scanCode': 0xe35,
        'hidCode': 84,
        'keyCode': 111
    },
    {
        'value': 'num_8',
        'scanCode': 72,
        'hidCode': 96,
        'keyCode': 104
    },
    {
        'value': 'num_↑',
        'scanCode': 57416,
        'hidCode': 0x52,
        'keyCode': 38
    },
    {
        'value': 'num_5',
        'scanCode': 76,
        'hidCode': 93,
        'keyCode': 101
    },
    {
        'value': 'num_2',
        'scanCode': 80,
        'hidCode': 90,
        'keyCode': 98
    },
    {
        'value': 'num_↓',
        'scanCode': 57424,
        'hidCode': 0x51,
        'keyCode': 40
    },
    {
        'value': 'num_0',
        'scanCode': 82,
        'hidCode': 98,
        'keyCode': 96
    },
    {
        'value': 'num_*',
        'scanCode': 55,
        'hidCode': 85,
        'keyCode': 106
    },
    {
        'value': 'num_9',
        'scanCode': 73,
        'hidCode': 97,
        'keyCode': 105
    },
    {
        'value': 'num_Pgup',
        'scanCode': 3657,
        'hidCode': 0x4B,
        'keyCode': 33
    },
    {
        'value': 'num_6',
        'scanCode': 77,
        'hidCode': 94,
        'keyCode': 102
    },
    {
        'value': 'num_→',
        'scanCode': 57421,
        'hidCode': 0x4F,
        'keyCode': 39
    },
    {
        'value': 'num_3',
        'scanCode': 81,
        'hidCode': 91,
        'keyCode': 99
    },
    {
        'value': 'num_Pgdn',
        'scanCode': 3665,
        'hidCode': 0x4E,
        'keyCode': 34
    },
    {
        'value': 'num_.',
        'scanCode': 83,
        'hidCode': 99,
        'keyCode': 110
    },
    {
        'value': 'num_-',
        'scanCode': 74,
        'hidCode': 86,
        'keyCode': 109
    },
    {
        'value': 'num_+',
        'scanCode': 78,
        'hidCode': 87,
        'keyCode': 107
    },
    {
        'value': 'num_Enter',
        'scanCode': 0xe1c,
        'hidCode': 88,
        'keyCode': 13
    },
    {
        'value': 'Esc',
        'scanCode': 1,
        'hidCode': 41,
        'keyCode': 27
    },
    {
        'value': 'F1',
        'scanCode': 59,
        'hidCode': 58,
        'keyCode': 112
    },
    {
        'value': 'F2',
        'scanCode': 60,
        'hidCode': 59,
        'keyCode': 113
    },
    {
        'value': 'F3',
        'scanCode': 61,
        'hidCode': 60,
        'keyCode': 114
    },
    {
        'value': 'F4',
        'scanCode': 62,
        'hidCode': 61,
        'keyCode': 115
    },
    {
        'value': 'F5',
        'scanCode': 63,
        'hidCode': 62,
        'keyCode': 116
    },
    {
        'value': 'F6',
        'scanCode': 64,
        'hidCode': 63,
        'keyCode': 117
    },
    {
        'value': 'F7',
        'scanCode': 65,
        'hidCode': 64,
        'keyCode': 118
    },
    {
        'value': 'F8',
        'scanCode': 66,
        'hidCode': 65,
        'keyCode': 119
    },
    {
        'value': 'F9',
        'scanCode': 67,
        'hidCode': 66,
        'keyCode': 120
    },
    {
        'value': 'F10',
        'scanCode': 68,
        'hidCode': 67,
        'keyCode': 121
    },
    {
        'value': 'F11',
        'scanCode': 87,
        'hidCode': 68,
        'keyCode': 122
    },
    {
        'value': 'F12',
        'scanCode': 88,
        'hidCode': 69,
        'keyCode': 123
    },
    {
        'value': 'Print\nScreen',
        'scanCode': 0xe37,
        'hidCode': 70,
        'keyCode': 44
    },
    {
        'value': 'Scroll\nLock',
        'scanCode': 70,
        'hidCode': 71,
        'keyCode': 145
    },
    {
        'value': 'Pause',
        'scanCode': 3653,
        'hidCode': 72,
        'keyCode': 19
    },
    {
        'value': 'Win',
        'scanCode': 0xe5b,
        'hidCode': 227,
        'keyCode': 91
    },
    {
        'value': 'r_Win',
        'scanCode': 0xe5c,
        'hidCode': 231,
        'keyCode': 92
    },
    {
        'value': '(Application)',
        'scanCode': null,
        'hidCode': 101,
        'keyCode': 93
    },
    {
        'value': '',
        'scanCode': 123,
        'hidCode': 139,
        'keyCode': null
    },
    {
        'value': '',
        'scanCode': 121,
        'hidCode': 138,
        'keyCode': null
    },
    {
        'value': '',
        'scanCode': 112,
        'hidCode': 136,
        'keyCode': null
    },
    {
        'value': 'fn',
        'scanCode': 0,
        'hidCode': 0x0a010000,
        'keyCode': null
    },
    {
        'value': 'Calculator',
        'scanCode': null,
        'hidCode': 0x03009201,
        'keyCode': null
    },
    {
        'value': 'U-',
        'scanCode': null,
        'hidCode': 0x0300ea00,
        'keyCode': null
    },
    {
        'value': 'U+',
        'scanCode': null,
        'hidCode': 0x0300e900,
        'keyCode': null
    },
    {
        'value': 'Mute',
        'scanCode': null,
        'hidCode': 0x0300e200,
        'keyCode': null
    },
    {
        'value': 'Play',
        'scanCode': null,
        'hidCode': 0x0300cd00,
        'keyCode': null
    },
    {
        'value': 'narrow',
        'scanCode': null,
        'hidCode': 0x0000e32d,
        'keyCode': null
    },
    {
        'value': 'enlarge',
        'scanCode': null,
        'hidCode': 0x0000e32e,
        'keyCode': null
    },
    {
        'value': 'Prev',
        'scanCode': null,
        'hidCode': 0x0300b600,
        'keyCode': null
    },
    {
        'value': 'Next',
        'scanCode': null,
        'hidCode': 0x0300b500,
        'keyCode': null
    },
    // {
    //     'value': '{',
    //     'scanCode': null,
    //     'hidCode': 0x00e12f00,
    //     'keyCode': null
    // },
    // {
    //     'value': '}',
    //     'scanCode': null,
    //     'hidCode': 0x00e13000,
    //     'keyCode': null
    // },
    {
        'value': '',
        'scanCode': -1,
        'hidCode': -1,
        'keyCode': null
    },
]

export namespace HidMapping {

    export const keyCodeMapHIDCode = (kc: number | undefined) => {
        if (kc === undefined) return undefined
        const obj = j.find(v => v.keyCode === kc)
        if (obj === undefined) return undefined
        return obj.hidCode;
    }

    export const scanCodeMapHIDCode = (sc: number | undefined) => {
        if (sc === undefined) return undefined
        const obj = j.find(v => v.scanCode === sc)
        if (obj === undefined) return undefined
        //console.log('#######', obj)
        return obj.hidCode
    }

    export const hidCodeMapKeyName = (hid: number) => {
        const obj = j.find(v => v.hidCode === hid)
        if (obj === undefined) return undefined
        return obj.value
    }
}

const specialBasicFnc = {
    // 基础功能
    上一曲: [0x03, 0x00, 0xb6, 0x00],
    下一曲: [0x03, 0x00, 0xb5, 0x00],
    停止: [3, 0, 0xb7, 0],
    '播放/暂停': [3, 0, 0xcd, 0],
    播放器: [3, 0, 0x83, 1],
    火力: [],
    狙击键: [],
    静音: [3, 0, 0xe2, 0],
    音量减: [3, 0, 0xea, 0],
    音量大: [3, 0, 0xe9, 0],
    计算器: [3, 0, 0x92, 1],
    fn: [0x0a, 0x01, 0, 0],
    邮件: [0x03, 0x00, 0x8A, 0x01],
    我的电脑: [0x03, 0x00, 0x94, 0x01],
    搜索: [0x03, 0x00, 0x21, 0x02],
    主页: [0x03, 0x00, 0x23, 0x02],
    亮度减: [0x03, 0x00, 0x70, 0x00],
    亮度加: [0x03, 0x00, 0x6F, 0x00],
    呼出siri: [0x12, 0x00, 0xe3, 0x2c],
}

const specialFncComboKey = {
    // 特殊按键
    '(': [0x00, 0x00, 0xe5, 0x26],
    ')': [0x00, 0x00, 0xe5, 0x27],
    '{': [0x00, 0xe1, 0x2f, 0x00],
    '}': [0x00, 0xe1, 0x30, 0x00],
    切换输入法: [0x00, 0xe0, 0x2c, 0x00],
    缩小: [0x00, 0x00, 0xe3, 0x2d],
    放大: [0x00, 0x00, 0xe3, 0x2e],
    返回: [0x03, 0x00, 0x24, 0x02],
    fn锁屏: [0x0a, 0x0d, 0x00, 0x00],
    锁屏: [0x00, 0x00, 0xe3, 0x0f],
    r_FN: [0x0a, 0x01, 0x01, 0x00],
    '音量<->键盘亮度': [0x0a, 0x0f, 0x00, 0x00],
    '音量<->键盘亮度2': [0x0a, 0x0D, 0x00, 0x00], // 500版本以前 这个键键值不确定
    '音量<->键盘亮度3': [0x0a, 0x0e, 0x00, 0x00], //500版本
    刷新: [0x03, 0x00, 0x27, 0x02],
    // 切灯: [0x0d, 0x01, 0x00, 0x00]
}

export const specialFunTablectionMap = Object.assign(specialBasicFnc, specialFncComboKey)
export const specialFunTablectionArr = Object.values(specialFunTablectionMap)
export const arrTo16 = (arr: number[]) => {
    let tmpNum: number = 0
    if (arr.length === 4) {
        tmpNum = arr[0] << 24 | arr[1] << 16 | arr[2] << 8 | arr[3]
    }
    return tmpNum;
}

export const numToByte4 = (num: number) => {
    if (num > 0xffffffff) return [0, 0, 0, 0]
    else return [(num & 0xffffffff) >> 24, (num & 0xffffff) >> 16, (num & 0xffff) >> 8, num & 0xff]
}

export const macChange = (name: string) => {
    if (process.platform === 'darwin') {
        name = name.toLowerCase().indexOf('ctrl') !== -1 ? name.replace(/ctrl/gi, 'Control') : name
        name = name.toLowerCase().indexOf('alt') !== -1 ? name.replace(/alt/gi, 'Option') : name
        name = name.toLowerCase().indexOf('win') !== -1 ? name.replace(/win/gi, 'Command') : name
    }
    return name
    // switch (name.toLowerCase()) {
    //     case 'ctrl':
    //         return 'control'
    //     case 'alt':
    //         return 'option'
    //     case 'win':
    //         return 'command'
    //     case 'r_alt':
    //         return 'r_option'
    //     case 'r_ctrl':
    //         return 'r_control'
    //     case 'r_win':
    //         return 'r_command'
    //     default:
    //         return name
    // }
}

export const getKeyboradList = () => {
    const arr = new Array()
    const tmp = specialFunTablectionArr.map(v => {
        return arrTo16(v)
    })


    for (var i = 0; i < j.length; i++) {
        if (
            tmp.findIndex(v => v === j[i].hidCode) === -1
            && j[i].value !== ''
            && j[i].hidCode !== 137 //__¥
            && j[i].hidCode !== 50  //__]
            && j[i].hidCode !== 135 //__\\
            && j[i].hidCode !== 100 //_\\
        ) arr.push(j[i])
    }

    return arr
}


// export const specialBanKey = {
//     'LEDONOFF': [0x0A, 0x09, 0x00, 0x00],
//     'LED on/off': [0x0D, 0x00, 0x00, 0x00],
//     'Effect Loop': [0x0D, 0x01, 0x00, 0x00],
//     'Effect Inc': [0x0D, 0x01, 0x01, 0x00],
//     'Effect Dec': [0x0D, 0x01, 0x02, 0x00],
//     'Brightness Loop': [0x0D, 0x02, 0x00, 0x00],
//     'Brightness Inc': [0x0D, 0x02, 0x01, 0x00],
//     'Brightness Dec': [0x0D, 0x02, 0x02, 0x00],
//     'Speed Loop': [0x0D, 0x03, 0x00, 0x00],
//     'Speed Inc': [0x0D, 0x03, 0x01, 0x00],
//     'Speed Dec': [0x0D, 0x03, 0x02, 0x00],
//     'Direction Loop': [0x0D, 0x05, 0x00, 0x00],
//     'Direction Inc': [0x0D, 0x05, 0x00, 0x01],
//     'Direction Dec': [0x0D, 0x05, 0x00, 0x02],
//     'Color Loop': [0x0D, 0x05, 0x00, 0x00],
//     'Color Inc': [0x0D, 0x05, 0x01, 0x00],
//     'Color Dec': [0x0D, 0x05, 0x02, 0x00],
//     'Color Value': [0x0D, 0x05, 0x03, 0x00],
//     'MAC': [0x0A, 0x05, 0x01, 0x00],
//     'WIN': [0x0A, 0x05, 0x00, 0x00],
//     'WINLOCK': [0x0A, 0x03, 0x00, 0x00],
//     'Effect Loop0': [0x0D, 0x01, 0x04, 0x00],
//     'Effect Loop1': [0x0D, 0x01, 0x05, 0x00],
//     'Effect Loop2': [0x0D, 0x01, 0x06, 0x00],
//     'Effect Loop3': [0x0D, 0x01, 0x07, 0x00],
//     'Effect Loop4': [0x0D, 0x01, 0x08, 0x00],
//     'Effect Loop5': [0x0D, 0x01, 0x09, 0x00],
//     '24G': [0x0E, 0x00, 0x00, 0x00],
//     'BLUETOOTH1': [0x0E, 0x00, 0x01, 0x00],
//     'BLUETOOTH2': [0x0E, 0x00, 0x02, 0x00],
//     'BLUETOOTH3': [0x0E, 0x00, 0x03, 0x00],
//     'WIRD': [0x0E, 0x00, 0x04, 0x00],
//     'LightnessInc': [0x03, 0x00, 0x6F, 0x00],
//     'LightnessDec': [0x03, 0x00, 0x70, 0x00],
//     'OPEN MISSION(MAC)': [0x00, 0x00, 0xE0, 0x52],
//     'OPEN SIRI(MAC)': [0x12, 0x00, 0xE3, 0X2C],
//     '2.4G PAIR': [0x0e, 0x01, 0x00, 0x00],
//     'LEDMODESET': [0x0D, 0x01, 0x03, 0x01],
//     'WASD': [0x0A, 0x0A, 0x00, 0x00],
//     'RCTRL_APP': [0x0A, 0x0C, 0x00, 0x00],
//     'User Pic1': [0x0D, 0x06, 0x00, 0x00],
//     'User Pic2': [0x0D, 0x06, 0x01, 0x00],
//     'User Pic3': [0x0D, 0x06, 0x02, 0x00],
//     'User Pic4': [0x0D, 0x06, 0x03, 0x00],
//     'User RecordON': [0x0D, 0x06, 0x80, 0x00],
// }