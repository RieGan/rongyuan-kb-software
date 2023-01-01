import React, { useState, useEffect } from 'react'

import { dj } from '../../../../dj'

export const CPIBox = (props: {
  index: number
  min: number
  max: number
  step: number
  value: number
  setValue: (value: number) => void
}) => {
  const [value, setValue] = useState(props.value)
  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  const { index, min, max, step } = props
  return (
    <dj.View relative>
      <dj.Text y={1} type={'CPI序号'} text={index + 1} />
      <dj.CheckBox
        w={18}
        h={18}
        x={26}
        y={4}
        type={'Normal'}
        checkState={value > 0}
        clickHandle={() => {
          value <= 0
            ? props.setValue(Math.floor((max - min) / 2))
            : props.setValue(0)
        }}
      />
      <dj.Slider
        w={190}
        x={74}
        y={0}
        sliderW={190}
        min={min}
        max={max}
        step={step}
        type={'Normal'}
        value={value}
        setValue={setValue}
        changeComplete={() => props.setValue(value - (value % step))}
        isDisabled={value <= 0}
      />
      <dj.Text x={74} y={17} type={'CPI小标题'} text={50} />
      <dj.Text x={205} y={17} type={'CPI小标题'} text={16000} />
      <dj.SpinBox
        y={0}
        x={280}
        w={74}
        h={22}
        min={min}
        max={max}
        value={value}
        step={step}
        setValue={setValue}
        changeFinished={(valueC: number) => {
          props.setValue(valueC - (valueC % step))
        }}
        isDisable={value > 0}
      />
    </dj.View>
  )
}
