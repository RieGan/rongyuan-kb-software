import React, { Fragment } from 'react'

import { TreeView } from './TreeView'
import { MacroRecordArea } from './MacroRecordArea'
import { dj } from '../../../../dj'

export const MacroFile_Ajazz = () => {
  return (
    <Fragment>
      <dj.View w={695} h={485} y={115} x={435}>
        <MacroRecordArea />
      </dj.View>
      <dj.View w={321} h={485} y={115} x={68}>
        <TreeView />
      </dj.View>
    </Fragment>
  )
}
