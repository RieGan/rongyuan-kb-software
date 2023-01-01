import { YC500Common } from "./yc500Common";
import { defaultMatrix_yc500_rs1 } from "./yc500_rs1Matrix";

export class YC500_RS1 extends YC500Common {
    defaultMatrix = defaultMatrix_yc500_rs1
    COMMONCOLOR: { [key: number]: number } = {
        0: 0xff0000,
        1: 0x00ff00,
        2: 0x55ffff,
        3: 0x0000ff,
        4: 0xff4000,
        5: 0xff00ff,
        6: 0xffff00,
        7: 0xffffff,
    };
}