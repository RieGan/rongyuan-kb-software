import React, { useState, Fragment, useEffect } from 'react'

import { dj } from '../../../../dj'
import { res } from '../../../../res'
import { rgbToNum } from '../../../../unitys/rgbNum'
import { ColorWheel } from '../../light/ColorWheel'
import { hexToRgb } from '../../light/ColorWheel/example'

export const PopUpBox = (props: {
  direction: 'up' | 'down'
  triangleX?: number
  children: any
}) => {
  // console.log('qiuqiuqiu', props.triangleX)
  return (
    <Fragment>
      <dj.Triangles
        w={18}
        h={18}
        x={props.triangleX}
        y={props.direction === 'down' ? -13 : 250}
        direction={props.direction}
      />
      <dj.View w={255} h={255} form={'颜色选择框背景_Ajazz'}>
        {props.children}
      </dj.View>
    </Fragment>
  )
}

export const ColorPicker_Ajazz = (p: {
  color: { r: number; g: number; b: number }
  setColor: (rgb: number) => void
  setEdit?: (state: boolean) => void
}) => {
  const [rgbState, setRgbState] = useState(p.color)

  useEffect(() => {
    setRgbState(p.color)
  }, [p.color])

  const blockColor = (hex: string) => {
    setColor(hexToRgb(hex))
  }

  const setColor = (rgb: { r: number; g: number; b: number }) => {
    setRgbState(rgb)
    console.log('setColor', rgb)
    p.setColor(rgbToNum(rgb.r, rgb.g, rgb.b))
  }

  const [colorKey, setColorKey] = useState(false)
  // console.error('rgbState',rgbState,'p.color',p.color);

  return (
    <dj.View>
      <dj.Text h={20} x={22} y={16} type={'SubTitle'} text={res.string.当前调节颜色} />
      <dj.ColorBlock
        w={18}
        h={18}
        x={121}
        y={16}
        bg={`rgb(${rgbState.r},${rgbState.g},${rgbState.b})`}
      />
      {/* 色盘 */}
      <dj.View x={13} y={50} w={120} h={120}>
        <ColorWheel
          width={120}
          color={rgbState}
          setColor={setRgbState}
          mouseUp={() => {
            console.log('!!!!', 'rgb', rgbState, 'p.color', p.color)
            if (
              rgbState.r !== p.color.r ||
              rgbState.g !== p.color.g ||
              rgbState.b !== p.color.b
            )
              setColor(rgbState)
          }}
        />
      </dj.View>

      <dj.Text
        w={45}
        h={20}
        x={21}
        y={185}
        type={'SubTitle'}
        text={res.string.预设}
      />
      {/* RGB BOX */}
      <dj.FlexView
        w={121}
        h={98}
        x={141}
        y={60}
        flexDirection={'column'}
        justifyContent={'space-between'}>
        {/* R */}
        <dj.View relative w={121} h={22}>
          <dj.Text w={36} h={22} type={'SubTitle'} text={'R'} />
          <dj.SpinBox
            w={74}
            h={22}
            x={25}
            min={0}
            max={255}
            value={rgbState.r}
            step={1}
            mouseEnter={() => {
              setColorKey(true)
            }}
            mouseLeave={() => {
              setColorKey(false)
            }}
            setValue={(value: number) => setRgbState({ ...rgbState, r: value })}
            changeFinished={(value: number) => {
              if (rgbState.r === p.color.r && colorKey)
                setColor({ ...rgbState, r: value })
              else if (rgbState.r !== p.color.r)
                setColor({ ...rgbState, r: value })
            }}
            setEdit={p.setEdit}
          />
        </dj.View>
        {/* G */}
        <dj.View relative w={121} h={22}>
          <dj.Text w={36} h={22} type={'SubTitle'} text={'G'} />
          <dj.SpinBox
            w={74}
            h={22}
            x={25}
            min={0}
            max={255}
            value={rgbState.g}
            step={1}
            mouseEnter={() => {
              setColorKey(true)
            }}
            mouseLeave={() => {
              setColorKey(false)
            }}
            setValue={(value: number) => {
              setRgbState({ ...rgbState, g: value })
            }}
            changeFinished={(value: number) => {
              if (rgbState.g === p.color.g && colorKey)
                setColor({ ...rgbState, g: value })
              else if (rgbState.g !== p.color.g)
                setColor({ ...rgbState, g: value })
            }}
            setEdit={p.setEdit}
          />
        </dj.View>
        {/* B */}
        <dj.View relative w={121} h={22}>
          <dj.Text w={36} h={22} type={'SubTitle'} text={'B'} />
          <dj.SpinBox
            w={74}
            h={22}
            x={25}
            min={0}
            max={255}
            value={rgbState.b}
            step={1}
            mouseEnter={() => {
              setColorKey(true)
            }}
            mouseLeave={() => {
              setColorKey(false)
            }}
            setValue={(value: number) => setRgbState({ ...rgbState, b: value })}
            changeFinished={(value: number) => {
              if (rgbState.b === p.color.b && colorKey)
                setColor({ ...rgbState, b: value })
              else if (rgbState.b !== p.color.b)
                setColor({ ...rgbState, b: value })
            }}
            setEdit={p.setEdit}
          />
        </dj.View>
      </dj.FlexView>

      {/* 颜色预设 */}
      <dj.FlexView
        w={232}
        h={22}
        x={10}
        y={214}
        justifyContent={'space-between'}>
        <dj.ColorBlock
          relative
          w={22}
          h={22}
          bg={'#FF0000'}
          clickHandle={() => blockColor('#FF0000')}
        />
        <dj.ColorBlock
          relative
          w={22}
          h={22}
          bg={'#FFA500'}
          clickHandle={() => blockColor('#FFA500')}
        />
        <dj.ColorBlock
          relative
          w={22}
          h={22}
          bg={'#FFFF00'}
          clickHandle={() => blockColor('#FFFF00')}
        />
        <dj.ColorBlock
          relative
          w={22}
          h={22}
          bg={'#00FF00'}
          clickHandle={() => blockColor('#00FF00')}
        />
        <dj.ColorBlock
          relative
          w={22}
          h={22}
          bg={'#007FFF'}
          clickHandle={() => blockColor('#007FFF')}
        />
        <dj.ColorBlock
          relative
          w={22}
          h={22}
          bg={'#0000FF'}
          clickHandle={() => blockColor('#0000FF')}
        />
        <dj.ColorBlock
          relative
          w={22}
          h={22}
          bg={'#8B00FF'}
          clickHandle={() => blockColor('#8B00FF')}
        />
        <dj.ColorBlock
          relative
          w={22}
          h={22}
          bg={'#000000'}
          clickHandle={() => blockColor('#000000')}
        />
        {/* <dj.ColorBlock
          relative
          w={22}
          h={22}
          bg={'#FF456E'}
          clickHandle={() => blockColor('#FF456E')}
        />
        <dj.ColorBlock
          relative
          w={22}
          h={22}
          bg={'#ff9000'}
          clickHandle={() => blockColor('#ff9000')}
        />
        <dj.ColorBlock
          relative
          w={22}
          h={22}
          bg={'#ceff42'}
          clickHandle={() => blockColor('#ceff42')}
        />
        <dj.ColorBlock
          relative
          w={22}
          h={22}
          bg={'#43ff42'}
          clickHandle={() => blockColor('#43ff42')}
        />
        <dj.ColorBlock
          relative
          w={22}
          h={22}
          bg={'#0371b4'}
          clickHandle={() => blockColor('#0371b4')}
        />
        <dj.ColorBlock
          relative
          w={22}
          h={22}
          bg={'#82319a'}
          clickHandle={() => blockColor('#82319a')}
        />
        <dj.ColorBlock
          relative
          w={22}
          h={22}
          bg={'#27d0f7'}
          clickHandle={() => blockColor('#27d0f7')}
        /> */}
      </dj.FlexView>
    </dj.View>
  )
}
