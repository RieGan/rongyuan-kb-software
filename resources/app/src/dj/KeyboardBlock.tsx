import React from 'react'
import styled from '@emotion/styled'

const StyleTable = {
  Default: {
    opacity: 1,
    border: {
      normal: 'none',
      hover: 'solid 1px #23f9e2',
      active: 'solid 1px #23f9e2',
    },
    background: {
      normal: (color: string) => 'transparent',
      hover: (color: string) => 'transparent',
      active: (color: string) => '#4cd7c7',
    },
    borderRadius: 6,
  },
  CustomLight: {
    opacity: 0.33,
    border: {
      normal: 'solid 1px #23f9e2',
      hover: 'solid 1px #23f9e2',
      active: 'solid 1px #23f9e2',
    },
    background: {
      normal: (color: string) => color,
      hover: (color: string) => color,
      active: (color: string) => color,
    },
    borderRadius: 6,
  },
  CustomWeight: {
    opacity: 0.75,
    border: {
      normal: 'solid 1px #23f9e2',
      hover: 'solid 1px #23f9e2',
      active: 'solid 1px #23f9e2',
    },
    background: {
      normal: (color: string) => color,
      hover: (color: string) => color,
      active: (color: string) => color,
    },
    borderRadius: 6,
  },
  Test: {
    opacity: 1,
    border: {
      normal: 'solid 1px red',
      hover: 'solid 1px red',
      active: 'solid 1px red',
    },
    background: {
      normal: (color: string) => 'red',
      hover: (color: string) => 'red',
      active: (color: string) => '#red',
    },
    borderRadius: 6,
  },
  Forbidden: {
    opacity: 0.33,
    border: {
      normal: 'none',
      hover: 'none',
      active: 'none',
    },
    background: {
      normal: (color: string) => '#ff0000',
      hover: (color: string) => '#ff0000',
      active: (color: string) => '#ff0000',
    },
    borderRadius: 6,
  }
}

const Div = styled.div(
  (p: { color: string; type: keyof typeof StyleTable }) => ({
    with: '100%',
    height: '100%',
    opacity: StyleTable[p.type].opacity,
    border: StyleTable[p.type].border.normal,
    background: StyleTable[p.type].background.normal(p.color),
    borderRadius: StyleTable[p.type].borderRadius,

    '&:hover': {
      border: StyleTable[p.type].border.hover,
      background: StyleTable[p.type].background.hover(p.color),
    },
    '&:active': {
      border: StyleTable[p.type].border.active,
      background: StyleTable[p.type].background.active(p.color),
    },
  })
)

export const KeyboardBlock = (p: {
  mode?: {
    color: string
    type: keyof typeof StyleTable
  }
  clickHandle: () => void
  mouseDown?: () => void
  mouseUp?: () => void
}) => {
  const mode: {
    color: string
    type: keyof typeof StyleTable
  } = p.mode ? p.mode : { color: '', type: 'Default' }

  return <Div color={mode.color} type={mode.type} onClick={p.clickHandle} onMouseDown={p.mouseDown} onMouseUp={p.mouseUp} />
}
