import { useSelector, useDispatch } from 'react-redux';
import { setSelectedConversation} from '../../actions/messageAction';
import { useSocketContext } from '../../context/socketContext';
import { markMsgAsRead } from '../../actions/messageAction';
import defaultImage from '../../assets/images/Default_profilepic.png';
import { useAuthContext } from '../../context/authContext';

const Conversation = ({ conversation, lastIdx, emoji }) => {
    const { authUser } = useAuthContext();
  
  const dispatch = useDispatch();
  const selectedConversation = useSelector((state) => state.message.selectedConversation);

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const handleSelectConversation = (conversation) => {
    dispatch(setSelectedConversation(conversation));
    dispatch(markMsgAsRead(conversation._id, authUser));
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-gray-300 p-2 cursor-pointer h-[70px] border-y-[1px]
          ${isSelected ? 'bg-blue-100 shadow-inner' : ''}
			`}
        onClick={() => handleSelectConversation(conversation)}
      >
        <div className='flex flex-shrink-0'>
          <div className="relative inline-block">
            <img
              src={defaultImage}
              alt="avatar"
              className="w-11 h-11 rounded-full object-cover"
            />
            {isOnline && (
              <span className="w-4 h-4 rounded-full bg-green-500 border-2 border-white absolute top-0.5 right-0.5"></span>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <div
              className={`font-bold ${isSelected ? 'text-black' : 'text-white'} capitalize text-lg max-w-44`}
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              <span className=''>{conversation.username}</span>
            </div>
            {conversation.unreadCount > 0 && (
              <span className="flex items-center justify-center bg-red-500 text-white rounded-full w-6 h-6">
                {conversation.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Conversation;
