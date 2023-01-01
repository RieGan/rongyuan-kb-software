import { action, observable } from 'mobx'
import { BaseStore } from './baseStore'
import { mobxStore } from './store'
import { res } from '../res'
import { ReturnImageMSG, webImageService } from '../sdk/WebImageService'
import * as path from 'path'
import * as fs from 'fs'
import { equals } from 'ramda'
import { GifUtil } from 'gifwrap'
import { sdk } from '../sdk'
import { store } from '../UI/store'
import { CImage } from '../sdk/DB/entity/cimage'
import Jimp from "jimp"

export class ShareImageStore extends BaseStore {
    constructor() {
        super()
        // setTimeout(() => {
        //     when(() => mobxStore.pageStore.pageIndex === this.macrosPage, () => {
        //         this.autoRefresh()
        //     })
        //     reaction(() => mobxStore.deviceStore.currentDev, v => {
        //         this.autoRefresh()
        //     })
        // }, 100)

    }
    @observable currentShareImgListType: 'png' = 'png'
    @observable imagePageType: webImageService.ImgItemTab = 'hot'
    @observable imageShareList: webImageService.ImageShare[] = []
    @observable imagePageIndex: number = 1
    @observable imagePageCount = 1

    @observable imageIsReport: boolean = false
    @observable imageReportIndex: number | undefined
    @observable imageIsShare: boolean = false
    @observable isGIF: boolean = false
    @observable downBitImageIdArr: number[] = []
    @action.bound
    async getImgShareList(tab: webImageService.ImgItemTab, page: number) {
        if (tab === 'like' || tab === 'arts') {
            if (mobxStore.userStore.user === undefined) {
                mobxStore.toastStore.setInfo(res.text.请登录后尝试())
                return
            }
        }
        console.log('图片刷新刷新刷新!!!!!!!!')

        mobxStore.toastStore.setState('bussy', 'getSharedImageList')
        const v = await webImageService.getSharedImageList(tab, page)
        if (v.errCode !== 0) {
            mobxStore.toastStore.setState('idle', 'getSharedImageList')
            return
        }
        this.imagePageIndex = page
        this.imagePageCount = v.data.totle_count
        this.imagePageType = tab
        // 下载图片
        const imageP = path.join(__dirname, '..', 'downImage')
        if (!fs.existsSync(imageP))
            fs.mkdirSync(imageP)
        const files = fs.readdirSync(imageP)
        for (let i = 0; i < v.data.data.length; i++) {
            const t = v.data.data[i]
            if (t.bit_image !== undefined && !files.some(fv => t.bit_image !== undefined && equals(fv, t.bit_image.md5)))
                await webImageService.downloadImage(t.bit_image.md5)
        }
        this.imageShareList = [...v.data.data]
        mobxStore.toastStore.setState('idle', 'getSharedImageList')

        // this.doAsync(webImageService.getSharedImageList, async v => {
        //     if (v.errCode !== 0) return

        //     this.imagePageIndex = page
        //     this.imagePageCount = v.data.totle_count
        //     this.imagePageType = tab
        //     // 下载图片
        //     const imageP = path.join(__dirname, '..', 'downImage')
        //     if (!fs.existsSync(imageP))
        //         fs.mkdirSync(imageP)
        //     const files = fs.readdirSync(imageP)
        //     for (let i = 0; i < v.data.data.length; i++) {
        //         const t = v.data.data[i]
        //         if (t.bit_image !== undefined && !files.some(fv => t.bit_image !== undefined && equals(fv, t.bit_image.md5)))
        //             await webImageService.downloadImage(t.bit_image.md5)
        //     }

        //     this.imageShareList = [...v.data.data]
        // }, tab, page)
    }


