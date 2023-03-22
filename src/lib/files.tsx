enum Files {
  PROFILE = 'profile',
  EXPERIENCE = 'experience',
  LANGUAGES = 'languages',
  TECH_STACK = 'tech-stack',
}

interface IFile {
  fileName: string
  fileExt: string
  fileContent: string
}

const files: IFile[] = [
  {
    fileName: Files.PROFILE,
    fileExt: '.txt',
    fileContent: 'This is PROFILE content',
  },
  {
    fileName: Files.EXPERIENCE,
    fileExt: '.txt',
    fileContent: 'This is EXPERIENCE content',
  },
  {
    fileName: Files.LANGUAGES,
    fileExt: '.txt',
    fileContent: 'This is LANGUAGES content',
  },
  {
    fileName: Files.TECH_STACK,
    fileExt: '.txt',
    fileContent: 'This is TECH_STACK content',
  },
]

export { Files, files }
