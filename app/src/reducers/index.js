import { combineReducers } from 'redux';

import { authentication } from './authenticationReducer';
import { users } from './usersReducer';
import { alert } from './displayMessageReducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert
});

export default rootReducer;