import { Box, Heading } from "grommet";

function Page({ title, children, titleAlign = "center" }) {
  return (
    <Box pad={{ horizontal: "small", vertical: "medium" }} flex fill>
      <Heading level={1} margin="none" size="small" textAlign={titleAlign}>
        {title}
      </Heading>
      <Box direction="row" justify="center" flex>
        {children}
      </Box>
    </Box>
  );
}

export default Page;
