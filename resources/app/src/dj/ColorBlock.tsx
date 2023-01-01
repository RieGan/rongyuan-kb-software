import React from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ColorBlock = (p: { bg?: string; clickHandle?: () => void }) => (
  <div
    style={{
      background: p.bg || 'transparent',
      border: `solid 2px ${p.bg || '#929292'}`,
      width: '100%',
      height: '100%',
      borderRadius: 2,
    }}
    onClick={p.clickHandle}></div>
)            
