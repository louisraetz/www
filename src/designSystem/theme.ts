import * as Stitches from '@stitches/react'
import { colors } from '~designSystem/constants'

const { styled, css, globalCss, keyframes, getCssText, theme, config } =
  Stitches.createStitches({
    theme: {
      colors,
    },
    media: {
      xs: '(max-width: 480px)',
      sm: '(max-width: 768px)',
      md: '(max-width: 1024px)',
      lg: '(max-width: 1200px)',
      xl: '(min-width: 1201px)',
    },
    utils: {
      // marginX: value => ({ marginLeft: value, marginRight: value }),
    },
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

    backgroundImage: 'url(/images/background.jpg)',
    backgroundSize: 'cover',

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
}