    @action.bound
    evaluateImage(bit_image_id: number, score: -1 | 0 | 1) {
        if (mobxStore.userStore.user === undefined) {
            mobxStore.toastStore.setInfo(res.text.请登录后尝试())
            return
        }
        this.doAsync(webImageService.evaluateImage, async v => {
            if (v.errCode !== 0) return

            const index = this.imageShareList.findIndex(v => v.bit_image.id === bit_image_id)
            if (index === -1) return
            const imageShare = this.imageShareList[index]
            if (imageShare.my_score === 0 || imageShare.my_score === null) {
                if (score === -1) imageShare.dislike_count++
                if (score === 1) imageShare.like_count++
            }

            if (imageShare.my_score === 1) {
                imageShare.like_count--
                if (score === -1) imageShare.dislike_count++

                if (this.imagePageType === 'like')
                    this.imageShareList.splice(index, 1)
            }

            if (imageShare.my_score === -1) {
                imageShare.dislike_count--
                if (score === 1) imageShare.like_count++
            }

            imageShare.my_score = score
            if (this.imagePageCount !== 1 && this.imagePageType === 'like') {
                if (this.imageShareList.length !== 0) {
                    await this.getImgShareList(this.imagePageType, this.imagePageIndex)
                }

                if (this.imageShareList.length === 0 && this.imagePageIndex !== 1) {
                    await this.getImgShareList(this.imagePageType, this.imagePageIndex - 1)
                }
            }
        }, bit_image_id, score)
    }

    @action.bound
    async bitImage2Canvas(bit_image_id: number, add: boolean) {
        const imageShare = this.imageShareList.find(v => v.bit_image.id === bit_image_id)
        if (imageShare === undefined) return
        mobxStore.toastStore.setGIFState('bussy', 'file2Canvas')
        const p = path.join(__dirname, '..', 'downImage', imageShare.bit_image.md5)
        if (imageShare.bit_image.screen_type === 'PNG') {
            let img: Jimp | undefined
            try {
                img = await Jimp.read(p)
            } catch (e) {
                console.error("eeee: ", e);
                mobxStore.toastStore.setInfo(res.text.不支持该图片格式());
                mobxStore.toastStore.setGIFState('idle', 'file2Canvas')
                return
            }
            if (img === undefined) return
            await mobxStore.drawStore.img2DrawArr(img)
            // mobxStore.drawStore.currentDrawArr = fs.readFileSync(p)

            mobxStore.drawStore.saveCurrentDrawArr()
        } else {
            const inputGif = await GifUtil.read(p)
            if (inputGif.frames[0].delayCentisecs * 10 > 255)
                mobxStore.drawStore.setFrameDelay(255)
            else
                mobxStore.drawStore.setFrameDelay(inputGif.frames[0].delayCentisecs * 10)
            mobxStore.drawStore.setSeletIndex(0)
            await mobxStore.drawStore.gifCut2AllDrawArr(inputGif)
        }

        if (add) {
            imageShare.bit_image.download_times++
            this.downBitImageIdArr.push(bit_image_id)
        }
        mobxStore.toastStore.setGIFState('idle', 'file2Canvas')
    }

    @action.bound
    async addBitImageDownloadTime(bit_image_id: number) {
        if (mobxStore.userStore.user === undefined) {
            mobxStore.toastStore.setInfo(res.text.请登录后尝试())
            return
        }
        if (this.downBitImageIdArr.some(v => v === bit_image_id)) {
            await this.bitImage2Canvas(bit_image_id, false)
            mobxStore.toastStore.setInfo(res.text.下载成功请返回画板模式查看())
            return
        }
        this.doAsync(webImageService.addBitImageDownloadTime, async v => {
            if (v.errCode !== 0) return
            await this.bitImage2Canvas(bit_image_id, true)
            mobxStore.toastStore.setInfo(res.text.下载成功请返回画板模式查看())
        }, bit_image_id)
    }

    @action.bound
    deleteBitImage(bit_image_id: number) {
        if (mobxStore.userStore.user === undefined) {
            mobxStore.toastStore.setInfo(res.text.请登录后尝试())
            return
        }
        this.doAsync(webImageService.deleteBitImage, async v => {
            if (v.errCode !== 0) return
            const index = this.imageShareList.findIndex(v => v.bit_image.id === bit_image_id)
            if (index !== -1) this.imageShareList.splice(index, 1)

            if (this.imagePageCount !== 1 && this.imagePageType === 'arts') {
                if (this.imageShareList.length !== 0) {
                    await this.getImgShareList(this.imagePageType, this.imagePageIndex)
                }

                if (this.imageShareList.length === 0 && this.imagePageIndex !== 1) {
                    await this.getImgShareList(this.imagePageType, this.imagePageIndex - 1)
                }
            }
        }, bit_image_id)
    }

