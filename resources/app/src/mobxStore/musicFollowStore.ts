import { observable, action } from 'mobx'
import { equals } from 'ramda'
import { res } from '../res'
import { venderSubject } from '../sdk/DriverIO/DeviceAPI/DevFactory'
import { sleep } from '../unitys/timeFunc'


import { BaseStore } from './baseStore'
import { mobxStore } from './store'

const kBufferSize = 2048
let dd = 0;
let repeatNum = 0;
let timer: NodeJS.Timeout
export class MusicFollowStore extends BaseStore {

    constructor() {
        super()
        venderSubject.subscribe(v => {
            if (v.type === '切灯效' || v.type === '停止') {
                this.stop()
            }

            if (mobxStore.deviceStore.currentConfig.light) {
                if (mobxStore.deviceStore.currentConfig.light.type === 'LightMusicFollow'
                    || mobxStore.deviceStore.currentConfig.light.type === 'LightMusicFollow3'
                    || (mobxStore.deviceStore.currentConfig.light.type === 'LightMusicFollow2' && mobxStore.deviceStore.isMusicNative && process.platform !== 'darwin')) {
                    if (this.isMusicDevs)
                        this.start()
                }
            }
        })
    }

    @observable judgeDataArray = new Uint8Array();
    @observable musicDataArray = new Float32Array()
    @observable musicDelt = new Array<number>()
    @observable music2Delt = new Array<number>()
    @observable music3Delt = new Array<number>()
    @observable isStart = false
    private context: AudioContext | undefined
    private mediaStream: MediaStreamAudioSourceNode | undefined
    private trackTimer: NodeJS.Timeout | undefined

    isMusicDevs = false

    @action.bound
    async start() {
        await sleep(1000)
        console.error('STTARRRTTTTT')
        this.isStart = true
        if (this.context) return
        console.error('-------------------------------')
        clearTimeout(timer)

        this.isMusicDevs = await this.checkMusicDevs()

        if (!this.isMusicDevs) {
            if (mobxStore.toastStore.senders.findIndex(v => equals(v, 'musicStop')) === -1)
                mobxStore.toastStore.setState('bussy', 'musicStop')
            timer = setTimeout(async () => {
                if (mobxStore.toastStore.senders.findIndex(v => equals(v, 'musicStop')) !== -1) {
                    await this.musicStop()
                    mobxStore.toastStore.setState('idle', 'musicStop')
                }
            }, 1000)
            return
        } else {
            if (this.isStart) {
                this.start()
            }
        }

        try {
            console.error("startMusicstartMusicstartMusic");
            this.startMusic()
        } catch (e: any) {
            this.handleError(e.toString())
        }
        return
    }

    async musicStop() {
        await mobxStore.deviceStore.setLightSetting({
            type: "LightAlwaysOn",
            value: 1,
            rgb: 16729454,
            dazzle: true
        })
        this.stop()
        this.context = undefined
        if (this.trackTimer) clearInterval(this.trackTimer)
        mobxStore.toastStore.setErr(res.text.未检测到扬声器())
    }

    @action.bound
    stop() {
        this.isStart = false
    }

