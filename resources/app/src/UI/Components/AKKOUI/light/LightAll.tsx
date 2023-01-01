import { useObserver } from "mobx-react-lite"
import React from 'react'
import { blockCloud } from "../../../../appConfig"
import { dj } from "../../../../dj"
import { useStore } from "../../../../mobxStore/store"
import { res } from "../../../../res"
import { getDevLayer } from "../../../../unitys/getDevLyaer"
import { SubNavbarItem_Ajazz } from "../../../utils/SubNavbarItem"
import { getKeyPath } from "../../keyPath"
import { NavItem } from "../home/Keyboard"
import { LEDRGBLight } from "./LEDLight"
import { RGBLight } from "./Light"
import { KeyboardSleep } from "./SleepUI"


export const LightAll = () => {
    const { deviceStore, lightPageStore, isKeyStore } = useStore()
    const keyPath = getKeyPath();
    const len = getDevLayer(deviceStore.currentDev?.deviceType.id!)
    const changeList = new Array()
    for (var i = 0; i < len; i++) {
        changeList.push(res.text.标准层() + '_' + (i + 1))
    }
    const itemsUi: {
        title: React.ReactNode
        jsx: React.ReactNode
    }[] = [
            {
                title: res.text.灯光(),
                jsx: < RGBLight />
            }
        ]
    if (deviceStore.currentDev?.deviceType.logoLayout) {
        itemsUi.push({ title: res.string.灯带_akko, jsx: <LEDRGBLight /> })
    }

    if (deviceStore.currentDev?.deviceType.otherSetting?.sleep_24 || deviceStore.currentDev?.deviceType.otherSetting?.sleep_bt)
        itemsUi.push({ title: res.text.睡眠设置(), jsx: <KeyboardSleep /> })
    return useObserver(() => {
        return (
            <dj.View h={538} y={70} >
                {/* <dj.View form='setBackground' w={241} h={510}>
                    <dj.View y={15} h={20} >
                        <dj.Text text={res.string.配置层_Ajazz} type={'子侧边栏'} x={25} />
                        <dj.Img imgBg={res.img.ajazzImg.double_arrow.hover} w={12} h={10} x={206} y={6} />
                    </dj.View>
                    <dj.View y={49} h={20}>
                        <dj.Text text={res.string.设备_Ajazz} type={'描述'} x={25} />
                    </dj.View>
                    <dj.View y={77} h={20}>
                        <dj.Img imgBg={res.img.ajazzImg['KB01_ device'].normal} w={22} h={13} type={'完全装入'} x={29} y={5} />
                        <dj.Text text={deviceStore.currentConfig.name} type={'描述'} x={59} h={20} />
                    </dj.View>
                    <dj.View y={110} h={20}>
                        <dj.Img imgBg={res.img.ajazzImg['arrow _down'].normal} w={12} h={12} x={25} y={6} type={'完全装入'} />
                        <dj.Text text={res.string.库_Ajazz} type={'描述'} x={50} />
                    </dj.View>
                    {len > 1 && !deviceStore.isFnMode && 
                    <dj.View y={140}>
                        <dj.ComboBox_Ajazz
                            clickHandle={(index) => {
                                if (index !== deviceStore.currentProfile) {
                                    deviceStore.setCurrentProfile(index)
                                }
                            }}
                            modes={changeList}
                        />
                    </dj.View>
                     } 

                </dj.View> */}
                {/* 键盘图 */}
                <dj.Img
                    w={871}
                    h={288}
                    y={78}
                    imgBg={keyPath}
                />
                <dj.View w={blockCloud ? 333 : 330} h={500} x={880} y={40} >
                    {/* <dj.FlexView
                        h={28}
                        x={55}
                        alignItems={'center'}>
                        {
                            itemsUi.map((v, i) => (
                                <SubNavbarItem_Ajazz
                                    key={i}
                                    title={v.title}
                                    isClick={lightPageStore.pageIndex === i}
                                    clickHandle={() => {
                                        i <= 2 && lightPageStore.setPageIndex(i)
                                        isKeyStore.setIsSetFile(false)

                                    }}
                                />

                            ))
                        }
                    </dj.FlexView> */}
                    {
                        itemsUi.map((v, i) => {
                            return <NavItem
                                key={i}
                                num={i}
                                w={itemsUi.length >= 3 ? 105 : 165}
                                h={33}
                                title={v.title}
                                isHightLight={lightPageStore.pageIndex === i}
                                clickHandle={() => {
                                    i <= 2 && lightPageStore.setPageIndex(i)
                                    isKeyStore.setIsSetFile(false)
                                }}
                            />
                        })
                    }
                    <dj.View w={'100%'} h={'70%'} y={45}>
                        {
                            itemsUi[lightPageStore.pageIndex].jsx
                        }
                    </dj.View>
                </dj.View>
            </dj.View>
        )
    })

}