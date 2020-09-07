import React, { Component } from 'react'
import styled from 'styled-components'
import Add from '@iconscout/react-unicons/icons/uil-plus-circle'
// import InvoicePaper from '@iconscout/react-unicons/icons/uil-invoice'
import { connect } from 'react-redux'
import { fetchInvoices } from '../../redux/actions/invoices'
import PropTypes from 'prop-types'
import Invoice from './Invoice'
import media from 'styled-media-query'
import InvoiceModal from './InvoiceModal'
import { withTranslation } from 'react-i18next'
import Skeleton from 'react-loading-skeleton'

const InvoicesContainer = styled.div`
  ${media.lessThan('medium')`
    margin: 30px 0 40px 0;
    border: none;
    padding: 0;
  `}

  width: 100%;
  height: 500px;
  border-left: 3px #f5f6f8 solid;
  padding: 10px 20px 0 20px;
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
const CreateInvoice = styled.button`
  ${media.lessThan('small')`
    margin: 20px 0 20px 0;
    width: 100%;
    display: block;
  `}

  float: right;
  height: 40px;
  background-color: transparent;
  font-family: ${props => props.theme.font};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: 0.9em;
  color: ${props => props.theme.colors.blue};
  border: 2px ${props => props.theme.colors.blue} solid;
  border-radius: 0.4rem;
  display: inline-block;
  outline: none;
  cursor: pointer;

  .icon {
    float: left;
    margin: 0 10px 0 0;
    display: inline-block;
  }

  .title {
    float: right;
    display: inline-block;
  }
`

const InvoicesContent = styled.div`
  margin: 50px 0 0 0;
  width: 100%;
  min-height: 300px;
  max-height: 400px;
  border-radius: 0.4rem;
  padding: 0 5px 0 0;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: ${props => props.theme.colors.blue} ${props => props.theme.colors.contentContainer};
  display: block;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    // background: red;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e5e5e5;
    border-radius: 20px;
    border: 3px solid ${props => props.theme.colors.blue};
  }
`

class Invoices extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modalVisibility: false
    }
  }

  componentDidMount = () => {
    const { fetchInvoices } = this.props

    fetchInvoices()
  }

  createInvoicesList = () => {
    const { invoices } = this.props

    const filtered = (
      invoices.filter(
        (invoice) => {
          const { status } = invoice

          return status === 'expired' || status === 'pending'
        }
      )
    )

    const sorted = (
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    )

    return (
      sorted
        .slice(0, 5)
        .map((_invoice, index) => {
          const {
            amount,
            description,
            createdAt,
            // confirmedAt,
            status,
            expiresAt,
            // id,
            // invoice,
            internalId
          } = _invoice

          return (
            <Invoice
              key={index}
              title={internalId}
              value={amount}
              description={description}
              status={status}
              createdAt={createdAt}
              expiresAt={expiresAt}
            />
          )
        })
    )
  }

  showInvoices = () => {
    const { isLoading, hasError } = this.props

    if (hasError) {
      return 'Error while fetching invoices'
    }
    return isLoading ? <Skeleton count={3} height={50} /> : this.createInvoicesList()
  }

  handleModalVisibility = () => {
    this.setState({
      modalVisibility: !this.state.modalVisibility
    })
  }

  render () {
    const { t } = this.props

    return (
      <InvoicesContainer>
        <Heading>
          <Title>
            {t('invoices.title')}
          </Title>
          <CreateInvoice onClick={this.handleModalVisibility}>
            <Add size={20} className='icon' />
            <span className='title'>
              {t('invoices.create')}
            </span>
          </CreateInvoice>
        </Heading>
        <InvoicesContent>
          {this.showInvoices()}
        </InvoicesContent>
        <InvoiceModal
          visibility={this.state.modalVisibility}
          onHandler={this.handleModalVisibility}
        />
      </InvoicesContainer>
    )
  }
}

Invoices.propTypes = {
  invoices: PropTypes.array,
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
  fetchInvoices: PropTypes.func,
  t: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  fetchInvoices: () => dispatch(fetchInvoices())
})

const mapStateToProps = state => ({
  invoices: state.invoices.invoices,
  isLoading: state.invoices.isLoading,
  hasError: state.invoices.hasError
})

const translated = withTranslation()(Invoices)

export default connect(mapStateToProps, mapDispatchToProps)(translated)
