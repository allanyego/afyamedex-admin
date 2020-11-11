import { Box } from "grommet";
import { Checkmark, Close, Info } from "grommet-icons";
import { useEffect } from "react";
import { useAppContext } from "../context/app";

import { NOTIFICATION_TYPES } from "../util/constants";
import useToastManager from "../util/hooks/toast-manager";

const toastIcons = {
  [NOTIFICATION_TYPES.DANGER]: <Close color="white" />,
  [NOTIFICATION_TYPES.SUCCESS]: <Checkmark color="white" />,
  [NOTIFICATION_TYPES.INFO]: <Info color="white" />,
};

function Toast({ type, message, onDismiss, duration = 3000 }) {
  useEffect(() => {
    const timeout = setTimeout(onDismiss, duration);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box
      width="medium"
      direction="row"
      align="center"
      background="light-1"
      border={{ size: "0.25px", color: "light-6" }}
      round="xsmall"
    >
      <Box
        pad="small"
        align="center"
        justify="center"
        style={{
          width: "2.5em",
        }}
        background={type}
      >
        {toastIcons[type]}
      </Box>
      <Box flex pad={{ left: "xsmall" }}>
        {message}
      </Box>
    </Box>
  );
}

function Toasts() {
  const { notifications } = useAppContext();
  const { popNotification } = useToastManager();

  return (
    <Box
      direction="column"
      align="center"
      fill
      id="toasts-container"
      pad="small"
      gap="small"
    >
      {notifications.map((notification) => {
        const onDismiss = () => popNotification(notification._id);

        return (
          <Toast
            key={notification._id}
            type={notification.type}
            message={notification.message}
            onDismiss={onDismiss}
          />
        );
      })}
    </Box>
  );
}

export default Toasts;
