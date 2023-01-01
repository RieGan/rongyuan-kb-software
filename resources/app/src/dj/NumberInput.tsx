import React, { useState, useRef } from 'react'
import styled from '@emotion/styled'
import { FlexView } from './FlexView'
import { OutsideAlerter } from '../UI/utils/OutsideAlerter'
import { mobxStore } from '../mobxStore/store'
import { res } from '../res'

export const NumberInputStyle = styled.input({
  '&::-webkit-inner-spin-button': {
    opacity: 0,
    WebkitAppearance: 'none',
    margin: 0,
    pointerEvents: 'none',
  },
  width: '100%',
  height: '100%',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: '#555658',
  textAlign: 'center',
})

export const TimeInputStyle = styled.input({
  '&::-webkit-inner-spin-button': {
    opacity: 0,
    WebkitAppearance: 'none',
    margin: 0,
    pointerEvents: 'none',
  },
  width: '100%',
  height: '100%',
  background: 'transparent',
  border: '1px solid #f2f2f2',
  outline: 'none',
  color: 'white',
  textAlign: 'center',
  boxSizing: 'border-box'
})

export const TimeInput = (p: {
  tips?: string
  autoFocus?: boolean
  max: number
  inputFinished: (value: number) => void
}) => {
  return (
    <TimeInputStyle
      autoFocus={p.autoFocus ? p.autoFocus : false}
      type={'number'}
      min={1}
      placeholder={p.tips ? p.tips : ''}
      onChange={(e) => {
        //console.log(e.target.value)
        if (Number(e.target.value) > p.max) {
          e.target.value = p.max.toString()
          mobxStore.toastStore.setErr(res.text.输入的时间请勿超过() + p.max + 'ms')
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          p.inputFinished(e.target.value === '' ? 0 : parseInt(e.target.value))
        }
      }}
      onBlur={(e: { target: { value: string } }) => {
        p.inputFinished(e.target.value === '' ? 0 : parseInt(e.target.value))
      }}
      onMouseUp={(event) => event.stopPropagation()}
    />
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const NumberInput = (p: { inputFinished: (value: number) => void }) => {
  const [tmp, setTmp] = useState("")
  return (
    <NumberInputStyle
      autoFocus
      type={'number'}
      value={tmp}
      min={1}
      onChange={(e) => {
        //console.log(e.target.value)
        if (Number(e.target.value) > 65535) {
          e.target.value = '65535'
          mobxStore.toastStore.setErr(res.text.输入的时间请勿超过65535ms())
        }
        setTmp(e.target.value)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          p.inputFinished(tmp === '' || Number(tmp) < 1 ? 1 : parseInt(tmp))
        }
      }}
      onBlur={(e: { target: { value: string } }) => {
        p.inputFinished(tmp === '' || Number(tmp) < 1 ? 1 : parseInt(tmp))
      }}
      onMouseUp={(event) => event.stopPropagation()}
    />
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const DoublueNumberInut = (p: {
  placeHolderTop: string
  placeHolderBottom: string
  inputFinished: (x: string, y: string) => void
}) => {
  const refX = useRef(null)
  const refY = useRef(null)

  const [state, setstate] = useState({
    x: '',
    y: '',
  })

  const onChange = (e: { target: { name: string; value: string } }) => {
    const str = e.target.value
    const firStr = e.target.value.charAt(0)
    const spaceStr = str.indexOf(' ')
    console.log(spaceStr)
    const strDelFir = str.substr(1)
    const numStr = Number(str)
    if ((firStr === '-' || Number(firStr).toString() !== 'NaN') && Number(strDelFir).toString() === 'NaN') {
      const tpStr = str.substr(0, str.length - 1)
      e.target.value = tpStr
      mobxStore.toastStore.setErr(res.text.请输入数字())
    } else if (spaceStr !== -1) {
      const tpStr = str.split(' ');
      const tpStr2 = tpStr.join('')
      e.target.value = tpStr2
      mobxStore.toastStore.setErr(res.text.请输入数字())
    } else if (numStr.toString() === 'NaN' && str !== '-') {
      e.target.value = ''
      mobxStore.toastStore.setErr(res.text.请输入数字())
    }
    else if (numStr > 127) {
      e.target.value = '127'
      mobxStore.toastStore.setErr(res.text.坐标值范围应在())
    } else if (numStr < -127) {
      e.target.value = '-127'
      mobxStore.toastStore.setErr(res.text.坐标值范围应在())
    }
    setstate({ ...state, [e.target.name]: e.target.value })
  }

  const onKeyDown = (e: { key: string }) => {
    if (e.key === 'Enter') changeFocus()
  }

  const changeFocus = () => {
    console.log('focus in', state.x, state.y)
    if (state.y === '') refY.current && refY.current.focus()
    else if (state.x === '') refX.current && refX.current.focus()
    else p.inputFinished(state.x, state.y)
  }

  const outsideHandler = () => {
    if (state.y === '') setstate({ ...state, y: '1' })
    if (state.x === '') setstate({ ...state, x: '1' })
    p.inputFinished(state.x, state.y)
  }
  return (
    <OutsideAlerter clickOutsideHandle={outsideHandler}>
      <FlexView flexDirection={'column'} justifyContent={'space-between'} onMouseUp={(event) => event.stopPropagation()}>
        <NumberInputStyle
          autoFocus
          // type='number'
          placeholder={p.placeHolderTop}
          ref={refX}
          name={'x'}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={changeFocus}

        />
        <NumberInputStyle
          // type='number'
          placeholder={p.placeHolderBottom}
          ref={refY}
          name={'y'}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={changeFocus}
        />
      </FlexView>
    </OutsideAlerter>
  )
}
