import React, { Fragment, useState, useEffect } from 'react'
import { dj } from '../../../../dj'
import { OutsideAlerter } from '../../../utils/OutsideAlerter'

import { useStore } from '../../../../mobxStore/store'
import { useObserver } from 'mobx-react-lite'
import { autorun } from 'mobx'

import { MouseKey } from '../../../../sdk/DriverIO/DeviceAPI/DeviceInterface'

const LineMacros = (p: {
  items: MacroEvent[]
  clickedColumnIndex: number
  addColumnIndex: number
  editHandle: (item: MacroEvent) => void
  deleteHandle: () => void
  clickHandle: (indexColumn: number) => void
  addHandle: (
    type: 'mouse_button' | 'mouse_move' | 'keyboard' | 'delay'
  ) => void
}) => {
  return (
    <Fragment>
      <dj.FlexView relative w={528} h={42}>
        {p.items.map((item, index) => (
          <Fragment key={index}>
            <dj.MacroButton
              relative
              w={42}
              h={42}
              isContextVisible={p.clickedColumnIndex === index}
              isAddState={p.addColumnIndex === index}
              item={item}
              addHandle={p.addHandle}
              editHandle={p.editHandle}
              deleteHandle={p.deleteHandle}
              clickHandle={() => p.clickHandle(index)}
            />

            <dj.View relative w={10}>
              {''}
            </dj.View>
          </Fragment>
        ))}
      </dj.FlexView>
    </Fragment>
  )
}

