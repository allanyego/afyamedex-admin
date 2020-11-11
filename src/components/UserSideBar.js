import { useContext } from "react";
import { Box, Button, Collapsible, Layer, ResponsiveContext } from "grommet";
import { FormClose } from "grommet-icons";

import UserInfo from "./UserInfo";
import { useAppContext } from "../context/app";

function SideBar({ onClose, ...props }) {
  return (
    <Box fill>
      <Box
        background="light-2"
        tag="header"
        justify="end"
        align="center"
        direction="row"
      >
        <Button icon={<FormClose />} onClick={onClose} />
      </Box>
      <Box background="light-2" align="center" justify="center" flex {...props}>
        {props.children}
      </Box>
    </Box>
  );
}

function SideBarCollapsible({ open, children, ...props }) {
  return (
    <Collapsible direction="horizontal" open={open}>
      <SideBar flex width="medium" elevation="small" {...props}>
        {children}
      </SideBar>
    </Collapsible>
  );
}

function SideBarLayer({ children, ...props }) {
  return (
    <Layer>
      <SideBar fill {...props}>
        {children}
      </SideBar>
    </Layer>
  );
}

function UserSideBar({ showSideBar, closeSideBar }) {
  const size = useContext(ResponsiveContext);
  const { currentUser } = useAppContext();

  if (!currentUser) {
    return null;
  }

  return !showSideBar || size !== "small" ? (
    <SideBarCollapsible open={showSideBar} onClose={closeSideBar}>
      <UserInfo user={currentUser} />
    </SideBarCollapsible>
  ) : (
    <SideBarLayer onClose={closeSideBar}>
      <UserInfo user={currentUser} />
    </SideBarLayer>
  );
}

export default UserSideBar;
