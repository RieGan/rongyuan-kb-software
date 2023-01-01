import React from 'react'

import { remote } from 'electron'

import { useObserver } from 'mobx-react-lite'
import { store } from '../../store'
import { useStore } from '../../../mobxStore/store'
import { urlStr, topnav_logo_p, blockCloud } from '../../../appConfig'
import { dj } from '../../../dj'
import { res } from '../../../res'
import { Register } from '../user/Register'

export const Top_akko = () => {
    const { userStore, isKeyStore, deviceStore, batteryStore } = useStore()

    isKeyStore.setLoginTipBoxKey(store.state.userOpen)
    return useObserver(() => (
        <dj.View w={1220} h={70} drag={true}>
            <div style={{
                width: '100%',
                height: '100%',
                // background: 'linear-gradient(to right,#9533f3 15%,#bb40c7 30%,#6215c8)'
            }}>

                {/* <dj.Img w={35} h={29} x={42} y={20} imgBg={urlStr(topnav_logo_p)}></dj.Img> */}
                <dj.Img w={150} h={46} x={57} y={13} imgBg={res.img.ajazzImg.top_logo}></dj.Img>
                {(deviceStore.currentDev?.deviceType.is24|| deviceStore.currentDev?.deviceType.otherSetting?.isblue)
                    && batteryStore.battery !== undefined && <dj.FlexView
                        w={200}
                        h={20}
                        x={881}
                        y={24}
                        justifyContent={'flex-start'}>
                        <dj.Text relative w={35} h={18} type={'键盘提示'} text={batteryStore.battery.battery + "%"} />
                        <div style={{ position: 'absolute', left: 34, top: 2 }}>
                            <img style={{ display: 'block', width: 42, height: 'auto' }} src={res.img.battery.battery_0} />
                            <div style={{
                                position: 'absolute',
                                left: 11,
                                top: 3,
                                width: Math.ceil(batteryStore.battery.battery / 100 * 18),
                                height: 8,
                                backgroundColor: batteryStore.battery.battery > 20
                                    ? `rgba(25,249,226,${batteryStore.battery?.state === 1 ? 0.5 : 1})`
                                    : `rgba(255,204,0,${batteryStore.battery?.state === 1 ? 0.5 : 1})`
                            }} />
                            {batteryStore.battery?.state === 1 && <img style={{
                                display: 'block',
                                position: 'absolute',
                                top: -1,
                                left: 12,
                                width: 16,
                                transform: batteryStore.battery?.state === 1 ? 'rotate(90deg)' : 'rotate(0deg)'
                            }} src={res.img.top_charge} />}
                        </div>
                    </dj.FlexView>
                }

                {userStore.user === undefined ? (
                    !blockCloud && (
                        <dj.FlexView
                            x={968}
                            y={22}
                            w={70}
                            h={26}
                            justifyContent={'space-between'}
                        >
                            <dj.Button
                                w={40}
                                isHightLight={false}
                                mode={'Username'}
                                text={'登录'}
                                clickHandle={() => {
                                    isKeyStore.setTextKey(false)
                                    store.setState.userOpen(true)
                                }}
                            />
                            <dj.Button
                                w={40}
                                x={60}
                                isHightLight={false}
                                mode={'Username'}
                                text={'注册'}
                                clickHandle={() => {
                                    store.setState.user_UI(<Register />)
                                    isKeyStore.setTextKey(false)
                                    store.setState.userOpen(true)
                                }
                                }
                            />
                        </dj.FlexView>

                    )
                ) : (
                    <dj.TextEll
                        w={100}
                        h={20}
                        x={968}
                        y={21}
                        type={'SubTitle'}
                        text={!blockCloud ? userStore.user.name : ''} />
                )
                }
                {/* 最小化功能 */}
                {/* <dj.Button
                        w={13}
                        h={13}
                        x={1122}
                        y={23}
                        img={{
                        size: {
                            w: 13,
                            h: 13,
                        },
                        src: res.img.close,
                        }}
                        clickHandle={() => remote.getCurrentWindow().minimize()}
                    /> */}
                <dj.Button
                    w={13}
                    h={13}
                    x={1135}
                    y={34}
                    img={{
                        size: {
                            w: 13,
                            h: 13,
                        },
                        src: res.img.minimize,
                    }}
                    clickHandle={() => remote.getCurrentWindow().hide()}
                />
                <dj.Button
                    w={13}
                    h={13}
                    x={1170}
                    y={30}
                    img={{
                        size: {
                            w: 13,
                            h: 13,
                        },
                        src: res.img.close,
                    }}
                    clickHandle={() => remote.getCurrentWindow().close()}
                />
            </div>

        </dj.View>
    ))
}