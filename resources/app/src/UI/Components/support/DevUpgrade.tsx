import { useObserver } from 'mobx-react-lite'
import React, { Fragment, useEffect, useState } from 'react'
import { blockCloud } from '../../../appConfig'

import { dj } from '../../../dj'
import { mobxStore } from '../../../mobxStore/store'
import { res } from '../../../res'
import { GA } from '../../../sdk/GA/ga'
import { Progress } from '../../utils/Progress'
import { toToast } from '../../utils/Toast'
import {
  DevUpgradeData,
  DevUpgradeProp,
  withProps,
} from '../../utils/WithProps'
import { getKeyPath } from '../keyPath'


const UpgradeUI = (p: DevUpgradeProp) => {
  const [showProgress, setShowProgress] = useState(false)
  const keyPath = getKeyPath()
  console.error(mobxStore.deviceStore.currentDev);


  useEffect(() => {
    if (p.progress === 1) {
      setShowProgress(false)
      toToast('info', res.text.升级成功())
      GA.trackPage('DevUpgradeUI')
      p.close()
    }
  }, [p.progress])

  useEffect(() => {
    console.log('errr msg', p.errMsg)
    if (p.errMsg !== '') setShowProgress(false)
  }, [p.errMsg])

  return useObserver(() => {
    return (
      <Fragment>
        <dj.View form={'背景页'}>{''}</dj.View>
        <dj.View drag={true}>
          {p.deviceType === 'keyboard' ? (
            <dj.Img
              w={mobxStore.deviceStore.currentDev ? 871 : 0}
              h={288}
              x={175}
              y={193}
              imgBg={
                mobxStore.deviceStore.currentDev
                  ? keyPath
                  : ''
              }
            />
          ) : (
            <dj.Img
              w={mobxStore.deviceStore.currentDev ? 186 : 0}
              h={366}
              x={501}
              y={139}
              imgBg={
                mobxStore.deviceStore.currentDev
                  ? (res.img[p.deviceName as keyof typeof res.img] as string)
                  : ''
              }
            />
          )}
          {!(mobxStore.deviceStore.currentDev) && <dj.Text
            h={30}
            y={300}
            text={res.string.设备被拔出}
            type={'升级警告'}
          />}
          <dj.Text
            h={blockCloud?54:28}
            y={545}
            text={`${res.text.固件升级提示()}.${res.text.固件升级完()}`}
            type={'升级警告'}
          />
          <dj.Button
            w={160}
            h={34}
            x={530}
            y={blockCloud?610:580}
            text={res.text.更新() +
              (mobxStore.upgradeStore.count <= 0
                ? ''
                : `(${mobxStore.upgradeStore.count})`)
            }
            mode={'BorderBackground_HJ2'}
            clickHandle={() => {
              if (mobxStore.upgradeStore.count <= 0) {
                p.upgrade()
                setShowProgress(p.errMsg === '' ? true : false)
              }
            }}
          />
          <dj.Text
            h={28}
            y={510}
            text={res.text.升级提示()}
            type={'升级警告'}
          />
          <dj.Text
            h={15}
            text={`${res.text.当前固件版本()}：${Number(p.version).toString(16)} `}
            x={1016}
            y={645}
            type={'单选框'}
          />
          <dj.Button
            w={13}
            h={13}
            x={1146}
            y={23}
            img={{
              size: {
                w: 13,
                h: 13,
              },
              src: res.img.close,
            }}
            clickHandle={p.close}
          />
        </dj.View>
        {showProgress && <Progress rate={p.progress} />}
      </Fragment>
    )
  })
}

export const DevUpgrade = withProps(UpgradeUI, DevUpgradeData)
