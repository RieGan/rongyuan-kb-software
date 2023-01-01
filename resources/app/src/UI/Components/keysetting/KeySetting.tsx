import React, { Fragment, useState, useEffect } from 'react'
import { dj } from '../../../dj'
import { res } from '../../../res'
import { BasicFunction } from './BasicFunction'
import { KeyCombination } from './KeyCombination'
import { MacroEdit } from './MacroEdit'

import { mobxStore, useStore } from '../../../mobxStore/store'
import { Macro } from '../../../sdk/DB/entity/macro'
import { useObserver } from 'mobx-react-lite'


import { autorun } from 'mobx'
import { MouseKey } from '../../../sdk/DriverIO/DeviceAPI/DeviceInterface'
import { MouseClickCom } from './mouseClickCom'
import { FnFunction } from './FnFunction'
import { blockCloud } from '../../../appConfig'
import { supportYC500Dev } from '../../../supportYC500Dev'
import { equals } from 'ramda'
import { macChange } from '../../../res/映射'

let settings =
  process.platform === 'darwin' ?
    [res.string.组合键, res.string.宏]
    : [res.string.组合键, res.string.宏, res.string.基本功能, res.string.鼠标]

const getSpecialKeyHidCode = (key: SpecialKey) => {
  let value = 0
  switch (key) {
    case 'ctrl':
      value = 224
      break
    case 'alt':
      value = 226
      break
    case 'shift':
      value = 0xe1
      break
    case 'win':
      value = 227
      break
    default:
      value = 0
      break
  }
  return value
}

const getPageIndex = (
  oldValue: ConfigValue | undefined
) => {
  // if (oldValue?.type === 'ConfigFunction' && oldValue.key in fnShowItems) return 4
  if (process.platform === 'darwin') {
    switch (oldValue?.type) {
      case 'ConfigMacro':
        return 1
      default:
        return 0
    }
  } else {
    switch (oldValue?.type) {
      case 'ConfigMacro':
        return 1
      case 'ConfigFunction':
        return 2
      case 'ConfigChangeToMouseBtn':
        return 3
      default:
        return 0
    }
  }

}


