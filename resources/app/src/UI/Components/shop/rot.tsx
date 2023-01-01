import React from 'react'
import { useObserver } from 'mobx-react-lite'
import { useStore } from '../../../mobxStore/store'
import { shell } from 'electron'
import { FlexView } from '../../../dj/FlexView'
import { shopWidth } from './shop'

export const Rot = (p: {
    imgArr: { img: string, url: string }[]
}) => {
    const { shopStore } = useStore();
    shopStore.setRotLen(p.imgArr.length)
    shopStore.start()
    return useObserver(() => (
        <div
            style={{
                position: 'relative',
                width: shopWidth,
                height: 'auto',
                overflow: 'hidden',
            }}
            onMouseOver={() => {
                shopStore.stop()
            }}
            onMouseOut={() => {
                shopStore.start()
            }}>
            <img
                style={{
                    flexShrink: 0,
                    display: 'block',
                    width: '100%',
                    maxHeight: 501,
                    opacity: 0,
                }}
                src={p.imgArr ? p.imgArr[0].img : ''} />
            {/* rot */}
            {p.imgArr.map((v, i) =>
                <img
                    key={i}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        flexShrink: 0,
                        display: 'block',
                        width: '100%',
                        maxHeight: 501,
                        opacity: shopStore.rotIndex === i ? 1 : 0,
                        transition: 'opacity 800ms',
                        cursor: 'pointer',
                        zIndex: shopStore.rotIndex === i ? 1 : 0
                    }}
                    src={v.img}
                    onClick={(e) => {
                        shell.openExternal(v.url)
                    }} />
            )}
            {/* click */}

            <div style={{ position: 'absolute', bottom: 23, width: '100%', height: 20, zIndex: 1 }}>
                <FlexView
                    justifyContent={'center'}
                    alignItems={'center'}>
                    {p.imgArr.map((v, i) => <div
                        key={i}
                        style={{
                            width: 12,
                            height: 12,
                            backgroundColor: shopStore.rotIndex === i ? '#ffffff' : 'rgba(255,255,255,.3)',
                            margin: '0 5px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                        }}
                        onMouseOver={() => {
                            shopStore.stop()
                        }}
                        onMouseOut={() => {
                            shopStore.start()
                        }}
                        onClick={() => {
                            shopStore.setRotIndex(i)
                        }}
                    />)}
                </FlexView>
            </div>
        </div>
    ))
}