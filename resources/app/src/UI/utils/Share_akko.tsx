import React, { Fragment, useEffect, useState } from 'react'
import { res } from '../../res'
import { dj } from '../../dj'

import { useStore } from '../../mobxStore/store'
import { useObserver } from 'mobx-react-lite'
import { Config, Macro } from '../../sdk/DB'

const TypeTable = {
  Config: '配置分享',
  Macro: '宏分享',
} as const

export const Share_akko = (props: {
  type: keyof typeof TypeTable
  macro?: Macro
  config?: Config
  close: () => void
}) => {
  const { deviceStore, shareStore, isKeyStore } = useStore()

  const [describle, setDescrible] = useState('')

  useEffect(() => {
    isKeyStore.setIsShareOpen(true);
  }, [])

  return useObserver(() => (
    <Fragment>
      <dj.View form={'背景页'} drag={true}>
        {''}
      </dj.View>
      <dj.FlexView alignItems={'center'} justifyContent={'center'}>
        <dj.View relative w={480} h={639} form={'弹出框'}>
          <div
            style={{
              width: '100%',
              height: '100%',
              background: '#EBE9F2'
            }}
          >

            <dj.Text
              w={480}
              h={28}
              y={20}
              type={'弹框标题_akko'}
              text={TypeTable[props.type]}
            />
            <dj.Button
              w={14}
              h={14}
              x={424}
              y={26}
              img={{
                size: {
                  w: 14,
                  h: 14,
                },
                src: res.img.ajazzImg.close,
              }}
              clickHandle={() => {
                props.close()
              }}
            />
            <dj.FlexView
              w={380}
              h={480}
              x={50}
              y={120}
              style={{
                backgroundColor: '#fff',
                borderRadius: '15px',
              }}
            >
              <dj.FlexView
                w={380}
                h={60}
                // x={40}
                // y={110}
                flexDirection={'row'}
                justifyContent={'space-between'}>
                <dj.View relative h={60}>
                  <dj.Text
                    w={309}
                    h={20}
                    x={40}
                    y={31}
                    type={'SubTitle_akko'}
                    text={'设备名称'}
                  />
                  <dj.Text
                    w={309}
                    h={36}
                    x={130}
                    y={31}
                    type={'SubTitle_purple'}
                    text={deviceStore.currentDev?.deviceType.displayName}
                  />
                </dj.View>
              </dj.FlexView>
              <dj.TextArea_akko
                w={300}
                h={220}
                x={40}
                y={80}
                placeholder={'设备描述'}
                editble={true}
                value={describle}
                setValue={(event) => setDescrible(event.target.value)}
              />
              <dj.FlexView
                w={300}
                h={55}
                x={40}
                y={333}
                justifyContent={'space-between'}
                alignItems={'flex-start'}>
                <dj.Button
                  relative
                  w={130}
                  h={55}
                  mode={'BorderBackground_HJ_update'}
                  text={res.string.取消}
                  clickHandle={() => props.close()}
                />
                <dj.Button
                  relative
                  w={130}
                  h={55}
                  mode={'BorderBackground_HJ_update'}
                  text={res.string.确定}
                  clickHandle={() => {
                    props.type === 'Config'
                      ? props.config !== undefined &&
                      shareStore.shareConfig(props.config, describle)
                      : props.macro !== undefined &&
                      shareStore.shareMacro(props.macro, describle)

                    props.close()
                  }}
                />
              </dj.FlexView>
            </dj.FlexView>
          </div>

        </dj.View>
      </dj.FlexView>
    </Fragment>
  ))
}
