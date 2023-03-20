import React, { useEffect } from 'react'
import { globalStyles } from '~designSystem/theme'

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
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="App">
      <h1>Vite + React</h1>
    </div>
  )
}

export default App
