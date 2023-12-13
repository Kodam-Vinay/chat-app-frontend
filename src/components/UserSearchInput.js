import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import useFilterUsers from "../hooks/useFilterUsers";
import {
  BACKEND_API,
  CLOUDINARY_IMAGE_ACCESS_URL,
} from "../constants/constants";
import { postRequest } from "../utils/apiRequests";
import ChatError from "../components/chat/ChatError";
import { storeUserChats } from "../store/slices/chatSlice";
import useDeviceResize from "../hooks/useDeviceResize";

const UserSearchInput = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.persistedReducer?.user?.user);
  const allChatUsers = useSelector((store) => store?.chat?.userChats);
  const [searchInput, setSearchInput] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const size = useDeviceResize();
  const result = useFilterUsers({ searchInput });
  const handleCreateChat = async (chatUser) => {
    const url = BACKEND_API + "chats";
    const createChat = await postRequest({
      url,
      setError,
      setIsError,
      setIsLoading,
      requestBody: {
        senderId: user?._id,
        recieverId: chatUser?._id,
      },
    });
    if (!isError) {
      const chats = [...allChatUsers, createChat];
      dispatch(storeUserChats(chats));
    }
  };
  if (isError) return <ChatError error={error} />;
  return (
    <div
      className={`p-2 w-full ${
        size?.width < 700 ? "max-w-[700px]" : "max-w-sm"
      }`}
    >
      <input
        className="px-4 py-2 outline-none rounded-md w-full bg-transparent border"
        type="search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Enter Email or User Id"
      />
      <div className="flex items-center">
        {searchInput &&
          result?.map((each) => (
            <div
              className="mx-2 mt-2 cursor-pointer flex flex-col"
              key={each?._id}
              onClick={() => handleCreateChat(each)}
            >
              <div className="h-2 w-2 bg-green-500 rounded-full self-end -ml-3 -mb-2"></div>
              <img
                src={CLOUDINARY_IMAGE_ACCESS_URL + each?.image}
                alt={each?.image}
                className="w-8 h-8 rounded-[50%]"
              />
              <p>{each?.name}</p>
            </div>
          ))}
      </div>
      <div className="flex items-center">
        {searchInput && result && result.length < 1 && (
          <div className="text-center">No Users Found</div>
        )}
      </div>
    </div>
  );
};

export default UserSearchInput;
