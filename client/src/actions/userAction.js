import axios from 'axios';
import { ToastBar } from '../common/toastbar';

const apiUrl = process.env.REACT_APP_APIURL;
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

export const fetchAllInterviews = (data) => ({
  type: FETCH_ALL_INTERVIEWS,
  payload: data
});

export const candidateLogin = (values, navigate, setAuthUser) => {
  console.log('login');
  const inputData = {
    email: values.email,
    password: values.password
  };
  console.log(inputData);
  return async (dispatch) => {
    try {
      const response = await axios.post(`${apiUrl}/user/userlogin`, inputData);
      if (response.status === 200) {
        console.log(response.data)
        console.log("CHECKING ")
        localStorage.setItem('token', response.data.token);
        // dispatch(getCurrentUser());
        dispatch(fetchUserLogin());
        dispatch(setCurrentId(response.data.user._id));
        console.log('candidate login id');
        console.log(response.data._id);
        setAuthUser(response.data._id);
        navigate('/search-jobs');
        ToastBar.success(response.data.successMsg[localLang]);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log(error.response.data.errorMsg);
        ToastBar.error(error.response.data.errorMsg[localLang]);
        if (error.response.data.status === 0) {
          navigate('/not-activated');
        } else if (error.response.data.status === 3) {
          navigate('/suspended');
        }
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
        `${apiUrl}/user/logout`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      );

      if (response.status === 200) {
        navigate('/');
        setTimeout(() => {
          localStorage.removeItem('token');
          dispatch(fetchUserLogout());
          dispatch(fetchUserInit());
          setAuthUser(null);
          dispatch(setCurrentIdNull());
          ToastBar.success(response.data.successMsg[localLang]);
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
