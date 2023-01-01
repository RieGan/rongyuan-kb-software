import { YC500Common } from "./yc500Common";
import { defaultMatrix_yc500_dk67Pro2 } from "./yc500_dk67pro2Matrix";

export class YC500_DK67PRO2 extends YC500Common {
    defaultMatrix = defaultMatrix_yc500_dk67Pro2
    COMMONCOLOR: { [key: number]: number } = {
        0: 0xff0000,
        1: 0x00ff00,
        2: 0x0000ff,
        3: 0x55ffff,
        4: 0xff8000,
        5: 0xffff00,
        6: 0x8b00ff,
        7: 0xffffff,
    };
}