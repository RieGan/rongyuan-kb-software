import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import { Text } from './Text'

const SqureStyle = styled.label({
  display: 'inline-block',
  width: '100%',
  height: ' 100%',
  '& input': {
    position: 'absolute',
    opacity: 0,
  },
  '& .pointer': {
    display: 'inline-block',
    width: '100%',
    height: '100%',
    borderRadius: '2px',
    position: 'absolute',
    border: '1px solid #5a5a5a',
  },

  '& input:hover ~ .pointer': {
    border: '1px solid #929292',
  },

  '& input:checked ~ .pointer': {
    background: '#23f9e2',
    border: ' 1px solid #23f9e2',
  },
  '& .pointer::after': {
    content: `''`,
    width: '33%',
    height: '66%',
    borderBottom: '2px solid black',
    borderRight: '2px solid black',
    position: 'absolute',
    left: '33%',
    top: '66%',
    transform: 'translate(-30%, -85%) rotateZ(40deg)',
    opacity: 0,
    transition: 'opacity 0.8s',
  },
  '& input:checked ~ .pointer::after': {
    opacity: 1,
  },
})

const CircleStyle = styled.label({
  display: 'block',
  paddingLeft: '0px',
  cursor: 'pointer',
  userSelect: 'none',
  fontSize: 12,
  color: '#ffffff',
  position: 'relative',
  '& input': {
    position: 'absolute',
    opacity: '0',
    cursor: 'pointer',
  },
  '& .pointer': {
    position: 'absolute',
    left: 0,
    top: 0,
    background: 'transparent',
    border: 'solid 1px #979797',
    borderRadius: '50%',
    width: '14px',
    height: '14px',
  },
  '&:hover .pointer': {
    border: 'solid 1px #21b6a6',
  },
  '& input:checked ~ .pointer': {
    border: 'solid 1px #21b6a6',
  },
  '& .pointer::after': {
    content: `''`,
    width: 8,
    height: 8,
    position: 'absolute',
    left: '2px',
    top: '2px',
    borderRadius: '50%',
    background: '#21b6a6',
    display: 'none',
  },
  '& input:checked ~ .pointer::after': {
    display: 'block',
  },
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const RadioButton = (p: {
  type: '??????' | '??????'
  name: string
  text: string
  isChecked: boolean
  clickHandle: () => void
}) => {
  const child = (
    <Fragment>
      <div style={{ position: 'absolute', left: 24, top: -2 }}>
        <Text type={'?????????'} text={p.text} />
      </div>
      <div
        style={{
          width: 16,
          height: 16,
          position: 'absolute',
          margin: 0,
          padding: 0,
        }}>
        <input
          type='radio'
          name={p.name}
          value={p.text}
          onClick={p.clickHandle}
          checked={p.isChecked}
          onChange={() => {}}
        />

        <span className={'pointer'} />
      </div>
    </Fragment>
  )
  return p.type === '??????' ? (
    <SqureStyle>{child}</SqureStyle>
  ) : (
    <CircleStyle>{child}</CircleStyle>
  )
}
