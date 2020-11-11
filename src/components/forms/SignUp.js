import { Formik } from "formik";
import {
  Box,
  Button,
  Form,
  FormField,
  RadioButtonGroup,
  TextInput,
} from "grommet";
import * as Yup from "yup";

import { REGEX } from "../../util/constants";
import getAge from "../../util/get-age";
import "./SignUp.css";

const genderArray = ["male", "female"];

const signUpSchema = Yup.object({
  fullName: Yup.string()
    .required("Enter your full name.")
    .matches(REGEX.FULL_NAME, "Invalid name (letters only)"),
  email: Yup.string()
    .email("Enter a valid email.")
    .required("Enter your email."),
  username: Yup.string()
    .required("Enter a username.")
    .matches(REGEX.USERNAME, "Invalid username (letters and numbes only)"),
  gender: Yup.mixed().oneOf(genderArray).required("Select your gender"),
  birthday: Yup.date()
    // .test((value) => (value ? getAge(value) >= 18 : true), "Too young.")
    .test("age", "Too young (>= 18).", (value) =>
      value ? getAge(value) >= 18 : true
    )
    .test("age", "Too old (<= 85).", (value) =>
      value ? getAge(value) < 85 : true
    )
    .required("Enter the day you were born"),
  password: Yup.string()
    .min(8, "Too short.")
    .max(32, "Too long.")
    .required("Enter your password."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match.")
    .required("Confirm your password."),
  code: Yup.string()
    .min(6, "Invalid code.")
    .required("Enter invite code.")
    .matches(/^[0-9]*$/, "Invalid code"),
});

function SignUp({ onSubmit }) {
  return (
    <Formik
      validationSchema={signUpSchema}
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
            size="small"
            name="fullName"
            label="Full name"
            allyTitle="Full name input"
            error={touched.fullName && errors.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormField
            name="email"
            label="Email"
            allyTitle="Email input"
            error={touched.email && errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
          />
          <FormField
            name="username"
            label="Username"
            allyTitle="Username input"
            error={touched.username && errors.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormField
            id="gender-input"
            name="gender"
            label="Gender"
            allyTitle="Gender radio buttons"
            component={RadioButtonGroup}
            error={touched.gender && errors.gender}
            onChange={handleChange}
            onBlur={handleBlur}
            options={genderArray}
          />
          <FormField
            label="Birthday"
            error={touched.birthday && errors.birthday}
          >
            <TextInput
              type="date"
              name="birthday"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormField>
          <FormField
            name="password"
            label="Password"
            allyTitle="Password input"
            error={touched.password && errors.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
          />
          <FormField
            name="confirmPassword"
            label="Confirm password"
            allyTitle="Confirm password input"
            error={touched.confirmPassword && errors.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
          />
          <FormField
            name="code"
            label="Invite code"
            allyTitle="Invite code input"
            help="Invite code sent to your email."
            error={touched.code && errors.code}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Box direction="row" justify="end">
            <Button
              type="submit"
              label={isSubmitting ? "Submitting..." : "Submit"}
              disabled={!isValid || isSubmitting}
              primary
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default SignUp;
