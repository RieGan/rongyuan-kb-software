import ua from 'universal-analytics'
import { machineId } from 'node-machine-id'

import { DeviceType } from '../DB'
import { kAppVersion } from '../../appConfig'

let visitor: ua.Visitor

let visitorNew: ua.Visitor

//let visitorAll = ua('UA-175174086-3')
machineId().then(v => {
    console.log(v)
    visitor = ua('UA-175174086-1', v, { strictCidFormat: false })
    console.log(process.platform + ' ' + require('os').release())

    const plat = process.platform + ' ' + require('os').release()
    visitor.set('ua', plat)
    //visitor.set('uid', v)

    visitorNew = ua('UA-175174086-2', v, { strictCidFormat: false })
    visitorNew.set('ua', plat)
    //visitor.set('uid', v)

    //visitorAll.set('ua', plat)
    // visitor.set('uid', v)
})


export namespace GA {

    export const trackPage = (page: string) => {
        console.log('GGGAAAA', page)
        if (visitor === undefined) return
        visitor.pageview(page).send(v => { })

        if (visitorNew === undefined) return
        visitorNew.pageview(page).send(v => { })

        //visitorAll.pageview(page).send(v => { })
    }
    export const trackScreen = (screenName: string, appName: string, appVersion: string) => {
        if (visitor === undefined) return
        visitor.screenview(screenName, appName, appVersion).send()

        if (visitorNew === undefined) return
        visitorNew.screenview(screenName, appName, appVersion).send()

        //visitorAll.screenview(screenName, appName, appVersion).send()
    }

    export const trackEvent = (category: string, action: string, label?: string, value?: string | number, page?: string) => {
        if (visitor === undefined) return
        visitor.event(
            category,
            action,
        ).send((err, res, body) => {
            //console.log('111111111111111111112222222222222222', err, res, body)
        })

        if (visitorNew === undefined) return

        visitorNew.event(
            category,
            action,
        ).send((err, res, body) => {
            //console.log('111111111111111111112222222222222222', err, res, body)
        })

        //   visitorNew.event("Event Category", "Event Action").send()

        // visitorAll.event({
        //     ec: category,
        //     ea: action,
        //     el: label,
        //     ev: value,
        //     dp: page
        // })
    }
    //毫秒
    export const trackTime = (category: string, value: string, time: number, label?: string) => {
        if (visitor === undefined) return
        visitor.timing({
            utc: category,
            utv: value,
            utt: time,
            utl: label
        }).send()

        if (visitorNew === undefined) return
        visitorNew.timing({
            utc: category,
            utv: value,
            utt: time,
            utl: label
        }).send()

        // visitorAll.timing({
        //     utc: category,
        //     utv: value,
        //     utt: time,
        //     utl: label
        // })
    }


    export const gaDevice = (dev: DeviceType) => {
        const name = localStorage.getItem(dev.name!)

        const version = localStorage.getItem('gaversion')
        if (version != kAppVersion) {
            GA.trackEvent('appVersion', kAppVersion)
            localStorage.setItem('gaversion', kAppVersion)
        }
        if (name === '3') return
        GA.trackEvent(dev.company, dev.name! + '_' + dev.version!, JSON.stringify(dev))

        //GA.trackTime('设备', dev.company, 1, dev.name! + '_' + dev.version!,)
        localStorage.setItem(dev.name!, '3')
    }
}