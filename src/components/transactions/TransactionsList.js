import React, { Component } from 'react'
import styled from 'styled-components'
import Transaction from './Transaction'
import { connect } from 'react-redux'
import { fetchInvoices } from '../../redux/actions/invoices'
import { fetchPayments } from '../../redux/actions/payments'
import { fetchWithdrawals } from '../../redux/actions/withdrawals'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { withTranslation } from 'react-i18next'

const TransactionsContainer = styled.div`
  margin: 20px auto 0 auto;
  max-width: 400px;
  box-sizing: border-box;
`
const Heading = styled.div`
  height: 40px;
  display: block;
`
const Title = styled.h1`
  margin: 0;
  float: left;
  font-family: ${props => props.theme.font};
  font-size: 1.6em;
  color: ${props => props.theme.colors.heading};
  display: inline-block;
`
const TransactionsList = styled.div`
  margin: 30px 0 0 0;
  min-height: 200px;
  display: block;
`

class Transactions extends Component {
  componentDidMount = async () => {
    const { fetchInvoices, fetchPayments, fetchWithdrawals } = this.props

    fetchInvoices()
    fetchPayments()
    fetchWithdrawals()
  }

  createTransactionList = () => {
    const { invoices, payments, withdrawals } = this.props
    const transactions = [...invoices, ...payments, ...withdrawals]
    // Note: i could have used ramda or lodash for composition, but it would be overkill
    const filtered = transactions.filter((txn) => txn.status === 'completed')
    const sorted = (
      filtered.sort((a, b) => new Date(b.confirmedAt) - new Date(a.confirmedAt))
    )
    return (
      sorted
        .slice(0, 3)
        .map(
          (transaction, index) => {
            const {
              amount,
              description,
              type,
              confirmedAt,
              internalId
            } = transaction

            return (
              <Transaction
                key={index}
                value={amount}
                description={description}
                type={type}
                confirmedAt={confirmedAt}
                internalId={internalId}
              />
            )
          }
        )
    )
  }

  showTransactions = () => {
    const { isLoading, hasError } = this.props

    if (hasError) {
      return 'Error while fetching transactions'
    }

    return isLoading ? <Skeleton count={3} height={50} /> : this.createTransactionList()
  }

  render () {
    const { t } = this.props

    return (
      <TransactionsContainer>
        <Heading>
          <Title>
            {t('transactions.title')}
          </Title>
        </Heading>
        <TransactionsList>
          {this.showTransactions()}
        </TransactionsList>
      </TransactionsContainer>
    )
  }
}

Transactions.propTypes = {
  invoices: PropTypes.array,
  payments: PropTypes.array,
  withdrawals: PropTypes.array,
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
  fetchInvoices: PropTypes.func,
  fetchPayments: PropTypes.func,
  fetchWithdrawals: PropTypes.func,
  t: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  fetchInvoices: () => dispatch(fetchInvoices()),
  fetchPayments: () => dispatch(fetchPayments()),
  fetchWithdrawals: () => dispatch(fetchWithdrawals())
})

const mapStateToProps = state => ({
  invoices: state.invoices.invoices,
  payments: state.payments.payments,
  withdrawals: state.withdrawals.withdrawals,
  isLoading: state.invoices.isLoading,
  hasError: state.invoices.hasError
})

const translated = withTranslation()(Transactions)

export default connect(mapStateToProps, mapDispatchToProps)(translated)
