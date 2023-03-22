import React, { useEffect, useRef } from 'react'
import { styled, theme } from '~designSystem/theme'
import ShellHeader from '~designSystem/components/Shell/ShellHeader'
import ShellInput from '~designSystem/components/Shell/ShellInput'
import useShell from '~lib/shellContext'
import ShellLn from '~designSystem/components/Shell/ShellLn'

const ShellContainer = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,

  margin: 'auto',

  width: '825px',
  height: '455px',
  backgroundColor: theme.colors.TERMINAL_BACKGROUND,

  borderRadius: '10px',

  boxShadow: '0px 0px 14px 10px rgba(0, 0, 0, 0.25)',
})

const ShellBody = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  overflow: 'overlay',

  '&::-webkit-scrollbar': {
    display: 'none',
  },

  backgroundColor: 'transparent',
  width: 'calc(100% - 16px)',
  height: 'calc(100% - 16px)',

  margin: '8px',
})

const ShellWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  minHeight: '100%',
  height: '100%',

  '.binary': {
    fontWeight: '600',
    color: theme.colors.TERMINAL_LABEL_TREE_COLOR,
  },
})

const Shell = () => {
  const { log } = useShell()
  const shellRef = useRef<HTMLDivElement | null>(null)
  const shellHeaderRef = useRef<HTMLDivElement | null>(null)
  const shellBodyRef = useRef<HTMLDivElement | null>(null)

  /*
   * Prefer js here instead of row reversing the layout with css which causes
   * some headaches
   * */
  useEffect(() => {
    const el = shellBodyRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [log])

  /* function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = e.target as HTMLDivElement

    const initialMouseX = e.clientX - el.getBoundingClientRect().left
    const initialMouseY = e.clientY - el.getBoundingClientRect().top

    el.addEventListener('mousemove', evt => {
      el.style.top = `${evt.clientY - initialMouseY}px`
      el.style.left = `${evt.clientX - initialMouseX}px`
    })
  } */

  return (
    <ShellContainer
      ref={shellRef}
      // onMouseDown={handleMove}
    >
      <ShellHeader ref={shellHeaderRef} />
      <ShellBody
        ref={shellBodyRef}
        css={{
          height: `calc(100% - ${
            (shellHeaderRef.current?.getBoundingClientRect().height || 20) + 16
          }px)`,
        }}
      >
        {log.map(({ input, output }) => (
          <>
            {input && <ShellLn>{input}</ShellLn>}
            <p
              dangerouslySetInnerHTML={{
                __html: output.replaceAll('\n', '<br />'),
              }}
            />
          </>
        ))}
        <ShellInput />
      </ShellBody>
    </ShellContainer>
  )
}

export default Shell
