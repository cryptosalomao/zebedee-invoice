import {
  FETCH_INVOICES_FAILURE,
  FETCH_INVOICES_REQUEST,
  FETCH_INVOICES_SUCCESS
} from '../constants/action-types'

const initialState = {
  invoices: [],
  isLoading: false,
  hasError: false,
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INVOICES_REQUEST:
      return {
        ...state,
        isLoading: true
      }

    case FETCH_INVOICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        invoices: action.invoices
      }

    case FETCH_INVOICES_FAILURE:
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
