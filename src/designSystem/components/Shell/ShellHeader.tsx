import React, { ForwardedRef, forwardRef, HTMLAttributes } from 'react'
import { styled, theme } from '~designSystem/theme'

const ShellContainer = styled('div', {
  position: 'relative',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  width: '100%',
  backgroundColor: 'transparent',

  padding: '6px 8px 0px 8px',

  cursor: 'move',

  '&:hover': {
    '&::after': {
      width: '100%',
    },
  },

  '&::after': {
    transition: 'all 500ms ease-in-out',

    position: 'absolute',
    bottom: -6,
    left: 0,

    content: '',
    display: 'block',
    width: '0%',
    height: '0.5px',
    backgroundColor: '#342F3F',
  },
})

const OSControls = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '6px',

  '& > span': {
    display: 'block',

    width: '12px',
    height: '12px',
    borderRadius: '9999px',

    '&:hover': {
      cursor: 'pointer',
    },

    '&:nth-child(1)': {
      backgroundColor: theme.colors.TERMINAL_CLOSE,
    },
    '&:nth-child(2)': {
      backgroundColor: theme.colors.TERMINAL_MAXIMIZE,
    },
    '&:nth-child(3)': {
      backgroundColor: theme.colors.TERMINAL_MINIMIZE,
    },
  },
})

const ShellHeader = forwardRef(function ShellHeaderWithRef(
  _props: HTMLAttributes<HTMLDivElement>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <ShellContainer ref={ref} {..._props}>
      <OSControls>
        <span />
        <span />
        <span />
      </OSControls>
      <p
        style={{ marginRight: 'auto', marginLeft: 'auto', userSelect: 'none' }}
      >
        louisraetz@macbook:~
      </p>
    </ShellContainer>
  )
})

export default ShellHeader
