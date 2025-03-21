import {
  SET_SELECTED_CONVERSATION,
  SET_MESSAGES,
  GET_CONVERSATIONS_SUCCESS,
  MARK_MSG_AS_READ_SUCCESS,
  UPDATE_UNREAD_COUNT,
} from '../actions/messageAction';

const initialState = {
  selectedConversation: null,
  messages: [],
  useConversations: [],
  allConversationsUnreadCount: 0
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_CONVERSATION:
      return {
        ...state,
        selectedConversation: action?.payload
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action?.payload
      };
    case GET_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        useConversations: action?.payload
      };
    case MARK_MSG_AS_READ_SUCCESS:
      return {
        ...state,
        useConversations: {
          ...state.useConversations,
          allUsers: state.useConversations.allUsers.map((conversation) => {
            if (conversation._id === state.selectedConversation._id) {
              return {
                ...conversation,
                unreadCount: 0
              };
            }
            return conversation;
          })
        },
        allConversationsUnreadCount: state.useConversations.allUsers.reduce((total, conversation) => {
          if (conversation._id === state.selectedConversation._id) {
            return total;
          }
          return total + (conversation.unreadCount || 0);
        }, 0)
      };

    case UPDATE_UNREAD_COUNT:
      const updatedConversations = state?.useConversations?.allUsers?.map((conversation) => {
        console.log('action payload: ', action.payload);
        console.log('state.selectedConversation._id: ', state.selectedConversation?._id);
        if (action.payload === conversation?._id) {
          if (conversation._id !== state.selectedConversation?._id) {
            return {
              ...conversation,
              unreadCount: (conversation?.unreadCount || 0) + 1
            };
          }
        }
        return conversation;
      });

      const totalUnreadCount = updatedConversations?.reduce((total, conversation) => {
        return total + (conversation?.unreadCount || 0);
      }, 0);

      return {
        ...state,
        useConversations: {
          ...state.useConversations,
          allUsers: updatedConversations
        },
        allConversationsUnreadCount: totalUnreadCount
      };

    default:
      return state;
  }
};

export default messagesReducer;
