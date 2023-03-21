/// <reference types="vite-plugin-svgr/client" />

import React, { useState, FocusEvent, KeyboardEvent, useRef } from 'react'
import { styled } from '@stitches/react'
import Fuse from 'fuse.js'
import FocusTrap from 'focus-trap-react'
import Flex from '~designSystem/components/Flex'
import { ReactComponent as ShellPrefix } from '~designSystem/svg/ShellPrefix.svg'
import { theme } from '~designSystem/theme'
import useShell from '~lib/shellContext'
import { mockFiles } from '~lib/commands'

const CMDInput = styled('span', {
  caretColor: theme.colors.TERMINAL_BACKGROUND,
  backgroundColor: theme.colors.TERMINAL_BACKGROUND,
  border: 'none',
  outline: 'none',

  '&::selection': { background: 'red' },

  color: theme.colors.TERMINAL_CURSOR_COLOR,
  width: 'fit-content',
})

const CMDCursor = styled('span', {
  color: theme.colors.TERMINAL_CURSOR_COLOR,
})

const CMDGhostInput = styled('input', {
  position: 'fixed',
  top: 0,
  left: 0,
  opacity: 0,
})

const ShellInput = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { sendCMD, memory } = useShell()
  const [value, setValue] = useState('')
  const [memoryCounter, setMemoryCounter] = useState<number>(0)
  const [matches, setMatches] = useState<string[]>([])

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    const { key, target } = e
    const val = (target as HTMLInputElement).value

    if (key === 'Tab' && val.length > 0) {
      const options = {
        isCaseSensitive: false,
        keys: [],
      }

      const fuse = new Fuse(mockFiles, options)
      const possibleMatches = fuse.search(val)
      setMatches(possibleMatches.map(fuseMatch => fuseMatch.item))
      if (possibleMatches[0].item != null) {
        setValue(possibleMatches[0].item)
      }
    }

    if (key === 'ArrowUp') {
      setValue(memory[memoryCounter])
      setMemoryCounter(p => {
        if (p === memory.length - 1) {
          return 0
        }
        return p + 1
      })
    }

    if (key === 'Enter') {
      sendCMD(val)
      setValue('')
    }
  }

  return (
    <FocusTrap active>
      <Flex direction="column">
        <Flex
          align="center"
          justify="start"
          gap="2"
          css={{ color: theme.colors.TERMINAL_CHEVRON_ACTIVE }}
        >
          <ShellPrefix />
          <Flex align="center" justify="start">
            <CMDInput>{value.replaceAll(' ', '\u00A0')}</CMDInput>
            <CMDCursor>█</CMDCursor>
          </Flex>

          <CMDGhostInput
            ref={inputRef}
            onKeyDown={handleKeyPress}
            autoFocus
            value={value}
            onChange={e => setValue(e.target.value)}
            onBlur={(e: FocusEvent<HTMLInputElement>) => e.target.focus()}
          />
        </Flex>
        <Flex>
          {matches.length > 0 && matches.map(match => <p>{match}</p>)}
        </Flex>
      </Flex>
    </FocusTrap>
  )
}

export default ShellInput
