import React from 'react'
import styled from '@emotion/styled'
import { res } from '../res'

const Select = styled.select({
  WebkitAppearance: 'none',
  outline: 0,
  boxShadow: 'none',
  border: '1px solid #a5a5a5',
  background: 'none',
  backgroundImage: 'none',
  flex: 1,
  color: '#959595',
  textAlign: 'center',
  cursor: 'pointer',
  fontSize: '12px',
  '& :disabled': {
    opacity: '0.4',
  },
})

const Div = styled.div((p: { isDisabled: boolean }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  borderRadius: '2px',
  textAlignLast: 'center',
  fontSize: 7,
  '&::after': {
    content: `url(${res.img.ajazzImg['arrow _down'].normal})`,
    height: '100%',
    position: 'absolute',
    top: '30%',
    right: 0,
    width: 7,
    padding: '0 1.5em',
    cursor: 'pointer',
    pointerEvents: 'none',
    color: p.isDisabled ? '#959595' : '#ffffff',
    transition: '.25s all ease',
  },

  '&:hover::after': {
    content: `url(${res.img.ajazzImg['arrow _down'].active})`,
  },
}))

export const ComboBoxMui = (props: {
  modes: string[]
  selectedValue?: string
  onChange: (index: number) => void
  isDisabled?: boolean
  clickHandle?: () => void
}) => {
  return (
    <Div isDisabled={props.isDisabled ? props.isDisabled : false} onClick={props.clickHandle}>
      <Select
        id='slct'
        disabled={props.isDisabled}
        value={props.selectedValue}
        onChange={(e) =>
          props.onChange(props.modes.findIndex((v) => v === e.target.value))
        }>
        {props.modes.map((value, index) => (
          <option key={index}>{value}</option>
        ))}
      </Select>
    </Div>
  )
}
