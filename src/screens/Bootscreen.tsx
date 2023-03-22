import React, { Dispatch, SetStateAction } from 'react'
import FocusTrap from 'focus-trap-react'
import { styled } from '~designSystem/theme'
import Flex from '~designSystem/components/Flex'
import { Theme } from '~App'

const Container = styled(Flex, {
  width: '100%',
  height: '100vh',

  backgroundColor: '#000',
  userSelect: 'none',
})

const Wrapper = styled(Flex, {
  width: '50%',
  height: '427px',

  border: '8px solid #FFFFFF',

  '& > ul': {
    listStyle: 'none',
    padding: '24px',

    '& > li': {
      fontFamily: 'BIOS',
      fontSize: '20px',
      lineHeight: '24px',
      color: '#FFFFFF',
      marginBottom: '12px',
      outline: 'none',

      '&:focus': {
        cursor: 'pointer',
        background: '#717171',
      },
    },
  },
})

const WrapperHead = styled(Flex, {
  width: '100%',
  height: '68px',
  marginLeft: 'auto',
  marginRight: 'auto',

  borderBottom: '4px solid #FFFFFF',

  '& > h1': {
    fontFamily: 'BIOS',
    color: '#FFFFFF',
    textAlign: 'center',
  },
})

const BootItem: React.FC<{
  theme: Theme
  tabIndex: HTMLLIElement['tabIndex']
  onClick: () => void
}> = ({ theme, ...props }) => {
  return <li {...props}>Start {theme === Theme.LINUX ? 'ubuntu' : 'MacOS'}</li>
}

const Bootscreen: React.FC<{
  setTheme: Dispatch<SetStateAction<Theme | undefined>>
}> = ({ setTheme }) => {
  return (
    <Container align="center" justify="center">
      <Wrapper direction="column">
        <WrapperHead align="center" justify="center">
          <h1>BOOTLOADER: PLEASE CHOOSE OS</h1>
        </WrapperHead>
        <FocusTrap>
          <ul>
            <BootItem
              tabIndex={1}
              theme={Theme.LINUX}
              onClick={() => setTheme(Theme.LINUX)}
            />
            <BootItem
              tabIndex={0}
              theme={Theme.MAC}
              onClick={() => setTheme(Theme.MAC)}
            />
          </ul>
        </FocusTrap>
      </Wrapper>
    </Container>
  )
}

export default Bootscreen
