import { useAppContext } from "../../context/app";
import { NOTIFICATION_TYPES } from "../constants";

function useToastManager() {
  const { notifications, setNotifications } = useAppContext();

  const popNotification = (id = null) => {
    if (id) {
      return setNotifications([...notifications.filter((n) => n._id !== id)]);
    }

    const prev = notifications;
    setNotifications([...prev.slice(1, prev.length)]);
  };

  const pushNotification = (message, type) =>
    setNotifications([
      ...notifications,
      {
        message,
        type,
        _id: Date.now(),
      },
    ]);

  const onError = (message) =>
    pushNotification(message, NOTIFICATION_TYPES.DANGER);

  const onSuccess = (message) =>
    pushNotification(message, NOTIFICATION_TYPES.SUCCESS);

  const onInfo = (message) =>
    pushNotification(message, NOTIFICATION_TYPES.INFO);

  return {
    onError,
    onSuccess,
    onInfo,
    popNotification,
  };
}

export default useToastManager;
