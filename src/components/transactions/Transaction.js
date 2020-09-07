import ArrowIn from '@iconscout/react-unicons/icons/uil-arrow-down-right'
import ArrowOut from '@iconscout/react-unicons/icons/uil-arrow-up-left'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import NumberFormat from 'react-number-format'
import styled from 'styled-components'
import media from 'styled-media-query'
import { toSats } from '../../utils'

const TransactionContainer = styled.div`
  margin: 0 0 20px 0;
  height: 80px;
  max-width: 360px;
  background-color: ${props => props.theme.colors.contentContainer};
  text-align: left;
  border-radius: 0.4rem;
  padding: 15px 15px 0 15px;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
`
const Icon = styled.div`
  float: left;
  margin: 5px 10px 0 0;
  width: 30px;
  display: inline-block;

  .in {
    color: ${props => props.theme.colors.green};
  }

  .out {
    color: ${props => props.theme.colors.red};
  }
`

const Content = styled.div`
  display: inline-block;
`

const Title = styled.span`
  ${media.lessThan('small')`
    max-width: 120px;
  `}
  max-width: 140px;
  font-family: ${props => props.theme.font};
  font-size: 1.2em;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.blue};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
`
const Description = styled.span`
  ${media.lessThan('small')`
    max-width: 120px;
  `}

  max-width: 140px;
  font-family: ${props => props.theme.font};
  font-size: 0.9em;
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${props => props.theme.colors.contentDescription};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
`
const Data = styled.div`
  float: right;
  display: inline-block;
`
const Value = styled.div`
  font-family: ${props => props.theme.font};
  font-size: 1em;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.contentHeading};
  text-align: right;
  display: block;
`
const Date = styled.div`
  font-family: ${props => props.theme.font};
  font-size: 0.9em;
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${props => props.theme.colors.contentInfo};
  text-align: right;
  display: block;
`

class Transaction extends Component {
  icon () {
    const { type } = this.props

    return (
      type === 'received'
        ? <ArrowIn size={28} className='in' />
        : <ArrowOut size={28} className='out' />
    )
  }

  sign () {
    const { type } = this.props

    return type === 'received' ? '+' : '-'
  }

  render () {
    const { value, description, confirmedAt, internalId } = this.props

    return (
      <TransactionContainer>
        <Icon>
          {this.icon()}
        </Icon>
        <Content>
          <Title>{internalId || 'Untitled'}</Title>
          <Description>{description}</Description>
        </Content>
        <Data>
          <Value>
            <NumberFormat
              value={toSats(value)}
              thousandSeparator
              displayType='text'
              prefix={this.sign()}
              suffix=' sats'
            />
          </Value>
          <Date>
            {moment(confirmedAt).fromNow()}
          </Date>
        </Data>
      </TransactionContainer>
    )
  }
}

Transaction.propTypes = {
  value: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  confirmedAt: PropTypes.string,
  internalId: PropTypes.string
  // t: PropTypes.func
}

export default withTranslation()(Transaction)
