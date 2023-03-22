import React, { useEffect, useState } from 'react'
import {
  globalStyles,
  linuxTheme,
  styled,
  theme as t,
} from '~designSystem/theme'
import Bootscreen from '~screens/Bootscreen'
import Shell from '~designSystem/components/Shell'
import { ShellProvider } from '~lib/shellContext'

export enum Theme {
  MAC = 'macos',
  LINUX = 'linux',
}

const Body = styled('div', {
  display: 'block',
  height: '100%',

  backgroundImage: t.colors.BACKGROUND,
  backgroundSize: 'cover',
})

const App = () => {
  /* i am too lazy rn to build a provider, its not nested any way so i just pass down
   * forgive me
   * */
  const [theme, setTheme] = useState<Theme | undefined>(undefined)

  globalStyles()

  useEffect(() => {
    /* TODO: Add functionality later to track command which got entered into the shell */
    let title = 'louisraetz@macbook:~ ▌'
    const interval = setInterval(() => {
      if (title.length === 22) {
        title = title.substring(0, title.length - 1)
      } else {
        title += '▌'
      }

      document.title = title
    }, 350)

    return () => clearInterval(interval)
  }, [])

  return (
    <Body className={theme === Theme.LINUX ? linuxTheme.toString() : ''}>
      {theme != null ? (
        <ShellProvider>
          <Shell t={theme} />
        </ShellProvider>
      ) : (
        <Bootscreen setTheme={setTheme} />
      )}
    </Body>
  )
}

export default App
