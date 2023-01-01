import { Gif, GifFrame, GifUtil } from "gifwrap"
import Jimp from "jimp"
import { num2Rgb, rgb2Hex, rgb2Num, rgb2Rgb565, rgb5652Rgb, rgbToNum } from "../../../unitys/rgbNum"
import * as path from 'path'
import { mobxStore } from "../../../mobxStore/store"
import { equals } from "ramda"

export const getImgStyle = (drawCArr: DrawType[]) => {
    const xArr = new Array<number>()
    const yArr = new Array<number>()

    drawCArr.map(v => {
        if (v.rgb !== 0)
            xArr.push(v.x)

        if (v.rgb !== 0)
            yArr.push(v.y)
    })

    let left = Math.min(...xArr)
    let top = Math.min(...yArr)
    let imgW = Math.max(...xArr) - left + 1 // Index start at 0
    let imgH = Math.max(...yArr) - top + 1
    let imgS: ImgStyle = {
        left: left,
        top: top,
        right: imgW + left,
        bottom: imgH + top,
        // imgW: imgW,
        // imgH: imgH,
        // offsetX: offsetX,
        // offsetY: offsetY,
    }
    if (xArr.length === 0 && yArr.length === 0) {
        imgS = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
        }
    }

    return imgS
}

export const pic2DataArr = (drawCArr: DrawType[], kbW: number, kbH: number) => {
    // w128 h64
    const drawArr = new Array<number>()
    drawCArr.map(v => drawArr.push(v.rgb !== 0 ? 1 : 0))

    const nArrkbWArr = new Array<number[]>()
    for (let i = 0; i < kbH; i++) {
        const nArrkbW = drawArr.slice(i * kbW, i * kbW + kbW)
        nArrkbWArr.push(nArrkbW)
    }

    const xyArr = new Array<number>()
    for (let i = 0; i < kbW; i++) {
        for (let j = 0; j < nArrkbWArr.length; j++) {
            xyArr.push(nArrkbWArr[j][i])
        }
    }

    const tmp = new Array<number[]>()
    for (let i = 0; i < kbW; i++) {
        const nArrkbH = xyArr.slice(i * kbH, i * kbH + kbH)
        for (let j = 0; j < nArrkbH.length; j += 8) {
            const nArr8 = nArrkbH.slice(j, j + 8);
            tmp.push(nArr8)
        }
    }

    const dataArr = new Array<number>()
    const len = Math.ceil(kbH / 8)
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < kbW; j++) {
            const tt = tmp[len * j + i]
            // dataArr.push(tt)
            let num = 0
            for (let n = 0; n < tt.length; n++) {
                num += tt[n] << n
            }
            dataArr.push(num)
        }
    }
    return dataArr
}

export const pic2Rgb565Arr = (drawCArr: DrawType[], imgS: ImgStyle) => {
    // console.error(drawCArr.length);

    const drawArr = new Array<number>()
    const w = imgS.right - imgS.left
    const h = imgS.bottom - imgS.top


    drawCArr.map(v => {
        if (v.x >= imgS.left && v.x < imgS.right
            && v.y >= imgS.top && v.y < imgS.bottom) {
            const rgb565 = rgb2Rgb565(v.rgb)
            drawArr.push(rgb565.r5 | rgb565.g6 | rgb565.b5)
        }
    })


    const nArrkbWArr = new Array<number[]>()
    for (let i = 0; i < h; i++) {
        const nArrkbW = drawArr.slice(i * w, i * w + w)
        nArrkbWArr.push(nArrkbW)
    }


    const xyArr = new Array<number>()
    for (let i = 0; i < w; i++) {
        for (let j = 0; j < nArrkbWArr.length; j++) {
            xyArr.push(nArrkbWArr[j][i])
        }
    }

    const dataArr = new Array<number>()
    xyArr.map(v => {
        const rgbBuf = Buffer.alloc(2)
        rgbBuf.writeUInt16LE(v)
        dataArr.push(rgbBuf[1])
        dataArr.push(rgbBuf[0])
        // rgbBuf.map(rv => dataArr.push(rv))
    })

    return dataArr
    // console.error("xyArr: ", xyArr);

    // const tmp = new Array<number[]>()
    // for (let i = 0; i < w; i++) {
    //     const nArrkbH = xyArr.slice(i * h, i * h + h)
    //     for (let j = 0; j < nArrkbH.length; j += 8) {
    //         const nArr8 = nArrkbH.slice(j, j + 8);
    //         tmp.push(nArr8)
    //     }
    // }

    // const dataArr = new Array<number>()
    // const len = Math.ceil(h / 8)
    // for (let i = 0; i < len; i++) {
    //     for (let j = 0; j < w; j++) {
    //         const tt = tmp[len * j + i]
    //         tt.map(v => {
    //             const rgbBuf = Buffer.alloc(2)
    //             rgbBuf.writeUInt16LE(v)
    //             rgbBuf.map(rv => dataArr.push(rv))
    //         })
    //     }
    // }
    // return dataArr
}

