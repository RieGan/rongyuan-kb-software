import React from 'react'

const DataTable = {
  Big: {
    width: '75%',
    height: '75%',
    left: '12.5%',
    top: '12.5%',
  },
  Small: {
    width: '60%',
    height: '60%',
    left: '20%',
    top: '20%',
  },
} as const

const conicColor: (
  size: keyof typeof DataTable,
  color?: string | undefined
) => string = (size: keyof typeof DataTable, color?: string) => {
  return size === 'Big'
    ? 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)'
    : `conic-gradient(white,${color},${color},white)`
}

export const ColorWheel = (p: {
  size: keyof typeof DataTable
  color?: string
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: conicColor(p.size, p.color),
        position: 'relative',
        borderRadius: '50%',
      }}>
      <div
        style={{
          width: DataTable[p.size].width,
          height: DataTable[p.size].height,
          background: '#252525',
          position: 'absolute',
          borderRadius: '50%',
          left: DataTable[p.size].left,
          top: DataTable[p.size].top,
        }}></div>
    </div>
  )
}
