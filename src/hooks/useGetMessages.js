import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeActiveChatMessages } from "../store/slices/chatSlice";

const useGetMessages = ({ url, setIsError, setError }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const activeChat = useSelector((store) => store?.chat?.activeChat);
  const newMessage = useSelector((store) => store?.chat?.newMessage);
  const allMessages = useSelector((store) => store?.chat?.activeChatMessages);
  // console.log(allMessages);

  useEffect(() => {
    getData();
  }, [activeChat, newMessage, allMessages]);

  const getData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        setIsError(true);
        const message = "An Error Occured";
        if (data?.message) {
          setError(data?.message);
        }
        setIsError(true);
        return message;
      } else {
        setIsError(false);
        setMessages(data);
        dispatch(storeActiveChatMessages(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return messages;
};

export default useGetMessages;
