import React, { useEffect, useState } from 'react'


import { store } from "../../store"

import { Config } from '../../../sdk/DB'

import { res } from '../../../res'
import { useStore } from "../../../mobxStore/store"
import { Base } from './Bottom'
import { DevSleepLoading, Loading } from '../../utils/Loading'
import { User } from '../user/User'
import { Share } from '../../utils/Share'
import { useObserver } from 'mobx-react-lite'
import { Configuration } from './configuration/Configuration'
import { Top_akko } from './Top_akko'
import { MainLayout_akko } from './MainLayout_akko'
import { Share_akko } from '../../utils/Share_akko'


export const MainPage_akko = () => {
  const {
    configurationOpen,
    shareOpen,
    userOpen,
  } = store.useState(
    (v) => v.configurationOpen.shareOpen.userOpen.appUpgrdeOpen
  )
  const { isKeyStore, deviceStore } = useStore()
  isKeyStore.setLightKey(!isKeyStore.isSetFile)
  const [shareConfig, setShareConfig] = useState<Config | undefined>(undefined)
  useEffect(() => {
    if (deviceStore.currentDev?.deviceType.displayName !== 'help')
      store.setState.devUpgradeOpen(false)
  }, [])
  return useObserver(() => (

    <div
      style={{
        width: 1220,
        height: 300,
        background: 'linear-gradient(to right, #9633F1,#6315C8)'
      }}
    >

      <div style={{
        width: 1220,
        height: 730,
        background: `url(${res.img.ajazzImg.background})`,
        backgroundRepeat: 'noRepeat',
        backgroundSize: 'cover'
      }}>
        <div>
          <Top_akko />
          <MainLayout_akko />
          <Base />
        </div>
        {isKeyStore.isSetFile && (
          <Configuration
            title={res.text.配置设置()}
            setShareConfig={(config: Config) => setShareConfig(config)}
          />
        )}
        {shareOpen && (
          <Share_akko
            type={'Config'}
            config={shareConfig}
            close={() => {
              store.setState.shareOpen(false)
              setShareConfig(undefined)
            }}
          />
        )}
        <Loading />
        <DevSleepLoading />
        {userOpen && <User />}
      </div>
    </div>

  ))
}
