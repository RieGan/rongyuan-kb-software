import { YZW_LP87_DM } from "./yzw_lp87_dm"
import { defaultMatrix_yzw_mk970 } from "./yzw_mk970Matrix"

export class YZW_MK970 extends YZW_LP87_DM {
    defaultMatrix = defaultMatrix_yzw_mk970
    DAZZLE = 7
    NORMAL = 8
}