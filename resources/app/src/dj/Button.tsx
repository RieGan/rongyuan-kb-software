import React from 'react'
import styled from '@emotion/styled'

import { Text, TextEll } from './Text'
import { FlexView } from './FlexView'
import { BaseType } from './BaseType'
import { res } from '../res'

const Container = styled.div(
  (p: {
    datasrc?: BaseType.ButtonStateImg
    isHightLight: boolean
    opacity: number
    textColor: BaseType.ButtonStateImg
    border: BaseType.ButtonStateImg
    background: BaseType.ButtonStateImg
    borderRadius: number
    borderBottom: BaseType.ButtonStateImg

  }) => ({
    opacity: p.opacity,
    color: p.isHightLight ? p.textColor.active : p.textColor.normal,
    border: p.isHightLight ? p.border.active : p.border.normal,
    background: p.isHightLight ? p.background.active : p.background.normal,
    borderRadius: p.borderRadius,
    borderBottom: p.isHightLight
      ? p.borderBottom.active
      : p.borderBottom.normal,

    '&:hover': {
      border: p.border.hover,
      background: p.background.hover,
      borderBottom: p.isHightLight
        ? p.borderBottom.active
        : p.borderBottom.hover,
    },
    '&:active': {
      border: p.border.active,
      background: p.background.active,
      borderBottom: p.borderBottom.active,
    },

    '&:hover .text': {
      color: p.textColor.hover,
    },

    '&:active .text': {
      color: p.textColor.active,
    },

    '.image': {
      background: p.datasrc
        ? p.isHightLight
          ? `url(${p.datasrc.active})`
          : `url(${p.datasrc.normal})`
        : '',
    },
    '&:hover .image': {
      background: p.datasrc
        ? p.isHightLight
          ? `url(${p.datasrc.active})`
          : `url(${p.datasrc.hover})`
        : '',
    },
    '&:active .image': {
      background: p.datasrc ? `url(${p.datasrc.active})` : '',
    },
  }),
  {
    width: '100%',
    height: '100%',
  }
)
const Container_akko = styled.div(
  (p: {
    datasrc?: BaseType.ButtonStateImg
    isHightLight: boolean
    opacity: number
    textColor: BaseType.ButtonStateImg
    border: BaseType.ButtonStateImg
    background: BaseType.ButtonStateImg
    borderRadius: number
    borderBottom: BaseType.ButtonStateImg

  }) => ({
    opacity: p.opacity,
    color: p.isHightLight ? p.textColor.active : p.textColor.normal,
    border: p.isHightLight ? p.border.active : p.border.normal,
    background: p.isHightLight ? p.background.active : p.background.normal,
    borderRadius: p.borderRadius,
    borderBottom: p.isHightLight
      ? p.borderBottom.active
      : p.borderBottom.normal,

    '&:hover': {
      cursor: 'pointer',
      border: p.border.hover,
      background: p.background.hover,
      borderBottom: p.isHightLight
        ? p.borderBottom.active
        : p.borderBottom.hover,
    },
    '&:active': {
      border: p.border.active,
      background: p.background.active,
      borderBottom: p.borderBottom.active,
    },

    '&:hover .text': {
      // opacity: 0.75,
      color: p.textColor.hover,
    },

    '&:active .text': {
      color: p.textColor.active,
    },

    '.image': {
      background: p.datasrc
        ? p.isHightLight
          ? `url(${p.datasrc.active})`
          : `url(${p.datasrc.normal})`
        : '',
    },
    '&:hover .image': {
      background: p.datasrc
        ? p.isHightLight
          ? `url(${p.datasrc.active})`
          : `url(${p.datasrc.hover})`
        : '',
    },
    '&:active .image': {
      background: p.datasrc ? `url(${p.datasrc.active})` : '',
    },
  }),
  {
    width: '100%',
    height: '100%',
    borderRadius: '10px'
  }
)

const AllTextWhite = {
  normal: '#ffffff',
  hover: '#ffffff',
  active: '#ffffff',
}
const AllTextBlack = {
  normal: '#555658',
  hover: '#555658',
  active: '#555658',
}

const ButtonText_akko = {
  normal: '#ffffff',
  hover: '#7a6caa',
  active: '#ffffff',
}

