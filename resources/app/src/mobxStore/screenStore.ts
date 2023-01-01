import { desktopCapturer } from 'electron'
import { observable, action } from 'mobx'
import { res } from '../res'
import { venderSubject } from '../sdk/DriverIO/DeviceAPI/DevFactory'
import { setLightType } from '../sdk/DriverIO/usb/client'
import { sleep } from '../unitys/timeFunc'

import { BaseStore } from './baseStore'
import { mobxStore } from './store'


const screenW = 1
const screenH = 1
const video = document.createElement('video');
const canvas = document.createElement('canvas')

export class ScreenStore extends BaseStore {
    constructor() {
        super()
    }
    @observable screenIndex: number = 0;
    @observable screenArr: string[] = new Array();
    @observable screenDataArray = new Uint8ClampedArray();
    @observable timer: NodeJS.Timeout | undefined
    @observable test: boolean = false
    @action.bound
    async start() {
        await sleep(1000)
        // this.stop()
        this.test = true
        desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
            for (const source of sources) {
                if (source.id.indexOf(this.screenArr[this.screenIndex]) !== -1) {
                    try {
                        const stream = await navigator.mediaDevices.getUserMedia({
                            audio: false,
                            video: {
                                mandatory: {
                                    chromeMediaSource: 'desktop',
                                    chromeMediaSourceId: source.id,
                                    minWidth: screenW * 10,
                                    maxWidth: screenW * 10,
                                    minHeight: screenH * 10,
                                    maxHeight: screenH * 10
                                }
                            } as MediaTrackConstraints
                        })
                        this.handleStream(stream)

                    } catch (e) {
                        this.handleError(e)
                    }
                    return
                }
            }
        })
    }

    @action.bound
    async handleStream(stream: MediaStream) {
        if (!video) return
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            if (this.timer) clearInterval(this.timer)
            video.play();
            if (!canvas) return
            const ctx = canvas.getContext('2d')
            if (!ctx) return
            if (this.timer) clearInterval(this.timer)
            this.timer = setInterval(() => {
                // console.error('STARTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
                if (mobxStore.toastStore.state === 'bussy') return
                if (this.test === false) return
                ctx.drawImage(video, 0, 0, screenW, screenH);
                const raw = ctx.getImageData(0, 0, screenW, screenH)
                this.screenDataArray = raw.data
                // console.log('data:', this.screenDataArray)

            }, 40)


        }

    }

    @action.bound
    handleError(e: any) {
        console.log(e)
    }

    @action.bound
    stop() {
        this.test = false
        if (this.timer) clearInterval(this.timer)
    }

    @action.bound
    async getScreenArr() {
        if (this.screenArr.length !== 0) return
        await desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
            sources.map((v, i) => {
                if (v.id.indexOf('screen') !== -1) {
                    const tmp = res.text.屏幕() + (i + 1)
                    if (this.screenArr.findIndex(v => v === tmp) === -1)
                        this.screenArr.push(res.text.屏幕() + (i + 1));
                }
            })
        })
    }

    @action.bound
    async setScreenIndex(index: number) {
        this.screenIndex = index;

        await mobxStore.deviceStore.startLight()
        // if (mobxStore.deviceStore.currentDev?.deviceType.devAddr)
        //     await setLightType(mobxStore.deviceStore.currentDev.deviceType.devAddr.toString(), 1, this.screenIndex)
    }
}