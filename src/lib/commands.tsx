import { Files, files } from '~lib/files'
import { ASCIIHelp, ASCIIWelcome } from '~lib/ascii'

export enum Commands {
  ECHO = 'echo',
  HELP = 'help',
  LS = 'ls',
  CLEAR = 'clear',
  WELCOME = 'welcome',
  SOCIAL = 'social',
  CONTACT = 'contact',
  CAT = 'cat',
}

type CommandProperties = {
  command: string
  description: string
  return: (arg?: any) => string
}

const commandList: { [key: string | Commands]: CommandProperties } = {
  [Commands.LS]: {
    command: 'ls',
    description:
      'No real UNIX functionality, but lists useful files containing information about me :)',
    return: () => `total 5
${files
  .map(
    ({ fileName }) =>
      `-rw-r--r--@  1 louisraetz  staff     320 21 Jan 12:13 <span class='binary'>${fileName}</span>\n`,
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
    description: 'Lists all commands',
    return: () =>
      `
${ASCIIHelp}
Available commands:\n
${Object.entries(commandList)
  .map(([command, cmdP]) => `${command} - ${cmdP.description}\n`)
  .join('')}
`,
  },
  [Commands.WELCOME]: {
    command: 'welcome',
    description: 'Shows the initial welcome message',
    return: () =>
      `
${ASCIIWelcome}
Version 1.0

Hey! my name's Louis Raetz and I'm a 22 y/o self-taught Web and Mobile Engineer based in Berlin, Germany. I'm currently writing code as a Front-End Engineer at <a class="social-link" href="https://pipe.com" target="_blank">Pipe</a>. When I'm not coding, you can catch me nerding out on Vim, and binge-watching coding related YouTube videos.

Check out what you can do by typing "help"!
    `,
  },
  [Commands.SOCIAL]: {
    command: 'social',
    description: 'Lists all my social media appearance',
    return: () => `\n\n<span class='shell-text-header'>Social Media</span>\n
    LinkedIn: <a class='social-link' href='https://www.linkedin.com/in/louis-raetz-371614178/' target='_blank'>Redirect</a>
    Twitter: <a class='social-link' href='https://twitter.com/raetzlouis' target='_blank'>Redirect</a>
    GitHub: <a class='social-link' href='https://github.com/louisraetz' target='_blank'>Redirect</a>
    `,
  },
  [Commands.CONTACT]: {
    command: 'contact',
    description: 'Shows you how to get in touch with me.',
    return: () => `\n\n<span class='shell-text-header'>Contact me</span>\n
    I am very happy to see that you want to reach out. Feel free to send and email over to <a href='mailto:louis@louisraetz.com'>louis@louisraetz.com</a>\n\n`,
  },
  [Commands.CAT]: {
    command: 'cat',
    description: 'Displays the files content',
    return: (file: Files) =>
      files.find(f => f.fileName.includes(file))?.fileContent ||
      'file not found.',
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
  ...files.map(file => file.fileName),
  ...Object.entries(commandList).map(([cmd, _]) => cmd),
]

export {
  commandList,
  hasFlags,
  isCommand,
  destructureCommand,
  autoCompleteSuggestions,
}
