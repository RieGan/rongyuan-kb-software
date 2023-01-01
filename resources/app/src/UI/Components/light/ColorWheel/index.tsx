import React, { useEffect, useState } from 'react'
import { Circle } from './Circle'

import { Square } from './Square'
import { hsvToRgb, rgbToHsv } from './example'



//Set Color
export const ColorWheel = (p: {
  width: number
  color: {
    r: number
    g: number
    b: number
  }
  setColor: (color: { r: number; g: number; b: number }) => void
  mouseUp: () => void
}) => {
  const circleWidth = p.width
  const squareWidth = Math.floor(circleWidth * 0.5)
  const left = circleWidth * 0.25

  const tmpHsv = rgbToHsv(p.color.r, p.color.g, p.color.b)
  const [hsv, setHsv] = useState({ h: tmpHsv.h, s: tmpHsv.s, v: tmpHsv.v })

  return (
    <div style={{ position: 'relative' }}>
      <Circle
        size={circleWidth}
        numberOfSectors={360}
        hue={hsv.h}
        setHue={(hue) => {
          setHsv({ ...hsv, h: hue })
          p.setColor(hsvToRgb(hue, hsv.s, hsv.v))
        }}
        mouseUp={p.mouseUp}
      />
      <div style={{ position: 'absolute', left: left, top: left }}>
        <Square
          size={squareWidth}
          hue={hsv.h}
          s={hsv.s}
          v={hsv.v}
          updateSV={(s, v) => {
            setHsv({ ...hsv, s: s, v: v })
            p.setColor(hsvToRgb(hsv.h, s, v))
          }}
          mouseUp={p.mouseUp}
        />
      </div>
    </div>
  )
}
