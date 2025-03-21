import axios from 'axios';
import { ToastBar } from '../common/toastbar';

const apiUrl = process.env.REACT_APP_APIURL;
console.log('apiUrl: ', apiUrl);
const localLang = localStorage.getItem('lan');

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const FETCH_USER_GOOGLE_SUCCESS = 'FETCH_USER_GOOGLE_SUCCESS';
export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const FETCH_USER_LOGOUT = 'FETCH_USER_LOGOUT';
export const FETCH_USER_INIT = 'FETCH_USER_INIT';
export const FETCH_USER_BY_ID = 'FETCH_USER_BY_ID';
export const SET_CURRENT_USER_ID = 'SET_CURRENT_USER_ID';
export const SET_CURRENT_USER_ID_NULL = 'SET_CURRENT_USER_ID_NULL';
export const FETCH_ALL_INTERVIEWS = 'FETCH_ALL_INTERVIEWS';

export const fetchUserRequest = () => ({ type: FETCH_USER_REQUEST });

export const fetchUserSuccess = (data) => ({
  type: FETCH_USER_SUCCESS,
  payload: data
});

export const fetchUserLogin = () => ({
  type: FETCH_USER_LOGIN
});

export const fetchUserError = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error
});

export const fetchUserLogout = () => ({
  type: FETCH_USER_LOGOUT
});

export const fetchUserInit = () => ({
  type: FETCH_USER_INIT
});

export const fetchUserById = (data) => ({
  type: FETCH_USER_BY_ID,
  payload: data
});

export const setCurrentId = (id) => ({
  type: SET_CURRENT_USER_ID,
  payload: id
});

export const setCurrentIdNull = () => ({
  type: SET_CURRENT_USER_ID_NULL
});

export const userLogin = (values, navigate, setAuthUser) => {
  console.log("login inputData: ", values);
  return async (dispatch) => {
    try {
      const response = await axios.post(`${apiUrl}/user/createuser`, values);
      if (response.status === 200) {
        console.log('login res: ', response.data)
        console.log('candidate login id: ', response.data.result._id);
        dispatch(setCurrentId(response.data.result._id));
        setAuthUser(response.data.result._id);
        navigate('/message');
        ToastBar.success(response.data.successMsg);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log(error.response.data.errorMsg);
        ToastBar.error(error.response.data.errorMsg);
      } else {
        console.log(error.message);
        ToastBar.error(error.message);
      }
    }
  };
};


export const userLogout = (navigate, setAuthUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${apiUrl}/user/logout`,{}, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      );

      if (response.status === 200) {
        navigate('/');
        setTimeout(() => {
          localStorage.removeItem('token');
          dispatch(fetchUserInit());
          setAuthUser(null);
          ToastBar.success(response.data.successMsg);
        }, 0);
      }
    } catch (error) {
      // Handle error response
      if (error.response && error.response.status === 500) {
        console.log(error.response.data.errorMsg);
        ToastBar.error(error.response.data.errorMsg[localLang]);
      } else {
        // Handle other errors
        console.log(error.message);
        ToastBar.error(error.message);
      }
    }
  };
};
