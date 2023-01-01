import { store } from '../store'
import { sdk } from '../../sdk'
import { Macro, Config } from '../../sdk/DB'
import { res } from '../../res'

interface MacroFolder {
  name: string
  id: string
  folders: MacroFolder[]
}

export const setMacroNameList = async () => {
  const macros = await sdk.ioFunc.getMacros()
  const nameList = sdk.ioFunc.macrosToFolder(macros)
  store.setState.macro_list(nameList)
}

const getLength = (names: string[], defaultName: string) => {
  return names.filter((v) => v.includes(defaultName)).length + 1
}

export const newMacroName = (macros: Macro[]) => {
  const array = macros.map((v) => (v.name ? v.name : ''))
  return (
    res.text.新的宏_() +
    getLength(
      array.filter((v) => v !== ''),
      res.text.新的宏_()
    )
  )
}
export const newMacroFolderName = (folders: MacroFolder[]) => {
  return (
    res.text.新建文件夹_() +
    getLength(
      folders.map((v) => v.name),
      res.text.新建文件夹_()
    ).toString()
  )
}

export const newConfigName = (configs: Config[]) => {
  const array = configs.map((v) => (v.name ? v.name : ''))
  const newDefaultName = (names: string[], defaultName: string) => {
    let num = 1
    let numArr = names.map(v => v.split(defaultName)).filter(p => p.length > 1).map(q => q[1])
    while (true) {
      let has = false
      for (let i = 0; i < numArr.length; i++) {
        const n = Number(numArr[i])
        if (n === num) {
          has = true
        }
      }
      if (has) {
        num++
      } else {
        break;
      }
    }

    return defaultName + num
  }
  return (
    newDefaultName(array.map(v => v) as string[], res.text.新的配置_())
  )
}
