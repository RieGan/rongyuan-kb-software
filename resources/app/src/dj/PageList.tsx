import styled from '@emotion/styled'
import React from 'react'
import ReactPaginate from 'react-paginate'
import { FlexView } from './FlexView'

const Div = styled.div({
  color: '#959595',

  '& ul': {
    display: 'inline-block',
    paddingLeft: '15px',
    paddingRight: '15px',
  },
  '& li': {
    display: 'inline-block',
    marginLeft: 10,
    width: 20,
    textAlign: 'center',
  },
  '& a': {
    outline: 'none',
  },
})

export interface PageListProps {
  count: number
  pageIndex: number
  setPage: (index: number) => void,
  currentPage: number
}

export const PageList = (p: PageListProps) => {
  return (
    <FlexView justifyContent={'center'}>
      <Div>
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          initialPage={p.pageIndex}
          forcePage={p.currentPage}
          pageCount={p.count}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          activeClassName={'light-page'}
          forcePage={p.currentPage}
          onPageChange={(selectedItem: { selected: number }) =>
            p.setPage(selectedItem.selected)
          }
        />
      </Div>
    </FlexView>
  )
}
