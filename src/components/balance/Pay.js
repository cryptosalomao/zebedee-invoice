import LightningIcon from '@iconscout/react-unicons/icons/uil-bolt-alt'
import { Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import Skeleton from 'react-loading-skeleton'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Modal from 'styled-react-modal'
import api from '../../common/api'
import { fetchBalance } from '../../redux/actions/balance'
import { fetchInvoices } from '../../redux/actions/invoices'
import { fetchPayments } from '../../redux/actions/payments'

const ModalLayout = Modal.styled`
  width: 400px;
  height: 600px;
  background-color: #ffffff;
  border-radius: 0.4rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`
const Heading = styled.div`
  margin: 0 0 20px 0;
  height: 100px;
  display: block;
`

const Icon = styled.div`
  margin: 0 auto 20px auto;
  color: ${props => props.theme.colors.blue};
  text-align: center;
  display: block;
`

const Title = styled.h1`
  margin: 0 auto;
  float: left;
  font-family: ${props => props.theme.font};
  font-size: 1.4em;
  color: ${props => props.theme.colors.heading};
  display: inline-block;
`

const Information = styled.div`
  margin: 0 auto;
  width: 300px;
  height: 60px;
  font-family: ${props => props.theme.font};
  font-size: 1.2em;
  color: ${props => props.theme.colors.heading};
  text-align: center;
  display: inline-block;
`

const FormContent = styled.div`
  margin: 0 auto;
  width: 300px;
  align-self: center;
  display: inline-block;

  label {
    margin: 10px 0 5px 0;
    font-family: ${props => props.theme.font};
    font-size: 1em;
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.blue};
    display: block;
  }

  input {
    float: left;
    margin: 0 0 15px 0;
    width: 300px;
    height: 40px;
    background-color: #f5f6f8;
    font-family: ${props => props.theme.font};
    font-size: 1em;
    font-weight: ${props => props.theme.fontWeights.regular};
    color: #000000;
    border: none;
    border-radius: 0.4rem;
    padding: 0 0 0 10px;
    box-sizing: border-box;
    display: inline-block;
    outline: none;
  }

  button {
    width: 300px;
    height: 40px;
    background-color: ${props => props.theme.colors.blue};
    font-family: ${props => props.theme.font};
    font-size: 1em;
    font-weight: ${props => props.theme.fontWeights.bold};
    color: #ffffff;
    border: none;
    border-radius: 0.4rem;
    outline: none;
    display: inline-block;
    cursor: pointer;
  }
`

const PaymentSuccess = styled.div`
  font-family: ${props => props.theme.font};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  font-size: 1em;
  color: ${props => props.theme.colors.blue};
  text-align: center;
  display: block;
`
const PaymentError = styled.div`
  font-family: ${props => props.theme.font};
  font-weight: ${props => props.theme.fontWeights.regular};
  font-size: 0.8em;
  color: ${props => props.theme.colors.red};
  text-align: center;
  display: block;
`

class Pay extends Component {
  constructor (props) {
    super(props)

    this.state = {
      hasPaid: false,
      hasPayment: false,
      payment: {},
      hasError: false,
      error: ''
    }
  }

  listenPaymentNotification = () => {
    // eslint-disable-next-line prefer-const
    let interval = setInterval(() => {
      api
        .get(`/payments/${this.state.payment.id}`)
        .then(response => {
          const { fetchBalance, fetchInvoices, fetchPayments } = this.props
          const { status } = response.data.data

          if (status === 'completed') {
            clearInterval(interval)

            this.setState({
              hasPaid: true,
              hasPayment: false,
              hasError: false
            })

            fetchBalance()
            fetchInvoices()
            fetchPayments()
          }
        })
        .catch(error => {
          console.error(error)
        })
    }, 5000)
  }

  handleInvoiceSubmit = (values) => {
    const { title, description, invoice } = values
    const request = {
      internalId: title,
      description,
      invoice
    }

    api
      .post('/payments', JSON.stringify(request))
      .then((response) => {
        const { data } = response.data

        this.setState({
          hasPayment: true,
          payment: data
        })

        this.listenPaymentNotification()
      })
      .catch((error) => {
        console.error(error)

        this.setState({
          hasError: true,
          error: 'Payment error'
        })
      })
  }

  showButton = () => {
    const { t } = this.props

    const button = (
      <button type='submit'>
        {t('actions.pay')}
      </button>
    )

    return (
      this.state.hasPayment
        ? <Skeleton height={50} color='#3379fa' />
        : button
    )
  }

  showForm = () => {
    const { t } = this.props
    return (
      <Formik
        initialValues={{
          title: '',
          description: '',
          invoice: ''
        }}
        onSubmit={(values) => this.handleInvoiceSubmit(values)}
      >
        <Form>
          <label htmlFor='title'>
            {t('payments.form.title')}
          </label>
          <Field type='text' name='title' />
          <label htmlFor='description'>
            {t('payments.form.description')}
          </label>
          <Field type='text' name='description' />
          <label htmlFor='invoice'>
            {t('payments.form.invoice')}
          </label>
          <Field type='text' name='invoice' />
          {this.showButton()}
        </Form>
      </Formik>
    )
  }

  renderPayment = () => {
    const { t } = this.props

    return (
      this.state.hasPaid
        ? <PaymentSuccess>{t('payments.successGreeting')}</PaymentSuccess>
        : this.showForm()
    )
  }

  renderTitle = () => {
    const { t } = this.props

    return (
      this.state.hasPaid ? t('payments.success') : t('payments.title')
    )
  }

  renderError = () => {
    return (
      this.state.hasError
        ? <PaymentError>{this.state.error}</PaymentError>
        : ''
    )
  }

  renderInformation = () => {
    const { t } = this.props

    return (
      this.state.hasPaid ? '' : t('payments.description')
    )
  }

  clearPayment = () => {
    this.setState({
      hasPaid: false,
      hasPayment: false,
      payment: {},
      hasError: false,
      error: ''
    })
  }

  render () {
    const { visibility, onHandler } = this.props

    return (
      <ModalLayout
        isOpen={visibility}
        onBackgroundClick={() => {
          onHandler()
          this.clearPayment()
        }}
        onEscapeKeydown={() => {
          onHandler()
          this.clearPayment()
        }}
      >
        <Heading>
          <Icon>
            <LightningIcon size={40} />
          </Icon>
          <Title>
            {this.renderTitle()}
          </Title>
          {this.renderError()}
        </Heading>
        <Information>
          {this.renderInformation()}
        </Information>
        <FormContent>
          {this.renderPayment()}
        </FormContent>
      </ModalLayout>
    )
  }
}

Pay.propTypes = {
  visibility: PropTypes.bool,
  onHandler: PropTypes.func,
  fetchBalance: PropTypes.func,
  fetchInvoices: PropTypes.func,
  fetchPayments: PropTypes.func,
  t: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  fetchBalance: () => dispatch(fetchBalance()),
  fetchInvoices: () => dispatch(fetchInvoices()),
  fetchPayments: () => dispatch(fetchPayments())
})

const mapStateToProps = state => ({
  balance: state.balance.balance,
  invoices: state.invoices.invoices,
  payments: state.payments.payments
})

const translated = withTranslation()(Pay)

export default connect(mapStateToProps, mapDispatchToProps)(translated)
