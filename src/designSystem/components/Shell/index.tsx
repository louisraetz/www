import React, { useEffect, useRef } from 'react'
import { styled, theme } from '~designSystem/theme'
import ShellHeader from '~designSystem/components/Shell/ShellHeader'
import ShellInput from '~designSystem/components/Shell/ShellInput'
import useShell from '~lib/shellContext'
import ShellLn from '~designSystem/components/Shell/ShellLn'
import { Theme } from '~App'
import Flex from '~designSystem/components/Flex'
import { commandList } from '~lib/commands'
import { files } from '~lib/files'

const ShellContainer = styled('div', {
  width: 'calc(100% - 24px)',
  height: 'calc(100% - 24px)',
  margin: theme.sizes['3'],

  backgroundColor: theme.colors.TERMINAL_BACKGROUND,

  borderRadius: '10px',

  boxShadow: '0px 0px 14px 10px rgba(0, 0, 0, 0.25)',

  '@md': {
    margin: 'auto',

    width: '825px',
    height: '455px',
  },
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

  '.binary': {
    fontWeight: '600',
    color: theme.colors.TERMINAL_LABEL_TREE_COLOR,
  },

  '.social-link': {
    color: theme.colors.TERMINAL_LABEL_ACTIVE_COLOR,
  },
})

const Btn = styled('button', {
  borderRadius: '4px',
  border: '1px solid #ffffff',
  padding: '6px 8px',

  backgroundColor: theme.colors.TERMINAL_BACKGROUND,
  color: theme.colors.TERMINAL_LABEL_ACTIVE_COLOR,
})

const Shell: React.FC<{ t: Theme }> = ({ t }) => {
  const { log, sendCMD } = useShell()
  const shellRef = useRef<HTMLDivElement | null>(null)
  const shellHeaderRef = useRef<HTMLDivElement | null>(null)
  const shellBodyRef = useRef<HTMLDivElement | null>(null)
  const selectRef = useRef<HTMLSelectElement | null>(null)

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

  useEffect(() => {
    if (window.screen.width < 500) {
      alert(
        'Tackling UX correctly on an emulated shell on mobile is unfortunately ' +
          'very diffcult to do. For that reason Ive implemented helper buttons ' +
          'above the shell so you can use all commands without using the input. ' +
          'Please consider using the desktop version for a better experience',
      )
    }
  }, [])

  const commandMap = Object.entries(commandList).map(([cmd, _]) => cmd)
  const mobileCommands = [
    commandMap[0],
    commandMap[1],
    commandMap[2],
    commandMap[4],
    commandMap[6],
    commandMap[7],
    commandMap[8],
  ]

  return (
    <>
      <Flex
        css={{
          flexWrap: 'wrap',
          marginTop: 12,
          padding: '0px 12px',

          '@md': {
            display: 'none',
          },
        }}
        gap="2"
        align="center"
        justify="center"
      >
        {mobileCommands.map(cmd => (
          <Btn
            type="button"
            key={cmd}
            onClick={() => {
              if (cmd === 'cat') {
                sendCMD(`${cmd} ${selectRef.current?.value || 'profile'}`)
              } else {
                sendCMD(cmd)
              }
            }}
          >
            {cmd}
            {cmd === 'cat' && (
              <select
                style={{
                  marginLeft: 4,
                  background: 'transparent',
                  border: 'none',
                  color: '#FFF',
                }}
                ref={selectRef}
                onClick={e => {
                  e.stopPropagation()
                }}
                name="files"
                id="files"
              >
                {files.map(file => (
                  <option value={file.fileName}>{file.fileName}</option>
                ))}
              </select>
            )}
          </Btn>
        ))}
      </Flex>

      <ShellContainer ref={shellRef}>
        <ShellHeader ref={shellHeaderRef} t={t} />
        <ShellBody
          ref={shellBodyRef}
          css={{
            height: `calc(100% - ${
              (shellHeaderRef.current?.getBoundingClientRect().height || 20) +
              16
            }px)`,
          }}
        >
          {log.map(({ input, output }) => {
            return (
              <>
                {input && <ShellLn key={input}>{input}</ShellLn>}
                <p
                  key={output}
                  dangerouslySetInnerHTML={{
                    __html: output.replaceAll('\n', '<br />'),
                  }}
                />
              </>
            )
          })}
          <ShellInput />
        </ShellBody>
      </ShellContainer>
    </>
  )
}

export default Shell
