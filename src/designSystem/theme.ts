import { createStitches } from '@stitches/react'
import colors from '~designSystem/constants'

const { styled, css, globalCss, keyframes, getCssText, theme, config } =
  createStitches({
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

    /* ===== Scrollbar CSS ===== */
    /* Firefox */
    scrollbarWidth: 'auto',
    scrollbarColor: 'red transparent',

    '&:-webkit-autofill': {
      '-webkit-transition-delay': '9999s',
      'transition-delay': '9999s',
    },

    '&:autofill': {
      background: 'transparent',
    },
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
    color: theme.colors.TERMINAL_LABEL_ACTIVE_COLOR,
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

export { styled, css, globalStyles, keyframes, getCssText, theme, config }
