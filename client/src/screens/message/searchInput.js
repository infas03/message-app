import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoSearchSharp } from 'react-icons/io5';
import { setSelectedConversation } from '../../actions/messageAction';
import { ToastBar } from '../../common/toastbar';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.message.useConversations);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length >= 3) {
      const results = conversations.allUsers.filter((c) =>
        c.companyName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (conversation) => {
    dispatch(setSelectedConversation(conversation));
    setSearch('');
    setSearchResults([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return ToastBar.error('Search term must be at least 3 characters long');
    }

    const conversation = conversations.allUsers.find((c) => c.companyName.toLowerCase().includes(search.toLowerCase()));

    if (conversation) {
      dispatch(setSelectedConversation(conversation));
      setSearch('');
      setSearchResults([]);
    } else ToastBar.error('No such user found!');
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered rounded-md w-full h-9 pl-8 outline-none active:border-none"
          value={search}
          onChange={handleSearchChange}
        />
        <IoSearchSharp className="w-4 h-4 outline-none fill-black absolute left-2" />
      </form>
      {searchResults.length > 0 && (
        <ul className="bg-white border rounded mt-2 absolute w-full z-50 ">
          {searchResults.map((result) => (
            <li
              key={result._id}
              className="px-4 py-4 cursor-pointer hover:bg-gray-200 font-semibold text-lg"
              onClick={() => handleResultClick(result)}
            >
              {result.companyName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
