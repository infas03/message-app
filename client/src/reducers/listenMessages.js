import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocketContext } from '../context/socketContext';
import { getConversations, setMessages, updateUnreadCount } from '../actions/messageAction';
import { fetchMessages } from '../actions/messageAction';

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const dispatch = useDispatch();
    const currentId = useSelector((state) => state.currentId.currentId);
    const selectedConversation = useSelector((state) => state.message.selectedConversation);

    useEffect(() => {
      console.log('useListenMessages initialized in Dashboard or other pages');
        console.log('Socket:', socket);
        
        const handleNewMessage = (newMessage) => {

            console.log("NEW MESSAGE")

            console.log(newMessage);
            // console.log("currentId: ", currentId)
            // console.log("selectedConversation: ", selectedConversation)
            console.log("selectedConversation.id: ", selectedConversation?._id)
            console.log("newMessage.senderId: ", newMessage?.senderId)

            dispatch(getConversations(currentId))
            
            // newMessage.shouldShake = true;
            // const sound = new Audio(notificationSound);
            // sound.play();
            // dispatch(fetchMessages(newMessage.senderId));

            // dispatch(updateUnreadCount(newMessage.senderId));

            // if (newMessage.senderId != currentId) {

            // dispatch(updateNotificationUnreadCount(newMessage.senderId));

            // }

            if (selectedConversation?._id === newMessage.senderId) {
              console.log('Fetching messages for the current conversation:', selectedConversation._id);
              dispatch(fetchMessages(newMessage.senderId, currentId))
            } else {
              dispatch(updateUnreadCount(newMessage.senderId))
            }
            
           // dispatch(setMessages((prevMessages) => [...prevMessages, newMessage]));
        };

        socket?.on("newMessage", handleNewMessage);

        return () => {
            socket?.off("newMessage");
        };
    }, [socket, dispatch, selectedConversation]);
};

export default useListenMessages;
