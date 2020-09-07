import api from '../../common/api'
import {
  FETCH_BALANCE_FAILURE,
  FETCH_BALANCE_REQUEST,
  FETCH_BALANCE_SUCCESS
} from '../constants/action-types'

const fetchBalanceRequest = ({
  type: FETCH_BALANCE_REQUEST
})

const fetchBalanceSuccess = (balance) => ({
  type: FETCH_BALANCE_SUCCESS,
  balance
})

const fetchBalanceFailure = (error) => ({
  type: FETCH_BALANCE_FAILURE,
  error
})

const fetchBalance = () => {
  return (dispatch) => {
    dispatch(fetchBalanceRequest)

    return api
      .get('/wallet')
      .then((response) => {
        const { data } = response
        dispatch(fetchBalanceSuccess(data.data.balance))
      })
      .catch((error) => {
        dispatch(fetchBalanceFailure(error.message))
      })
  }
}

export { fetchBalance }
