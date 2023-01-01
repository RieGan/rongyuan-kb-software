import { supportDev } from "../supportDev";

export const getDevLayer = (devId: number): number => {
    const dev = supportDev.find(v => v.id === devId)

    return dev?.layer === undefined ? 0 : dev.layer
}

export const getDevFnLayer = (devId: number): number => {
    const dev = supportDev.find(v => v.id === devId)

    return dev?.fnLayer === undefined ? 0 : dev.fnLayer
}

export const getDevName = (devId: number): string => {
    const dev = supportDev.find(v => v.id === devId)

    return dev?.name === undefined ? '' : dev.name
}