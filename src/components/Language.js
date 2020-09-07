import React, { Component } from 'react'
import i18n from 'i18next'
import styled from 'styled-components'
import media from 'styled-media-query'

const LanguageOptions = styled.div`
  ${media.lessThan('small')`
    margin: 0 0 30px 0;
    float: left;
  `}

  ${media.lessThan('medium')`
    margin: 0;
  `}

  float: right;
  height: 60px;
`

const LanguageOption = styled.button`
  margin: 0 20px 0 0;
  height: 40px;
  background-color: transparent;
  font-family: ${props => props.theme.font};
  font-size: 0.8em;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.blue};
  border: 2px #ccc solid;
  border-radius: 0.4rem;
  outline: none;
  cursor: pointer;
`

class Language extends Component {
  handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang)
  }

  render () {
    return (
      <LanguageOptions>
        <LanguageOption onClick={() => this.handleLanguageChange('pt-BR')}>
          Português (BR)
        </LanguageOption>
        <LanguageOption onClick={() => this.handleLanguageChange('en')}>
          English (US)
        </LanguageOption>
      </LanguageOptions>
    )
  }
}

export default Language
