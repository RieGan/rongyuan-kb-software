import React from 'react'
import styled from '@emotion/styled'

const Un = styled.textarea({
  width: '100%',
  height: '100%',
  border: 0,
  outline: 0,
  fontSize: '13px',
  resize: 'none',
  background: 'transparent',
  color: '#fff',
  fontFamily: 'OpenSans-Regular',
  overflow: 'hidden scroll',
  '&::-webkit-scrollbar': {
    width: '6px',
  },

  '&::-webkit-scrollbar-thumb': {
    background: 'gray',
    borderRadius: '5px',
  },
})
const Un_akko = styled.textarea({
  width: '100%',
  height: '100%',
  border: 0,
  outline: 0,
  fontSize: '13px',
  resize: 'none',
  background: 'transparent',
  color: '#000',
  fontFamily: 'OpenSans-Regular',
  overflow: 'hidden scroll',
  '&::-webkit-scrollbar': {
    width: '6px',
  },

  '&::-webkit-scrollbar-thumb': {
    background: 'gray',
    borderRadius: '5px',
  },
})

const Edit = (p: {
  placeholder: string
  value: string
  setValue: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}) => {
  return (
    <textarea
      value={p.value}
      onChange={p.setValue}
      style={{
        width: '100%',
        height: '100%',
        border: 0,
        outline: 0,
        fontSize: '14px', //
        resize: 'none',
        background: '#EBE9F2', //
        color: '#7B7B7F', //
        fontFamily: 'OpenSans-Regular',
        borderRadius: '10px',
        paddingTop: '10px',
        paddingLeft: '10px',
      }}
      placeholder={p.placeholder}></textarea>
  )
}
const Unedit = (p: { placeholder: string }) => {
  return <Un_akko disabled={true} defaultValue={p.placeholder} />
}

//占位符 模式
export const TextArea = (p: {
  placeholder: string
  editble: boolean
  value?: string
  setValue?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}) => {
  return p.editble ? (
    <Edit
      placeholder={p.placeholder}
      value={p.value ? p.value : ''}
      setValue={p.setValue ? p.setValue : () => { }}
    />
  ) : (
    <Unedit placeholder={p.placeholder} />
  )
}
export const TextArea_akko = (p: {
  placeholder: string
  editble: boolean
  value?: string
  setValue?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}) => {
  return p.editble ? (
    <Edit
      placeholder={p.placeholder}
      value={p.value ? p.value : ''}
      setValue={p.setValue ? p.setValue : () => { }}
    />
  ) : (
    <Unedit placeholder={p.placeholder} />
  )
}
