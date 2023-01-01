import React, { Fragment, useState } from 'react'
import { dj } from '../../../dj'
import { res } from '../../../res'

import { store } from '../../store'
import { Login } from './Login'
import { UserArgee } from './UserArgee'
import { _2500ms消失文字 } from '../../utils/_2500ms消失文字'
import { webServerCompose } from './User'
import { login_logo_p, urlStr } from '../../../appConfig'
import { useStore } from '../../../mobxStore/store'

export const Register = () => {
  const [state, setstate] = useState({
    userName: '',
    email: '',
    password: '',
    password2: '',
    gender: 'male' as 'male' | 'female',
    isAgree: false,
  })

  const [agreeOpen, setAgreeOpen] = useState(false)
  const { isKeyStore } = useStore();

  const isEmpty = (value: string) => {
    return value === ''
  }

  const onSubmit = () => {
    if (!state.isAgree)
      store.setState.user_warningText(
        <_2500ms消失文字 key={Date.now()} text='请您同意用户协议后再进行注册' />
      )
    else if (
      isEmpty(state.email) ||
      isEmpty(state.userName) ||
      isEmpty(state.password) ||
      isEmpty(state.password2)
    )
      store.setState.user_warningText(
        <_2500ms消失文字
          key={Date.now()}
          text={res.string.请将所有的内容填满噢}
        />
      )
    else if (state.password !== state.password2)
      store.setState.user_warningText(
        <_2500ms消失文字 key={Date.now()} text='两次输入的密码不一致' />
      )
    else if (res.regexp.register_email.test(state.email) === false)
      store.setState.user_warningText(
        <_2500ms消失文字 key={Date.now()} text='请输入正确的邮箱' />
      )
    else if (state.password.length < 6 || state.password.length > 25)
      store.setState.user_warningText(
        <_2500ms消失文字 key={Date.now()} text='密码长度应在 6-25 个字符之间' />
      )
    else if (state.userName.length < 4) {
      store.setState.user_warningText(
        <_2500ms消失文字 key={Date.now()} text='用户名至少需要 4 个字符' />
      )
    } else if (state.userName.length > 20) {
      store.setState.user_warningText(
        <_2500ms消失文字 key={Date.now()} text='用户名不可超过 20 个字符' />
      )
    }
    else {
      webServerCompose('register')(state)
    }
  }

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

          <dj.Text
            h={36}
            y={43}
            type={'个人中心标题'}
            text={res.string.注册} />
          <dj.Button
            w={20}
            h={20}
            x={37}
            y={20}
            img={{
              size: {
                w: 20,
                h: 20,
              },
              src: res.img.ajazzImg.return,
            }}
            clickHandle={() => store.setState.user_UI(<Login />)}
          />

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
              usePlaceholder={res.useString.邮箱}
            />
            <dj.TextInput_akko
              w={300}
              h={55}
              x={40}
              y={110}
              value={state.userName}
              onChange={(event) => {
                if (event.target.value.length <= 20) {
                  setstate({ ...state, userName: event.target.value })
                } else {
                  isKeyStore.setTextKey(true)
                  store.setState.user_warningText(
                    <_2500ms消失文字
                      key={Date.now()}
                      text={'用户名过长,在20个字符以内'}
                    />
                  )
                }
              }
              }
              usePlaceholder={res.useString.用户名}
            />
            <dj.TextInput_akko
              w={300}
              h={55}
              x={40}
              y={170}
              type={'密码_akko'}
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
              usePlaceholder={res.useString.密码长度}
            />
            <dj.TextInput_akko
              w={300}
              h={55}
              x={40}
              y={230}
              type={'密码_akko'}
              value={state.password2}
              onChange={(event) => {
                if (event.target.value.length <= 25) {
                  setstate({ ...state, password2: event.target.value })
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
              usePlaceholder={res.useString.再次输入密码}
            />
            <dj.FlexView
              w={300}
              h={55}
              x={40}
              y={290}
              style={{
                backgroundColor: '#EBE9F2',
                borderRadius: '10px',
                color: '#555658',
                fontFamily: 'OpenSans-Regular',
              }}
            >
              <dj.Text
                w={100}
                h={20}
                x={15}
                y={17}
                type={'单选框'}
                text={res.string.性别}
              />
              <dj.RadioButton_Ajazz
                w={30}
                h={14}
                x={201}
                y={20}
                type={'圆形'}
                name={'性别'}
                text={'男'}
                isChecked={state.gender === 'male'}
                clickHandle={() => setstate({ ...state, gender: 'male' })}
              />
              <dj.RadioButton_Ajazz
                w={30}
                h={14}
                x={250}
                y={20}
                type={'圆形'}
                name={'性别'}
                text={'女'}
                isChecked={state.gender === 'female'}
                clickHandle={() => setstate({ ...state, gender: 'female' })}
              />
            </dj.FlexView>

            <dj.Button
              w={300}
              h={36}
              x={35}
              y={390}
              mode={'BorderBackground_HJ_update'}
              text={res.string.注册}
              clickHandle={onSubmit}
            />
            <dj.CheckBox_Ajazz
              w={20}
              h={14}
              x={136}
              y={445}
              type={'用户须知'}
              text={''}
              checkState={state.isAgree}
              clickHandle={(event) => {
                setstate({ ...state, isAgree: event.target.checked })
              }}
            />
            <dj.Button
              mode={'同意用户协议'}
              w={90}
              h={25}
              x={156}
              y={440}
              text={res.string.同意用户协议}
              clickHandle={() => setAgreeOpen(true)}
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
      {agreeOpen && (
        <UserArgee
          setAgree={(pro: boolean) => {
            setAgreeOpen(false)
            setstate({ ...state, isAgree: pro })
          }}
        />
      )}
    </Fragment>
  )
}