    async startMusic() {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                mandatory: {
                    chromeMediaSource: 'desktop',
                },
            },
            video: {
                mandatory: {
                    chromeMediaSource: 'desktop',
                }
            }
        } as MediaStreamConstraints)
        this.handleStream(stream)
    }

    async handleStream(stream: MediaStream) {
        if (this.trackTimer != undefined) clearInterval(this.trackTimer)
        //this.isStart = true
        this.context = new AudioContext()
        this.mediaStream = this.context.createMediaStreamSource(stream)
        var bufferSize = kBufferSize;
        const analyser = this.context.createAnalyser()
        // analyser.maxDecibels = -30
        // analyser.minDecibels = -150;
        analyser.smoothingTimeConstant = 0.4
        this.mediaStream.connect(analyser)
        analyser.fftSize = bufferSize;
        this.musicDataArray = new Float32Array(analyser.frequencyBinCount);
        this.judgeDataArray = new Uint8Array(analyser.frequencyBinCount);

        this.musicDelt = new Array<number>(analyser.frequencyBinCount);
        this.music2Delt = new Array<number>(analyser.frequencyBinCount);
        this.music3Delt = new Array<number>(analyser.frequencyBinCount);

        console.log('LLLEEEENNNNN', analyser.frequencyBinCount)
        // 旧音律1
        let tmpMusicArr = new Array<number>(analyser.frequencyBinCount);
        const musicFollowData = () => {
            this.musicDelt = [...this.judgeDataArray]
        }

        const musicFollow2Data = () => {
            let temp = [... new Array(13).fill(0), ...this.musicDataArray.slice(0, 30)]

            const min = Math.min(...temp)
            const max = -28//Math.max(...this.musicDataArray.slice(2, 23))

            const g = (max - min) / 6

            temp = temp.map(v => {
                const test = (v - min) / g < 0 ? 0 : (v - min) / g
                const asd = test === NaN ? 0 : test
                return asd
                // return (v - min) / g < 0 ? 0 : (v - min) / g
            })

            this.music2Delt = [...temp]
        }

        // 新音律1
        const musicFollowData3 = () => {
            const len = 100
            let delt: number[] = new Array(len)
            const tmp = this.judgeDataArray.slice(0, len)
            const min = Math.min(...tmp.slice(20, 40))
            for (let i = 0; i < len; i++) {
                delt[i] = tmp[i] - min
            }

            const max_delt = Math.max(...delt)

            const ccc = 0
            delt = delt.map(v => {
                // const num = v - min_delt
                // return num
                const tt = max_delt / (ccc + 6)
                const num = Math.round((v / tt) - ccc)

                // return num
                return num < 0
                    ? 0
                    : num > 6
                        ? 6
                        : num
            })


            const flag = 27
            this.music3Delt = [...delt.slice(flag, flag + 32)]
        }

        this.trackTimer = setInterval(async () => {
            try {
                //remote.getGlobal('setInterval')(() => {
                if (mobxStore.toastStore.state === 'bussy') return
                if (this.isStart === false) return
                //const temp = this.musicDataArray
                // const musicOldDataArray = temp
                this.judgeDataArray = new Uint8Array(this.judgeDataArray)
                this.musicDataArray = new Float32Array(this.musicDataArray)
                analyser.getByteFrequencyData(this.judgeDataArray)
                analyser.getFloatFrequencyData(this.musicDataArray);
                musicFollowData()
                musicFollow2Data()
                musicFollowData3()
                if (tmpMusicArr.toString() !== this.judgeDataArray.toString()) repeatNum = 0
                else {
                    if (tmpMusicArr.findIndex(v => v > 0) !== -1)
                        repeatNum += 1
                }
                tmpMusicArr = [...this.judgeDataArray]

                if (repeatNum >= 150) {
                    console.error("Repeatnum Exceeds 300, Judged As Switching Channel, Restart MusicFollow");
                    this.stop()
                    if (this.trackTimer) clearInterval(this.trackTimer)
                    repeatNum = 0
                    this.context = undefined
                    this.start()
                }

                dd++
                // Send 120000 data in 1 hour
                if (dd >= 12 * 120000 && this.trackTimer !== undefined) {
                    console.error('restart handleStream(stream)')
                    dd = 0
                    clearInterval(this.trackTimer)
                    this.startMusic()
                }
            } catch (e: any) {
                console.error('music follow send data error!!!!!!!');

                console.error('err: ', e.toString());

            }

        }, 30)
    }

    handleError(e: string) {
        console.log('音乐律动开启source错误', e)
    }

    checkMusicDevs = async () => {
        let stream: MediaStream
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    mandatory: {
                        chromeMediaSource: 'desktop',
                    },
                },
                video: {
                    mandatory: {
                        chromeMediaSource: 'desktop',
                    }
                }
            } as MediaStreamConstraints)

            const tmp = stream.getTracks().some(v => v.kind === 'audio')

            return tmp
        } catch (e) {
            console.error("checkMusicDevs Error: ", e);
            return false
        }

    }

    checkMediaDeviceInfo = async () => {
        let mediaDeviceInfo: MediaDeviceInfo[]
        try {
            mediaDeviceInfo = await navigator.mediaDevices.enumerateDevices()

            return mediaDeviceInfo.some(v => v.kind === 'audiooutput')
        } catch (e) {
            console.error("checkMediaDeviceInfo Error: ", e);
            return false
        }
    }

}