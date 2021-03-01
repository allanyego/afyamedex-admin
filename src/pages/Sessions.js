import { Box, Button, Heading, Text } from "grommet";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import EntityList from "../components/EntityList";
import Loader from "../components/Loader";
import Page from "../components/Page";
import { useAppContext } from "../context/app";
import { getAppointmentHistory } from "../http/reports";
import useToastManager from "../util/hooks/toast-manager";

const Header = ({ label, text }) => (
  <Heading level={5} className="text-capitalize" margin="5px">
    <Text color="dark-4">{label}:</Text> {text}
  </Heading>
);

function Sessions() {
  const [sessions, setSessions] = useState(null);
  const { state } = useLocation();
  const history = useHistory();
  const { currentUser } = useAppContext();
  const { onError } = useToastManager();

  const handleSelect = ({ _id }) => history.push("/app/reports/detail", _id);

  const fetchSessions = async () => {
    try {
      const { professional, patient } = state;
      const { data } = await getAppointmentHistory(
        patient,
        professional,
        currentUser.token
      );
      setSessions(data);
    } catch (error) {
      onError(error.message);
    }
  };

  useEffect(() => fetchSessions(), []);

  return (
    <Page title="Sessions Detail">
      {!sessions ? (
        <Loader />
      ) : (
        <>
          <div>
            <Box direction="column" margin="20px 0">
              <Box direction="row" justify="start">
                <Button label="Back" default onClick={history.goBack} />
              </Box>
              <Header label="Patient" text={sessions[0].patient.fullName} />
              <Header
                label="Professional"
                text={sessions[0].professional.fullName}
              />
            </Box>
            <EntityList
              items={sessions}
              fetchItems={() => null}
              entityName="sessions"
              handleSelect={handleSelect}
              help={<div />}
            />
          </div>
        </>
      )}
    </Page>
  );
}

export default Sessions;
