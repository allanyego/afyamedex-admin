import { Anchor, Box, Text } from "grommet";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import SignUpForm from "../components/forms/SignUp";
import Page from "../components/Page";
import { useAppContext } from "../context/app";
import { signUp } from "../http/users";
import { USER } from "../util/constants";
import useMounted from "../util/hooks/mounted";
import useToastManager from "../util/hooks/toast-manager";

function SignUp() {
  const history = useHistory();
  const { setCurrentUser } = useAppContext();
  const { onError, onInfo } = useToastManager();
  const { isMounted, setMounted } = useMounted();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await signUp({
        ...values,
        accountType: USER.ACCOUNT_TYPES.ADMIN,
      });
      setCurrentUser(data);
      history.push("/app");
      onInfo("Welcome @" + values.username);
    } catch (error) {
      onError(error.message);
    } finally {
      isMounted && setSubmitting(false);
    }
  };

  useEffect(() => () => setMounted(false), []);

  return (
    <Page title="Sign up">
      <Box width="medium">
        <SignUpForm onSubmit={handleSubmit} />
        <Text margin={{ top: "small" }} textAlign="center">
          Already have an account? <Anchor href="/sign-in">Sign in</Anchor>.
        </Text>
      </Box>
    </Page>
  );
}

export default SignUp;
