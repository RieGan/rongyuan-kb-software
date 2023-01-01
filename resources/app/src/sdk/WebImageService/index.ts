//全部web接口和本地数据库
import axios, { AxiosResponse } from 'axios'
// import { User, Config, Macro, DeviceType, CurrentConfig } from '../DB'
// import { detectSubject, devlistList } from '../DriverIO/usb/DetectSupportDevice'

// import { MouseInterface } from '../DriverIO/DeviceAPI/MouseInterface'
// import { KeyboardInterface } from '../DriverIO/DeviceAPI/KeyboardInterface'
// import { equals } from 'ramda'
// import { SessionUser } from '../DB/entity/session_user'
// import { Subject } from 'rxjs'
// import { GA } from '../GA/ga'
import moment from 'moment'
import { kCompany, kImageSeverAddr, kImageSeverDownLoadAddr } from '../../appConfig'
import { SessionUser } from '../DB'
// import { CreateDeviceByDeviceType } from '../DriverIO/DeviceAPI/DevFactory'
import * as fs from 'fs'
import * as path from 'path'
import zlib from 'zlib'
import request from 'request'
import { CImage } from '../DB/entity/cimage'
import { res } from '../../res'

// import AdmZip from 'adm-zip'
// import { appPath, kCompany, kSeverAddr } from '../../appConfig'
// import { Not } from 'typeorm'
// import { MusicLightConfig } from '../../res/lightLayout/rongyuanRGBLayout'
// import { mobxStore } from '../../mobxStore/store'
// import { sleep } from '../../unitys/timeFunc'
// import { setLightType } from '../DriverIO/usb/client'


moment.locale('zh-cn')
export type ReturnImageMSG<T = {}> =
  | {
    errCode: 0 //0是成功
    data: T
    response?: AxiosResponse<any>
  }
  | {
    errCode: -1
    errMsg: string
    response?: AxiosResponse<any>
  }

export type ReturnImageRequest<T = {}> =
  | {
    errCode: 0 //0是成功
    data: T
    response?: request.Response
  }
  | {
    errCode: -1
    errMsg: string
    response?: request.Response
  }

axios.defaults.adapter = require('axios/lib/adapters/http') //指定 使用 node

// const httpDownload = async (url: string): Promise<string> => {
//   try {
//     const res = await axios.get(kImageSeverDownLoadAddr + url)
//     return res.data
//   } catch(e) {
//     console.error("httpDownload EEE");

//   }
// }

const httpClient = async <T>(
  url: string,
  data?: any
): Promise<ReturnImageMSG<T>> => {
  // const session = await getSession()

  // const localCookie = session === undefined ? '' : session.session
  //console.log(JSON.stringify(data))
  console.log("httpClient: ", kImageSeverAddr + url, data);
  try {
    const res = await axios.post(
      kImageSeverAddr + url,
      data,
      {
        // cookie: localCookie,
        timeout: 8000,
      }
    )
    console.log(res)
    if (res.data.code !== 0)
      return {
        errCode: -1,
        errMsg: res.data.err_message,
        response: res
      }

    return {
      errCode: res.data.code,
      ...res.data,
      res
    }
  } catch (error: any) {
    console.log('EEERRRROOORRRR', error.toJSON())
    if (error.response) {
      return {
        errCode: -1,
        errMsg: error.response.data.toString(),
        response: error.response
      }
    } else {
      return {
        errCode: -1,
        errMsg: '网络连接失败',
      }
    }
    // if (error.response) {
    //   console.log('data', error.response.data);
    //   console.log('status', error.response.status);
    //   console.log('headers', error.response.headers);
    // } else if (error.request) {
    //   console.log('request', error.request);
    // } else {
    //   console.log('message', error.message);
    // }
    // console.log('config', error.config);
    // return {
    //   errCode: -1,
    //   errMsg: error.response.data.toString(),
    //   response: error.response
    // }
  }
}
export namespace webImageService {
  export type ImgItemTab = 'hot' | 'new' | 'like' | 'arts'

