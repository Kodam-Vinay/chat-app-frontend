import { useState } from "react";
import useFetchReciverUser from "../../hooks/useFetchReciverUser";
import Loader from "../Loader";
import ReusableChat from "./ReusableChat";
import useDeviceResize from "../../hooks/useDeviceResize";
import { useSelector } from "react-redux";
import useGetLatestMessage from "../../hooks/useGetLatestMessage";
import ChatError from "./ChatError";

const EachChat = ({ chat, user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const data = useFetchReciverUser({ chat, user, setIsLoading });
  const result = useDeviceResize();
  const activeChat = useSelector((store) => store?.chat?.activeChat);
  const isActiveChat = activeChat?._id === chat?._id;
  const latestMessage = useGetLatestMessage({ chat, setError, setIsError });
  if (isError) return <ChatError error={error} />;
  return (
    <>
      {isLoading ? (
        <div
          className={`flex flex-col items-center justify-center mb-2 p-2 xs:p-4 my-3 ${
            result?.width < 700 ? "max-w-[700px]" : "max-w-sm"
          }`}
        >
          <Loader />
        </div>
      ) : (
        <div
          className={`${isActiveChat && "bg-blue-300"} rounded-sm border-b-2`}
        >
          <ReusableChat data={data} latestMessage={latestMessage} />
        </div>
      )}
    </>
  );
};

export default EachChat;
