/// <reference types="vite-plugin-svgr/client" />

import React, { useState, KeyboardEvent, useRef, useEffect } from 'react'
import { styled } from '@stitches/react'
import Fuse from 'fuse.js'
import Flex from '~designSystem/components/Flex'
import { ReactComponent as ShellPrefix } from '~designSystem/svg/ShellPrefix.svg'
import { theme } from '~designSystem/theme'
import useShell from '~lib/shellContext'
import { autoCompleteSuggestions, destructureCommand } from '~lib/commands'

const CMDInput = styled('span', {
  caretColor: theme.colors.TERMINAL_BACKGROUND,
  backgroundColor: theme.colors.TERMINAL_BACKGROUND,
  border: 'none',
  outline: 'none',

  color: theme.colors.TERMINAL_CURSOR_COLOR,
  width: 'fit-content',
})

const CMDCursor = styled('span', {
  color: theme.colors.TERMINAL_CURSOR_COLOR,
})

const CMDGhostInput = styled('input', {
  position: 'fixed',
  top: -999,
  left: -999,
  opacity: 0,
})

const Binary = styled('p', {
  variants: {
    active: {
      true: {
        background: '#fff',
      },
    },
  },
})

const ShellInput = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { sendCMD, memory } = useShell()
  const [value, setValue] = useState('')
  const [memoryCounter, setMemoryCounter] = useState<number>(0)
  const [matches, setMatches] = useState<string[]>([])
  const [matchCounter, setMatchCounter] = useState<number>(-1)

  useEffect(() => {
    function evt() {
      const el = inputRef.current
      if (el) {
        el.focus()
      }
    }

    document.addEventListener('keydown', evt)

    return () => document.removeEventListener('keydown', evt)
  }, [])

  useEffect(() => {
    if (value.length === 0) {
      setMatchCounter(-1)
      setMatches([])
    }
  }, [value])

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    const { key, target } = e
    const val = (target as HTMLInputElement).value
    const { cmd, text } = destructureCommand(val)

    if (key === 'Tab' && matches.length === 0) {
      const options = {
        isCaseSensitive: false,
        minMatchCharLength: 2,
        threshold: 0.4,
        keys: [],
      }

      if (text) {
        const fuse = new Fuse(autoCompleteSuggestions, options)
        const possibleMatches = fuse.search(text)
        setMatches(possibleMatches.map(fs => fs.item))
      }
    } else if (key === 'Tab' && matches.length > 0) {
      setMatchCounter(p => {
        if (p === matches.length - 1) {
          setValue(matches[0])
          return 0
        }

        if (cmd) {
          setValue(`${cmd} ${matches[p + 1]}`)
        } else {
          setValue(matches[p + 1])
        }
        return p + 1
      })
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
          disabled={window.screen.width < 1024}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </Flex>
      <Flex gap="2">
        {matches.length > 0 &&
          matches.map((match, i) => (
            <Binary
              key={`key-${match}`}
              active={i === matchCounter}
              className="binary"
            >
              {match}
            </Binary>
          ))}
      </Flex>
    </Flex>
  )
}

export default ShellInput
