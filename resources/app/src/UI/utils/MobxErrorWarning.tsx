import { useStore } from '../../mobxStore/store'
import { toToast } from './Toast'
import React, { useEffect } from 'react'
import { autorun } from 'mobx'

export const MobxErrorWarning = () => {
  const { toastStore } = useStore()
  useEffect(() =>
    autorun(() => {
      console.log('toToast log', toastStore.errType, toastStore.errMsg)
      if (toastStore.errMsg !== '') {

        toToast(toastStore.errType, toastStore.errMsg)

        setTimeout(() => {
          toastStore.closeErr()
        }, 2000);
      }
    })
  )
  return <div />
}
