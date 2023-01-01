import { YZW_3098 } from "./yzw_3098"
import { defaultMatrix_yzw_k081t_dm } from "./yzw_k081t_dmMatrix"

export class YZW_K081T_DM extends YZW_3098 {
    defaultMatrix = defaultMatrix_yzw_k081t_dm
    DAZZLE = 8;
    NORMAL = 9;
    MAXSPEED = 4;
    COMMONCOLOR: { [key: number]: number } = {
        0: 0xff0000,
        1: 0xff5500,
        2: 0xffdd00,
        3: 0x00dd00,
        4: 0x00ff55,
        5: 0x0000ff,
        6: 0x5500ff,
        7: 0xffffff,
    };
}