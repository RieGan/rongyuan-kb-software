import React, { Fragment, useEffect, useState } from 'react'
import { dj, dj2 } from '../../../../dj'
import { res } from '../../../../res'

import { LightRange } from '../../../utils/LightRange'
import { ColorPicker_Ajazz, PopUpBox } from './ColorPicker'

import {
    withProps,
    LightProp,
    wheelLightData,
    logoLightData,
} from '../../../utils/WithProps'

import { KeyboardBlocks } from '../home/Keyboard'
import { numToRgb, rgbToNum } from '../../../../unitys/rgbNum'
import { OutsideAlerter } from '../../../utils/OutsideAlerter'
import { DeviceStore } from '../../../../mobxStore/deviceStore'
import { baseW } from '../../../../screenConfig'

// test文件s
// import styled from '@emotion/styled'
// import { KeyboardLightAnimation } from '../light/test'
import { mobxStore, useStore } from '../../../../mobxStore/store'
import { useObserver } from 'mobx-react-lite'
import { getKeyPath } from '../../keyPath'
import { sleep } from '../../../../unitys/timeFunc'
import { ColorPicker } from '../../light/ColorPicker'
import { KeyboardRange } from '../../../utils/KeyboardRange'
import { blockCloud } from '../../../../appConfig'
// test文件e


const ColorPickerWidth = 250
const ColorPickerHeight = 250
const NavbarWidth = 269
const DriverWidth = baseW

export const getLightRgb = (light: LightSetting) =>
    numToRgb(('rgb' in light && light.rgb) || 0)

const modeChange = (p: LightProp, type: string) => {
    //找到模式 对应的 type
    const tempType = type.slice(type.indexOf('&') + 1)
    if (tempType === p.light.type) return

    let tmpLayout = p.lightLayout.types.find((v) => v.type === type)
    let tmpLight: any = { type: type }

    const tmp = localStorage.getItem(type)

    if (tmp !== null) {
        tmpLight = JSON.parse(tmp)
    } else {
        if (tmpLayout !== undefined) {
            if (tmpLayout.minSpeed !== undefined && tmpLayout.maxSpeed !== undefined)
                tmpLight.speed = (tmpLayout.maxSpeed - tmpLayout.minSpeed) / 2

            if (tmpLayout.minValue !== undefined && tmpLayout.maxValue !== undefined)
                tmpLight.value = (tmpLayout.maxValue - tmpLayout.minValue) / 2

            if (tmpLayout.rgb !== undefined) tmpLight.rgb = rgbToNum(255, 69, 110)

            if (tmpLayout.options !== undefined) tmpLight.option = tmpLayout.options[0]
        }
    }
    localStorage.setItem(type, JSON.stringify(tmpLight))

    p.setLight(tmpLight)
}

export const modeKeyChange = (p: LightProp, type: string) => {
    const tempType = type.slice(type.indexOf('&') + 1)
    if (tempType === p.light.type) return
    let tmpLayout = p.lightLayout.types.find((v) => v.type === tempType)
    let tmpLight: any = { type: tempType }

    const tmp = localStorage.getItem(type)
    if (tmp !== null) {
        tmpLight = JSON.parse(tmp)
    } else {
        if (tmpLayout !== undefined) {
            if (tmpLayout.minSpeed !== undefined && tmpLayout.maxSpeed !== undefined)
                tmpLight.speed = (tmpLayout.maxSpeed - tmpLayout.minSpeed) / 2

            if (tmpLayout.minValue !== undefined && tmpLayout.maxValue !== undefined)
                tmpLight.value = tmpLayout.maxValue

            if (tmpLayout.rgb !== undefined) tmpLight.rgb = rgbToNum(255, 69, 110)
            if (tmpLayout.dazzle !== undefined) tmpLight.dazzle = true
            if (tmpLayout.options !== undefined) tmpLight.option = tmpLayout.options[0]
        }
    }

    localStorage.setItem(type, JSON.stringify(tmpLight))
    p.setLight(tmpLight)
}
export const lightCurrentLayout = (p: LightProp) => {
    const lightLayout = p.lightLayout.types.find(
        (value: { type: any }) => value.type === p.light.type
    )

    return lightLayout
        ? lightLayout
        : {
            maxSpeed: undefined,
            minSpeed: undefined,
            maxValue: undefined,
            minValue: undefined,
            options: undefined,
            rgb: undefined,
            dazzle: undefined
        }
}

