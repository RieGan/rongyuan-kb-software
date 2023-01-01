import React, { Fragment } from 'react'

import { useObserver } from "mobx-react-lite"
import { dj } from '../../../dj'
import { res } from '../../../res'
import { mobxStore, useStore } from '../../../mobxStore/store'
import { blockCloud } from '../../../appConfig'

import { equals } from 'ramda'

const DeviceBlock = (p: {
  type: string
  is24: boolean
  isblue?: boolean
  isHightLight: boolean
  clickHandle: () => void
  ishide: boolean
}) => {
  return (
    <dj.View w={p.ishide ? 0 : 40} h={p.ishide ? 0 : 25} relative>
      {/* {!p.ishide && <dj.VerticalLine h={14} y={4} />} */}
      {!p.ishide && <dj.Button
        w={22}
        h={22}
        x={7}
        y={0}
        isHightLight={p.isHightLight}
        img={{
          size: { w: 22, h: 22 },
          src: p.type === 'keyboard' && !p.is24 && !p.isblue
            ? res.img.bottom_keyboard
            : p.type === 'keyboard' && p.is24
              ? res.img.bottom_keyboard_24g
              : p.type === 'keyboard' && p.isblue
                ? res.img.bottom_keyboard_blue
                : p.type === 'mouse'
                  ? res.img.bottom_mouse
                  : res.img.bottom_delete,
        }}
        clickHandle={p.clickHandle}
      />}
    </dj.View>
  )
}

export const Base = () => {
  const { deviceStore, macroStore, toastStore, isKeyStore, keySettingStore } = useStore()

  return useObserver(() => (
    <Fragment>
      <dj.View drag={true} w={1220} h={53} x={0} y={678} zIndex={0}>
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#eeeeee'
          }}
        >


          <div
            style={{
              lineHeight: '53px'
            }}
          >
            <dj.Text
              w={505}
              h={'100%'}
              x={30}
              type={'SubTitle_akko'}
              text={deviceStore.currentDev?.deviceType.displayName}
            />
          </div>

          <dj.FlexView
            w={630}
            h={35}
            x={blockCloud ? 222 : 150}
            y={14}
            justifyContent={'end'}
            horizontalScroll={true}>
            {deviceStore.deviceArr.map((value, index) => {
              return <DeviceBlock
                ishide={false}
                key={index}
                type={value.deviceType.type ? value.deviceType.type : ''}
                is24={value.deviceType.is24}
                isblue={value.deviceType.otherSetting?.isblue}
                isHightLight={deviceStore.currentSelectIndex === index}
                clickHandle={async () => {
                  if (value.deviceType.is24) {
                    const dev = toastStore.sleepDevArr.find(sv => equals(deviceStore.deviceArr[index].deviceType, sv.deviceType))

                    if (dev?.status) {
                      toastStore.setInfo(res.text.请先按任意键唤醒键盘())
                      return
                    }
                  }
                  macroStore.stoptHook()
                  deviceStore.currentSelectIndex !== index &&
                    await deviceStore.setCurrentSelectIndex(index)
                }}
              />
            }
            )}
          </dj.FlexView>
          <dj.Button
            w={blockCloud ? 110 : 90}
            h={26}
            x={900}
            y={15}
            img={{
              size: {
                w: 26,
                h: 20,
              },
              src: res.img.ajazzImg.refresh,
            }}
            isHightLight={false}
            text={res.string.恢复默认}
            clickHandle={() => {
              if (macroStore.recodingState === 'stop') {
                deviceStore.setReset()
                const temp = localStorage.getItem('kFirstLanuch____')
                localStorage.clear()
                keySettingStore.currentSelcetSettingsIndex = 0;
                if (temp !== null) localStorage.setItem('kFirstLanuch____', temp)
              } else {
                mobxStore.toastStore.setInfo(res.text.请先停止录制())
              }
            }}
          />

          {/* ------------------  配置设置按钮  ------------------*/}
          <dj.ButtonELL
            classname='notoutside'
            w={140}
            h={22}
            x={1040}
            y={18}
            reverse
            img={{
              size: { w: 28, h: 22 },
              src: res.img.ajazzImg['config_arrow_up'],
            }}
            mode={'Lighter_Ajazz'}
            isHightLight={isKeyStore.isSetFile}
            textW={125}
            text={deviceStore.currentConfig.name}
            clickHandle={() => {
              if (mobxStore.macroStore.recodingState === "recording") {
                mobxStore.toastStore.setErr(res.text.请先停止录制())
                return
              }
              isKeyStore.setIsOpen(false)
              macroStore.stoptHook()
              isKeyStore.setIsSetFile(!isKeyStore.isSetFile)
            }}
          />
          {/* ------------------  配置设置按钮 End  ------------------*/}

        </div>

      </dj.View>
    </Fragment>
  ))
}