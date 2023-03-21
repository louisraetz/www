import React, { useEffect } from 'react'
import { globalStyles } from '~designSystem/theme'
import Shell from '~designSystem/components/Shell'
import { ShellProvider } from '~lib/shellContext'

const App = () => {
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
    <div className="App">
      <ShellProvider>
        <Shell />
      </ShellProvider>
    </div>
  )
}

export default App
