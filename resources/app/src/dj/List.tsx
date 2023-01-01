import React from 'react'
// import VirtualList from 'react-tiny-virtual-list'
import styled from '@emotion/styled'
import { List as VirList } from 'react-virtualized'

const ConfugurationBoxList = styled(VirList)({
  outline: 'none',
  overflow: 'hidden auto',
  '&::-webkit-scrollbar': {
    width: '6px',
  },

  '&::-webkit-scrollbar-thumb': {
    background: 'gray',
    borderRadius: '5px',
  },
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const List = (p: {
  w: number
  h: number
  itemCount: number
  scrollToIndex: number
  itemSize: () => number
  renderItem: (i: number) => React.ReactNode
}) => {
  // tslint:disable-next-line: only-arrow-functions
  function rowRenderer(pp: {
    index: number // Index of row
    //isScrolling, // The List is currently being scrolled
    //isVisible, // This row is visible within the List (eg it is not an overscanned row)
    key: string // Unique key within array of rendered rows
    //parent, // Reference to the parent List (instance)
    style: React.CSSProperties // Style object to be applied to row (to position it);
    // This must be passed through to the rendered row element.
  }) {
    return (
      <div key={pp.key} style={pp.style}>
        {p.renderItem(pp.index)}
      </div>
    )
  }
  return (
    <ConfugurationBoxList
      width={p.w}
      height={p.h}
      rowCount={p.itemCount}
      rowHeight={p.itemSize()}
      rowRenderer={rowRenderer}
    />
  )
}


const ConfugurationBoxList2 = styled(VirList)({
  background: '#5a5a5a',
  paddingTop:10,
  paddingLeft:10,
  outline: 'none',
  overflow: 'hidden auto',
  '&::-webkit-scrollbar': {
    width: '6px',
  },

  '&::-webkit-scrollbar-thumb': {
    background: 'gray',
    borderRadius: '5px',
  },
})

export const List2 = (p: {
  w: number
  h: number
  itemCount: number
  scrollToIndex: number
  itemSize: () => number
  renderItem: (i: number) => React.ReactNode
}) => {
  // tslint:disable-next-line: only-arrow-functions
  function rowRenderer(pp: {
    index: number // Index of row
    //isScrolling, // The List is currently being scrolled
    //isVisible, // This row is visible within the List (eg it is not an overscanned row)
    key: string // Unique key within array of rendered rows
    //parent, // Reference to the parent List (instance)
    style: React.CSSProperties // Style object to be applied to row (to position it);
    // This must be passed through to the rendered row element.
  }) {
    return (
      <div key={pp.key} style={pp.style}>
        {p.renderItem(pp.index)}
      </div>
    )
  }
  return (
    <ConfugurationBoxList2
      width={p.w}
      height={p.h}
      rowCount={p.itemCount}
      rowHeight={p.itemSize()}
      rowRenderer={rowRenderer}
    />
  )
}
