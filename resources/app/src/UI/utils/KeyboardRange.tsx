import React, { useState, useEffect } from 'react'
import { blockCloud } from '../../appConfig'
import { dj } from '../../dj'

export const KeyboardRange = (props: {
  min: number
  max: number
  step: number
  value: number
  setValue: (value: number) => void
  leftDescription: string
  rightDescription: string
  isDisabled: boolean

}) => {
  const { min, max, leftDescription, rightDescription, isDisabled } = props

  const [value, setValue] = useState(props.value)

  useEffect(() => {
    setValue(props.value)

  }, [props.value])

  return (
    <dj.View w={290} h={27} x={blockCloud ? 20 : 0}>
      <dj.Text
        w={15}
        x={blockCloud ? 12 : 0}
        y={1}
        type={'按键灵敏度描述'}
        text={leftDescription}
        isDisabled={isDisabled}
      />
      <dj.Text
        w={14}
        h={25}
        x={24}
        y={3}
        type={'灯光页数值'}
        text={min}
        isDisabled={isDisabled}
      />
      <dj.MySlider
        w={190}
        x={42}
        y={-20}
        min={props.min}
        max={props.max}
        step={props.step}
        setValue={setValue}
        changeComplete={() => {
          props.setValue(value)
        }
        }
        value={value}
        isDisabled={isDisabled}
      />
      <dj.Text
        w={14}
        h={25}
        x={241}
        y={3}
        type={'灯光页数值'}
        text={max}
        isDisabled={isDisabled}
      />
      <dj.Text
        w={15}
        x={blockCloud ? 252 : 263}
        y={1}
        type={'按键灵敏度描述'}
        text={rightDescription}
        isDisabled={isDisabled}
      />
    </dj.View>
  )
}
