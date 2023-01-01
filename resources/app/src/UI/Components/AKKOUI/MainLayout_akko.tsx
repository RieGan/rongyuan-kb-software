import React, { useState } from 'react'
import { useObserver } from 'mobx-react-lite'
import { dj } from '../../../dj'
import { BaseType } from '../../../dj/BaseType'
import { res } from '../../../res'
import { blockCloud, kCompanyDisplayName, ShopKey } from '../../../appConfig'
import { mobxStore, useStore } from '../../../mobxStore/store'
import { store } from '../../store'
import { MouseHome } from '../home/Mouse'
import { LogoLight, WheelLight } from './light/Light'
import { ConfigScheme, MacroScheme } from './scheme/Scheme'
import { Shop } from '../shop/shop'
import styled from '@emotion/styled'
import { UserCenter } from './center/UserCenter'
import { Support } from './support/Support'
import { KeyboardHome_ajazz } from './home/Keyboard'
import { MacroFile_Ajazz } from './macro/MacroFile'
import { SubNavbarItem_Ajazz } from '../../utils/SubNavbarItem'
import { LightAll } from './light/LightAll'
import { OutsideAlerter } from '../../utils/OutsideAlerter'
import { Configuration } from './configuration/Configuration'
import { Config } from '../../../sdk/DB'
import { MySlider } from '../../../dj/MySlider'
import { baseW } from '../../../screenConfig'



const a = 127
const b = 130
const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
const rrr = 90 - Math.asin(a / c) * 180 / Math.PI

const NavItem = (p: {
    w: number
    h: number
    num: number
    title: React.ReactNode
    img?: BaseType.ButtonStateImg
    isHightLight: boolean
    clickHandle: () => void

    __________items: {
        title: React.ReactNode
        src: BaseType.ButtonStateImg
        changeable: boolean
        mouse: {
            title: React.ReactNode
            jsx: React.ReactNode
        }[]
        keyboard: {
            title: React.ReactNode
            jsx: React.ReactNode
        }[]
        common: {
            title: React.ReactNode
            jsx: React.ReactNode
        }[]
        lineExist: boolean
    }[]
    subPageIndex: number
    // showLitItem: boolean
}) => {
    const Item = styled.div({
        position: 'relative',
        backgroundColor: `${p.isHightLight ? '#fff' : ''}`,
        borderRadius: '12px',
        '.image': {
            backgroundImage: p.img
                ? p.isHightLight
                    ? `url(${p.img.active})`
                    : `url(${p.img.normal})`
                : '',
        },
        '&:hover .image': {
            backgroundImage: p.img
                ? p.isHightLight
                    ? `url(${p.img.active})`
                    : `url(${p.img.hover})`
                : '',
        },
        '.text': {
            fontFamily: 'OpenSans-Regular', fontSize: blockCloud ? 17 : 18,
            color: p.isHightLight
                ? '#7a6caa'
                : '#515150'
        },
        '&:hover .text': {
            color: '#7a6caa'
        },
        '&:hover': {
            backgroundColor: '#fff',
            borderRadius: '12px',
        },

    }, (p: {
        w: number,
        h: number,
    }) => ({
        width: p.w,
        height: p.h,
    }))
    // const { pageStore, shareStore, lightPageStore, macroStore } = useStore()

    return useObserver(() => (
        <Item
            w={p.w}
            h={p.h}
            style={{
                // background: p.isHightLight ? `url(${res.img.ajazzImg.head_button.active}) no-repeat` :
                //     `url(${res.img.ajazzImg.head_button.normal}) no-repeat`,
                backgroundSize: 'contain',
                // transform: `skew(${-rrr}deg)`,
                marginLeft: p.num === 0 ? 70 : 0,
                marginTop: 10,
                marginBottom: 10,
                zIndex: p.isHightLight ? 2 : 1
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                }}
                onClick={(e) => {
                    (p.clickHandle(), e.stopPropagation())
                }}>
                {p.img && <div className={"image"} style={{ width: 32, height: 32, marginRight: 10, backgroundRepeat: 'no-repeat', backgroundSize: ' 100% 100%' }} />}

                <p className={"text"} style={{ lineHeight: '31px' }}>{p.title}</p>
            </div>
        </Item>

    ))



}

