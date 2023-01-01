import React from 'react'
import styled from '@emotion/styled'

import { Button } from './Button'
import { BaseType } from './BaseType'

const StyledLink = styled.a(
  (p: {
    wauto: string
    boderbottomcolor: string | undefined
    borderraidus: string | undefined
  }) => ({
    width: p.wauto === 'false' ? '100%' : 'auto',
    height: '100%',
    borderBottom: p.boderbottomcolor ? `3px solid ${p.boderbottomcolor}` : '',
    borderRadius: p.borderraidus ? p.borderraidus : '0',
    textDecoration: 'none',
    display: 'inline-block',
  })
)

export const RouterLink = (p: {
  pure?: {
    boderBottomColor?: string
    borderRaidus?: string
  }
  img?: {
    size: { w: number; h: number }
    src: BaseType.ButtonStateImg
  }
  wAuto?: boolean
  isHightLight: boolean
  textMode: 'Lighter' | 'Bluer'
  textW?: number
  textAlign: BaseType.TextAlign
  type: 'Small' | 'Medium' | 'SubTitle' | 'Navbar' | 'Main'
  text: React.ReactNode
  clickHandle: () => void
}) => {
  return (
    <StyledLink
      wauto={p.wAuto ? 'true' : 'false'}
      boderbottomcolor={p.pure ? p.pure.boderBottomColor : 'transparent'}
      borderraidus={p.pure ? p.pure.borderRaidus : '0'}
      onClick={() => {
        p.clickHandle()
      }}>
      <Button
        img={p.img}
        isHightLight={p.isHightLight}
        mode={'侧边栏'}
        textW={p.textW}
        textAlign={p.textAlign}
        text={p.text}
      />
    </StyledLink>
  )
}
