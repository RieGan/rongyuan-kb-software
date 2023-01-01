import React, { Fragment, useState } from 'react'

import { dj } from '../../../dj'
import { res } from '../../../res'

import { store } from '../../store'
import { Login } from './Login'
import { _2500ms消失文字 } from '../../utils/_2500ms消失文字'
import { webServerCompose } from './User'

export const ForgetPassword = () => {
  const [email, setEmail] = useState('')

  const sendEmail = async () => {
    if (res.regexp.email.test(email) === false) {
      store.setState.user_warningText(
        <_2500ms消失文字 key={Date.now()} text={'请输入正确的邮箱'} />
      )
    } else webServerCompose('forgetPassword')({ email })
  }

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

          <dj.Text h={35} x={160} y={20} text={'忘记密码'} type={'SubTitle_akko'} />
          <dj.Text
            h={18}
            y={141}
            text={'为了您的账户安全我们将发送一条验证码至您的邮箱'}
            type={'启动页搜索'}
          />

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
            clickHandle={() => store.setState.user_UI(<Login />)}
          />
          <dj.TextInput_akko
            w={300}
            h={34}
            x={35}
            y={83}
            type={'Center_akko'}
            usePlaceholder={res.useString.输入您的邮箱}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <dj.Button
            w={300}
            h={36}
            x={35}
            y={210}
            mode={'BorderBackground_HJ_update'}
            text={'发送'}
            clickHandle={sendEmail}
          />
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
