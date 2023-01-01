import { DeviceType } from "../../DB/entity/device_type"
import { Dk2017 } from "./dk2017"
import { K68 } from "./sonix/k68"
import { K68_ELITE } from "./sonix/k68_elite"
import { K68_G68 } from "./sonix/k68_g68"
import { K68_HF68 } from "./sonix/k68_hf68"
import { K68_HTK663 } from "./sonix/k68_htk663"
import { K68_HYEKYU } from "./sonix/k68_HYEKYU"
import { K68_K217 } from "./sonix/k68_k217"
import { K68_K219 } from "./sonix/k68_k219"
import { K68_K220 } from "./sonix/k68_k220"
import { K68_K223 } from "./sonix/k68_k223"
import { K68_K224 } from "./sonix/k68_k224"
import { K68_K237 } from "./sonix/k68_k237"
import { K68_K669 } from "./sonix/k68_k669"
import { K68_K84 } from "./sonix/k68_k84"
import { K68_K84_2M } from "./sonix/k68_k84_2m"
import { K68_K84_DM } from "./sonix/k68_k84_dm"
import { K68_KB61 } from "./sonix/k68_kb61"
import { K68_KG008 } from "./sonix/k68_kg008"
import { K68_KL } from "./sonix/k68_kl"
import { K68_KL68_DM } from "./sonix/k68_kl68DM"
import { K68_LP87 } from "./sonix/k68_lp87"
import { K68_M61_2M } from "./sonix/k68_m61_2m"
import { K68_M68 } from "./sonix/k68_m68"
import { K68_MAGNET } from "./sonix/k68_MAGNET"
import { K68_MG } from "./sonix/k68_mg"
import { K68_MHX } from "./sonix/k68_mhx"
import { K68_MK1 } from "./sonix/k68_mk1"
import { K68_SK1 } from "./sonix/k68_sk1"
import { K68_VL96 } from "./sonix/k68_vl96"
import { K68_VOYAGER68 } from "./sonix/k68_VOYAGER68"
import { K68_X90_3M } from "./sonix/k68_x90_3m"

export const findSonixDev = (dev: DeviceType, devName?: string) => {
    switch (devName) {
        case 'dk2017':
            return new Dk2017(dev)
        // sonix
        case 'k68':
            return new K68(dev)
        case 'k68_k84':
            return new K68_K84(dev)
        case 'k68_elite':
            return new K68_ELITE(dev)
        case 'k68_elite_pro':
            return new K68_ELITE(dev)
        case 'k68_kl':
            return new K68_KL(dev)
        case 'k68_mhx':
            return new K68_MHX(dev)
        case 'k68_hyekyu':
            return new K68_HYEKYU(dev)
        case 'k68_tk568':
            return new K68_MG(dev)
        case 'k68_vl96':
            return new K68_VL96(dev)
        case 'k68_kb61':
            return new K68_KB61(dev)
        case 'k68_m68':
            return new K68_M68(dev)
        case 'k68_k219':
            return new K68_K219(dev)
        case 'k68_k220':
            return new K68_K220(dev)
        case 'k68_voyager68':
            return new K68_VOYAGER68(dev)
        case 'k68_k217':
            return new K68_K217(dev)
        case 'k68_k84_2m':
            return new K68_K84_2M(dev)
        case 'k68_pro':
            return new K68(dev)
        case 'k68_magnet':
            return new K68_MAGNET(dev)
        case 'k68_sk1':
            return new K68_SK1(dev)
        case 'k68_lp87':
            return new K68_LP87(dev)
        case 'k68_kl68_dm':
            return new K68_KL68_DM(dev)
        case 'k68_mk1':
            return new K68_MK1(dev)
        case 'k68_k669':
            return new K68_K669(dev)
        case 'k68_k84_dm':
            return new K68_K84_DM(dev)
        case 'k68_x90_3m':
            return new K68_X90_3M(dev)
        case 'ek384':
            return new K68_K84_DM(dev)
        case 'meca_8x':
            return new K68_K84_DM(dev)
        case 'k68_hf68':
            return new K68_HF68(dev)
        case 'k68_k223':
            return new K68_K223(dev)
        case 'k68_k224':
            return new K68_K224(dev)
        case 'k68_kg008':
            return new K68_KG008(dev)
        case 'k68_g68':
            return new K68_G68(dev)
        case 'k68_m61_2m':
            return new K68_M61_2M(dev)
        case 'k68_k237':
            return new K68_K237(dev)
        case 'k68_htk663':
            return new K68_HTK663(dev)
        case 'common':
            return new K68(dev)
        default:
            return undefined
    }
}