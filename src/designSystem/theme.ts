import * as Stitches from '@stitches/react'
import colors from '~designSystem/constants'
import linuxColors from '~designSystem/constants-linux'

const sizes = {
  '0': '0px',
  '0_5': '2px',
  '1': '4px',
  '1_5': '6px',
  '2': '8px',
  '2_5': '10px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '7': '28px',
  '8': '32px',
  '9': '36px',
  '10': '40px',
  '11': '44px',
  '12': '48px',
  '14': '56px',
  '16': '64px',
  '18': '72px',
  '20': '80px',
  '22': '88px',
  '24': '96px',
  '28': '112px',
  '32': '128px',
  '36': '144px',
  '40': '160px',
  '44': '176px',
  '48': '192px',
  '52': '208px',
  '56': '224px',
  '60': '240px',
  '64': '256px',
  '72': '288px',
  '80': '320px',
  '88': '352px',
  '96': '384px',
  '104': '416px',
  '112': '448px',
  '120': '480px',
  '136': '544px',
  '152': '608px',
  '168': '672px',
  '186': '744px',
  '202': '808px',
  '234': '936px',
  '360': '1440px',
}

const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  config,
  createTheme,
} = Stitches.createStitches({
  theme: {
    colors,
    sizes,
  },
  media: {
    xs: '(max-width: 480px)',
    sm: '(max-width: 768px)',
    md: '(max-width: 1024px)',
    lg: '(max-width: 1200px)',
    xl: '(min-width: 1201px)',
  },
})

const linuxTheme = createTheme('linux', {
  colors: linuxColors,
  sizes,
})

const globalStyles = globalCss({
  '*': {
    '&::before': {
      boxSizing: 'border-box',
    },
    '&::after': {
      boxSizing: 'border-box',
    },
    margin: 0,

    boxSizing: 'border-box',
  },
  html: {
    height: '100%',
  },
  body: {
    height: '100%',
  },
  'img, picture, video, canvas, svg': {
    display: 'block',
    maxWidth: '100%',
  },
  'input, button, textarea, select': {
    font: 'inherit',
  },
  'p, h1, h2, h3, h4, h5, h6': {
    overflowWrap: 'break-word',
  },
  '#root': {
    colorScheme: 'light dark',
    color: theme.colors.TERMINAL_LABEL_DEFAULT_COLOR,
    fontFamily: 'Meslo',
    fontWeight: '400',
    fontSize: '11px',
    lineHeight: '14px',
    fontVariant: 'tabular-nums',
    fontFeatureSettings: '"tnum", "tnum"',
    height: '100%',

    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },
})

const mapTokenScaleToVariant = <
  Scale extends object,
  Token extends keyof Scale,
  Output,
>(
  tokenSet: Scale,
  map: (arg0: Token) => Output,
): Record<Token, Output> => {
  const keys = Object.keys(tokenSet) as Token[]
  return keys.reduce(
    (acc, token) => ({ ...acc, [token]: map(token) }),
    {} as Record<Token, Output>,
  )
}

export {
  styled,
  css,
  globalStyles,
  keyframes,
  getCssText,
  theme,
  config,
  mapTokenScaleToVariant,
  linuxTheme,
  sizes,
}
