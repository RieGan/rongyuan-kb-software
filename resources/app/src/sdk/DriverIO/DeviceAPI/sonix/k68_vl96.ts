import { K68 } from "./k68"
import { defaultMatrix_k68_vl96 } from "./k68_vl96Matrix"

export class K68_VL96 extends K68 {
    defaultMatrix = defaultMatrix_k68_vl96

    protected async _getKeyMatrix(profile?: number) {
        const b = Buffer.alloc(64)
        b[0] = 0x86
        b[1] = profile !== undefined
            ? profile
            : this.currentProfile
                ? this.currentProfile
                : 0
        const buf = await this.commomFeature(b)

        if (buf === undefined) return undefined
        let res = Buffer.alloc(0)
        for (let i = 0; i < 8; i++) {
            const b = await this.readFeatureCmd(10)
            //console.error('BBBBBB', i, b)
            if (b === undefined) throw '_getKeyMatrix !!!undefine'

            if (b != undefined) res = Buffer.concat([res, b])
        }
        return res
    }

}