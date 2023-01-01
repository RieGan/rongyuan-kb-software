import React from 'react'

export const Triangles = (p: { direction: 'up' | 'down' }) => {
  return p.direction === 'down' ? (
    <div
      style={{
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '0 10px 18px 10px',
        borderColor: 'transparent transparent #5a5a5a transparent',
      }}
    />
  ) : (
    <div
      style={{
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '18px 10px  0 10px ',
        borderColor: '#5a5a5a transparent transparent transparent',
      }}
    />
  )
}
