import React from 'react'
import { dj } from '../../dj'
import { useStore } from '../../mobxStore/store'
import { useObserver } from 'mobx-react-lite'
import { res } from '../../res'
import { remote } from 'electron'
import { equals } from 'ramda'

export const Loading = () => {
  const { toastStore } = useStore()
  return useObserver(() =>
    toastStore.state === 'bussy' ? (
      <dj.View form={'loading'} drag={true} zIndex={99999}>
        <dj.Rotate w={34} h={34} x={583} y={348}>
          <dj.Img imgBg={res.img.loading} type={'完全覆盖背景区'} />
        </dj.Rotate>
        {toastStore.senders.includes('drawTypeArr2Gif') && <dj.Text h={24} x={0} y={400} type={'升级警告'} text={res.string.正在生成GIF请稍候} />}
      </dj.View>
    ) : null
  )
}


export const DevSleepLoading = () => {
  const { toastStore,deviceStore,drawStore } = useStore()

  return useObserver(() => {
    if (toastStore.devSleepTipsShow) {
      if (deviceStore.currentDev && deviceStore.currentDev.type === 'keyboard') {
        if (deviceStore.currentDev.deviceType.is24 || deviceStore.currentDev.deviceType.isblue) {
          if (toastStore.sleepDevArr.find(sv =>
            equals(deviceStore.currentDev?.deviceType.id, sv.deviceType.id)
            && equals(deviceStore.currentDev?.deviceType.devAddr, sv.deviceType.devAddr)
            && sv.status)) {
              drawStore.setIsPreview(false)
            { console.log('loading1', deviceStore.currentDev.deviceType.is24, deviceStore.currentDev.deviceType.isblue) }
            return <dj.View form={'loading'} drag={true}>
              <dj.Button
                w={13}
                h={13}
                x={1185}
                y={23}
                img={{
                  size: {
                    w: 13,
                    h: 13,
                  },
                  src: res.img.close,
                }}
                clickHandle={() => remote.getCurrentWindow().close()}
              />
              <dj.Rotate w={34} h={34} x={583} y={348}>
                <dj.Img imgBg={res.img.loading} type={'完全覆盖背景区'} />
              </dj.Rotate>
              <dj.Text h={24} x={0} y={400} type={'升级警告'} text={deviceStore.currentDev.deviceType.is24 ? res.string.未连接到24G键盘 : res.string.未连接到蓝牙} />
            </dj.View>
          }
        }
      }
    }
    return null
  })
}