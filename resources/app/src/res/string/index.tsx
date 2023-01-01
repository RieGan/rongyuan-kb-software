import * as React from 'react'
import { Subject } from 'rxjs'
import { LanguageCode } from './languageJSON'
import { mapObjIndexed } from 'ramda'
import { languageJSON } from './languageJSON'
import { blockCloud } from '../../appConfig'
import { langueLocaleKArr } from './languageC'

//订阅 发布
let subject = new Subject()

//当前语言代码
// let langueCode: LanguageCode = blockCloud ? '英语' : '中文简体'

const languageStr = blockCloud.toString()
let langueCode = langueLocaleKArr.findIndex(v => v === languageStr) !== -1
  ? languageStr
  : blockCloud ? langueLocaleKArr[1] : langueLocaleKArr[0]

const refreshLangue = (code: LanguageCode) => {
  langueCode = code
  subject.next()
}

export const text = mapObjIndexed(
  data => () => data[langueCode],
  languageJSON
)


export const useString = mapObjIndexed(
  (data) => () => {
    const [text, setText] = React.useState(data[langueCode])
    React.useEffect(() => {
      const f = subject.subscribe(() => setText(data[langueCode]))
      return () => f.unsubscribe()
    })
    return text
  },
  languageJSON
)

export const string = mapObjIndexed((f) => {
  const C = () => {
    const text = f()
    return <>{text}</>
  }
  return <C />
}, useString)

//TODO 这里监控系统语言改变.....
//模拟动态切换语言
// setInterval(() => {
//     refreshLangue(langueCode === '中文简体' ? '英语' : '中文简体')
// }, 1000)