const NoneStyle = {
  normal: 'none',
  hover: 'none',
  active: 'none',
}

const BasicStyleTable = {
  BorderBackground_HJ: {
    opacity: 1,
    textColor: AllTextWhite,
    border: NoneStyle,
    background: {
      normal: `url(${res.img.ajazzImg.button.normal})`,
      hover: `url(${res.img.ajazzImg.button.hover})`,
      active: `url(${res.img.ajazzImg.button.active})`,
    },
    borderRadius: 0,
    textType: '按钮_子页面',
    borderBottom: NoneStyle,

  },
  BorderBackground_HJ_akko: {
    opacity: 1,
    textColor: {
      normal: `#555658`,
      hover: `#fff`,
      active: `#fff`,
    },
    border: {
      normal: '1px solid #7a6caa',
      hover: '1px solid #7a6caa',
      active: '1px solid #7a6caa',
    },
    background: {
      normal: `transparent`,
      hover: `#7a6caa`,
      active: `#7a6caa`,
    },
    borderRadius: 10,
    textType: '按钮_子页面_无颜色',
    borderBottom: {
      normal: '1px solid #7a6caa',
      hover: '1px solid #7a6caa',
      active: '1px solid #7a6caa',
    },
  },
  BorderBackground_HJ_update: {
    opacity: 1,
    textColor: {
      normal: `#fff`,
      hover: `#71659C`,
      active: `#fff`,
    },
    border: {
      normal: '1px solid #7a6caa',
      hover: '1px solid #554D6F',
      active: '1px solid #7a6caa',
    },
    background: {
      normal: `#7a6caa`,
      hover: `#554D6F`,
      active: `#7a6caa`,
    },
    borderRadius: 10,
    textType: '按钮_子页面_无颜色',
    borderBottom: {
      normal: '1px solid #7a6caa',
      hover: '1px solid #554D6F',
      active: '1px solid #7a6caa',
    },
  },
  BorderBackground_HJ2: {
    opacity: 1,
    textColor: AllTextWhite,
    border: NoneStyle,
    background: {
      normal: `url(${res.img.ajazzImg.button.active})`,
      hover: `url(${res.img.ajazzImg.button.active})`,
      active: `url(${res.img.ajazzImg.button.active})`,
    },
    borderRadius: 0,
    textType: '按钮_子页面',
    borderBottom: NoneStyle,

  },
  BorderBackground_AKKO: {
    opacity: 1,
    textColor: ButtonText_akko,
    border: NoneStyle,
    background: {
      normal: `#7a6caa`,
      hover: `#554d6f`,
      active: `#7a6caa`,
    },
    borderRadius: 0,
    textType: '按钮_子页面',
    borderBottom: NoneStyle,

  },
  BorderBg_HJ: {
    opacity: 1,
    textColor: AllTextWhite,
    border: {
      normal: '1px solid #a5a5a5',
      hover: '1px solid #ff0000',
      active: '1px solid #ff0000',
    },
    background: NoneStyle,
    borderRadius: 0,
    textType: '按钮_子页面',
    borderBottom: {
      normal: '1px solid #a5a5a5',
      hover: '1px solid #ff0000',
      active: '1px solid #ff0000',
    },

  },
  BorderBg_akko: {
    opacity: 1,
    textColor: AllTextBlack,
    border: {
      normal: '1px solid #7a6caa',
      hover: '1px solid #7a6caa',
      active: '1px solid #7a6caa',
    },
    background: NoneStyle,
    borderRadius: 0,
    textType: '按钮_注册_akko',
    borderBottom: {
      normal: '1px solid #7a6caa',
      hover: '1px solid #7a6caa',
      active: '1px solid #7a6caa',
    },

  },
  小标题: {
    opacity: 1,
    textColor: {
      normal: '#f1f1f1',
      hover: '#f1f1f1',
      active: '#f1f1f1',
    },
    border: NoneStyle,
    background: NoneStyle,
    padding: '2px 0',
    borderRadius: 0,
    textType: '小标题',
    borderBottom: {
      normal: '3px solid #fe0300',
      hover: '3px solid #fe0300',
      active: '3px solid #fe0300',
    },
  },
  Bluer_right: {
    opacity: 1,
    textColor: {
      normal: '#9f9f9f',
      hover: '#f5f5f5',
      active: '#f5f5f5',
    },
    border: NoneStyle,
    background: {
      normal: 'none',
      hover: '#49494b',
      active: '#49494b',
    },
    borderRadius: 0,
    textType: '按钮_常规',
    borderBottom: NoneStyle,
  },
  Bluer_right_akko: {
    opacity: 1,
    textColor: {
      normal: '#555658',
      hover: '#fff',
      active: '#fff',
    },
    border: NoneStyle,
    background: {
      normal: 'none',
      hover: '#7a6caa',
      active: '#7a6caa',
    },
    borderRadius: 0,
    textType: '按钮_常规_无颜色',
    borderBottom: NoneStyle,
  },
  Bluer_right_sort: {
    opacity: 1,
    textColor: {
      normal: '#555658',
      hover: '#7a6caa',
      active: '#7a6caa',
    },
    border: NoneStyle,
    background: {
      normal: 'none',
      hover: 'none',
      active: 'none',
    },
    borderRadius: 0,
    textType: '按钮_常规_无颜色',
    borderBottom: NoneStyle,
  },
  子侧边栏_akko: {
    opacity: 1,
    textColor: {
      normal: '#5a5a5a',
      hover: '#7a6ca9',
      active: '#7a6ca9',
    },
    border: {
      normal: '#5a5a5a',
      hover: '#959595',
      active: '#ffffff',
    },
    background: NoneStyle,
    borderRadius: 0,
    textType: '子侧边栏_akko',
    borderBottom: {
      normal: 'none',
      hover: 'none',
      active: '3px solid #7a6caa',
    },
  },
  Lighter_Ajazz: {
    opacity: 1,
    textColor: {
      normal: '#757575',
      hover: '#a4a4a5',
      active: '#a4a4a5',
    },
    border: NoneStyle,
    background: NoneStyle,
    borderRadius: 0,
    textType: '按钮_常规',
    borderBottom: NoneStyle,
  },
  radiusBackg_gray: {
    opacity: 1,
    textColor: AllTextWhite,
    border: NoneStyle,
    background: {
      normal: `url(${res.img.ajazzImg.button_radius.normal})`,
      hover: `url(${res.img.ajazzImg.button_radius.normal})`,
      active: `url(${res.img.ajazzImg.button_radius.active})`,
    },
    borderRadius: 0,
    textType: '按钮_子页面',
    borderBottom: NoneStyle,
  },
  radiusBackg_red: {
    opacity: 1,
    textColor: AllTextWhite,
    border: NoneStyle,
    background: {
      normal: `url(${res.img.ajazzImg.button_radius.active})`,
      hover: `url(${res.img.ajazzImg.button_radius.active})`,
      active: `url(${res.img.ajazzImg.button_radius.active})`,
    },
    borderRadius: 5,
    textType: '按钮_子页面',
    borderBottom: NoneStyle,
  },
  MacroAdd_Head_Ajazz: {
    opacity: 1,
    textColor: { normal: '#9f9f9f', hover: '#f5f5f5', active: '#f5f5f5' },
    border: NoneStyle,
    background: NoneStyle,
    borderRadius: 0,
    textType: '按钮_常规',
    borderBottom: NoneStyle,
  },
  //以上添加
  Username: {
    opacity: 1,
    textColor: {
      normal: '#5a5a5a',
      hover: '#959595',
      active: '#ffffff',
    },
    border: NoneStyle,
    background: NoneStyle,
    borderRadius: 0,
    textType: '登录注册按钮_akko',
    borderBottom: NoneStyle,
  },
  不可用: {
    opacity: 1,
    textColor: {
      normal: '#959595',
      hover: '#959595',
      active: '#959595',
    },
    border: NoneStyle,
    background: NoneStyle,
    borderRadius: 0,
    textType: '侧边栏',
    borderBottom: NoneStyle,
  },
  侧边栏: {
    opacity: 1,
    textColor: {
      normal: '#5a5a5a',
      hover: '#959595',
      active: '#ffffff',
    },
    border: NoneStyle,
    background: NoneStyle,
    borderRadius: 0,
    textType: '侧边栏',
    borderBottom: NoneStyle,
  },
  子侧边栏: {
    opacity: 1,
    textColor: {
      normal: '#5a5a5a',
      hover: '#959595',
      active: '#ffffff',
    },
    border: {
      normal: '#5a5a5a',
      hover: '#959595',
      active: '#ffffff',
    },
    background: NoneStyle,
    borderRadius: 0,
    textType: '子侧边栏',
    borderBottom: {
      normal: 'none',
      hover: 'none',
      active: '2px solid #23f9e2',
    },
  },
  Lighter: {
    opacity: 1,
    textColor: {
      normal: '#5a5a5a',
      hover: '#959595',
      active: '#ffffff',
    },
    border: NoneStyle,
    background: NoneStyle,
    borderRadius: 0,
    textType: '按钮_常规',
    borderBottom: NoneStyle,
  },
  Lighter_akko: {
    opacity: 1,
    textColor: {
      normal: '#5a5a5a',
      hover: '#959595',
      active: '#ffffff',
    },
    border: NoneStyle,
    background: NoneStyle,
    borderRadius: 0,
    textType: '按钮_常规',
    borderBottom: NoneStyle,
  },
  Bluer: {
    opacity: 1,
    textColor: {
      normal: '#959595',
      hover: '#c4c4c4',
      active: '#23f9e2',
    },
    border: NoneStyle,
    background: NoneStyle,
    borderRadius: 0,
    //TODO:后续确定粗细
    textType: '按钮_常规',
    borderBottom: NoneStyle,
  },
  Border: {
    opacity: 1,
    textColor: AllTextWhite,
    border: {
      normal: 'solid 1px #5a5a5a',
      hover: 'solid 1px #959595 ',
      active: 'solid 1px #23f9e2',
    },
    background: NoneStyle,
    borderRadius: 0,
    textType: '按钮_子页面',
    borderBottom: {
      normal: 'solid 1px #5a5a5a',
      hover: 'solid 1px #959595 ',
      active: 'solid 1px #23f9e2',
    },
  },
  akko_btn: {
    opacity: 1,
    textColor: {
      normal: '#000',
      hover: '#fff ',
      active: '#fff',
    },
    border: {
      normal: 'solid 1px #7a6caa',
      hover: 'solid 1px #7a6caa ',
      active: 'solid 1px #7a6caa',
    },
    background: {
      normal: '#ffffff',
      hover: '#7a6caa ',
      active: '#7a6caa',
    },
    borderRadius: 10,
    textType: '按钮_子页面_无颜色',
    borderBottom: {
      normal: 'solid 1px #7a6caa',
      hover: 'solid 1px #7a6caa ',
      active: 'solid 1px #7a6caa',
    },
  },
  BorderBackground: {
    opacity: 1,
    textColor: AllTextWhite,
    border: {
      normal: 'solid 1px #252525',
      hover: 'solid 1px #323131',
      active: 'solid 1px #23f9e2',
    },
    background: {
      normal: '#252525',
      hover: ' #323131 ',
      active: '#252525',
    },
    borderRadius: 2,
    textType: '按钮_子页面',
    borderBottom: {
      normal: 'solid 1px #252525',
      hover: 'solid 1px #323131',
      active: 'solid 1px #23f9e2',
    },
  },
  Sparker: {
    opacity: 1,
    textColor: AllTextWhite,
    border: {
      normal: 'solid 1px #21ae9f',
      hover: 'solid 1px #21ae9f',
      active: 'solid 1px #21ae9f',
    },
    background: {
      normal: '#21ae9f',
      hover: '#21ae9f',
      active: '#21ae9f',
    },
    borderRadius: 2,
    textType: '按钮_常规',
    borderBottom: NoneStyle,
  },
  MacroAdd: {
    opacity: 1,
    textColor: AllTextWhite,
    border: NoneStyle,
    background: { normal: '#e18f02', hover: '#e18f02', active: '#e18f02' },
    borderRadius: 2,
    textType: '按钮_宏菜单',
    borderBottom: NoneStyle,
  },
  MacroAdd_Head: {
    opacity: 1,
    textColor: { normal: '#959595', hover: '#c4c4c4', active: '#23f9e2' },
    border: NoneStyle,
    background: NoneStyle,
    borderRadius: 0,
    textType: '按钮_宏菜单_Head',
    borderBottom: NoneStyle,
  },
  MacroEdit: {
    opacity: 1,
    textColor: AllTextWhite,
    border: NoneStyle,
    background: { normal: '#028ea8', hover: '#028ea8', active: '#028ea8' },
    borderRadius: 2,
    textType: '按钮_宏菜单',
    borderBottom: NoneStyle,
  },
  MacroDelete: {
    opacity: 1,
    textColor: AllTextWhite,
    border: NoneStyle,
    background: { normal: '#bc373b', hover: '#bc373b', active: '#bc373b' },
    borderRadius: 2,
    textType: '按钮_宏菜单',
    borderBottom: NoneStyle,
  },
  MacroSub: {
    opacity: 1,
    textColor: AllTextWhite,
    border: NoneStyle,
    background: { normal: '#007ddb', hover: '#007ddb', active: '#007ddb' },
    borderRadius: 2,
    textType: '按钮_宏菜单',
    borderBottom: NoneStyle,
  },
  MacroSub_Head: {
    opacity: 1,
    textColor: { normal: '#bababa', hover: '#ffff', active: '#bababa' },
    border: NoneStyle,
    background: { normal: '#252525', hover: '#1d1d1d', active: '#252525' },
    borderRadius: 0,
    textType: '按钮_宏菜单',
    borderBottom: NoneStyle,
  },
  Scheme: {
    opacity: 1,
    textColor: {
      normal: '#959595',
      hover: '#c4c4c4',
      active: '#23f9e2',
    },
    border: {
      normal: 'solid 1px #5a5a5a',
      hover: 'solid 1px #959595 ',
      active: 'solid 1px #23f9e2',
    },
    background: NoneStyle,
    borderRadius: 0,
    textType: '按钮_常规',
    borderBottom: {
      normal: 'solid 1px #5a5a5a',
      hover: 'solid 1px #959595 ',
      active: 'solid 1px #23f9e2',
    },
  },
  Scheme_akko: {
    opacity: 1,
    textColor: {
      normal: '#959595',
      hover: '#c4c4c4',
      active: '#23f9e2',
    },
    border: NoneStyle,
    background: NoneStyle,
    borderRadius: 0,
    textType: '按钮_常规_无颜色',
    borderBottom: NoneStyle,
  },
  Keyboard: {
    opacity: 1,
    textColor: {
      normal: 'transparent',
      hover: 'transparent',
      active: 'transparent',
    },
    border: {
      normal: 'none',
      hover: 'solid 1px #23f9e2',
      active: 'solid 1px #23f9e2',
    },
    background: {
      normal: 'transparent',
      hover: 'transparent',
      active: '#4cd7c7',
    },
    borderRadius: 6,
    textType: '按钮_常规',
    borderBottom: {
      normal: 'none',
      hover: 'solid 1px #23f9e2',
      active: 'solid 1px #23f9e2',
    },
  },
  KeyboardHighLight: {
    opacity: 0.33,
    textColor: {
      normal: 'transparent',
      hover: 'transparent',
      active: 'transparent',
    },
    border: {
      normal: 'solid 1px #23f9e2',
      hover: 'solid 1px #23f9e2',
      active: 'solid 1px #23f9e2',
    },
    background: {
      normal: '#4cd7c7',
      hover: '#4cd7c7',
      active: '#4cd7c7',
    },
    borderRadius: 6,
    textType: '按钮_常规',
    borderBottom: {
      normal: 'solid 1px #23f9e2',
      hover: 'solid 1px #23f9e2',
      active: 'solid 1px #23f9e2',
    },
  },
  KeyboardPic: {
    opacity: 0.5,
    textColor: {
      normal: 'transparent',
      hover: 'transparent',
      active: 'transparent',
    },
    border: {
      normal: 'solid 1px #ffffff',
      hover: 'solid 1px #ffffff',
      active: 'solid 1px #ffffff',
    },
    background: {
      normal: '#ffffff',
      hover: '#ffffff',
      active: '#ffffff',
    },
    borderRadius: 6,
    textType: '按钮_常规',
    borderBottom: {
      normal: 'solid 1px #ffffff',
      hover: 'solid 1px #ffffff',
      active: 'solid 1px #ffffff',
    },
  },
  KeyboardExample: {
    opacity: 1,
    textColor: {
      normal: 'transparent',
      hover: 'transparent',
      active: 'transparent',
    },
    border: {
      normal: 'solid 1px #23f9e2',
      hover: 'solid 1px #23f9e2',
      active: 'solid 1px #23f9e2',
    },
    background: {
      normal: '#4cd7c7',
      hover: '#4cd7c7',
      active: '#4cd7c7',
    },
    borderRadius: 6,
    textType: '按钮_常规',
    borderBottom: {
      normal: 'solid 1px #23f9e2',
      hover: 'solid 1px #23f9e2',
      active: 'solid 1px #23f9e2',
    },
  },
  KeyboardExample_akko: {
    opacity: 1,
    textColor: {
      normal: 'transparent',
      hover: 'transparent',
      active: 'transparent',
    },
    border: {
      normal: 'solid 1px #7a6aac',
      hover: 'solid 1px #7a6aac',
      active: 'solid 1px #7a6aac',
    },
    background: {
      normal: '#7a6aac',
      hover: '#7a6aac',
      active: '#7a6aac',
    },
    borderRadius: 6,
    textType: '按钮_常规',
    borderBottom: {
      normal: 'solid 1px #7a6aac',
      hover: 'solid 1px #7a6aac',
      active: 'solid 1px #7a6aac',
    },
  },
  按键设置: {
    opacity: 1,
    textColor: {
      normal: '#959595',
      hover: '#c4c4c4',
      active: '#23f9e2',
    },
    border: NoneStyle,
    background: NoneStyle,
    borderRadius: 0,
    textType: '按钮_常规',
    borderBottom: {
      normal: 'none',
      hover: 'none',
      active: 'solid 2px #23f9e2',
    },
  },
  鼠标按键: {
    opacity: 1,
    textColor: {
      normal: '#ffffff',
      hover: '#23f9e2',
      active: '#23f9e2',
    },
    border: {
      normal: 'solid 1px #ffffff',
      hover: 'solid 2px #23f9e2',
      active: 'solid 2px #23f9e2',
    },
    background: NoneStyle,
    borderRadius: 11,
    textType: '鼠标按键',
    borderBottom: {
      normal: 'solid 1px #ffffff',
      hover: 'solid 2px #23f9e2',
      active: 'solid 2px #23f9e2',
    },
  },
  同意用户协议: {
    opacity: 1,
    textColor: {
      normal: '#5a5a5a',
      hover: '#23f9e2',
      active: '#23f9e2',
    },
    border: NoneStyle,
    background: NoneStyle,
    borderRadius: 0,
    textType: '按钮_恢复默认设置',
    borderBottom: {
      normal: 'solid 1px #5a5a5a',
      hover: 'solid 1px #23f9e2',
      active: 'solid 1px #23f9e2',
    },
  },
  文本text: {
    opacity: 1,
    textColor: {
      normal: '#5a5a5a',
      hover: '#5a5a5a',
      active: '#5a5a5a',
    },
    border: NoneStyle,
    background: NoneStyle,
    borderRadius: 0,
    textType: '按钮_常规',
    borderBottom: NoneStyle,
  },
} as const

