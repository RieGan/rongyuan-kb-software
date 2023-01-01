import { YC500Common } from "./yc500Common";
import { defaultMatrix_yc500_nj81 } from "./yc500_nj81Matrix";

export class YC500_NJ81 extends YC500Common {
    defaultMatrix = defaultMatrix_yc500_nj81
    COMMONCOLOR: { [key: number]: number } = {
        0: 0xffffff,
        1: 0xff0000,
        2: 0x00ff00,
        3: 0x0000ff,
        4: 0xff8000,
        5: 0x55ffff,
        6: 0xff00ff,
        7: 0xff5500
    };

}