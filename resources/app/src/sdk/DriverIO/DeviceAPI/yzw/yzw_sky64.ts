import { YZW_3098 } from "./yzw_3098";
import { defaultMatrix_yzw_mk1064 } from "./yzw_mk1064Matrix";


export class YZW_SKY64 extends YZW_3098 {
    defaultMatrix = defaultMatrix_yzw_mk1064
    DAZZLE = 8;
    NORMAL = 9;
    COMMONCOLOR: { [key: number]: number } = {
        0: 0x00c8c8,
        1: 0xff0000,
        2: 0x00ff00,
        3: 0x0000ff,
        4: 0x4400ff,
        5: 0xffff00,
        6: 0xffa500,
        7: 0xffffff,
    };

}