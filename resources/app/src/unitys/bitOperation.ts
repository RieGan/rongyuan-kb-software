export const setBitTo1 = (x: number, index: number) => x |= (1 << index)
export const setBitTo0 = (x: number, index: number) => x &= ~(1 << index)
export const reverseBit = (x: number, index: number) => x ^= (1 << index)
export const getBit = (x: number, index: number) => ((x) >> (index) & 1)

export const setBit = (x: number, index: number, bit: 1 | 0) => {
    return bit === 1 ? setBitTo1(x, index) : setBitTo0(x, index)
}

export const getUint8Bit0Index = (x: number) => {
    const arr = []
    for (let i = 0; i < 8; i++) {
        if (!getBit(x, i)) arr.push(i)
    }
    return arr
}