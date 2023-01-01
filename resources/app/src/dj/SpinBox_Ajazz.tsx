import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import { res } from '../res'

const SpinBoxStyle = styled('div')`
  dispaly: inline-block;
  width: 100%;
  height: 100%;
  margin: 0px;
  & input {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #e8e8e8;
    border-radius: 2px;
    border: 1px solid #707072 ;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    color: #959595;
    text-align: center;
  }

  & input:focus {
    color: #000;
    outline: none;
  }

  & input[type='number']::-webkit-inner-spin-button,
  & input[type='number']::-webkit-outer-spin-button {
    opacity: 0;
    -webkit-appearance: none;
    width: 15px;
    height: 22px;
  }

  span {
    margin: 0;
    padding: 0;
    width: 20px;
    height: 50%;
    position: absolute;
    right: 0px;
  }

  .before {
    top: 3px;
    right: 3px;
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 4px 6px 4px;
    border-color: transparent transparent #959595 transparent;
    pointer-events: none;
  }

  .after {
    bottom: 3px;
    right: 3px;
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 4px 0 4px;
    border-color: #959595 transparent transparent transparent;
    pointer-events: none;
  }

  .before:hover {
    border-color: transparent transparent #ffffff transparent;
  }

  .after:hover {
    border-color: #ffffff transparent transparent transparent;
  }

  .before:active {
    border-color: transparent transparent #ffffff transparent;
  }

  .after:active {
    border-color: #ffffff transparent transparent transparent;
  }
`
const Button = styled.button({
  position: 'absolute',
  width: 22,
  height: '50%',
  right: 0,
  background: 'transparent',
  border: '0',
  outline: 'none',

  '&.add': {
    top: 0,
  },

  '& .add-arrow': {
    width: 7,
    height: 5,
    position: 'absolute',
    top: 2,
    left: 6,
    background: `url(${res.img.ajazzImg['arrow _up'].normal})`
  },

  '&:active .add-arrow': {
    background: `url(${res.img.ajazzImg['arrow _up'].active})`,
  },

  '&.reduce': {
    top: 11,
  },

  '& .down-arrow': {
    width: 7,
    height: 5,
    position: 'absolute',
    top: 3,
    left: 6,
    background: `url(${res.img.ajazzImg['arrow_down_small'].normal})`
  },

  '&:active .down-arrow': {
    background: `url(${res.img.ajazzImg['arrow_down_small'].active})`
  },
})

export const SpinBox_Ajazz = (p: {
  value: number
  step: number
  min: number
  max: number
  setValue: (value: number) => void
  changeFinished: (value: number) => void
  isDisable?: boolean
  setEdit?: (state: boolean) => void
  mouseEnter?: () => void
  mouseLeave?: () => void
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    if (e.key === 'Enter') {
      //p.changeFinished(p.value)
      e.currentTarget.blur()
      p.setEdit && p.setEdit(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(
      e.target.value === '' ? p.min.toString() : e.target.value
    )
    if (value > p.max) {
      value = p.max
      p.setValue(value)
      return
    }
    if (value < p.min || value > p.max) return
    p.setValue(value)
  }

  const handleAdd = () => {
    if (p.isDisable) return
    if (p.value + p.step > p.max) return
    p.changeFinished(p.value + p.step)
    // p.setValue(p.value + p.step)
  }
  const handleReduce = () => {
    if (p.isDisable) return
    if (p.value - p.step < p.min) return
    p.changeFinished(p.value - p.step)
    // p.setValue(p.value - p.step)
  }

  return (
    <Fragment>
      <SpinBoxStyle>
        <input
          disabled={p.isDisable}
          type='number'
          value={p.value !== undefined ? p.value.toString() : 'undefined'}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            p.setEdit && p.setEdit(true)
          }}
          onBlur={(e) => {
            p.changeFinished(p.value)
          }}
        />
        <Button className='add' onClick={handleAdd} onMouseEnter={p.mouseEnter} onMouseLeave={p.mouseLeave}>
          <div className={'add-arrow'} />
        </Button>
        <Button className='reduce' onClick={handleReduce} onMouseEnter={p.mouseEnter} onMouseLeave={p.mouseLeave}>
          <div className={'down-arrow'} />
        </Button>
      </SpinBoxStyle>
    </Fragment>
  )
}
