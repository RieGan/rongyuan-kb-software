import React from 'react'
import styled from '@emotion/styled'
import { Text, TextCheckBox } from './Text'
import { res } from '../res'

const CheckBoxStyle = styled(`label`)`
  display: inline-block;
  width: 100%;
  height: 100%;
  position: absolute;

  & input {
    position: absolute;
    opacity: 0;
  }
  & .pointer {
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    position: absolute;

    border: 1px solid #aaaaaa;
  }

  & input:hover ~ .pointer {
    border: 1px solid #ff0000;
  }

  & input:checked ~ .pointer {
    border: 1px solid #ff0000;
  }
  & .pointer::after {
    content: '  ';
    width: 33%;
    height: 66%;
    border-bottom: 2px solid #ff0000;
    border-right: 2px solid #ff0000;
    position: absolute;
    left: 33%;
    top: 66%;
    transform: translate(-30%, -85%) rotateZ(40deg);
    opacity: 0;
    transition: opacity 0.8s;
  }
  & input:checked ~ .pointer::after {
    opacity: 1;
  }
  & img {
    display:block
    width:11px;
    height:17px;
  }
`
const SizeTable = {
  Normal: { size: 16, textType: '描述', top: 0 },
  用户须知: { size: 14, textType: 'user提示', top: -2 },
  宏界面: { size: 16, textType: '宏的单选复选框', top: -2 },
  Macro: { size: 14, textType: 'MacroName', top: -2 }
} as const

export const CheckBox_Ajazz = (p: {
  type: keyof typeof SizeTable
  text?: React.ReactNode
  checkState: boolean
  clickHandle?: (event: React.ChangeEvent<HTMLInputElement>) => void
  // changeColor?:boolean
}) => (
  <CheckBoxStyle>
    <div style={{ position: 'absolute', left: 24, top: SizeTable[p.type].top }}>
      <Text type={'MacroName'} text={p.text} />
    </div>
    <div
      style={{
        width: SizeTable[p.type].size,
        height: SizeTable[p.type].size,
        position: 'absolute',
        margin: 0,
        marginTop: 8,
        padding: 0,
      }}>
      <input type='checkbox' onChange={p.clickHandle} checked={p.checkState} />
      <span className={'pointer'} />
    </div>
  </CheckBoxStyle>
)

//组合键 基本功能单选框
export const CheckBox2_Ajazz = (p: {
  type: keyof typeof SizeTable
  text?: React.ReactNode
  checkState: boolean
  clickHandle?: (event: React.ChangeEvent<HTMLInputElement>) => void
  isBool?: boolean
  w?: number
  h?: number
  imgBg?: string
}) => (
  <CheckBoxStyle>
    <div style={{ position: 'absolute', left: 24, top: SizeTable[p.type].top, width: p.w, height: p.h }}>
      {p.text && <TextCheckBox type={'单选框2'} text={p.text} isBool={p.isBool ? p.isBool : false} />}
      {p.imgBg && <img src={p.imgBg}></img>}
    </div>
    <div
      style={{
        width: SizeTable[p.type].size,
        height: SizeTable[p.type].size,
        position: 'absolute',
        margin: 0,
        padding: 0,
      }}>
      <input type='checkbox' onChange={p.clickHandle} checked={p.checkState} />
      <span className={'pointer'} />

    </div>
  </CheckBoxStyle>
)



export const DazzleColorBlock = (p: { clickHandle?: () => void }) => (
  <div
    style={{
      backgroundImage: 'conic-gradient(red 33.33% ,red 33.33%, green 66.66%,green 66.66%, blue 100%)',
      // background: p.bg || 'transparent',
      // border: `solid 2px ${p.bg || '#929292'}`,
      width: '100%',
      height: '100%',
      borderRadius: 2,
    }}
    onClick={p.clickHandle}></div>
)

export const DazzleColorCheckBox_Ajazz = (p: {
  type: keyof typeof SizeTable
  text?: React.ReactNode
  checkState: boolean
  clickHandle?: (event: React.ChangeEvent<HTMLInputElement>) => void
  isBool: boolean
  w?: number
  h?: number
}) => (
  <CheckBoxStyle>
    <div style={{ position: 'absolute', left: 50, top: SizeTable[p.type].top, width: p.w, height: p.h, }}>
      {p.text && <TextCheckBox type={'SubTitle_akko'} text={p.text} isBool={p.isBool} />}
    </div>
    <div
      style={{
        display: 'flex',
        width: SizeTable[p.type].size,
        height: SizeTable[p.type].size,
        position: 'relative',
        margin: 0,
        padding: 0,
      }}>
      <input type='checkbox' onChange={p.clickHandle} checked={p.checkState} />
      <div
        style={{
          backgroundImage: `url(${res.img.ajazzImg['RGB color']})`,
          position: 'absolute',
          left: 29,
          width: 15,
          height: 15,
        }} />
      <span className={'pointer'} />
    </div>
  </CheckBoxStyle>
)


{
  /* <label
        htmlFor={p.id}
        style={{
          position: 'absolute',
          left: 7 + SizeTable[p.type].size,
          top: -1,
        }}>
        <Text type={SizeTable[p.type].textType} text={p.text} />
      </label> */
}
