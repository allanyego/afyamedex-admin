import { Formik } from "formik";
import { Box, Button, Form, FormField, Text } from "grommet";
import { Add, Checkmark, Close } from "grommet-icons";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useAppContext } from "../../context/app";
import { inviteAdmin } from "../../http/users";
import useMounted from "../../util/hooks/mounted";
import useToastManager from "../../util/hooks/toast-manager";
import Modal from "../Modal";

const inviteSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email.")
    .required("Enter email of user to invite."),
});

function AdminForm({ onSubmit, onClose }) {
  return (
    <>
      <Text margin={{ bottom: "small" }}>
        <i>Enter email of user to invite as an admin.</i>
      </Text>
      <Formik
        validationSchema={inviteSchema}
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
              name="email"
              label="Email"
              allyTitle="Email input"
              error={touched.email && errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
            />
            <Box direction="row" gap="small" margin={{ top: "small" }}>
              <Box flex>
                <Button
                  onClick={onClose}
                  color="status-error"
                  label={<Text color="status-error">Cancel</Text>}
                  icon={<Close color="status-error" />}
                  flex
                  reverse
                />
              </Box>
              <Box flex>
                <Button
                  disabled={!isValid || isSubmitting}
                  label={
                    <Text color="light-1">
                      {isSubmitting ? "Inviting..." : "Invite"}
                    </Text>
                  }
                  icon={<Checkmark color="light-1" />}
                  type="submit"
                  primary
                  flex
                  reverse
                />
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

function Admin({ isOpen, onClose }) {
  const [success, setSuccess] = useState(null);
  const { currentUser } = useAppContext();
  const { onError, onSuccess } = useToastManager();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await inviteAdmin(currentUser.token, values.email);
      setSubmitting(false);
      setSuccess({
        email: values.email.trim(),
      });
      onSuccess("Admin invite sent.");
    } catch (error) {
      onError(error.message);
      setSubmitting(false);
    }
  };

  const reset = () => setSuccess(null);

  return (
    <Modal {...{ isOpen, onClose }}>
      <Box pad="medium" width="medium">
        {success ? (
          <Box>
            <Text textAlign="center">Invite email successfully sent to:</Text>
            <Text weight="bold" textAlign="center">
              {success.email}
            </Text>
            <Box
              direction="row"
              justify="center"
              align="center"
              gap="small"
              margin={{ top: "medium" }}
            >
              <Box flex>
                <Button
                  onClick={onClose}
                  color="status-error"
                  label={<Text color="status-error">Cancel</Text>}
                  icon={<Close color="status-error" />}
                  flex
                  reverse
                />
              </Box>
              <Box flex>
                <Button
                  onClick={reset}
                  color="status-ok"
                  label={<Text>Invite other</Text>}
                  icon={<Add />}
                  flex
                  primary
                  reverse
                />
              </Box>
            </Box>
          </Box>
        ) : (
          <AdminForm onSubmit={handleSubmit} onClose={onClose} />
        )}
      </Box>
    </Modal>
  );
}

export default Admin;
