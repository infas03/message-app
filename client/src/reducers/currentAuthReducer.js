import { SET_CURRENT_USER_ID } from "../actions/userAction";
import { SET_CURRENT_USER_ID_NULL } from "../actions/userAction";
const initialState = {
  currentId: "",
};

const currentAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER_ID:
      return {
        ...state,
        currentId: action?.payload,
      };
    case SET_CURRENT_USER_ID_NULL:
      return {
        ...state,
        currentId: "",
      };
    default:
      return state;
  }
};

export default currentAuthReducer;
