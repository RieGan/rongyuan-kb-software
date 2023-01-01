import React, { Fragment } from 'react'
import { dj } from '../../../dj'
import { useStore } from '../../../mobxStore/store'
import { res } from '../../../res'
import { specialFunTablectionMap } from '../../../res/映射'
import { getDevLayer } from '../../../unitys/getDevLyaer'
const ___allItems: SpecialFuntion[] = [
    // 'Reset',
    'KEYCODE_Bat',
    // 'KBPEOFILE0',
    // 'KBPEOFILE1',
    // 'KBPEOFILE2',
    // 'KBPEOFILE3',
]

export const fnShowItems = {
    // 'Reset': res.string.恢复出厂设置,
    // 'KEYCODE_Bat': res.string.查询电量,
    // 'KBPEOFILE0': res.text.标准层() + '1',
    // 'KBPEOFILE1': res.text.标准层() + '2',
    // 'KBPEOFILE2': res.text.标准层() + '3',
    // 'KBPEOFILE3': res.text.标准层() + '4',
}

export const FnFunction = (p: {
    func: SpecialFuntion | undefined
    setFunc: (func: SpecialFuntion | undefined) => void
    oldValue: ConfigFunction | undefined
    forBidden: boolean
}) => {
    let changedText
    const forBidden = p.forBidden
    if (p.oldValue !== undefined) {
        changedText = fnShowItems[p.oldValue.key as keyof typeof fnShowItems] //p.oldValue.key
    }
    const { deviceStore } = useStore()
    const __items: SpecialFuntion[] = new Array();
    ___allItems.map(v => {
        __items.push(v)
    })

    const layer = getDevLayer(deviceStore.currentDev?.deviceType.id!)

    for (let i = 0; i < layer; i++) {
        const tmp: SpecialFuntion = 'KBPEOFILE' + i
        if (tmp in specialFunTablectionMap)
            __items.push(tmp);
    }
    return (
        <Fragment>
            <dj.Text text={changedText} type={'已修改的按键值'} x={57} y={7} h={36} />

            <dj.List
                w={342}
                h={145}
                x={54}
                y={48}
                itemCount={__items.length}
                scrollToIndex={0}
                itemSize={() => 30}
                renderItem={(i: number) => (
                    <dj.CheckBox2
                        relative
                        key={i}
                        h={32}
                        type={'Normal'}
                        text={fnShowItems[__items[i] as keyof typeof fnShowItems]}
                        checkState={forBidden && p.func === __items[i]}
                        isBool={forBidden}
                        clickHandle={() => {
                            if (forBidden) {
                                if (deviceStore.isFnMode) {
                                    p.func !== __items[i]
                                        ? p.setFunc(__items[i])
                                        : p.setFunc(undefined)
                                }
                            }
                        }}
                    />
                )}
            />
        </Fragment>
    );
};