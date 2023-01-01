import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useStore } from '../../../mobxStore/store'
import { Rot } from './rot'

export const shopWidth = 897

export const ShopContainer = styled('div')`
    position: absolute;
    left: -42px;
    top: -83px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 974px;
    height: 604px;
    overflow-y: auto;
    padding-top: 30px;
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: #808080;
    }
    &::-webkit-scrollbar {
        width: 5px; 
    }
`

const NavItem = styled.div({
    height: 30,
    color: '#FFFFFF',
    borderBottom: '2px solid #00000000',
    fontSize: 16,
    cursor: 'pointer',
    marginRight: 30,
    ['&:hover']: {
        color: '#FD6D19',
        borderBottom: '2px solid #FD6D19',
    }
}, (p: { color: string, borderBottom: string }) => ({
    color: p.color,
    borderBottom: p.borderBottom
}))

type Product = {
    img: string,
    title: string,
    details: string,
    price: string,
    href: string,
    logo: string[]
    type: 'key' | 'mouse' | 'ear' | 'other'
}
export const Shop = () => {
    const { shopStore } = useStore();

    const [pages, setPages] = useState('全部');

    const testArr = ['全部', '键盘', '鼠标', '耳机', '其他']

    const testArr2 = [
        { img: 'http://img.rongyuan.tech/ry-rot1.png', url: 'www.baidu.com' },
        { img: 'http://img.rongyuan.tech/ry-rot2.png', url: 'www.bilibili.com' },
        { img: 'http://img.rongyuan.tech/ry-rot3.png', url: 'www.google.com' },
    ]

    const testKey: Product[] = [
        {
            img: 'http://img.rongyuan.tech/ry-rot1.png',
            title: "xxxxxxx",
            details: "ddddddddddddddd",
            price: "998-1000",
            href: 'www.baidu.com',
            logo: ["", ""],
            type: 'key'
        },
        {
            img: 'http://img.rongyuan.tech/ry-rot1.png',
            title: "xxxxxxx",
            details: "ddddddddddddddd",
            price: "998-1000",
            href: 'www.baidu.com',
            logo: ["", ""],
            type: 'key'
        },
        {
            img: 'http://img.rongyuan.tech/ry-rot1.png',
            title: "xxxxxxx",
            details: "ddddddddddddddd",
            price: "998-1000",
            href: 'www.baidu.com',
            logo: ["", ""],
            type: 'key'
        },
        {
            img: 'http://img.rongyuan.tech/ry-rot1.png',
            title: "xxxxxxx",
            details: "ddddddddddddddd",
            price: "998-1000",
            href: 'www.baidu.com',
            logo: ["", ""],
            type: 'key'
        },
        {
            img: 'http://img.rongyuan.tech/ry-rot1.png',
            title: "xxxxxxx",
            details: "ddddddddddddddd",
            price: "998-1000",
            href: 'www.baidu.com',
            logo: ["", ""],
            type: 'key'
        },
    ]

    return <div>
        <ShopContainer>
            <div
                style={{
                    display: 'flex',
                    width: shopWidth,
                    flexShrink: 0,
                    paddingBottom: 30,
                    justifyContent: 'flex-start',
                    zIndex: 99
                }}>
                {testArr.map((v, i) =>
                    <NavItem
                        key={i}
                        color={pages === v ? '#FD6D19' : '#FFFFFF'}
                        borderBottom={pages === v ? '2px solid #FD6D19' : '2px solid #00000000'}
                        onClick={() => {
                            if (pages !== v) setPages(v)
                        }}>
                        {v}
                    </NavItem>
                )}
            </div>
            <div style={{ flexShrink: 0, marginBottom: 30 }}>
                <Rot imgArr={testArr2} />
            </div>

            <div style={{ flexShrink: 0, margin: '30px 100px', height: 800, width: 200, backgroundColor: '#ff0000', cursor: 'pointer' }}>
            </div>

            {/* {(pages === '全部' || pages === '键盘') && <ProductSmall title={'键盘'} product={testKey} />}
                {(pages === '全部' || pages === '鼠标') && <ProductSmall title={'鼠标'} />}
                {(pages === '全部' || pages === '耳机') && <ProductSmall title={'耳机'} />}
                {(pages === '全部'4 || pages === '其他') && <ProductSmall title={'其他'} />} */}
        </ShopContainer>

        {!shopStore.shopKey && <ShopContainer></ShopContainer>}
    </div>


}