import { YC200Common } from "./YC200Common";
import { defaultMatrix_yc300_daxaM64 } from "./yc300_daxaM64Matrix";

export class YC300_DAXAM64 extends YC200Common {
    defaultMatrix = defaultMatrix_yc300_daxaM64
    COMMONCOLOR: { [key: number]: number } = {
        0: 0x55ffFF,
        1: 0xff0000,
        2: 0x00ff00,
        3: 0x0000ff,
        4: 0x5500ff,
        5: 0xffff00,
        6: 0xff5500,
        7: 0xffffff,

    };

}