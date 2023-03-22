import React, { ForwardedRef, forwardRef, HTMLAttributes } from 'react'
import { styled, theme } from '~designSystem/theme'
import Flex from '~designSystem/components/Flex'
import { Theme } from '~App'

const ShellContainer = styled('div', {
  position: 'relative',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  width: '100%',
  height: theme.sizes['6'],
  backgroundColor: theme.colors.TERMINAL_BACKGROUND_HEADER,

  color: theme.colors.TERMINAL_LABEL_TITLE_COLOR,

  borderTopRightRadius: theme.sizes['2_5'],
  borderTopLeftRadius: theme.sizes['2_5'],

  variants: {
    theme: {
      linux: {
        height: theme.sizes['10'],
        fontFamily: 'Cypher',
        fontSize: '14px',
        padding: '0px 16px',
      },
      macos: {
        padding: '0px 8px',
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
      },
    },
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
  _props: HTMLAttributes<HTMLDivElement> & { t: Theme },
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <ShellContainer ref={ref} {..._props} theme={_props.t}>
      {_props.t === Theme.MAC ? (
        <OSControls>
          <span />
          <span />
          <span />
        </OSControls>
      ) : (
        <div style={{ width: 78 }} />
      )}

      <p
        style={{ marginRight: 'auto', marginLeft: 'auto', userSelect: 'none' }}
      >
        louisraetz@macbook:~
      </p>
      {_props.t === Theme.LINUX ? (
        <OSControls css={{ gap: 22 }}>
          <Flex
            css={{ borderBottom: '1px solid #FFFFFF', width: 9, height: 9 }}
          />
          <Flex css={{ border: '1px solid #FFFFFF', width: 9, height: 9 }} />
          <Flex
            css={{
              background: theme.colors.TERMINAL_CLOSE,
              borderRadius: 9999,
              width: 16,
              height: 16,
            }}
          />
        </OSControls>
      ) : (
        <div style={{ width: 48 }} />
      )}
    </ShellContainer>
  )
})

export default ShellHeader