    @action.bound
    reportBitImage(
        bit_image_id: number,
        type: string,
        description: string
    ) {
        if (mobxStore.userStore.user === undefined) {
            mobxStore.toastStore.setInfo(res.text.请登录后尝试())
            return
        }
        this.doAsync(webImageService.reportBitImage, v => {
            if (v.errCode !== 0) return
            mobxStore.toastStore.setInfo(res.text.举报成功())
        }, bit_image_id, type, description)
    }

    @action.bound
    shareBitImage(
        title: string,
        description: string,
        width: number,
        height: number,
        screen_type: string,
        image: Buffer
    ) {
        if (mobxStore.userStore.user === undefined) {
            mobxStore.toastStore.setInfo(res.text.请登录后尝试())
            return
        }
        this.doAsync(webImageService.shareBitImage, v => {
            if (v.errCode !== 0) return
            mobxStore.toastStore.setInfo(res.text.分享成功())
        }, title, description, width, height, screen_type, image)
    }

    @action.bound
    setImageIsReport(bool: boolean) {
        mobxStore.isKeyStore.setPopUpKey(bool)
        this.imageIsReport = bool
    }

    @action.bound
    setImageReportIndex(index: number | undefined) {
        this.imageReportIndex = index
    }

    @action.bound
    setImageIsShare(bool: boolean) {
        mobxStore.isKeyStore.setPopUpKey(bool)
        this.imageIsShare = bool
    }

    @action.bound
    setImageIsGIF(bool: boolean) {
        this.isGIF = bool
    }


    @observable localImageList = new Array<CImage>()

    @action.bound
    getLocalImageList() {
        this.doAsync(webImageService.getLocalImageList, v => {
            if (v)
                this.localImageList = [...v]
        })
    }

    @action.bound
    shareLocalImage(data: Buffer, type: 'png' | 'gif') {
        this.doAsync(webImageService.shareLocalImage, v => {
            if (v)
                this.localImageList.push(v)
        }, data, type)
    }

    @action.bound
    deleteLocalImage(id: number) {
        this.doAsync(webImageService.deleteLocalImage, v => {
            if (!v) return
            const index = this.localImageList.findIndex(lv => lv.id === id)
            this.localImageList.splice(index, 1)
        }, id)
    }

    @action.bound
    setLocalImageName(id: number, title: string) {
        this.doAsync(webImageService.setLocalImageName, v => {
            if (!v) return
            const i = this.localImageList.findIndex(v => v.id === id)
            if (i !== -1)
                this.localImageList[i].title = title
        }, id, title)
    }

    commonHandleErr = (err: any) => {
        mobxStore.toastStore.setErr(err)
    }
    commonHandleSuccess = async (v: any) => {
        const ret = v as ReturnImageMSG
        if (ret.errCode === 0) return

        if (ret.response !== undefined) {
            if (ret.response.status === 400 && ret.response.statusText === "Bad Request") {
                mobxStore.toastStore.setErr(res.text.请求过于频繁请稍候重试())
                return
            }
        }

        switch (ret.errMsg) {
            case '网络连接失败':
                mobxStore.toastStore.setErr(res.text.网络连接失败())
                break;
            case 'session错误':
                mobxStore.toastStore.setInfo(res.text.请登录后尝试())
                break;
            case 'remote server err':
                mobxStore.toastStore.setInfo('登录信息错误请登录后重试')
                await sdk.ioFunc
                    .userLogout()
                    .then((data) => {
                        if (data.errCode === 0)
                            store.setState.user_Name('')
                    })
                break;
            default:
                mobxStore.toastStore.setInfo(ret.errMsg)
                break;
        }
    }
}