  export type BitImage = {
    id: number,
    title: string,
    download_times: number,
    description: string,
    width: number,
    height: number,
    screen_type: string,
    md5: string,
    create_at: {
      secs_since_epoch: number,
      nanos_since_epoch: number,
    },
    update_at: {
      secs_since_epoch: number,
      nanos_since_epoch: number,
    },
    user_id: number,
    company: string
  }

  export const getSession = async () => {
    const session = await SessionUser.getSession();

    if (session === undefined) return undefined;

    const s: { id: number, session: string, user_id: number } = {
      id: session.id,
      session: session.session,
      user_id: session.userId
    }

    const end = session.session.indexOf('; Path');
    if (end !== -1)
      s.session = session.session.slice(0, end)
    return s
  }

  export type ImageShare = {
    bit_image: BitImage,
    user_name: string,
    my_score: -1 | 0 | 1 | null,
    like_count: number,
    dislike_count: number,
    createdAt: string,
    updatedAt: string,
  }

  export const getSharedImageList = async (
    tab: ImgItemTab,
    page: number
  ) => {
    const session = await getSession()

    if (tab === 'like' || tab === 'arts') {
      if (session === undefined) {
        const err: ReturnImageMSG = {
          errCode: -1,
          errMsg: 'session错误',
        }
        return err
      }
    }

    const url = tab === 'like'
      ? '/user_likes'
      : tab === 'arts'
        ? '/user_bit_image_list'
        : '/list'

    const data = tab === 'like' || tab === 'arts'
      ? {
        page: page,
        per_page: 6,
        session: {
          session: session === undefined ? undefined : session.session,
          company: kCompany,
        }
      }
      : {
        page: page,
        per_page: 6,
        session: session === undefined ? undefined : session.session,
        company: kCompany,
        order_by_date: tab === 'new'
      }

    const res = await httpClient<{
      data: ImageShare[],
      totle_count: number,
    }>(url, data)
    console.log('res', res)
    if (res.errCode !== 0) return res
    let shareList = new Array<ImageShare>()
    for (let i = 0; i < res.data.data.length; i++) {
      const obj = res.data.data[i]
      const share = {
        bit_image: obj.bit_image,
        user_name: obj.user_name,
        my_score: tab !== 'like' ? obj?.my_score : 1,
        like_count: obj.like_count,
        dislike_count: obj.dislike_count,
        createdAt: '',
        updatedAt: '',
      }
      share.updatedAt = moment(obj.bit_image.update_at.secs_since_epoch * 1000).fromNow()
      share.createdAt = moment(obj.bit_image.create_at.secs_since_epoch * 1000).fromNow()

      shareList.push(share)
    }
    res.data.data = [...shareList]
    return res
  }

  export const downloadImage = async (fileName: string) => {
    const url = kImageSeverDownLoadAddr + '/' + fileName
    try {
      const res = await axios.get(url, {
        responseType: 'arraybuffer'
      })

      if (res.data) {
        const fileP = path.join(__dirname, '..', 'downImage', fileName)
        fs.writeFileSync(fileP, zlib.inflateRawSync(res.data))
      }

    } catch (e) {
      console.log("downloadImage:", url);
      console.log("downloadImage Err: ", e);
    }
  }

  export const evaluateImage = async (bit_image_id: number, score: -1 | 0 | 1) => {
    const session = await getSession()
    if (session === undefined) {
      const err: ReturnImageMSG = {
        errCode: -1,
        errMsg: 'session错误',
      }
      return err
    }
    const res = await httpClient('/like', {
      session: {
        session: session.session,
        company: kCompany,
      },
      score: score, // 1 0 -1
      bit_image_id: bit_image_id
    })
    console.log('res', res)
    return res
  }

  export const addBitImageDownloadTime = async (bit_image_id: number) => {
    const session = await getSession()
    if (session === undefined) {
      const err: ReturnImageMSG = {
        errCode: -1,
        errMsg: 'session错误',
      }
      return err
    }

    const res = await httpClient('/add_bit_image_download_count', {
      bit_image_id: bit_image_id
    })
    console.log('res', res)
    return res
  }

