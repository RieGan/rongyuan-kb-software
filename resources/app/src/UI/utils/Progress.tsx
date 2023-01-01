import React from 'react'

import { dj } from '../../dj'
import { res } from '../../res'

export const Progress = (p: { rate: number, hidAlert?: boolean, up?: boolean }) => {
  return (
    <>
      <dj.View form={'背景页'} drag={true}>
        {''}
      </dj.View>
      <dj.Progress
        w={800}
        h={40}
        x={200}
        y={348}
        rate={Math.floor(p.rate * 100)}
      />
      {p.hidAlert !== true && <dj.Text
        h={40}
        y={290}
        text={res.string.升级过程中严禁拔出或触碰设备USB}
        type={'升级警告'}
      />}
      <dj.Text
        h={15}
        y={400}
        text={p.up ? res.string.正在上传中 : res.string.正在升级中请耐心等候}
        type={'升级提示'}
      />
    </>
  )
}
