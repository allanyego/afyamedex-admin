import { Anchor, Box, Text } from "grommet";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import SignInForm from "../components/forms/SignIn";
import Page from "../components/Page";
import { useAppContext } from "../context/app";
import { signIn } from "../http/users";
import { USER } from "../util/constants";
import useMounted from "../util/hooks/mounted";
import useToastManager from "../util/hooks/toast-manager";
import lowerCaseTrim from "../util/lower-case-trim";

function SignIn() {
  const history = useHistory();
  const { setCurrentUser } = useAppContext();
  const { onError } = useToastManager();
  const { isMounted, setMounted } = useMounted();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await signIn(
        lowerCaseTrim(values.username),
        values.password
      );

      if (!data.accountType || data.accountType !== USER.ACCOUNT_TYPES.ADMIN) {
        return onError("Only admins allowed here. Use mobile app.");
      }

      isMounted && setSubmitting(false);
      setCurrentUser(data);
      history.push("/app");
    } catch (error) {
      onError(error.message);
      setSubmitting(false);
    }
  };

  useEffect(() => () => setMounted(false), []);

  return (
    <Page title="Sign in">
      <Box width="medium">
        <SignInForm onSubmit={handleSubmit} />
        <Text textAlign="center">
          No account? <Anchor href="/sign-up">Sign up</Anchor>.
        </Text>
      </Box>
    </Page>
  );
}

export default SignIn;
