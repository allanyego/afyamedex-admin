import { Formik } from "formik";
import { Box, Button, Form, FormField } from "grommet";
import * as Yup from "yup";

const signInSchema = Yup.object({
  username: Yup.string().required("Enter your username."),
  password: Yup.string().required("Enter your password."),
});

function SignIn({ onSubmit }) {
  return (
    <Formik
      validationSchema={signInSchema}
      onSubmit={onSubmit}
      initialValues={{}}
      validateOnChange
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
        isValid,
        isSubmitting,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <FormField
            name="username"
            label="Username"
            allyTitle="Username input"
            error={touched.username && errors.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormField
            name="password"
            label="Password"
            allyTitle="Password input"
            error={touched.password && errors.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
          />

          <Box direction="row" justify="end">
            <Button
              type="submit"
              primary
              label={isSubmitting ? "Submitting..." : "Submit"}
              disabled={!isValid || isSubmitting}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default SignIn;
