import React, { Fragment, useState } from 'react'


import { useObserver } from 'mobx-react-lite'
import { 键鼠布局 } from '../../../../res/layout'
import { mobxStore, useStore } from '../../../../mobxStore/store'
import { dj, dj2 } from '../../../../dj'
import { homeData, HomeProp, withProps } from '../../../utils/WithProps'
import { getDevFnLayer, getDevLayer } from '../../../../unitys/getDevLyaer'
import { res } from '../../../../res'
import { getKeyPath } from '../../keyPath'
import { blockCloud } from '../../../../appConfig'
import { SubNavbarItem_Ajazz } from '../../../utils/SubNavbarItem'
import { KeySetting } from '../../keysetting/KeySetting'
import styled from '@emotion/styled'
import { BaseType } from '../../../../dj/BaseType'
import { basicFunName } from '../../keysetting/BasicFunction'


export const KeyboardBlocks = (p: {
  deviceLayout: { layout: 键鼠布局[]; delt: { deltX: number; deltY: number } }
  changedValue: {
    hid: number
    mode: { color: string; type: 'Default' | 'CustomLight' | 'CustomWeight' | 'Forbidden' }
    index?: number
  }[]
  mode: 'Home' | 'Monochrome' | 'Multicolor'
  clickHandle?: (
    keyHidCode: number,
    text: string,
    positionX: number,
    positionY: number,
    width: number,
    high: number,
    index?: number
  ) => void
  mouseDown?: (
    keyHidCode: number,
    text: string,
    positionX: number,
    positionY: number,
    width: number,
    high: number,
    index?: number
  ) => void
  mouseUp?: (
    keyHidCode: number,
    text: string,
    positionX: number,
    positionY: number,
    width: number,
    high: number,
    index?: number
  ) => void
}) => {
  const defaultMode: (
    mode: 'Home' | 'Monochrome' | 'Multicolor'
  ) => {
    color: string
    type: 'Default' | 'CustomLight' | 'CustomWeight' | 'Forbidden'
  } = (mode: 'Home' | 'Monochrome' | 'Multicolor') => {
    switch (mode) {
      case 'Home':
      default:
        return {
          color: '',
          type: 'Default',
        }
      case 'Monochrome':
        return {
          color: '#4cd7c7',
          type: 'CustomLight',
        }
    }
  }

  const getKeyNormalColor = (values: number, tmp: 键鼠布局) => {
    let mode: {
      color: string;
      type: "Default" | "CustomLight" | "CustomWeight" | "Forbidden" | "Test"
    } | undefined = {
      color: '',
      type: 'Default',
    }

    if (p.changedValue.find((v) => v.hid === tmp.value && v.index === tmp.index)?.mode) {
      mode = p.changedValue.find((v) => v.hid === tmp.value && v.index === tmp.index)?.mode
    } else {
      mode = defaultMode(p.mode)
    }

    if (
      mobxStore.pageStore.pageIndex === 0 &&
      (values === 167837696 // fn
        || values === 230 // r_alt
        || values === 41
        || values === 227
        || values === 231
        || tmp.ban ? values === tmp.value : '')
    ) {

      mode = {
        color: '#ff0000',
        type: 'Forbidden',
      }
    }

    return mode
  }

  const { isKeyStore } = useStore()

  const checkUSPIC = (value: 键鼠布局) => {
    if (value.value !== undefined) {
      if (mobxStore.pageStore.pageIndex === 0) {
        return true
      }

      if (mobxStore.pageStore.pageIndex === 1 && !value.knob) {
        return true
      }
    }
    return false
  }
  {
    return useObserver(() => {
      return (
        <Fragment>
          {p.deviceLayout.layout.map(
            (value, i) =>
              checkUSPIC(value) && (
                <dj.KeyboardBlock
                  key={i}
                  w={value.w}
                  h={value.h}
                  x={value.x + p.deviceLayout.delt.deltX}
                  y={-value.y + p.deviceLayout.delt.deltY}
                  mode={getKeyNormalColor(value.value, value)}
                  clickHandle={() => {
                    isKeyStore.setIsKnobKey(value.knob ? value.knob : false)
                    p.clickHandle ? p.clickHandle(
                      value.value,
                      value.keyName,
                      value.x + p.deviceLayout.delt.deltX,
                      -value.y + p.deviceLayout.delt.deltY,
                      value.w,
                      value.h,
                      value.index
                    ) : ''
                  }}
                  mouseDown={() => {
                    p.mouseDown ? p.mouseDown(
                      value.value,
                      value.keyName,
                      value.x + p.deviceLayout.delt.deltX,
                      -value.y + p.deviceLayout.delt.deltY,
                      value.w,
                      value.h,
                      value.index
                    ) : ''
                  }}
                  mouseUp={() => {
                    p.mouseUp ? p.mouseUp(
                      value.value,
                      value.keyName,
                      value.x + p.deviceLayout.delt.deltX,
                      -value.y + p.deviceLayout.delt.deltY,
                      value.w,
                      value.h,
                      value.index
                    ) : ''
                  }}
                />
              )
          )}
        </Fragment>
      )
    })
  }
}

