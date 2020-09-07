import {
  FETCH_PAYMENTS_REQUEST,
  FETCH_PAYMENTS_SUCCESS,
  FETCH_PAYMENTS_FAILURE
} from '../constants/action-types'
import api from '../../common/api'

const fetchPaymentsRequest = ({
  type: FETCH_PAYMENTS_REQUEST
})

const fetchPaymentsSuccess = (payments) => ({
  type: FETCH_PAYMENTS_SUCCESS,
  payments
})

const fetchPaymentsFailure = (error) => ({
  type: FETCH_PAYMENTS_FAILURE,
  error
})

const fetchPayments = () => {
  return (dispatch) => {
    dispatch(fetchPaymentsRequest)

    return api
      .get('/payments')
      .then((response) => {
        const { data } = response.data

        data.map((payment, _) => {
          payment.type = 'sent'
        })

        dispatch(fetchPaymentsSuccess(data))
      })
      .catch(({ message }) => {
        dispatch(fetchPaymentsFailure(message))
      })
  }
}

export { fetchPayments }
