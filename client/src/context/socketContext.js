import { createContext, useState, useEffect, useContext } from "react";
import { useSelector } from 'react-redux';
import io from "socket.io-client";
import { useAuthContext } from "./authContext";


const SocketContext = createContext();
const socketUrl = process.env.REACT_APP_SOCKET_APIURL;

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();
  console.log("authUser OUTSIDE: " + authUser);


	useEffect(() => {
    console.log("authUser: " + authUser);

		if (authUser) {
			console.log("if authUser?.id: " + authUser);
			console.log("socketUrl: ", socketUrl);
			const socket = io(socketUrl, {
				query: {
					userId: authUser,
				},
			});

			setSocket(socket);
			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
        console.log('inside socket on users: ', users);
				setOnlineUsers(users);
			});


			return () => {
				socket.close();
			  };
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
		  {children}
		</SocketContext.Provider>
	  );
};