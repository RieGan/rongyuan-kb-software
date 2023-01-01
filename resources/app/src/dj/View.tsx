import * as React from 'react'
import styled from '@emotion/styled'

const Div = styled.div((p: { hoverMode?: 'HightLight'; drag: boolean,top?:number}) => ({
  width: '100%',
  height: '100%',
  '&:hover': {
    background: p.hoverMode
      ? { HightLight: 'linear-gradient(90deg,#1f1e1e 0%, #121212 100%)' }[
          p.hoverMode
        ]
      : '',
  },
  'WebkitAppRegion': p.drag ? 'drag' : 'no-drag',
  paddingTop:p.top
}))

export const View = (p: {
  hoverMode?: 'HightLight'
  clickHandle?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  drag?: boolean
  children: any
  paddingTop?:number
}) => (
  <Div
    hoverMode={p.hoverMode}
    onClick={p.clickHandle}
    drag={p.drag ? p.drag : false}
    top={p.paddingTop}
    >
    {p.children}
  </Div>
)

export const View2 = (p: {
  hoverMode?: 'HightLight'
  clickHandle?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  drag?: boolean
  children: any
}) => (
  <Div
    hoverMode={p.hoverMode}
    onClick={p.clickHandle}
    drag={p.drag ? p.drag : false}>
    {p.children}
  </Div>
)