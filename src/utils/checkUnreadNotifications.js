export const checkUnreadNotifications = (notifications) => {
  return notifications.filter((notification) => notification?.isRead === false);
};
