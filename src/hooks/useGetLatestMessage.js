import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BACKEND_API } from "../constants/constants";

const useGetLatestMessage = ({ chat, setIsError, setError }) => {
  const [message, setMessage] = useState(null);
  const newMessage = useSelector((store) => store?.chat?.newMessage);
  const notifications = useSelector(
    (store) => store?.notification?.allNotifications
  );

  useEffect(() => {
    getData();
  }, [newMessage, notifications]);

  const getData = async () => {
    const url = BACKEND_API + "messages/" + chat?._id;
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
        const latestMessage = data[data?.length - 1];
        setMessage(latestMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return message;
};

export default useGetLatestMessage;
