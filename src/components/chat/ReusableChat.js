import React from "react";
import { CLOUDINARY_IMAGE_ACCESS_URL } from "../../constants/constants";
import useDeviceResize from "../../hooks/useDeviceResize";
import { useSelector } from "react-redux";

const ReusableChat = ({ data }) => {
  const result = useDeviceResize();
  const onlineUsers = useSelector((store) => store?.socket?.onlineUsers);
  const checkIsOnline = onlineUsers?.some((user) => user?.userId === data?._id);
  return (
    <div
      className={`flex p-2 xs:p-4 justify-between border-b-2 cursor-pointer my-3 ${
        result?.width < 700 ? "max-w-[700px]" : "max-w-sm"
      }`}
    >
      <div className="flex">
        <img
          src={CLOUDINARY_IMAGE_ACCESS_URL + data?.image}
          alt={data?.image}
          className="w-8 h-8 xs:h-10 xs:w-10 rounded-[50%] -ml-2"
        />
        <div className="-mt-2 text-white ml-2">
          <p className="font-bold">{data?.name}</p>
          <p className="">Text Message....</p>
        </div>
      </div>
      <div className="flex flex-col -mt-2">
        <p className="self-end">12/10/2023</p>
        <p className="self-end bg-green-200 h-5 w-5 flex items-center justify-center text-sm rounded-[100%] p-1">
          2
        </p>
        <div
          className={`${
            checkIsOnline && "bg-green-500"
          } absolute h-3 w-3  rounded-full self-end -mt-1 -mr-3`}
        ></div>
      </div>
    </div>
  );
};

export default ReusableChat;
