import React, { useEffect } from 'react';
import Conversation from './conversation';
import { useSelector, useDispatch } from 'react-redux';
import { getConversations } from '../../actions/messageAction';

const Conversations = () => {

  const conversations = useSelector((state) => state.message.useConversations);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('CHECK');
    dispatch(getConversations());
  }, []);

  console.log('conversations?.allUsers: ', conversations?.allUsers);

  return (
    <div className="flex flex-col overflow-auto">
      {conversations?.allUsers?.map((conversation, idx) => (
        <Conversation
          key={conversation?._id}
          conversation={conversation}
          lastIdx={idx === conversations?.allUsers?.length - 1}
        />
      ))}
    </div>
  );
};
export default Conversations;
