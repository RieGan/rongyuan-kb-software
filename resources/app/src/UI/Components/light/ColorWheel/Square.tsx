import React, { useState } from 'react'
import { hsvToHex } from './example'

export const Square = (p: {
  size: number
  hue: number
  s: number
  v: number
  updateSV: (s: number, v: number) => void
  mouseUp: () => void
}) => {
  const per = p.size / 100

  const [movable, setMovable] = useState(false)

  const renderPointer = () => {
    return (
      <circle
        cx={per * p.s}
        cy={per * p.v}
        r={per * 10}
        stroke={`hsl(${p.hue}, ${Math.abs(
          p.s > 80 || p.s < 20 ? 100 - p.s : 100
        )}%, ${Math.abs(p.v > 80 || p.v < 20 ? 100 - p.v : 100)}%)`}
        strokeWidth='2'
        fill='transparent'
      />
    )
  }

  const renderBlocks = () => {
    return Array(per < 1 ? p.size : 100)
      .fill(0)
      .map((x, indexX) => {
        return Array(per < 1 ? p.size : 100)
          .fill(0)
          .map((y, indexY) => {
            return (
              <rect
                key={(indexX + 1) * (indexY + 1)}
                x={per < 1 ? indexX : indexX * per}
                y={per < 1 ? indexY : indexY * per}
                width={per < 1 ? 1 : per}
                height={per < 1 ? 1 : per}
                fill={hsvToHex(
                  p.hue,
                  Math.floor(indexX / per),
                  Math.floor(indexY / per)
                )}
              />
            )
          })
      })
  }

  const handlePress = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setMovable(true)
    p.updateSV(
      (event.clientX - event.currentTarget.getBoundingClientRect().left) / per,
      (event.clientY - event.currentTarget.getBoundingClientRect().top) / per
    )
  }
  const handleMove = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (movable) {
      p.updateSV(
        (event.clientX - event.currentTarget.getBoundingClientRect().left) /
        per,
        (event.clientY - event.currentTarget.getBoundingClientRect().top) / per
      )
    }
  }
  const handleUp = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setMovable(false)
    p.mouseUp()
  }
  // const handleLeave = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
  //   setMovable(false)
  //   p.mouseUp()
  // }
  return (
    <svg
      width={p.size}
      height={p.size}
      onMouseDown={handlePress}
      onMouseMove={handleMove}
      // onMouseLeave={handleLeave}
      onMouseUp={handleUp}
    >
      {renderBlocks()}
      {renderPointer()}
    </svg>
  )
}
