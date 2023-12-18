import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { v4 as uniqueId } from "uuid";
import { IoSend, IoArrowBack } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import InputEmoji from "react-input-emoji";
import { postRequest } from "../../utils/apiRequests";
import { BACKEND_API } from "../../constants/constants";
import Loader from "../Loader";
import {
  makeAsActiveChat,
  storeActiveChatMessages,
  storeNewMessage,
} from "../../store/slices/chatSlice";
import useDeviceResize from "../../hooks/useDeviceResize";
import { useNavigate } from "react-router-dom";

const ChatInfo = ({ recipientUser, user, activeChat }) => {
  const dispatch = useDispatch();
  const deviceSize = useDeviceResize();
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const onlineUsers = useSelector((store) => store?.socket?.onlineUsers);
  const socket = useSelector((store) => store?.socket?.socketServer);
  const messages = useSelector((store) => store?.chat?.activeChatMessages);
  const scroll = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(storeNewMessage(newMessage));
  }, [newMessage]);

  useEffect(() => {
    scroll?.current?.scrollIntoView({ behavior: "smooth" });
  }, [newMessage, activeChat, messages]);

  useEffect(() => {
    socket?.emit("sendMessage", {
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

    return () => {
      socket.off("getMessage");
    };
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
      <div className="chat-header flex items-center">
        <ToastContainer />
        {deviceSize.width <= 700 && (
          <button
            type="button"
            className="border rounded-[100%] p-1 hover:bg-blue-200"
            onClick={() => {
              navigate("/chats");
              dispatch(makeAsActiveChat(null));
            }}
          >
            <IoArrowBack />
          </button>
        )}
        <div className="flex flex-col mx-auto">
          <p className="font-bold">{recipientUser?.name}</p>
          <p className="text-xs h-3 text-green-200">
            {onlineUsers?.some(
              (eachUser) => eachUser?.userId === recipientUser?._id
            ) && "Active Now"}
          </p>
        </div>
      </div>
      <div className="messages flex flex-col">
        {messages?.map((eachMessage) => (
          <div
            ref={scroll}
            key={uniqueId()}
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
            className="ml-2 bg-blue-100 rounded-[100%] h-7 w-7 sm:h-8 sm:w-8 flex flex-col items-center justify-center hover:bg-blue-200"
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
