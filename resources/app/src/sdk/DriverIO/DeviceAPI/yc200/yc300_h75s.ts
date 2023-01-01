import { YC200Common } from "./YC200Common";
import { defaultMatrix_yc300_h75s } from "./yc300_h75sMatrix";

export class YC300_H75S extends YC200Common {
    defaultMatrix = defaultMatrix_yc300_h75s
    DAZZLE = 7;
    NORMAL = 8;
}