import * as React from 'react'
import { mobxStore, useStore } from '../mobxStore/store'
import { useObserver } from 'mobx-react-lite'
import { store } from './store'

import { res } from '../res'
import { DeviceType } from '../sdk/DB'
import { GA } from '../sdk/GA/ga'
import * as path from 'path'
import * as url from 'url'
import { blockCloud, kCompany } from '../appConfig'
import styled from '@emotion/styled'

export const HelpBoxList = styled('div')({
    height: '477px',
    margin: '0 56px',
    outline: 'none',
    overflow: 'hidden auto',
    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
        background: 'gray',
        borderRadius: '5px',
    },
    WebkitAppRegion: 'no-drag'
})

export const Help = () => {
    const { deviceStore, helpStore, upgradeStore } = useStore()
    console.log('HHHHHEEEEEELLLLLPPPPPPP')
    React.useEffect(() => {
        helpStore.getCurrentComanyDevList()
        GA.trackPage('help')
    }, [])
    return useObserver(() => (
        <div style={{
            color: 'black',
            background: 'white',
            height: 1000,
            WebkitAppRegion: 'drag'
        } as React.CSSProperties}>
            <div style={{
                height: 20
            }} />
            <p style={{ fontSize: blockCloud ? 21 : 24, color: "#ff0000", fontWeight: "bold" }}>
                {res.string.您的设备在升级过程中出现了问题请选择您的设备型号重新进行升级升级过程中不要拔出USB}
            </p>
            <div style={{
                height: 20
            }} />
            <HelpBoxList>
                {helpStore.finalList.map((v, i) => {
                    if (v.dev.length > 1) {
                        return <div key={i}>
                            {v.dev.map((v, n) => {
                                return <button
                                    key={n}
                                    style={{
                                        height: "auto",
                                        width: "auto",
                                        padding: 10
                                    }}
                                    onClick={() => {
                                        mobxStore.upgradeStore.startCountDwon()
                                        const tmpDT = new DeviceType()
                                        Object.assign(tmpDT, deviceStore.currentDev!.deviceType)
                                        tmpDT.id = v.id
                                        tmpDT.name = v.name

                                        deviceStore.currentDev!.deviceType = tmpDT
                                        deviceStore.currentDevVersion = '0'
                                        upgradeStore.setUpgradeProgressDev(0)
                                        store.setState.devUpgradeOpen(true)
                                    }}>
                                    <div style={{
                                        width: '250px',
                                        height: '88px',
                                        background: `url(${url.pathToFileURL(path.join(__dirname, '..', 'company', 'company_' + kCompany, 'dev', v.name + '.png')).toString()})`,
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                    }} />
                                    <p>id:{v.id}</p>
                                    <p>{
                                        v.name?.indexOf("dm") != -1
                                            ? v.displayName + "(单模)"
                                            : v.name?.indexOf("2m") != -1
                                                ? v.displayName + "(双模)"
                                                : v.displayName + "(三模)"
                                    }</p>
                                    <p>{v.name}</p>
                                </button>
                            })
                            }
                            <br></br>
                        </div>
                    } else {
                        return v.dev.map((v, k) => {
                            return <button
                                key={k}
                                style={{
                                    height: "auto",
                                    width: "auto",
                                    padding: 10
                                }}
                                onClick={() => {
                                    mobxStore.upgradeStore.startCountDwon()
                                    const tmpDT = new DeviceType()
                                    Object.assign(tmpDT, deviceStore.currentDev!.deviceType)
                                    tmpDT.id = v.id
                                    tmpDT.name = v.name

                                    deviceStore.currentDev!.deviceType = tmpDT
                                    deviceStore.currentDevVersion = '0'
                                    upgradeStore.setUpgradeProgressDev(0)
                                    store.setState.devUpgradeOpen(true)
                                }}>
                                <div style={{
                                    width: '250px',
                                    height: '88px',
                                    background: `url(${url.pathToFileURL(path.join(__dirname, '..', 'company', 'company_' + kCompany, 'dev', v.name + '.png')).toString()})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                }} />
                                <p>id:{v.id}</p>
                                <p>{
                                    v.name?.indexOf("dm") != -1
                                        ? v.displayName + "(单模)"
                                        : v.name?.indexOf("2m") != -1
                                            ? v.displayName + "(双模)"
                                            : v.displayName + "(三模)"
                                }</p>
                                <p>{v.name}</p>
                            </button>
                        })
                    }
                })}
            </HelpBoxList>
            <div style={{
                height: 24
            }} />
            <p style={{ fontSize: blockCloud ? 21 :24, color: "#ff0000", fontWeight: "bold" }}>
                {res.string.后果自行承担}
            </p>
            <p style={{ fontSize: blockCloud ? 21 :24, color: "#ff0000", fontWeight: "bold" }}>
                {res.string.请联系客服}
            </p>
        </div>
    ))
}