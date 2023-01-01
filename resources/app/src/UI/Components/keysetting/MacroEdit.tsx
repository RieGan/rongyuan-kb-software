import React, { useState, useEffect } from 'react'
import { dj } from '../../../dj'
import { Macro } from '../../../sdk/DB/entity/macro'

import { mobxStore, useStore } from '../../../mobxStore/store'
import { useObserver } from 'mobx-react-lite'
import { res } from '../../../res'
import { DBService } from '../../../sdk/WebService'

export const MacroEdit = (p: {
  setMacro: (macro: Macro | undefined) => void
  forBidden: boolean
}) => {
  const [state, setState] = useState({})

  const { macroStore } = useStore()

  const getMacroList = (folderStruct: typeof macroStore.macroList) => {
    let macroList: typeof macroStore.macroList.macros = []

    if (folderStruct.macros.length > 0) {
      macroList = macroList.concat(folderStruct.macros)
    }

    if (folderStruct.folders.length > 0)
      folderStruct.folders.map((folder) => {
        macroList = macroList.concat(getMacroList(folder))
      })

    return macroList
  }

  const [checkState, setCheckState] = useState<{
    [key: string]: boolean
  }>({})

  const allCheckFalse: { [key: string]: boolean } = {}

  useEffect(() => {
    getMacroList(macroStore.macroList).map(
      (macro) => (allCheckFalse[macro.localId ? macro.localId : 0] = false)
    )
    setCheckState(allCheckFalse)
  }, [])
  // console.error('checkState',checkState);

  const { isKeyStore } = useStore()
  // if (p.forBidden) {
  //   setCheckState({ ...allCheckFalse, [macroStore.macroList.id]: false })
  // }
  return useObserver(() => (
    <dj.TreeView
      form={'可调整'}
      options={macroStore.macroList}
      selectedOptions={state}
      onChange={setState}
      clickId={-1}
      checkBoxState={{
        checkState: p.forBidden ? { [1]: false } : checkState,
        changeChecked: (id: number, macro: Macro) => {
          if (isKeyStore.isKnobKey) {
            if (macro.value?.macroType === "touch_repeat") {
              mobxStore.toastStore.setErr(res.text.旋钮禁止设置按下播放方式的宏())
              return
            }
          }



          if (!checkState[id]) p.setMacro(macro)
          else p.setMacro(undefined)
          setCheckState({ ...allCheckFalse, [id]: !checkState[id] })
        },
      }}
    />
  ))
}
