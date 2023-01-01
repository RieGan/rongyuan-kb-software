import { configure } from "mobx"
import { ReturnMSG } from "../sdk/WebService"
import { mobxStore } from "./store"

configure({ enforceActions: 'never' }) // 不允许在动作之外进行状态修改
export class BaseStore {

    //你自己用你自己的 IO DB Driver 函数 也不好用啊  


    // DB函数 错误抛出异常 有的还返回 bool   
    // webservcie函数 返回一个 ReturnMSG errCode 判断成功
    // Drive 函数异步返回一个 可空类型 判断成功？？
    // 你怎么不搞100个类型啊？
    // 太垃圾了、、


    //知道为啥要给 所有的 IO函数 定义成一个类型了吗 IOFunc  
    // protected webserviceFuncCompose
    // protected DBFuncCompose
    // protected DriverFuncCompose

    // protected webserviceFuncDoAsync
    // protected DBFuncDoAsync
    // protected DriverFuncDoAsync

    // protected webserviceFuncPipe
    // protected DBFuncPipe
    // protected DriverFuncPipe

    // protected webserviceFuncBind
    // protected DBFuncBind
    // protected DriverFuncBind

    protected commonHandleSuccess = (param: any) => {

    }
    protected commonHandleErr = (err: any) => {
    }

    protected doAsync<F extends IO函数>(func: F, sucess: (v: IO函数异步返回<F>) => any, ...param: Parameters<F>) {
        return new Promise(resolve => {
            // console.error("func::::", func);

            const sender = new Date().getTime().toString()
            mobxStore.toastStore.setState('bussy', sender)
            func(...param).then(v => {
                // console.error("func11111::::", func);
                mobxStore.toastStore.setState('idle', sender)
                this.commonHandleSuccess(v)

                sucess(v)
                resolve(v)
            }).catch(err => {
                mobxStore.toastStore.setState('idle', sender)
                console.log('doAsync catch error:', func, 'Error:', err)
                this.commonHandleErr(err)
                resolve(err)
            })
        })

    }
    /*
        protected ioFuncCompose<F extends IO函数_重复之_webservice函数>(func: F, sucess: (v: IO函数_重复之_webservice_成功返回<F>) => any) {
            return (...p: Parameters<F>) => this.doAsync(func, (v: any) => {
                if (v.errCode !== 0) {
                    this.state = 'error'
                    return
                }
                sucess(v.data)
            }, ...p)
        }
        protected ioFunc重复之DBCompose<F extends IO函数>(func: F, sucess: (v: IO函数异步返回<F>) => any) {
            return (...p: Parameters<F>) => this.doAsync(func, sucess, ...p)
        }*/

}

type IO函数 = (...args: any[]) => Promise<any>
type IO函数异步返回<T extends IO函数> = T extends (...args: any[]) => Promise<infer R> ? R : any

type IO函数_重复之_webservice函数 = (...args: any[]) => Promise<ReturnMSG<any>>
type IO函数_重复之_webservice_成功返回<T extends IO函数_重复之_webservice函数> = T extends (...args: any[]) => Promise<ReturnMSG<infer R>> ? R : any
