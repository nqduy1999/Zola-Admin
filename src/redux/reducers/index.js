import { combineReducers } from 'redux';
import AccountReducer from './Account.reducer';
import UsersReducer from './Users.reducer';
const rootReducer = combineReducers({
  AccountReducer,
  UsersReducer
});
export default rootReducer;
