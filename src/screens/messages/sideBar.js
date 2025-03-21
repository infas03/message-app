import React from 'react';
import Conversations from './conversations';
import SearchInput from './searchInput';

const Sidebar = () => {
  return (
    <div className=" w-full lg:w-72 border-r border-slate-500 flex flex-col border-[1px] bg-[#f4f8f9] rounded-s-lg">
      <div className="p-2 h-14">
        <SearchInput />
      </div>
      {/* <div className="divider border-[1px] border-t border-gray-300"></div> */}
      <Conversations />
    </div>
  );
};
export default Sidebar;
