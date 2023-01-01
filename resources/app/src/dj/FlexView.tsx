import styled from '@emotion/styled'
import React from 'react'

const Div = styled.div(
  (p: {
    flexDirection?: 'row' | 'column' | 'row-reverse'
    justifyContent?: string
    alignItems?: string
    hoverMode?: 'HightLight'
    horizontalScroll?: boolean
  }) => ({
    flexDirection: p.flexDirection,
    justifyContent: p.justifyContent ? p.justifyContent : '',
    alignItems: p.alignItems ? p.alignItems : '',
    '&:hover': {
      background: p.hoverMode
        ? { HightLight: 'linear-gradient(90deg,#1f1e1e 0%, #121212 100%)' }[
            p.hoverMode
          ]
        : '',
    },
    overflow: p.horizontalScroll ? 'auto hidden' : 'hidden hidden',
  }),
  {
    width: '100%',
    height: '100%',
    display: 'flex',
    outline: 'none',
    '&::-webkit-scrollbar': {
      width: '3px',
      height: '3px',
    },

    '&::-webkit-scrollbar-thumb': {
      background: 'gray',
      borderRadius: '3px',
    },
  }
)

const Div2 = styled.div(
  (p: {
    flexDirection?: 'row' | 'column' | 'row-reverse'
    justifyContent?: string
    alignItems?: string
    hoverMode?: 'HightLight'
    horizontalScroll?: boolean
    flexWrap?: 'wrap'
  }) => ({
    flexDirection: p.flexDirection,
    justifyContent: p.justifyContent ? p.justifyContent : '',
    flexWrap: p.flexWrap ? 'wrap' : 'nowrap',
    alignItems: p.alignItems ? p.alignItems : '',
    '&:hover': {
      background: p.hoverMode
        ? { HightLight: 'linear-gradient(90deg,#1f1e1e 0%, #121212 100%)' }[
            p.hoverMode
          ]
        : '',
    },
    overflow: p.horizontalScroll ? 'auto hidden' : 'hidden hidden',
  }),
  {
    width: '100%',
    height: '100%',
    display: 'flex',
    outline: 'none',
    '&::-webkit-scrollbar': {
      width: '3px',
      height: '3px',
    },

    '&::-webkit-scrollbar-thumb': {
      background: 'gray',
      borderRadius: '3px',
    },
  }
)
export const FlexView = Div
export const FlexView2 = Div2
export const FlexColorView = (p:{
  mouseOut:()=>void
})=>{

  return (
    <Div
      onMouseOut={p.mouseOut}></Div>
  )
}