import React, { Fragment, useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import { Text } from './Text'
import { NumberInput } from './NumberInput'
import { DoublueNumberInut } from './NumberInput'
import { MacroContextMenu } from './MacroContextMenu'
import { Img } from './Img'
import { FlexView } from './FlexView'

import { res } from '../res'
import { MouseKey } from '../sdk/DriverIO/DeviceAPI/DeviceInterface'
import { mobxStore, useStore } from '../mobxStore/store'
import { sleep } from '../unitys/timeFunc'

// const TypeTable = {
//   Default: 'solid 1px #3d3d3d',
//   HightLight: 'solid 1px #23f9e2',
//   delay: 'solid 1px #3d3d3d',
//   mouse_move: 'solid 1px #99BBFF',
//   keyboard: 'solid 1px #FF8888',
//   mouse_button: 'solid 1px #FF8888',
// } as const

const TypeTable = {
  Default: {
    border: 'solid 1px #3d3d3d',
    bgc: 'rgba(0,0,0,0)'
  },
  HightLight: {
    border: 'solid 1px rgba(35,249,226,0.5)',
    bgc: 'rgba(35,249,226,0.5)'
  },
  delay: {
    border: 'solid 1px rgba(61,61,61,0.5)',
    // bgc: 'rgba(61,61,61,0.5)'
    bgc: 'rgba(255,255,255,0)'
  },
  mouse_move: {
    border: 'solid 1px rgba(153,187,255,0.5)',
    bgc: 'rgba(153,187,255,0.5)'
  },
  keyboard: {
    border: 'solid 1px rgba(122,108,170,0.5)',
    // bgc: 'rgba(255,136,136,0.5)'
    bgc: 'rgb(122,108,170)'
  },
  mouse_button: {
    border: 'solid 1px rgb(122,108,170)',
    // bgc: 'rgba(255,136,136,0.5)'
    bgc: 'rgb(122,108,170)'
  }

} as const


const Div = styled.div((p: { type: keyof typeof TypeTable }) => ({
  width: '100%',
  height: '100%',
  borderRadius: '2px',
  color: '#cfcfcf',
  border: TypeTable[p.type].border,
  backgroundColor: TypeTable[p.type].bgc,
  opacity: '1',

  '.down-arrow': {
    width: 0,
    height: 0,
    position: 'absolute',
    top: 29,
    left: 16,
    borderStyle: 'solid',
    borderWidth: '8px 6px 0 6px',
    borderColor: '#cfcfcf transparent transparent transparent',
  },

  '.up-arrow': {
    width: 0,
    height: 0,
    position: 'absolute',
    top: 29,
    left: 16,
    borderStyle: 'solid',
    borderWidth: '0px 6px 8px 6px',
    borderColor: ' transparent transparent #cfcfcf transparent',
  },

  '&:hover': {
    border: 'solid 1px #000',
    color: 'white',
  },

  '&:hover .arrow': {
    borderStyle: 'solid',
    borderWidth: '8px 6px 0 6px',
    borderColor: '#ffffff transparent transparent transparent',
  },

  '&:active': {
    border: 'solid 1px #23f9e2',
  },
}))

const appRoot = document.getElementById('root')
const Modal = (p: { children: any }) => {
  if (appRoot === null) return
  return ReactDOM.createPortal(p.children, appRoot)
}

const TimeElement = (p: { time: number; describe: string }) => {
  return (
    <FlexView
      flexDirection='column'
      justifyContent='space-between'
      alignItems='center'>
      <div style={{ width: '100%', height: 15 }}>
        <Text type={'按钮_宏菜单_黑字'} text={Math.round(p.time)} />
      </div>
      <div style={{ width: 35, height: 1, background: '#3d3d3d' }}></div>
      <div style={{ width: '100%', height: 17 }}>
        <Text type={'按钮_宏菜单_黑字'} text={p.describe} />
      </div>
    </FlexView>
  )
}
const showTimeValue = (time: number) => {
  if (time < 1000) return <TimeElement time={time} describe={'ms'} />
  else return <TimeElement time={time / 1000} describe={'s'} />
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MacroButton = (p: {
  item: MacroEvent
  isContextVisible: boolean
  // isAddState: 'mouse_button' | 'mouse_move' | 'keyboard' | 'delay' | undefined
  isAddState: boolean
  addHandle: (
    type: 'mouse_button' | 'mouse_move' | 'keyboard' | 'delay'
  ) => void
  editHandle: (item: MacroEvent) => void
  deleteHandle: () => void
  clickHandle: () => void
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [editable, setEditable] = useState(false)

  //使 按键 脱离 edit 状态
  useEffect(() => {
    editable &&
      (p.item.type === 'keyboard' || p.item.type === 'mouse_button') &&
      setEditable(false)
  }, [p.item])

  //判断是否进入 add 状态
  useEffect(() => {
    if (p.isAddState) {
      setEditable(true)
      buttonEnterEidt()
    }
  }, [p.isAddState])

  //按键 进入 edit
  const buttonEnterEidt = () => {
    if (p.item.type === 'keyboard' || p.item.type === 'mouse_button') {
      p.editHandle({ ...p.item })
    }
  }

  const editDelayFinished = (value: number) => {
    if (p.item.type !== 'delay') return
    // if (value !== p.item.value)
    p.editHandle({
      ...p.item,
      value: value,
    })
    setEditable(false)

    mobxStore.macroStore.uiSaveMacro()
  }

  const editMoveFinished = (x: string, y: string) => {
    if (p.item.type !== 'mouse_move') return
    p.editHandle({
      ...p.item,
      dx: x !== '' ? String(parseInt(x))==='NaN'?1:parseInt(x) : p.item.dx,
      dy: y !== '' ? String(parseInt(y))==='NaN'?1: parseInt(y) : p.item.dy,
    })
    setEditable(false)

    mobxStore.macroStore.uiSaveMacro()
  }

  const { macroStore } = useStore()

  if (p.item.type === "keyboard" && p.item?.value === 0 && macroStore.recodingState === 'recording') {
    mobxStore.toastStore.setErr(res.text.该键无法录制宏())
    const testArr: MacroEvent[] = []
    if (macroStore.currentRecMacroArr.length <= 3) {
      macroStore.setCurrentRecMacroArr([])
    } else {
      const tmp = macroStore.currentRecMacroArr.length - 3

      if (macroStore.currentRecMacroArr[tmp].type === "delay") {
        for (let i = 0; i <= tmp + 1; i++) {
          if (macroStore.currentRecMacroArr[i] !== undefined) {
            testArr.push(macroStore.currentRecMacroArr[i])
          }
        }
      } else {
        for (let i = 0; i <= tmp; i++) {
          if (macroStore.currentRecMacroArr[i] !== undefined) {
            testArr.push(macroStore.currentRecMacroArr[i])
          }
        }
      }

    }
    macroStore.setCurrentRecMacroArr(testArr)
  }

  return (
    <Fragment>
      <Div
        ref={ref}
        onMouseUp={p.clickHandle}
        onClick={(event) => event.stopPropagation()}
        type={p.item.type ? p.item.type : 'Default'}>
        {p.item.type === 'keyboard' && (
          <Fragment>
            {editable ? null : (
              <Text
                type={'宏_常规_white'}
                text={res.映射.hidCodeMapKeyName(p.item.value) === 'BackSpace' ? 'BackS' : res.映射.hidCodeMapKeyName(p.item.value)}
              />
            )}
            <div
              className={p.item.action === 'down' ? 'down-arrow' : 'up-arrow'}
            />
          </Fragment>
        )}
        {p.item.type === 'mouse_button' && (
          <Fragment>
            {editable ? null : (
              <div
                style={{
                  width: 11,
                  height: 17,
                  position: 'absolute',
                  left: 16,
                  top: 5,
                }}>
                <Img
                  imgBg={
                    p.item.value === MouseKey.Left
                      ? res.img.left_mouse_key
                      : p.item.value === MouseKey.Middle
                        ? res.img.middle_mouse_key
                        : p.item.value === MouseKey.Right
                          ? res.img.right_mouse_key
                          : p.item.value === MouseKey.Forward
                            ? res.img.mouse_keyUp
                            : p.item.value === MouseKey.Back
                              ? res.img.mouse_keydown
                              : ''
                  }
                />
              </div>
            )}
            <div
              className={p.item.action === 'down' ? 'down-arrow' : 'up-arrow'}
            />
          </Fragment>
        )}
        {p.item.type === 'delay' &&
          (editable ? (
            <NumberInput inputFinished={editDelayFinished} />
          ) : (
            showTimeValue(p.item.value)
          ))}
        {p.item.type === 'mouse_move' &&
          (editable ? (
            <DoublueNumberInut
              placeHolderTop={'X'}
              placeHolderBottom={'Y'}
              inputFinished={editMoveFinished}
            />
          ) : (
            <FlexView
              flexDirection='column'
              justifyContent='space-between'
              alignItems='center'>
              <div style={{ width: '100%', height: 15 }}>
                <Text type={'按钮_宏菜单'} text={'X:' + p.item.dx} />
              </div>
              <div
                style={{ width: 35, height: 1, background: '#3d3d3d' }}></div>
              <div style={{ width: '100%', height: 17 }}>
                <Text type={'按钮_宏菜单'} text={'Y:' + p.item.dy} />
              </div>
            </FlexView>
          ))}
      </Div>
      {p.isContextVisible && !editable && (
        <Modal>
          <div
            style={{
              position: 'absolute',
              top:
                ref.current !== null
                  ? ref.current.getBoundingClientRect().top
                  : 0,
              left:
                ref.current !== null
                  ? ref.current.getBoundingClientRect().left
                  : 0,
            }}>
            <MacroContextMenu
              clickHandle={() => {
                p.clickHandle()
                setEditable(false)
              }}
              deleteHandle={p.deleteHandle}
              editeHandle={() => {
                setEditable(true)
                buttonEnterEidt()
              }}
              addHandle={p.addHandle}
            />
          </div>
        </Modal>
      )}
    </Fragment>
  )
}
