import {
  FETCH_USER_INIT,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS
} from '../actions/userAction';

const initialState = {
  userId: '',
  username: '',
  isNewLogin: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state
      };
    case FETCH_USER_SUCCESS:
      console.log('user payload: ', action.payload);
      return {
        ...state,
        userId: action.payload?.user?._id,
        username: action.payload?.user?.username,
      };
    case FETCH_USER_INIT:
      return {
        state: initialState
      };
    default:
      return state;
  }
};

export default userReducer;