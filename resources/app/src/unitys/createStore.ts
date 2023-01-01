import * as React from 'react'
import { Subject } from 'rxjs'
import { zipObj, mapObjIndexed } from 'ramda'

type Link<T> = { [P in keyof T]: Link<Omit<T, P>> }

export const createStore = <T extends { [key: string]: any }>(obj: T) => {
    const store: any = obj

    const subject = mapObjIndexed(() => new Subject(), store) as { [P in keyof T]: Subject<T[P]> }

    const setState = mapObjIndexed((subject, key) => (value: any) => {
        store[key] = value
        subject.next(value)
    }, subject) as { [P in keyof T]: (value: T[P]) => void }

    const useState = <R>(f: (v: Link<T>) => R): Omit<T, keyof R> => {
        let keys: string[] = []
        let p: any = new Proxy({}, {
            get: (_, k) => {
                keys.push(k as string)
                return p
            }
        })
        f(p)

        const ret = zipObj(keys, keys.map(key => {
            const [value, setValue] = React.useState(store[key])
            React.useEffect(() => {
                const subscription = subject[key].subscribe(setValue)
                return () => subscription.unsubscribe()
            })
            return value
        })) as any
        return ret
    }

    return {
        state: store as Readonly<T>,
        // subject,
        setState,
        useState,
    }
} 