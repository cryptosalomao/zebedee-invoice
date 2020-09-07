import {
  FETCH_PAYMENTS_FAILURE,
  FETCH_PAYMENTS_REQUEST,
  FETCH_PAYMENTS_SUCCESS
} from '../constants/action-types'

const initialState = {
  payments: [],
  isLoading: false,
  hasError: false,
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAYMENTS_REQUEST:
      return {
        ...state,
        isLoading: true
      }

    case FETCH_PAYMENTS_SUCCESS:
      return {
        ...state,
        payments: action.payments
      }

    case FETCH_PAYMENTS_FAILURE:
      return {
        ...state,
        hasError: true,
        error: action.error
      }

    default:
      return state
  }
}

export default reducer
