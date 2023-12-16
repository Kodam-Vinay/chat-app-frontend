import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToNotifications } from "../store/slices/notificationSlice";

const useGetNotifications = () => {
  const dispatch = useDispatch();
  const socket = useSelector((store) => store?.socket?.socketServer);
  const activeChat = useSelector((store) => store?.chat?.activeChat);
  const notifications = useSelector(
    (store) => store?.notification?.allNotifications
  );
  useEffect(() => {
    if (!socket) return;
    socket.on("getNotification", (res) => {
      const isActiveChat = activeChat?.members?.find(
        (id) => id === res?.senderId
      );
      if (isActiveChat) {
        if (res?.senderId) {
          const totalNotifications = [
            { ...res, isRead: true },
            ...notifications,
          ];
          dispatch(addToNotifications(totalNotifications));
        }
      } else {
        if (res?.senderId) {
          const totalNotifications = [...notifications, res];
          dispatch(addToNotifications(totalNotifications));
        }
      }
    });

    return () => {
      socket.off("getNotification");
    };
  }, [socket, activeChat, notifications]);
};

export default useGetNotifications;
