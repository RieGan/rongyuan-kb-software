import { YC200Common } from "./YC200Common";
import { defaultMatrix_yc300_s68 } from "./yc300_s68Matrix";


export class YC300_S68 extends YC200Common {
    defaultMatrix = defaultMatrix_yc300_s68
    DAZZLE = 7;
    NORMAL = 8;
}