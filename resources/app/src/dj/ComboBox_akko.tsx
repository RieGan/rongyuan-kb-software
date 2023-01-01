import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import { dj } from '.'
import { res } from '../res'
import { useStore } from '../mobxStore/store'

const Select = styled.div((p: { isDisabled: boolean }) => ({
  WebkitAppearance: 'none',
  display: 'inline-block',
  cursor: 'pointer',
  fontSize: '12px',
  background: p.isDisabled ? '#7A6CAA' : '',
  color: p.isDisabled ? '#fff' : '#000',
  width: 135,
  height: 45,
  border: '1px solid #7A6CAA',
  textAlign: 'center',
  marginLeft: '10px',
  marginTop: '10px',
  borderRadius: '10px',
  '&:hover': {
    background: '#7A6CAA',
    color: '#fff'
  }

}))

const Div = styled.div((p: { isDisabled: boolean }) => ({
  width: '100%',
  height: '100%',
}))

export const ComboBox_akko = (props: {
  modes: string[]
  selectedValue?: string
  isDisabled?: boolean
  clickHandle: (index: number) => void
}) => {
  const { deviceStore } = useStore()
  return (
    <Fragment>
      {props.modes.map((value, index) => (
        <Select key={index} onClick={() => { props.clickHandle(index) }} isDisabled={index === deviceStore.currentProfile}>
          <dj.Text text={value} h={25} x={40} y={13} relative />
        </Select>
      ))}
    </Fragment>
  )
}

