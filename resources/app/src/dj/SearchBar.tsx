import React from 'react'
import { TextInput } from './TextInput'
import { Img } from './Img'

import { res } from '../res'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const SearchBar = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#201f1f',
        borderRadius: '2px',
        color: '#5a5a5a',
        outline: 'none',
        border: 'none',
      }}>
      <div
        style={{
          position: 'relative',
          left: 29,
          width: '70%',
          height: '100%',
        }}>
        <TextInput usePlaceholder={res.useString.请输入您要搜索的内容} />
      </div>
      <div
        style={{
          width: 12,
          height: 12,
          position: 'absolute',
          left: 380,
          top: 8,
        }}>
        <Img imgBg={res.img.search} />
      </div>
    </div>
  )
}
