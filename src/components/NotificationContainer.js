import React, { useCallback, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uniqueId } from "uuid";
import { checkUnreadNotifications } from "../utils/checkUnreadNotifications";
import moment from "moment";
import { addToNotifications } from "../store/slices/notificationSlice";
import { makeAsActiveChat } from "../store/slices/chatSlice";

const NotificationContainer = () => {
  const dispatch = useDispatch();
  const [isNotificationActive, setNotificationActive] = useState(false);
  const user = useSelector((store) => store?.persistedReducer?.user?.user);
  const userChats = useSelector((store) => store?.chat?.userChats);

  const notifications = useSelector(
    (store) => store?.notification?.allNotifications
  );

  const totalUsers = useSelector((store) => store?.chat?.totalUsers);

  const unreadNotifications = checkUnreadNotifications(notifications);

  const modifiedNotifications = notifications?.map((notification) => {
    const sender = totalUsers?.find(
      (eachUser) => eachUser?._id === notification?.senderId
    );
    return {
      ...notification,
      senderName: sender?.name,
    };
  });

  const markAllNotificationsAsRead = useCallback((notifications) => {
    const markNotifications = notifications?.map((each) => ({
      ...each,
      isRead: true,
    }));
    dispatch(addToNotifications(markNotifications));
  }, []);

  const markNotificationAsRead = useCallback(
    ({ notification, user, userChats, allNotifications }) => {
      const findChat = userChats.find((eachChat) => {
        const chatMembers = [user?._id, notification?.senderId];
        const isDesiredChat = eachChat?.members?.every((user) =>
          chatMembers.includes(user)
        );
        return isDesiredChat;
      });
      //after navigating to chat we need to mark the notification as read
      const markNotifincations = allNotifications?.map((each) => {
        if (each?.senderId === notification?.senderId) {
          return { ...notification, isRead: true };
        } else {
          return each;
        }
      });
      dispatch(makeAsActiveChat(findChat));
      dispatch(addToNotifications(markNotifincations));
    },
    []
  );

  return (
    <div className="mx-3 z-10 rounded-sm mt-1">
      <button
        className="flex"
        type="button"
        onClick={() => setNotificationActive(!isNotificationActive)}
      >
        <IoIosNotificationsOutline size={30} className="text-white" />
        {unreadNotifications.length > 0 && (
          <span className="absolute ml-5 -mt-2 bg-green-400 text-xs text-white w-4 h-4 rounded-[100%] sm:text-sm sm:w-5 sm:h-5">
            {unreadNotifications.length}
          </span>
        )}
      </button>
      {isNotificationActive && (
        <div className="absolute right-5 mt-3 notifications-box rounded-md">
          <div className="notifications-header flex">
            <h3>Notifications</h3>
            <button
              className="mx-2 mark-as-read font-[500] text-xs hover:opacity-90"
              onClick={() => markAllNotificationsAsRead(notifications)}
            >
              Mark All As Read
            </button>
          </div>
          {modifiedNotifications.length === 0 ? (
            <div className="notification">No Notifications Yet...</div>
          ) : (
            <div>
              {modifiedNotifications.map((each) => (
                <div
                  onClick={() => {
                    markNotificationAsRead({
                      notification: each,
                      allNotifications: notifications,
                      user,
                      userChats,
                    });
                    setNotificationActive(false);
                  }}
                  key={uniqueId()}
                  className={`${
                    each?.isRead ? "notification" : "notification not-read"
                  } rounded-md`}
                >
                  <span>{each?.senderName + " sent you a message"}</span>
                  <span className="notification-time">
                    {moment(each?.date).calendar()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationContainer;
