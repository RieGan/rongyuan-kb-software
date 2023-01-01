export const timeOut = (str?: string, time = 5000*10) => new Promise<void>((resolve, reject) => {
    setTimeout(() => {
        reject(new Error(str + 'Time Out'))
    }, time)
})
export const sleep = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms))
// export const sleep = <T>(ms: number, ret?: T) =>
//     new Promise(resolve => setTimeout(resolve, ms, ret))

export const timeOutFUNC = <F extends (...p: any) => Promise<any>>(f: F) =>
    (async (...p: any) => {
        await sleep(10)
        return await Promise.race([timeOut('超时了',5000*10), f(...p)])
    }

    ) as F