const getTmpEvent = (
  type: 'mouse_button' | 'mouse_move' | 'keyboard' | 'delay'
) => {
  const mouseEvent: MacroEvent = {
    type: 'mouse_button',
    action: 'down',
    value: MouseKey.Left,
  }
  const moveEvent: MacroEvent = {
    type: 'mouse_move',
    dx: 1,
    dy: 1,
  }
  const keyboardEvent: MacroEvent = {
    type: 'keyboard',
    action: 'down',
    value: 0,
  }
  const delEvent: MacroEvent = {
    type: 'delay',
    value: 1,
  }

  switch (type) {
    case 'mouse_button':
    default:
      return mouseEvent
    case 'keyboard':
      return keyboardEvent
    case 'delay':
      return delEvent
    case 'mouse_move':
      return moveEvent
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MacroList = () => {
  const { macroStore } = useStore()

  const [state, setstate] = useState({
    indexRow: -1,
    indexColumn: -1,
  })

  const { isKeyStore } = useStore()
  const changeHeadContextMenu = () => {
    macroStore.recodingState === 'recording'
      ? isKeyStore.setMacroAddClickKey(false)
      : isKeyStore.setMacroAddClickKey(!isKeyStore.macroAddClickKey)
  }


  const [add, setAddData] = useState({
    indexRow: -1,
    indexColumn: -1,
    type: 'delay',
  })

  const setContextMenuDisappear = () => {
    setstate({ ...state, indexRow: -1, indexColumn: -1 })
  }
  const setAddStateDisappear = () => {
    setAddData({ ...add, indexRow: -1, indexColumn: -1 })
  }

  const addHandle = (
    type: 'mouse_button' | 'mouse_move' | 'keyboard' | 'delay'
  ) => {
    if (!macroStore.isFull) {
      const tempEvent: MacroEvent = getTmpEvent(type)
      macroStore.addEvent(
        tempEvent,
        state.indexRow * 10 + state.indexColumn + 1
      )

      setAddData({
        type: type,
        indexRow: Math.floor(
          (state.indexRow * 10 + state.indexColumn + 1) / 10
        ),
        indexColumn: (state.indexRow * 10 + state.indexColumn + 1) % 10,
      })

      setContextMenuDisappear()
    }
  }

  const editHandle = (item: MacroEvent) => {
    if (item.type !== 'keyboard' && item.type !== 'mouse_button') {
      macroStore.changeEvent(
        add.indexRow !== -1 && add.indexColumn !== -1
          ? add.indexRow * 10 + add.indexColumn
          : state.indexRow * 10 + state.indexColumn,
        item
      )

      setContextMenuDisappear()
      setAddStateDisappear()
    } else {
      macroStore.startSingleHook()
    }
  }

  const deleteHandle = () => {
    macroStore.delEvent(state.indexRow * 10 + state.indexColumn)
    setContextMenuDisappear()
  }

  const getLines = () => {
    const lines: React.ReactNode[] = []
    for (let i = 0; i <= macroStore.currentRecMacroArr.length / 10; i++) {
      lines.push(
        <LineMacros
          items={macroStore.currentRecMacroArr.slice(
            i * 10,
            i * 10 + 10 > macroStore.currentRecMacroArr.length
              ? macroStore.currentRecMacroArr.length
              : i * 10 + 10
          )}
          clickedColumnIndex={i === state.indexRow ? state.indexColumn : -1}
          addColumnIndex={i === add.indexRow ? add.indexColumn : -1}
          addHandle={addHandle}
          editHandle={editHandle}
          deleteHandle={deleteHandle}
          clickHandle={(indexColumn: number) => {
            //录制状态不允许点击
            macroStore.recodingState === 'stop' &&
              (indexColumn === state.indexColumn && i === state.indexRow
                ? setstate({ indexColumn: -1, indexRow: -1 })
                : setstate({
                  indexRow: i,
                  indexColumn: indexColumn,
                }))
          }}
        />
      )
    }
    return lines
  }

  useEffect(() =>
    autorun(() => {
      macroStore.isFull &&
        macroStore.recodingState === 'recording' &&
        macroStore.stoptHook()
    })
  )

  document.onclick = () => {
    if (!isKeyStore.macroAddTouchKey) {
      isKeyStore.setMacroAddClickKey(false)
    }
  }
  // console.error('headContextMenu',headContextMenu)
  // console.error('macroStore.recodingState === stop',macroStore.recodingState === 'stop')
  // console.error('total',headContextMenu && macroStore.recodingState === 'stop')
  // console.log('-----------------------------------------------------------------------------------');
  return useObserver(() => {
    useEffect(() => {
      if (
        macroStore.currentSingleValue !== 0 &&
        macroStore.recodingState === 'singleRecording'
      ) {
        if (add.indexColumn !== -1 && add.indexColumn !== -1) {
          macroStore.changeEvent(add.indexRow * 10 + add.indexColumn, {
            type:
              macroStore.currentSingleValue <= MouseKey.Key_2
                ? 'mouse_button'
                : 'keyboard',
            value: macroStore.currentSingleValue,
            action: 'down',
          }),
            macroStore.addEvent({
              type: 'delay',
              value: 1
            },
              add.indexRow * 10 + add.indexColumn + 1)
          macroStore.addEvent(
            {
              type:
                macroStore.currentSingleValue <= MouseKey.Key_2
                  ? 'mouse_button'
                  : 'keyboard',
              value: macroStore.currentSingleValue,
              action: 'up',
            },
            add.indexRow * 10 + add.indexColumn + 2
          )
        } else {
          const tmp =
            macroStore.currentRecMacroArr[
            state.indexRow * 10 + state.indexColumn
            ]

          const action =
            tmp.type === 'mouse_button' || tmp.type === 'keyboard'
              ? tmp.action
              : 'down'

          macroStore.changeEvent(state.indexRow * 10 + state.indexColumn, {
            type:
              macroStore.currentSingleValue <= MouseKey.Key_2
                ? 'mouse_button'
                : 'keyboard',
            value: macroStore.currentSingleValue,
            action: action,
          })
        }
        macroStore.stoptHook()
        macroStore.cleanSingleValue()
        setContextMenuDisappear()
        setAddStateDisappear()
      }
    }, [macroStore.currentSingleValue])

    return (
      <Fragment>
        <dj.AddMacroContextMenu
          w={42}
          h={24}
          x={179}
          y={5}
          mode={'Head'}
          zIndex={99}
          isOpen={isKeyStore.macroAddClickKey && macroStore.recodingState === 'stop'}
          mouseEnter={() => { isKeyStore.setMacroAddTouchKey(true) }}
          mouseLeave={() => { isKeyStore.setMacroAddTouchKey(false) }}
          changeSub={() => {
            // if (e.stopPropagation) {
            //   e.stopPropagation();
            // }
            changeHeadContextMenu()
          }}
          addHandle={(
            type: 'mouse_button' | 'mouse_move' | 'keyboard' | 'delay'
          ) => {
            if (!macroStore.isFull) {
              const tempEvent: MacroEvent = getTmpEvent(type)
              macroStore.addEvent(
                tempEvent,
                macroStore.currentRecMacroArr.length
              )

              setAddData({
                type: type,
                indexRow: Math.floor(
                  (macroStore.currentRecMacroArr.length - 1) / 10
                ),
                indexColumn: (macroStore.currentRecMacroArr.length - 1) % 10,
              })

              changeHeadContextMenu()
            }
          }}
          isDisabled={
            macroStore.recodingState === 'recording' || macroStore.isFull
          }
        />
        <dj.View w={5550} h={356} x={90} y={44}>
          <OutsideAlerter
            clickOutsideHandle={() => {
              setstate({
                indexRow: -1,
                indexColumn: -1,
              })
            }}>
            <dj.NormalList
              items={getLines()}
              space={10}
              clickHandle={() =>
                setstate({
                  indexRow: -1,
                  indexColumn: -1,
                })
              }
              isScrollToBottom={macroStore.recodingState === 'recording'}
            />
          </OutsideAlerter>
        </dj.View>
      </Fragment>
    )
  })
}
