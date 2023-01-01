import React, { Fragment } from 'react'
import { dj } from '../../dj'

export const SubNavbarItem = (props: {
  title: React.ReactNode
  isClick: boolean
  clickHandle: () => void
}) => {
  const { title, isClick, clickHandle } = props

  return (
    <Fragment>
      <dj.Button
        relative
        w={'auto'}
        mode={'子侧边栏'}
        isHightLight={isClick}
        text={title}
        clickHandle={() => clickHandle()}
      />
      <dj.View relative w={20}>
        {''}
      </dj.View>
    </Fragment>
  )
}
export const SubNavbarItem_Ajazz = (props: {
  title: React.ReactNode
  isClick: boolean
  clickHandle: () => void
}) => {
  const { title, isClick, clickHandle } = props

  return (
    <Fragment>
      <div>
        <dj.Button
          relative
          w={130}
          mode={'子侧边栏_akko'}
          isHightLight={isClick}
          text={title}
          clickHandle={() => clickHandle()}
        />
      </div>
    </Fragment>
  )
}