export const MainLayout_akko = () => {
    const [subPageIndex, setSubPageIndex] = useState(0)
    const { pageStore, deviceStore, shareStore, lightPageStore, macroStore, isKeyStore } = useStore()
    const [shareConfig, setShareConfig] = useState<Config | undefined>(undefined)


    const __________items: {
        title: React.ReactNode
        src: BaseType.ButtonStateImg
        changeable: boolean
        mouse: {
            title: React.ReactNode
            jsx: React.ReactNode
        }[]
        keyboard: {
            title: React.ReactNode
            jsx: React.ReactNode
        }[]
        common: {
            title: React.ReactNode
            jsx: React.ReactNode
        }[]
        lineExist: boolean
    }[] = [
            {
                title: res.text.自定义键_akko(),
                src: res.img.ajazzImg.home,
                changeable: true,
                mouse: [{ title: 'CPI', jsx: <MouseHome /> }],
                keyboard: [{ title: '', jsx: <KeyboardHome_ajazz /> }],
                common: [],
                lineExist: true,
            },
            {
                title: res.text.灯光调节_akko(),
                src: res.img.ajazzImg.light,
                changeable: true,
                mouse: [
                    {
                        title: 'Wheel灯光',
                        jsx: <WheelLight />,
                    },
                    {
                        title: 'LOGO灯光',
                        jsx: <LogoLight />,
                    },
                ],
                keyboard: [
                    { title: res.text.灯光(), jsx: <LightAll /> },
                ],
                common: [],
                lineExist: true,
            },
            {
                title: res.text.宏Macro_akko(),
                src: res.img.ajazzImg.macro,
                changeable: false,
                mouse: [],
                keyboard: [],
                common: [{ title: res.text.宏文件(), jsx: <MacroFile_Ajazz /> }],
                lineExist: true,
            },
            {
                title: res.text.配置共享_akko(),
                src: res.img.ajazzImg.share,
                changeable: false,
                mouse: [],
                keyboard: [],
                common: [
                    {
                        title: '配置文件',
                        jsx: <ConfigScheme />,
                    },
                    {
                        title: res.text.宏文件(),
                        jsx: <MacroScheme />,
                    },
                ],
                lineExist: true,
            },
            {
                title: res.text.个人设置_akko(),
                src: res.img.ajazzImg.personal,
                changeable: false,
                mouse: [],
                keyboard: [],
                common: [{ title: '', jsx: <UserCenter /> }],
                lineExist: false,
            },
            {
                title: res.text.在线升级_akko(),
                src: res.img.ajazzImg.help,
                changeable: false,
                mouse: [],
                keyboard: [],
                common: [{ title: res.text.支持(), jsx: <Support /> }],
                lineExist: false,
            },
        ]

    if (ShopKey) {
        __________items.push(
            {
                title: "shop",
                src: res.img.leftbar_home,
                changeable: false,
                mouse: [],
                keyboard: [],
                common: [{ title: '', jsx: <Shop /> }],
                lineExist: false,
            },
        )
    }

    if (deviceStore.currentDev?.deviceType.layout === null) {
        console.log('没有灯光模块');
        const num = __________items.findIndex(v => v.title === res.text.灯光调节_akko())
        if (num !== -1)
            __________items.splice(num, 1)
    }

    // if (deviceStore.currentDev?.deviceType.logoLayout) {
    //     __________items[1].keyboard.push({ title: '灯带', jsx: <div /> })
    // }

    // if (deviceStore.currentDev?.deviceType.otherSetting?.sleep_24 || deviceStore.currentDev?.deviceType.otherSetting?.sleep_bt)
    //     __________items[1].keyboard.push({ title: res.text.睡眠设置(), jsx: <KeyboardSleep /> })


    if (
        !deviceStore.currentDev?.deviceType.logoLayout
        && !(deviceStore.currentDev?.deviceType.otherSetting?.sleep_24 || deviceStore.currentDev?.deviceType.otherSetting?.sleep_bt)
    ) {
        lightPageStore.setPageIndex(0)
    }

    const p = __________items.findIndex(v => v.title === res.text.配置共享_akko())
    if (blockCloud) {
        console.log('SPLLLICCCCEEE')
        __________items.splice(p, 2)
    }
    if (p != -1) {
        shareStore.setmacrosPage(p)
    }

    const ttt = () => {
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

    return useObserver(() => (
        // <dj.View relative drag={true} w={1220}>
        <div
            style={{
                position: 'absolute',
                top: '70px',
                bottom: '52px',
                width: '100%',
                backgroundColor: '#fff'
            }}
        >

            <dj.View relative w={1220} h={'auto'} >

                {/* ---------- Nav---------- */}
                <dj.FlexView relative w={'auto'} h={'auto'} style={{ backgroundColor: '#CFCDD4' }}>
                    {__________items.map((v, i) => {
                        return <NavItem
                            key={i}
                            num={i}
                            w={180}
                            h={50}
                            img={v.src}
                            title={v.title}
                            __________items={__________items}
                            subPageIndex={subPageIndex}
                            isHightLight={i === pageStore.pageIndex && !store.state.userOpen}
                            clickHandle={() => {

                                if (macroStore.recodingState === 'stop') {
                                    isKeyStore.setTextKey(false)
                                    pageStore.setPageIndex(i)
                                    isKeyStore.setIsSetFile(false)
                                    setSubPageIndex(0)
                                    if (__________items[pageStore.pageIndex].title === res.text.灯光调节_akko()) {
                                        isKeyStore.setLightKey(true)
                                        document.addEventListener('keydown', ttt)
                                    } else {
                                        isKeyStore.setLightKey(false)
                                        document.removeEventListener('keydown', ttt)
                                    }
                                    // isKeyStore.setIsSetFile(false)
                                } else {
                                    mobxStore.toastStore.setInfo(res.text.请先停止录制())
                                }
                            }} />
                    })}
                </dj.FlexView >
                {/* ---------- Nav  End ---------- */}
            </dj.View>

            {
                __________items[pageStore.pageIndex].title === res.text.配置共享_akko() &&
                <dj.View w={1100} h={35} x={60} y={80} >
                    <dj.FlexView >
                        {__________items[pageStore.pageIndex][
                            __________items[pageStore.pageIndex].changeable
                                ? deviceStore.currentDev
                                    ? deviceStore.currentDev.type
                                    : 'keyboard'
                                : 'common'
                        ].map(
                            (v, index) =>
                            (
                                <SubNavbarItem_Ajazz
                                    key={index}
                                    title={v.title}
                                    isClick={
                                        shareStore.currentShareListNum === index
                                    }
                                    clickHandle={() => {
                                        switch (index) {
                                            case 0:
                                                shareStore.setCurrentShareListNum(index)
                                                // shareStore.setCurrentShareListType('config')
                                                // shareStore.setShareListPage('config', shareStore.macrosPageType);
                                                break;
                                            case 1:
                                                shareStore.setCurrentShareListNum(index)
                                                shareStore.setCurrentShareListType('macro')
                                                shareStore.setShareListPage('macro', shareStore.macrosPageType);
                                                break;

                                        }
                                        // index === 0 && shareStore.setCurrentShareListNum(index)
                                        // index === 1 && shareStore.setCurrentShareListNum(index)
                                        // shareStore.setCurrentShareListType('config')
                                        isKeyStore.setIsSetFile(false)
                                        isKeyStore.setIsline(-1)

                                    }}
                                />
                            )
                        )}
                    </dj.FlexView>
                    <dj.Line_Ajazz lineColor={'UserCenter_ajazz'} y={34} zIndex={-1} />
                </dj.View>
            }
            {''}


            {
                deviceStore.deviceArr.length < 1 ?
                    <dj.View>
                        <dj.Text
                            w={baseW}
                            h={40}
                            x={0}
                            y={249}
                            text={res.text.欢迎使用() + kCompanyDisplayName + res.text.驱动()}
                            type={'启动页主标题_black'}>
                        </dj.Text>
                        <dj.Text
                            w={386}
                            x={407}
                            h={20}
                            y={400}
                            text={res.string.搜寻设备中}
                            type={'启动页搜索_akko'}></dj.Text>
                    </dj.View> :
                    (__________items[pageStore.pageIndex][
                        __________items[pageStore.pageIndex].changeable
                            ? deviceStore.currentDev
                                ? deviceStore.currentDev.type
                                : 'common'
                            : 'common'
                    ].length <= subPageIndex
                        ? setSubPageIndex(0)
                        : __________items[pageStore.pageIndex][
                            __________items[pageStore.pageIndex].changeable
                                ? deviceStore.currentDev
                                    ? deviceStore.currentDev.type
                                    : 'common'
                                : 'common'
                        ][
                            __________items[pageStore.pageIndex].title === res.text.配置共享_akko()
                                ? shareStore.currentShareListNum
                                : subPageIndex
                        ].jsx)

            }

            {/* </dj.View> */}

        </div >

        // {/* </dj.View> */}

    ))
}