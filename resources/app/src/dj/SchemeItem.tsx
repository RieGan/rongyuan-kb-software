import React from 'react'
import { TextEll } from './Text'
import { Button } from './Button'
import { res } from '../res'
import styled from '@emotion/styled'
import { dj } from '.'


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const SchemeItem = (p: {
  mode: 'head' | 'body'
  isHightLight?: boolean
  name: React.ReactNode
  describe: React.ReactNode
  deviceName: React.ReactNode
  username: React.ReactNode
  time: React.ReactNode
  downloadTimes: React.ReactNode
  detail: React.ReactNode
  download: () => void
  clickHandle?: () => void
}) => {
  const els: { name: React.ReactNode; offsetX: number; optional: boolean }[] = [
    {
      name: p.name,
      offsetX: 40,
      optional: false,
    },
    {
      name: p.describe,
      offsetX: 230,
      optional: false,
    },
    {
      name: p.deviceName,
      offsetX: 508,
      optional: false,
    },
    {
      name: p.username,
      offsetX: 668,
      optional: false,
    },
    {
      name: p.time,
      offsetX: 778,
      optional: false,
    },
    {
      name: p.downloadTimes,
      offsetX: 881,
      optional: false,
    },
    // {
    //   name: p.detail,
    //   offsetX: 754,
    //   optional: true,
    // },
    {
      name: res.string.下载,
      offsetX: 1015,
      optional: true,
    },
  ]

  const textWidth = ['130px', '260px', '120px', '120px', '115px', '100px', '']
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: p.isHightLight ? '#b43dd9' : 'transparent',
        color: p.isHightLight ? '#fff' : '#555658',
      }}
      onClick={() => { p.clickHandle && p.clickHandle() }}
    >
      {els.map((item, index) => (
        <div
          key={item.offsetX}
          style={{
            left: item.offsetX,
            position: 'absolute',
            top: p.mode === 'head' ? 10 : 12,
            height: 17,
            width: textWidth[index]
          }}>
          {!item.optional || p.mode === 'head' ? (
            <TextEll
              text={item.name}
              type={p.mode === 'head' ? '方案共享页表头' : '方案共享页表内容'}
            />
          ) : (
            <div
              style={{ width: 24, height: 24, position: 'absolute', top: -3, left: 6 }}>
              <Button
                mode={'Scheme_akko'}
                // text={res.string.下载}
                img={{ src: res.img.ajazzImg.download }}
                clickHandle={p.download}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const Ellp = styled.p({
  wordBreak: 'break-all',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}, (p: { maxW: number }) => ({
  maxWidth: p.maxW
}))

const LikeBtn = styled.div({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
})

export const PicSchemeItem = (p: {
  mode: 'head' | 'body'
  data?: string
  type: boolean | string,
  name: React.ReactNode
  describe: React.ReactNode
  size: React.ReactNode
  username: React.ReactNode
  time: React.ReactNode
  downloadTimes: React.ReactNode
  my_score: -1 | 0 | 1 | null
  like: number,
  dislike: number
  arts: boolean
  clickHandle: () => void
  download: () => void
  report: () => void
  clickLike: () => void
  clickDislike: () => void
  delete: () => void
}) => {
  const els: { name: React.ReactNode; w: number; style?: 'img' | 'btn' | 'like' | 'delete' }[] = p.arts
    ? [
      { name: '', w: 100, style: 'img' },
      { name: p.name, w: 160 },
      { name: p.size, w: 80 },
      { name: p.username, w: 100 },
      { name: p.time, w: 80 },
      { name: p.downloadTimes, w: 60 },
      { name: res.string.下载, w: 60, style: 'btn' },
      { name: res.string.删除, w: 60, style: 'delete' },
    ]
    : [
      { name: '', w: 100, style: 'img' },
      { name: p.name, w: 160 },
      { name: p.size, w: 80 },
      { name: p.username, w: 100 },
      { name: p.time, w: 80 },
      { name: p.downloadTimes, w: 60 },
      { name: res.string.下载, w: 60, style: 'btn' },
      { name: res.string.赞, w: 80, style: 'like' },
      { name: res.string.踩, w: 80, style: 'like' },
      { name: res.string.举报, w: 60, style: 'btn' },
    ]

  return <div style={{
    display: 'flex',
    width: '100 %',
    height: p.mode === 'head' ? 36 : Math.floor(370 / 6),
    padding: '0px 16px',
    color: p.mode === 'head' ? '#7a7a7a' : '#959595',
    background: p.mode === 'head' ? '#201f1f' : 'transparent',
    fontSize: 12
  }}>
    {els.map((v, i) => {
      return <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: v.w, height: '100%' }}>
        {p.mode === 'head' && <Ellp maxW={v.w}>{i === 0 ? res.string.图片 : v.name}</Ellp>}
        {p.mode === 'body' && v.style === 'img' && <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: v.w - 10,
            height: Math.floor(370 / 6),
            backgroundColor: '#000000',
            cursor: 'pointer',
          }}
          onClick={p.clickHandle}>
          {p.data !== undefined && <img
            style={{ display: 'block', maxWidth: v.w - 10, maxHeight: Math.floor(370 / 6), cursor: 'pointer' }}
            src={p.data}
          />}
        </div>}
        {p.mode === 'body' && v.style === undefined && <Ellp maxW={v.w - 10}>{v.name}</Ellp>}
        {p.mode === 'body' && v.style === 'btn' && v.name === res.string.下载 && <dj.Button
          relative
          w={25}
          h={25}
          img={{
            size: {
              w: 25,
              h: 25,
            },
            src: res.img.cloud_download,
          }}
          clickHandle={p.download} />}
        {p.mode === 'body' && v.style === 'btn' && v.name === res.string.举报 && <dj.Button
          relative
          w={25}
          h={25}
          img={{
            size: {
              w: 25,
              h: 25,
            },
            src: res.img.report,
          }}
          clickHandle={p.report} />}
        {p.mode === 'body' && v.style === 'like' && v.name === res.string.赞 &&
          <LikeBtn>
            <dj.Button
              relative
              w={25}
              h={25}
              img={{
                size: {
                  w: 25,
                  h: 25,
                },
                src: res.img.like,
              }}
              isHightLight={p.my_score === 1}
              clickHandle={p.clickLike}
            />
            <Ellp maxW={60}>{p.like}</Ellp>
          </LikeBtn>}
        {p.mode === 'body' && v.style === 'like' && v.name === res.string.踩 &&
          <LikeBtn>
            <dj.Button
              relative
              w={25}
              h={25}
              img={{
                size: {
                  w: 25,
                  h: 25,
                },
                src: res.img.dislike,
              }}
              isHightLight={p.my_score === -1}
              clickHandle={p.clickDislike}
            />
            <Ellp maxW={60}>{p.dislike}</Ellp>
          </LikeBtn>}
        {p.mode === 'body' && v.style === 'delete' &&
          <dj.Button
            relative
            w={20}
            h={20}
            img={{
              size: {
                w: 20,
                h: 20,
              },
              src: res.img.bottom_delete,
            }}
            isHightLight={false}
            clickHandle={p.delete}
          />}
      </div>
    })}
  </div>
}