export const pic2Rgb888Arr = (drawCArr: DrawType[], imgS: ImgStyle) => {
    // console.error(drawCArr.length);

    const drawArr = new Array<number>()
    const w = imgS.right - imgS.left
    const h = imgS.bottom - imgS.top


    drawCArr.map(v => {
        if (v.x >= imgS.left && v.x < imgS.right
            && v.y >= imgS.top && v.y < imgS.bottom) {
            drawArr.push(v.rgb)
        }
    })


    const nArrkbWArr = new Array<number[]>()
    for (let i = 0; i < h; i++) {
        const nArrkbW = drawArr.slice(i * w, i * w + w)
        nArrkbWArr.push(nArrkbW)
    }


    const xyArr = new Array<number>()
    for (let i = 0; i < w; i++) {
        for (let j = 0; j < nArrkbWArr.length; j++) {
            xyArr.push(nArrkbWArr[j][i])
        }
    }

    const dataArr = new Array<number>()
    xyArr.map(v => {
        const rgb = num2Rgb(v)
        dataArr.push(rgb.r)
        dataArr.push(rgb.g)
        dataArr.push(rgb.b)
    })

    return dataArr
}

export const setJimpAuto = (lenna: Jimp, imgW: number, imgH: number, grayscale: boolean = false, kbW: number, kbH: number) => {
    const img = new Jimp(kbW, kbH)
    for (let y = 0; y < kbH; y++) {
        for (let x = 0; x < kbW; x++) {
            img.setPixelColor(0x000000ff, x, y)
        }
    }
    img.greyscale()
        .contrast(1)

    lenna
        .resize(imgW, imgH)

    if (grayscale) {
        lenna.greyscale()
            .contrast(1)
    }

    const deltX = Math.floor((kbW - imgW) / 2)
    const deltY = Math.floor((kbH - imgH) / 2)

    img.composite(lenna, deltX, deltY)

    return img
}

export const drawTypeArr2Str = async (dArr: DrawType[], kbW: number, kbH: number) => {
    const img = new Jimp(kbW, kbH)

    dArr.map(async v => {
        img.setPixelColor(Number(rgb2Hex(v.rgb)), v.x, v.y)
    })

    return await img.getBase64Async(Jimp.MIME_PNG)
}

export const drawTypeArr2Gif = async (arr: Buffer[], frameDelay: number, kbW: number, kbH: number) => {
    mobxStore.toastStore.setGIFState('bussy', 'drawTypeArr2Gif')
    const frames = new Array<GifFrame>()
    const p = path.join(__dirname, '..', 'test.gif')

    for (let i = 0; i < arr.length; i++) {
        const img = await Jimp.read(arr[i])
        const frame = new GifFrame(img.bitmap)
        frame.delayCentisecs = frameDelay / 10
        frames.push(frame)
    }
    let a: Gif | undefined
    try {
        a = await GifUtil.write(p, frames)
    } catch (error: any) {
        const str = error.toString()
        if (equals(str, 'Error: Frame 0 uses more than 256 color indexes')) {
            for (let i = 0; i < frames.length; i++) {
                GifUtil.quantizeDekker(frames[i], 256)
            }
            try {
                a = await GifUtil.write(p, frames)
            } catch (error) {
                console.log('222: ', error);
            }
        } else {
            console.log('111: ', error);
        }
    }
    mobxStore.toastStore.setGIFState('idle', 'drawTypeArr2Gif')
    return a?.buffer
}

export const getImgAutoSize = (img: Jimp, kbW: number, kbH: number) => {
    const w = img.getWidth()
    const h = img.getHeight()

    let cw = 0
    let ch = 0
    if (w < kbW && h < kbH) {
        cw = w
        ch = h
    } else {
        if ((kbW / kbH) < (w / h)) {
            cw = kbW
            ch = Math.ceil(kbW * (h / w))
        } else {
            cw = Math.ceil(kbH * (w / h))
            ch = kbH
        }
    }

    return { cw, ch }
}

