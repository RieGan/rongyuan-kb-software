import { YZW_K219 } from "./yzw_k219";
import { defaultMatrix_yzw_k220 } from "./yzw_k220Matrix";

export class YZW_K220 extends YZW_K219 {
    defaultMatrix = defaultMatrix_yzw_k220
    // picsCount = Math.floor(this.defaultMatrix.length / 4 * 3 / 64) + 1//应该用ceil  固件没有对齐
    
}