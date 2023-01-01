export const log16Num = (info: string, arr?: Array<number> | Buffer) => {
    if (arr === undefined) {
        console.error(info, '数据返回为空,数据错误!')
        return
    }
    console.log(info, [...arr].map(v => v.toString(16).padStart(4, '0x')).join(','))
    //console.log(info, arr.map(v => v.toString(16)).join(','))
}