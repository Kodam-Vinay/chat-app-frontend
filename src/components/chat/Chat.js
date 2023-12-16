import { useEffect, useState } from "react";
import { getRequest } from "../../utils/apiRequests";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_API } from "../../constants/constants";
import ChatError from "./ChatError";
import React from "react";
import ChatShimmer from "./ChatShimmer";
import EachChat from "./EachChat";
import UserSearchInput from "../UserSearchInput";
import { makeAsActiveChat, storeUserChats } from "../../store/slices/chatSlice";
import useDeviceResize from "../../hooks/useDeviceResize";

const Chat = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((store) => store?.persistedReducer?.user?.user);
  const allChatUsers = useSelector((store) => store?.chat?.userChats);
  const notifications = useSelector(
    (store) => store?.notification?.notifications
  );
  const result = useDeviceResize();

  useEffect(() => {
    getData();
  }, [user, notifications]);

  const getData = async () => {
    const url = BACKEND_API + "chats/" + user?._id;
    const response = await getRequest({
      url,
      setError,
      setIsError,
      setIsLoading,
    });
    if (!isError) {
      dispatch(storeUserChats(response));
    }
  };

  const handleChat = (data) => {
    dispatch(makeAsActiveChat(data));
  };

  if (isError) return <ChatError error={error} />;
  return (
    <div
      className={`p-2 w-full ${
        result?.width < 700 ? "max-w-[700px]" : "max-w-sm"
      }`}
    >
      <UserSearchInput />
      {isLoading ? (
        <ChatShimmer />
      ) : (
        <div className="overflow-y-auto w-full">
          {allChatUsers?.length > 0 &&
            allChatUsers?.map((each) => (
              <div
                key={each?._id}
                className="w-full"
                onClick={() => handleChat(each)}
              >
                <EachChat chat={each} user={user} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Chat;
