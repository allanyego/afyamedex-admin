import { Box, Header } from "grommet";

function AppBar(props) {
  return (
    <Header background="brand">
      <Box
        flex
        tag="header"
        direction="row"
        align="center"
        justify="between"
        background="brand"
        pad={{ left: "medium", right: "small", vertical: "small" }}
        elevation="medium"
        style={{ zIndex: "1" }}
        {...props}
      />
    </Header>
  );
}

export default AppBar;
