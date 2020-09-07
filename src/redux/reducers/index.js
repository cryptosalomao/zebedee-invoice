import { combineReducers } from 'redux'
import balance from './balance'
import invoices from './invoices'
import payments from './payments'
import withdrawals from './withdrawals'

export default combineReducers({
  balance,
  invoices,
  payments,
  withdrawals
})
