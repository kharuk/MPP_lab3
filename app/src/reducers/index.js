import { combineReducers } from 'redux';

import { authentication } from './authenticationReducer';
import { users } from './usersReducer';
import { alert } from './displayMessageReducer';
import {reducer as toastrReducer} from 'react-redux-toastr'

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  toastr: toastrReducer,
});

export default rootReducer;