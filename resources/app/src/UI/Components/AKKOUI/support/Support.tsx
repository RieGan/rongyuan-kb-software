import React, { Fragment, useEffect } from 'react'
import { useObserver } from 'mobx-react-lite'
import { autorun } from 'mobx'
import { SupportData, SupportProp, withProps } from '../../../utils/WithProps'
import { mobxStore, useStore } from '../../../../mobxStore/store'
import { dj } from '../../../../dj'
import { res } from '../../../../res'
import { toToast } from '../../../utils/Toast'
import { store } from '../../../store'
import { blockCloud, ClickKey, kLanguage } from '../../../../appConfig'
import { getLanguage, langueLocaleKArr, langueLocaleVArr } from '../../../../res/string/languageC'
import { remote } from 'electron'
import { equals } from 'ramda'
import { changeLanguage } from '../../../utils/changeLanguage'
import { OutsideAlerter } from '../../../utils/OutsideAlerter'
import { getKeyPath } from '../../keyPath'

let isCheckVersion: boolean = false
const SupportUIGk = (p: SupportProp) => {
  const { deviceStore, isKeyStore, toastStore } = useStore()

  useEffect(() => {
    const fn = async () => {
      await p.checkAppVersion()
      await p.checkIotVersion()
      await p.checkFwVersion()
      isCheckVersion = true
    }
    if (!isCheckVersion) {
      fn()
    }
  }, [isCheckVersion])

  const getLanguageNameArr = () => {
    const nameArr = new Array<string>()

    nameArr.push(res.text.自动识别())

    for (let i = 0; i < kLanguage.length; i++) {
      const tmp = kLanguage[i]

      const index = langueLocaleKArr.findIndex(v => v === tmp)
      if (index === -1) nameArr.push(tmp)
      else nameArr.push(langueLocaleVArr[index].name)
    }

    return nameArr
  }

  const langueNameArr = getLanguageNameArr()
  const languageStr = blockCloud.toString() === 'false'
    ? langueLocaleKArr[0] // 中文简体
    : blockCloud.toString() === 'true'
      ? langueLocaleKArr[1] // 英语
      : blockCloud.toString()

  const keyPath = getKeyPath();

  return useObserver(() => {
    return (
      <Fragment>
        {
          isKeyStore.isDevUpdate ?
            <dj.View relative h={560}>
              {/* 键盘图 */}
              <dj.Img
                w={640}
                h={211}
                x={110}
                y={120}
                imgBg={keyPath}
              />
              <dj.View w={670} h={80} x={810} y={45}>
                <dj.View form='border_hj3_akko' h={'100%'}>
                  <dj.Text
                    w={96}
                    h={19}
                    y={40}
                    type={'SubTitle_akko'}
                    text={res.string.当前固件版本}
                  />
                  <dj.Text
                    w={400}
                    h={19}
                    y={40}
                    x={110}
                    type={'SubTitle_purple'}
                    text={`${Number(p.devVersion).toString(16)}`}
                  />
                </dj.View>

                <dj.Text
                  w={blockCloud ? 405 : '100%'}
                  // h={blockCloud ? 60 : 19}
                  h={'auto'}
                  y={100}
                  type={'SubTitle_akko'}
                  text={res.string.升级提示}
                />
                {/* <dj.Text
                  h={blockCloud ? 22 : 19}
                  x={blockCloud ? 0 : 128}
                  y={blockCloud ? 124 : 100}
                  type={'SubTitle_purple'}
                  text={res.string.USB有线稳定连接键盘}
                /> */}

                <dj.Text
                  w={blockCloud ? 389 : 320}
                  // h={blockCloud ? 80 : 50}
                  h={'auto'}
                  y={blockCloud ? 160 : 140}
                  type={'SubTitle_akko'}
                  text={res.string.固件升级提示_akko}
                />
                <dj.Button
                  w={blockCloud ? 157 : 130}
                  h={40}
                  y={blockCloud ? 275 : 235}
                  text={res.string.升级固件}
                  mode={'BorderBackground_HJ_update'}
                  clickHandle={async () => {
                    if (deviceStore.currentDev?.deviceType.is24) {
                      toToast('info', res.text.固件升级功能只支持在有线模式下进行())
                    } else if (deviceStore.deviceArr.some(v => v.deviceType.isblue === true)) {
                      toToast('info', res.text.固件升级功能只支持在有线模式下进行())
                    } else if (deviceStore.deviceArr.some(v => v.deviceType.is24 === true)) {
                      toToast('info', res.text.存在24G设备请先拔出后再进行升级())
                    }
                    else {
                      await p.checkFwVersion()
                      if (p.upgradeStore.devNeedUpgrade_) {
                        p.upgradeStore.setUpgradeProgressDev(0)
                        store.setState.devUpgradeOpen(true)
                        mobxStore.upgradeStore.startCountDwon()
                      } else {
                        // toToast('info', res.text.固件已经是最新版本无需更新())
                      }
                    }
                  }}
                />
                <dj.Button
                  w={blockCloud ? 157 : 130}
                  h={40}
                  x={blockCloud ? 167 : 150}
                  y={blockCloud ? 275 : 235}
                  text={res.string.取消}
                  mode={'BorderBackground_HJ_akko'}
                  clickHandle={async () => {
                    isKeyStore.setIsDevUpdate(!isKeyStore.isDevUpdate);
                  }}
                />
              </dj.View>


            </dj.View>
            :
            <dj.View relative h={560}>
              <dj.View w={670} h={80} x={270} y={50}>
                <dj.View form='border_hj3_akko' h={'100%'}>
                  <dj.Text
                    w={blockCloud ? 160 : 80}
                    h={19}
                    y={25}
                    x={blockCloud ? 120 : 200}
                    type={'SubTitle_akko'}
                    text={res.string.驱动版本}
                  />
                  <dj.Text
                    w={400}
                    h={19}
                    y={25}
                    x={292}
                    type={'SubTitle_purple'}
                    text={`${p.appVersion}`}
                  />
                  <dj.Button
                    w={blockCloud ? 157 : 130}
                    h={40}
                    x={blockCloud ? 528 : 540}
                    y={15}
                    text={res.string.检查更新}
                    mode={'BorderBackground_HJ_update'}
                    clickHandle={async () => {
                      await p.checkAppVersion()
                      await p.checkIotVersion()
                      if (p.upgradeStore.appNeedUpgrade_ || p.upgradeStore.iotNeedUpgrade) {
                        p.upgradeStore.setUpgradeProgressApp(0)
                        store.setState.appUpgrdeOpen(true)
                      } else {
                        // toToast('info', res.text.驱动已经是最新版本无需更新())
                      }
                    }}
                  />
                </dj.View>
              </dj.View>
              <dj.View w={670} h={80} x={270} y={130}>
                <dj.View form='border_hj3_akko' h={'100%'}>
                  <dj.Text
                    w={blockCloud ? 160 : 80}
                    h={19}
                    y={25}
                    x={blockCloud ? 120 : 200}
                    type={'SubTitle_akko'}
                    text={res.string.固件版本}
                  />
                  <dj.Text
                    w={400}
                    h={19}
                    y={25}
                    x={292}
                    type={'SubTitle_purple'}
                    text={`V${Number(p.devVersion).toString(16)}`}
                  />
                  <dj.Button
                    w={blockCloud ? 157 : 130}
                    h={40}
                    x={blockCloud ? 528 : 540}
                    y={15}
                    text={res.string.升级固件}
                    mode={'BorderBackground_HJ_update'}
                    clickHandle={async () => {
                      if (deviceStore.currentDev?.deviceType.is24) {
                        toToast('info', res.text.固件升级功能只支持在有线模式下进行())
                      } else if (deviceStore.deviceArr.some(v => v.deviceType.isblue === true)) {
                        toToast('info', res.text.固件升级功能只支持在有线模式下进行())
                      } else if (deviceStore.deviceArr.some(v => v.deviceType.is24 === true)) {
                        toToast('info', res.text.存在24G设备请先拔出后再进行升级())
                      }
                      else {
                        await p.checkFwVersion()
                        isKeyStore.setIsDevUpdate(!isKeyStore.isDevUpdate);
                      }
                    }}
                  />
                </dj.View>
              </dj.View>
              <dj.View w={670} h={80} x={270} y={210} zIndex={2}>
                <dj.View form='border_hj3_akko' h={'100%'}>
                  <dj.Text
                    w={blockCloud ? 190 : 80}
                    h={22}
                    y={25}
                    x={blockCloud ? 120 : 200}
                    type={'SubTitle_akko'}
                    text={res.string.语言设置_akko}
                  />
                  <dj.MyComboBoxMui
                    className='notoutside'
                    w={blockCloud ? 170 : 110}
                    h={40}
                    x={blockCloud ? 320 : 290}
                    y={19}
                    selectedValue={
                      !ClickKey
                        ? langueNameArr[0]
                        : kLanguage.findIndex(v => v === languageStr) !== -1
                          ? langueNameArr[kLanguage.findIndex(v => v === languageStr) + 1]
                          : '中文简体'
                    }
                    clickHandle={() => {
                      isKeyStore.setIsShowLanguageSelect(!isKeyStore.isShowLanguageSelect);
                    }}
                  />

                  {
                    isKeyStore.isShowLanguageSelect &&
                    <OutsideAlerter
                      clickOutsideHandle={() => {
                        isKeyStore.setIsShowLanguageSelect(false)
                      }}
                    >
                      <dj.ComboBoxSelect
                        w={blockCloud ? 170 : 110}
                        x={blockCloud ? 320 : 290}
                        y={59}
                        h={99}
                        zIndex={999}
                        overflow={'hidden scroll'}
                        modes={langueNameArr}
                        onChange={async (index: number) => {
                          if (!ClickKey && index === 0) return

                          const k = index - 1
                          if (equals(languageStr, kLanguage[k]) && ClickKey) return

                          if (index === 0) {
                            const sysLanguage = window.navigator.language.toLowerCase();
                            const lanage = getLanguage(sysLanguage)
                            let currentLanguage: string | boolean = lanage
                            if (kLanguage && kLanguage.findIndex(v => v === lanage) === -1) {
                              if (kLanguage.findIndex(v => v === langueLocaleKArr[0]) != -1) {
                                currentLanguage = langueLocaleKArr[1]
                              } else {
                                currentLanguage = kLanguage[0]
                              }
                            }
                            currentLanguage = currentLanguage === "英语"
                              ? true
                              : currentLanguage === "中文简体"
                                ? false
                                : currentLanguage

                            changeLanguage(currentLanguage, undefined)
                            remote.getCurrentWindow().reload()
                            return
                          }

                          const langueLocaleKI = langueLocaleKArr.findIndex(v => v === kLanguage[k]) !== -1
                          const tmp = kLanguage[k] === langueLocaleKArr[0] // 中
                            ? false
                            : kLanguage[k] === langueLocaleKArr[1] // 英
                              ? true
                              : langueLocaleKI
                                ? kLanguage[k]
                                : false
                          changeLanguage(tmp, langueLocaleKI ? langueLocaleKI : undefined)
                          toastStore.setInfo(res.text.驱动重启后生效())
                          remote.getCurrentWindow().reload()
                        }}
                      />
                    </OutsideAlerter>
                  }

                </dj.View>
              </dj.View>
              <dj.Text w={670} h={80} x={270} y={310} type={'SubTitle_center'} text={res.string.升级固件警告} />


            </dj.View>
        }

      </Fragment >
    )
  })

}

export const Support = withProps(SupportUIGk, SupportData)
