import {
  FETCH_WITHDRAWALS_REQUEST,
  FETCH_WITHDRAWALS_SUCCESS,
  FETCH_WITHDRAWALS_FAILURE
} from '../constants/action-types'
import api from '../../common/api'

const fetchWithdrawalsRequest = ({
  type: FETCH_WITHDRAWALS_REQUEST
})

const fetchWithdrawalsSuccess = (withdrawals) => ({
  type: FETCH_WITHDRAWALS_SUCCESS,
  withdrawals
})

const fetchWithdrawalsFailure = (error) => ({
  type: FETCH_WITHDRAWALS_FAILURE,
  error
})

const fetchWithdrawals = () => {
  return (dispatch) => {
    dispatch(fetchWithdrawalsRequest)

    return api
      .get('/withdrawal-requests')
      .then((response) => {
        const { data } = response.data

        data.map((withdrawal, _) => {
          withdrawal.type = 'sent'
        })

        dispatch(fetchWithdrawalsSuccess(data))
      })
      .catch(({ message }) => {
        dispatch(fetchWithdrawalsFailure(message))
      })
  }
}

export { fetchWithdrawals }
