import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import styled from 'styled-components'
import { toSats } from '../../utils'
import moment from 'moment'

const InvoiceContainer = styled.div`
  margin: 0 0 20px 0;
  width: 100%;
  height: 120px;
  background-color: #f5f6f8;
  border-radius: 0.4rem;
  padding: 15px 10px 0 15px;
  box-sizing: border-box;
  cursor: pointer;
`

const Heading = styled.div`
  width: 100%;
  background: cyan;
  display: block;
`

const Title = styled.h1`
  width: 100%;
  float: left;
  font-family: ${props => props.theme.font};
  font-size: 1em;
  color: ${props => props.theme.colors.blue};
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
`
const Content = styled.div`
  width: 100%;
  font-family: ${props => props.theme.font};
  font-size: 0.9em;
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: #000000;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
`

const Info = styled.div`
  width: 100%;
  font-family: ${props => props.theme.font};
  font-size: 0.8em;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.contentDescription};
  text-align: left;
  display: block;

  .description {
    width: 50%;
    display: inline-block;
  }

  .value {
    float: right;
    color: #000000;
    display: inline-block;
  }
`

class Invoice extends Component {
  render () {
    const { title, value, description, status, createdAt } = this.props

    return (
      <InvoiceContainer>
        <Heading>
          <Title>{title || 'Untitled'}</Title>
        </Heading>
        <Content>
          {description || 'No description'}
        </Content>
        <Info>
          <div className='description'>
            {moment(createdAt).fromNow()} -
            {' ' + status}
          </div>
          <span className='value'>
            <NumberFormat
              value={toSats(value)}
              thousandSeparator
              displayType='text'
              suffix=' sats'
            />
          </span>
        </Info>
      </InvoiceContainer>
    )
  }
}

Invoice.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.string,
  createdAt: PropTypes.string
}

export default Invoice
