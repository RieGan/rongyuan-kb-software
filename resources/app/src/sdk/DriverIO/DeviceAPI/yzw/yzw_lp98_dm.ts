import { YZW_LP87_DM } from "./yzw_lp87_dm"
import { defaultMatrix_yzw_lp98_dm } from "./yzw_lp98_dmMatrix"

export class YZW_LP98_DM extends YZW_LP87_DM {
    defaultMatrix = defaultMatrix_yzw_lp98_dm
    DAZZLE = 7
    NORMAL = 8
}