export const NavItem = (p: {
  w: number
  h: number
  num: number
  title: React.ReactNode
  img?: BaseType.ButtonStateImg
  isHightLight: boolean
  clickHandle: () => void
  // showLitItem: boolean
}) => {
  const Item = styled.div({
    position: 'relative',
    backgroundColor: `${p.isHightLight ? '#fff' : ''}`,
    // borderRadius: '12px',
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
      fontFamily: 'OpenSans-Regular', fontSize: 18,
      color: p.isHightLight
        ? '#7a6caa'
        : '#515150'
    },
    '&:hover .text': {
      color: '#7a6caa'
    },
    '&:hover': {
      backgroundColor: '#fff',
      // borderRadius: '12px',
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
        // marginLeft: p.num === 0 ? 70 : 0,
        marginTop: 10,
        marginBottom: 10,
        // zIndex: p.isHightLight ? 2 : 1,
        display: 'inline-block',
        borderBottom: p.isHightLight ? '3px solid #655b87' : '1px solid #000'
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
        {p.img && <div className={"image"} style={{ width: 16, height: 16, marginRight: 10, backgroundRepeat: 'no-repeat', backgroundSize: ' 100% 100%' }} />}

        <p className={"text"} style={{ lineHeight: '31px' }}>{p.title}</p>
      </div>
    </Item>

  ))
}


