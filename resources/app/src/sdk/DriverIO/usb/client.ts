import * as grpc from "@grpc/grpc-js";
import { equals } from "ramda";
import { DriverGrpcClient } from "../proto/driver_grpc_pb";
import { Empty, ReadMsg, SendMsg, SetLight, SystemInfo } from "../proto/driver_pb";

const port = 3814
export const client = new DriverGrpcClient('[::]:' + port, grpc.credentials.createInsecure());

export const sendMsg: (devicePath: string, buf: Buffer, checkSumType: 0 | 1 | 2, dangledevtype: 0 | 1 | 2) => Promise<boolean> =
    (devicePath: string, buf: Buffer, checkSumType: 0 | 1 | 2, dangledevtype: 0 | 1 | 2) => {
        return new Promise((resolve, _reject) => {
            const msg = new SendMsg();
            msg.setDevicepath(devicePath)
            msg.setMsg(buf)
            msg.setChecksumtype(checkSumType)
            msg.setDangledevtype(dangledevtype)
            client.sendMsg(msg, (err, res) => {
                if (res) {
                    const rs = res.toObject()
                    const bol = equals(rs.err, '')
                    // console.log("path: ", devicePath);
                    // console.log("sendMsgsendMsg:", buf[0].toString(16), bol ? bol : rs.err);
                    const str = dangledevtype === 1
                        ? ' dangle key'
                        : dangledevtype === 2
                            ? ' dangle mouse'
                            : ''
                    console.log("sendMsgsendMsg:", bol ? bol + str : rs.err);
                    resolve(bol)
                    return
                }
                if (err)
                    console.error("sendMsg error: ", err);
                resolve(false)
            })
        })
    }

export const readMsg: (devicePath: string) => Promise<Buffer | undefined> =
    (devicePath: string) => {
        return new Promise((resolve, _reject) => {
            const msg = new ReadMsg();
            msg.setDevicepath(devicePath)

            client.readMsg(msg, (err, res) => {
                if (err) console.error("readMsg error: ", err);

                if (res) {
                    // const rerr = res.getErr()
                    const buf = res.getMsg_asU8()
                    // console.error("ReadMsg: ", buf, rerr)
                    resolve(Buffer.from(buf))
                } else {
                    resolve(undefined)
                }
            })
        })
    }

export const setLightType = (devicePath: string, value: 0 | 1 | 2, screenID: number = 0, dangledevtype: 0 | 1 | 2 = 0) => {
    return new Promise((resolve, _reject) => {
        const setLight = new SetLight()
        setLight.setDevicepath(devicePath)
        setLight.setLighttype(value)
        setLight.setScreenId(screenID)
        setLight.setDangledevtype(dangledevtype)

        let str = ''
        switch (value) {
            case 2:
                str = '!!!!! ====> stop send data'
                break;
            case 1:
                str = '&&&&& ====> start send screen data'
                break;
            case 0:
                str = '##### ====> start send music data'
                break;
            default:
                break;
        }
        switch (dangledevtype) {
            case 2:
                str = str + ' Dangle Mouse'
                break;
            case 1:
                str = str + ' Dangle Keyboard'
                break;
            case 0:
                str = str + ' Dev'
                break;
            default:
                break;
        }
        console.error(str);

        client.setLightType(setLight, err => {
            if (err) resolve(false)
            else resolve(true)
        })
    })
}

export const sendRawFeature: (devicePath: string, buf: Buffer, checkSumType: 0 | 1 | 2, dangledevtype: 0 | 1 | 2) => Promise<boolean> =
    (devicePath: string, buf: Buffer, checkSumType: 0 | 1 | 2, dangledevtype: 0 | 1 | 2) => {
        return new Promise((resolve, _reject) => {
            const msg = new SendMsg();
            msg.setDevicepath(devicePath)
            msg.setMsg(buf)
            msg.setChecksumtype(checkSumType)
            msg.setDangledevtype(dangledevtype)
            client.sendRawFeature(msg, (err, res) => {
                if (res) {
                    const rs = res.toObject()
                    const bol = equals(rs.err, '')
                    const str = dangledevtype === 1
                        ? ' dangle key'
                        : dangledevtype === 2
                            ? ' dangle mouse'
                            : ''
                    console.log("sendRawFeature:", bol ? bol + str : rs.err);
                    resolve(bol)
                    return
                }
                if (err)
                    console.error("sendRawFeature error: ", err);
                resolve(false)
            })
        })
    }

export const readRawFeature: (devicePath: string) => Promise<Buffer | undefined> =
    (devicePath: string) => {
        return new Promise((resolve, _reject) => {
            const msg = new ReadMsg();
            msg.setDevicepath(devicePath)

            client.readRawFeature(msg, (err, res) => {
                if (err) console.error("readRawFeature error: ", err);

                if (res) {
                    resolve(Buffer.from(res.getMsg_asU8()))
                } else {
                    resolve(undefined)
                }
            })
        })
    }
export const watchSystemInfo: () => Promise<SystemInfo.AsObject | undefined> =
    () => {
        return new Promise(async (resolve, _reject) => {
            client.watchSystemInfo(new Empty()).on('data', async res => {
                if (res === undefined) return resolve(undefined)
                return resolve(res.toObject())
            })
        })

    }
