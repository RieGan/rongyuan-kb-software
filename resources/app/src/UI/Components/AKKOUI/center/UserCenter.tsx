import React, { Fragment, useState } from 'react'
import { useStore } from '../../../../mobxStore/store'
import { res } from '../../../../res'
import { sdk } from '../../../../sdk'
import { store } from '../../../store'
import { _2500ms消失文字 } from '../../../utils/_2500ms消失文字'
import { useObserver } from 'mobx-react-lite'
import { dj } from '../../../../dj'
import { sleep } from '../../../../unitys/timeFunc'

export const UserCenter = () => {
  const { user_warningText } = store.useState((v) => v.user_warningText)

  const [password, setPassword] = useState({
    old: '',
    new: '',
    new2: '',
  })
  const { isKeyStore } = useStore()
  const changePassword = async () => {
    isKeyStore.setTextKey(true)
    if (password.old === '' || password.new === '' || password.new2 === '')
      store.setState.user_warningText(
        <_2500ms消失文字
          key={Date.now()}
          text={res.string.请将所有的内容填满噢}
        />
      )
    else if (password.new.length < 6 || password.new.length > 25)
      store.setState.user_warningText(
        <_2500ms消失文字
          key={Date.now()}
          text={'密码长度应在 6-25 个字符之间'}
        />
      )
    else if (password.new !== password.new2)
      store.setState.user_warningText(
        <_2500ms消失文字
          key={Date.now()}
          text={res.string.您两次输入的密码不一致}
        />
      )
    else if (password.new === password.old)
      store.setState.user_warningText(
        <_2500ms消失文字
          key={Date.now()}
          text={res.string.新旧密码一致无法进行修改}
        />
      )
    else
      await sdk.ioFunc
        .userChangePassword(password.old, password.new)
        .then((result) =>
          store.setState.user_warningText(
            <_2500ms消失文字
              key={Date.now()}
              text={
                result.errCode === 0
                  ? res.string.密码修改成功
                  : result.errMsg
              }
            />
          )
        )

    setPassword({
      old: '',
      new: '',
      new2: '',
    })
  }


  const { configStore, deviceStore, userStore, macroStore } = useStore()
  if (macroStore.currentSelectMacro?.user?.id == userStore.user?.id) macroStore.setCurrentRecMacroArr([]);
  const logout = async () => {
    await sdk.ioFunc
      .userLogout()
      .then((data) => {
        data.errCode === 0 && store.setState.user_Name('')
      })

    await sleep(500)
    if (configStore.configList.length === 0) {
      if (deviceStore.currentDev?.deviceType.displayName === undefined) return
      deviceStore.creatNewConfigToCurrentAndSave(
        deviceStore.currentDev?.deviceType.displayName,
        ''
      )
    }
    if (deviceStore.currentConfig.localId === configStore.configList[0].localId) return
    deviceStore.setCurrentConfig(configStore.configList[0])
    store.setState.configurationOpen(false)
    isKeyStore.setIsSetFile(false)
    // console.error(configStore.configList.length);
  }

  const uploadConfigs = () => configStore.uploadConfigs()

  const downConfigs = () => configStore.downloadConfigs()

  return useObserver(() =>
    userStore.user === undefined ? (
      <dj.Text
        h={538}
        y={70}
        type={'启动页主标题_black'}
        text={res.string.请您登录后再进入个人中心}
      />
    ) : (
      <Fragment>
        <dj.View w={670} h={80} x={270} y={85}>
          <dj.View form='border_hj3_akko' h={'100%'}>
            <dj.Text
              w={80}
              h={19}
              y={25}
              x={20}
              type={'SubTitle_akko'}
              text={`我的设备： `}
            />
            <dj.Text
              w={400}
              h={19}
              y={25}
              x={112}
              type={'SubTitle_purple'}
              text={`${deviceStore.currentDev?.deviceType.displayName}`}
            />
            <dj.Button
              w={130}
              h={40}
              x={540}
              y={15}
              text={'退出登录'}
              mode={'BorderBackground_HJ_akko'}
              clickHandle={logout}
            />
          </dj.View>
        </dj.View>



        <dj.View w={670} h={155} x={270} y={165}>
          <dj.View form='border_hj3_akko' h={'100%'}>
            <dj.Text
              w={80}
              h={19}
              y={60}
              x={20}
              type={'SubTitle_akko'}
              text={'云同步：'}
            />
            <dj.Text
              w={400}
              h={19}
              y={30}
              x={112}
              type={'SubTitle_akko'}
              text={'上传该设置，将保存到我的云共享'}
            />
            <dj.Button
              w={130}
              h={40}
              x={540}
              y={20}
              text={'上传当前设置'}
              mode={'BorderBackground_HJ_akko'}
              clickHandle={uploadConfigs}
            />

            <dj.Text
              w={400}
              h={19}
              y={100}
              x={112}
              type={'SubTitle_akko'}
              text={'下载云端设置，将覆盖当前设置'}
            />
            <dj.Button
              w={130}
              h={40}
              x={540}
              y={90}
              text={'下载云端设置'}
              mode={'BorderBackground_HJ_akko'}
              clickHandle={downConfigs}
            />


          </dj.View>
        </dj.View>

        <dj.View w={670} h={240} x={270} y={320}>
          <dj.View h={'100%'}>
            <dj.Text
              w={80}
              h={19}
              y={87}
              x={20}
              type={'SubTitle_akko'}
              text={'修改密码：'}
            />
            <dj.TextInput_akko
              w={300}
              h={40}
              y={30}
              x={120}
              type={'密码_akko'}
              usePlaceholder={res.useString.请输入旧密码}
              value={password.old}
              onChange={(event) => {
                if (event.target.value.length <= 25) {
                  setPassword({ ...password, old: event.target.value })
                } else {
                  isKeyStore.setTextKey(true)
                  store.setState.user_warningText(
                    <_2500ms消失文字
                      key={Date.now()}
                      text={'密码长度应在 6-25 个字符之间'}
                    />
                  )
                }
              }
              }
            />

            <dj.TextInput_akko
              w={300}
              h={40}
              y={80}
              x={120}
              type={'密码_akko'}
              usePlaceholder={res.useString.请输入新密码}
              value={password.new}
              onChange={(event) => {
                if (event.target.value.length <= 25) {
                  setPassword({ ...password, new: event.target.value })
                } else {
                  isKeyStore.setTextKey(true)
                  store.setState.user_warningText(
                    <_2500ms消失文字
                      key={Date.now()}
                      text={'密码长度应在 6-25 个字符之间'}
                    />
                  )
                }
              }
              }
            />

            <dj.TextInput_akko
              w={300}
              h={40}
              y={130}
              x={120}
              type={'密码_akko'}
              usePlaceholder={res.useString.再次输入新密码}
              value={password.new2}
              onChange={(event) => {
                if (event.target.value.length <= 25) {
                  setPassword({ ...password, new2: event.target.value })
                } else {
                  isKeyStore.setTextKey(true)
                  store.setState.user_warningText(
                    <_2500ms消失文字
                      key={Date.now()}
                      text={'密码长度应在 6-25 个字符之间'}
                    />
                  )
                }
              }
              }
            />

            <dj.Button
              w={130}
              h={40}
              x={540}
              y={80}
              text={'修改密码'}
              mode={'BorderBackground_HJ_akko'}
              clickHandle={changePassword}
            />

            {isKeyStore.textKey &&
              <dj.Text
                text={user_warningText}
                type={'提示'}
                w={360}
                h={20}
                x={75}
                y={210}
              />
            }

          </dj.View>
        </dj.View>

      </Fragment>
    )
  )
}
