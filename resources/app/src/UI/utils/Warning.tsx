import React, { Fragment } from 'react'
import { dj } from '../../dj'
import { res } from '../../res'

const ButtonType = {
  无取消按键: {
    isCancle: false,
    isCertain: true,
    justifyContent: 'center',
  },
  无取确定键: {
    isCancle: true,
    isCertain: false,
    justifyContent: 'center',
  },
  普通: {
    isCancle: true,
    isCertain: true,
    justifyContent: 'space-between',
  },
}

const TypeTable = {
  软件升级: {
    title: res.text.升级软件(),
    message: res.text.您的软件不是最新版本是否要进行软件升级(),
    certain: res.text.确定(),
    cancle: res.text.取消(),
    button: ButtonType['普通'],
  },
}

export const Warning = (p: {
  type: keyof typeof TypeTable
  cancleHandle?: () => void
  certainHandle?: () => void
}) => {
  return (
    <Fragment>
      <dj.View form={'背景页'} drag={true}>
        {''}
      </dj.View>
      <dj.View w={370} h={250} x={415} y={240} form={'弹出框'} drag={true}>
        <dj.Text
          h={25}
          x={0}
          y={19}
          type={'弹框标题'}
          text={TypeTable[p.type].title}
        />
        <dj.Line y={53} lineColor={'UserVerify'} />
        <dj.Text
          type={'启动页搜索'}
          h={80}
          y={80}
          text={TypeTable[p.type].message}
        />
        <dj.FlexView
          w={300}
          h={34}
          x={35}
          y={160}
          justifyContent={TypeTable[p.type].button.justifyContent}>
          {TypeTable[p.type].button.isCancle && (
            <dj.Button
              relative
              w={135}
              h={34}
              mode={'Border'}
              text={TypeTable[p.type].cancle}
              clickHandle={p.cancleHandle}
            />
          )}
          {TypeTable[p.type].button.isCertain && (
            <dj.Button
              relative
              w={135}
              h={34}
              mode={'Sparker'}
              text={TypeTable[p.type].certain}
              clickHandle={p.certainHandle}
            />
          )}
        </dj.FlexView>
      </dj.View>
    </Fragment>
  )
}