const KeyboardBase = (p: HomeProp) => {

  const [state, setState] = useState<{
    open: boolean,
    keyHidCode: number,
    text: string,
    index: number | undefined
  }>({ open: false, keyHidCode: 0, text: '', index: undefined })
  const { deviceStore, macroStore, keySettingStore } = useStore()
  //console.log('device name', p.deviceName)
  const len = getDevLayer(deviceStore.currentDev?.deviceType.id!)
  const changeList = new Array()
  for (var i = 0; i < len; i++) {
    changeList.push(res.text.标准层() + '_' + (i + 1))
  }

  const fnLen = getDevFnLayer(deviceStore.currentDev?.deviceType.id!)
  // const fnChangeList = new Array()
  // for (var i = 0; i < fnLen; i++) {
  //   fnChangeList.push(res.text.Fn层() + '_' + (i + 1))
  // }
  const fnChangeList = new Array()
  for (var i = 0; i < fnLen; i++) {
    if (i == 1)
      fnChangeList.push('Alt + ' + res.text.Fn层())
    else
      fnChangeList.push(res.text.Fn层())
  }
  // console.error('device name', p.deviceName)
  // console.error('__dirname', __dirname)

  const keyPath = getKeyPath()


  const { isKeyStore, otherStore } = useStore()

  let settings = process.platform === 'darwin' ?
    [res.string.组合键, res.string.宏]
    : [res.string.按键灵敏度, res.string.组合键, res.string.宏, res.string.基本功能, res.string.鼠标]

  const keysettingNav = fnLen == 0 ? len > 1 && !deviceStore.isFnMode ? [res.string.常规_akko] : [] : [res.string.常规_akko, res.string.Fn层];

  //31 combo 4
  const getKeyColor = (keyHidCode: number, type: string, key: any) => {
    for (let i = 0; i < p.deviceLayout.layout.length; i++) {
      const v = p.deviceLayout.layout[i]
      if (v.value === keyHidCode && v.knob && deviceStore.isFnMode) {
        return '#ff0000'
      }
    }

    if (
      keyHidCode === 230 // r_alt
      || keyHidCode === 167837696 // fn
      || keyHidCode === 41
      || keyHidCode === 227
      || keyHidCode === 231
      // || (keyHidCode === 41 
      //   && !(deviceStore.fnIndex === 1))
    ) {
      return '#ff0000'
    }

    if (type == "ConfigUnknown" && deviceStore.isFnMode && deviceStore.fnIndex === 0) {
      return '#ff0000'
    }

    if (type === 'forbidden') {
      return '#ffff00'
    }

    if (type === 'ConfigFunction' && (basicFunName.findIndex(v => v === key) === -1)) {
      return '#ff0000'
    }

    return '#7a6aac'
  }

  return useObserver(() => {
    return (
      <Fragment>
        <dj.View h={538} y={70}>
          {/* <dj.View form='setBackground' w={241} h={510}>
            <dj.View y={15} h={20} >
              <dj.Text text={res.string.配置层_Ajazz} type={'子侧边栏'} x={25} />
              <dj.Img imgBg={res.img.ajazzImg.double_arrow.hover} w={12} h={10} x={206} y={6} />
            </dj.View>
            <dj.View y={49} h={20}>
              <dj.Text text={res.string.设备_Ajazz} type={'描述'} x={25} />
            </dj.View>
            <dj.View y={77} h={20}>
              <dj.Img imgBg={res.img.ajazzImg['KB_ device'].normal} w={25} h={11} type={'完全装入'} x={29} y={5} />
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
                    isKeyStore.setIsOpen(false);
                    if (index !== deviceStore.currentProfile) {
                      deviceStore.setCurrentProfile(index)
                    }
                  }}
                  modes={changeList}
                />
              </dj.View>
            }
          </dj.View> */}

          {/* {fnLen !== 0 &&
            <dj.View
              h={20}
              x={306}
              y={10}>
              <dj.Text
                w={60}
                x={0}
                type={'SubTitle'}
                text={res.text.Fn层()}
              />
              <dj.SwitchButton
                x={blockCloud ? 60 : 50}
                skey={deviceStore.isFnMode}
                clickHandle={() => {
                  deviceStore.setIsFnMode(!deviceStore.isFnMode)
                }} />
            </dj.View>
          } */}

          {/* {fnLen > 1 && deviceStore.isFnMode &&
            <dj.View w={132} h={28} x={940} y={8}>
              <dj.ComboBox
                w={132}
                selectedValue={fnChangeList[deviceStore.fnIndex]}
                onChange={(index) => {
                  if (index !== deviceStore.fnIndex) deviceStore.setCurrentFnIndex(index)
                }}
                modes={fnChangeList}
                clickHandle={() => { }}
              />
            </dj.View>
          } */}

          <dj.View w={871} h={288} x={len > 1 ? 0 : 185} y={78}>
            <dj.Img
              w={871}
              h={288}
              imgBg={
                p.deviceName ? keyPath : res.img.ajazzImg['AK27-2']
              }
              type={'完全覆盖背景区'}
            />
            <KeyboardBlocks
              deviceLayout={p.deviceLayout}
              changedValue={p.keyValue.map((v) => {
                return {
                  index: v.index,
                  hid: v.original,
                  mode: {
                    color: getKeyColor(v.original, v.type, v.key),
                    type: 'CustomLight',
                  },
                }
              })}
              clickHandle={(keyHidCode: number, text: string, positionX: number, positionY: number, width: number, high: number, index?: number | undefined) => {
                const tmp = p.keyValue.find(v => v.original === keyHidCode && v.index === index);
                // console.error(keyHidCode, index, tmp);

                if (
                  keyHidCode === 230 // r_alt
                  || keyHidCode === 167837696 // fn
                  || (keyHidCode === 41)
                  || (keyHidCode === 227)//win
                  || keyHidCode === 231
                  // || (keyHidCode === 0x0a0f0000)//音量<->键盘亮度
                ) {
                  mobxStore.toastStore.setErr(res.text.系统按键无法修改())
                  return;
                }
                // fn旋钮
                for (let i = 0; i < p.deviceLayout.layout.length; i++) {
                  const v = p.deviceLayout.layout[i]
                  if (v.value === keyHidCode && v.knob && deviceStore.isFnMode) {
                    mobxStore.toastStore.setErr(res.text.系统按键无法修改())
                    return
                  }
                  if (v.value === keyHidCode && v.ban) {
                    mobxStore.toastStore.setErr(res.text.系统按键无法修改())
                    return
                  }
                }

                if (tmp?.type === 'ConfigUnknown' && deviceStore.isFnMode && deviceStore.fnIndex === 0) {
                  mobxStore.toastStore.setErr(res.text.系统按键无法修改())
                  return
                }

                if (tmp?.type === 'ConfigFunction' && (basicFunName.findIndex(v => v === tmp?.key) === -1)) {//fn键
                  mobxStore.toastStore.setErr(res.text.系统按键无法修改())
                  return
                }

                setState({ open: true, keyHidCode: keyHidCode, text: text, index: index })
                isKeyStore.setIsOpen(true)
              }}
              mode={'Home'}
            />
          </dj.View>
          <dj.View
            h={20}
            y={380}
          >
            <dj.Text h={21} x={85} type={'SubTitle_akko'} text={res.string.带} />
            <dj.Button w={14} h={14} x={105} y={5} mode={'KeyboardExample_akko'} />
            <dj.Text
              h={21}
              x={121}
              type={'SubTitle_akko'}
              text={res.string.背景的按键表示该按键的默认功能已被更改}
            />
          </dj.View>


          {isKeyStore.keyIsOpen && (
            <dj2.View2 w={1220} h={736} y={-146} zIndex={99}>
              <KeySetting
                keyHidCode={state.keyHidCode}
                title={state.text}
                oldValue={p.keyValue.find((v) => v.original === state.keyHidCode && v.index === state.index)}
                closeHandle={() => {
                  setState({ open: false, keyHidCode: 0, text: '', index: undefined })
                  isKeyStore.setIsOpen(false)
                }}
                index={state.index}
              />
            </dj2.View2>
          )}


          <dj.View w={344} h={350} x={872} y={78}>
            {
              keysettingNav.map((v, i) => {
                return <NavItem
                  key={i}
                  num={i}
                  w={172}
                  h={33}
                  title={v}
                  isHightLight={i == keySettingStore.currentSelcetSettingsIndex}
                  clickHandle={() => {
                    if (keySettingStore.currentSelcetSettingsIndex != i) {
                      keySettingStore.currentSelcetSettingsIndex = i;
                      i == 0 && deviceStore.setIsFnMode(false)
                      i == 1 && deviceStore.setIsFnMode(true)
                      // deviceStore.setIsFnMode(!deviceStore.isFnMode)
                    }
                  }}
                />
              })
            }
            {
              !deviceStore.isFnMode ?
                <dj.View h={165} y={55}>
                  {len > 1 && !deviceStore.isFnMode &&
                    <dj.ComboBox_akko
                      clickHandle={(index) => {
                        isKeyStore.setIsOpen(false);
                        if (index !== deviceStore.currentProfile) {
                          deviceStore.setCurrentProfile(index)
                        }
                      }}
                      modes={changeList}
                    />
                  }
                </dj.View>
                : fnChangeList.map((v, i) => {
                  return (
                    <dj.Button
                      display='inline-block'
                      key={i}
                      isHightLight={deviceStore.fnIndex === i}
                      relative
                      w={blockCloud ? 151 : 135}
                      h={45}
                      marginRight={15}
                      mode={'akko_btn'}
                      text={v}
                      clickHandle={() => {
                        if (i !== deviceStore.fnIndex) deviceStore.setCurrentFnIndex(i)
                      }}
                    />
                  )
                })
            }

            {
              deviceStore.currentDev?.deviceType.otherSetting?.deBounce
                ?
                <dj.View w={334} h={65} y={220}>
                  <dj.Text
                    w={blockCloud ? 220 : 130}
                    x={15}
                    type={'SubTitle_akko'}
                    text={res.string.按键灵敏度}
                    isDisabled={false}
                  />
                  <dj.KeyboardRange
                    // x={blockCloud ? 110 : 65}
                    x={15}
                    y={40}
                    min={1}
                    max={10}
                    step={1}
                    leftDescription={res.text.快()}
                    rightDescription={res.text.慢()}
                    value={
                      otherStore.currentOther.deBounce === undefined
                        ? 1
                        :
                        otherStore.currentOther.deBounce > deviceStore.currentDev?.deviceType.otherSetting?.deBounce!
                          ? deviceStore.currentDev?.deviceType.otherSetting?.deBounce!
                          : otherStore.currentOther.deBounce!
                    }
                    setValue={(value) => {
                      // if (value === 0) {
                      //   deviceStore.setDeBounce(1)
                      //   return
                      // }
                      deviceStore.setDeBounce(value)
                    }}
                    isDisabled={false}
                  />
                </dj.View>
                : null
            }

          </dj.View>


        </dj.View>
      </Fragment >
    )
  })
  // })
}

export const KeyboardHome_ajazz = withProps(KeyboardBase, homeData)
