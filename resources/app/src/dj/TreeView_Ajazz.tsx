import React, { Fragment } from 'react'
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
import { mobxStore } from '../mobxStore/store'
import { dj } from '.'
import { CheckBox_Ajazz } from './CheckBox_Ajazz'

const Ul = styled.ul({
  listStyleType: 'none',
})
const Li = styled.li((p: { isHighLight: boolean }) => ({

  height: 35,
  lineHeight: '35px',
  // textAlign: 'center',
  paddingLeft: '1.3rem',
  // marginTop: '-1px',
  position: 'relative',
  background: p.isHighLight
    ? 'linear-gradient(to right,#7a6caa,transparent)'
    : 'transparent',
  color: p.isHighLight ? '#fff' : '#555658'
}))

const FolderContainer = styled.div({
  position: 'relative',
})

const Span = styled.span`
  &.caret::before {
    content: '';
    color: #b4b4b4;
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 0 5px 10px;
    border-color: transparent transparent transparent #5a5a5a;
  }

  &.caret-down::before {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 5px 0 5px;
    border-color: #7a6caa transparent transparent transparent;
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
          top: 11,
        }}>
        <Img imgBg={res.img.ajazzImg.edit_folder} />
      </div>
      <Span className={isSelected !== undefined ? 'caret-down' : 'caret'} style={{ marginLeft: -2 }}>
        <div style={{ position: 'absolute', left: 50, top: 3 }}>
          <dj.TextEll relative w={240} text={folder.name} type={'树形文字_无颜色'} />
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
    return <div>
      {p.contextMenu && p.contextMenu.renameState.id === (value.localId ? value.localId.toString() : '0') ?
        (
          <dj.TextInput
            w={180}
            h={24}
            x={20}
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
          <dj.TextEll relative text={value.name} w={200}
            h={24} type={'树形文字_无颜色'} />)}
      <ContextMenuView
        id={value.localId ? value.localId.toString() : '-1'}
        onNewMacro={() => p.contextMenu && p.contextMenu.onNewMacro(options)}
        onNewFolder={() =>
          p.contextMenu && p.contextMenu.onNewFolder(p.options)
        }
        onDelete={() => p.contextMenu && p.contextMenu.onDelete(value)}>
        <div style={{ position: 'absolute', right: blockCloud ? 58 : 90, top: 11 }}>
          <dj.Button
            relative
            w={14}
            h={14}
            img={{
              size: {
                w: 14,
                h: 14,
              },
              src: res.img.ajazzImg.modify,
            }}
            clickHandle={() => {
              p.contextMenu &&
                p.contextMenu.onSetRenameState(
                  value.localId ? value.localId.toString() : '-1',
                  value.name ? value.name : ''
                )
            }}
          />
        </div>
        {!blockCloud && shareButton(value)}
        {deleteButton(value)}
      </ContextMenuView>
    </div>

  }
  const checkBox = (value: Macro) => (
    <div style={{ width: '100%', height: 16 }}>
      <CheckBox_Ajazz
        type={'Macro'}
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

  const shareButton = (macro: Macro) => (
    <div style={{ position: 'absolute', right: 58, top: 11 }}>
      <dj.Button
        relative
        w={14}
        h={14}
        img={{ size: { w: 14, h: 14 }, src: res.img.ajazzImg.upload }}
        clickHandle={() => p.contextMenu && p.contextMenu.onShareMacro(macro)}
      />
    </div>
  )

  const deleteButton = (macro: Macro) => (
    <div style={{ position: 'absolute', right: 23, top: 11 }}>
      <dj.Button
        relative
        w={14}
        h={14}
        img={{ size: { w: 14, h: 14 }, src: res.img.ajazzImg.delete }}
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

const Container = styled.div((p: { small: boolean }) => (
  {
    width: '100%',
    height: '100%',
    overflow: p.small ? 'hidden scroll' : 'overlay',
    '&::-webkit-scrollbar': {
      width: '6px',
    },

    '&::-webkit-scrollbar-thumb': {
      background: 'gray',
      borderRadius: '5px',
    },
  }
))

export const TreeView_Ajazz = (p: {
  options: MacroFolder
  selectedOptions: { [key: string]: {} }
  onChange: (subSelections: { [key: string]: {} }) => void //文件夹打开关闭
  clickId: number
  small: boolean
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
    <Container small={p.small}>
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