const MouseLight = (p: LightProp) => {
    const onModeChange = (name: string) => modeChange(p, name)
    const layout = lightCurrentLayout(p)

    const isLayoutRgbExit =
        p.lightLayout.isRgb &&
        p.lightLayout.types.find((v) => v.type === p.light.type)?.rgb

    const color = isLayoutRgbExit ? getLightRgb(p.light) : { r: 0, g: 0, b: 0 }

    return (
        <dj.View w={891} h={480} x={0}>
            <dj.View w={280} h={28} x={0} y={30}>
                <dj.Text w={60} x={0} type={'SubTitle'} text={res.string.灯光模式} />
                <dj.ComboBoxMui
                    w={200}
                    h={28}
                    x={70}
                    selectedValue={
                        DeviceStore.lightNameMap[p.light.type]
                            ? DeviceStore.lightNameMap[p.light.type]
                            : p.light.type
                    }
                    onChange={(index) => onModeChange(p.lightLayout.types[index].type)}
                    modes={p.lightLayout.types.map((v: { type: any }) =>
                        DeviceStore.lightNameMap[v.type]
                            ? DeviceStore.lightNameMap[v.type]
                            : v.type
                    )}
                />
            </dj.View>
            <dj.View w={334} h={28} y={101}>
                {layout.minSpeed !== undefined && (
                    <Fragment>
                        <dj.Text
                            w={30}
                            type={'SubTitle'}
                            text={res.string.亮度}
                            isDisabled={false}
                        />
                        <LightRange
                            min={layout.minValue === undefined ? 0 : layout.minValue}
                            max={layout.maxValue === undefined ? 5 : layout.maxValue}
                            leftDescription={res.text.暗()}
                            rightDescription={res.text.明()}
                            value={'speed' in p.light ? p.light.speed : 0}
                            setValue={(value) => {
                                'speed' in p.light &&
                                    p.setLight({
                                        ...p.light,
                                        speed: value,
                                    })
                            }}
                            isDisabled={false}
                        />
                    </Fragment>
                )}
                {layout.minValue !== undefined && (
                    <Fragment>
                        <dj.Text
                            w={30}
                            type={'SubTitle'}
                            text={res.string.速度}
                            isDisabled={false}
                        />
                        <LightRange
                            min={layout.minSpeed === undefined ? 0 : layout.minSpeed}
                            max={layout.maxSpeed === undefined ? 5 : layout.maxSpeed}
                            leftDescription={res.text.慢()}
                            rightDescription={res.text.快()}
                            value={'value' in p.light ? p.light.value : 0}
                            setValue={(value) => {
                                'value' in p.light &&
                                    p.setLight({
                                        ...p.light,
                                        value: value,
                                    })
                            }}
                            isDisabled={false}
                        />
                    </Fragment>
                )}
            </dj.View>
            {isLayoutRgbExit && (
                <dj.Text
                    h={14}
                    y={135}
                    type={'灯光界面提示'}
                    text={'请选择在使用呼吸模式和灯光常亮模式时要使用的颜色'}
                />
            )}
            <dj.View w={ColorPickerWidth} h={ColorPickerHeight} y={187}>
                <ColorPicker
                    color={color}
                    setColor={(rgb: number) =>
                        isLayoutRgbExit &&
                        'rgb' in p.light &&
                        p.setLight({ ...p.light, rgb: rgb })
                    }
                />
            </dj.View>
            {!isLayoutRgbExit && (
                <dj.View w={ColorPickerWidth} h={ColorPickerHeight} y={187}>
                    {''}
                </dj.View>
            )}

            <dj.Img w={186} h={366} x={612} y={52} imgBg={res.img.MG912} />
        </dj.View>
    )
}

