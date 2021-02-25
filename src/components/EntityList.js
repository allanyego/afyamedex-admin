import { useEffect, useState } from "react";
import { Box, DataTable, Text } from "grommet";
import { Organization, User } from "grommet-icons";
import dayjs from "dayjs";

import Loader from "./Loader";
import ToggleDisabled from "./ToggleDisabled";
import { USER } from "../util/constants";
import ucFirst from "../util/uc-first";
import DisabledIndicatorHelp from "./DisabledIndicatorHelp";
import { getUser } from "../http/users";
import useToastManager from "../util/hooks/toast-manager";

const UserColumn = ({ userId }) => {
  const [user, setUser] = useState(null);
  const { onError } = useToastManager();

  const fetchUser = async () => {
    try {
      const { data } = await getUser(userId);
      setUser(data);
    } catch (error) {
      onError(error.message);
    }
  };

  useEffect(() => fetchUser(), []);

  return (
    <Text className="text-capitalize">
      {user ? user.fullName : "Loading..."}
    </Text>
  );
};

const paymentColumns = [
  {
    // property: "_id",
    header: <Text>Patient</Text>,
    render: (datum) => {
      return (
        <Box direction="row" align="center" gap="xsmall">
          <UserColumn userId={datum._id.patient} />
        </Box>
      );
    },
  },
  {
    // property: "_id",
    header: "Professional",
    render: (datum) => <UserColumn userId={datum._id.professional} />,
  },
  {
    property: "totalPayments",
    header: "Total Payments",
    render: (datum) => (
      <Text size="small" weight="bold" textAlign="end">
        {datum.totalPayments}
      </Text>
    ),
  },
  {
    property: "appointmentCount",
    header: "Appointment Count",
    render: (datum) => (
      <Text size="small" weight="bold" textAlign="end">
        {datum.appointmentCount}
      </Text>
    ),
  },
];

const sessionColumns = [
  {
    property: "type",
    header: "Type",
  },
  {
    property: "date",
    header: "Date",
    render: (datum) => (
      <Text size="small" weight="bold">
        {dayjs(datum.date).format("MMM D, YYYY")}
      </Text>
    ),
  },
  {
    property: "amount",
    header: "Amount Billed",
    render: (datum) => (
      <Text size="small" weight="bold" textAlign="end">
        {datum.amount}
      </Text>
    ),
  },
];

const userColumns = [
  {
    property: "fullName",
    header: <Text>Full name</Text>,
    search: true,
    render: (datum) => {
      const isPatient = datum.accountType === USER.ACCOUNT_TYPES.PATIENT;
      const isFacility = datum.accountType === USER.ACCOUNT_TYPES.PROFESSIONAL;
      return (
        <Box
          direction="row"
          align="center"
          gap="xsmall"
          border={
            datum.disabled && {
              color: "status-error",
              size: "medium",
              side: "left",
            }
          }
        >
          <Text className="text-capitalize">{datum.fullName}</Text>
          {!isPatient &&
            datum.accountType &&
            (isFacility ? <User /> : <Organization />)}
        </Box>
      );
    },
  },
  {
    property: "username",
    header: "Username",
    render: (datum) => <Text>@{datum.username}</Text>,
  },
  {
    property: "speciality",
    header: "Info",
    render: (datum) => {
      const isPatient = datum.accountType === USER.ACCOUNT_TYPES.PATIENT;
      return (
        <Box pad={{ vertical: "xsmall" }}>
          <Text size="small" weight="bold">
            {datum.email}
          </Text>
          {!isPatient && datum.accountType && (
            <>
              <Text size="small">
                <i>{datum.speciality}</i>
              </Text>
              <Text size="small">
                {datum.experience
                  ? `${datum.experience} years experience`
                  : "Experience unset"}
              </Text>
            </>
          )}
        </Box>
      );
    },
  },
  {
    property: "createdAt",
    header: "Joined",
    render: (datum) => (
      <Text size="small" weight="bold">
        {dayjs(datum.createdAt).format("MMM D, YYYY")}
      </Text>
    ),
  },
];

const conditionColumns = [
  {
    property: "name",
    header: <Text>Name</Text>,
    search: true,
    render: (datum) => (
      <Box
        direction="row"
        align="center"
        border={
          datum.disabled && {
            color: "status-error",
            size: "medium",
            side: "left",
          }
        }
      >
        <Text weight="bold">{ucFirst(datum.name)}</Text>
      </Box>
    ),
  },
  {
    property: "body",
    header: "Body",
    render: (datum) => (
      <Box>
        <Text truncate>{datum.body}</Text>
      </Box>
    ),
  },
  {
    property: "createdAt",
    header: "Posted",
    render: (datum) => (
      <Text size="small" weight="bold">
        {dayjs(datum.createdAt).format("MMM D, YYYY")}
      </Text>
    ),
  },
];

function EntityList({
  items,
  fetchItems,
  updateItem,
  handleSelect,
  help,
  entityName = "users",
}) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRowClick = ({ datum }) => {
    handleSelect ? handleSelect(datum) : setSelectedItem(datum);
  };

  const clearSelected = () => setSelectedItem(null);

  useEffect(() => {
    if (!items) {
      fetchItems();
    }
  }, []);

  const columnssForDisaply =
    entityName === "users"
      ? userColumns
      : entityName === "conditions"
      ? conditionColumns
      : entityName === "sessions"
      ? sessionColumns
      : paymentColumns;

  return !items ? (
    <Loader />
  ) : (
    <Box
      fill
      overflow={{
        horizontal: "scroll",
      }}
    >
      <ToggleDisabled
        item={selectedItem}
        onUpdate={updateItem}
        clearSelected={clearSelected}
      />

      {help || <DisabledIndicatorHelp />}

      <DataTable
        onClickRow={handleRowClick}
        columns={columnssForDisaply}
        data={items}
        background={{
          header: "white",
        }}
        pin="header"
      />
    </Box>
  );
}

export default EntityList;
