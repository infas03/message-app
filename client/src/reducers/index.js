import { combineReducers } from 'redux';
import messagesReducer from "./messageReducer";
import userReducer from './userReducer';
import currentAuthReducer from './currentAuthReducer';

const rootReducer = combineReducers({
  currentId: currentAuthReducer,
  user: userReducer,
  message: messagesReducer,
});

export default rootReducer;
