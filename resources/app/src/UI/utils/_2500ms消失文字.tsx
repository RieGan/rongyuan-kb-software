import React, { useState, useEffect } from 'react'

export const _2500ms消失文字 = (p: { text: React.ReactNode }) => {
    const [text, setText] = useState(p.text)

    useEffect(() => {
        setText(p.text)
        const id = setTimeout(() => {
            setText(undefined)
        }, 2500)
        return () => clearTimeout(id)
    }, [p.text])

    return <>{text}</>
}