import * as React from 'react'
import { View, View2 } from './View'
import { FlexView, FlexColorView, FlexView2 } from './FlexView'
import { Text, TextWarn, TextEll } from './Text'
import { List } from './List'
import { CheckBox, CheckBox2, DazzleColorCheckBox } from './CheckBox'
import { Slider } from './Slider'
import { SpinBox } from './SpinBox'
import { RouterLink } from './RouterLink'
import { Line, Line_Ajazz } from './Line'
import { Ul } from './Ul'
import { Img } from './Img'
import { Button, Button_akko, ButtonELL, KeyboardButtonELL } from './Button'
import { VerticalLine, VerticalLine_Ajazz, WhiteVerticalLine } from './VerticalLine'
import { ColorBlock } from './ColorBlock'
import { ComboBox } from './ComboBox'
import { TextArea, TextArea_akko } from './TextArea'
import { TreeView } from './TreeView'
import { MacroButton } from './MacroButton'
import { MacroContextMenu } from './MacroContextMenu'
import { AddMacroContextMenu } from './MacroContextMenu'
import { SearchBar } from './SearchBar'
import { SchemeItem, PicSchemeItem } from './SchemeItem'
import { TextInput, TextSetInput } from './TextInput'
import { TextInput_akko } from './TextInput_akko'
import { UserView } from './UserView'
import { ColorWheel } from './ColorWheel'
import { Triangles } from './Triangles'
import { RadioButton } from './RadioButton'
import { ContextMenuView } from './ContextMenuView'
import { Rotate } from './Rotate'
import { NormalList } from './NormalList'
import { PageList } from './PageList'
import { KeyboardBlock } from './KeyboardBlock'
import { Progress } from './Progress'
import { RedDot } from './RedDot'
import { mapObjIndexed } from 'ramda'
import { TimeInput } from './NumberInput'
import { LightRange } from '../UI/utils/LightRange'
import { SwitchButton } from './switch'
import { HelpBox } from '../UI/Components/helpPoint/helpBox'
import { res } from '../res'
import { SpinBox_Ajazz } from './SpinBox_Ajazz'
import { TreeView_Ajazz } from './TreeView_Ajazz'
import { RadioButton_Ajazz } from './RadioButton_Ajazz'
import { SubNavbarItem_Ajazz } from '../UI/utils/SubNavbarItem'
import { ComboBox_Ajazz } from './ComboBox_Ajazz'
import { ComboBox_akko } from './ComboBox_akko'
import { Slider_Ajazz } from './Slider_Ajazz'

import { CheckBox2_Ajazz, CheckBox_Ajazz, DazzleColorCheckBox_Ajazz } from './CheckBox_Ajazz'
import { ComboBoxMui } from './ComboBoxMui'
import { MyComboBoxMui } from './MyComboBoxMui'
import { MySlider } from './MySlider'
import { KeyboardRange } from '../UI/utils/KeyboardRange'
import { ComboBoxSelect } from './ComboBoxSelect'

type ExtProps = {
  x?: number
  y?: number
  w?: number | string
  h?: number | string
  relative?: any
  display?: string
  form?: keyof typeof TypeTable
  boxShadow?: 'Default' | 'Dark'
  opacity?: number
  marginRight?: number
  zIndex?: number
}

