import {
  FETCH_BALANCE_FAILURE,
  FETCH_BALANCE_REQUEST,
  FETCH_BALANCE_SUCCESS
} from '../constants/action-types'

const initialState = {
  balance: 0,
  isLoading: false,
  hasError: false,
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BALANCE_REQUEST:
      return {
        ...state,
        isLoading: true
      }

    case FETCH_BALANCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        balance: +action.balance
      }

    case FETCH_BALANCE_FAILURE:
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
