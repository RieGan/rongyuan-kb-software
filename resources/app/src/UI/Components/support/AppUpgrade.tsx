import React, { Fragment, useEffect, useState } from 'react'
import { GA } from '../../../sdk/GA/ga'
import { Progress } from '../../utils/Progress'
import { Warning } from '../../utils/Warning'
import {
  AppUpgradeData,
  AppUpgradeProp,
  withProps,
} from '../../utils/WithProps'

export const AppUpgradeUI = (p: AppUpgradeProp) => {
  const [showProgress, setShowProgress] = useState(false)

  useEffect(() => {
    if (p.progress === 1) {
      setShowProgress(false)
      GA.trackPage('AppUpgradeUI')
      //toToast('info', '升级成功')
      p.close()
    }
  }, [p.progress])

  useEffect(() => {
    if (p.errMsg !== '') setShowProgress(false)
  }, [p.errMsg])

  return (
    <Fragment>
      <Warning
        type={'软件升级'}
        cancleHandle={p.close}
        certainHandle={() => {
          p.upgrade()
          setShowProgress(p.errMsg === '' ? true : false)
        }}
      />
      {showProgress && <Progress rate={p.progress} hidAlert={true} />}
    </Fragment>
  )
}

export const AppUpgrade = withProps(AppUpgradeUI, AppUpgradeData)
