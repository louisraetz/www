/// <reference types="vite-plugin-svgr/client" />

import React from 'react'
import { styled } from '@stitches/react'
import Flex from '~designSystem/components/Flex'
import { ReactComponent as ShellPrefix } from '~designSystem/svg/ShellPrefix.svg'
import { theme } from '~designSystem/theme'

const CMDText = styled('span', {
  color: theme.colors.TERMINAL_LABEL_DEFAULT_COLOR,
})

const ShellLn: React.FC<{ children: React.ReactElement | string }> = ({
  children,
}) => {
  return (
    <Flex
      align="center"
      justify="start"
      gap="2"
      css={{ color: theme.colors.TERMINAL_CHEVRON_INACTIVE }}
    >
      <ShellPrefix />
      <CMDText>{children}</CMDText>
    </Flex>
  )
}

export default ShellLn
