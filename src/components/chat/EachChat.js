import { useState } from "react";
import useFetchReciverUser from "../../hooks/useFetchReciverUser";
import Loader from "../Loader";
import ReusableChat from "./ReusableChat";
import useDeviceResize from "../../hooks/useDeviceResize";

const EachChat = ({ chat, user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const data = useFetchReciverUser({ chat, user, setIsLoading });
  const result = useDeviceResize();
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
        <ReusableChat data={data} />
      )}
    </>
  );
};

export default EachChat;
