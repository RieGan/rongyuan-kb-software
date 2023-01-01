import React from 'react'
const ColorTable = {
  Normal: '1px solid #201f1f',
  UserCenter: '1px solid #282727',
  User: '1px solid #353535',
  UserVerify: '1px solid #202020',
  按键设置: '1px solid #252525',
  UserCenter_ajazz: 1,

} as const

export const Line = (p: { lineColor: keyof typeof ColorTable }) => {
  return (
    <hr
      style={{
        width: '100%',
        border: ColorTable[p.lineColor],
      }}
    />
  )
}
export const Line_Ajazz = (p: { lineColor: keyof typeof ColorTable }) => {
  return (
    <div
      style={{
        width: '100%',
        height: ColorTable[p.lineColor],
        backgroundColor: '#b2b2b2',
      }}></div>
  )
}
