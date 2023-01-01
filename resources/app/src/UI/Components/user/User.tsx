import React, { Fragment, useEffect } from 'react'
import { dj } from '../../../dj'
import { store } from '../../store'
import { Login } from './Login'
import { Verify } from './Verify'
import { ReturnMSG } from '../../../sdk/WebService'
import { _2500ms消失文字 } from '../../utils/_2500ms消失文字'
import { sdk } from '../../../sdk'

interface WebServerList {
  [key: string]: (p: any) => Promise<ReturnMSG<any>>
}

const WebServerListData: WebServerList = {
  login: (p: { email: string; password: string }) => {
    return sdk.ioFunc.userLogin(p.email, p.password)
  },
  register: (p: {
    userName: string
    gender: 'male' | 'female'
    email: string
    password: string
  }) => {
    return sdk.ioFunc.userRegister(p.userName, p.gender, p.email, p.password)
  },
  forgetPassword: (p: { email: string }) => {
    return sdk.ioFunc.reqFindPassVerifyCode(p.email)
  },
  resetPassword: (p: {
    email: string
    verifyCode: string
    password: string
  }) => {
    return sdk.ioFunc.findPassword(p.email, p.verifyCode, p.password)
  },
}

type UserResult = {
  [P in keyof WebServerList]: {
    text: string
    f: (req: any) => void
  }
}

const UserResultData: UserResult = {
  login: {
    text: '',
    f: (req: any) => store.setState.userOpen(false),
  },
  register: {
    text: '注册成功，请进行登录',
    f: (req: any) => store.setState.user_UI(<Login />),
  },
  forgetPassword: {
    text: '验证码已发送,请注意查收',
    f: ({ email }) => store.setState.user_UI(<Verify email={email} />),
  },
  resetPassword: {
    text: '修改密码成功,请进行登录',
    f: (req: any) => store.setState.user_UI(<Login />),
  },
}

const parseUserResult = <K extends keyof WebServerList>(
  result: ReturnMSG<any>,
  funcName: K,
  req: any
) => {
  console.log('parseUserResult', result, UserResultData[funcName])
  if (result.errCode === 0) {
    UserResultData[funcName].f(req)

    store.setState.user_warningText(
      <_2500ms消失文字 key={Date.now()} text={UserResultData[funcName].text} />
    )
  } else {
    store.setState.user_warningText(
      <_2500ms消失文字 key={Date.now()} text={result.errMsg.toString()} />
    )
  }
}

export const webServerCompose = <K extends keyof WebServerList>(
  funcName: K
) => async (req: any) => {
  console.log(funcName, req)
  const result = await WebServerListData[funcName](req)
  parseUserResult(result, funcName, req)
}

export const User = () => {
  const { user_warningText, user_UI } = store.useState(
    (v) => v.user_warningText.user_UI
  )
  useEffect(() => {
    store.setState.user_warningText(
      <_2500ms消失文字
        key={Date.now()}
        text={''}
      />
    )
  }, [])
  return (
    <Fragment>
      <dj.View form={'背景页'} drag={true} zIndex={1}>
        {''}
      </dj.View>
      {user_UI}
      <dj.Text h={16} y={662} type={'提示'} text={user_warningText} />
    </Fragment>
  )
}