export const fbuf2DrawTypeArr = async (buf: Buffer, kbW: number, kbH: number) => {
    const img = new Jimp(kbW, kbH)
    let lenna = new Jimp(kbW, kbH)
    if (buf.length !== 0) {
        lenna = await Jimp.read(buf)
    }

    img.composite(lenna, 0, 0)
    const arr = new Array<DrawType>()
    for (let y = 0; y < kbH; y++) {
        for (let x = 0; x < kbW; x++) {
            const k = Jimp.intToRGBA(img.getPixelColor(x, y))
            arr.push({ x: x, y: y, rgb: rgb2Num(k.r, k.g, k.b) })
        }
    }

    return arr
}

export const drawTypeArr2fbuf = async (arr: DrawType[], kbW: number, kbH: number) => {
    const img = new Jimp(kbW, kbH)
    arr.map(v => {
        img.setPixelColor(Number(rgb2Hex(v.rgb)), v.x, v.y)
    })

    return img.getBufferAsync(Jimp.MIME_PNG)
}


// export const upRGBImgK = (currentLen: number) => {
//     const b = Buffer.alloc(8)
//     b[0] = 0x24
//     b[1] = 0// 当前是第几帧图片
//     b[2] = 1// Total frames
//     b[3] = 0// frames Delay
//     b[4] = 0
//     b[5] = 0
//     b[6] = currentLen
// }


export const buf2UImgRGBData = (isRgb: '16' | '24', buf: Buffer) => {
    const imgS: ImgStyle = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    }

    const d_buf = buf.slice(0, 64);
    imgS.left = d_buf[8]
    imgS.top = d_buf[9]
    imgS.right = d_buf[10]
    imgS.bottom = d_buf[11]
    const w = imgS.right - imgS.left
    const h = imgS.bottom - imgS.top
    let rgb = isRgb === '16'
        ? 2
        : isRgb === '24'
            ? 3
            : 2
    const len = Math.ceil((w * h * rgb) / 56) * 64
    const t_buf = buf.slice(64, buf.length)

    let dataArr = new Array<UImgRGBData & ImgStyle>()

    for (let i = 0; i < Math.ceil(t_buf.length / len); i++) {
        const data: UImgRGBData = {
            frameNum: 0,
            currentFrame: 0,
            frameDelay: 0,
            imgDataArr: []
        }
        const j_buf = t_buf.slice(i * len, i * len + len)
        for (let j = 0; j < j_buf.length; j += 64) {
            if (j === 0) {
                data.currentFrame = j_buf[1]
                data.frameNum = j_buf[2]
                data.frameDelay = j_buf[3]
            }
            const k_buf = j_buf.slice(j + 8, j + 8 + 56)
            for (let k = 0; k < k_buf.length; k++) {
                data.imgDataArr.push(k_buf[k])
            }
        }

        dataArr.push(Object.assign(data, imgS))
    }

    return dataArr
}

export const UImgRGBData2Buf = (isRgb: '16' | '24', data: UImgRGBData & ImgStyle) => {
    let buf = Buffer.alloc(0)
    const b_0 = isRgb === '16'
        ? 0xa5
        : isRgb === '24'
            ? 0xa9
            : 0xa5
    if (data.currentFrame === 0) {
        const b = Buffer.alloc(64)
        b[0] = b_0
        b[1] = data.currentFrame// 当前是第几帧图片
        b[2] = data.frameNum// Total frames
        b[3] = data.frameDelay// frames Delay
        const lenBuf = Buffer.alloc(2)
        lenBuf.writeUInt16LE(data.imgDataArr.length)
        b[4] = lenBuf[0]
        b[5] = lenBuf[1]
        b[6] = 0
        b[8] = data.left
        b[9] = data.top
        b[10] = data.right
        b[11] = data.bottom
        buf = Buffer.concat([buf, b])
    }
    const imgBuf = Buffer.alloc(8);
    imgBuf[0] = isRgb === '16'
        ? 0x25
        : isRgb === '24'
            ? 0x29
            : 0x25
    imgBuf[1] = data.currentFrame
    imgBuf[2] = data.frameNum
    imgBuf[3] = data.frameDelay
    for (let i = 0; i < Math.ceil(data.imgDataArr.length / 56); i++) {
        let ms = [...data.imgDataArr.slice(i * 56, i * 56 + 56)]
        let clen = ms.length
        if (ms.length < 56)
            ms = ms.concat(new Array(56 - ms.length).fill(0))

        const lenBuf = Buffer.alloc(2)
        lenBuf.writeUInt16LE(i)
        imgBuf[4] = lenBuf[0]
        imgBuf[5] = lenBuf[1]

        imgBuf[6] = clen

        const sendBuf = Buffer.from([...imgBuf, ...ms])
        buf = Buffer.concat([buf, sendBuf])
    }

    return buf
}