export const PopColorPicker = (p: {
    color: { r: number; g: number; b: number }
    setColor: (rgb: number) => void
    clickHandle: (state: boolean) => void
    direction: 'up' | 'down'
    triangleX?: number
}) => {
    const [colorPickerEdit, setColorPickerEdit] = useState(false)

    const clickHanle = () => {
        !colorPickerEdit && p.clickHandle(false)
        setColorPickerEdit(false)
    }
    return (
        <PopUpBox direction={p.direction} triangleX={p.triangleX}>
            <OutsideAlerter clickOutsideHandle={clickHanle}>
                <dj.View>
                    <ColorPicker_Ajazz
                        color={p.color}
                        setColor={p.setColor}
                        setEdit={setColorPickerEdit}
                    />
                </dj.View>
            </OutsideAlerter>
        </PopUpBox>
    )
}

const KeyboardUserPic = (p: LightProp) => {
    const { lightLayout, deviceLayout, lightPic, setLightPic } = p
    //console.error(lightPic)
    const [popUp, setPopUp] = useState(false)
    const [key, setPosition] = useState<{
        x: number;
        y: number;
        width: number;
        height: number;
        hid: number;
        index: undefined | number
    }>({
        x: -1,
        y: -1,
        width: -1,
        height: -1,
        hid: -1,
        index: undefined
    })

    const setDegree = (keyHidCode: number, index: number | undefined) => {
        const copy = lightPic.slice()
        // console.error(lightPic);

        const findIndex = copy.findIndex((v) => v.hid === keyHidCode && v.index === index)
        // console.error(copy[findIndex]);

        if (findIndex === -1) return
        if (copy[findIndex].rgb === 0) {
            copy.splice(findIndex, 1, { hid: keyHidCode, rgb: 13158600, index: index })
        } else {
            copy.splice(findIndex, 1, { hid: keyHidCode, rgb: 0, index: index })
        }

        // console.error('findIndex', findIndex, key.hid, key.index, keyHidCode, index)
        // findIndex === -1
        //   ? copy.push({ hid: keyHidCode, rgb: 0, index: index })
        //   : copy.splice(findIndex, 1)
        if (index === undefined)
            setLightPic(copy, copy[findIndex])
    }

    const color = numToRgb(
        lightPic.find((v) => v.hid === key.hid && v.index === key.index) !== undefined
            ? lightPic.find((v) => v.hid === key.hid && v.index === key.index)!.rgb
            : 206
    )

    const setColor = (rgb: number) => {
        const copy = lightPic.slice()
        const findIndex = copy.findIndex((v) => v.hid === key.hid && v.index === key.index)
        //console.error('setColor', findIndex, key.hid, key.index)
        copy.splice(findIndex, 1, { hid: key.hid, rgb: rgb, index: key.index })

        setLightPic(copy, copy[findIndex])
    }
    const { isKeyStore } = useStore()


    isKeyStore.setColorPickerKey(popUp)

    const mouseDown = (
        keyHidCode: number,
        text: string,
        positionX: number,
        positionY: number,
        width: number,
        height: number,
        index?: number
    ) => {
        setPosition({
            x: positionX,
            y: positionY,
            width: width,
            height: height,
            hid: keyHidCode,
            index: index
        })
    }

    const mouseUp = (
        keyHidCode: number,
        text: string,
        positionX: number,
        positionY: number,
        width: number,
        height: number,
        index?: number
    ) => {
        if (lightLayout.isRgb) setPopUp(true)
        else setDegree(keyHidCode, index)
    }
    const x = key.x + key.width / 2 + ColorPickerWidth / 2 + NavbarWidth + p.deviceLayout.delt.deltX > DriverWidth
        ? DriverWidth - ColorPickerWidth - NavbarWidth
        : key.x - ColorPickerWidth / 2 + key.width / 2

    return (
        <Fragment>
            <dj.View w={871} h={288} x={-880} y={-7}>
                <KeyboardBlocks
                    deviceLayout={deviceLayout}
                    changedValue={lightPic.map((v) => {
                        return {
                            hid: v.hid,
                            mode: lightLayout.isRgb
                                ? {
                                    color: `rgb(${numToRgb(v.rgb).r},${numToRgb(v.rgb).g},${numToRgb(v.rgb).b
                                        })`,
                                    type: 'CustomWeight',
                                }
                                : {
                                    color: v.rgb !== 0 ? `rgb(${0xc8},${0xc8},${0xc8})` : 'rgb(0,0,0)',
                                    type: 'CustomWeight',
                                },
                            index: v.index
                        }
                    })}
                    mouseDown={mouseDown}
                    mouseUp={mouseUp}
                    mode={lightLayout.isRgb ? 'Multicolor' : 'Monochrome'}
                />
            </dj.View>

            {popUp && (
                <dj.View
                    x={key.width >= 249 ? x - 883 : key.x <= 106 ? -878 : x - 883}
                    y={key.y < 174 ? key.y + 33 : key.y - ColorPickerHeight - 20}>
                    <PopColorPicker
                        color={color}
                        setColor={setColor}
                        clickHandle={setPopUp}
                        direction={key.y < 174 ? 'down' : 'up'}
                        triangleX={
                            // key.width >= 249 ? key.x + key.width / 2 - (x) + 9 : key.x + key.width / 2 - (x) + 50
                            key.width >= 249 ? (key.x + 20) - (key.width / 2) + 28
                                : key.x <= 96 ? key.x <= 67 ? key.x : key.width <= 34 ? key.x : key.x + key.width / 2 - (x) - 21 : key.x + key.width / 2 - (x) - 11
                        }
                    />
                </dj.View>
            )}
        </Fragment>
    )
}


