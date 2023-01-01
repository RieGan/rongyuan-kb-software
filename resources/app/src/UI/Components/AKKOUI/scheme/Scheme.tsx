import React, { Fragment, useEffect } from 'react'

import { useObserver } from 'mobx-react-lite'
import { withProps } from '../../../utils/WithProps'
import { dj } from '../../../../dj'
import { useStore } from '../../../../mobxStore/store'
import { sleep } from '../../../../unitys/timeFunc'


interface ListItems {
  name: string | undefined
  describe: string
  deviceName: string | undefined
  userName: string | undefined
  time: string
  downloadTimes: number
  detail: string
}

const ListOfScheme = (p: {
  items: ListItems[]
  download: (index: number) => void

}) => {
  const { isKeyStore, shareStore } = useStore()
  return useObserver(() => {
    return (
      <Fragment>
        <dj.SchemeItem
          w={1100}
          h={40}
          x={60}
          y={120}
          form={'border_hj3_akko'}
          mode={'head'}
          name={'文件名称'}
          describe={'文件描述'}
          deviceName={'设备名称'}
          username={'用户名'}
          time={'时间'}
          downloadTimes={'下载量'}
          detail={'详细'}
          download={() => { }}
        />
        <dj.FlexView w={1100} h={400} x={60} y={170} flexDirection={'column'} form={'border_hj3_akko'}>
          {p.items.map((item, index: number) => (
            <dj.SchemeItem
              relative
              key={index}
              h={44}
              mode={'body'}
              isHightLight={isKeyStore.isLine === index}
              name={item.name}
              describe={item.describe}
              deviceName={item.deviceName}
              username={item.userName}
              time={item.time}
              downloadTimes={item.downloadTimes}
              detail={''}
              clickHandle={() => { isKeyStore.setIsline(index) }}
              download={async () => {
                p.download(index)
              }}
            />
          ))}

        </dj.FlexView>
      </Fragment>

    )
  })
}

interface ShareData {
  download: (index: number) => void
  count: number
  pageIndex: number
  rankyType: 'count' | 'time'
  setListType: () => void
  setData: (rankeyType: 'count' | 'time', index: number) => void
  listItems: ListItems[]
}

const CommonScheme = (p: { [P in keyof ShareData]: ShareData[P] }) => {
  const { shareStore } = useStore()


  return (
    <Fragment>
      <dj.View w={171} h={38} x={60} y={571}>
        <dj.Button
          w={85}
          mode={'Bluer_right_sort'}
          text={'最热'}
          isHightLight={p.rankyType === 'count'}
          clickHandle={() => {
            if (p.rankyType != 'count') {
              shareStore.setPageCount()
              p.setData('count', 0)
              // console.error('aaaaaaaaaaaaaaaaaaaaaa',p);
            }


          }}></dj.Button>
        <dj.Button
          w={85}
          x={86}
          mode={'Bluer_right_sort'}
          text={'最新'}
          isHightLight={p.rankyType === 'time'}
          clickHandle={() => {
            if (p.rankyType != 'time') {
              shareStore.setPageCount()
              p.setData('time', 0)
              // console.error('aaaaaaaaaaaaaaaaaaaaaa',p);
            }
          }}></dj.Button>
      </dj.View>
      {/* <dj.SearchBar w={408} h={30} x={484} y={32}></dj.SearchBar> */}
      <ListOfScheme items={p.listItems} download={p.download} />

      {
        p.listItems.length > 0 && <dj.PageList
          w={360}
          h={21}
          x={820}
          y={508}
          relative
          count={p.count}
          // pageIndex={p.rankyType === 'count' ? countP : timeP}
          currentPage={p.pageIndex}
          pageIndex={p.pageIndex}
          setPage={(index: number) => {
            p.setData(p.rankyType, index)
          }}
        />
      }
    </Fragment>
  )
}

const configData = () => {
  const { shareStore } = useStore()

  return useObserver<ShareData>(() => ({
    download: (index: number) =>
      shareStore.downloadSharedConfig(shareStore.configShareList[index]),
    count: shareStore.configPageCount,
    pageIndex: shareStore.configPageIndex,
    rankyType: shareStore.configPageType,
    setListType: () => shareStore.setCurrentShareListType('config'),
    setData: (rankeyType: 'count' | 'time', index: number) =>
      shareStore.getConfigShareList(rankeyType, index),
    listItems: shareStore.configShareList.map((value) => ({
      name: value.config.name,
      describe: value.describe,
      deviceName: value.config.deviceType?.displayName,
      userName: value.config.user?.name,
      time: value.createAt,
      downloadTimes: value.downloadTimes,
      detail: '',
    })),
  }))
}

const macroData = () => {
  const { shareStore } = useStore()
  return useObserver<ShareData>(() => ({
    download: (index: number) =>
      shareStore.downloadSharedMacro(shareStore.macroShareList[index]),
    count: shareStore.macrosPageCount,
    pageIndex: shareStore.macrosPageindex,
    rankyType: shareStore.macrosPageType,
    setListType: () => shareStore.setCurrentShareListType('macro'),
    setData: (rankeyType: 'count' | 'time', index: number) => shareStore.getMacroShareList(rankeyType, index),
    listItems: shareStore.macroShareList.map((value) => ({
      name: value.macro.name,
      describe: value.describe,
      deviceName: value.macro.deviceType?.name,
      userName: value.macro.user?.name,
      time: value.createAt,
      downloadTimes: value.downloadTimes,
      detail: '',
    })),
  }))

}

export const ConfigScheme = withProps(CommonScheme, configData)
export const MacroScheme = withProps(CommonScheme, macroData)