export const UImgData2Buf = (data: UImgData) => {
    let buf = Buffer.alloc(0)
    const b = Buffer.alloc(8)
    b[0] = 0x24
    b[1] = data.isGIF ? data.frameNum - 1 : 0
    b[3] = data.currentFrame
    b[4] = data.frameDelay
    b[5] = data.layer

    let len = Math.ceil(data.imgDataArr.length / 56)
    for (let j = 0; j < len; j++) {
        b[2] = j
        let ms = [...data.imgDataArr.slice(j * 56, j * 56 + 56)]
        if (ms.length < 56) {
            ms = ms.concat(new Array(56 - ms.length).fill(0))
        }
        const bufS = Buffer.from([...b, ...ms])
        buf = Buffer.concat([buf, bufS])
    }

    return buf
}

export const buf2UImgData = (buf: Buffer, kbW: number, kbH: number) => {
    const dataArr = new Array<UImgData>()

    const len = (Math.ceil(Math.ceil(kbW * kbH / 8) / 56) * 64)
    for (let i = 0; i < Math.ceil(buf.length / len); i++) {

        let i_buf = buf.slice(i * len, i * len + len)
        const data: UImgData = {
            frameNum: 0,
            currentFrame: 0,
            frameDelay: 0,
            layer: 0,
            imgDataArr: [],
            isGIF: false
        }
        data.frameNum = i_buf[1] + 1
        data.isGIF = i_buf[1] !== 0
        data.currentFrame = i_buf[3]
        data.frameDelay = i_buf[4]

        for (let j = 0; j < Math.ceil(i_buf.length / 64); j++) {
            const j_buf = i_buf.slice(j * 64 + 8, j * 64 + 64)
            for (let k = 0; k < j_buf.length; k++) {
                data.imgDataArr.push(j_buf[k])
            }
        }

        dataArr.push(data)
    }

    return dataArr

}

export const UImgData2DrawTypeArr = (data: UImgData, kbW: number, kbH: number) => {
    const imgDataArr = data.imgDataArr
    let t_arr = new Array<DrawType>()
    const len = Math.ceil(kbH / 8)
    for (let i = 0; i < len; i++) {
        let nArrkbW = imgDataArr.slice(i * kbW, i * kbW + kbW)
        for (let j = 0; j < nArrkbW.length; j++) {
            const num = nArrkbW[j]
            // 8bit
            for (let k = 0; k < 8; k++) {
                t_arr.push({
                    x: j,
                    y: k + i * 8,
                    rgb: (num >> k) % 2 === 0 ? 0 : 0xffffff
                })
            }
        }
    }

    let arr = new Array<DrawType>()
    for (let i = 0; i < len; i++) {
        const tmpArr = t_arr.slice(kbW * 8 * i, kbW * 8 * (i + 1))
        // 8bit
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < kbW; x++) {
                arr.push(tmpArr[8 * x + y])
            }
        }
    }

    return arr
}

export const UImgRGBData2DrawTypeArr = (data: UImgRGBData & ImgStyle, isRgb: '16' | '24', kbW: number, kbH: number) => {
    const imgDataArr = data.imgDataArr
    // console.error(data.imgDataArr);

    const count = isRgb === '16'
        ? 2
        : isRgb === '24'
            ? 3
            : 2
    const imgH = data.bottom - data.top
    const left = data.left
    const top = data.top
    const right = data.right
    const bottom = data.bottom

    if (imgDataArr.length % count !== 0) return undefined
    let rgbArr = new Array<number>()
    for (let i = 0; i < imgDataArr.length; i += count) {
        const nArrc = imgDataArr.slice(i, i + count)
        let rgb = 0
        if (count === 2) rgb = rgb5652Rgb(nArrc[0] << 8 | nArrc[1])
        if (count === 3) rgb = rgbToNum(nArrc[0], nArrc[1], nArrc[2])
        rgbArr.push(rgb)
    }
    let arr = new Array<DrawType>()
    for (let y = 0; y < kbH; y++) {
        for (let x = 0; x < kbW; x++) {
            const d = {
                x: x,
                y: y,
                rgb: 0,
            }
            if (x > left - 1 && x < right && y > top - 1 && y < bottom) {
                d.rgb = rgbArr[(x - left) * imgH + (y - top)]
            }
            arr.push(d)
        }
    }
    return arr
}