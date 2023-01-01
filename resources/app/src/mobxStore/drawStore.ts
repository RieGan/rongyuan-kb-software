import { action, observable } from "mobx";
import { mobxStore } from "./store";
import { Gif } from "gifwrap";
import Jimp from "jimp";
import { getImgAutoSize, setJimpAuto as setJimpAuto, pic2DataArr, pic2Rgb565Arr, pic2Rgb888Arr, fbuf2DrawTypeArr, drawTypeArr2fbuf } from "../sdk/DriverIO/DeviceAPI/imgApi";
import { res } from "../res";
import { equals } from "ramda";

export class DrawStore {
    @observable
    prewData: {
        path: string
        describe?: string
    } | undefined = undefined

    @observable
    isImgRgb: boolean = true;
    @observable
    isbgBlack: boolean = true;
    @observable
    isPreview: boolean = false;
    @observable
    isMouseDraw: boolean = false;
    @observable
    mClick: boolean = false;
    @observable
    isPaint: boolean = true;
    @observable
    isUp: boolean = false;
    @observable
    isupBar: boolean = false;
    @observable
    tipsOpen: boolean = false;
    @observable
    drawColor: number = 0xffffff
    @observable
    RGBColor: number = 0xffffff
    @observable
    currentDrawArr: Buffer = Buffer.alloc(0)
    @observable
    selectIndex: number = 0
    @observable
    selectTool: number = 0
    @observable
    selectPage: number = 0
    @observable
    drawWeight: number = 1
    @observable
    frameDelay: number = 100
    @observable
    picLayer: number = 0// 选择图片层
    @observable
    x1: number = -1
    @observable
    y1: number = -1
    @observable
    percentage: number = 0
    @observable
    allDrawArr: Buffer[] = [Buffer.alloc(0)]
    @observable
    finnalDrawArr: number[][] = new Array()

    @observable
    finnalRGBDrawArr: number[][] = new Array()

    @observable
    recallArr: Buffer[] = []
    @observable
    resumeArr: Buffer[] = []
    @action.bound
    clearRecallArr() {
        this.recallArr = []
    }

    @action.bound
    clearResumeArr() {
        this.resumeArr = []
    }

    @action.bound
    addRecallArr(buf: Buffer) { //撤回
        if (this.recallArr.length < 10) {
            this.recallArr.push(buf)
        } else {
            const arr = this.recallArr.slice(1, 10)
            this.recallArr = [...arr]
            this.recallArr.push(buf)
        }
    }
    @action.bound
    addResumeArr(buf: Buffer) { //返回
        if (this.resumeArr.length < 10) {
            this.resumeArr.push(buf)
        } else {
            const arr = this.resumeArr.slice(1, 10)
            this.resumeArr = [...arr]
            this.resumeArr.push(buf)
        }
    }

    @action.bound
    recall() {
        if (this.recallArr.length === 0) return
        const buf = this.recallArr[this.recallArr.length - 1]
        this.addResumeArr(this.currentDrawArr)
        this.currentDrawArr=buf
        this.allDrawArr[this.selectIndex] = this.currentDrawArr
        this.recallArr.pop()
    }

    @action.bound
    resume() {
        if (this.resumeArr.length === 0) return
        const buf = this.resumeArr[this.resumeArr.length - 1]
        this.addRecallArr(this.currentDrawArr)
        this.currentDrawArr=buf
        this.allDrawArr[this.selectIndex] = this.currentDrawArr
        this.resumeArr.pop()
    }

    @observable
    pngPathBuf: Buffer | undefined
    @observable
    gifPathBuf: Buffer | undefined
    @action.bound
    setPngPathBuf(p: Buffer | undefined) {
        this.pngPathBuf = p
    }
    @action.bound
    setGifPathBuf(p: Buffer | undefined) {
        this.gifPathBuf = p
    }
    @observable
    gifLocalPathBuf: Buffer | undefined

    @action.bound
    setLocalGifPathBuf(p: Buffer | undefined) {
        this.gifLocalPathBuf = p
    }

    @observable
    zoom: number = 1
    @action.bound
    setZoom(i: number) {
        this.zoom = i
    }

