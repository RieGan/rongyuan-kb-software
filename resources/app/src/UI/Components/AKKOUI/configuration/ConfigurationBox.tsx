import React, { useState } from 'react'

import { dj } from '../../../../dj'
import { res } from '../../../../res'
import { store } from '../../../store'

import { mobxStore, useStore } from '../../../../mobxStore/store'
import { useObserver } from 'mobx-react-lite'
import { Config } from '../../../../sdk/DB'
import { blockCloud } from '../../../../appConfig'

export const ConfigurationBox = (props: {
  config: Config
  configurationOpen: boolean
  shareOpen: boolean
  onDelete: () => void
  clickHandle: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  sharConfigClick: () => void
}) => {
  const { configurationOpen, shareOpen } = props
  const { configStore, deviceStore, isKeyStore } = useStore()

  const shareConfig = () => {
    // if (userStore.user === undefined) {
    //   toToast('error', '请您登录后再进行分享')
    //   return
    // }
    props.sharConfigClick()
    store.setState.configurationOpen(!configurationOpen)
    isKeyStore.setIsSetFile(!isKeyStore.isSetFile)
    store.setState.shareOpen(!shareOpen)
    isKeyStore.setIsShare(true)
  }

  const [rename, setRename] = useState({ state: false, name: '' })
  return useObserver(() => (
    <dj.View
      h={70}
      form={
        props.config.localId === deviceStore.currentConfig.localId
          ? '被选中'
          : 'DefaultBackground'
      }>
      {rename.state ? (
        <dj.TextInput
          relative
          w={180}
          h={20}
          x={38}
          y={25}
          autoFocus={rename.state}
          usePlaceholder={res.useString.请输入新的配置名称}
          type={'重命名'}
          value={rename.name}
          onChange={(event) => {
            const firStr = event.target.value.charAt(0)
            if (firStr === ' ') {
              mobxStore.toastStore.setErr(res.text.配置命名不能以空格开头())
              const str = event.target.value
              const strDel = str.substr(1)
              event.target.value = strDel
            }
            setRename({ ...rename, name: event.target.value })

          }}
          inputFinished={() => {
            if (rename.name !== '') {
              props.config.name = rename.name
              configStore.saveConfig(props.config)
              setRename({ state: false, name: '' })
            }
            setRename({ state: false, name: rename.name })
          }}
        />
      ) : (
        <dj.Text
          relative
          w={200}
          h={20}
          x={38}
          y={28}
          type={'配置页名称'}
          text={props.config.name}
        />
      )}
      {!rename.state && <dj.View clickHandle={props.clickHandle}>{''}</dj.View>}
      <dj.FlexView
        w={83}
        h={20}
        x={238}
        y={27}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <dj.Button
          relative
          w={14}
          h={14}
          img={{
            size: {
              w: 14,
              h: 14,
            },
            src: res.img.ajazzImg.modify,
          }}
          isHightLight={false}
          clickHandle={() => {
            setRename({ ...rename, state: !rename.state })
          }}
        // mouseUp={() => {
        //   inpFocus.current?.focus();
        //   console.log(inpFocus.current);
        // }}
        // mouseLeave={() => {
        //   inpFocus.current?.focus();
        // }}
        // clickHandle={() => {
        //   setRename({ ...rename, state: !rename.state })
        //   inpFocus.current?.focus();
        //   console.log(inpFocus.current);
        // }}
        />
        {!blockCloud && (
          <dj.Button
            relative
            w={14}
            h={14}
            img={{
              size: {
                w: 14,
                h: 14,
              },
              src: res.img.ajazzImg.upload,
            }}
            clickHandle={() => shareConfig()}
          />
        )}
        <dj.Button
          relative
          w={14}
          h={14}
          img={{
            size: {
              w: 14,
              h: 14,
            },
            src: res.img.ajazzImg.delete,
          }}
          clickHandle={props.onDelete}
        />
      </dj.FlexView>
    </dj.View>
  ))
}
