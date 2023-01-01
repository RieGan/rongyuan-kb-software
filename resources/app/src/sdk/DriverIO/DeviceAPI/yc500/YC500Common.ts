// import { numToRgb } from "../unitys/rgbNum";
import { numToRgb } from "../../../../unitys/rgbNum";
import { arrTo16, numToByte4, specialFunTablectionArr, specialFunTablectionMap } from "../../../../res/映射";
import { MouseKey } from "../DeviceInterface";
import { YC200Common } from "../yc200/YC200Common";
import { mobxStore } from "../../../../mobxStore/store";
import { res } from "../../../../res";
import { sleep } from "../../../../unitys/timeFunc";
import { equals } from "ramda";

export class YC500Common extends YC200Common {
    FEA_CMD_SET_KEYMATRIX_SIMPLE = 0x13
    FEA_CMD_GET_KEYMATRIX_SIMPLE = 0x93
    FEA_CMD_SET_USERPIC_SIMPLE = 0x14
    FEA_CMD_GET_USERPIC_SIMPLE = 0x94
    FEA_CMD_SET_FN_SIMPLE = 0x15
    FEA_CMD_GET_FN_SIMPLE = 0x95
    FEA_CMD_SET_MACRO_SIMPLE = 0x16
    FEA_CMD_GET_MACRO_SIMPLE = 0x96
    FEA_CMD_SET_CMD_AUTOOSEN = 0x17
    FEA_CMD_GET_CMD_AUTOOSEN = 0x97

    MACROMAX = 50
    setAutoOsen = async (auto: boolean) => {
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_SET_CMD_AUTOOSEN
        b[1] = auto ? 1 : 0

        return await this.writeFeatureCmd(b, 0)
    }

    getAutoOsen = async () => {
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_GET_CMD_AUTOOSEN

        const res = await this.commomFeature(b, 0)
        if (res === undefined) return false
        return Boolean(res[1])
    }

    setKeyConfigSimple = async (config: ConfigValue) => {
        // common key
        this.isFn = false
        const keyIndex = this.findIndexInDefaultMatrix(config.original, config.index)
        if (keyIndex === undefined) return false

        const changeArr = await this.configToChangeArr(config)
        if (changeArr === undefined) return false

        const b = Buffer.alloc(64);
        b[0] = this.FEA_CMD_SET_KEYMATRIX_SIMPLE;
        b[1] = this.currentProfile ? this.currentProfile : 0;

        b[2] = keyIndex;

        b[8] = changeArr[0]
        b[9] = changeArr[1]
        b[10] = changeArr[2]
        b[11] = changeArr[3]

        const currentKeyIndex = this.findCurrentIndexInDefaultMatrix(config.original, config.index)
        if (currentKeyIndex !== undefined && this.reComData.matrix !== undefined) {
            for (let i = 0; i < changeArr.length; i++) {
                this.reComData.matrix[currentKeyIndex + i] = changeArr[i]
            }
        }

        return await this.writeFeatureCmd(b, 0)
    }

    setFnKeyConfigSimple = async (config: ConfigValue, fnindex: number) => {
        this.isFn = true
        const keyIndex = this.findIndexInDefaultMatrix(config.original, config.index)
        if (keyIndex === undefined) return false

        const changeArr = await this.configToChangeArr(config)
        if (changeArr === undefined) return false

        const b = Buffer.alloc(64);
        b[0] = this.FEA_CMD_SET_FN_SIMPLE;
        b[1] = fnindex;

        b[2] = keyIndex;

        b[8] = changeArr[0]
        b[9] = changeArr[1]
        b[10] = changeArr[2]
        b[11] = changeArr[3]
        const currentKeyIndex = this.findCurrentIndexInDefaultMatrix(config.original, config.index)
        if (currentKeyIndex !== undefined && this.reFnData.matrix !== undefined) {
            for (let i = 0; i < changeArr.length; i++) {
                this.reFnData.matrix[currentKeyIndex + i] = changeArr[i]
            }
        }

        return await this.writeFeatureCmd(b, 0)
    }