    @action.bound
    setIsImgRgb(key: boolean) {
        this.isImgRgb = key
    }
    @action.bound
    setIsPreview(key: boolean, data?: { path: string, describe?: string }) {
        mobxStore.isKeyStore.setPopUpKey(key)
        this.isPreview = key
        this.prewData = data
    }
    @action.bound
    setTipsOpen(key: boolean) { //画板提示
        this.tipsOpen = key
    }
    @action.bound
    setIsMouseDraw(key: boolean) {
        this.isMouseDraw = key
    }
    @action.bound
    setMClick(key: boolean) {
        this.mClick = key
    }
    @action.bound
    setIsPaint(key: boolean) {
        this.isPaint = key
    }
    @action.bound
    setIsUp(key: boolean) {
        this.isUp = key
    }
    @action.bound
    setIsbgBlack(key: boolean) {
        this.isbgBlack = key
    }
    @action.bound
    setIsupBar(key: boolean) {
        this.isupBar = key
    }
    @action.bound
    setPercentage(percentage: number) {
        this.percentage = percentage
    }

    @action.bound
    setDrawColor(drawColor: number) {
        this.drawColor = drawColor
    }
    @action.bound
    setRGBColor(drawColor: number) {
        this.RGBColor = drawColor
    }

    @action.bound
    setDrawWeight = (index: number) => {
        this.drawWeight = index
    }
    @action.bound
    setX = (index: number) => {
        this.x1 = index
    }
    @action.bound
    setY = (index: number) => {
        this.y1 = index
    }
    @action.bound
    setFrameDelay = (index: number) => {
        this.frameDelay = index
    }
    @action.bound
    setPicLayer = (index: number) => {
        this.picLayer = index
    }
    @action.bound
    init = async (kbW: number, kbH: number) => {
        // if (this.currentDrawArr.length === 0) {
        const arr = new Array<DrawType>()
        for (let y = 0; y < kbH; y++) {
            for (let x = 0; x < kbW; x++) {
                arr.push({
                    x: x,
                    y: y,
                    rgb: 0,
                })
            }
        }
        this.currentDrawArr = await drawTypeArr2fbuf(arr, kbW, kbH)
        this.allDrawArr[this.selectIndex] = this.currentDrawArr
        // }

    }

    @action.bound
    async setFinDrawArr(kbw: number, kbh: number, imgS?: ImgStyle) {
        this.finnalDrawArr = []
        this.finnalRGBDrawArr = []
        const isRgb = mobxStore.deviceStore.currentDev?.deviceType.otherSetting?.LED?.isRgb
        for (let i = 0; i < this.allDrawArr.length; i++) {
            const drawTypeArr = await fbuf2DrawTypeArr(this.allDrawArr[i], kbw, kbh)
            if (isRgb && imgS !== undefined) {
                let drawArr = pic2Rgb565Arr(drawTypeArr, imgS) // bit16
                if (equals(isRgb, '24')) {
                    drawArr = pic2Rgb888Arr(drawTypeArr, imgS)
                }
                this.finnalRGBDrawArr.push(drawArr)
            }

            if (!isRgb) {
                const drawArr = pic2DataArr(drawTypeArr, kbw, kbh)
                this.finnalDrawArr.push(drawArr)
            }
        }
    }

    @action.bound
    setSeletIndex = (index: number) => {
        this.selectIndex = index
        this.currentDrawArr = Buffer.from([...this.allDrawArr[index]])
    }


    @action.bound
    async img2DrawArr(img: Jimp) {
        const led = mobxStore.deviceStore.currentDev?.deviceType.otherSetting?.LED
        if (led === undefined) return
        const kbW = led.kbW
        const kbH = led.kbH
        const s = getImgAutoSize(img, kbW, kbH)
        const lenna = setJimpAuto(img, s.cw, s.ch, !this.isImgRgb, kbW, kbH);

        const buf = await lenna.getBufferAsync(Jimp.MIME_PNG)

        this.currentDrawArr = buf
        this.allDrawArr[this.selectIndex] = buf
    }

    @action.bound
    addDrawArr = async (kbW: number, kbH: number, selectIndex: number, isRgb: false | '16' | '24') => {
        if (isRgb) {
            const num = isRgb === '16' ? 2 : isRgb === '24' ? 3 : 0
            const change = Math.floor((8 * 1024 * 1024) / (kbW * kbH * num))
            const max = !isRgb ? 50 : change > 255 ? 255 : change
            if (this.allDrawArr.length >= max) {
                mobxStore.toastStore.setInfo(res.text.最大只能添加255张图片());
                return
            }
        } else {
            if (((kbW * kbH) / 8 > 512 && (kbW * kbH) / 8 <= 1024)) {//超过512最多20张  
                if (this.allDrawArr.length >= 25) {
                    mobxStore.toastStore.setInfo(res.text.最大只能添加25张图片());
                    return
                }
            } else {
                if (this.allDrawArr.length >= 50) {
                    mobxStore.toastStore.setInfo(res.text.最大只能添加50张图片());
                    return
                }
            }
        }
        this.allDrawArr.splice(this.selectIndex + 1, 0, Buffer.alloc(0))
        this.setSeletIndex(this.selectIndex + 1)
        this.init(kbW, kbH)
    }

