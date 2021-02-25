import { Box, Text } from "grommet";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import EntityList from "../components/EntityList";
import Page from "../components/Page";
import { useAppContext } from "../context/app";
import { getPayments } from "../http/reports";
import useToastManager from "../util/hooks/toast-manager";

function Help() {
  return (
    <Box
      border={{
        color: "status-ok",
        size: "medium",
        side: "left",
      }}
    >
      <Text size="small" color="dark-6">
        <i>
          <strong>Click</strong> to view detailed breakdown.
        </i>
      </Text>
    </Box>
  );
}

function Reports() {
  const [payments, setPayments] = useState(null);
  const history = useHistory();
  const { currentUser } = useAppContext();
  const { onError } = useToastManager();

  const handleSelect = ({ _id }) => history.push("/app/reports/detail", _id);

  const fetchPayments = async () => {
    try {
      const { data } = await getPayments(currentUser.token);
      setPayments(data);
    } catch (error) {
      onError(error.message);
    }
  };

  return (
    <Page title="Payment Reports">
      <EntityList
        items={payments}
        fetchItems={fetchPayments}
        entityName="payments"
        handleSelect={handleSelect}
        help={<Help />}
      />
    </Page>
  );
}

export default Reports;
