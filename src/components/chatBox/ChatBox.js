import { useDispatch, useSelector } from "react-redux";
import useFetchReciverUser from "../../hooks/useFetchReciverUser";
import { useState } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import { BACKEND_API } from "../../constants/constants";
import ChatError from "../chat/ChatError";
import Loader from "../Loader";
import ChatInfo from "./ChatInfo";
import useDeviceResize from "../../hooks/useDeviceResize";
import { makeAsActiveChat } from "../../store/slices/chatSlice";

const ChatBox = () => {
  const dispatch = useDispatch();

  const deviceSize = useDeviceResize();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const activeChat = useSelector((store) => store?.chat?.activeChat);
  const user = useSelector((store) => store?.persistedReducer?.user?.user);
  const url = BACKEND_API + "messages/" + activeChat?._id;
  useGetMessages({ url, setError, setIsError });

  window.onpopstate = function () {
    if (deviceSize?.width < 700) dispatch(makeAsActiveChat(null));
  };

  const recipientUser = useFetchReciverUser({
    chat: activeChat,
    user,
    setIsLoading,
  });

  if (!recipientUser && deviceSize?.width > 700)
    return (
      <div className="mb-2 p-2 my-3 w-full flex flex-col justify-center items-center">
        No Chat Is Selected
      </div>
    );

  if (isError) return <ChatError error={error} />;

  return (
    <>
      {activeChat && (
        <div
          className={`mb-2 p-2 my-2 w-full flex flex-col ${
            deviceSize?.width > 700 ? "h-full" : "h-[90%]"
          }`}
        >
          {isLoading ? (
            <div className="m-auto">
              <Loader />
            </div>
          ) : (
            <ChatInfo
              recipientUser={recipientUser}
              user={user}
              activeChat={activeChat}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ChatBox;