const TypeTable = {
  hintBg: {
    background: `url(${res.img.ajazzImg.Popup})`,
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    boxShadow: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  welcomeBg: {
    background: '#252526',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    boxShadow: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  MainBackground: {
    background: `url(${res.img.ajazzImg.background})`,
    border: 'none',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    boxShadow: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  setBackground: {
    background: `url(${res.img.ajazzImg.background_02})`,
    border: 'none',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    boxShadow: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  border_hj: {
    background: 'transparent',
    borderTop: '1px solid #707072',
    borderBottom: '1px solid #707072',
    borderLeft: '1px solid #707072',
    borderRight: '1px solid #707072',
    boxShadow: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  border_hj_akko: {
    background: 'transparent',
    borderTop: 'none',
    borderBottom: '1px solid #e8e8e8',
    borderLeft: '1px solid #e8e8e8',
    borderRight: '1px solid #e8e8e8',
    boxShadow: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  border_hj2: {
    background: 'transparent',
    borderTop: '1px solid #707072',
    borderBottom: '1px solid #707072',
    borderLeft: '1px solid #707072',
    borderRight: 'none',
    boxShadow: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  border_hj2_akko: {
    background: 'transparent',
    borderTop: '1px solid #e8e8e8',
    borderBottom: '1px solid #e8e8e8',
    borderLeft: '1px solid #e8e8e8',
    borderRight: '1px solid #e8e8e8',
    boxShadow: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  border_hj3: {
    background: 'transparent',
    borderTop: '1px solid #707072',
    borderBottom: 'none',
    borderLeft: '1px solid #707072',
    borderRight: '1px solid #707072',
    boxShadow: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  border_hj3_akko: {
    background: 'transparent',
    borderTop: 'none',
    borderBottom: '1px solid #b2b2b2',
    borderLeft: 'none',
    borderRight: 'none',
    boxShadow: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  maricTitleRight1: {
    background: 'none',
    borderTop: 'none',
    borderBottom: '1px solid #707072',
    borderLeft: 'none',
    borderRight: 'none',
    boxShadow: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  maricTitleRight1_akko: {
    background: '#e8e8e8',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    boxShadow: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  maricTitle: {
    background: '#49494b',
    borderTop: '1px solid #707072',
    borderLeft: '1px solid #707072',
    borderRight: '1px solid #707072',
    boxShadow: 'none',
    opacity: 1,
    borderBottom: 'none',
    borderRadius: 0,
  },
  maricTitle1: {
    background: '#49494b',
    borderTop: '1px solid #707072',
    borderLeft: '1px solid #707072',
    borderRight: 'none',
    boxShadow: 'none',
    opacity: 1,
    borderBottom: 'none',
    borderRadius: 0,
  },
  maricTitleRight: {
    background: '#3a3a3a',
    borderTop: '1px solid #707072',
    borderLeft: '1px solid #707072',
    borderRight: '1px solid #707072',
    boxShadow: 'none',
    borderBottom: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  maricTitleRight_akko: {
    background: '#fff',
    borderTop: '1px solid #e8e8e8',
    borderLeft: '1px solid #e8e8e8',
    borderRight: '1px solid #e8e8e8',
    borderBottom: '1px solid #e8e8e8',
    boxShadow: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  maricTitleLeft: {
    background: '#3a3a3a',
    borderTop: '1px solid #707072',
    borderBottom: 'none',
    borderLeft: '1px solid #707072',
    borderRight: 'none',
    boxShadow: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  maricTitleLeft_akko: {
    background: '#e8e8e8',
    borderTop: '1px solid #e8e8e8',
    borderBottom: '1px solid #e8e8e8',
    borderLeft: '1px solid #e8e8e8',
    borderRight: '1px solid #e8e8e8',
    boxShadow: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  背景页0: {
    background: 'none',
    border: 'none',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    boxShadow: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  颜色选择框背景_Ajazz: {
    background: '#252525',
    borderTop: '1px solid #707070',
    borderBottom: '1px solid #707070',
    borderLeft: '1px solid #707070',
    borderRight: '1px solid #707070',
    boxShadow: 'none',
    opacity: 1,
    borderRadius: 5,
  },
  //以上添加
  DefaultBackground: {
    background: '#121212',
    border: 'none',
    boxShadow: 'none',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  弹出框: {
    background: '#1c1c1c',
    border: 'none',
    boxShadow: 'none',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  弹出框1: {
    background: '#1c1c1c',
    border: '2px solid gray',
    boxShadow: 'none',
    opacity: 1,
  },
  EmptyBackground: {
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    opacity: 1,
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderRadius: 0
  },
  MacroBackground: {
    background: '#201f1f',
    border: 'none',
    boxShadow: 'none',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  Border: {
    background: 'transparent',
    border: 'solid 1px #201f1f',
    boxShadow: 'none',
    borderTop: 'solid 1px #201f1f',
    borderBottom: 'solid 1px #201f1f',
    borderLeft: 'solid 1px #201f1f',
    borderRight: 'solid 1px #201f1f',
    opacity: 1,
    borderRadius: 0,
  },
  配置页: {
    background: '#121212',
    border: 'none',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    boxShadow: '2px 0px 2px 0px #1f1f1f,-2px 0px 2px 0px #1f1f1f',
    opacity: 1,
    borderRadius: 0,
  },
  背景页: {
    background: '#121212',
    border: 'none',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    boxShadow: 'none',
    opacity: 0.85,
    borderRadius: 0,
  },
  颜色选择框背景: {
    background: '#252525',
    border: '1px solid #ff0000',
    boxShadow: 'none',
    borderTop: '1px solid #ff0000',
    borderBottom: '1px solid #ff0000',
    borderLeft: '1px solid #ff0000',
    borderRight: '1px solid #ff0000',
    opacity: 1,
    borderRadius: 0,
  },
  测试: {
    background: 'green',
    border: 'none',
    boxShadow: 'none',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  可调整: {
    background: 'none',
    border: 'none',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    boxShadow: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  loading: {
    background: '#121212',
    border: 'none',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    boxShadow: 'none',
    opacity: 0.7,
    borderRadius: 0,
  },
  被选中: {
    background: 'linear-gradient(90deg,#1f1e1e 0%, #121212 100%)',
    border: 'none',
    boxShadow: 'none',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    opacity: 1,
    borderRadius: 0,
  },
  用户协议: {
    background: 'transparent',
    border: '1px solid #393939',
    boxShadow: 'none',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderRadius: 0,
    opacity: 1,
  },
  picPreview: {
    background: 'rgba(18,18,18,.7)',
    border: 'none',
    boxShadow: 'none',
    opacity: 1,
  },
}

type PropsType<T extends any> = T extends React.ComponentType<infer R> ? R : any

const 添加ExtProps = <T extends any>(C: React.ComponentType<T>) => (
  p: T & ExtProps
) => (
  <div
    style={{
      position: p.relative === undefined ? 'absolute' : 'relative',
      left: p.x === undefined ? 0 : p.x,
      top: p.y === undefined ? 0 : p.y,
      width: p.w === undefined ? '100%' : p.w,
      height: p.h === undefined ? '100%' : p.h,
      display: p.display ? p.display : 'block',
      background: TypeTable[p.form ? p.form : 'EmptyBackground'].background,
      borderBottom: TypeTable[p.form ? p.form : 'EmptyBackground'].borderBottom,
      borderRight: TypeTable[p.form ? p.form : 'EmptyBackground'].borderRight,
      borderLeft: TypeTable[p.form ? p.form : 'EmptyBackground'].borderLeft,
      borderTop: TypeTable[p.form ? p.form : 'EmptyBackground'].borderTop,
      opacity: TypeTable[p.form ? p.form : 'EmptyBackground'].opacity,
      boxShadow: TypeTable[p.form ? p.form : 'EmptyBackground'].boxShadow,
      borderRadius: TypeTable[p.form ? p.form : 'EmptyBackground'].borderRadius,
      marginRight: p.marginRight ? p.marginRight : '',
      zIndex: p.zIndex === undefined ? 1 : p.zIndex
    }}>
    <C {...p} />
  </div>
)

const _____ = <T extends { [key: string]: React.ComponentType<any> }>(dic: T) =>
  mapObjIndexed(添加ExtProps, dic) as {
    [P in keyof T]: React.ComponentType<PropsType<T[P]> & ExtProps>
  }

export const dj = _____({
  View,
  TextWarn,
  Text,
  TextEll,
  List,
  FlexView,
  FlexColorView,
  FlexView2,
  CheckBox,
  CheckBox2,
  DazzleColorCheckBox,
  Slider,
  SpinBox,
  RouterLink,
  Line,
  Ul,
  Img,
  Button,
  Button_akko,
  ButtonELL,
  KeyboardButtonELL,
  VerticalLine,
  WhiteVerticalLine,
  ColorBlock,
  ComboBox,
  TextArea,
  TreeView,
  MacroButton,
  MacroContextMenu,
  AddMacroContextMenu,
  SearchBar,
  SchemeItem,
  PicSchemeItem,
  TextInput,
  TextInput_akko,
  TextSetInput,
  UserView,
  ColorWheel,
  Triangles,
  RadioButton,
  ContextMenuView,
  Rotate,
  NormalList,
  PageList,
  KeyboardBlock,
  Progress,
  RedDot,
  TimeInput,
  LightRange,
  KeyboardRange,
  SwitchButton,
  HelpBox,
  //添加
  SpinBox_Ajazz,
  VerticalLine_Ajazz,
  TreeView_Ajazz,
  RadioButton_Ajazz,
  Line_Ajazz,
  SubNavbarItem_Ajazz,
  ComboBox_Ajazz,
  ComboBox_akko,
  Slider_Ajazz,
  MySlider,
  DazzleColorCheckBox_Ajazz,
  CheckBox2_Ajazz,
  CheckBox_Ajazz,
  ComboBoxMui,
  MyComboBoxMui,
  ComboBoxSelect,
  TextArea_akko,
})



const ccc = <T extends any>(C: React.ComponentType<T>) => (
  p: T & ExtProps
) => (
  <div
    style={{
      position: p.relative === undefined ? 'absolute' : 'relative',
      left: p.x === undefined ? 0 : p.x,
      top: p.y === undefined ? 0 : p.y,
      width: p.w === undefined ? '100%' : p.w,
      height: p.h === undefined ? '100%' : p.h,
      display: p.display ? p.display : 'block',
      background: TypeTable[p.form ? p.form : 'EmptyBackground'].background,
      border: TypeTable[p.form ? p.form : 'EmptyBackground'].border,
      opacity: TypeTable[p.form ? p.form : 'EmptyBackground'].opacity,
      boxShadow: TypeTable[p.form ? p.form : 'EmptyBackground'].boxShadow,
      zIndex: 999,
    }}>
    <C {...p} />
  </div>
)
const asd = <T extends { [key: string]: React.ComponentType<any> }>(dic: T) =>
  mapObjIndexed(ccc, dic) as {
    [P in keyof T]: React.ComponentType<PropsType<T[P]> & ExtProps>
  }

export const dj2 = asd({
  View2,
})