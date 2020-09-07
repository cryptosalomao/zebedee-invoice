import PropTypes from 'prop-types'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { ModalProvider } from 'styled-react-modal'
import theme from './theme'

const DefaultLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ModalProvider>
        {children}
      </ModalProvider>
    </ThemeProvider>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node
}

export default DefaultLayout
