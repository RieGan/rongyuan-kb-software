import React, { useState, Fragment, useLayoutEffect } from 'react'
import styled from '@emotion/styled'

import { Button } from './Button'
import { res } from '../res'

const ModeTable = {
  Head: {
    width: 60,
    height: 30,
    AddButtonStyle: 'MacroAdd_Head_Ajazz',
    SubButtonStyle: 'MacroSub_Head',
    AddKey: {
      top: 40,
      left: 0,
    },
    AddCoordinte: {
      top: 70,
      left: 0,
    },
    Arrow: {
      borderWidth: '4px 4px 0px  4px',
      borderColor: '#ffffff transparent transparent transparent',
      top: 10,
      left: 39,
    },
  },
  Body: {
    width: 42,
    height: 22,
    AddButtonStyle: 'MacroAdd',
    SubButtonStyle: 'MacroSub',
    AddKey: {
      top: -58,
      left: 58,
    },
    AddCoordinte: {
      top: 0,
      left: 58,
    },
    Arrow: {
      borderWidth: '4px 0px 4px 4px',
      borderColor: ' transparent transparent transparent #ffffff',
      top: 7,
      left: 35,
    },
  },
} as const

const Div = styled.div(
  {
    position: 'absolute',
  },
  (p: { mode: keyof typeof ModeTable; top: number; left?: number }) => ({
    width: ModeTable[p.mode].width,
    height: ModeTable[p.mode].height,
    top: p.top,
    left: p.left ? p.left : 0,
    zIndex: 1,
  })
)

const Arrow = styled.div((p: { mode: keyof typeof ModeTable }) => ({
  width: 0,
  height: 0,
  position: 'absolute',
  top: ModeTable[p.mode].Arrow.top,
  left: ModeTable[p.mode].Arrow.left,
  borderStyle: 'solid',
  borderWidth: ModeTable[p.mode].Arrow.borderWidth,
  borderColor: ModeTable[p.mode].Arrow.borderColor,
}))

export const AddMacroContextMenu = (p: {
  isOpen: boolean
  mode: keyof typeof ModeTable
  changeSub: () => void
  addHandle: (
    type: 'mouse_button' | 'mouse_move' | 'keyboard' | 'delay'
  ) => void
  isDisabled?: boolean
  mouseEnter?: () => void
  mouseLeave?: () => void
}) => {
  return (
    <Fragment>
      <Button
        isDisabled={p.isDisabled}
        mode={ModeTable[p.mode].AddButtonStyle}
        text={res.string.添加}
        clickHandle={() => {
          // event.stopPropagation();
          p.changeSub()
        }}
        mouseEnter={() => { p.mouseEnter && p.mouseEnter() }}
        mouseLeave={() => { p.mouseLeave && p.mouseLeave() }}
        classname={'notoutside'}
      />
      {!(p.isDisabled === true) && <Arrow mode={p.mode} />}
      {p.isOpen && (
        <Fragment>
          <Div
            top={ModeTable[p.mode].AddKey.top}
            left={ModeTable[p.mode].AddKey.left}
            mode={p.mode}>
            <Button
              mode={ModeTable[p.mode].SubButtonStyle}
              text={res.string.按键}
              clickHandle={() => p.addHandle('keyboard')}
              classname={'notoutside'}
            />
          </Div>
          {p.mode === 'Body' && (
            <Div top={-29} left={58} mode={p.mode}>
              <Button
                mode={'MacroSub'}
                text={res.string.延迟}
                clickHandle={() => p.addHandle('delay')}
                classname={'notoutside'}
              />
            </Div>
          )}
          <Div
            top={ModeTable[p.mode].AddCoordinte.top}
            left={ModeTable[p.mode].AddCoordinte.left}
            mode={p.mode}>
            <Button
              mode={ModeTable[p.mode].SubButtonStyle}
              text={res.string.坐标}
              clickHandle={() => p.addHandle('mouse_move')}
              classname={'notoutside'}
            />
          </Div>
          {/* </div> */}

        </Fragment>
      )}
    </Fragment>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MacroContextMenu = (p: {
  clickHandle: () => void
  deleteHandle: () => void
  editeHandle: () => void
  addHandle: (
    type: 'mouse_button' | 'mouse_move' | 'keyboard' | 'delay'
  ) => void
}) => {
  const [sub, setSub] = useState(false)

  const changeSub = () => {
    setSub(!sub)
  }
  useLayoutEffect(() => {
    let element = document.getElementById('scroll-list')

    element = element === null ? document.body : element
    const originalStyle = window.getComputedStyle(element).overflow
    element.style.overflow = 'hidden hidden'

    return () => {
      element !== null && (element.style.overflow = originalStyle)
    }
  }, [])

  return (
    <div
      style={{
        width: 42,
        height: 42,
      }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          border: 'solid 1px #23f9e2',
        }}
        onClick={p.clickHandle}
      />
      <Div top={-63} mode={'Body'}>
        <AddMacroContextMenu
          mode={'Body'}
          changeSub={changeSub}
          // addMouseEnter={()=>{}}
          // addMouseLeave={()=>{}}
          isOpen={sub}
          addHandle={p.addHandle}
        />
      </Div>
      <Div top={-34} mode={'Body'}>
        <Button
          mode={'MacroEdit'}
          text={res.string.修改}
          clickHandle={p.editeHandle}
          classname={'notoutside'}
        />
      </Div>

      <Div top={58} mode={'Body'}>
        <Button
          mode={'MacroDelete'}
          text={res.string.删除}
          clickHandle={p.deleteHandle}
          classname={'notoutside'}
        />
      </Div>
    </div>
  )
}
