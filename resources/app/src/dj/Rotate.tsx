import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'

const bounce = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(359deg)',
  },
})

export const Rotate = styled.div({
  animation: `${bounce} 3s infinite linear`,
  width: '100%',
  height: '100%',
})
