
import { YZW_3098 } from "./yzw_3098";
import { defaultMatrix_yzw_gm884 } from "./yzw_gm884Matrix"

export class YZW_GM884 extends YZW_3098 {
    defaultMatrix = defaultMatrix_yzw_gm884
    DAZZLE = 8
    NORMAL = 9
    COMMONCOLOR: { [key: number]: number } = {
        0: 0xff0000,
        1: 0xff4400,
        2: 0xffff00,
        3: 0x00ff00,
        4: 0x00ff55,
        5: 0x0000ff,
        6: 0x7700ff,
        7: 0xffffff,
    };
}