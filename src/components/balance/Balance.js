import LightningIcon from '@iconscout/react-unicons/icons/uil-bolt-alt'
import WithdrawIcon from '@iconscout/react-unicons/icons/uil-export'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import styled from 'styled-components'
import media from 'styled-media-query'
import Action from './Action'
import Display from './Display'
import Pay from './Pay'
import Withdraw from './Withdraw'

const BalanceContainer = styled.div`
  ${media.lessThan('medium')`
    height: 320px;
  `}

  margin: 0 auto;
  height: 260px;
`
const Actions = styled.div`
  ${media.lessThan('medium')`
    height: 160px;
    padding: 0;
  `}

  max-width: 400px;
  height: 100px;
  padding: 10px 20px 0 20px;
  box-sizing: border-box;
`

class Balance extends Component {
  constructor (props) {
    super(props)

    this.state = {
      payModalVisibility: false,
      withdrawModalVisibility: false
    }
  }

  handleWithdrawVisibilityChange = () => {
    this.setState({
      withdrawModalVisibility: !this.state.withdrawModalVisibility
    })
  }

  handlePaymentVisibilityChange = () => {
    this.setState({
      payModalVisibility: !this.state.payModalVisibility
    })
  }

  render () {
    const { t } = this.props

    return (
      <BalanceContainer>
        <Display />
        <Actions>
          <Action onClick={this.handlePaymentVisibilityChange}>
            <LightningIcon className='icon' />
            <span className='title'>{t('actions.pay')}</span>
          </Action>
          <Action onClick={this.handleWithdrawVisibilityChange}>
            <WithdrawIcon size='22' className='icon' />
            <span className='title'>{t('actions.withdraw')}</span>
          </Action>
        </Actions>
        <Pay
          visibility={this.state.payModalVisibility}
          onHandler={this.handlePaymentVisibilityChange}
        />
        <Withdraw
          visibility={this.state.withdrawModalVisibility}
          onHandler={this.handleWithdrawVisibilityChange}
        />
      </BalanceContainer>
    )
  }
}

Balance.propTypes = {
  t: PropTypes.func
}

const translate = withTranslation()(Balance)

export default translate
