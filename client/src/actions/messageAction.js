import axios from 'axios';
import { ToastBar } from '../common/toastbar';

const apiUrl = process.env.REACT_APP_APIURL;
const localLang = localStorage.getItem('lan');

export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const SET_SELECTED_CONVERSATION = 'SET_SELECTED_CONVERSATION';
export const SET_MESSAGES = 'SET_MESSAGES';
export const GET_CONVERSATIONS_SUCCESS = 'GET_CONVERSATIONS_SUCCESS';
export const MARK_MSG_AS_READ_SUCCESS = 'MARK_MSG_AS_READ_SUCCESS';
export const UPDATE_UNREAD_COUNT = 'UPDATE_UNREAD_COUNT';

export const fetchMessagesSuccess = (data) => ({
  type: FETCH_MESSAGES_SUCCESS,
  payload: data
});

export const setSelectedConversation = (selectedConversation) => ({
  type: SET_SELECTED_CONVERSATION,
  payload: selectedConversation
});

export const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages
});

export const getConversationsSuccess = (data) => ({
  type: GET_CONVERSATIONS_SUCCESS,
  payload: data
});

export const markMsgAsReadSuccess = (notification) => ({
  type: MARK_MSG_AS_READ_SUCCESS,
  payload: notification
});

export const updateUnreadCount = (senderId) => {
  return {
    type: UPDATE_UNREAD_COUNT,
    payload: senderId
  };
};

export const fetchMessages = (id, senderId) => {
  console.log('selected id ' + id);
  console.log('senderId ' + senderId);
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}/message/get/${id}`, {
        params: {
          senderId: senderId
        }
      });
      if (response.status === 200) {
        dispatch(setMessages(response.data));
      }
    } catch (error) {
      // Handle error response
      if (error.response && error.response.status === 500) {
        dispatch({ type: 'FETCH_MESSAGES_FAILURE', payload: error.message });
        console.log(error?.response?.data?.errorMsg[localLang]);
      }
      else {
        // Handle other errors
        console.log(error.message);
        ToastBar.error(error.message);
      }
      return { error: error.message };
    };
  };
};

export const fetchAllMessages = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}/message/getall`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      if (response.status === 200) {
        console.log('msg res :' + response.data);
        dispatch(setMessages(response.data));
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log(error?.response?.data?.errorMsg[localLang]);
      } else {
        console.log('check error here');
        dispatch({ type: 'FETCH_MESSAGES_FAILURE', payload: error.message });
      }
    }
  };
};

export const addToConversation = (applicant) => async (dispatch) => {
  console.log('adding covo applicant: ', applicant);
  try {
    const response = await axios.post(
      `${apiUrl}/message/addtoconversation/${applicant?._id}`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
    );
    if (response.status === 200) {
      console.log('add to convo res ' + response.data);
      //dispatch(setMessages(response?.data));
      dispatch(getConversations());
      dispatch(setSelectedConversation(applicant));
    }
  } catch (error) {
    // Handle error response
    if (error.response && error.response.status === 500) {
      console.log(error?.response?.data?.errorMsg[localLang]);
      dispatch({ type: 'SEND_MESSAGE_FAILURE', payload: error.message });
    } else {
      // Handle other errors
      console.log(error.message);
      ToastBar.error(error.message);
    }
    return { error: error.message };
  }
};

// export const addToConversation = (id) => async (dispatch) => {
//   console.log('adding covo id: ', id);
//   try {
//     const response = await axios.post(
//       `${apiUrl}/message/addtoconversation/${id}`,
//       {},
//       {
//         headers: {
//           Authorization: 'Bearer ' + localStorage.getItem('token')
//         }
//       }
//     );
//     console.log('add to convo res ' + response.data);
//     //dispatch(setMessages(response?.data));
//   } catch (err) {
//     dispatch({ type: 'SEND_MESSAGE_FAILURE', payload: err.message });
//   }
// };

export const sendMessage = (id, messageContent, senderId) => async (dispatch) => {
  console.log('new message');
  try {
    const response = await axios.post(
      `${apiUrl}/message/send/${id}`,
      { message: messageContent },
      {
        params: {
          senderId: senderId
        }
      }
    );
    if (response.status === 200) {
      console.log('res ' + response.data);
      // dispatch(setNewMessages(response?.data));
      dispatch(fetchMessages(id, senderId));
      dispatch(getConversations(senderId))
    }
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.log(error?.response?.data?.errorMsg[localLang]);
      dispatch({ type: 'SEND_MESSAGE_FAILURE', payload: error.message });
    } else {
      // Handle other errors
      console.log(error.message);
      ToastBar.error(error.message);
    }
    return { error: error.message };
  }
};

export const getConversations = (value) => async (dispatch) => {
  console.log('get conversations value: ', value);
  try {
    const response = await axios.get(`${apiUrl}/message/getusersforsidebar?currentId=${value}`);
    if (response.status === 200) {
      console.log('res ' + response.data);
      dispatch(getConversationsSuccess(response.data));
    }
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.log(error?.response?.data?.errorMsg[localLang]);
      dispatch({ type: 'GET_CONVERSATIONS_FAILURE', payload: error.message });
    } else {
      // Handle other errors
      console.log(error.message);
      ToastBar.error(error.message);
    }
    return { error: error.message };
  }
};

export const markMsgAsRead = (senderId, currentId) => {
  console.log('read id: ', senderId);
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/message/markAsRead/${senderId}`,
        {},
        {
          params: {
            currentId: currentId
          }
        }
      );
      if (response.status === 200) {
        dispatch(markMsgAsReadSuccess(response.data));
        //dispatch(getConversations());
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
