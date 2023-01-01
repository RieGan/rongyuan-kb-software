import { YC200Common } from "./YC200Common";
import { defaultMatrix_yc300_5108b_plus_uk } from "./yc300_5108b_plus_ukMatrix";
export class YC300_5108B_PLUS_UK extends YC200Common {
    defaultMatrix = defaultMatrix_yc300_5108b_plus_uk
    DAZZLE = 7;
    NORMAL = 8;
    COMMONCOLOR: { [key: number]: number } = {
        0: 0xff0000,
        1: 0x00ff00,
        2: 0x0000ff,
        3: 0xff8000,
        4: 0xff00ff,
        5: 0xffff00,
        6: 0xffffff,
    };
}