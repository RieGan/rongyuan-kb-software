import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import { dj } from '.'
import { res } from '../res'
import { useStore } from '../mobxStore/store'

const Select = styled.div((p: { isDisabled: boolean })=>({
  WebkitAppearance: 'none',
  border: '0 !important',
  cursor: 'pointer',
  fontSize: '12px',
  background:p.isDisabled?'#ff0000':'',
  width:'100%',
  height:25,
  '&:hover':{
    background: '#ff0000',
  }

}))

const Div = styled.div((p: { isDisabled: boolean }) => ({
  width: '100%',
  height: '100%',
}))

export const ComboBox_Ajazz = (props: {
  modes: string[]
  selectedValue?: string
  isDisabled?: boolean
  clickHandle:(index: number) => void
}) => {
  const { deviceStore } = useStore()
  return (
    <Fragment>
      {props.modes.map((value, index) => (
        <Select key={index} onClick={()=>{props.clickHandle(index)}} isDisabled={index===deviceStore.currentProfile}>
          <dj.Img imgBg={res.img.ajazzImg.folder.normal} w={18} h={14} y={6} x={27} relative/> 
          <dj.Text text={value} type={'描述'} x={51} h={25} y={-12} relative/>
        </Select>
      ))}
    </Fragment>
  )
}
