import { useEffect, useState } from "react";
import { getRequest } from "../utils/apiRequests";
import { BACKEND_API } from "../constants/constants";
import ChatError from "../components/chat/ChatError";

const useFetchReciverUser = ({ chat, user, setIsLoading }) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const recipientUserId = chat?.members?.find(
    (eachMember) => eachMember !== user?._id
  );

  useEffect(() => {
    getUserDetails();
  }, [recipientUserId, chat]);

  const getUserDetails = async () => {
    try {
      if (!recipientUserId || !chat) return;
      const url = BACKEND_API + "users/find/" + recipientUserId;
      const response = await getRequest({
        url,
        setError,
        setIsError,
        setIsLoading,
      });
      if (isError) return <ChatError error={error} />;
      setRecipientUser(response);
    } catch (error) {
      console.log(error);
    }
  };
  return recipientUser;
};

export default useFetchReciverUser;
