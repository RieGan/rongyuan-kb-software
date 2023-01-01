import { useObserver } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import { blockCloud } from '../../../../appConfig'
import { dj } from '../../../../dj'
import { useStore } from '../../../../mobxStore/store'
import { res } from '../../../../res'
import { Config } from '../../../../sdk/DB'
import { store } from '../../../store'
import { newConfigName } from '../../../utils/NameProvider'
import { OutsideAlerter } from '../../../utils/OutsideAlerter'
import { ConfigurationBox } from './ConfigurationBox'

export const Configuration = (props: {
  title: string
  setShareConfig: (config: Config) => void
}) => {
  const { title } = props

  const { configurationOpen, shareOpen } = store.useState(
    (v) => v.configurationOpen.shareOpen
  )

  const { configStore, deviceStore, pageStore, shareStore, isKeyStore, keySettingStore } = useStore()
  const { macroStore } = useStore()
  return useObserver(() => (
    <Fragment>
      <OutsideAlerter
        clickOutsideHandle={() => {

          isKeyStore.setIsSetFile(false)
        }}>
        <dj.View w={363} h={562} x={808} y={114} form={'配置页'}>
          <dj.FlexView
            w={363}
            h={61}
            justifyContent={'center'}
            alignItems={'center'}>
            <dj.Line y={61} lineColor={'UserCenter'} />
            <dj.Text relative h={22} type={'配置页标题'} text={title} />
          </dj.FlexView>
          <dj.FlexView w={363} h={18} y={76} justifyContent={'space-between'}>
            <dj.Button
              relative
              w={70}
              h={18}
              isHightLight={false}
              mode={'Bluer'}
              text={res.string.添加}
              clickHandle={() => {
                deviceStore.creatNewConfigToCurrentAndSave(
                  newConfigName(configStore.configList),
                  ''
                )
              }}
            />
            {!blockCloud && <dj.Button
              relative
              w={70}
              h={18}
              isHightLight={false}
              mode={'Bluer'}
              textAlign={'left'}
              text={res.string.热门}
              clickHandle={() => {
                macroStore.stoptHook()
                store.setState.configurationOpen(false)
                isKeyStore.setIsSetFile(false)
                pageStore.setPageIndex(shareStore.macrosPage)
                shareStore.setCurrentShareListType('config')
                shareStore.setShareListPage('config', 'count')
                shareStore.getConfigShareList('count', 0);
              }}
            />}
          </dj.FlexView>

          <dj.List
            w={363}
            h={450}
            y={105}
            itemCount={configStore.configList.length}
            scrollToIndex={0}
            itemSize={() => 70}
            renderItem={(i) => {
              return (
                <div>
                  <ConfigurationBox
                    key={configStore.configList[i].localId}
                    config={configStore.configList[i]}
                    configurationOpen={isKeyStore.isSetFile}
                    shareOpen={shareOpen}
                    onDelete={() => {
                      configStore.deleteConfig(configStore.configList[i])
                    }}
                    clickHandle={(event) => {
                      if (
                        deviceStore.currentConfig.localId ===
                        configStore.configList[i].localId
                      )
                        return

                      deviceStore.setCurrentConfig(configStore.configList[i])
                      event.stopPropagation()
                      store.setState.configurationOpen(false)
                      isKeyStore.setIsSetFile(false)
                    }}
                    sharConfigClick={async () => {
                      await configStore.getConfigListFormDBSync()
                      props.setShareConfig(configStore.configList[i])
                    }
                    }
                  />
                </div>
              )
            }}
          />
        </dj.View>
      </OutsideAlerter>

      {/* <dj.View w={130} h={25} x={992} y={54}>
        {''}
      </dj.View> */}
    </Fragment>
  ))
}
