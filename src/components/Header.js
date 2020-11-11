import {
  Anchor,
  Box,
  Heading,
  Menu,
  Nav,
  ResponsiveContext,
  Text,
} from "grommet";
import {
  AppsRounded,
  Article,
  Group,
  Logout,
  User,
  UserAdmin,
  UserSettings,
} from "grommet-icons";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAppContext } from "../context/app";
import { clear } from "../util/storage";

import AppBar from "./AppBar";

function NavLink({ to, label, Icon }) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
      }}
    >
      <Box direction="row" align="center" gap="small">
        <Icon color="white" />
        <Text color="white" weight="bold">
          {label}
        </Text>
      </Box>
    </Link>
  );
}

function Header({ toggleSideBar, showInviteModal }) {
  const history = useHistory();
  const size = useContext(ResponsiveContext);
  const { currentUser, setCurrentUser } = useAppContext();

  const handleLogout = async () => {
    setCurrentUser(null);
  };

  const UsersAnchor = () => (
    <NavLink to="/app/users" label="Users" Icon={Group} />
  );

  const ConditionsAnchor = () => (
    <NavLink to="/app/conditions" label="Conditions" Icon={Article} />
  );

  const UserOptions = () => (
    <Menu
      label={<UserSettings color="light-1" />}
      items={[
        {
          onClick: toggleSideBar,
          label: (
            <Box direction="row" align="center" justify="between" fill>
              <Text size="small">Profile</Text>
              <User />
            </Box>
          ),
        },
        {
          onClick: showInviteModal,
          label: (
            <Box direction="row" align="center" justify="between" fill>
              <Text size="small">Add admin</Text>
              <UserAdmin />
            </Box>
          ),
        },
        {
          onClick: handleLogout,
          label: (
            <Box direction="row" align="center" justify="between" fill>
              <Text size="small" color="status-error">
                Logout
              </Text>
              <Logout color="status-error" />
            </Box>
          ),
        },
      ]}
    />
  );

  const MenuOptions = () => (
    <Menu
      label={<AppsRounded color="light-1" />}
      items={[
        {
          onClick: () => history.push("/app/users"),
          label: (
            <Box direction="row" align="center" justify="between" fill>
              <Text size="small">Users</Text>
              <Group />
            </Box>
          ),
        },
        {
          onClick: () => history.push("/app/conditions"),
          label: (
            <Box direction="row" align="center" justify="between" fill>
              <Text size="small">Conditions</Text>
              <Article />
            </Box>
          ),
        },
      ]}
    />
  );

  return (
    <AppBar>
      <Heading level={3} margin="none" color="light-1">
        Afyamedex Admin
      </Heading>
      {currentUser && (
        <Nav direction="row" align="center">
          {size !== "small" ? (
            <Box direction="row" align="center" gap="small">
              <UsersAnchor />
              <ConditionsAnchor />
            </Box>
          ) : (
            <MenuOptions />
          )}
          <UserOptions />
        </Nav>
      )}
    </AppBar>
  );
}

export default Header;
