import { useState } from "react";
import Chat from "../components/chat/Chat";
import Navbar from "../components/Navbar";
import { BACKEND_API } from "../constants/constants";
import ChatError from "../components/chat/ChatError";
import useGetAllUsers from "../hooks/useGetAllUsers";
import ChatBox from "../components/chatBox/ChatBox";
import useDeviceResize from "../hooks/useDeviceResize";
import useSocketConnection from "../hooks/useSocketConnection";
import useGetNotifications from "../hooks/useGetNotifications";
import { useSelector } from "react-redux";

const MainChat = () => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const url = BACKEND_API + "users/find/";
  const result = useDeviceResize();
  useSocketConnection();
  useGetNotifications();
  const activeChat = useSelector((store) => store?.chat?.activeChat);
  useGetAllUsers({ url, setError, setIsError });

  if (isError) return <ChatError error={error} />;

  return (
    <div className={`h-full  flex flex-col overflow-hidden w-full`}>
      <Navbar />
      <div
        className={`h-[90%] w-[99%] ${result?.width > 700 && "flex w-full"}`}
      >
        {result.width <= 700 && activeChat ? (
          <ChatBox />
        ) : result.width > 700 && activeChat ? (
          <>
            <Chat />
            <ChatBox />
          </>
        ) : (
          <Chat />
        )}
      </div>
    </div>
  );
};

export default MainChat;
