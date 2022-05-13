import { combineReducers } from "redux";
import auth from './auth'
import transactions from './transactions'
import users from './users'
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";


const persisAuth = {
  key: 'auth',
  storage
};

const rootReducer = combineReducers({
  auth: persistReducer(persisAuth, auth),
  transactions,
  users,
})

export default rootReducer