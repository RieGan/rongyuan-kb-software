export const rgbToNum = (r: number, g: number, b: number) => {
    return (r << 16) | (g << 8) | (b)
}

export const numToRgb = (rgb: number) => {
    const r = (rgb & 0xff0000) >> 16
    const g = (rgb & 0x00ff00) >> 8
    const b = (rgb & 0x0000ff)

    return { r, g, b }
}
export const num2Rgb = (rgb: number) => {
    const r = (rgb & 0xff0000) >> 16
    const g = (rgb & 0x00ff00) >> 8
    const b = (rgb & 0x0000ff)

    return { r, g, b }
}

export const rgb2Num = (r: number, g: number, b: number) => {
    return (r << 16) | (g << 8) | (b)
}

export const rgb2Hex = (rgb: number) => {
    const rgbc = num2Rgb(rgb)

    const hex = "0x" + getHex(rgbc.r.toString()) + getHex(rgbc.g.toString()) + getHex(rgbc.b.toString()) + "ff"

    return hex.toLowerCase()
}

const getHex = (x: string) => {
    if (parseInt(x) <= 0x0f)
        return ("0" + parseInt(x).toString(16).slice(-2))
    else
        return (parseInt(x).toString(16).slice(-2))
}


export const rgb2Rgb565 = (rgb: number) => {
    const rgb888 = num2Rgb(rgb)

    const r5 = (rgb888.r >> 3) << 11
    const g6 = (rgb888.g >> 2) << 5
    const b5 = (rgb888.b >> 3) << 0;

    return { r5, g6, b5 }
}

export const rgb5652Rgb = (rgb565: number) => {
    const r = (rgb565 & 0xf800) >> 11
    const g = (rgb565 & 0x07e0) >> 5
    const b = (rgb565 & 0x001f) >> 0
    return (r << 19) | (g << 10) | (b << 3)
}

export const rgb2Rgb332 = (rgb: number) => {
    const rgb888 = num2Rgb(rgb)

    const r3 = (rgb888.r >> 5)
    const g3 = (rgb888.g >> 5)
    const b2 = (rgb888.b >> 6)

    return (r3 << 5) | (g3 << 2) | b2
}

export const rgb332ToRgb888 = (rgb332: number) => {
    const r = (rgb332 & 0xe0)
    const g = (rgb332 & 0x1c) >> 2
    const b = (rgb332 & 0x03)

    return (r << 16) | (g << 13) | (b << 6)
}