import { Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import QRCode from 'react-qr-code'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Modal from 'styled-react-modal'
import api from '../../common/api'
import { fetchInvoices } from '../../redux/actions/invoices'
import { toMsats } from '../../utils'
import { fetchPayments } from '../../redux/actions/payments'
import { fetchBalance } from '../../redux/actions/balance'

const ModalLayout = Modal.styled`
  width: 400px;
  height: 500px;
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
  height: 40px;
  display: block;
`

const Title = styled.h1`
  margin: 0;
  float: left;
  font-family: ${props => props.theme.font};
  font-size: 1.4em;
  color: ${props => props.theme.colors.heading};
  display: inline-block;
`

const FormContent = styled.div`
  margin: 0 auto;
  width: 300px;
  align-self: center;
  display: block;

  label {
    margin: 10px 0 5px 0;
    font-family: ${props => props.theme.font};
    font-size: 1em;
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.blue};
    display: block;
  }

  input {
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
    outline: none;
  }
`

const Submit = styled.button`
  margin: 25px 0 0 0;
  width: 300px; 
  height: 40px;
  background-color: ${props => props.theme.colors.blue};
  font-family: ${props => props.theme.font};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: 1em;
  color: #ffffff;
  border: none;
  border-radius: 0.4rem;
  display: block;
  outline: none;
  cursor: pointer;
`
const InvoiceData = styled.div`
  margin: 25px auto 0 auto;
  text-align: center;
  display: block;
`

const InvoiceString = styled.textarea`
  margin: 20px 0 0 0;
  width: 224px;
  height: 60px;
  background-color: transparent;
  border: 3px ${props => props.theme.colors.blue} solid;
  border-radius: 0.4rem;
  padding: 5px;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
`

const PaymentSuccess = styled.div`
  font-family: ${props => props.theme.font};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  font-size: 1em;
  color: ${props => props.theme.colors.blue};
  text-align: center;
`

class InvoiceModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      invoiceId: '',
      invoice: {},
      isPaid: false,
      hasInvoice: false,
      hasError: false,
      error: ''
    }
  }

  listenPaymentNotification = () => {
    // eslint-disable-next-line prefer-const
    let interval = setInterval(() => {
      api
        .get(`/charges/${this.state.invoiceId}`)
        .then(response => {
          const { fetchBalance, fetchInvoices, fetchPayments } = this.props
          const { status } = response.data.data

          if (status === 'completed') {
            clearInterval(interval)

            this.setState({
              isPaid: true,
              hasInvoice: false
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
    const { fetchInvoices } = this.props
    const { title, amount, expiration, description } = values
    const request = {
      expiresIn: (expiration * 60),
      amount: toMsats(amount),
      description,
      internalId: title
    }

    api
      .post('/charges', JSON.stringify(request))
      .then(response => {
        const { invoice, id } = response.data.data

        this.setState({
          hasInvoice: true,
          invoiceId: id,
          invoice
        })

        this.listenPaymentNotification()
        fetchInvoices()
      })
      .catch(({ message }) => {
        this.setState({
          hasError: true,
          error: message
        })
      })
  }

  showInvoice = () => {
    const { invoice } = this.state

    return (
      <InvoiceData>
        <QRCode
          value={invoice.request}
          size={224}
          fgColor='#3379fa'
        />
        <InvoiceString
          value={invoice.request}
          onClick={(e) => {
            e.target.select()
            document.execCommand('copy')
            e.target.focus()
          }}
        />
      </InvoiceData>
    )
  }

  showForm = () => {
    const { t } = this.props

    return (
      <Formik
        initialValues={{
          title: '',
          amount: 1,
          expiration: 2,
          description: ''
        }}
        onSubmit={(values) => this.handleInvoiceSubmit(values)}
      >
        <Form>
          <label htmlFor='title'>{t('invoices.form.title')}</label>
          <Field type='text' name='title' />
          <label htmlFor='amount'>{t('invoices.form.amount')}</label>
          <Field type='number' name='amount' min='1' required />
          <label htmlFor='expiration'>{t('invoices.form.expiration')}</label>
          <Field type='number' name='expiration' min='2' max='20' required />
          <label htmlFor='description'>{t('invoices.form.description')}</label>
          <Field type='text' name='description' />
          <Submit type='submit'>
            {t('invoices.form.submit')}
          </Submit>
        </Form>
      </Formik>
    )
  }

  renderInvoice = () => {
    return (
      this.state.hasInvoice ? this.showInvoice() : this.showForm()
    )
  }

  renderTitle = () => {
    const { t } = this.props

    return (
      this.state.isPaid
        ? t('invoices.success')
        : (
          this.state.hasInvoice ? t('invoices.form.copy') : t('invoices.form.create')
        )
    )
  }

  renderState = () => {
    const { t } = this.props

    return (
      this.state.isPaid
        ? <PaymentSuccess>{t('invoices.successGreeting')}</PaymentSuccess>
        : this.renderInvoice()
    )
  }

  clearInvoice = () => {
    this.setState({
      hasInvoice: false,
      isPaid: false
    })
  }

  render () {
    const { visibility, onHandler } = this.props

    return (
      <ModalLayout
        isOpen={visibility}
        onBackgroundClick={() => {
          onHandler()
          this.clearInvoice()
        }}
        onEscapeKeydown={() => {
          onHandler()
          this.clearInvoice()
        }}
      >
        <Heading>
          <Title>
            {this.renderTitle()}
          </Title>
        </Heading>
        <FormContent>
          {this.renderState()}
        </FormContent>
      </ModalLayout>
    )
  }
}

InvoiceModal.propTypes = {
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

const translated = withTranslation()(InvoiceModal)

export default connect(mapStateToProps, mapDispatchToProps)(translated)