    @action.bound
    reeduceDrawArr = () => {
        if (this.allDrawArr.length <= 1) {
            mobxStore.toastStore.setInfo(res.text.至少需要1张图())
            return;
        }
        this.allDrawArr.splice(this.selectIndex, 1)
        if (this.selectIndex === this.allDrawArr.length) {
            this.selectIndex = this.allDrawArr.length - 1
        }
        this.currentDrawArr = this.allDrawArr[this.selectIndex]
    }
    @action.bound
    reeduceAllDrawArr = () => {
        this.allDrawArr.splice(1, this.allDrawArr.length - 1)
        if (this.selectIndex === this.allDrawArr.length) {
            this.selectIndex = this.allDrawArr.length - 1
        }
    }

    // 判断图片透明度
    checkTransparent = (lenna: Jimp) => {
        // const cw = Math.ceil(lenna.getWidth() / 2)
        // const ch = Math.ceil(lenna.getHeight() / 2)
        // return lenna.getPixelColor(cw, ch)


        const cw = lenna.getWidth()
        const ch = lenna.getHeight()

        let j = 0;
        for (let y = 0; y < ch; y++) {
            for (let x = 0; x < cw; x++) {
                if (lenna.getPixelColor(x, y) === 0) {
                    j++
                }
            }
        }

        return j / (cw * ch)
    }

    // 砍帧
    @action.bound
    gifCut2AllDrawArr = async (inputGif: Gif) => {
        const led = mobxStore.deviceStore.currentDev?.deviceType.otherSetting?.LED
        if (led === undefined) return
        const kbW = led.kbW
        const kbH = led.kbH
        const num = led.isRgb === '16' ? 2 : led?.isRgb === '24' ? 3 : 0
        const max = !led.isRgb ? 50 : Math.floor((8 * 1024 * 1024) / (kbW * kbH * num))

        const flen = inputGif.frames.length > max ? max : inputGif.frames.length

        this.allDrawArr = new Array()

        let img = new Jimp(inputGif.width, inputGif.height)
        const s = getImgAutoSize(img, kbW, kbH)
        const f_transparency = inputGif.frames[0].getPalette().usesTransparency
        for (let i = 0; i < flen; i++) {
            const v = inputGif.frames[i]
            let f = new Jimp(v.bitmap)
            const transparency = this.checkTransparent(f)
            if (!f_transparency) {
                // 处理视频转成的GIF
                img.resize(inputGif.width, inputGif.height)
            } else {
                if (v.bitmap.width === inputGif.width && v.bitmap.height === inputGif.height) {
                    img = new Jimp(inputGif.width, inputGif.height)
                } else {
                    if (i !== 0 && transparency >= 0.9) {
                        img.resize(inputGif.width, inputGif.height)
                    } else {
                        img = new Jimp(inputGif.width, inputGif.height)
                    }
                }
            }
            img.composite(f, v.xOffset, v.yOffset)

            let tmp = await Jimp.read(await img.getBufferAsync(Jimp.MIME_PNG))
            tmp = setJimpAuto(tmp, s.cw, s.ch, !this.isImgRgb, kbW, kbH)
            this.allDrawArr.push(await tmp.getBufferAsync(Jimp.MIME_PNG))
        }
        this.currentDrawArr = this.allDrawArr[0]
    }

    @action.bound
    saveCurrentDrawArr = () => {
        this.allDrawArr.map(v => v = Buffer.from([...v]))
        this.allDrawArr[this.selectIndex] = Buffer.from([...this.currentDrawArr])
    }


    @action.bound
    copyPreFrame = async () => {
        // 需要修改
        const i = this.selectIndex
        if (i !== 0) {
            this.allDrawArr[i] = Buffer.alloc(0)
            this.allDrawArr[i] = this.allDrawArr[i - 1]
            this.currentDrawArr = this.allDrawArr[i]
        }
    }
    //绘制工具
    @action.bound
    setSeletTool = (index: number) => {
        this.selectTool = index
    }

    @action.bound
    setSelectPage = (index: number) => {
        this.selectPage = index
    }


}