    protected _setMacro = async (buf: Buffer, index: number) => {

        const b = Buffer.alloc(8)
        b[0] = this.FEA_CMD_SET_MACRO_SIMPLE
        b[1] = index

        let page = 0;
        for (let i = 0; i < 5; i++) {
            let ms = [...buf.slice(i * 56, 56 + i * 56)]
            if (ms.some(v => v !== 0)) {
                page++;
            }
        }

        for (let i = 0; i < page; i++) {
            b[2] = i
            b[3] = 56
            b[4] = i === page - 1 ? 1 : 0

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

    private configToChangeArr = async (config: ConfigValue, type?: boolean) => {
        if (this.allLayerConfigs === undefined) {
            this.allLayerConfigs = await this.getAllLayerMacros()
        }

        const canUseMacroIndexs = new Array<number>()
        const index = this.allLayerConfigs.findIndex(v => {
            const profile = this.currentProfile ? this.currentProfile : 0
            if (equals(v.macro.original, config.original)
                && equals(v.isFn, this.isFn)
                && equals(profile, v.profile)) {
                return true
            }
            return false
        })
        if (index !== -1) {
            this.allLayerConfigs.splice(index, 1)
        }
        const ams = this.allLayerConfigs
        for (let i = 0; i < ams.length; i++) {
            const macro = ams[i].macro
            if (macro.macroIndex === undefined) continue;
            if (macro.macroIndex > this.MACROMAX) continue;
            canUseMacroIndexs.push(macro.macroIndex)
        }

        if (config.type === 'ConfigMacro' && canUseMacroIndexs.length >= this.MACROMAX) {
            mobxStore.toastStore.setErr(res.text.宏最多写入50条())
            return
        }

        let changeArr = [0, 0, 0, 0]

        switch (config.type) {
            case 'forbidden':
                changeArr = [0, 0, 0, 0]
                break
            case 'combo':
                // 特殊按键恢复默认
                if (specialFunTablectionArr.findIndex(v => arrTo16(v) === config.original && arrTo16(v) === config.key) === -1) {
                    changeArr = [0, skeyToHidTable[config.skey], config.key, config.key2]
                } else {
                    changeArr = [...numToByte4(config.key)]
                }
                break
            case 'ConfigChangeToMouseBtn':
                if (mouseKeyTable[config.key] !== undefined)
                    changeArr = [...mouseKeyTable[config.key]]
                break
            case 'ConfigFunction':
                changeArr = [...specialFunTablectionMap[config.key]]
                break
            case 'ConfigUnknown':
                changeArr = [...config.value]
                break
            case 'ConfigMacro':
                let mt: number
                switch (config.macroType) {
                    case 'repeat_times':
                        mt = 0
                        break
                    case 'touch_repeat':
                        mt = 2
                        break
                    case 'on_off':
                        mt = 1
                        break
                    default:
                        mt = 0
                        break
                }

                let i = 0;
                while (i >= this.MACROMAX || changeArr[0] !== 0x09) {
                    if (canUseMacroIndexs.some(v => v === i)) {
                        i++
                    } else {
                        const profile = this.currentProfile ? this.currentProfile : 0
                        changeArr = [9, mt, i, 0]
                        this.allLayerConfigs.push({
                            isFn: this.isFn,
                            profile: this.isFn ? this.fnIndex : profile,
                            macro: config
                        })
                        config.macroIndex = i
                        if (!(await this.setMacro(config, i)))
                            throw Error('写入宏失败')
                    }
                }
                break
            default:
                changeArr = [0, 0, 0, 0]
                break
        }

        return changeArr
    }

    configsToMatrix = async (configs: ConfigValue[]) => {
        const profile = this.currentProfile === undefined ? 0 : this.currentProfile
        const macros = [...(configs.filter((v) => v.type === 'ConfigMacro') as ConfigMacro[])]
        configs.map(v => {
            v.type === 'ConfigMacro' && (v.macroIndex = undefined)
        })

        if (macros.length > this.MACROMAX && configs[configs.length - 1].type === 'ConfigMacro') {
            // throw Error('宏最多写入20条')
            mobxStore.toastStore.setErr(res.text.宏最多写入50条())
            return
        }

        if (this.allLayerConfigs !== undefined) {
            let index = this.allLayerConfigs.findIndex(v =>
                v.isFn === this.isFn
                && (this.isFn ? v.profile === this.fnIndex : v.profile === profile)
                && !macros.some(mv => equals(v.macro.index, mv.index)
                    && equals(v.macro.macro, mv.macro)
                    && equals(v.macro.macroType, mv.macroType)
                    && equals(v.macro.original, mv.original)
                    && equals(v.macro.repeatCount, mv.repeatCount)
                    && equals(v.macro.type, mv.type)))
            while (index !== -1) {
                this.allLayerConfigs.splice(index, 1)
                index = this.allLayerConfigs.findIndex(v =>
                    v.isFn === this.isFn
                    && (this.isFn ? v.profile === this.fnIndex : v.profile === profile)
                    && !macros.some(mv => equals(v.macro.index, mv.index)
                        && equals(v.macro.macro, mv.macro)
                        && equals(v.macro.macroType, mv.macroType)
                        && equals(v.macro.original, mv.original)
                        && equals(v.macro.repeatCount, mv.repeatCount)
                        && equals(v.macro.type, mv.type)))
            }
        }
        const canUseMacroIndexs = new Array<number>()
        if (this.allLayerConfigs === undefined) {
            this.allLayerConfigs = await this.getAllLayerMacros()
        }

        console.error("ALLLAYERCONGIGS: ", this.allLayerConfigs.map(v => ({
            isFn: v.isFn,
            profile: v.profile,
            macro: v.macro
        })));

        const ams = [...this.allLayerConfigs]
        if (macros.length > 0) {
            for (let i = 0; i < ams.length; i++) {
                const macro = ams[i].macro
                if (macro.macroIndex === undefined) continue;
                if (macro.macroIndex > this.MACROMAX) continue;
                canUseMacroIndexs.push(macro.macroIndex)
            }
        }

        for (let i = 0; i < macros.length; i++) {
            const macro = macros[i]

            if (!ams.some(av => av.isFn === this.isFn && (this.isFn ? av.profile === this.fnIndex : av.profile === profile) && (equals(av.macro.index, macro.index)
                && equals(av.macro.macro, macro.macro)
                && equals(av.macro.macroType, macro.macroType)
                && equals(av.macro.original, macro.original)
                && equals(av.macro.repeatCount, macro.repeatCount)
                && equals(av.macro.type, macro.type))
            )) {
                ams.push({
                    isFn: this.isFn,
                    profile: this.isFn ? this.fnIndex : profile,
                    macro: macro
                })
            }
        }

        if (ams.length > this.MACROMAX) {
            mobxStore.toastStore.setErr(res.text.宏最多写入50条())
            return
        }

        const allChangeArr: {
            changeArr: number[],
            orginHid: number,
            index?: number
        }[] = []
        for (let i = 0; i < configs.length; i++) {
            let changeArr: number[] = [0, 0, 0, 0]
            const config = configs[i]
            switch (config.type) {
                case 'forbidden':
                    changeArr = [0, 0, 0, 0]
                    break
                case 'combo':
                    // 特殊按键恢复默认
                    if (specialFunTablectionArr.findIndex(v => arrTo16(v) === config.original && arrTo16(v) === config.key) === -1) {
                        changeArr = [0, skeyToHidTable[config.skey], config.key, config.key2]
                    } else {
                        changeArr = [...numToByte4(config.key)]
                    }
                    break
                case 'ConfigChangeToMouseBtn':
                    if (mouseKeyTable[config.key] !== undefined)
                        changeArr = [...mouseKeyTable[config.key]]
                    break
                case 'ConfigFunction':
                    changeArr = [...specialFunTablectionMap[config.key]]
                    break
                case 'ConfigUnknown':
                    changeArr = [...config.value]
                    break
                case 'ConfigMacro':
                    let mt: number
                    switch (config.macroType) {
                        case 'repeat_times':
                            mt = 0
                            break
                        case 'touch_repeat':
                            mt = 2
                            break
                        case 'on_off':
                            mt = 1
                            break
                        default:
                            mt = 0
                            break
                    }
                    /**
                     * config里不存在macroIndex  未下载过该宏
                     */
                    if (!this.allLayerConfigs.some(v => v.isFn === this.isFn
                        && (this.isFn ? v.profile === this.fnIndex : v.profile === profile)
                        && (equals(v.macro.index, config.index)
                            && equals(v.macro.macro, config.macro)
                            && equals(v.macro.macroType, config.macroType)
                            && equals(v.macro.original, config.original)
                            && equals(v.macro.repeatCount, config.repeatCount)
                            && equals(v.macro.type, config.type)))) {
                        if (config.macroIndex === undefined) {
                            console.error("MMMM-1111");
                            let index = 0
                            while (index >= this.MACROMAX || changeArr[0] !== 0x09) {
                                if (canUseMacroIndexs.some(v => v === index)) {
                                    index++
                                } else {
                                    canUseMacroIndexs.push(index)
                                    changeArr = [9, mt, index, 0]
                                    config.macroIndex = index
                                    this.allLayerConfigs.push({
                                        isFn: this.isFn,
                                        profile: this.isFn ? this.fnIndex : profile,
                                        macro: config
                                    })
                                    if (!(await this.setMacro(config, index)))
                                        throw Error('写入宏失败')
                                }
                            }
                        }
                    } else {
                        console.error("MMMM-2222");
                        const sameConfig = this.allLayerConfigs.find(v =>
                            equals(v.macro.index, config.index)
                            && equals(v.macro.macro, config.macro)
                            && equals(v.macro.macroType, config.macroType)
                            && equals(v.macro.original, config.original)
                            && equals(v.macro.repeatCount, config.repeatCount)
                            && equals(v.macro.type, config.type))?.macro
                        if (sameConfig !== undefined) {
                            console.error("MMMM-3333");
                            if (sameConfig.macroIndex !== undefined) {
                                console.error("MMMM-4444");
                                changeArr = [9, mt, sameConfig.macroIndex, 0]
                                config.macroIndex = sameConfig.macroIndex
                            }
                        }
                    }

                    console.error("CCCCCAAAAARRRRR: ", changeArr);
                    if (equals(changeArr, [0, 0, 0, 0])) break;
                    // 查询宏的位置
                    const tmp = this.allLayerConfigs?.findIndex(v => (this.isFn ? v.profile === this.fnIndex : v.profile === profile)
                        && v.macro.original === config.original && this.isFn === v.isFn)

                    const tmpConfig: ConfigMacro = {
                        index: config.index,
                        macro: config.macro,
                        macroIndex: config.macroIndex,
                        macroType: config.macroType,
                        original: config.original,
                        repeatCount: config.repeatCount,
                        type: config.type,
                    }
                    if (tmp !== undefined && tmp !== -1 && this.allLayerConfigs) {
                        this.allLayerConfigs[tmp] = {
                            isFn: this.isFn,
                            profile: this.isFn ? this.fnIndex : profile,
                            macro: tmpConfig
                        }
                    } else {
                        this.allLayerConfigs?.push({
                            isFn: this.isFn,
                            profile: this.isFn ? this.fnIndex : profile,
                            macro: tmpConfig
                        })
                    }
                    break
                default:
                    changeArr = [0, 0, 0, 0]
                    break
            }

            allChangeArr.push({
                changeArr: changeArr,
                orginHid: config.original,
                index: config.index
            })
        }

        console.error("ALLLAYERCONGIGS-END: ", this.allLayerConfigs.map(v => ({
            isFn: v.isFn,
            profile: v.profile,
            macro: v.macro
        })));

        const matrix = this.changeAllConfig(allChangeArr)
        console.log('下命令 ! ! ! : ', matrix)
        return matrix
    }

    setLightPicSimple = async (simplePic: UserPicItem, layer?: number) => {
        const keyIndex = this.findIndexInDefaultMatrix(simplePic.hid, simplePic.index)

        if (keyIndex === undefined) return false

        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_SET_USERPIC_SIMPLE
        b[1] = layer ? layer : 0
        b[2] = keyIndex

        const t = numToRgb(simplePic.rgb)
        b[8] = t.r
        b[9] = t.g
        b[10] = t.b

        return await this.writeFeatureCmd(b, 0)
    }

    setMusicFollow = async (arr: Array<number>, flag: number, needfe: boolean = false) => {
        let hanleArr = arr.slice(flag, flag + 32)
        if (this.deviceType.is24 && needfe)
            await this.fe_24_set_next_pack_length(hanleArr.length / 2)

        while (hanleArr.filter(v => v !== 0).length < 5 && flag > 0) {
            flag--
            hanleArr = arr.slice(flag, flag + 32)
        }

        const b = new Array<number>(this.deviceType.is24 || this.deviceType.isblue ? 1 : 8).fill(0)
        b[0] = this.FEA_CMD_SET_AUDIO

        const sendArr = b.concat(...hanleArr)
        let sendBuf = sendArr.concat(new Array(64 - sendArr.length).fill(0))
        // let tmp = sendBuf

        if (this.deviceType.is24 || this.deviceType.isblue) {
            for (var i = 0; i < hanleArr.length / 2; i++) {
                sendBuf[i + 1] = hanleArr[2 * i] | hanleArr[2 * i + 1] << 4;
            }
        }

        let tmp = Buffer.from(sendBuf)

        if (this.deviceType.is24 || this.deviceType.isblue) {
            if (this.deviceType.is24)
                return await this.writeRawFeatureCmd(tmp, 2, 0)
            else {
                sendBuf.splice(0, 0, 0x56, 0x0c)
                tmp = Buffer.from(sendBuf)
                return await this.writeRawFeatureCmd(tmp, 2, 0)
            }
        } else {
            return await this.writeRawFeatureCmd(tmp, 0, 0)
        }
    }

}

const mouseKeyTable: { [key in number]: Array<number> } = {
    [MouseKey.Left]: [0x01, 0x00, 0xf0, 0x00],
    [MouseKey.Right]: [0x01, 0x00, 0xf1, 0x00],
    [MouseKey.Middle]: [0x01, 0x00, 0xf2, 0x00],
    [MouseKey.Forward]: [0x01, 0x00, 0xf3, 0x00],
    [MouseKey.Back]: [0x01, 0x00, 0xf4, 0x00],
    [MouseKey.WheelLeft]: [0x01, 0x00, 0xf5, 0x00],
    [MouseKey.WheelRight]: [0x01, 0x00, 0xf6, 0x00],
    [MouseKey.WheelForward]: [0x01, 0x00, 0xf7, 0x00],
    [MouseKey.WheelBack]: [0x01, 0x00, 0xf8, 0x00],
    [MouseKey.Dpi]: [],
    [MouseKey.Key_1]: [],
    [MouseKey.Key_2]: [],
    [MouseKey.SCROLLUP]: [0x01, 0x00, 0xf5, 0x01],
    [MouseKey.SCROLLDOWN]: [0x01, 0x00, 0xf5, 0xff],
    [MouseKey.XUP]: [0x01, 0x00, 0xf6, 0xfb],
    [MouseKey.XDOWN]: [0x01, 0x00, 0xf6, 0x05],
    [MouseKey.YUP]: [0x01, 0x00, 0xf7, 0xfb],
    [MouseKey.YDOWN]: [0x01, 0x00, 0xf7, 0x05],
}

const skeyToHidTable: { [key in SpecialKey]: number } = {
    none: 0x00,
    alt: 226,
    ctrl: 224,
    shift: 0xe1,
    win: 227,
}