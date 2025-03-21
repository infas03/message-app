import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
//import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from './messageSkeleton';
import { useSelector, useDispatch } from 'react-redux';
import Message from './message';
//import useListenMessages from "../../hooks/useListenMessages";
import { fetchMessages } from '../../../actions/messageAction';
import useListenMessages from '../../../reducers/listenMessages';

const Messages = () => {
  // const { messages, loading } = useGetMessages();
  //const location = useLocation();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.messages);
  // useListenMessages();
  const lastMessageRef = useRef();
  const messageContainerRef = useRef();

  // const { receiverId } = location.state;
  // console.log('receiverId: ', receiverId);

  console.log('checking all messages');
  console.log('Messages before rendering:', messages);
  console.log("Is 'messages' an array?:", Array.isArray(messages));

  useEffect(() => {
    console.log('CHECK');
    //  dispatch(fetchMessages(receiverId));
  }, []);

  // useEffect(() => {
  //   if (messages?.messages?.length > 0) {
  //     setTimeout(() => {
  //       lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  //     }, 100);
  //   }
  // }, [messages]);

  // useEffect(() => {
  //   if (messages?.messages?.length > 0) {
  //     setTimeout(() => {
  //       // Only scroll into view if the last message is not visible
  //       const { current: lastMessageElement } = lastMessageRef;
  //       if (lastMessageElement) {
  //         const scrollContainer = lastMessageElement.closest('.overflow-auto');
  //         const isScrolledToBottom = scrollContainer.scrollHeight - scrollContainer.clientHeight <= scrollContainer.scrollTop + 1;
  
  //         if (!isScrolledToBottom) {
  //           lastMessageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  //         }
  //       }
  //     }, 100);
  //   }
  // }, [messages]);

  useEffect(() => {
    if (messages?.messages?.length > 0 && messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  

  return (
    <div className="px-1 flex-1 w-full overflow-auto" ref={messageContainerRef}>
      {messages?.messages?.length > 0 &&
        messages?.messages?.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {/*  {[...Array(3)].map((_, idx) => (
   <MessageSkeleton key={idx} />
 ))} */}

      {messages?.messages?.length === 0 && <p className="text-center">Send a message to start the conversation</p>}
    </div>
  );
};
export default Messages;