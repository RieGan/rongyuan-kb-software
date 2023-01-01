import React from 'react'
import styled from '@emotion/styled'

const MyProgress = styled.div({
  width: '100%',
  height: '100%',
  background: 'gray',
})

const MyBar = styled.div((p: { rate: number }) => ({
  width: `${p.rate}%`,
  height: '100%',
  background: '#21ae9f',
}))

export const Progress = (p: { rate: number }) => {
  return (
    <MyProgress>
      <MyBar rate={p.rate} />
    </MyProgress>
  )
}
