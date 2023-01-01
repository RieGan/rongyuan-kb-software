import React, { useRef, useState } from 'react'
import styled from '@emotion/styled'
import { Text } from './Text'
import { res } from '../res'
import { useStore } from '../mobxStore/store'

const SliderStyle = styled('div')`
  position: relative;
  height: 100%;
  width: 100%;
  // margin: 4px 0;
  & input {
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 12px;
    overflow: hidden;
    position: absolute;
    top: 50%;
    transform: translate(0,-50%);
  }

  & input:focus {
    outline: none;
  }

  & input::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    background: red;
    background-color: #fff;
  }

  & input::-webkit-slider-thumb {
    position: relative;
    -webkit-appearance: none;
    height: 4px;
    width: 4px;
    background: #ff0000;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: -190px 0 0 188px #ff0000;
  }

  & input:active::-webkit-slider-thumb {
    background: #ff0000;
    box-shadow: -190px 0 0 188px #21b6a6;
  }

  & input:disabled {
    opacity: 0.4;
  }

  & input:disabled::-webkit-slider-thumb {
    opacity: 0.4;
  }
`

const Balloon = styled.span(
  {
    width: 19,
    height: 24,
    // background: `url(${res.img.light_frame.normal})`,
    backgroundSize: 'contain',
    position: 'absolute',

    top: -16,
    '& > span': {
      position: 'absolute',
      color: '#fff',
      top: 4,
    },
  },
  (props: { dataleft: number }) => ({
    left: props.dataleft - 10,
  })
)

const Point = styled.div(
  {
    width: 12,
    height: 12,
    position: 'absolute',
    top: 8,
  },
  (props: { dataleft: number, isInit: boolean }) => ({
    left: props.dataleft - 10,
    background: `url(${props.isInit ? res.img.ajazzImg.dot.active : res.img.ajazzImg.dot.normal})`,
  })
)

export const Slider_Ajazz = (p: {
  sliderW: number
  min: number
  max: number
  step: number
  type: 'Normal' | 'Balloon'
  value: number
  isDisabled: boolean
  setValue: (value: number) => void
  changeComplete: () => void
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [movable, setMovable] = useState(false)
  const [ballonShow, setBallonShow] = useState(false)

  const [outKey, setOutKey] = useState(false)

  const setChangeValue = (event: { clientX: number }) => {

    ref.current &&
      // p.setValue(
      //   Math.floor(
      //     ((event.clientX - ref.current.getBoundingClientRect().left) /
      //       ref.current?.getBoundingClientRect().width) *
      //     p.max +
      //     0.5
      //   )
      // )
      p.setValue(
        Math.floor(
          ((event.clientX - ref.current.getBoundingClientRect().left) /
            ref.current?.getBoundingClientRect().width) *
          p.max + 0.5
        )
      )
  }
  return (
    <SliderStyle
      id='fatherBtn'
      ref={ref}
      onMouseDown={(event) => {
        if (p.isDisabled) return
        setChangeValue(event)
        setMovable(true)
        setBallonShow(true)
        setOutKey(true)
      }}
      onMouseMove={(event) => {
        if (p.isDisabled) return

        if (movable) {
          ref.current && setChangeValue(event)
        }
      }}

      onMouseOut={(event) => {
        // console.log('out', outKey)
        if (outKey === true) {
          if (p.isDisabled) return

          p.changeComplete()
          setMovable(false)
          setBallonShow(false)
          setOutKey(false)
        }
      }}
      onMouseUp={() => {
        if (outKey === true) {
          if (p.isDisabled) return

          p.changeComplete()
          setMovable(false)
          setBallonShow(false)
          setOutKey(false)
        }
      }}
    >
      <input
        disabled={p.isDisabled}
        type='range'
        value={p.value}
        min={p.min}
        max={p.max}
        style={{ zIndex: -1 }}
        onChange={(e) => {

          p.setValue(parseInt(e.target.value))
        }}
        onMouseDown={(event) => {
          event.stopPropagation()
          setBallonShow(true)
        }}
        onMouseUp={(event) => {
          event.stopPropagation()
          p.changeComplete()
          setMovable(false)
          setBallonShow(false)
        }}
      />
      {p.type === 'Balloon' && ballonShow && (
        <Balloon className='balloon' dataleft={(p.value / p.max) * p.sliderW}>
          <Text type={'启动页搜索'} text={p.value} />
        </Balloon>
      )}
      <Point className='point' dataleft={(p.value / p.max) * p.sliderW + 3} isInit={p.value > p.min} />
    </SliderStyle>
  )
}
