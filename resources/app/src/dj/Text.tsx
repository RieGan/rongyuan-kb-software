import * as React from 'react'
import styled from '@emotion/styled'

const ColorTable = {
  ____normal: '#a5a5a5',
  ____active: '#f4f4f4',
  ____macroDefault: '#cdcdcd',
  ____default: '#757575',
  //以上修改
  ____hover: '#959595',
  ____dark: '#121212',
  ____schemeHead: '#7a7a7a',
  ____sparker: '#21b6a6',
  ____keyboard: '#b9b9b9',
  ____waring: 'red',
  ____blue: '#23f9e2',
  ____upgrade: '#acaaaa',
  ____white: '#ffffff',
  ____black: '#555658',
}

const FontFamilyTable = {
  ____regular: 'OpenSans-Regular',
  ____medium: 'OpenSans-Regular',
  ____bold: 'OpenSans-Regular',
}

const TextMode = {
  提示标题: {
    size: '18px',
    color: '#a3a3a3',
    fontFamily: FontFamilyTable.____medium,
    textAlgin: 'left',
  },
  提示内容: {
    size: '15px',
    color: '#969696',
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  子侧边栏_akko: {
    size: '16px',
    fontFamily: FontFamilyTable.____medium,
    textAlgin: 'center',
  },
  小标题: {
    size: '15px',
    color: ColorTable.____normal,
    fontFamily: FontFamilyTable.____medium,
    textAlgin: 'left',
  },
  灯光键盘提示: {
    size: '13px',
    color: '#ff0000',
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'left',
  },
  //以上添加
  侧边栏: {
    size: '16px',
    color: ColorTable.____default,
    fontFamily: FontFamilyTable.____medium,
    textAlgin: 'left',
  },
  子侧边栏: {
    size: '16px',
    color: ColorTable.____normal,
    fontFamily: FontFamilyTable.____medium,
    textAlgin: 'left',
  },
  SubTitle: {
    size: '14px',
    color: '#cfcfcf',
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'left',
  },
  SubTitle_akko: {
    size: '16px',
    color: '#555658',
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'left',
  },
  SubTitle_center: {
    size: '16px',
    color: '#555658',
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  SubTitle_purple: {
    size: '16px',
    color: '#7a6caa',
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'left',
  },
  描述: {
    size: '14px',
    color: ColorTable.____hover,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'left',
  },
  MacroName: {
    size: '12px',
    color: ColorTable.____white,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'left',
  },
  CPI小标题: {
    size: '13px',
    color: ColorTable.____normal,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'left',
  },
  CPI序号: {
    size: '16px',
    color: ColorTable.____normal,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'left',
  },
  default: {
    size: '14px',
    color: 'inherit',
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'left',
  },
  鼠标型号: {
    size: '16px',
    color: ColorTable.____normal,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  启动页主标题: {
    size: '28px',
    color: ColorTable.____active,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  启动页主标题_black: {
    size: '28px',
    color: 'black',
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  启动页搜索: {
    size: '13px',
    color: ColorTable.____hover,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  启动页搜索_akko: {
    size: '16px',
    color: '#7A6CA9',
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  个人中心标题: {
    size: '30px',
    color: ColorTable.____black,
    fontFamily: FontFamilyTable.____medium,
    textAlgin: 'center',
  },
  配置页标题: {
    size: '16px',
    color: ColorTable.____macroDefault,
    fontFamily: FontFamilyTable.____medium,
    textAlgin: 'center',
  },
  tree: {
    size: '16px',
    color: ColorTable.____macroDefault,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  配置页名称: {
    size: '13px',
    color: ColorTable.____active,
    fontFamily: FontFamilyTable.____medium,
    textAlgin: 'left',
  },
  灯光页描述: {
    size: '13px',
    color: '#cfcfcf',
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  按键灵敏度描述: {
    size: '16px',
    color: '#655b87',
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  灯光页数值: {
    size: '10px',
    color: ColorTable.____hover,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  弹框标题: {
    size: '20px',
    color: ColorTable.____active,
    fontFamily: FontFamilyTable.____medium,
    textAlgin: 'center',
  },
  弹框标题_akko: {
    size: '20px',
    color: '#555658',
    fontFamily: FontFamilyTable.____medium,
    textAlgin: 'center',
  },
  分享配置页设备名: {
    size: '17px',
    color: ColorTable.____hover,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'left',
  },
  方案共享页表头: {
    size: '14px',
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  方案共享页表内容: {
    size: '13px',
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  树形文字: {
    size: '14px',
    color: ColorTable.____macroDefault,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'left',
  },
  树形文字_无颜色: {
    size: '14px',
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'left',
  },
  按钮_常规: {
    size: '14px',
    color: ColorTable.____default,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  按钮_常规_无颜色: {
    size: '14px',
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  宏_常规: {
    size: '12px',
    color: ColorTable.____default,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  宏_常规_white: {
    size: '12px',
    color: ColorTable.____white,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  按钮_子页面: {
    size: '13px',
    color: '#e8e4e4',
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  按钮_子页面_无颜色: {
    size: '15px',
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  按钮_注册_akko: {
    size: '13px',
    // color: '#e8e4e4',
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  按钮_宏菜单: {
    size: '11px',
    color: ColorTable.____active,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  按钮_宏菜单_黑字: {
    size: '11px',
    color: '#555658',
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  按钮_宏菜单_Head: {
    size: '13px',
    color: ColorTable.____default,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  登录注册按钮: {
    size: '14px',
    color: ColorTable.____default,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  按钮_恢复默认设置: {
    size: '14px',
    color: ColorTable.____default,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  按钮_默认配置: {
    size: '14px',
    color: ColorTable.____default,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'right',
  },
  user提示: {
    size: '12px',
    color: ColorTable.____normal,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  宏的单选复选框: {
    size: '13px',
    color: ColorTable.____hover,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'left',
  },
  忘记密码: {
    size: '12px',
    color: ColorTable.____sparker,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  键盘提示: {
    size: '13px',
    color: ColorTable.____keyboard,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'left',
  },
  组合键: {
    size: '18px',
    color: ColorTable.____hover,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'left',
  },
  单选框: {
    size: '14px',
    color: ColorTable.____hover,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'left',
  },
  提示: {
    size: '14px',
    color: ColorTable.____waring,
    fontFamily: FontFamilyTable.____medium,
    textAlgin: 'center',
  },
  已修改的按键值: {
    size: '14px',
    color: ColorTable.____blue,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'left',
  },
  鼠标按键: {
    size: '12px',
    color: ColorTable.____active,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  灯光界面提示: {
    size: '12px',
    color: ColorTable.____hover,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'left',
  },
  升级提示: {
    size: '12px',
    color: ColorTable.____upgrade,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  升级警告: {
    size: '20px',
    color: ColorTable.____waring,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
  单选框2: {
    size: '12px',
    color: '#6c6c6c',
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'left',
  },
  登录注册按钮_akko: {
    size: '16px',
    color: ColorTable.____white,
    fontFamily: FontFamilyTable.____regular,
    textAlgin: 'center',
  },
} as const //<------------------------- as const

export type TextProps = {
  text: React.ReactNode
  type?: keyof typeof TextMode
  isDisabled?: boolean
  classname?: string
}

const Span = styled.span((p: TextProps) => ({
  textAlign: TextMode[p.type || 'default'].textAlgin,
  fontFamily: TextMode[p.type || 'default'].fontFamily,
  fontSize: TextMode[p.type || 'default'].size,
  color: TextMode[p.type || 'default'].color,
  display: 'block',
  margin: 0,
  padding: 0,
  background: 'inherit',
  verticalAlign: 'middle',
  opacity: p.isDisabled ? 0.4 : 1,
}))



const Spanaa = styled.span((p: TextProps) => ({
  textAlign: TextMode[p.type || 'default'].textAlgin,
  fontFamily: TextMode[p.type || 'default'].fontFamily,
  fontSize: TextMode[p.type || 'default'].size,
  color: TextMode[p.type || 'default'].color,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'block',
  margin: 0,
  padding: 0,
  background: 'inherit',
  verticalAlign: 'middle',
  opacity: p.isDisabled ? 0.4 : 1,
}))
export const Text = (p: TextProps) => (
  <Span {...p} className={p.classname}>
    {p.text}
  </Span>
)

export const TextEll = (p: TextProps) => (
  <Spanaa {...p} className={p.classname}>
    {p.text}
  </Spanaa>
)

export const TextWarn = (p: TextProps) => (
  <Span {...p} className={p.classname}>
    {p.text}
  </Span>
)

export type TextProps2 = {
  text: React.ReactNode
  type?: keyof typeof TextMode
  isDisabled?: boolean
  classname?: string
  isBool: boolean
}
const SpanCheckBox = styled.span((p: TextProps2) => ({
  textAlign: TextMode[p.type || 'default'].textAlgin,
  fontFamily: TextMode[p.type || 'default'].fontFamily,
  fontSize: TextMode[p.type || 'default'].size,
  // color: TextMode[p.type || 'default'].color,
  color: p.isBool ? TextMode[p.type || 'default'].color : '#ffffff',
  textOverflow: 'ellipsis',
  display: 'block',
  margin: 0,
  padding: 0,
  background: 'inherit',
  verticalAlign: 'middle',
  opacity: p.isDisabled ? 0.4 : 1,
}))

export const TextCheckBox = (p: TextProps2) => (
  <SpanCheckBox {...p} className={p.classname}>
    {p.text}
  </SpanCheckBox>
)