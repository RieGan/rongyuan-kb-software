import React, { useState } from 'react'

import { Sector } from './Sector'

export const Circle = (p: {
  size: number
  numberOfSectors: number
  hue: number
  setHue: (hue: number) => void
  mouseUp?: () => void
}) => {
  const pointerRadius = Math.floor(((p.size / 2) * 0.2) / 2)
  const innerRadius = Math.floor((p.size / 2) * 0.8)
  const outerRadius = Math.floor(p.size / 2)

  const [pointer, setPointer] = useState({
    x: Math.floor(
      p.size / 2 +
        (innerRadius + pointerRadius) *
          Math.cos(p.hue ? -(p.hue * Math.PI) / 180 : 0)
    ),
    y: Math.floor(
      p.size / 2 -
        (innerRadius + pointerRadius) *
          Math.sin(p.hue ? -(p.hue * Math.PI) / 180 : 0)
    ),
  })

  const [movable, setMovable] = useState(false)

  const updatePointerPosition = (angle: number) => {
    const hue =
      angle <= 0
        ? (-angle * 180) / Math.PI
        : ((2 * Math.PI - angle) * 180) / Math.PI

    setPointer({
      x: Math.floor(
        p.size / 2 + (innerRadius + pointerRadius) * Math.cos(angle)
      ),
      y: Math.floor(
        p.size / 2 - (innerRadius + pointerRadius) * Math.sin(angle)
      ),
    })

    p.setHue(hue)
  }

  const handlePress = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const x =
      event.clientX - event.currentTarget.getBoundingClientRect().x - p.size / 2
    const y =
      event.clientY - event.currentTarget.getBoundingClientRect().y - p.size / 2

    const angle = -Math.atan2(y, x)

    const outX = Math.abs(Math.floor(outerRadius * Math.cos(angle)))
    const outY = Math.abs(Math.floor(outerRadius * Math.sin(angle)))

    const inX = Math.abs(Math.floor(innerRadius * Math.cos(angle)))
    const inY = Math.abs(Math.floor(innerRadius * Math.sin(angle)))

    if (
      (Math.abs(x) >= inX - 4 && Math.abs(x) <= outX + 4) ||
      (Math.abs(y) >= inY - 4 && Math.abs(y) <= outY + 4)
    ) {
      updatePointerPosition(angle)
      setMovable(true)
    }
  }

  const handleMove = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!movable) return

    const { x: xBlock, y: yBlock } = event.currentTarget.getBoundingClientRect()

    const x = event.clientX - xBlock - p.size / 2
    const y = event.clientY - yBlock - p.size / 2

    const angle = -Math.atan2(y, x)

    updatePointerPosition(angle)
  }

  const handleUp = () => {
    setMovable(false)
    p.mouseUp && p.mouseUp()
  }

  const renderSector = () => {
    return Array(p.numberOfSectors)
      .fill(0)
      .map((value, index) => {
        const startAngle = (2 * Math.PI * index) / p.numberOfSectors
        const endAngle =
          (2 * Math.PI * (index + 1 === p.numberOfSectors ? 0 : index + 1)) /
          p.numberOfSectors

        return (
          <Sector
            key={index}
            currentBlockIndex={index}
            size={p.size}
            startAngle={-startAngle}
            endAngle={-endAngle}
            innerRadius={innerRadius}
            outerRadius={outerRadius}></Sector>
        )
      })
  }

  const renderPointer = () => {
    return (
      <circle
        cx={pointer.x}
        cy={pointer.y}
        r={pointerRadius}
        stroke='#090e0e'
        strokeWidth='2'
        fill='transparent'
      />
    )
  }

  return (
    <svg
      width={p.size}
      height={p.size}
      onMouseDown={handlePress}
      onMouseUp={handleUp}
      onMouseMove={handleMove}>
      {renderSector()}

      {/* {renderPointer()} */}
    </svg>
  )
}
