const { Box, Text } = require("grommet");

function DisabledIndicatorHelp() {
  return (
    <Box
      border={{
        color: "status-error",
        size: "medium",
        side: "left",
      }}
    >
      <Text size="small" color="dark-6">
        <i>
          <strong>Disabled</strong> Click to toggle disabled
        </i>
      </Text>
    </Box>
  );
}

export default DisabledIndicatorHelp;
