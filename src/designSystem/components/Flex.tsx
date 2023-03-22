import { styled } from '@stitches/react'
import { mapTokenScaleToVariant, sizes } from '~designSystem/theme'

const Flex = styled('div', {
  display: 'flex',

  variants: {
    direction: {
      column: {
        flexDirection: 'column',
      },
      row: {
        flexDirection: 'row',
      },
    },
    align: {
      center: {
        alignItems: 'center',
      },
      start: {
        alignItems: 'flex-start',
      },
      end: {
        alignItems: 'flex-end',
      },
    },
    justify: {
      center: {
        justifyContent: 'center',
      },
      start: {
        justifyContent: 'flex-start',
      },
      end: {
        justifyContent: 'flex-end',
      },
      between: {
        justifyContent: 'space-between',
      },
    },
    gap: mapTokenScaleToVariant(sizes, token => ({
      gap: sizes[token],
    })),
  },
})

export default Flex
