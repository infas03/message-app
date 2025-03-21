import { useDispatch, useSelector } from 'react-redux';
import MessageContainer from './messageContainer';
import Sidebar from './sideBar';
import { useEffect } from 'react';
import { setMessages, setSelectedConversation } from '../../actions/messageAction';

const MessageHome = () => {
  const dispatch = useDispatch();
  const selectedConversation = useSelector((state) => state.message.selectedConversation);

  useEffect(() => {
    dispatch(setSelectedConversation(null));
    dispatch(setMessages([]))
  },[])
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <div className="flex h-[450px] md:h-[650px] min-h-[90vh] mt-10 my-1 rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 justify-center">
        <div className={`${selectedConversation ? 'hidden lg:flex' : 'flex w-full lg:w-fit p-5 lg:p-0 h-screen lg:h-full'}`}>
          <Sidebar />
        </div>
        <div className={`${selectedConversation ? 'w-full lg:w-fit flex p-5 lg:p-0' : 'hidden lg:flex'}`}>
          <MessageContainer />
        </div>
      </div>
    </div>
  );
};
export default MessageHome;
