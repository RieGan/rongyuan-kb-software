import React, { Fragment, useState } from 'react'

import { CPIBox } from './CPIBox'
import { dj } from '../../../../dj'
import { res } from '../../../../res'

import { KeySetting } from '../../keysetting/KeySetting'
import { HomeProp, withProps, homeData } from '../../../utils/WithProps'

const ___reportValue: (125 | 250 | 500 | 1000)[] = [125, 250, 500, 1000]

const CPIPage = (p: HomeProp) => {
  if (p.dpiLayout === undefined) return null
  const dpiLayout = p.dpiLayout

  const [state, setState] = useState({ open: false, keyHidCode: 0, text: '' })

  const getCPIBoxs = (
    count: number | undefined,
    min: number | undefined,
    max: number | undefined
  ) => {
    if (count === undefined) count = 1
    if (min === undefined) min = 1
    if (max === undefined) max = 1
    const boxs: React.ReactNode[] = []
    for (let index = 0; index < count; index++) {
      boxs.push(
        <CPIBox
          index={index}
          key={index}
          min={min}
          max={max}
          step={dpiLayout ? dpiLayout.delt : 0}
          value={p.dpi[index]}
          setValue={(value: number) => {
            p.dpi.splice(index, 1, value)
            p.setDpi(p.dpi)
          }}
        />
      )
    }
    return boxs
  }

  return (
    <Fragment>
      <dj.FlexView h={252} y={37} flexDirection='column'>
        {getCPIBoxs(dpiLayout.count, dpiLayout.min, dpiLayout.max)}
      </dj.FlexView>
      <dj.View y={348} h={48}>
        <dj.Text type={'SubTitle'} text={'报告率'} />
        <dj.FlexView
          w={350}
          h={20}
          y={34}
          flexDirection={'row'}
          justifyContent={'space-between'}>
          {___reportValue.map((value, index) => (
            <div
              style={{
                width: 70,
                height: 20,
                position: 'relative',
              }}
              key={index}>
              <dj.CheckBox
                checkState={p.reportRate === value}
                clickHandle={() => {
                  p.setReportRate(value)
                }}
                type={'Normal'}
                w={80}
                h={16}
                text={value + 'Hz'}></dj.CheckBox>
            </div>
          ))}
        </dj.FlexView>
      </dj.View>
      <dj.Img
        w={186}
        h={366}
        x={612}
        y={52}
        imgBg={p.deviceName in res.img ? res.img[p.deviceName] : res.img.MG912}
      />
      {res.键鼠坐标.MG912.layout.map((value) => (
        <dj.Button
          key={value.value}
          w={value.w}
          h={value.h}
          x={value.x}
          y={value.y}
          isHightLight={p.keyValue.some((v) => v.original === value.value)}
          mode={'鼠标按键'}
          text={value.mark}
          clickHandle={() =>
            setState({
              open: true,
              keyHidCode: value.value ? value.value : 0,
              text: value.keyName,
            })
          }
        />
      ))}

      {state.open && (
        <dj.View w={1220} h={730} x={-268} y={-146}>
          <KeySetting
            keyHidCode={state.keyHidCode}
            title={state.text}
            oldValue={p.keyValue.find((v) => v.original === state.keyHidCode)}
            closeHandle={() => {
              setState({ open: false, keyHidCode: 0, text: '' })
            }}
          />
        </dj.View>
      )}
    </Fragment>
  )
}

export const MouseHome = withProps(CPIPage, homeData)
