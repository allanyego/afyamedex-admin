const dayjs = require("dayjs");
const { Box, Heading, Text } = require("grommet");

function UserInfo({ user }) {
  return (
    <Box>
      <Heading level={3} className="text-capitalize">
        {user.fullName}
      </Heading>
      <Text color="dark-3">@{user.username}</Text>
      <Text>{user.email}</Text>
      <Text size="small" color="neutral-3" margin={{ vertical: "medium" }}>
        Member since: {dayjs(user.createdAt).format("MMM D, YYYY")}
      </Text>
    </Box>
  );
}

export default UserInfo;
