enum Files {
  PROFILE = 'profile',
  EXPERIENCE = 'experience',
  LANGUAGES = 'languages',
  TECH_STACK = 'tech-stack',
  CASE_STUDIES = 'case-studies',
}

interface IFile {
  fileName: Files
  fileContent: string
}

const files: IFile[] = [
  {
    fileName: Files.PROFILE,
    fileContent: `\n\n<span class='shell-text-header'>Profile</span>\n
    Hey! my name's Louis Raetz and I'm a 22 y/o self-taught Web and Mobile Engineer based in Berlin, Germany. I'm currently writing code as a Front-End Engineer at Pipe. When I'm not coding, you can catch me nerding out on Vim, and binge-watching coding related YouTube videos.\n\n`,
  },
  {
    fileName: Files.EXPERIENCE,
    fileContent: `\n\n<span class='shell-text-header'>Experience in Developing User Interfaces</span>\n
    In the past I have worked on many types and variations of user interfaces. Whether mobile, web, ecommerce, animated, 3D or interactive. For each interface I have found solutions, and thus gained my experience. Working closely with designers to ensure the UI is pixel-perfect and features are well thought through is my passion. If you'd like to see examples type "cat case-studies" into the command prompt!\n\n`,
  },
  {
    fileName: Files.LANGUAGES,
    fileContent: `\n\n<span class='shell-text-header'>Languages</span>\n
    Ich spreche Deutsch like a native and I'm fluent in English. I've worked with loads of English-speaking clients throughout my 5+ years of freelance & full-time career, so communication is no problem.\n\n`,
  },
  {
    fileName: Files.TECH_STACK,
    fileContent: `\n\n<span class='shell-text-header'>Tech-stack</span>\n
    My programming language expertise includes JavaScript, TypeScript, and Golang. I am well-versed in Front-end frameworks and libraries such as React, Vue.js, SvelteJS, Electron, React Native, Apollo, Stitches, Storybook, React-aria, Styled-Components, Mobx, React-Router, React-Redux, Lodash, and Formik (just to name a few). To ensure a good CI/CD flow Ive worked with Semgrep, Sentry, Github Actions, and Husky. I havent had much chance to show off my back-end skills yet, but Ive contributed 1-2 minor pull requests using Golang, so watch this space!\n\n`,
  },
  {
    fileName: Files.CASE_STUDIES,
    fileContent: `\n\n<span class='shell-text-header'>Case studies (some of my favourites)</span>\n
Galaxsio | Landing Page, Software Mac/Windows, Raffle Page, Dashboard Web | <a href='https://www.youtube.com/watch?v=lPdGzilrYgI' target='_blank'>Reveal Trailer</a> <a href='https://twitter.com/Galaxsio' target='_blank'>Twitter</a> <a href='https://github.com/dannybszn/G2/releases/tag/v2.6.3' target='_blank'>GitHub</a>\n
POLYGON | Webpage | <a href='https://polygon.sh/' target='_blank'>Website</a>\n
Uniseminar | Shop & IOS App | <a href='https://apps.apple.com/ch/app/uniseminar-kkarten-app-2021/id1578455634' target='_blank'>App Store</a> <a href='https://uniseminar.ch/' target='_blank'>Shop</a>\n
Cashyou | Helped with the IOS App | <a href='https://apps.apple.com/ch/app/cashyou/id1500731711' target='_blank'>App Store</a>\n
Fellow | Webpage | <a href='https://www.fellow.ac/' target='_blank'>Website</a>\n
V7 | Core UI (connecting Models & Datasets in an interactive way), also helped out a lot with the design system | <a href='https://www.v7labs.com/' target='_blank'>Website</a>\n
Pipe | Design system work (created and shipped components, integrated them on the product front & supported other teams) | <a href='https://pipe.com/' target='_blank'>Website</a>\n
Uniseminar | Shop & IOS App | <a href='https://apps.apple.com/ch/app/uniseminar-kkarten-app-2021/id1578455634' target='_blank'>App Store</a> <a href='https://uniseminar.ch/' target='_blank'>Shop</a>\n
Cashyou | Helped with the IOS App | <a href='https://apps.apple.com/ch/app/cashyou/id1500731711' target='_blank'>App Store</a>\n
NAJ | Custom shopify shop with NextJS + TS | <a href='https://naj-shopify-v2.vercel.app/' target='_blank'>Shop</a>\n
Trana.co (now Hilbert) | Product Work (Design System, Onboarding, Product) | <a href='https://hilbert.studio/' target='_blank'>Website</a>\n
Rhythm | App | TBD\n
Lemon | App work (early stage) | <a href='https://www.lemon.app/' target='_blank'>Website</a>\n
`,
  },
]

export { Files, files }
