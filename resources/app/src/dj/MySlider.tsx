import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'


const Container = styled('div')`
    width: 190px;
    height: 60px;
    display: flex;
    align-items: center;
    position:relative;

    & input{
        -webkit-appearance: none;
        width: 100%;
        height: 15px;
        border-radius: 10px;
        background-color:rgba(255,255,255,0);
        position: absolute;
        top:50%;
        transform: translate(0,-50%);
        border: none;
    }
    & input:focus {
        outline: none;
    }

    & input::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 35px;
        width: 15px;
        background: rgba(255,255,255,1);
        border-radius: 3px;
        cursor: pointer;
        opacity: 0
      }
`

const Progress = styled.div({
    width: '100%',
    height: 15,
    borderRadius: '10px',
    background: '#ebe9f2',
})

const ProgressBar = styled.div({
    width: '0%',
    height: '15px',
    borderRadius: '10px',
    background: '#655b87',
})

const ValueText = styled.span({
    display: 'block',
    color: '#655b87',
    position: 'absolute',
    top: -5,

}, (props: { dataleft: number }) => ({
    left: props.dataleft - 10,
}))

const ThumbSmallDiv = styled.div({

    height: '15px',
    width: '1px',
    background: '#05feff',
    marginTop: '10px',
    marginLeft: '7px'
})

const MyThumb = styled.div({
    position: 'absolute',
    top: 13,
    height: '35px',
    width: '15px',
    background: 'linear-gradient(to right,#404040,#1b1b1b)',
    borderRadius: '3px',
    cursor: 'pointer',
}, (props: { dataleft: number }) => ({
    left: props.dataleft,
}))

export const MySlider = (p: {
    setValue: (value: number) => void,
    changeComplete: () => void,
    value: number,
    min: number
    max: number
    step: number
    isDisabled: boolean
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const progressBarRef = useRef<HTMLDivElement>(null)

    const [valueLeft, setValueLeft] = useState(0);
    const [thumbLeft, setThumbLeft] = useState(0);
    const [valueIsShow, setValueIsShow] = useState(false);


    useEffect(() => {
        progressBarRef.current!.style.width = (p.value - p.min) / (p.max - p.min) * 100 + '%';

        setValueLeft(progressBarRef.current!.getBoundingClientRect().width);
    }, [p.value])

    useEffect(() => {
        progressBarRef.current!.style.width = (p.value - p.min) / (p.max - p.min) * 100 + '%';
        setValueLeft(progressBarRef.current!.getBoundingClientRect().width);
        if (progressBarRef.current!.style.width == '100%')
            setThumbLeft(progressBarRef.current!.getBoundingClientRect().width - 7);
        else
            setThumbLeft(progressBarRef.current!.getBoundingClientRect().width);

    }, [])
    useEffect(() => {
        setValueLeft(progressBarRef.current!.getBoundingClientRect().width);
        if (progressBarRef.current!.style.width == '100%')
            setThumbLeft(progressBarRef.current!.getBoundingClientRect().width - 7);
        else
            setThumbLeft(progressBarRef.current!.getBoundingClientRect().width);

    }, [progressBarRef.current?.getBoundingClientRect().width])

    return (
        <Container ref={containerRef} >
            <Progress>
                {
                    valueIsShow &&
                    <ValueText dataleft={valueLeft}>
                        {p.value}
                    </ValueText>
                }
                <ProgressBar ref={progressBarRef}></ProgressBar>
                <input
                    disabled={p.isDisabled}
                    type='range'
                    min={p.min}
                    max={p.max}
                    step={p.step}
                    value={p.value}
                    onMouseDown={
                        (e) => {
                            if (p.isDisabled) return
                            setValueIsShow(() => true);
                        }
                    }
                    onMouseUp={
                        () => {
                            if (p.isDisabled) return
                            setValueIsShow(() => false)
                            p.changeComplete();
                        }
                    }
                    onChange={(e) => {
                        if (p.isDisabled) return
                        const nowData = parseInt(e.target.value);
                        p.setValue(nowData);
                        progressBarRef.current!.style.width = (nowData - p.min) / (p.max - p.min) * 100 + '%';
                        if (progressBarRef.current!.style.width == '100%')
                            setThumbLeft(progressBarRef.current!.getBoundingClientRect().width - 7);
                        else
                            setThumbLeft(progressBarRef.current!.getBoundingClientRect().width);

                        // console.log('当前值：', nowData);
                        // console.log('最小值：', p.min);
                        // console.log('最大值：', p.max);
                        // console.log('width值：', progressBarRef.current!.style.width);

                        setValueLeft(progressBarRef.current!.getBoundingClientRect().width);
                    }}
                />
                {/* <MyThumb dataleft={thumbLeft}>
                    <ThumbSmallDiv />
                </MyThumb> */}
            </Progress>
        </Container>
    )
}