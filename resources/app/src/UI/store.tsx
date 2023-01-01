import { createStore } from '../unitys/createStore'
import React from 'react'
import { Login } from './Components/user/Login'

import { Macro } from '../sdk/DB/entity/macro'

interface MacroFolder {
  name: string
  macros: Macro[]
  id: string
  folders: MacroFolder[]
}

export const store = createStore({
  // modalUI: null as React.ReactNode,
  // 应该是3个boolean 改成一个 modalUI
  configurationOpen: false,
  shareOpen: false,
  userOpen: false,
  devUpgradeOpen: false,
  appUpgrdeOpen: false,

  //user
  user_UI: (<Login />) as React.ReactNode,
  user_warningText: '' as React.ReactNode,
  user_Name: '' as React.ReactNode,

  //macro
  macro_list: {} as MacroFolder,
})

// 用
// 需要的都写上
// const state = store.useState(v => v.isRec.page)
// <div>{state.page}</div>

// 改
// store.setState.page(2)
