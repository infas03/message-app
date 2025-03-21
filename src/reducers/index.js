import { combineReducers } from 'redux';
import messagesReducer from "./messageReducer";
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  message: messagesReducer,
});

export default rootReducer;
