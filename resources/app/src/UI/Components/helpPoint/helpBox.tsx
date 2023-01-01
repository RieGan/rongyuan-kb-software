import React, { useState } from 'react'
import { res } from '../../../res'
import { dj } from '../../../dj'

export const HelpBox = (p: {
    title: string
}) => {
    const [showTips, setShowTips] = useState(false)
    return (
        <div style={{ position: 'relative', width: 25, height: 25, cursor: 'pointer' }}
            onMouseEnter={() => {
                if (!showTips) setShowTips(true)
            }}
            onMouseLeave={() => {
                if (showTips) setShowTips(false)
            }}>
            <dj.Button
                relative
                w={25}
                h={25}
                img={{
                    size: {
                        w: 25,
                        h: 25,
                    },
                    src: res.img.help,
                }}
            />

            {showTips && <div style={{
                position: 'absolute',
                left: '50%',
                top: 15,
                transform: 'translate(-50%, 0)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{
                    border: '10px solid transparent',
                    borderBottomColor: '#f30',
                }} />
                <div style={{
                    backgroundColor: 'red',
                    flex: '0 1 auto',
                    padding: 5
                }}>
                    <p style={{
                        width: 150,
                        fontSize: '14',
                        color: '#ffffff',
                        wordWrap: 'break-word',
                        wordBreak: 'break-all'
                    }}>
                        {p.title}
                    </p>
                </div>
            </div>}
        </div>
    )
}