import React, { useState, Fragment, useEffect } from 'react'

import { dj } from '../../../../dj'
import { Macro } from '../../../../sdk/DB'
import { Share } from '../../../utils/Share'
import { useStore } from '../../../../mobxStore/store'
import { useObserver } from 'mobx-react-lite'
import { autorun } from 'mobx'
import { DBService } from '../../../../sdk/WebService'
import { res } from '../../../../res'
import { blockCloud } from '../../../../appConfig'
import { Share_akko } from '../../../utils/Share_akko'

export const TreeView = () => {
  const [state, setState] = useState({})

  const [shareMacro, setShareMacro] = useState<Macro | undefined>(undefined)

  const { macroStore, pageStore, shareStore, toastStore } = useStore()

  const onRenameMacro = async (macro: Macro,) => {
    if (rename.name === '') {
      setRename({ id: '', name: '' })
      return
    }

    if (macro.name !== rename.name) {
      macroStore.renameMacro(macro, rename.name)
    }

    setRename({ id: '', name: '' })
  }

  const onRenameFolder = async (folderStruct: DBService.MacroFolder) => {
    if (rename.name === '') {
      setRename({ id: '', name: '' })
      return
    }
    if (folderStruct.name !== rename.name) {
      macroStore.renameFolder(folderStruct, rename.name)
    }

    setRename({ id: '', name: '' })
  }

  const updateOutsideData = (macro: Macro) => {
    // macroStore.setCurrentMacroArr([])

    if (macro.localId === macroStore.currentSelectMacro?.localId) {
      macroStore.recodingState === 'recording' && macroStore.stoptHook()
      return
    }

    macroStore.setCurrentRecMacroArr(
      macro.value ? macro.value.macro.slice() : []
    )
    macroStore.setMacroType(macro.value ? macro.value.macroType : 'on_off')
    macroStore.setRepeatTimes(macro.value ? macro.value.repeatCount : 1)

    macroStore.setCurrentSelectMacro(macro)

    macroStore.recodingState === 'recording' && macroStore.stoptHook()
  }

  const onShareMacro = (macro: Macro) => {
    setShareMacro(macro)
  }

  //设置 rename 的状态
  const [rename, setRename] = useState({ id: '', name: '' })

  useEffect(
    () =>
      autorun(() => {
        macroStore.refreshMacroList()
      }),
    []
  )

  const onDelteMacro = (macro: Macro) => {
    if (macroStore.currentSelectMacro?.localId === macro.localId)
      macroStore.setCurrentRecMacroArr([])
    macroStore.deleteMacro(macro)
  }

  const onNewMacro = () => {
    macroStore.setMacroType('touch_repeat')
    macroStore.setCurrentRecMacroArr([])
    macroStore.setRepeatTimes(1)
    macroStore.newMacro(macroStore.macroList)
  }
  return useObserver(() => (
    <Fragment>
      {/* <dj.View form='maricTitle1' h={38}>
        <dj.Text text={res.string.宏文件} type={'配置页标题'} y={6} />
      </dj.View> */}
      <dj.ContextMenuView
        h={447}
        id={'-1'}
        onNewMacro={() => onNewMacro()}
        onNewFolder={() => {
          macroStore.newFolder(macroStore.macroList)
        }}>
        <dj.FlexView
          flexDirection={'column'}
          justifyContent={'space-between'}>
          <dj.View relative h={40} form={'maricTitleLeft_akko'}>
            {!blockCloud && <dj.Button
              w={70}
              h={18}
              y={12}
              text={res.string.热门}
              mode={'Bluer'}
              clickHandle={() => {
                pageStore.setPageIndex(shareStore.macrosPage)
                shareStore.setCurrentShareListType('macro')
                shareStore.setShareListPage('macro', 'count')
                shareStore.macrosPageindex = 0
                // shareStore.getMacroShareList('count', 0);
              }}
            />}
            <dj.FlexView
              w={85}
              h={14}
              x={210}
              y={12}
              justifyContent={'space-between'}>
              <dj.Button
                relative
                w={14}
                h={14}
                img={{ src: res.img.ajazzImg.add }}
                clickHandle={() => onNewMacro()}
              />
              <dj.Button
                relative
                w={14}
                h={14}
                img={{ src: res.img.ajazzImg.add_folder }}
                clickHandle={() => {
                  macroStore.newFolder(macroStore.macroList)
                }}
              />
              <dj.Button
                relative
                w={14}
                h={14}
                img={{ src: res.img.ajazzImg.fileClose }}
                clickHandle={() => {
                  setState({})
                }}
              />
            </dj.FlexView>
          </dj.View>
          <dj.TreeView_Ajazz
            relative
            small={false}
            h={407}
            form={'border_hj2_akko'}
            options={macroStore.macroList}
            selectedOptions={state}
            onChange={setState}
            clickId={
              macroStore.currentSelectMacro?.localId
                ? macroStore.currentSelectMacro.localId
                : 0
            }
            contextMenu={{
              onRenameMacro: onRenameMacro,
              onRenameFolder: onRenameFolder,
              onNewMacro: macroStore.newMacro,
              onNewFolder: macroStore.newFolder,
              onDelete: onDelteMacro,
              onDeleteUnderFolder: macroStore.deleteFolder,
              updateOutsideData: updateOutsideData,
              onShareMacro: onShareMacro,
              onSetRenameState: (id: string, name: string) =>
                setRename({ id: id, name: name }),
              renameState: rename,
            }}
          />
        </dj.FlexView>
      </dj.ContextMenuView>
      {shareMacro !== undefined && (
        <Fragment>
          <dj.View w={1220} h={730} x={-68} y={-185}>
            {' '}
          </dj.View>
          <dj.View w={1220} h={730} x={-68} y={-185} >
            <Share_akko
              type={'Macro'}
              macro={shareMacro}
              close={() => setShareMacro(undefined)}
            />
          </dj.View>
        </Fragment>
      )}
    </Fragment>
  ))
}
