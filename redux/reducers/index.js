import { combineReducers } from "redux";
import auth from './auth'
import transactions from './transactions'
import users from './users'

const rootReducer = combineReducers({
  auth,
  transactions,
  users,
})

export default rootReducer