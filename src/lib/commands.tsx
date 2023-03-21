export enum Commands {
  ECHO = 'echo',
  HELP = 'help',
  LS = 'ls',
  CLEAR = 'clear',
}

type CommandProperties = {
  command: string
  description: string
  return: (cmd?: string) => string
}

export const mockFiles = [
  'profile.txt',
  'achievements.txt',
  'experience.txt',
  'tech_stack.txt',
  'languages.txt',
]

const commandList: { [key: string | Commands]: CommandProperties } = {
  [Commands.LS]: {
    command: 'ls',
    description:
      'ls lists files and directories, and their associated metadata, such as file size, ownership, and modification time. With no options, ls lists the files contained in the current directory, sorting them alphabetically.',
    return: () => `total 5
${mockFiles.map(
  file =>
    `-rw-r--r--@  1 louisraetz  staff     320 21 Jan 12:13 <span class='binary'>${file}</span>\n`,
)}
    `,
  },
  [Commands.CLEAR]: {
    command: 'clear',
    description: 'Clears the terminal window',
    return: () => '',
  },
  [Commands.ECHO]: {
    command: 'echo',
    description: 'Prompts a string to the shell',
    return: text => {
      if (text == null || text === '') {
        return '\u00A0'
      }
      return text
    },
  },
  [Commands.HELP]: {
    command: 'help',
    description: 'Usage: help -  lists all commands',
    return: () =>
      `
    __  __________    ____ 
   / / / / ____/ /   / __ \\
  / /_/ / __/ / /   / /_/ /
 / __  / /___/ /___/ ____/ 
/_/ /_/_____/_____/_/                           
\n
Version 1.0
Available commands:\n
${Object.entries(commandList).map(
  ([command, cmdP]) => `${command} - ${cmdP.description}\n`,
)}
`.replaceAll(' ', '\u00A0'),
  },
}

function isCommand(cmd: string): boolean {
  return !!Object.entries(commandList).find(([node, _]) => node === cmd)
}

function hasFlags(cmd: string) {
  // if(commandList.)
}

function destructureCommand(cmd: string): {
  cmd: string
  flags: string[]
  text?: string
} {
  const splittedCMD = cmd.split(' ')

  return {
    cmd: splittedCMD[0],
    flags: splittedCMD.filter(str => str.includes('-')),
    text:
      splittedCMD.length > 1 ? splittedCMD[splittedCMD.length - 1] : undefined,
  }
}

export { commandList, hasFlags, isCommand, destructureCommand }