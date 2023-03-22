export enum Commands {
  ECHO = 'echo',
  HELP = 'help',
  LS = 'ls',
  CLEAR = 'clear',
  WELCOME = 'welcome',
  SOCIAL = 'social',
}

type CommandProperties = {
  command: string
  description: string
  return: (cmd?: string) => string
}

const mockFiles = [
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
      'ls lists files and directories, and their associated metadata, such as file size, ownership, and modification time.',
    return: () => `total 5
${mockFiles
  .map(
    file =>
      `-rw-r--r--@  1 louisraetz  staff     320 21 Jan 12:13 <span class='binary'>${file}</span>\n`,
  )
  .join('')}
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
Available commands:\n
${Object.entries(commandList)
  .map(([command, cmdP]) => `${command} - ${cmdP.description}\n`)
  .join('')}
`.replaceAll(' ', '\u00A0'),
  },
  [Commands.WELCOME]: {
    command: 'help',
    description: 'Usage: help -  lists all commands',
    return: () =>
      `
 _       __________    __________  __  _________
| |     / / ____/ /   / ____/ __ \\/  |/  / ____/
| | /| / / __/ / /   / /   / / / / /|_/ / __/   
| |/ |/ / /___/ /___/ /___/ /_/ / /  / / /___   
|__/|__/_____/_____/\\____/\\____/_/  /_/_____/   

Version 1.0

Hey! Thanks for your visit. My name is Louis Raetz I am 22 years old  and I'm a self-taught Front-End Engineer 
based in awesome Berlin, Germany. I'm currently writing code as a Front-End Engineer at Pipe. 
When I'm not coding, you can catch me nerding out on Vim, reading all the latest coding articles, 
and binge-watching coding related YouTube videos.

To list all available commands type "help".
    `.replaceAll(' ', '\u00A0'),
  },
  [Commands.SOCIAL]: {
    command: 'social',
    description: 'Usage: social -  lists all my social media appearance',
    return: () => `Social Media
    LinkedIn: <a class='social-link' href='https://www.linkedin.com/in/louis-raetz-371614178/' target="_blank">https://www.linkedin.com/in/louis-raetz-371614178/</a>
    `,
  },
}

function isCommand(cmd: string): boolean {
  return !!Object.entries(commandList).find(([node, _]) => node === cmd)
}

function hasFlags(cmd: string) {
  // if(commandList.)
}

function destructureCommand(cmd: string): {
  cmd: string | undefined
  flags: string[]
  text?: string
} {
  const splittedCMD = cmd.split(' ')
  // eslint-disable-next-line no-nested-ternary
  const text = isCommand(splittedCMD[0])
    ? splittedCMD.length > 1
      ? splittedCMD[splittedCMD.length - 1]
      : undefined
    : splittedCMD[0]

  return {
    cmd: isCommand(splittedCMD[0]) ? splittedCMD[0] : undefined,
    flags: splittedCMD.filter(str => str.includes('-')),
    text,
  }
}

const autoCompleteSuggestions = [
  ...mockFiles,
  ...Object.entries(commandList).map(([cmd, _]) => cmd),
]

export {
  commandList,
  hasFlags,
  isCommand,
  destructureCommand,
  autoCompleteSuggestions,
  mockFiles,
}