export const KeySetting = (p: {
  keyHidCode: number
  oldValue: ConfigValue | undefined
  closeHandle: () => void
  title: string
  index?: number
}) => {
  const [pageIndex, setPageIndex] = useState(getPageIndex(p.oldValue))
  const [forbidenKey, setForbidenKey] = useState(
    p.oldValue ? p.oldValue.type === 'forbidden' : false
  )
  const [forbidenIsClick, setForbidenIsClick] = useState(false)
  const [combination, setCombination] = useState<{
    hid: number
    specialKey1: SpecialKey
    specialKey2: SpecialKey
  }>({
    hid: 0,
    specialKey1: 'none',
    specialKey2: 'none',
  })

  const [macro, setMacro] = useState<Macro>()
  const [basic, setBasic] = useState<SpecialFuntion>()
  const [cMouse, setcMouse] = useState<MouseKey>()
  const [func, setFunc] = useState<SpecialFuntion>()
  const { deviceStore, macroStore } = useStore()

  useEffect(
    () =>
      autorun(() => {
        macroStore.refreshMacroList()
      }),
    []
  )


  let keyNameSp1 = ''
  let keyNameSp2 = ''
  //键盘首字母大写

  if (res.映射.hidCodeMapKeyName(p.keyHidCode) !== undefined) {
    keyNameSp1 = combination.specialKey1.substring(0, 1).toUpperCase() + combination.specialKey1.substring(1)
    keyNameSp2 = combination.specialKey2.substring(0, 1).toUpperCase() + combination.specialKey2.substring(1)
  }
  const setKeyCombination = () => {
    if (
      combination.hid === 0 &&
      combination.specialKey1 === 'none' &&
      combination.specialKey2 === 'none'
    )
      return


    const isAll =
      combination.specialKey1 !== 'none' && combination.specialKey2 !== 'none'
    let sKey: SpecialKey =
      combination.specialKey1 === 'none'
        ? combination.specialKey2
        : combination.specialKey1
    let key1 = isAll
      ? getSpecialKeyHidCode(combination.specialKey2)
      : combination.hid
    let key2 = isAll ? combination.hid : 0



    const value: ConfigCombo = {
      type: 'combo',
      original: p.keyHidCode,
      skey: key1 == 167837696 ? "none" : sKey,
      key: key1,
      key2: key1 == 167837696 ? 0 : key2,
      index: p.index
    }
    // console.error('value',value);
    // console.error('combination.specialKey1',combination.specialKey1);
    // console.error('combination.specialKey2',combination.specialKey2);
    // console.error('combination.hid',combination.hid);
    // console.error('res.映射.hidCodeMapKeyName(p.keyHidCode)',res.映射.hidCodeMapKeyName(p.keyHidCode));
    // console.error(res.映射.hidCodeMapKeyName(combination.hid));



    if (keyNameSp1 === res.映射.hidCodeMapKeyName(p.keyHidCode) && combination.specialKey2 === 'none' && combination.hid === 0) {
      return
    } else if (combination.specialKey1 === 'none' && combination.specialKey2 === 'none' && res.映射.hidCodeMapKeyName(combination.hid) === res.映射.hidCodeMapKeyName(p.keyHidCode)) {
      return
    } else if (combination.specialKey1 === 'none' && keyNameSp2 === res.映射.hidCodeMapKeyName(p.keyHidCode) && combination.hid === 0) {
      return
    } else if ((combination.specialKey1 === 'none' && keyNameSp2 === res.映射.hidCodeMapKeyName(combination.hid)) || (combination.specialKey2 === 'none' && keyNameSp1 === res.映射.hidCodeMapKeyName(combination.hid))) {
      mobxStore.toastStore.setErr(res.text.同组合键())
      return
    } else {
      if (supportYC500Dev.some(v => equals(v.id, deviceStore.currentDev?.deviceType.id))) {
        deviceStore.setKeyConfigSimple(value)
        return
      }
      deviceStore.setKeyConfig(value)
    }
  }

  const setMacroEdit = () => {
    if (macro === undefined) return
    if (macro.value === undefined) {
      macro.value = {
        type: 'ConfigMacro',
        original: p.keyHidCode,
        macroType: 'touch_repeat',
        repeatCount: 0,
        macro: [],
        index: p.index
      }
    }

    macro.value.original = p.keyHidCode
    macro.value.index = p.index
    if (supportYC500Dev.some(v => equals(v.id, deviceStore.currentDev?.deviceType.id))) {
      deviceStore.setKeyConfigSimple({ ...macro.value })
      return
    }
    deviceStore.setKeyConfig({ ...macro.value })
  }

  const setBasicFunction = () => {
    if (basic === undefined) return
    const value: ConfigFunction = {
      original: p.keyHidCode,
      type: 'ConfigFunction',
      key: basic,
      index: p.index
    }
    if (supportYC500Dev.some(v => equals(v.id, deviceStore.currentDev?.deviceType.id))) {
      deviceStore.setKeyConfigSimple(value)
      return
    }
    deviceStore.setKeyConfig(value)
  }
  const setMouseCom = () => {
    if (cMouse === undefined) return
    const value: ConfigChangeToMouseBtn = {
      original: p.keyHidCode,
      type: 'ConfigChangeToMouseBtn',
      key: cMouse,
      index: p.index
    }
    if (supportYC500Dev.some(v => equals(v.id, deviceStore.currentDev?.deviceType.id))) {
      deviceStore.setKeyConfigSimple(value)
      return
    }
    deviceStore.setKeyConfig(value)
  }
  const setFnFunction = () => {
    if (func === undefined) return
    const value: ConfigFunction = {
      original: p.keyHidCode,
      type: 'ConfigFunction',
      key: func,
      index: p.index
    }
    if (supportYC500Dev.some(v => equals(v.id, deviceStore.currentDev?.deviceType.id))) {
      deviceStore.setKeyConfigSimple(value)
      return
    }
    deviceStore.setKeyConfig(value)
  }

  const setRecover = () => {
    const value: ConfigCombo = {
      type: 'combo',
      original: p.keyHidCode,
      skey: 'none',
      key: p.keyHidCode,
      key2: 0,
      index: p.index
    }
    if (supportYC500Dev.some(v => equals(v.id, deviceStore.currentDev?.deviceType.id))) {
      deviceStore.setKeyConfigSimple(value)
      return
    }
    deviceStore.setKeyConfig(value)
  }

  const setForbidden = () => {
    const value: ConfigForbidden = {
      type: 'forbidden',
      original: p.keyHidCode,
      index: p.index
    }
    //console.error('VVVVVVVVVVAAAAAAAALLLLLLLUUUUUEEEEEEE',value);
    if (supportYC500Dev.some(v => equals(v.id, deviceStore.currentDev?.deviceType.id))) {
      deviceStore.setKeyConfigSimple(value)
      return
    }
    deviceStore.setKeyConfig(value)
  }
  const { isKeyStore } = useStore()
  if (!isKeyStore.keyIsOpen) {
    macroStore.stopMouseEvent()
  }
  // settings = getDevFnLayer(deviceStore.currentDev?.deviceType.id!) === 0
  //   ? settings
  //   : [res.string.组合键, res.string.宏, res.string.基本功能, res.string.鼠标, res.string.Fn功能]
  return useObserver(() => (
    <Fragment>
      <dj.View form={'背景页'} drag={true}>
        {''}
      </dj.View>
      <dj.View w={480} h={431} x={360} y={150} form={'弹出框'}>
        <dj.Text h={30} y={24} text={p.title + res.text.键设置()} type={'弹框标题'} />
        <dj.Line y={65} lineColor={'按键设置'} />
        <dj.Button
          x={428}
          y={28}
          w={12}
          h={12}
          img={{ size: { w: 12, h: 12 }, src: res.img.close }}
          clickHandle={() => {
            p.closeHandle()
            macroStore.stoptHook()
          }}
        />
        <dj.FlexView
          w={blockCloud ? 380 : 300}
          h={36}
          x={blockCloud ? 53 : 91}
          y={74}
          justifyContent={'space-between'}
          alignItems={'center'}>
          {settings.map((value, index) => (
            <dj.Button
              relative
              key={index}
              isHightLight={pageIndex === index}
              w={'auto'}
              mode={'按键设置'}
              text={value}
              clickHandle={() => {
                macroStore.stoptHook()
                if (index === 4 && !deviceStore.isFnMode) {
                  mobxStore.toastStore.setErr(res.text.需先开启Fn层())
                  return;
                }
                setPageIndex(index)
              }}
            />
          ))}
        </dj.FlexView>
        <dj.View w={399} h={218} x={41} y={132} form={'DefaultBackground'}>
          {settings[pageIndex] === res.string.组合键 ? (
            <KeyCombination
              Cvalue={combination}
              setCValue={(
                hid: number,
                specialKey1: SpecialKey,
                specialKey2: SpecialKey
              ) => {
                setCombination({
                  hid: hid,
                  specialKey1: specialKey1,
                  specialKey2: specialKey2,
                })
                setForbidenKey(false)
              }}
              oldValue={
                p.oldValue
                  ? p.oldValue.type === 'combo'
                    ? p.oldValue
                    : undefined
                  : undefined
              }
              forBidden={forbidenKey}
            />
          ) : null}
          {settings[pageIndex] === res.string.宏 && (
            <MacroEdit
              setMacro={(macro: Macro | undefined) => {
                setMacro(macro)
                setForbidenKey(false)
              }}
              forBidden={forbidenKey}
            />
          )}
          {settings[pageIndex] === res.string.基本功能 && (
            <BasicFunction
              basic={basic}
              setBasic={(basic: SpecialFuntion | undefined) => {
                setBasic(basic)
                setForbidenKey(false)
              }}
              oldValue={
                p.oldValue
                  ? p.oldValue.type === 'ConfigFunction'
                    ? p.oldValue
                    : undefined
                  : undefined
              }
              forBidden={forbidenKey}
            />
          )}
          {settings[pageIndex] === res.string.鼠标 && (
            <MouseClickCom
              cMouse={cMouse}
              setcMouse={(key: MouseKey | undefined) => {
                setcMouse(key)
                setForbidenKey(false)
              }}
              oldValue={
                p.oldValue
                  ? p.oldValue.type === 'ConfigChangeToMouseBtn'
                    ? p.oldValue
                    : undefined
                  : undefined
              }
              forBidden={forbidenKey}
            ></MouseClickCom>
          )}
          {settings[pageIndex] === res.string.Fn功能 && (
            <FnFunction
              func={func}
              setFunc={(func: SpecialFuntion | undefined) => setFunc(func)}
              oldValue={
                p.oldValue
                  ? p.oldValue.type === 'ConfigFunction'
                    ? p.oldValue
                    : undefined
                  : undefined
              }
              forBidden={!forbidenKey}
            />
          )}
        </dj.View>
        <dj.CheckBox
          w={blockCloud ? 170 : 114}
          h={16}
          x={44}
          y={371}
          type={'Normal'}
          // text={res.string.禁用按键}
          text={deviceStore.isFnMode ? res.string.未设置功能 : res.string.禁用按键}
          checkState={forbidenKey}
          clickHandle={() => {
            macroStore.stoptHook()
            setForbidenKey(!forbidenKey)
            setForbidenIsClick(forbidenKey)
          }}
        />
        <dj.Button
          w={84}
          h={30}
          x={258}
          y={366}
          mode={'Border'}
          text={res.string.恢复默认}
          clickHandle={() => {
            macroStore.stoptHook()
            setRecover()
            p.closeHandle()
          }}
        />
        <dj.Button
          w={84}
          h={30}
          x={356}
          y={367}
          mode={'Sparker'}
          text={res.string.确定}
          clickHandle={async () => {
            // console.error(keyNameSp1+keyNameSp2);
            // console.error(combination);


            macroStore.stoptHook()
            // console.error(!forbidenKey && forbidenIsClick, forbidenIsClick);

            if (forbidenKey === true) {
              setForbidden()
              p.closeHandle()
              return
            }
            // else if (forbidenKey === false) {
            //   // console.error('combcomb', combination);
            //   // console.error(macro);
            //   // console.error('basicbasic', basic);
            //   // console.error(cMouse);
            //   if (!forbidenKey && forbidenIsClick) {
            //     setRecover()
            //   }
            //   p.closeHandle()
            //   return
            // }
            if (settings[pageIndex] === res.string.组合键) {
              if (combination.hid !== 0 || combination.specialKey1 !== 'none' || combination.specialKey2 !== 'none') {
                if (
                  (keyNameSp1 === res.映射.hidCodeMapKeyName(p.keyHidCode) && combination.specialKey2 === 'none' && combination.hid === 0)
                  || (combination.specialKey1 === 'none' && combination.specialKey2 === 'none' && res.映射.hidCodeMapKeyName(combination.hid) === res.映射.hidCodeMapKeyName(p.keyHidCode))
                  || (combination.specialKey1 === 'none' && keyNameSp2 === res.映射.hidCodeMapKeyName(p.keyHidCode) && combination.hid === 0)
                ) {
                  setRecover()
                  p.closeHandle()
                  return
                } else {
                  if (settings[pageIndex] === res.string.组合键) {
                    setKeyCombination()
                    p.closeHandle()
                    return
                  }
                }
              }
            }
            if (settings[pageIndex] === res.string.宏) {
              if (macro) {
                setMacroEdit()
                p.closeHandle()
                return
              }
            }
            if (settings[pageIndex] === res.string.基本功能) {
              if (basic) {
                setBasicFunction()
                p.closeHandle()
                return
              }
            }
            if (settings[pageIndex] === res.string.鼠标) {
              if (cMouse) {
                setMouseCom()
                p.closeHandle()
                return
              }
            }
            if (settings[pageIndex] === res.string.Fn功能) {
              if (func) {
                setFnFunction()
                p.closeHandle()
                return
              }
            }
            if (!forbidenKey && forbidenIsClick) {
              setRecover()
            }
            p.closeHandle()
          }}
        />
      </dj.View>
    </Fragment>
  ))
}
