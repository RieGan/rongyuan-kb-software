import React from 'react'
import hsvToRgb from './hsvToRgb'

export const Sector = (p: {
  currentBlockIndex: number
  size: number
  startAngle: number
  endAngle: number
  innerRadius: number
  outerRadius: number
}) => {
  const pointOnCircle = (radius: number, angle: number) => {
    return {
      x: p.size / 2 + radius * Math.cos(angle),
      y: p.size / 2 - radius * Math.sin(angle),
    }
  }

  const p1 = pointOnCircle(p.outerRadius, p.startAngle)
  const p2 = pointOnCircle(p.outerRadius, p.endAngle)
  const p3 = pointOnCircle(p.innerRadius, p.endAngle)
  const p4 = pointOnCircle(p.innerRadius, p.startAngle)

  const longArcFlag = +(p.endAngle < p.startAngle
    ? p.startAngle - p.endAngle > Math.PI
    : p.startAngle - p.endAngle > -Math.PI)

  const path = `M ${p1.x},${p1.y}
  A ${p.outerRadius},${p.outerRadius} 0 ${longArcFlag} 1 ${p2.x} ${p2.y}
  L ${p3.x},${p3.y}
  A ${p.innerRadius},${p.innerRadius} 0 ${longArcFlag} 0 ${p4.x} ${p4.y}
  Z`

  const color = hsvToRgb(p.currentBlockIndex)

  return <path d={path} fill={color} />
}
