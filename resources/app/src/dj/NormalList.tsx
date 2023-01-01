import React, { useRef, useEffect } from 'react'
import styled from '@emotion/styled'

const Ul = styled.ul({
  width: '100%',
  height: '100%',
  overflow: 'hidden scroll',
  '&::-webkit-scrollbar': {
    width: '6px',
  },

  '&::-webkit-scrollbar-thumb': {
    background: 'gray',
    borderRadius: '5px',
  },
})

export const NormalList = (p: {
  items: React.ReactNode[]
  space: number
  clickHandle?: () => void
  isScrollToBottom: boolean
}) => {
  const endRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (p.isScrollToBottom)
      endRef.current && endRef.current.scrollIntoView({ behavior: 'auto' })
  }, [p.items])
  return (
    <Ul
      id={'scroll-list'}
      style={{ width: '100%', height: '100%', overflow: 'hidden auto' }}
      onClick={(event) => {
        p.clickHandle && p.clickHandle()
        event.stopPropagation()
      }}>
      {p.items.map((item, index) => (
        <li key={index} style={{ marginBottom: 10 }}>
          {item}
        </li>
      ))}
      <div ref={endRef}></div>
    </Ul>
  )
}