export const Button = (p: {
  isHightLight?: boolean
  mode?: keyof typeof BasicStyleTable
  textAlign?: BaseType.TextAlign
  text?: React.ReactNode
  textW?: number
  reverse?: any
  classname?: string
  img?: {
    size?: { w: number; h: number }
    src?: BaseType.ButtonStateImg
  }
  clickHandle?: () => void
  mouseEnter?: () => void
  mouseLeave?: () => void
  mouseDown?: () => void
  mouseUp?: () => void
  isDisabled?: boolean
}) => (
  <Container
    datasrc={p.img?.src}
    isHightLight={Boolean(p.isHightLight)}
    opacity={BasicStyleTable[p.mode || 'Lighter']['opacity']}
    textColor={
      BasicStyleTable[(!p.isDisabled ? p.mode : '不可用') || 'Lighter'][
      'textColor'
      ]
    }
    border={BasicStyleTable[p.mode || 'Lighter']['border']}
    background={BasicStyleTable[p.mode || 'Lighter']['background']}
    borderRadius={BasicStyleTable[p.mode || 'Lighter']['borderRadius']}
    borderBottom={BasicStyleTable[p.mode || 'Lighter']['borderBottom']}
    onClick={(event) => {
      !p.isDisabled &&
        (p.clickHandle && p.clickHandle(), event.stopPropagation())
    }}
    onMouseEnter={p.mouseEnter}
    onMouseLeave={p.mouseLeave}
    onMouseDown={p.mouseDown}
    onMouseUp={p.mouseUp}
  >
    <FlexView
      justifyContent={'space-between'}
      alignItems={'center'}
      flexDirection={p.reverse ? 'row-reverse' : 'row'}
    >
      {p.img && (
        <div
          style={{
            width: p?.img?.src ? p.img.size?.w || '100%' : 0,
            height: p?.img?.src ? p.img.size?.h || '100%' : 0,
          }}>
          <div
            className='image'
            style={{
              width: '100%',
              height: '100%',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
      )}
      {p.text && (
        <div
          className='text'
          style={{
            width: p.textW || '100%',
            padding: '0px 3px'
          }}>
          <Text
            type={BasicStyleTable[p.mode || '侧边栏'].textType}
            text={p.text}
            classname={p.classname}
            isDisabled={p.isDisabled}
          />
        </div>
      )}
    </FlexView>
  </Container>
)
export const Button_akko = (p: {
  isHightLight?: boolean
  mode?: keyof typeof BasicStyleTable
  textAlign?: BaseType.TextAlign
  text?: React.ReactNode
  textW?: number
  reverse?: any
  classname?: string
  img?: {
    size?: { w: number; h: number }
    src?: BaseType.ButtonStateImg
  }
  clickHandle?: () => void
  mouseEnter?: () => void
  mouseLeave?: () => void
  mouseDown?: () => void
  mouseUp?: () => void
  isDisabled?: boolean
}) => (
  <Container_akko
    datasrc={p.img?.src}
    isHightLight={Boolean(p.isHightLight)}
    opacity={BasicStyleTable[p.mode || 'Lighter']['opacity']}
    textColor={
      BasicStyleTable[(!p.isDisabled ? p.mode : '不可用') || 'Lighter'][
      'textColor'
      ]
    }
    border={BasicStyleTable[p.mode || 'Lighter']['border']}
    background={BasicStyleTable[p.mode || 'Lighter']['background']}
    borderRadius={BasicStyleTable[p.mode || 'Lighter']['borderRadius']}
    borderBottom={BasicStyleTable[p.mode || 'Lighter']['borderBottom']}
    onClick={(event) => {
      !p.isDisabled &&
        (p.clickHandle && p.clickHandle(), event.stopPropagation())
    }}
    onMouseEnter={p.mouseEnter}
    onMouseLeave={p.mouseLeave}
    onMouseDown={p.mouseDown}
    onMouseUp={p.mouseUp}
  >
    <FlexView
      justifyContent={'space-between'}
      alignItems={'center'}
      flexDirection={p.reverse ? 'row-reverse' : 'row'}>
      {p.img && (
        <div
          style={{
            width: p?.img?.src ? p.img.size?.w || '100%' : 0,
            height: p?.img?.src ? p.img.size?.h || '100%' : 0,
          }}>
          <div
            className='image'
            style={{
              width: '100%',
              height: '100%',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
      )}
      {p.text && (
        <div
          className='text'
          style={{
            width: p.textW || '100%',
            padding: '0px 3px'
          }}>
          <Text
            type={BasicStyleTable[p.mode || '侧边栏'].textType}
            text={p.text}
            classname={p.classname}
            isDisabled={p.isDisabled}
          />
        </div>
      )}
    </FlexView>
  </Container_akko>
)

export const ButtonELL = (p: {
  isHightLight?: boolean
  mode?: keyof typeof BasicStyleTable
  textAlign?: BaseType.TextAlign
  text?: React.ReactNode
  textW?: number
  reverse?: any
  classname?: string
  img?: {
    size?: { w: number; h: number }
    src?: BaseType.ButtonStateImg
  }
  clickHandle?: () => void
  mouseEnter?: () => void
  mouseLeave?: () => void
  mouseDown?: () => void
  mouseUp?: () => void
  isDisabled?: boolean
}) => (
  <Container
    datasrc={p.img?.src}
    isHightLight={Boolean(p.isHightLight)}
    opacity={BasicStyleTable[p.mode || 'Lighter']['opacity']}
    textColor={
      BasicStyleTable[(!p.isDisabled ? p.mode : '不可用') || 'Lighter'][
      'textColor'
      ]
    }
    border={BasicStyleTable[p.mode || 'Lighter']['border']}
    background={BasicStyleTable[p.mode || 'Lighter']['background']}
    borderRadius={BasicStyleTable[p.mode || 'Lighter']['borderRadius']}
    borderBottom={BasicStyleTable[p.mode || 'Lighter']['borderBottom']}
    onClick={(event) => {
      !p.isDisabled &&
        (p.clickHandle && p.clickHandle(), event.stopPropagation())

    }}
    onMouseEnter={p.mouseEnter}
    onMouseLeave={p.mouseLeave}
    onMouseDown={p.mouseDown}
    onMouseUp={p.mouseUp}
  >
    <FlexView
      justifyContent={'space-between'}
      alignItems={'center'}
      flexDirection={p.reverse ? 'row-reverse' : 'row'}>
      {p.img && (
        <div
          style={{
            width: p?.img?.src ? p.img.size?.w || '100%' : 0,
            height: p?.img?.src ? p.img.size?.h || '100%' : 0,
          }}>
          <div
            className='image'
            style={{
              width: '100%',
              height: '100%',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
      )}
      {p.text && (
        <div
          className='text'
          style={{
            width: p.textW || '100%',
            padding: '0 3px'
          }}>
          <TextEll
            type={BasicStyleTable[p.mode || '侧边栏'].textType}
            text={p.text}
            classname={p.classname}
            isDisabled={p.isDisabled}
          />
        </div>
      )}
    </FlexView>
  </Container>
)

export const KeyboardButtonELL = (p: {
  isHightLight?: boolean
  mode?: keyof typeof BasicStyleTable
  textAlign?: BaseType.TextAlign
  text?: React.ReactNode
  textW?: number
  reverse?: any
  classname?: string
  img?: {
    size?: { w: number; h: number }
    src?: BaseType.ButtonStateImg
  }
  clickHandle?: () => void
  mouseEnter?: () => void
  mouseLeave?: () => void
  mouseDown?: () => void
  mouseUp?: () => void
  isDisabled?: boolean
}) => (
  <Container
    datasrc={p.img?.src}
    isHightLight={Boolean(p.isHightLight)}
    opacity={BasicStyleTable[p.mode || 'Lighter']['opacity']}
    textColor={
      BasicStyleTable[(!p.isDisabled ? p.mode : '不可用') || 'Lighter'][
      'textColor'
      ]
    }
    border={BasicStyleTable[p.mode || 'Lighter']['border']}
    background={BasicStyleTable[p.mode || 'Lighter']['background']}
    borderRadius={BasicStyleTable[p.mode || 'Lighter']['borderRadius']}
    borderBottom={BasicStyleTable[p.mode || 'Lighter']['borderBottom']}
    onClick={(event) => {
      !p.isDisabled &&
        (p.clickHandle && p.clickHandle(), event.stopPropagation())

    }}
    onMouseEnter={p.mouseEnter}
    onMouseLeave={p.mouseLeave}
    onMouseDown={p.mouseDown}
    onMouseUp={p.mouseUp}
  >
    <FlexView
      justifyContent={'space-between'}
      alignItems={'center'}
      flexDirection={p.reverse ? 'row-reverse' : 'row'}>
      {p.img && (
        <div
          style={{
            width: p?.img?.src ? p.img.size?.w || '100%' : 0,
            height: p?.img?.src ? p.img.size?.h || '100%' : 0,
          }}>
          <div
            className={'image ' + p.classname}
            style={{
              width: '100%',
              height: '100%',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
      )}
      {p.text && (
        <div
          className='text'
          style={{
            width: p.textW || '100%',
            padding: '0 3px'
          }}>
          <TextEll
            type={BasicStyleTable[p.mode || '侧边栏'].textType}
            text={p.text}
            classname={p.classname}
            isDisabled={p.isDisabled}
          />
        </div>
      )}
    </FlexView>
  </Container>
)