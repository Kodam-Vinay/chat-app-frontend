import { useState } from "react";
import Chat from "../components/chat/Chat";
import Navbar from "../components/Navbar";
import { BACKEND_API } from "../constants/constants";
import ChatError from "../components/chat/ChatError";
import useGetAllUsers from "../hooks/useGetAllUsers";
import ChatBox from "../components/chatBox/ChatBox";
import useDeviceResize from "../hooks/useDeviceResize";
import useSocketConnection from "../hooks/useSocketConnection";

const MainChat = () => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const url = BACKEND_API + "users/find/";
  const result = useDeviceResize();
  useSocketConnection();

  useGetAllUsers({ url, setError, setIsError });

  if (isError) return <ChatError error={error} />;

  return (
    <div className="h-full w-full flex flex-col overflow-y-hidden">
      <Navbar />
      <div className="flex h-full">
        <Chat />
        {result?.width > 700 && <ChatBox />}
      </div>
    </div>
  );
};

export default MainChat;
