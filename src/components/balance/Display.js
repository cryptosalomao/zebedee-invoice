import Eye from '@iconscout/react-unicons/icons/uil-eye'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import Skeleton from 'react-loading-skeleton'
import NumberFormat from 'react-number-format'
import { connect } from 'react-redux'
import styled from 'styled-components'
import media from 'styled-media-query'
import { fetchBalance } from '../../redux/actions/balance'
import { toSats } from '../../utils'

const ContentBox = styled.div`
  ${media.lessThan('medium')`
    width: 100%;
    padding: 0;
  `}

  max-width: 400px;
  height: 160px;
  font-family: ${props => props.theme.font};
  text-align: left;
  padding: 10px 20px 0 20px;
  box-sizing: border-box;

  .heading {
    height: 20px;

    .title {
      margin: 0;
      float: left;
      font-size: 1.6em;
      color: ${props => props.theme.colors.heading};
      display: inline-block;
    }

    .toggle-visibility {
      ${media.lessThan('medium')`
        margin: 0;
        float: right;
      `}

      margin: 5px 0 0 0;
      float: right;
      background-color: transparent;
      color: #000000;
      border: none;
      display: inline-block;
      cursor: pointer;
      outline: none;
    }
  }

  .info {
    user-select: none;
  }

  .balance {
    font-size: 4em;
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.value};
  }

  .unit {
    margin: 0 0 0 10px;
    font-size: 1.5em;
    font-weight: ${props => props.theme.fontWeights.semiBold};
    color: #000000;
  }
`

class Display extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isBalanceVisible: true
    }
  }

  isComponentVisible = () => {
    const { balance } = this.props
    const { isBalanceVisible } = this.state

    return !isBalanceVisible ? (
      <span className='balance'>
        ******
      </span>
    ) : (
      <>
        <span className='balance'>
          <NumberFormat
            value={toSats(balance)}
            thousandSeparator
            displayType='text'
          />
        </span>
        <span className='unit'>
          sats
        </span>
      </>
    )
  }

  showBalance = () => {
    const { isLoading, hasError } = this.props

    if (hasError) {
      return 'Error while loading data'
    }

    return isLoading ? <Skeleton height={50} /> : this.isComponentVisible()
  }

  handleVisibilityToggle = () => {
    this.setState({
      isBalanceVisible: !this.state.isBalanceVisible
    })
  }

  componentDidMount () {
    const { fetchBalance } = this.props

    fetchBalance()
  }

  render () {
    const { t } = this.props

    return (
      <ContentBox>
        <div className='heading'>
          <h1 className='title'>
            {t('balance.title')}
          </h1>
          <button className='toggle-visibility' onClick={this.handleVisibilityToggle}>
            <Eye size='26' />
          </button>
        </div>
        <p className='info'>
          {this.showBalance()}
        </p>
      </ContentBox>
    )
  }
}

Display.propTypes = {
  balance: PropTypes.number,
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
  fetchBalance: PropTypes.func,
  t: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  fetchBalance: () => dispatch(fetchBalance())
})

const mapStateToProps = state => ({
  balance: state.balance.balance,
  isLoading: state.balance.isLoading,
  hasError: state.balance.hasError
})

const translated = withTranslation()(Display)

export default connect(mapStateToProps, mapDispatchToProps)(translated)
