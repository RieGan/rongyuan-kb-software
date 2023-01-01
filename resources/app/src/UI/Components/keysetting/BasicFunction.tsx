import React, { Fragment } from 'react'
import { dj } from '../../../dj'
import { res } from '../../../res'
export const basicFunName: SpecialFuntion[] = [
  '播放器',
  '播放/暂停',
  '停止',
  '上一曲',
  '下一曲',
  '音量减',
  '音量大',
  '静音',
  '计算器',
  '邮件',
  '我的电脑',
  '搜索',
  '主页',
  '亮度加',
  '亮度减',
  '刷新',
  '缩小',
  '放大'
]

const showItems = {
  播放器: res.string.播放器,
  '播放/暂停': res.string.播放暂停,
  停止: res.string.停止,
  上一曲: res.string.上一曲,
  下一曲: res.string.下一曲,
  音量减: res.string.音量减,
  音量大: res.string.音量大,
  静音: res.string.静音,
  计算器: res.string.计算器,
  邮件: res.string.电子邮件,
  我的电脑: res.string.我的电脑,
  搜索: res.string.搜索,
  主页: res.string.主页,
  亮度加: res.string.亮度加,
  亮度减: res.string.亮度减,
  刷新: res.string.刷新,
  锁全键: res.string.锁全键,
  缩小:res.string.缩小,
  放大:res.string.放大,
}

// if (process.platform == 'darwin') {
//   //mac
//   ___items.push('呼出siri')
// }

export const BasicFunction = (p: {
  basic: SpecialFuntion | undefined
  setBasic: (basic: SpecialFuntion | undefined) => void
  oldValue: ConfigFunction | undefined
  forBidden: boolean
}) => {
  let changedText
  if (p.oldValue !== undefined) {
    changedText = showItems[p.oldValue.key as keyof typeof showItems] //p.oldValue.key
  }
 
  return (
    <Fragment>
      <dj.Text text={changedText} type={'已修改的按键值'} x={57} y={7} h={36} />
        < dj.List
          w={342}
          h={145}
          x={54}
          y={48}
          itemCount={basicFunName.length}
          scrollToIndex={0}
          itemSize={() => 30}
          renderItem={(i: number) => (
            <dj.CheckBox2
              relative
              key={i}
              h={32}
              type={'Normal'}
              text={showItems[basicFunName[i] as keyof typeof showItems]}
              checkState={p.basic === basicFunName[i] && !p.forBidden}
              clickHandle={() => {
                p.basic !== basicFunName[i]
                  ? p.setBasic(basicFunName[i])
                  : p.setBasic(undefined)
              }}
            />
          )}
        />
    </Fragment>
  )
}
