import {
  FETCH_INVOICES_REQUEST,
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILURE
} from '../constants/action-types'
import api from '../../common/api'

const fetchInvoicesRequest = ({
  type: FETCH_INVOICES_REQUEST
})

const fetchInvoicesSuccess = (invoices) => ({
  type: FETCH_INVOICES_SUCCESS,
  invoices
})

const fetchInvoicesFailure = (error) => ({
  type: FETCH_INVOICES_FAILURE,
  error
})

const fetchInvoices = () => {
  return (dispatch) => {
    dispatch(fetchInvoicesRequest)

    return api
      .get('/charges')
      .then((response) => {
        const { data } = response.data

        data.map((invoice, _) => {
          invoice.type = 'received'
        })

        dispatch(fetchInvoicesSuccess(data))
      })
      .catch(({ message }) => {
        dispatch(fetchInvoicesFailure(message))
      })
  }
}

export { fetchInvoices }
