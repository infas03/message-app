import { useDispatch, useSelector } from 'react-redux';
import MessageContainer from './messageContainer';
import Sidebar from './sideBar';
import { useEffect } from 'react';
import { setMessages, setSelectedConversation } from '../../actions/messageAction';
import { userLogout } from '../../actions/userAction';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';

const MessageHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser ,setAuthUser } = useAuthContext();

  console.log('authUser: ', authUser)

  const selectedConversation = useSelector((state) => state.message.selectedConversation);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setSelectedConversation(null));
    dispatch(setMessages([]))
  },[])

  const handleLogout = () => {
    dispatch(userLogout(navigate, setAuthUser));
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 justify-center items-center p-5">
      <div className="flex items-center justify-end gap-x-5 w-full">
        <div className='text-white font-bold text-lg'>{user?.username}</div>
        <button onClick={handleLogout} className='bg-red-500 px-5 py-2 rounded-md w-fit hover:bg-red-700 text-white font-bold'>
          Logout
        </button>
      </div>

      <div className="flex h-[650px] my-1 rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 justify-center">
        <div className={`${selectedConversation ? 'hidden' : 'flex w-full p-5 h-screen'}`}>
          <Sidebar />
        </div>
        <div className={`${selectedConversation ? 'w-full flex p-5 ' : 'hidden'}`}>
          <MessageContainer />
        </div>
      </div>
    </div>
  );
};
export default MessageHome;

// import { useDispatch, useSelector } from 'react-redux';
// import MessageContainer from './messageContainer';
// import Sidebar from './sideBar';
// import { useEffect } from 'react';
// import { setMessages, setSelectedConversation } from '../../actions/messageAction';
// import { userLogout } from '../../actions/userAction';
// import { useNavigate } from 'react-router-dom';
// import { useAuthContext } from '../../context/authContext';

// const MessageHome = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { authUser ,setAuthUser } = useAuthContext();

//   console.log('authUser: ', authUser)

//   const selectedConversation = useSelector((state) => state.message.selectedConversation);
//   const user = useSelector((state) => state.user);

//   useEffect(() => {
//     dispatch(setSelectedConversation(null));
//     dispatch(setMessages([]))
//   },[])

//   const handleLogout = () => {
//     dispatch(userLogout(navigate, setAuthUser));
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-slate-950 p-5">
//       <div className="flex items-center justify-end gap-x-5">
//         <div className='text-white font-bold text-lg'>{user?.username}</div>
//         <button onClick={handleLogout} className='bg-red-500 px-5 py-2 rounded-md w-fit hover:bg-red-700 text-white font-bold'>
//           Logout
//         </button>
//       </div>

//       <div className="flex h-[450px] md:h-[650px] min-h-[90vh] mt-5 my-1 rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 justify-center">
//         <div className={`${selectedConversation ? 'hidden lg:flex' : 'flex w-full lg:w-fit p-5 lg:p-0 h-screen lg:h-full'}`}>
//           <Sidebar />
//         </div>
//         <div className={`${selectedConversation ? 'w-full lg:w-fit flex p-5 lg:p-0' : 'hidden lg:flex'}`}>
//           <MessageContainer />
//         </div>
//       </div>
//     </div>
//   );
// };
// export default MessageHome;
