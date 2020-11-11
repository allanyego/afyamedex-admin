import { Box, Text } from "grommet";

import "./Loader.css";

function Loader() {
  return (
    <Box pad="medium" flex align="center" justify="center" direction="column">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Text textAlign="center">Hold on...</Text>
    </Box>
  );
}

export default Loader;
