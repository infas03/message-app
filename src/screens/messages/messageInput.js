import { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import { fetchMessages, sendMessage } from '../../../actions/messageAction';
import { useSelector, useDispatch } from 'react-redux';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  //const { loading, sendMessage } = useSendMessage();
  const dispatch = useDispatch();
  const selectedConversation = useSelector((state) => state.message.selectedConversation);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    const id = selectedConversation?._id;
    dispatch(sendMessage(id, message));
    setMessage('');
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="text-base rounded-lg font-semibold block w-full p-4 border-transparent bg-[#f4f8f9] shadow-lg text-black"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
          <BsSend />
          {/* {loading ? <div className='loading loading-spinner'></div> : <BsSend />} */}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
