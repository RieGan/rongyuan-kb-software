import React, { Fragment, useState } from 'react'
import { dj, dj2 } from '../../../../dj'
import { res } from '../../../../res'

import { LightRange } from '../../../utils/LightRange'
import {
    withProps,
    LightProp,
    wheelLightLEDData,
} from '../../../utils/WithProps'
import { DeviceStore } from '../../../../mobxStore/deviceStore'

import { mobxStore, useStore } from '../../../../mobxStore/store'
import { useObserver } from 'mobx-react-lite'
import { getKeyPath } from '../../keyPath'
import { sleep } from '../../../../unitys/timeFunc'
import { getLightRgb, lightCurrentLayout, modeKeyChange, PopColorPicker } from './Light'
import { blockCloud } from '../../../../appConfig'
import { KeyboardRange } from '../../../utils/KeyboardRange'
import { OutsideAlerter } from '../../../utils/OutsideAlerter'






const LEDLight = (p: LightProp) => {
    const onModeChange = (name: string) => modeKeyChange(p, name)
    const layout = lightCurrentLayout(p)

    const [popUp, setPopUp] = useState(false)

    const isLayoutRgbExit = p.lightLayout.isRgb && layout.rgb
    const isLayoutDazzleExit = p.lightLayout.isRgb && layout.dazzle

    const color = isLayoutRgbExit ? getLightRgb(p.light) : { r: 0, g: 0, b: 0 }

    const setColor = (rgb: number) => {
        isLayoutRgbExit && 'rgb' in p.light && p.setLight({ ...p.light, rgb: rgb, dazzle: false })
    }
    const { isKeyStore } = useStore()
    const { lightPageStore } = useStore()
    isKeyStore.setColorPickerKey(popUp)
    // console.error('KKKKKKEEEEEEYYYYYY',isKeyStore.lightKey && isKeyStore.colorPickerKey && isKeyStore.loginTipBoxKey);

    document.onkeydown = () => {
        if (isKeyStore.lightKey && !isKeyStore.colorPickerKey && !isKeyStore.loginTipBoxKey && lightPageStore.pageIndex !== 2) {
            if (isKeyStore.isShare) {
                return true
            }
            //console.error('无法输入');
            return false
        }
        else {
            // console.error('输入ing');
            return true
        }
    }

    const { deviceStore, screenStore } = useStore()
    const id = deviceStore.currentDev?.deviceType.id
    const keyPath = getKeyPath()

    const screenArr = new Array();
    for (let i = 0; i < screenStore.screenArr.length; i++) {
        screenArr.push(res.text.屏幕() + (i + 1));
    }

    if (p.lightLayout.isFormal) {
        deviceStore.setFormalLightName()
    }

    return useObserver(() => {
        return (
            <dj.View h={280}>

                <dj.FlexView
                    flexDirection={'row'}
                    w={330}
                    h={280}
                    y={20}
                >
                    {/* 灯光模式 */}
                    <dj.View w={280} h={28} x={0}>
                        <dj.Text w={65} x={0} y={5} type={'SubTitle_akko'} text={res.string.灯光模式}
                            isDisabled={p.light.type === 'LightMusicFollow2' || p.light.type === 'LightMusicFollow3' || p.light.type === 'LightScreenColor'}
                        />
                        <dj.MyComboBoxMui
                            className='notoutside'
                            w={blockCloud ? 220 : 130}
                            h={40}
                            x={80}
                            selectedValue={
                                DeviceStore.lightNameMap[p.light.type]
                                    ? DeviceStore.lightNameMap[p.light.type]
                                    : p.light.type
                            }
                            clickHandle={() => {
                                if (deviceStore.keyboardOption?.powerSaveMode) return
                                if (p.light.type === 'LightMusicFollow2' || p.light.type === 'LightMusicFollow3' || p.light.type === 'LightScreenColor') {

                                } else {
                                    const name = id + '&' + p.light.type
                                    // localStorage.setItem(p.light.type, JSON.stringify(p.light))
                                    localStorage.setItem(name, JSON.stringify(p.light))
                                    isKeyStore.setIsShowLightSelect(!isKeyStore.isShowLightSelect)
                                    isKeyStore.setIsShowLightMethodSelect(false)
                                }
                            }}
                            isDisabled={p.light.type === 'LightMusicFollow2' || p.light.type === 'LightMusicFollow3' || p.light.type === 'LightScreenColor'}
                        />
                    </dj.View>
                    {/* Music */}
                    {process.platform !== 'darwin' && !deviceStore.keyboardOption?.powerSaveMode && p.light.type === 'LightMusicFollow2' && <dj.View w={334} h={28} y={55} zIndex={2}>
                        <dj.Text
                            w={82}
                            x={0}
                            type={'SubTitle_akko'}
                            text={res.text.音频驱动()}
                        />
                        <dj.MyComboBoxMui
                            className='notoutside'
                            w={130}
                            h={40}
                            x={80}
                            selectedValue={deviceStore.isMusicNative ? 'RY Native' : 'wasapi'}
                            clickHandle={() => {
                                isKeyStore.setIsShowMusicSelect(!isKeyStore.isShowMusicSelect)
                                isKeyStore.setIsShowLightMethodSelect(false);
                                isKeyStore.setIsShowLightSelect(false);
                            }}
                        />

                        <dj.HelpBox x={210} y={8} title={res.text.如果wasapi线路无法正常输出请更换RYNative线路()} />
                    </dj.View>}


                    {/* speed */}
                    <dj.View w={334} h={28} x={50} y={(process.platform !== 'darwin' && !deviceStore.keyboardOption?.powerSaveMode && p.light.type === 'LightMusicFollow2') ? 115 : 55} >
                        <dj.Text
                            w={55}
                            x={-50}
                            type={'SubTitle_akko'}
                            text={res.string.速度}
                            isDisabled={layout.minSpeed === undefined || (!!deviceStore.keyboardOption?.powerSaveMode)}
                        />
                        <KeyboardRange
                            min={layout.minSpeed === undefined ? 0 : layout.minSpeed}
                            max={layout.maxSpeed === undefined ? 4 : layout.maxSpeed}
                            step={1}
                            value={'speed' in p.light ? p.light.speed : 0}
                            setValue={(value) => {
                                'speed' in p.light &&
                                    p.setLight({
                                        ...p.light,
                                        speed: value,
                                    })
                            }}
                            leftDescription={res.text.慢()}
                            rightDescription={res.text.快()}
                            isDisabled={layout.minSpeed === undefined || (!!deviceStore.keyboardOption?.powerSaveMode)}
                        />

                    </dj.View>

                    {/* 亮度 */}
                    <dj.View w={334} h={28} x={50} y={(process.platform !== 'darwin' && !deviceStore.keyboardOption?.powerSaveMode && p.light.type === 'LightMusicFollow2') ? 155 : 100}>
                        <dj.Text
                            w={85}
                            x={-50}
                            type={'SubTitle_akko'}
                            text={res.string.亮度}
                            isDisabled={layout.minValue === undefined || (!!deviceStore.keyboardOption?.powerSaveMode)}
                        />
                        <KeyboardRange
                            min={layout.minValue === undefined ? 0 : layout.minValue}
                            max={layout.maxValue === undefined ? 5 : layout.maxValue}
                            step={1}
                            leftDescription={res.text.暗()}
                            rightDescription={res.text.明()}
                            value={layout.minValue === undefined ? 0 : 'value' in p.light ? p.light.value : 0}
                            setValue={(value) => {
                                'value' in p.light &&
                                    p.setLight({
                                        ...p.light,
                                        value: value,
                                    })

                                // remberLight(p.light.type, p.light, 'value', value)
                            }}
                            isDisabled={layout.minValue === undefined || (!!deviceStore.keyboardOption?.powerSaveMode)}
                        />
                    </dj.View>

                    {/* 当前使用颜色 */}
                    <dj.View w={120} h={28} y={(process.platform !== 'darwin' && !deviceStore.keyboardOption?.powerSaveMode && p.light.type === 'LightMusicFollow2') ? 205 : 155}>
                        {isLayoutRgbExit && !deviceStore.keyboardOption?.powerSaveMode && (
                            <Fragment>
                                <dj.ColorBlock
                                    w={16}
                                    h={16}
                                    y={0}
                                    bg={`rgb(${color.r},${color.g},${color.b})`}
                                    clickHandle={() => {
                                        setPopUp(!popUp)
                                    }}
                                />

                                <dj.Text
                                    w={100}
                                    h={26}
                                    x={28}
                                    y={-0}
                                    type={'SubTitle_akko'}
                                    text={res.string.当前使用颜色}
                                />
                            </Fragment>
                        )}
                    </dj.View>

                    <dj.View w={120} h={28} y={(process.platform !== 'darwin' && !deviceStore.keyboardOption?.powerSaveMode && p.light.type === 'LightMusicFollow2') ? 260 : 205}>
                        {isLayoutDazzleExit && !deviceStore.keyboardOption?.powerSaveMode && (
                            <Fragment>
                                <dj.DazzleColorCheckBox_Ajazz
                                    w={blockCloud ? 70 : 60}
                                    h={19}
                                    y={0}
                                    text={res.string.炫彩}
                                    isBool={true}
                                    checkState={p.light.dazzle === undefined ? false : p.light.dazzle}
                                    type={'Normal'}
                                    clickHandle={() => {
                                        isKeyStore.setDazzleKey(!p.light.dazzle)
                                        p.setLight({ ...p.light, dazzle: isKeyStore.dazzleKey })
                                    }}
                                ></dj.DazzleColorCheckBox_Ajazz>
                            </Fragment>
                        )}
                    </dj.View>

                    {/* {p.light.type === 'LightScreenColor' && !deviceStore.keyboardOption?.powerSaveMode
                            && <dj.View w={120} h={56} y={11} x={727}>
                                <div style={{
                                    width: 120,
                                    height: 56,
                                    border:'1px solid #5a5a5a'
                                }}>
                                    <dj.ColorBlock
                                        w={120}
                                        h={56}
                                        y={0}
                                        bg={`rgba(
                  ${screenStore.screenDataArray[0]},
                  ${screenStore.screenDataArray[1]},
                  ${screenStore.screenDataArray[2]},
                  ${screenStore.screenDataArray[3] / 255}
                  )`}
                                    />
                                </div>
                            </dj.View>} */}



                </dj.FlexView>

                {/* ---------- 灯光模式选择 --------- */}
                {
                    isKeyStore.isShowLightSelect &&
                    <OutsideAlerter
                        clickOutsideHandle={() => {
                            isKeyStore.setIsShowLightSelect(false)
                        }}
                    >
                        <dj.ComboBoxSelect
                            w={blockCloud ? 220 : 130}
                            h={132}
                            x={80}
                            y={60}
                            zIndex={999}
                            overflow={'hidden scroll'}
                            modes={
                                deviceStore.keyboardOption?.powerSaveMode
                                    ? [res.text.关闭()]
                                    : p.lightLayout.types.map((v: { type: any }) =>
                                        DeviceStore.lightNameMap[v.type]
                                            ? DeviceStore.lightNameMap[v.type]
                                            : v.type
                                    )
                            }
                            onChange={(index) => {
                                if (deviceStore.keyboardOption?.powerSaveMode) return
                                const type = id + '&' + p.lightLayout.types[index].type
                                onModeChange(type)
                                isKeyStore.setIsShowLightSelect(false);

                            }}
                        />
                    </OutsideAlerter>
                }

                {/* ---------- 灯光模式播放方式选择 --------- */}
                {
                    isKeyStore.isShowLightMethodSelect &&
                    <OutsideAlerter
                        clickOutsideHandle={() => {
                            isKeyStore.setIsShowLightMethodSelect(false)
                        }}
                    >
                        <dj.ComboBoxSelect
                            w={blockCloud ? 146 : 110}
                            x={80}
                            h={p.light.type === "LightScreenColor" ? screenArr.length == 1 ? 33 : 66 : layout.options === undefined
                                ? 0 : layout.options?.length <= 1 ? 33 : 66}
                            y={115}
                            zIndex={999}
                            overflow={'hidden scroll'}
                            modes={
                                deviceStore.keyboardOption?.powerSaveMode
                                    ? []
                                    : p.light.type === "LightScreenColor"
                                        ? screenArr
                                        : layout.options === undefined
                                            ? []
                                            : layout.options
                                                ? layout.options.map((v: string) => DeviceStore.optionNameMap[v] ? DeviceStore.optionNameMap[v] : v)
                                                : []
                            }
                            onChange={async (index: number) => {
                                if (p.light.type !== "LightScreenColor") {
                                    'option' in p.light &&
                                        layout.options &&
                                        p.light.option != layout.options[index] &&
                                        p.setLight({ ...p.light, option: layout.options[index] })

                                } else {
                                    if (screenStore.screenIndex == index) {

                                    } else {
                                        mobxStore.toastStore.setState('bussy', 'screen')
                                        await sleep(2000)
                                        screenStore.setScreenIndex(index)
                                        mobxStore.toastStore.setState('idle', 'screen')
                                    }
                                }
                                isKeyStore.setIsShowLightMethodSelect(false);
                            }}
                        />
                    </OutsideAlerter>
                }

                {/* ---------- 音频驱动选择 --------- */}
                {
                    process.platform !== 'darwin' && !deviceStore.keyboardOption?.powerSaveMode && p.light.type === 'LightMusicFollow2' && isKeyStore.isShowMusicSelect &&
                    <OutsideAlerter
                        clickOutsideHandle={() => {
                            isKeyStore.setIsShowMusicSelect(false)
                        }}
                    >
                        <dj.ComboBoxSelect
                            w={130}
                            h={66}
                            x={80}
                            y={115}
                            zIndex={999}
                            overflow={'hidden scroll'}
                            modes={['wasapi', 'RY Native']}
                            onChange={async (index: number) => {
                                deviceStore.setIsMusicNative(Boolean(index))
                                isKeyStore.setIsShowMusicSelect(false)
                            }}
                        />
                    </OutsideAlerter>
                }







                {deviceStore.keyboardOption?.powerSaveMode &&
                    <dj.View
                        h={50}
                        y={302}>
                        <dj.Text
                            x={0}
                            type={'灯光键盘提示'}
                            text={res.text.键盘已关闭灯光请打开灯光后重新切换灯效()}
                        />
                    </dj.View>
                }
                {/* 键盘图 */}
                {/* <dj.Img
                    w={871}
                    h={288}
                    x={209}
                    y={44}
                    imgBg={
                        p.deviceName
                            ? keyPath
                            : res.img.MG912
                    }
                /> */}

                {/* 颜色选择BOX */}
                {isLayoutRgbExit && popUp && (
                    <dj2.View2 x={-120} y={-95}>
                        <PopColorPicker
                            color={color}
                            setColor={setColor}
                            clickHandle={setPopUp}
                            triangleX={119}
                            direction={'up'}
                        />
                    </dj2.View2>
                )}
            </dj.View>
        )
    })

}

export const LEDRGBLight = withProps(LEDLight, wheelLightLEDData)