import React from 'react'
import styled from '@emotion/styled'

import { ContextMenuView } from './ContextMenuView'
import { Text } from './Text'
import { CheckBox } from './CheckBox'
import { TextInput } from './TextInput'
import { Button } from './Button'
import { Macro } from '../sdk/DB'
import { res } from '../res'
import { Img } from './Img'
import { blockCloud } from '../appConfig'
import { mobxStore, useStore } from '../mobxStore/store'
import { dj } from '.'

const Ul = styled.ul({
  listStyleType: 'none',
})
const Li = styled.li((p: { isHighLight: boolean }) => ({
  '&:hover': {
    background: 'linear-gradient(90deg,#251f1f 0%, #121212 100%)',
  },
  padding: '5px 0',
  paddingLeft: '1rem',
  position: 'relative',
  background: p.isHighLight
    ? 'linear-gradient(90deg,#251f1f 20%, #121212 100%)'
    : 'transparent',
}))

const FolderContainer = styled.div({
  position: 'relative',
})

const Span = styled.span`
  userselect: none;
  color: #ffffff;
  fontsize: 13;

  &.caret::before {
    content: '';
    color: #5a5a5a;
    display: inline-block;
    margin: 0 15px 0 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 0 5px 10px;
    border-color: transparent transparent transparent #5a5a5a;
  }

  &.caret-down::before {
    content: '';
    display: inline-block;
    margin: 0 15px 0 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 5px 0 5px;
    border-color: #23f9e2 transparent transparent transparent;
  }
`

const Folder = (props: {
  folder: MacroFolder
  onChange: () => void
  isSelected: { [key: string]: {} }
}) => {
  const { folder, onChange, isSelected } = props

  return (
    <FolderContainer
      onClick={() => {
        onChange()
      }}>
      <div
        style={{
          width: 16,
          height: 16,
          position: 'absolute',
          left: 24,
          top: 4,
        }}>
        <Img imgBg={res.img.edit_folder} />
      </div>
      <Span className={isSelected !== undefined ? 'caret-down' : 'caret'}>
        <div style={{ position: 'absolute', left: 50, top: 3 }}>
          <dj.TextEll relative w={230} text={folder.name} type={'树形文字'} />
        </div>
      </Span>
    </FolderContainer>
  )
}

interface MacroFolder {
  name: string
  id: string
  macros: Macro[]
  folders: MacroFolder[]
}

