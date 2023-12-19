import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { storeOnlineUsers } from "../store/slices/socketSlice";
import { addSocketServer } from "../store/slices/socketSlice";

const useSocketConnection = () => {
  const [socket, setSocket] = useState(null);
  const user = useSelector((store) => store?.persistedReducer?.user?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // const newSocket = io(process.env.REACT_APP_SOCKET_CONNECTION);
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);
    return () => {
      newSocket.off();
    };
  }, [user]);

  //storing online users
  useEffect(() => {
    if (!socket) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", (users) => {
      dispatch(storeOnlineUsers(users));
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  useEffect(() => {
    dispatch(addSocketServer(socket));
  }, [socket, user]);
};

export default useSocketConnection;
