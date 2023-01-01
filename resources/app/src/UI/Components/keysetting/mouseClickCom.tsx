import React, { Fragment } from 'react'
import { dj } from '../../../dj'
import { res } from '../../../res'
// import { useStore } from '../../../mobxStore/store'
import { useObserver } from 'mobx-react-lite'
import { MouseKey } from '../../../sdk/DriverIO/DeviceAPI/DeviceInterface'
// import { autorun } from 'mobx'
// import { MouseKey } from '../../../sdk/DriverIO/DeviceAPI/DeviceInterface'


export const MouseClickCom = (p: {
  cMouse: MouseKey | undefined
  setcMouse: (cMouse: MouseKey | undefined) => void
  oldValue: ConfigChangeToMouseBtn | undefined
  forBidden: boolean
}) => {
  const ___items: MouseKey[] = [
    -1000,//'MouseLeft',
    -999,//'MouseRight',
    -998,//'MouseMiddle',
    -997,//'MouseForward',
    -996,//'MouseBack',
    -988,//'SCROLLUP',
    -987,//'SCROLLDOWN',
  ]

  // const showItems = [
  //   res.img.left_mouse_key,
  //   res.img.right_mouse_key,
  //   res.img.middle_mouse_key,
  //   res.img.mouse_keyUp,
  //   res.img.mouse_keydown,
  //   '',
  //   '',
  //   '',
  //   '',
  //   '',
  //   '',
  //   '',
  //   res.img.left_mouse_key,
  //   res.img.left_mouse_key,
  // ]
  const showItems = [
    res.string.鼠标左键,//1000
    res.string.鼠标右键,//999
    res.string.鼠标滚轮点击,//998
    res.string.鼠标左向前,//997
    res.string.鼠标左向后,//996
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    res.string.鼠标滚轮向上,//988
    res.string.鼠标滚轮向下,//987
    'MouseXUP',
    'MouseXDOWN',
    'MouseYUP',
    'MouseYDOWN',
  ]


  const getMouseText = (n: MouseKey) => {
    const text = showItems[1000 + n]
    return text
  }
  let changedText: any
  if (p.oldValue !== undefined) {
    p.oldValue.key !== 0 && (changedText = getMouseText(p.oldValue.key))
  }


  const isMouseExit = (mouseKey: MouseKey) => {
    return p.cMouse === mouseKey
      ? true
      : false
  }
  const changeMouseToNone = (mouseKey: MouseKey) => {
    p.setcMouse(mouseKey)
    if (p.cMouse === mouseKey) {
      p.setcMouse(0)
    }
  }
  const changeMouseToTrue = (mouseKey: MouseKey) => {
    p.setcMouse(mouseKey)
    if (p.cMouse) {
      p.setcMouse(mouseKey)
    }
  }
  const changeMouseKey = (mouseKey: MouseKey) => {
    isMouseExit(mouseKey)
      ? changeMouseToNone(mouseKey)
      : changeMouseToTrue(mouseKey)
    return
  }
  // console.error('p.cMousep.cMousep.cMouse',p.cMouse);

  return useObserver(() => (
    <Fragment>
      <dj.Text text={changedText} type={'已修改的按键值'} x={57} y={7} h={36} />

      <dj.List
        w={342}
        h={145}
        x={54}
        y={48}
        itemCount={___items.length}
        scrollToIndex={0}
        itemSize={() => 30}
        renderItem={(i: number) => (
          // <dj.CheckBox2
          //   relative
          //   key={i}
          //   type={'Normal'}
          //   imgBg={1000 + ___items[i] <= showItems.length - 1 ? showItems[1000 + ___items[i]] : ''}
          //   checkState={isMouseExit(___items[i]) && !p.forBidden}
          //   clickHandle={() => changeMouseKey(___items[i])}
          //   w={60}
          //   h={30}
          // />

          <dj.CheckBox2
            relative
            key={i}
            h={32}
            type={'Normal'}
            text={1000 + ___items[i] <= showItems.length - 1 ? showItems[1000 + ___items[i]] : ''}
            checkState={isMouseExit(___items[i]) && !p.forBidden}
            clickHandle={() => changeMouseKey(___items[i])}
          />
        )}
      />
    </Fragment>
  ))
}