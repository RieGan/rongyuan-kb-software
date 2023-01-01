import React, { Fragment, useState } from 'react'
import { dj } from '../../../dj'
import { res } from '../../../res'
import { store } from '../../store'
import { ForgetPassword } from './ForgetPassword'
import { Register } from './Register'
import { _2500ms消失文字 } from '../../utils/_2500ms消失文字'
import { webServerCompose } from './User'
import { login_logo_p, urlStr } from '../../../appConfig'
import { useStore } from '../../../mobxStore/store'

export const Login = () => {
  const [state, setstate] = useState({
    email: '',
    password: '',
  })

  // tslint:disable-next-line: only-arrow-functions

  const onLogin = () => {
    if (state.email === '' || state.password === '')
      store.setState.user_warningText(
        <_2500ms消失文字 key={Date.now()} text='请将所有的内容填满噢' />
      )
    else if (res.regexp.email.test(state.email) === false)
      store.setState.user_warningText(
        <_2500ms消失文字 key={Date.now()} text='请输入正确的邮箱' />
      )
    else webServerCompose('login')(state)
  }
  const { isKeyStore } = useStore()
  return (
    <Fragment>
      <dj.View w={480} h={640} x={385} y={50} form={'弹出框'}>

        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#EBE9F2',
          }}
        >


          <dj.Img w={179} h={56} x={154} y={35} imgBg={res.img.ajazzImg.logo} />
          {/* <dj.Text
            h={25}
            y={68}
            type={'个人中心标题'}
            text={res.string.登录}></dj.Text> */}
          <dj.FlexView
            w={380}
            h={480}
            x={50}
            y={120}
            style={{
              backgroundColor: '#fff',
              borderRadius: '15px',
            }}
          >
            <dj.TextInput_akko
              w={300}
              h={55}
              x={40}
              y={50}
              usePlaceholder={res.useString.邮箱}
              value={state.email}
              onChange={(event) => {
                if (event.target.value.length <= 50) {
                  setstate({ ...state, email: event.target.value })
                } else {
                  isKeyStore.setTextKey(true)
                  store.setState.user_warningText(
                    <_2500ms消失文字
                      key={Date.now()}
                      text={'邮箱过长'}
                    />
                  )
                }
              }
              }
            />
            <dj.TextInput_akko
              w={300}
              h={55}
              x={40}
              y={135}
              type={'密码_akko'}
              usePlaceholder={res.useString.密码}
              value={state.password}
              onChange={(event) => {
                if (event.target.value.length <= 25) {
                  setstate({ ...state, password: event.target.value })
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
              w={85}
              h={17}
              x={250}
              y={157}
              mode={'Bluer'}
              text={'忘记密码?'}
              clickHandle={() => store.setState.user_UI(<ForgetPassword />)}
            />
            <dj.Button_akko
              w={300}
              h={55}
              x={35}
              y={220}
              mode={'BorderBackground_AKKO'}
              text={res.string.登录}
              clickHandle={() => {
                onLogin()
                isKeyStore.setTextKey(true)
              }}
            />
            <dj.Line w={86} x={35} y={328} lineColor={'User'}></dj.Line>
            <dj.Text y={319} type={'user提示'} text={'尚未注册账号?'} />
            <dj.Line w={86} x={248} y={328} lineColor={'User'}></dj.Line>
            <dj.Button_akko
              w={300}
              h={55}
              x={35}
              y={374}
              mode={'BorderBg_akko'}
              text={res.string.注册}
              clickHandle={() => store.setState.user_UI(<Register />)}
            />


          </dj.FlexView>
          <dj.Button
            w={20}
            h={20}
            x={440}
            y={20}
            img={{
              size: {
                w: 20,
                h: 20,
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
