import React from 'react'
import styled from '@emotion/styled'

const TypeTable = {
  Default: {
    textAlgin: 'left',
    background: 'inherit',
    borderRadius: '0px',
    border: 'none',
  },
  密码: {
    textAlgin: 'left',
    background: 'inherit',
    borderRadius: '0px',
    border: 'none',
  },
  Center: {
    textAlgin: 'center',
    background: '#252525',
    borderRadius: '0px',
    border: 'none',
  },
  组合键按键: {
    background: '#252525',
    borderRadius: '2px',
    border: 'solid 1px #23f9e2',
    textAlgin: 'center',
  },
  宏按键: {
    background: 'transparent',
    borderRadius: '0px',
    border: 'transparent',
    textAlgin: 'center',
  },
  重命名: {
    background: '#252525',
    borderRadius: '2px',
    border: 'solid 1px #ff0000',
    textAlgin: 'left',
  },
} as const

const TextInputStyled = styled.div(
  (p: { type: keyof typeof TypeTable | undefined }) => ({
    width: '100%',
    height: '100%',
    '& input': {
      width: '100%',
      height: '100%',
      color: '#ffffff',
      outline: 'none',
      border: TypeTable[p.type || 'Default'].border,
      background: TypeTable[p.type || 'Default'].background,
      '::-webkit-input-placeholder': {
        textAlign: TypeTable[p.type || 'Default'].textAlgin,
      },
      borderRadius: TypeTable[p.type || 'Default'].borderRadius,
      textAlign: TypeTable[p.type || 'Default'].textAlgin,
      fontFamily: 'OpenSans-Regular',
    },
  })
)

export const TextInput = (p: {
  usePlaceholder: () => string
  type?: keyof typeof TypeTable
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  inputFocus?: () => void
  inputFinished?: () => void
  autoFocus?: boolean
}) => {
  const placeholder = p.usePlaceholder()
  return (
    <TextInputStyled type={p.type}>
      <input
        type={p.type === '密码' ? 'password' : 'text'}
        placeholder={placeholder}
        onChange={p.onChange}
        value={p.value}
        autoFocus={p.autoFocus}
        onFocus={p.inputFocus}
        onKeyUp={(e) => {
          p.type !== '组合键按键' &&
            p.inputFinished &&
            e.key === 'Enter' &&
            p.inputFinished()

          p.type === '组合键按键' && e.target.blur()
        }}
        onBlur={() => p.inputFinished && p.inputFinished()}
      />
    </TextInputStyled>
  )
}


const TextSetInputStyled = styled.div(
  (p: { type: keyof typeof TypeTable | undefined, forBidden: boolean }) => ({
    width: '100%',
    height: '100%',
    '& input': {
      width: '100%',
      height: '100%',
      color: p.forBidden ? '#ffffff' : '#6c6c6c',
      outline: 'none',
      border: p.forBidden ? TypeTable[p.type || 'Default'].border : "solid 1px #252525",
      background: TypeTable[p.type || 'Default'].background,
      '::-webkit-input-placeholder': {
        textAlign: TypeTable[p.type || 'Default'].textAlgin,
      },
      borderRadius: TypeTable[p.type || 'Default'].borderRadius,
      textAlign: TypeTable[p.type || 'Default'].textAlgin,
      fontFamily: 'OpenSans-Regular',
    },
  })
)
export const TextSetInput = (p: {
  usePlaceholder: () => string
  type?: keyof typeof TypeTable
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  inputFocus?: () => void
  inputFinished?: () => void
}) => {
  const placeholder = p.usePlaceholder()
  const forBidden = p.disabled
  return (
    <TextSetInputStyled type={p.type} forBidden={p.disabled ? p.disabled : true}>
      <input
        type={p.type === '密码' ? 'password' : 'text'}
        placeholder={placeholder}
        disabled={!forBidden}
        onChange={p.onChange}
        value={p.value}
        onFocus={p.inputFocus}
        onKeyUp={(e) => {
          p.type !== '组合键按键' &&
            p.inputFinished &&
            e.key === 'Enter' &&
            p.inputFinished()

          p.type === '组合键按键' && e.target.blur()
        }}
        onBlur={() => p.inputFinished && p.inputFinished()}
      />
    </TextSetInputStyled>
  )
}