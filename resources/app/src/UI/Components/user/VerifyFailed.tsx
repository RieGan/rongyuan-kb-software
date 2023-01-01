import React, { Fragment } from 'react'

import { dj } from '../../../dj'
import { res } from '../../../res'
import { store } from '../../store'
import { Login } from './Login'
import { Verify } from './Verify'

export const VerifyFailed = (p: { email: string }) => (
  <Fragment>
    <dj.View w={370} h={330} x={416} y={170} form={'弹出框'}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#EBE9F2'
        }}
      >
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
            src: res.img.return,
          }}
          clickHandle={() => store.setState.user_UI(<Verify email={''} seconds={0} />)}
        />
        <dj.TextArea
          w={268}
          h={160}
          x={40}
          y={60}
          editble={false}
          placeholder={
            '1.  邮箱地址不正确 \n\n2. 验证邮箱因为延迟等原因还没有发出 \n\n3. 邮箱验证被接收的邮箱服务器判断为垃圾邮件，自动转入垃圾邮箱中\n以上方法还为解决您的问题，请在验证界面点击重新发送或重新注册'
          }
        />
        {/* <dj.TextArea
          w={293}
          h={36}
          x={40}
          y={190}
          editble={false}
          placeholder={
            '以上方法还为解决您的问题，请在验证界面点击重新发送或重新注册'
          }
        /> */}
        <dj.Button
          w={300}
          h={36}
          x={35}
          y={254}
          mode={'BorderBackground_HJ_update'}
          text={'上一步'}
          clickHandle={() => store.setState.user_UI(<Verify email={''} seconds={0} />)}
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
            src: res.img.close,
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