const Tree = (p: {
  options: MacroFolder
  selectedOptions: { [key: string]: {} }
  onChange: (subSelections: { [key: string]: {} }) => void //文件夹打开关闭
  clickId: number
  contextMenu?: {
    updateOutsideData: (macro: Macro) => void
    onRenameMacro: (macro: Macro) => void
    onRenameFolder: (folder: MacroFolder) => void
    onNewMacro: (folder: MacroFolder) => void
    onNewFolder: (folder: MacroFolder) => void
    onDelete: (macro: Macro) => void
    onDeleteUnderFolder: (options: MacroFolder) => void
    onShareMacro: (macro: Macro) => void
    onSetRenameState: (id: string, name: string) => void
    renameState: { id: string; name: string }
  }
  checkBoxState?: {
    checkState: { [key: string]: boolean }
    changeChecked: (id: number, macro: Macro) => void
  }
}) => {
  const handleChange = (optionId: string): void => {
    let newSelectedOptions = { ...p.selectedOptions }

    //如果 id 存在,即早已被选中
    if (p.selectedOptions[optionId] !== undefined) {
      delete newSelectedOptions[optionId]
    }
    //之前没有被选中则创建
    else newSelectedOptions[optionId] = {}
    p.onChange(newSelectedOptions)
  }

  const folder = (
    <Folder
      folder={p.options}
      onChange={() => {
        if (mobxStore.macroStore.recodingState === "recording") {
          mobxStore.toastStore.setErr(res.text.请先停止录制())
          return
        }
        handleChange(p.options.id.toString())
      }}
      isSelected={p.selectedOptions[p.options.id]}
    />
  )

  const folderWithContextMenu =
    p.contextMenu && p.contextMenu.renameState.id === p.options.id ? (
      <TextInput
        type={'重命名'}
        value={p.contextMenu && p.contextMenu.renameState.name}
        onChange={(event) =>
          p.contextMenu &&
          p.contextMenu.onSetRenameState(p.options.id, event.target.value)
        }
        autoFocus={p.contextMenu ? true : false}
        usePlaceholder={res.useString.请输入名称}
        inputFinished={() =>
          p.contextMenu && p.contextMenu.onRenameFolder(p.options)
        }
      />
    ) : (
      <ContextMenuView
        id={p.options.id}
        onRename={() =>
          p.contextMenu &&
          p.contextMenu.onSetRenameState(p.options.id, p.options.name)
        }
        onNewMacro={() => p.contextMenu && p.contextMenu.onNewMacro(p.options)}
        onNewFolder={() =>
          p.contextMenu && p.contextMenu.onNewFolder(p.options)
        }
        onDelete={() =>
          p.contextMenu && p.contextMenu.onDeleteUnderFolder(p.options)
        }>
        {folder}
      </ContextMenuView>
    )

  const itemWithContextMenu = (options: MacroFolder, index: number) => {
    const value = options.macros[index]
    return p.contextMenu &&
      p.contextMenu.renameState.id ===
      (value.localId ? value.localId.toString() : '0') ? (
      <TextInput
        type={'重命名'}
        autoFocus={p.contextMenu ? true : false}
        value={p.contextMenu && p.contextMenu.renameState.name}
        onChange={(event) =>
          p.contextMenu &&
          p.contextMenu.onSetRenameState(
            value.localId ? value.localId.toString() : '-1',
            event.target.value
          )
        }
        usePlaceholder={res.useString.请输入名称}
        inputFinished={() =>
          p.contextMenu && p.contextMenu.onRenameMacro(value)
        }
      />
    ) : (
      <ContextMenuView
        id={value.localId ? value.localId.toString() : '-1'}
        onRename={() =>
          p.contextMenu &&
          p.contextMenu.onSetRenameState(
            value.localId ? value.localId.toString() : '-1',
            value.name ? value.name : ''
          )
        }
        onNewMacro={() => p.contextMenu && p.contextMenu.onNewMacro(options)}
        onNewFolder={() =>
          p.contextMenu && p.contextMenu.onNewFolder(p.options)
        }
        onDelete={() => p.contextMenu && p.contextMenu.onDelete(value)}>
        <dj.TextEll relative w={200} text={value.name} type={'树形文字'} />
        {!blockCloud && shareButton(value)}
        {deleteButton(value)}
      </ContextMenuView>
    )
  }

  const checkBox = (value: Macro) => (
    <div style={{ width: '100%', height: 16 }}>
      <CheckBox
        type={'Normal'}
        text={value.name}
        checkState={
          p.checkBoxState
            ? p.checkBoxState.checkState[value.localId ? value.localId : 0]
              ? p.checkBoxState.checkState[value.localId ? value.localId : 0]
              : false
            : false
        }
        clickHandle={() =>
          p.checkBoxState &&
          p.checkBoxState.changeChecked(
            value.localId ? value.localId : -1,
            value
          )
        }
      />
    </div>
  )
  const { shareStore } = useStore()
  const shareButton = (macro: Macro) => (
    <div style={{ position: 'absolute', right: 50, top: 5 }}>
      <Button
        img={{ size: { w: 14, h: 14 }, src: res.img.bottom_share }}
        clickHandle={() => {p.contextMenu && p.contextMenu.onShareMacro(macro); shareStore.setinputDescribre('')}}
      />
    </div>
  )

  const deleteButton = (macro: Macro) => (
    <div style={{ position: 'absolute', right: 11, top: 5 }}>
      <Button
        img={{ size: { w: 14, h: 14 }, src: res.img.bottom_delete }}
        clickHandle={() => p.contextMenu && p.contextMenu.onDelete(macro)}
      />
    </div>
  )

  return (
    <Ul>
      {p.options.name !== 'root' && (
        <Li isHighLight={false}>
          {p.contextMenu ? folderWithContextMenu : folder}
        </Li>
      )}

      {(p.selectedOptions[p.options.id] !== undefined ||
        p.options.name === 'root') &&
        p.options.macros.map((value, index) => (
          <Li
            key={value.localId}
            onClick={(event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              if (mobxStore.macroStore.recodingState === "recording") {
                mobxStore.toastStore.setErr(res.text.请先停止录制())
                return
              }
              p.contextMenu && p.contextMenu.updateOutsideData(value)

              event.stopPropagation()
            }}
            isHighLight={value.localId === p.clickId}>
            {p.contextMenu
              ? itemWithContextMenu(p.options, index)
              : checkBox(value)}
          </Li>
        ))}
      {(p.selectedOptions[p.options.id] !== undefined ||
        p.options.name === 'root') &&
        p.options.folders.map((folder) => (
          <li key={folder.id}>
            <Tree
              options={folder}
              selectedOptions={p.selectedOptions}
              onChange={p.onChange}
              clickId={p.clickId}
              contextMenu={p.contextMenu}
              checkBoxState={p.checkBoxState}
            />
          </li>
        ))}
    </Ul>
  )
}

const Container = styled.div({
  width: '100%',
  height: '100%',
  overflow: 'hidden scroll',
  '&::-webkit-scrollbar': {
    width: '6px',
  },

  '&::-webkit-scrollbar-thumb': {
    background: 'gray',
    borderRadius: '5px',
  },
})

export const TreeView = (p: {
  options: MacroFolder
  selectedOptions: { [key: string]: {} }
  onChange: (subSelections: { [key: string]: {} }) => void //文件夹打开关闭
  clickId: number
  contextMenu?: {
    updateOutsideData: (macro: Macro) => void
    onRenameMacro: (macro: Macro) => void
    onRenameFolder: (options: MacroFolder) => void
    onNewMacro: (folder: MacroFolder) => void
    onNewFolder: (folder: MacroFolder) => void
    onDelete: (macro: Macro) => void
    onDeleteUnderFolder: (folder: MacroFolder) => void
    onShareMacro: (macro: Macro) => void
    onSetRenameState: (id: string, name: string) => void
    renameState: { id: string; name: string }
  }
  checkBoxState?: {
    checkState: { [key: string]: boolean }
    changeChecked: (id: number, macro: Macro) => void
  }
}) => {
  return (
    <Container>
      <Tree
        options={p.options}
        selectedOptions={p.selectedOptions}
        onChange={p.onChange}
        clickId={p.clickId}
        contextMenu={p.contextMenu}
        checkBoxState={p.checkBoxState}
      />
    </Container>
  )
}
