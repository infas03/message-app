import {
  FETCH_USER_INIT,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  SET_ALL_USERS,
} from "../actions/userAction";

const initialState = {
  userId: "",
  username: "",
  isNewLogin: null,
  allUsers: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        userId: action.payload?._id,
        username: action.payload?.username,
      };
    case FETCH_USER_INIT:
      return {
        state: initialState,
      };
    case SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
