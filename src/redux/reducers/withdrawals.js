import {
  FETCH_WITHDRAWALS_REQUEST,
  FETCH_WITHDRAWALS_SUCCESS,
  FETCH_WITHDRAWALS_FAILURE
} from '../constants/action-types'

const initialState = {
  withdrawals: [],
  isLoading: false,
  hasError: false,
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WITHDRAWALS_REQUEST:
      return {
        ...state,
        isLoading: true
      }

    case FETCH_WITHDRAWALS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        withdrawals: action.withdrawals
      }

    case FETCH_WITHDRAWALS_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.error
      }

    default:
      return state
  }
}

export default reducer
