import React, { useCallback } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { CLOUDINARY_IMAGE_ACCESS_URL } from "../../constants/constants";
import useDeviceResize from "../../hooks/useDeviceResize";
import { addToNotifications } from "../../store/slices/notificationSlice";
import { checkUnreadNotifications } from "../../utils/checkUnreadNotifications";

const ReusableChat = ({ data, latestMessage }) => {
  const dispatch = useDispatch();
  const result = useDeviceResize();
  const onlineUsers = useSelector((store) => store?.socket?.onlineUsers);
  const checkIsOnline = onlineUsers?.some((user) => user?.userId === data?._id);
  const notifications = useSelector(
    (store) => store?.notification?.allNotifications
  );

  const unreadNotifications = checkUnreadNotifications(notifications);
  const filterThisUserNotifications = unreadNotifications?.filter(
    (each) => each?.senderId === data?._id
  );

  const markParticularUserNotificationsAsRead = useCallback(
    ({ userNotifications, allNotifications }) => {
      const markNotifications = allNotifications.map((each) => {
        let notification;
        userNotifications.forEach((eachNotification) => {
          if (eachNotification?.senderId === each?.senderId) {
            notification = { ...eachNotification, isRead: true };
          } else {
            notification = each;
          }
        });
        return notification;
      });
      dispatch(addToNotifications(markNotifications));
    },
    []
  );
  const subString = (message) => {
    if (message?.length > 15) return message?.substr(0, 15) + ".....";
    return message;
  };

  const handleOnClickChat = () => {
    if (filterThisUserNotifications.length !== 0) {
      markParticularUserNotificationsAsRead({
        userNotifications: filterThisUserNotifications,
        allNotifications: notifications,
      });
    }
  };

  return (
    <div
      className={`flex p-2 xs:p-4 justify-between cursor-pointer my-3 ${
        result?.width < 700 ? "max-w-[700px]" : "max-w-sm"
      }`}
      onClick={handleOnClickChat}
    >
      <div className="flex">
        <img
          src={CLOUDINARY_IMAGE_ACCESS_URL + data?.image}
          alt={data?.image}
          className="w-8 h-8 xs:h-10 xs:w-10 rounded-[50%] -ml-2"
        />
        <div className="-mt-2 text-white ml-2">
          <p className="font-bold">{data?.name}</p>
          <p className="">{subString(latestMessage?.text)}</p>
        </div>
      </div>
      <div className="flex flex-col -mt-2">
        <p className="self-end text-sm">
          {latestMessage?.createdAt &&
            moment(latestMessage?.createdAt).calendar()}
        </p>
        {filterThisUserNotifications?.length > 0 && (
          <p
            className={`self-end mt-auto bg-green-200 h-5 w-5 flex items-center justify-center text-sm rounded-[100%] p-1 }`}
          >
            {filterThisUserNotifications?.length > 0 &&
              filterThisUserNotifications?.length}
          </p>
        )}
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
