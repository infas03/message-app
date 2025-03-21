import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Message from './message';

const Messages = () => {

  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.messages);
  const lastMessageRef = useRef();
  const messageContainerRef = useRef();

  console.log('checking all messages');
  console.log('Messages before rendering:', messages);
  console.log("Is 'messages' an array?:", Array.isArray(messages));

  useEffect(() => {
    console.log('CHECK');
  }, []);

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

      {messages?.messages?.length === 0 && <p className="text-center">Send a message to start the conversation</p>}
    </div>
  );
};
export default Messages;