  export const deleteBitImage = async (bit_image_id: number) => {
    const session = await getSession()
    if (session === undefined) {
      const err: ReturnImageMSG = {
        errCode: -1,
        errMsg: 'session错误',
      }
      return err
    }

    const res = await httpClient('/delete_bit_image', {
      session: {
        session: session.session,
        company: kCompany,
      },
      bit_image_id: bit_image_id
    })
    console.log('res', res)
    return res
  }

  export const reportBitImage = async (
    bit_image_id: number,
    type: string,
    description: string,
  ) => {
    const session = await getSession()
    if (session === undefined) {
      const err: ReturnImageMSG = {
        errCode: -1,
        errMsg: 'session错误',
      }
      return err
    }

    const res = await httpClient('/report_bit_image', {
      session: {
        session: session.session,
        company: kCompany,
      },
      report_bit_image: {
        user_id: session.user_id,
        company: kCompany,
        bit_image_id: bit_image_id,
        report_type: type,
        description: description,
      }
    })
    console.log('res', res)
    return res
  }

  const httpRequest: <T>(
    url: string,
    data?: any
  ) => Promise<ReturnImageRequest<T>> = <T>(
    url: string,
    data?: any
  ) => {
      return new Promise(resolve => {
        console.log("httpRequest: ", kImageSeverAddr + url, data);
        const options: request.RequiredUriUrl & request.CoreOptions = {
          method: "POST",
          url: kImageSeverAddr + url,
          headers: {
            "Content-Type": "multipart/form-data"
          },
          timeout: 8000,
          formData: data
        };

        request(options, (err, res, body) => {
          if (err) {
            console.log('err: ', err);
            return resolve({
              errCode: -1,
              errMsg: err.toString(),
            })
          };
          console.log('res: ', res);
          console.log('body: ', body);
          try {
            const data = JSON.parse(body)
            if (data.code === 0) {
              return resolve({
                errCode: 0,
                data: data,
                response: res
              })
            } else {
              return resolve({
                errCode: -1,
                errMsg: data.err_message,
                response: res
              })
            }
          } catch (e) {
            console.log("EEEOOORRROORR: ", e);
            return resolve({
              errCode: -1,
              errMsg: body,
            })
          }
        })
      })
    }

  export const shareBitImage = async (
    title: string,
    description: string,
    width: number,
    height: number,
    screen_type: string,
    image: Buffer
  ) => {
    console.time('session')
    const session = await getSession()
    if (session === undefined) {
      const err: ReturnImageRequest = {
        errCode: -1,
        errMsg: 'session错误',
      }
      return err
    }
    console.timeEnd('session')

    console.time('share')
    const data = {
      'title': title,
      'description': description,
      'width': width,
      'height': height,
      'screen_type': screen_type,
      'user_id': session.user_id,
      'session': session.session,
      'company': kCompany,
      'image': image
    }


    const res = await httpRequest<{
      code: number,
      err_message: string,
      data: any
    }>('/share_bit_image', data)
    console.log('res', res)
    console.timeEnd('share')
    return res
  }

  export const getLocalImageList = async () => {
    return await CImage.createQueryBuilder('cimage').andWhere('(cimage.company is NULL OR cimage.company = :company)', {
      company: kCompany,
    }).getMany()
  }

  export const shareLocalImage = async (data: Buffer, type: 'png' | 'gif') => {
    const img = new CImage()
    img.title = res.text.未命名()
    img.company = kCompany
    img.create_at = new Date().getTime()
    img.data = data
    img.screen_type = type

    return await img.save()
  }

  export const deleteLocalImage = async (id: number) => {
    const img = await CImage.findOne({
      where: { id: id }
    })
    if (img === undefined) return false
    await CImage.remove(img)
    return true
  }

  export const setLocalImageName = async (id: number, title: string) => {
    const img = await CImage.findOne({
      where: { id: id }
    })

    if (img === undefined) return false
    img.title = title
    img.save()
    return true
  }

}
