import React from 'react'
import styled from '@emotion/styled'
import { res } from '../res'

const Select = styled.select({
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none',
  outline: 0,
  boxShadow: 'none',
  border: '1px solid #a5a5a5',
  background: '#333333',
  backgroundImage: 'none',
  flex: 1,
  color: '#959595',
  textAlign: 'center',
  cursor: 'pointer',
  fontSize: '12px',
  '& :disabled': {
    opacity: '0.4',
  },
  '& option': {
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    backgroundColor: '#000',
    height: '50px',
    display: 'block',
    width: '200px',
    marginTop: '15px',
    marginBottom: '15px',
  },
  '& option:hover': {
    // backgroundColor: 'linear-gradient(rgba(7,0,3,0),rgba(22,150,135,1))',
    backgroundColor: '#EBCCD1'
  },
})


const Div = styled.div((p: { arrow: 'arrow _down' | 'arrow _up', isDisabled: boolean }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  borderRadius: '5px',
  textAlignLast: 'center',
  fontSize: 7,
  backgroundColor: '#fff',
  border: p.isDisabled ? '1px solid #959595' : '1px solid #7a6caa',
  cursor: 'pointer',
  '&::after': {
    content: `url(${res.img.ajazzImg[p.arrow].normal})`,
    height: '100%',
    position: 'absolute',
    top: '38%',
    right: '1%',
    width: 7,
    padding: '0 1.5em',
    cursor: 'pointer',
    pointerEvents: 'none',
    // color: p.isDisabled ? '#959595' : '#ffffff',
    transition: '.25s all ease',
  },

  '&:hover::after': {
    content: p.isDisabled ? `url(${res.img.ajazzImg[p.arrow].normal})` : `url(${res.img.ajazzImg[p.arrow].active})`,
  },
  '& span': {
    color: '#000',
    fontSize: '12px',
    lineHeight: '40px',

  }
}))

export const MyComboBoxMui = (props: {
  // modes: string[]
  selectedValue?: string
  // onChange: (index: number) => void
  isDisabled?: boolean
  clickHandle?: () => void
  className?: string
  arrow?: 'arrow _up' | 'arrow _down'
}) => {
  return (
    <Div
      onClick={props.clickHandle}
      arrow={props.arrow ? props.arrow : 'arrow _down'}
      isDisabled={props.isDisabled ? props.isDisabled : false}
    >
      {/* <Select
        id='slct'
        disabled={props.isDisabled}
        value={props.selectedValue}
        onChange={(e) =>
          props.onChange(props.modes.findIndex((v) => v === e.target.value))
        }>
        {props.modes.map((value, index) => (
          <option key={index}>{value}</option>
        ))}
      </Select> */}
      <span className={props.className}>{props.selectedValue}</span>
    </Div>
  )
}