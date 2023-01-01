import React from 'react'

const TypeTable = {
  完全装入: {
    backgroundSize: 'cotain',
  },
  完全覆盖背景区: {
    backgroundSize: 'cover',
  },
}
export const Img = (p: { imgBg?: string; type?: keyof typeof TypeTable }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: p.imgBg ? `url(${p.imgBg})` : 'transparent',
        backgroundSize:
          TypeTable[p.type ? p.type : '完全覆盖背景区'].backgroundSize,
        backgroundRepeat: 'no-repeat',
      }}></div>
  )
}
