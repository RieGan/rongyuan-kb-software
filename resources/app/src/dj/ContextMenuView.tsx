import React from 'react'
import styled from '@emotion/styled'

import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import { res } from '../res'
import { List } from './List'
import { Img } from './Img'

const ContextMenuStyle = styled.div`
  .react-contextmenu {
    position: relative
    background-color: #282828;
    background-clip: padding-box;
    border-radius: 0.25rem;
    color: #373a3c;
    font-size: 16px;
    margin: 2px 0 0;
    min-width: 160px;
    outline: none;
    opacity: 0;
    padding: 5px 0;
    pointer-events: none;
    text-align: left;
    transition: opacity 250ms ease !important;
    outline: none;
  }

  .react-contextmenu.react-contextmenu--visible {
    opacity: 1;
    pointer-events: auto;
    z-index: 9999;
    outline: none;
  }

  .react-contextmenu-item {
    height: 28;
    background: 0 0;
    border: 0;
    color: #ffffff;
    cursor: pointer;
    font-weight: 400;
    line-height: 1.5;
    padding: 3px 20px;
    text-align: inherit;
    white-space: nowrap;
    background-color: #282828;
    outline: none;
  }

  .react-contextmenu-item.react-contextmenu-item--active,
  .react-contextmenu-item.react-contextmenu-item--selected {
    color: #fff;
    background-color: #3a3a3a;
    text-decoration: none;
    outline: none;
  }

  .react-contextmenu-item.react-contextmenu-item--disabled,
  .react-contextmenu-item.react-contextmenu-item--disabled:hover {
    background-color: transparent;
    color: #878a8c;
    outline: none;
  }

  .react-contextmenu-item--divider {
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    cursor: inherit;
    margin-bottom: 3px;
    padding: 2px 0;
  }
  .react-contextmenu-item--divider:hover {
    background-color: transparent;
    border-color: rgba(0, 0, 0, 0.15);
  }

  .react-contextmenu-item.react-contextmenu-submenu {
    padding: 0;
    outline: none;
  }

  .react-contextmenu-item.react-contextmenu-submenu > .react-contextmenu-item {
    outline: none;
  }

  .react-contextmenu-item.react-contextmenu-submenu
    > .react-contextmenu-item:after {
    content: '▶';
    display: inline-block;
    position: absolute;
    right: 7px;
  }

  .example-multiple-targets::after {
    content: attr(data-count);
    display: block;
  }
`
// const arr = new Array()
// for (let i = 0; i < 100; i++) {
//   arr.push("dd")
// }
export const ContextMenuView = (p: {
  id: string
  onRename?: () => void
  onNewMacro: () => void
  onNewFolder: () => void
  onDelete?: () => void
  onMoveFolder?: () => void
  children: any
}) => (
  <ContextMenuStyle>
    <ContextMenuTrigger id={p.id}>{p.children}</ContextMenuTrigger>
    <ContextMenu id={p.id}>
      {p.onRename && <MenuItem onClick={p.onRename}>{res.string.重命名}</MenuItem>}
      <MenuItem onClick={p.onNewMacro}>{res.string.新建宏}</MenuItem>
      <MenuItem onClick={p.onNewFolder}>{res.string.新建文件夹}</MenuItem>
      {/* {p.onRename && <MenuItem onClick={p.onMoveFolder}>{"移到文件夹"}</MenuItem>} */}
      {p.onRename && <MenuItem onClick={p.onDelete}>{res.string.删除}</MenuItem>}
      {/* {p.onRename && <div style={{
        width: 200,
        height: 200,
        position: "absolute",
        right: -202,
        top: 100,
        backgroundColor: '#282828',
        borderRadius: '0.25rem',
      }}>
        <List
          w={200}
          h={200}
          itemCount={6}
          scrollToIndex={0}
          itemSize={() => 100}
          renderItem={(i) => {
            return (
              <div>
                <dj.FlexView
                  w={200}
                  h={30}
                  justifyContent={'flex_start'}
                  alignItems={'center'}>
                  <div
                    style={{
                      width: 16,
                      height: 16,
                    }}>
                    <Img imgBg={res.img.edit_folder} />
                  </div>
                  <span>{arr[i]}</span>
                </dj.FlexView>

              </div>
            )
          }}
        />
      </div>} */}
    </ContextMenu>

  </ContextMenuStyle>
)
