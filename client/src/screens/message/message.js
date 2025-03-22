import React from 'react';
import { useAuthContext } from '../../context/authContext';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();

  const extractTime = (time) => {
    var d = new Date(time);
    d = d.toLocaleString();
    return d;
  };

  const fromMe = message?.senderId === authUser;
  const formattedTime = extractTime(message.timestamp);
  const chatClassName = fromMe ? 'items-end justify-end' : 'items-end';
  const bubbleBgColor = fromMe ? 'bg-[#8fb0b0]' : 'bg-[#f4f8f9]';

  return (
    <div className={`flex ${chatClassName} gap-2.5 w-full mb-4`}>
      <div className="flex flex-col w-full max-w-[320px]">
        <div
          className={`leading-1.5 px-4 py-1.5 border-gray-200 ${bubbleBgColor} text-white rounded-xl dark:bg-gray-700`}
        >
          <p className="text-lg font-semibold">{message?.message}</p>
        </div>
        <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-400 block mt-1">{formattedTime}</span>
      </div>
    </div>
  );
};
export default Message;
