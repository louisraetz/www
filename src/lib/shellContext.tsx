import React, { useContext, useReducer } from 'react'
import {
  commandList,
  Commands,
  destructureCommand,
  isCommand,
} from '~lib/commands'

enum ShellAction {
  SEND_CMD = 'send_cmd',
  PUSH_MEMORY = 'push_memory',
  CLEAR = 'clear',
}

type Log = { input?: string; output: string }
type Memory = string

interface ShellState {
  log: Log[]
  memory: Memory[]
}

interface IShellContext extends ShellState {
  sendCMD: (cmd: string) => void
}

interface ShellPayload {
  [ShellAction.SEND_CMD]: Log
  [ShellAction.PUSH_MEMORY]: string
  [ShellAction.CLEAR]: boolean
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export type ShellActions =
  ActionMap<ShellPayload>[keyof ActionMap<ShellPayload>]

const ShellContext = React.createContext<IShellContext>({
  log: [],
  memory: [],
  sendCMD: () => {},
})

const reducer = (state: ShellState, action: ShellActions): ShellState => {
  const { type, payload } = action
  switch (type) {
    case ShellAction.SEND_CMD:
      return {
        ...state,
        log: [
          ...state.log,
          {
            input: payload.input,
            output: payload.output,
          },
        ],
      }
    case ShellAction.PUSH_MEMORY:
      return {
        ...state,
        memory: [payload, ...state.memory],
      }
    case ShellAction.CLEAR:
      return {
        ...state,
        log: [],
      }
    default:
      return state
  }
}

export const ShellProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, { log: [], memory: [] })

  function dispatchUnknownCommand(cmd: string) {
    dispatch({
      type: ShellAction.SEND_CMD,
      payload: {
        input: undefined,
        output: `zsh: command not found: ${cmd}`,
      },
    })
  }

  return (
    <ShellContext.Provider
      value={{
        log: state.log,
        memory: state.memory,
        sendCMD: command => {
          const { cmd, text } = destructureCommand(command)

          dispatch({ type: ShellAction.PUSH_MEMORY, payload: command })
          if (cmd === Commands.CLEAR) {
            dispatch({ type: ShellAction.CLEAR, payload: true })
          } else if (isCommand(cmd)) {
            dispatch({
              type: ShellAction.SEND_CMD,
              payload: {
                input: command,
                output: commandList[cmd].return(text),
              },
            })
          } else {
            dispatchUnknownCommand(cmd)
          }
        },
      }}
    >
      {children}
    </ShellContext.Provider>
  )
}

const useShell = (): IShellContext => {
  const context = useContext<IShellContext>(ShellContext)

  return context
}

export default useShell
