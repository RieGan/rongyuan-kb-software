import { YC200Common } from "./YC200Common";
import { defaultMatrix_yc300_mk20 } from "./yc300_mk20Matrix";

export class YC300_MK20 extends YC200Common {
    defaultMatrix = defaultMatrix_yc300_mk20
    DAZZLE = 7;
    NORMAL = 8;
}