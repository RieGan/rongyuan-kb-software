import { sleep } from "../../../../unitys/timeFunc"
import { defaultMatrix_yzw_dk710b } from "./yzw_dk710bMatrix"
import { YZW_K68 } from "./yzw_k68"

export class YZW_DK710B extends YZW_K68 {
    defaultMatrix = defaultMatrix_yzw_dk710b
    BIGCMDDELAY = process.platform == 'darwin' ? 800 : 100
    MAXSPEED = 4
    protected async _getKeyMatrix(profile?: number) {
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_GET_KEYMATRIX
        b[1] = profile !== undefined
            ? profile
            : this.currentProfile
                ? this.currentProfile
                : 0

        let res = Buffer.alloc(0)
        for (let i = 0; i < 9; i++) {
            b[2] = i
            const buf = await this.commomFeature(b, 0)

            //if (buf === undefined) return undefined
            //const b1 = await this.readFeatureCmd(10)
            //console.error('BBBBBB', b, b[2])
            if (buf === undefined) throw '_getKeyMatrix !!!undefine'

            res = Buffer.concat([res, buf])
        }
        await sleep(300)
        return res
    }

    protected async _getFnKeyMatrix(fnidex: number) {
        const b = Buffer.alloc(64)
        b[0] = 0x90
        b[1] = fnidex
        let res = Buffer.alloc(0)
        for (let i = 0; i < 9; i++) {
            b[2] = i
            const buf = await this.commomFeature(b, 0)

            //if (buf === undefined) return undefined
            //const b1 = await this.readFeatureCmd(10)
            //console.error('BBBBBB', b, b[2])
            if (buf === undefined) throw '_getFnKeyMatrix !!!undefine'

            res = Buffer.concat([res, buf])
        }
        await sleep(300)
        return res
    }

    protected _getLightPic = async () => {
        const b = Buffer.alloc(64)
        b[0] = this.FEA_CMD_GET_USERPIC
        b[1] = 0



        let res = Buffer.alloc(0)



        for (let i = 0; i < 7; i++) {
            b[2] = i
            const buf = await this.commomFeature(b, 0)
            if (buf === undefined) return undefined

            res = Buffer.concat([res, buf])
            // console.error(' bbbbbbbBBBBBBBBBBBB BBB',b)
        }
        await sleep(300)
        return res
    }
}