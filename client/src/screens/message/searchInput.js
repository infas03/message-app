import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoSearchSharp } from 'react-icons/io5';
import { setSelectedConversation } from '../../actions/messageAction';
import { ToastBar } from '../../common/toastbar';
import { fetchAllUsers } from '../../actions/userAction';
import { useAuthContext } from '../../context/authContext';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.message.useConversations);
  const allUsers = useSelector((state) => state.user.allUsers);

  const { authUser } = useAuthContext();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length >= 3) {
      const results = conversations.allUsers.filter((c) =>
        c.username.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  useEffect(()=>{
    dispatch(fetchAllUsers())
  }, [])

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

    const filteredUsers = allUsers.filter(user => user._id !== authUser);
    console.log('filteredUsers:', filteredUsers);

    const conversation = filteredUsers.find((c) => c.username.toLowerCase().includes(search.toLowerCase()));

    console.log('conversation:', conversation);
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
