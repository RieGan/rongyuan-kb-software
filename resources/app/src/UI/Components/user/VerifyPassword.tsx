import React, { Fragment, useEffect, useState } from 'react'

import { dj } from '../../../dj'
import { res } from '../../../res'
import { store } from '../../store'
import { Login } from './Login'
import { _2500ms消失文字 } from '../../utils/_2500ms消失文字'
import { webServerCompose } from './User'
import { Verify } from './Verify'
import { useStore } from '../../../mobxStore/store'

export const VerifyPassword = (p: { email: string; verifyCode: string, seconds?: number }) => {
  console.log('axiba', p.email, p.verifyCode)
  const [password, setPassword] = useState({ password1: '', password2: '' })
  const [seconds, setSeconds] = useState(p.seconds)
  const { isKeyStore } = useStore()
  const changePassword = () => {
    if (password.password1 === '' || password.password2 === '')
      store.setState.user_warningText(
        <_2500ms消失文字 key={Date.now()} text={'密码不能为空'} />
      )
    else if (password.password1 !== password.password2)
      store.setState.user_warningText(
        <_2500ms消失文字 key={Date.now()} text={'两次输入的密码不相等'} />
      )
    else
      webServerCompose('resetPassword')({ ...p, password: password.password1 })
  }
  useEffect(() => {
    const countDownId = setTimeout(() => {
      if (seconds != undefined && seconds >= 1) {
        setSeconds(seconds - 1)
      } else clearTimeout(countDownId)
    }, 1000)

    return () => {
      clearTimeout(countDownId)
    }
  }, [seconds])
  return (
    <Fragment>
      <dj.View w={370} h={330} x={416} y={170} form={'弹出框'}>
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#EBE9F2'
          }}
        >
          <dj.Text h={25} x={160} y={23} text={'验证'} type={'SubTitle_akko'} />

          <dj.Button
            w={12}
            h={12}
            x={36}
            y={26}
            img={{
              size: {
                w: 12,
                h: 12,
              },
              src: res.img.ajazzImg.return,
            }}
            clickHandle={() => store.setState.user_UI(<Verify email={p.email} seconds={seconds} />)}
          />

          <dj.FlexView
            w={320}
            h={176}
            x={25}
            y={76}
            style={{
              background: '#fff',
              borderRadius: '10px'
            }}
          >

            <dj.TextInput_akko
              type={'密码_akko'}
              w={300}
              h={34}
              x={10}
              y={15}
              usePlaceholder={res.useString.密码}
              value={password.password1}
              onChange={(event) => {
                if (event.target.value.length <= 25) {
                  setPassword({ ...password, password1: event.target.value })
                } else {
                  isKeyStore.setTextKey(true)
                  store.setState.user_warningText(
                    <_2500ms消失文字
                      key={Date.now()}
                      text={'密码长度应在 6-25 个字符之间'}
                    />
                  )
                }
              }}
            />


            <dj.TextInput_akko
              type={'密码_akko'}
              w={300}
              h={34}
              x={10}
              y={70}
              usePlaceholder={res.useString.再次输入密码}
              value={password.password2}
              onChange={(event) => {
                if (event.target.value.length <= 25) {
                  setPassword({ ...password, password2: event.target.value })
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
              w={300}
              h={36}
              x={10}
              y={125}
              mode={'BorderBackground_HJ_update'}
              text={'发送'}
              clickHandle={changePassword}
            />

          </dj.FlexView>

          <dj.Button
            w={12}
            h={12}
            x={321}
            y={26}
            img={{
              size: {
                w: 12,
                h: 12,
              },
              src: res.img.ajazzImg.close,
            }}
            clickHandle={() => {
              store.setState.userOpen(false)
              store.setState.user_UI(<Login />)
              store.setState.user_warningText('')
            }}
          />
        </div>
      </dj.View>
    </Fragment>
  )
}
