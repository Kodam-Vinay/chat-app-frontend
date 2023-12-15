import { useEffect, useState } from "react";
import moment from "moment";
import { IoSend } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { postRequest } from "../../utils/apiRequests";
import { BACKEND_API } from "../../constants/constants";
import Loader from "../Loader";
import { storeActiveChatMessages } from "../../store/slices/chatSlice";
import InputEmoji from "react-input-emoji";

const ChatInfo = ({ recipientUser, user, activeChat }) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(false);
  const onlineUsers = useSelector((store) => store?.socket?.onlineUsers);
  const socket = useSelector((store) => store?.socket?.socketServer);
  const messages = useSelector((store) => store?.chat?.activeChatMessages);

  useEffect(() => {
    socket.emit("sendMessage", {
      ...newMessage,
      recipientId: recipientUser?._id,
    });
  }, [newMessage]);

  useEffect(() => {
    socket.on("getMessage", (messageRes) => {
      const allMessages = [...messages, messageRes];
      activeChat?._id === messageRes?.chatId &&
        dispatch(storeActiveChatMessages(allMessages));
    });
    return () => socket.off("getMessage");
  }, [socket, activeChat]);

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
    setNewMessage(response);
    setMessage("");
    const allMessages = [...messages, response];
    dispatch(storeActiveChatMessages(allMessages));
  };

  if (isError) toast(error ? error : "Failed To Send Message");

  return (
    <div className="chat-box h-full w-full flex flex-col">
      <div className="chat-header flex flex-col">
        <ToastContainer />
        <p className="font-bold">{recipientUser?.name}</p>
        <p className="text-xs h-3 text-green-200">
          {onlineUsers?.some(
            (eachUser) => eachUser?.userId === recipientUser?._id
          ) && "Active Now"}
        </p>
      </div>
      <div className="messages flex flex-col">
        {messages?.map((eachMessage) => (
          <div
            key={eachMessage?._id}
            className={`${
              eachMessage?.senderId === user?._id
                ? "message self self-end flex-grow-0"
                : "message self-start flex-grow-0"
            }`}
          >
            <p className="max-w-[40%]">{eachMessage?.text}</p>
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
