import React, { Fragment, useEffect, useState } from 'react'
import { dj, dj2 } from '../../../dj'
import { res } from '../../../res'
import { useStore } from '../../../mobxStore/store'
import { useObserver } from 'mobx-react-lite'
import { autorun } from 'mobx'
import { MouseKey } from '../../../sdk/DriverIO/DeviceAPI/DeviceInterface'
import { List2 } from '../../../dj/List'
import { getKeyboradList, macChange } from '../../../res/映射'

export const KeyCombination = (p: {
  Cvalue: {
    hid: number
    specialKey1: SpecialKey
    specialKey2: SpecialKey
  }
  setCValue: (
    hid: number,
    specialKey1: SpecialKey,
    specialKey2: SpecialKey
  ) => void
  oldValue: ConfigCombo | undefined
  forBidden: boolean
}) => {
  const { macroStore } = useStore()
  const { isKeyStore } = useStore()

  let changedText = ''
  if (p.oldValue !== undefined) {
    // console.error('p.oldValue', p.oldValue);

    p.oldValue.skey !== 'none' && (changedText = p.oldValue.skey)
    p.oldValue.key !== 0 &&
      (changedText +=
        changedText === ''
          ? res.映射.hidCodeMapKeyName(p.oldValue.key)
          : '+' + res.映射.hidCodeMapKeyName(p.oldValue.key))
    p.oldValue.key2 !== 0 &&
      (changedText +=
        changedText === ''
          ? res.映射.hidCodeMapKeyName(p.oldValue.key2)
          : '+' + res.映射.hidCodeMapKeyName(p.oldValue.key2))
  }

  const isSpecialKeyExit = (key: SpecialKey) => {
    return p.Cvalue.specialKey1 === key || p.Cvalue.specialKey2 === key
      ? true
      : false
  }


  const changeSpecialKeyToNone = (key: SpecialKey) => {
    if (p.Cvalue.specialKey1 === key)
      p.setCValue(p.Cvalue.hid, 'none', p.Cvalue.specialKey2)
    else p.setCValue(p.Cvalue.hid, p.Cvalue.specialKey1, 'none')
  }
  const changeSpecialKeyToTrue = (key: SpecialKey) => {
    if (p.Cvalue.specialKey1 === 'none')
      p.setCValue(p.Cvalue.hid, key, p.Cvalue.specialKey2)
    else p.setCValue(p.Cvalue.hid, p.Cvalue.specialKey1, key)
  }

  const changeKey = (key: SpecialKey) => {
    // console.error(key,'KKKKKKKKEEEEEEEEYYYYYYYY');
    isSpecialKeyExit(key)
      ? changeSpecialKeyToNone(key)
      : changeSpecialKeyToTrue(key)
    return
  }
  // console.error('ppppppppppppp', p);
  useEffect(() => autorun(() => { }), [macroStore.currentSingleValue])
  document.onkeydown = () => {
    if (isKeyStore.keyIsOpen) {
      // console.log('true le')
      macroStore.startSingleHook()
      // macroStore.stopMouseEvent()
    }
  }
  document.onkeyup = () => {

    if (isKeyStore.keyIsOpen) {
      // console.error('键盘抬起');
      if (
        macroStore.currentSingleValue !== MouseKey.Left &&
        macroStore.currentSingleValue !== MouseKey.Middle &&
        macroStore.currentSingleValue !== MouseKey.Right &&
        macroStore.currentSingleValue !== 0
      ) {
        p.setCValue(
          macroStore.currentSingleValue,
          p.Cvalue.specialKey1,
          p.Cvalue.specialKey2
        )
      }
      macroStore.cleanSingleValue()
    }
  }
  macroStore.startSingleHook()
  macroStore.cleanSingleValue()

  // console.error(p.Cvalue.hid);
  const [listKey, setListKey] = useState(false)
  const keyboradList = getKeyboradList()

  // const test = res.映射.hidCodeMapKeyName(p.Cvalue.hid) !== "fn"

  return useObserver(() => (
    <Fragment>
      <dj.FlexView w={80} h={134} x={57} y={48} flexDirection={'column'}>
        <dj.CheckBox2
          relative
          type={'Normal'}
          text={process.platform === 'darwin' ? 'Control' : 'Ctrl'}
          checkState={isSpecialKeyExit('ctrl') && !p.forBidden}
          clickHandle={() => changeKey('ctrl')}
        />
        <dj.CheckBox2
          relative
          type={'Normal'}
          text={process.platform === 'darwin' ? 'Option' : 'Alt'}
          checkState={isSpecialKeyExit('alt') && !p.forBidden}
          clickHandle={() => changeKey('alt')}
        />
        <dj.CheckBox2
          relative
          type={'Normal'}
          text={'Shift'}
          checkState={isSpecialKeyExit('shift') && !p.forBidden}
          clickHandle={() => changeKey('shift')}
        />
        <dj.CheckBox2
          relative
          type={'Normal'}
          text={process.platform === 'darwin' ? 'Command' : 'Win'}
          checkState={isSpecialKeyExit('win') && !p.forBidden}
          clickHandle={() => changeKey('win')}
        />
      </dj.FlexView>
      <dj.VerticalLine w={1} h={134} x={159} y={54} />
      <dj.Text w={11} h={18} x={192} y={143} type={'组合键'} text={'+'} />
      <dj.TextSetInput
        usePlaceholder={res.useString.请输入按键}
        w={117}
        h={26}
        x={229}
        y={143}
        type={'组合键按键'}
        value={p.forBidden ? "" : macChange(res.映射.hidCodeMapKeyName(p.Cvalue.hid) || '')}
        onChange={() => { }}
        inputFocus={() => {
        }}
        inputFinished={() => {
        }}
      />
      <dj.Button
        w={24}
        h={24}
        x={350}
        y={143}
        img={{
          size: {
            w: 20,
            h: 20,
          },
          src: res.img.keyboard_kc,
        }}
        mode={'侧边栏'}
        isHightLight={listKey}
        clickHandle={() => {
          setListKey(!listKey)
        }}
      ></dj.Button>
      <dj.Text text={macChange(changedText)} type={'已修改的按键值'} x={57} y={7} h={36} />


      {listKey && <dj2.View2 w={160} h={411} x={453} y={-132}>
        <List2
          w={160}
          h={431}
          itemCount={keyboradList.length}
          scrollToIndex={0}
          itemSize={() => 30}
          renderItem={(i: number) => (
            <dj.CheckBox2
              relative
              key={i}
              h={32}
              type={'Normal'}
              text={macChange(keyboradList[i].value)}
              checkState={p.Cvalue.hid === keyboradList[i].hidCode}
              clickHandle={() => {
                p.setCValue(
                  keyboradList[i].hidCode,
                  p.Cvalue.specialKey1,
                  p.Cvalue.specialKey2
                )
              }}
            />
          )}
        />

      </dj2.View2>}

    </Fragment>
  ))
}
