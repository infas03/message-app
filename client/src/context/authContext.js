import { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const AuthContext = createContext(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const currentId = useSelector((state) => state.currentId?.currentId);
  const [authUser, setAuthUser] = useState(null);
  
  useEffect(() => {
    console.log("useEffect currentId: ", currentId );

    if (currentId) {
      setAuthUser({ id: currentId });
    } else {
      setAuthUser(null);
    }
    console.log("Inside useEffect - authUser: ", { id: currentId });
  }, [currentId]);

  console.log("currentId: ", currentId );
  console.log("authUser: ", authUser );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

