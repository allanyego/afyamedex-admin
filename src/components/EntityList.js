import { useEffect, useState } from "react";
import { Box, DataTable, Text } from "grommet";
import { Organization, User } from "grommet-icons";
import dayjs from "dayjs";

import Loader from "./Loader";
import ToggleDisabled from "./ToggleDisabled";
import { USER } from "../util/constants";
import ucFirst from "../util/uc-first";
import DisabledIndicatorHelp from "./DisabledIndicatorHelp";

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
                <i>{datum.speciality.join(", ")}</i>
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
    property: "createdAd",
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

function EntityList({ items, fetchItems, updateItem, forUsers = true }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRowClick = ({ datum }) => {
    setSelectedItem(datum);
  };

  const clearSelected = () => setSelectedItem(null);

  useEffect(() => {
    if (!items) {
      fetchItems();
    }
  }, []);

  const columnssForDisaply = forUsers ? userColumns : conditionColumns;

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

      <DisabledIndicatorHelp />

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
