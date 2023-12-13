import { useState } from "react";
import moment from "moment";
import { IoSend } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { postRequest } from "../../utils/apiRequests";
import { BACKEND_API } from "../../constants/constants";
import Loader from "../Loader";
import { storeActiveChatMessages } from "../../store/slices/chatSlice";
import InputEmoji from "react-input-emoji";

const ChatInfo = ({ recipientUser, messages, user, activeChat }) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(false);

  const handleSendMessage = async () => {
    const url = BACKEND_API + "messages";
    if (!message) return;
    const requestBody = {
      chatId: activeChat?._id,
      senderId: user?._id,
      text: message,
    };

    const response = await postRequest({
      setIsLoading,
      setError,
      setIsError,
      url,
      requestBody,
    });
    setMessage("");
    const allMessages = [...messages, response];
    dispatch(storeActiveChatMessages(allMessages));
  };

  if (isError) toast(error ? error : "Failed To Send Message");

  return (
    <div className="chat-box h-full w-full flex flex-col">
      <div className="chat-header">
        <ToastContainer />
        <p className="font-bold">{recipientUser?.name}</p>
      </div>
      <div className="messages flex flex-col overflow-y-auto">
        {messages?.map((eachMessage) => (
          <div
            key={eachMessage?._id}
            className={`${
              eachMessage?.senderId === user?._id
                ? "message self self-end flex-grow-0"
                : "message self-start flex-grow-0"
            }`}
          >
            <p>{eachMessage?.text}</p>
            <p className="message-footer">
              {moment(eachMessage?.createdAt).calendar()}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-auto bg-blue-600">
        <form
          className="my-1 w-[95%] self-center flex items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <InputEmoji height={10} onChange={setMessage} value={message} />
          <button
            type="submit"
            className="ml-2 bg-blue-100 rounded-full h-8 w-8 flex flex-col items-center justify-center hover:bg-blue-200"
            onClick={handleSendMessage}
          >
            {isLoading ? <Loader height={5} /> : <IoSend />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInfo;
