import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import media from 'styled-media-query'

const Button = styled.button`
  ${media.lessThan('large')`
    width: 100%;
    display: block;
  `}

  float: right;
  margin: 0 0 15px 0;
  width: 160px;
  height: 60px;
  background-color: ${props => props.theme.colors.blue};
  font-family: ${props => props.theme.font};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: 1em;
  color: #ffffff;
  border: none;
  border-radius: 0.4rem;
  display: block;
  cursor: pointer;
  outline: none;

  &:first-of-type {
    float: left;
  }

  &:hover {
    background-color: ${props => props.theme.colors.darkerBlue};
  }
`

class Action extends Component {
  render () {
    const { children, onClick } = this.props
    return (
      <Button onClick={onClick}>
        {children}
      </Button>
    )
  }
}

Action.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
}

export default Action
