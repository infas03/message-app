import React from 'react';
import Conversations from './conversations';
import SearchInput from './searchInput';

const Sidebar = () => {
  return (
    <div className="w-96 border-slate-500 flex flex-col bg-gray-600 rounded-s-lg">
      <div className="p-2 h-14">
        <SearchInput />
      </div>
      <Conversations />
    </div>
  );
};
export default Sidebar;
