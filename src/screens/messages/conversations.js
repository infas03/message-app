//import useGetConversations from "../../hooks/useGetConversations";
import React, { useEffect, useState } from 'react';
//import { getRandomEmoji } from '../../common/emojis';
import Conversation from './conversation';
import { useSelector, useDispatch } from 'react-redux';
import { getConversations } from '../../../actions/messageAction';

const Conversations = () => {
  //const { loading, conversations } = useGetConversations();

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
          //emoji={getRandomEmoji()}
          lastIdx={idx === conversations?.allUsers?.length - 1}
        />
      ))}

      {/* {loading ? <span className='loading loading-spinner mx-auto'></span> : null} */}
    </div>
  );
};
export default Conversations;