const KeyboardLight = (p: LightProp) => {
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

    const { deviceStore, screenStore, configStore } = useStore()
    const id = deviceStore.currentDev?.deviceType.id
    const keyPath = getKeyPath()

    const screenArr = new Array();
    screenStore.getScreenArr();
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
                        <dj.Text w={65} x={0} y={5} type={'SubTitle_akko'} text={res.string.灯光模式} />
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
                                const name = id + '&' + p.light.type
                                // localStorage.setItem(p.light.type, JSON.stringify(p.light))
                                localStorage.setItem(name, JSON.stringify(p.light))
                                isKeyStore.setIsShowLightSelect(!isKeyStore.isShowLightSelect)
                                isKeyStore.setIsShowLightMethodSelect(false)
                            }}
                        />
                    </dj.View>

                    {/* Options */}
                    <dj.View w={280} h={28} y={55} >
                        <dj.Text
                            w={64}
                            x={0}
                            y={5}
                            type={'SubTitle_akko'}
                            text={res.text.播放方式()}
                            isDisabled={layout.options === undefined && p.light.type !== "LightScreenColor" || (!!deviceStore.keyboardOption?.powerSaveMode)}
                        />

                        <dj.MyComboBoxMui
                            className='notoutside'
                            w={blockCloud ? 220 : 130}
                            h={40}
                            x={80}
                            selectedValue={
                                p.light.type === "LightScreenColor"
                                    ? screenArr[screenStore.screenIndex]
                                    : 'option' in p.light && p.light.option && layout.options
                                        ? (DeviceStore.optionNameMap[p.light.option] ? DeviceStore.optionNameMap[p.light.option] : p.light.option)
                                        : undefined
                            }
                            clickHandle={() => {
                                if (layout.options === undefined && p.light.type !== "LightScreenColor" || (!!deviceStore.keyboardOption?.powerSaveMode)) {

                                } else {

                                    isKeyStore.setIsShowLightMethodSelect(!isKeyStore.isShowLightMethodSelect);
                                    isKeyStore.setIsShowLightSelect(false);
                                }

                            }}
                            isDisabled={layout.options === undefined && p.light.type !== "LightScreenColor" || (!!deviceStore.keyboardOption?.powerSaveMode)}
                        />
                    </dj.View>
                    {/* Music */}
                    {process.platform !== 'darwin' && !deviceStore.keyboardOption?.powerSaveMode && p.light.type === 'LightMusicFollow2' && <dj.View w={334} h={28} y={110} zIndex={2}>
                        <dj.Text
                            w={87}
                            x={0}
                            type={'SubTitle_akko'}
                            text={res.text.音频驱动()}
                        />
                        <dj.MyComboBoxMui
                            className='notoutside'
                            w={130}
                            h={40}
                            x={blockCloud?100:80}
                            selectedValue={deviceStore.isMusicNative ? 'RY Native' : 'wasapi'}
                            clickHandle={() => {
                                isKeyStore.setIsShowMusicSelect(!isKeyStore.isShowMusicSelect)
                                isKeyStore.setIsShowLightMethodSelect(false);
                                isKeyStore.setIsShowLightSelect(false);
                            }}
                        />

                        <dj.HelpBox x={230} y={8} title={res.text.如果wasapi线路无法正常输出请更换RYNative线路()} />
                    </dj.View>}

                    {/* speed */}
                    <dj.View w={334} h={28} x={50} y={(process.platform !== 'darwin' && !deviceStore.keyboardOption?.powerSaveMode && p.light.type === 'LightMusicFollow2') ? 165 : 120} >
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
                    <dj.View w={334} h={28} x={50} y={(process.platform !== 'darwin' && !deviceStore.keyboardOption?.powerSaveMode && p.light.type === 'LightMusicFollow2') ? 220 : 165}>
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
                    <dj.View w={120} h={28} y={(process.platform !== 'darwin' && !deviceStore.keyboardOption?.powerSaveMode && p.light.type === 'LightMusicFollow2') ? 260 : 220}>
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

                    <dj.View w={120} h={28} y={(process.platform !== 'darwin' && !deviceStore.keyboardOption?.powerSaveMode && p.light.type === 'LightMusicFollow2') ? 300 : 260}>
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
                            h={300}
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
                            w={blockCloud ? 220 : 130}
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
                            x={blockCloud?100:80}
                            y={170}
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
                        h={20}
                        y={(process.platform !== 'darwin' && !deviceStore.keyboardOption?.powerSaveMode && p.light.type === 'LightMusicFollow2') ? 344 : 324}>
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
                    <dj2.View2 x={-2} y={-48}>
                        <PopColorPicker
                            color={color}
                            setColor={setColor}
                            clickHandle={setPopUp}
                            triangleX={0}
                            direction={'up'}
                        />
                    </dj2.View2>
                )}


                {/* 遮罩层 */}
                {p.light.type === 'LightUserPicture' && <KeyboardUserPic {...p} />}
                {/* 
          关闭    LightOff
          常亮    LightAlwaysOn       有色盘
          呼吸    LightBreath         有色盘
          光波    LightWave    
          涟漪    LightRipple         有色盘
          雨滴    LightRaindrop       有色盘
          蛇形    LightSnake          有色盘
          跟随    LightPressAction    有色盘
          聚合    LightConverage      有色盘
          霓虹    LightNeon
          自定义  LightUserPicture
        */}
            </dj.View>
        )
    })

}



export const WheelLight = withProps(MouseLight, wheelLightData)
export const LogoLight = withProps(MouseLight, logoLightData)
export const RGBLight = withProps(KeyboardLight, wheelLightData)