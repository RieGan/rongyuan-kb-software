import { equals } from 'ramda'

export const valueForKey = <V, T extends { [key: string]: V }>(table: T, value: V) =>
    Object.keys(table).find(key => equals(table[key], value)) as (keyof T) | undefined

export const valueForIndex = <V, T extends { [key: number]: V }>(table: T, value: V) => {
    const n = Object.keys(table).find(key => equals(table[Number(key)], value))
    return n === undefined ? undefined : Number(n)
}