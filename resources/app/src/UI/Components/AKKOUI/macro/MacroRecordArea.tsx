import React, { Fragment } from 'react'
import { MacroList } from './MacroList'
import { dj } from '../../../../dj'
import { res } from '../../../../res'
import { mobxStore, useStore } from '../../../../mobxStore/store'
import { useObserver } from 'mobx-react-lite'
import { blockCloud } from '../../../../appConfig'

export const MacroRecordArea = () => {
  const { macroStore } = useStore()


  const saveMacro = () => macroStore.uiSaveMacro()

  return useObserver(() => (
    <Fragment>
      {/* <dj.View form='maricTitle' h={38}>
        <dj.Text text={res.string.宏录制_Ajazz} type={'配置页标题'} y={6} />
      </dj.View> */}
      <dj.View h={40} form={'maricTitleRight_akko'}>
        <dj.RadioButton_Ajazz
          x={22}
          h={20}
          y={12}
          type={'圆形'}
          name={'宏播放形式'}
          text={res.text.循环次数()}
          isChecked={macroStore.macroType === 'repeat_times'}
          clickHandle={() => {
            macroStore.setMacroType('repeat_times')
            if (macroStore.recodingState === 'stop' && macroStore.currentRecMacroArr.length > 0)
              saveMacro()
          }}
        />
        <dj.SpinBox_Ajazz
          w={110}
          h={22}
          x={120}
          y={10}
          min={1}
          max={65535}
          value={macroStore.repeatTimes}
          step={1}
          setValue={(value: number) => {
            macroStore.setRepeatTimes(value)
          }}
          changeFinished={(value: number) => {
            {
              macroStore.setRepeatTimes(value)
              if (macroStore.recodingState === 'stop' && macroStore.currentRecMacroArr.length > 0)
                saveMacro()
            }
          }}
        />
        <dj.RadioButton_Ajazz
          w={201}
          h={20}
          x={310}
          y={12}
          type={'圆形'}
          name={'宏播放形式'}
          text={res.text.使用指派按键切换开关播放()}
          isChecked={macroStore.macroType === 'on_off'}
          clickHandle={() => {
            macroStore.setMacroType('on_off')
            if (macroStore.recodingState === 'stop' && macroStore.currentRecMacroArr.length > 0)
              saveMacro()
          }}
        />
        <dj.RadioButton_Ajazz
          w={blockCloud ? 130 : 100}
          x={blockCloud ? 552 : 582}
          y={12}
          h={20}
          type={'圆形'}
          name={'宏播放形式'}
          text={res.text.按下时播放()}
          isChecked={macroStore.macroType === 'touch_repeat'}
          clickHandle={() => {
            macroStore.setMacroType('touch_repeat')
            if (macroStore.recodingState === 'stop' && macroStore.currentRecMacroArr.length > 0)
              saveMacro()
          }}
        />
      </dj.View>
      <dj.View h={407} y={40} form={'border_hj_akko'}>
        <dj.View h={34} form={'maricTitleRight1_akko'}>
          <dj.Button
            mode={'Bluer_right_akko'}
            w={140}
            text={
              macroStore.recodingState === 'recording'
                ? res.string.结束录制
                : res.string.开始录制
            }
            clickHandle={() => {
              macroStore.recodingState === 'stop'
                ? macroStore.starHook()
                : macroStore.stoptHook()
              macroStore.stopMouseEvent()

              if (macroStore.recodingState === 'stop' && macroStore.currentRecMacroArr.length > 0)
                saveMacro()
            }}
            mouseEnter={() => {
              macroStore.recodingState === 'recording' &&
                macroStore.stopMouseEvent()
            }}
            mouseLeave={() => {
              macroStore.recodingState === 'recording' &&
                macroStore.startMouseEvent()
            }}
          />

          <dj.CheckBox
            x={280}
            y={8}
            w={blockCloud ? 113 : 60}
            h={16}
            text={res.string.固定}
            checkState={macroStore.isSetRecordTime}
            type={'Normal'}
            clickHandle={() => {
              macroStore.setIsSetRecordTime(!macroStore.isSetRecordTime)
            }}
          />
          <dj.SpinBox_Ajazz
            w={74}
            h={22}
            x={blockCloud ? 395 : 340}
            y={5}
            min={1}
            max={65535}
            value={macroStore.recordTimes}
            step={1}
            setValue={(value: number) => {
              macroStore.setRecordTimes(value)
            }}
            changeFinished={(value: number) => {
              if (value > 65535) {
                mobxStore.toastStore.setErr(res.text.输入的时间请勿超过65535ms())
                macroStore.setRecordTimes(65535)
              } else {
                macroStore.setRecordTimes(value)
              }
            }}
          />

          {/* <dj.VerticalLine_Ajazz x={140} w={1} />
          <dj.VerticalLine_Ajazz x={515} w={1} /> */}
          <dj.Button
            mode={'Bluer_right_akko'}
            w={88}
            x={516}
            text={res.string.清空}
            isDisabled={macroStore.recodingState === 'recording'}
            clickHandle={() => {
              macroStore.setCurrentRecMacroArr([])
              if (macroStore.currentSelectMacro == undefined) {

              } else {
                saveMacro()
              }
            }}
          />
          {/* <dj.VerticalLine_Ajazz x={604} w={1} /> */}
          <dj.Button
            mode={'Bluer_right_akko'}
            w={88}
            x={605}
            text={res.string.保存}
            clickHandle={saveMacro}
            mouseEnter={() => {
              macroStore.recodingState === 'recording' &&
                macroStore.stopMouseEvent()
            }}
            mouseLeave={() => {
              macroStore.recodingState === 'recording' &&
                macroStore.startMouseEvent()
            }}
          />

        </dj.View>
        <MacroList />
      </dj.View>
    </Fragment>
  ))
}
