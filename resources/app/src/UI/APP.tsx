import * as React from 'react'
import { MainPage } from './MainPage'
import { Welcome } from './Welcome'
import { useStore } from '../mobxStore/store'
import { useObserver } from 'mobx-react-lite'
import { ToastContainer } from 'react-toastify'
import { store } from './store'
import { DevUpgrade } from './Components/support/DevUpgrade'
import { MobxErrorWarning } from './utils/MobxErrorWarning'
import { AppUpgrade } from './Components/support/AppUpgrade'
import { Help } from './Help'
import { MainPage_akko } from './Components/AKKOUI/MainPage_akko'

export const APP = () => {
  const { deviceStore ,lightPageStore} = useStore()
  const { devUpgradeOpen, appUpgrdeOpen } = store.useState(
    (v) => v.devUpgradeOpen.appUpgrdeOpen
  )
  lightPageStore.setPageIndex(0)

  return useObserver(() => (
    <div>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div>
        {/* {deviceStore.currentDev?.deviceType.displayName === 'help' ? <Help /> : deviceStore.deviceArr.length < 1 ? <Welcome /> : <MainPage />} */}
        {deviceStore.currentDev?.deviceType.displayName === 'help' ? <Help /> : <MainPage_akko />}
        {devUpgradeOpen && <DevUpgrade />}
        {appUpgrdeOpen && <AppUpgrade />}
        <MobxErrorWarning />
      </div>
    </div>
  ))
}
