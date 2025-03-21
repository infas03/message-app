import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
//import useConversation from "../../zustand/useConversation";
import MessageInput from './messageInput';
import Messages from './messages';
import { TiMessages } from 'react-icons/ti';
//import { useAuthContext } from "../../context/AuthContext";
import { setSelectedConversation } from '../../../actions/messageAction';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages } from '../../../actions/messageAction';
import { useSocketContext } from '../../../context/socketContext';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import defaultImage from '../../../assets/images/Default_profilepic.png';

const MessageContainer = () => {
  const dispatch = useDispatch();
  // const location = useLocation();
  // const { receiverId } = location.state;
  // console.log('receiverId: ', receiverId);
  //const { selectedConversation, setSelectedConversation } = useConversation();
  const selectedConversation = useSelector((state) => state.message.selectedConversation);

  const messages = useSelector((state) => state.message.messages);

  console.log('selectedConversation: ', selectedConversation);
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers?.includes(selectedConversation?._id);

  // useEffect(() => {
  // 	// cleanup function (unmounts)
  // 	return () => setSelectedConversation(null);
  // }, [setSelectedConversation]);

  // useEffect(() => {
  //     console.log("CHECK")
  //     dispatch(fetchMessages(receiverId));
  // }, []);

  useEffect(() => {
    console.log('Current selectedConversation:', selectedConversation);
    if (selectedConversation && selectedConversation._id) {
      console.log('Fetching messages for conversation:', selectedConversation._id);
      dispatch(fetchMessages(selectedConversation._id));
    }
  }, [selectedConversation, dispatch]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(setSelectedConversation(null));
  //   };
  // }, [dispatch]);

  const handleBackClick = () => {
    dispatch(setSelectedConversation(null));
  };

  console.log('container');
  console.log('messages: ', messages);

  return (
    <div className="min-w-full md:min-w-[600px] flex flex-col border-[1px] rounded-e-lg overflow-auto">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className="lg:max-w-[800px] h-full bg-[#f0f0f0] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center py-2 px-5 mb-2 h-14 bg-[#f4f8f9] border-b-[1px]">
            <div className="flex items-center gap-x-2 lg:gap-x-4">
              <img
                src={selectedConversation?.companyLogo ? selectedConversation.companyLogo : defaultImage}
                alt="avatar"
                className="w-11 h-11 rounded-full object-cover lg:hidden"
              />
              <div className="flex flex-col flex-grow">
                <span
                  className="text-gray-900 font-bold text-lg lg:text-2xl max-w-44 lg:max-w-full"
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {selectedConversation?.companyName}
                </span>
                {isOnline && (
                  <div className="flex flex-row items-center gap-x-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-gray-500 font-semibold text-xs">Online</span>
                  </div>
                )}
              </div>
            </div>
            <div
              onClick={() => handleBackClick()}
              className="lg:hidden flex items-center text-sm gap-x-1 font-bold cursor-pointer flex-shrink-0"
            >
              <ChevronLeftIcon className="w-5 h-5 stroke-2" /> <span>Back</span>
            </div>
          </div>
          <Messages />
          <MessageInput />
        </div>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const lang = useSelector((state) => state.language.lang);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        {/* <p>Welcome 👋 {authUser.fullName} ❄</p> */}
        <p>{lang.generalSelectChat}</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
