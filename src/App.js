import { Box, Grommet } from "grommet";
import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { AppContext } from "./context/app";
import { STORAGE_KEY } from "./util/constants";
import { clear, getObject, setObject } from "./util/storage";
import AppRoutes from "./AppRoutes";
import "./App.css";
import Admin from "./components/forms/Admin";
import UserSideBar from "./components/UserSideBar";
import Header from "./components/Header";
import Toasts from "./components/Toasts";
import useMounted from "./util/hooks/mounted";
import Loader from "./components/Loader";

const theme = {
  global: {
    colors: {
      brand: "#001623",
    },
    font: {
      family: "Roboto",
      size: "16px",
      height: "18px",
    },
  },
};

function App() {
  const [currentUser, setCurrUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showSideBar, setShowSideBar] = useState(false);
  const [authenticating, setAuthenticating] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const { isMounted, setMounted } = useMounted();

  const closeSideBar = () => setShowSideBar(false);

  const toggleSideBar = () => setShowSideBar(!showSideBar);

  const openInviteModal = () => setShowInviteModal(true);

  const closeInviteModal = () => setShowInviteModal(false);

  const setCurrentUser = async (currUser) => {
    if (!currUser) {
      await clear();
      return setCurrUser(null);
    }

    const newDetails = {
      ...currentUser,
      ...currUser,
    };
    await setObject(STORAGE_KEY, {
      currentUser: newDetails,
    });

    setCurrUser(newDetails);
  };

  useEffect(() => {
    getObject(STORAGE_KEY).then((data) => {
      if (!isMounted) {
        return;
      }

      if (data && data.currentUser) {
        setCurrentUser(data.currentUser);
      }

      setAuthenticating(false);
    });

    return () => {
      setMounted(false);
    };
  }, []);

  return (
    <Grommet theme={theme} full themeMode="light">
      <AppContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          notifications,
          setNotifications,
        }}
      >
        {/* Toasts */}
        <Toasts />
        {/* Admin invite modal */}
        <Admin isOpen={showInviteModal} onClose={closeInviteModal} />

        <Router>
          <Box fill>
            <Header
              {...{
                toggleSideBar,
                showInviteModal: openInviteModal,
              }}
            />

            {authenticating ? (
              <Loader />
            ) : (
              <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
                <Box flex align="center" justify="center">
                  <AppRoutes />
                </Box>
                <UserSideBar
                  {...{
                    showSideBar,
                    closeSideBar,
                  }}
                />
              </Box>
            )}
          </Box>
        </Router>
      </AppContext.Provider>
    </Grommet>
  );
}

export default App;
