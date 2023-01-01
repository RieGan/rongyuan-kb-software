import React, { useState, useEffect } from 'react'
import { blockCloud } from '../../appConfig'
import { dj } from '../../dj'

export const LightRange = (props: {
  min: number
  max: number
  value: number
  setValue: (value: number) => void
  leftDescription: string
  rightDescription: string
  isDisabled: boolean
  step?:boolean
}) => {
  const { min, max, leftDescription, rightDescription, isDisabled,step } = props

  const [value, setValue] = useState(props.value)

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <dj.View w={290} h={27} x={66}>
      <dj.Text
        w={14}
        x={blockCloud ? 12 : 0}
        y={1}
        type={'灯光页描述'}
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
      <dj.Slider_Ajazz
        w={190}
        x={42}
        y={-3}
        step={step?2:1}
        sliderW={190}
        min={min}
        max={max}
        type={'Balloon'}
        value={value}
        setValue={setValue}
        changeComplete={() => props.setValue(value)}
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
        w={14}
        x={263}
        y={1}
        type={'灯光页描述'}
        text={rightDescription}
        isDisabled={isDisabled}
      />
    </dj.View>
  )
}
