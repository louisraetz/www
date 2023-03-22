import { files } from '~lib/files'

export enum Commands {
  OPEN = 'open',
  ECHO = 'echo',
  HELP = 'help',
  LS = 'ls',
  CLEAR = 'clear',
  WELCOME = 'welcome',
  SOCIAL = 'social',
  CONTACT = 'contact',
}

type CommandProperties = {
  command: string
  description: string
  return: (cmd?: string) => string
}

const commandList: { [key: string | Commands]: CommandProperties } = {
  [Commands.LS]: {
    command: 'ls',
    description:
      'No real UNIX functionality, but lists useful files containing information about me :)',
    return: () => `total 5
${files
  .map(
    ({ fileName, fileExt }) =>
      `-rw-r--r--@  1 louisraetz  staff     320 21 Jan 12:13 <span class='binary'>${
        fileName + fileExt
      }</span>\n`,
  )
  .join('')}
    `,
  },
  [Commands.CLEAR]: {
    command: 'clear',
    description: 'Clears the terminal window',
    return: () => '',
  },
  [Commands.OPEN]: {
    command: 'open',
    description: 'Opens a file you can find by running ls',
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
    description: 'Lists all commands',
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
    description: 'Shows the initial welcome message',
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

Check out what you can do by typing "help"!
    `.replaceAll(' ', '\u00A0'),
  },
  [Commands.SOCIAL]: {
    command: 'social',
    description: 'Lists all my social media appearance',
    return: () => `Social Media\n
    LinkedIn: <a class='social-link' href='https://www.linkedin.com/in/louis-raetz-371614178/' target='_blank'>Redirect</a>
    Twitter: <a class='social-link' href='https://twitter.com/raetzlouis' target='_blank'>Redirect</a>
    GitHub: <a class='social-link' href='https://github.com/louisraetz' target='_blank'>Redirect</a>
    `,
  },
  [Commands.CONTACT]: {
    command: 'social',
    description: 'Shows you how to get in touch with me.',
    return: () => `Contact me\n
    I am very happy to see that you want to reach out. Feel free to send and email over to <a href='mailto:louis@louisraetz.com'>louis@louisraetz.com</a>
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
  ...files.map(file => file.fileName + file.fileExt),
  ...Object.entries(commandList).map(([cmd, _]) => cmd),
]

export {
  commandList,
  hasFlags,
  isCommand,
  destructureCommand,
  autoCompleteSuggestions,
}
