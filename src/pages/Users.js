import { useEffect, useState } from "react";
import { Tab, Tabs } from "grommet";

import Page from "../components/Page";
import { getUsers } from "../http/users";
import EntityList from "../components/EntityList";
import itemMapper from "./helpers/item-mapper";
import useToastManager from "../util/hooks/toast-manager";
import { useAppContext } from "../context/app";

function Professionals({ professionals, fetchProfessionals, updateUser }) {
  useEffect(() => {
    if (!professionals) {
      fetchProfessionals();
    }
  }, []);

  return (
    <EntityList
      items={professionals}
      fetchItems={fetchProfessionals}
      updateItem={updateUser}
    />
  );
}

function Patients({ patients, fetchPatients, updateUser }) {
  useEffect(() => {
    if (!patients) {
      fetchPatients();
    }
  }, []);

  return (
    <EntityList
      items={patients}
      fetchItems={fetchPatients}
      updateItem={updateUser}
    />
  );
}

function UnsetUsers({ users, fetchUsers, updateUser }) {
  useEffect(() => {
    if (!users) {
      fetchUsers();
    }
  }, []);

  return (
    <EntityList items={users} fetchItems={fetchUsers} updateItem={updateUser} />
  );
}

function Users() {
  const [professionals, setProfessionals] = useState(null);
  const [patients, setPatients] = useState(null);
  const [unsetUsers, setUnsetUsers] = useState(null);
  const { currentUser } = useAppContext();
  const { onError } = useToastManager();

  const fetchProfessionals = async () => {
    try {
      const { data } = await getUsers(currentUser.token);
      setProfessionals(data);
    } catch (error) {
      onError(error.message);
    }
  };

  const fetchPatients = async () => {
    try {
      const { data } = await getUsers(currentUser.token, { patient: true });
      setPatients(data);
    } catch (error) {
      onError(error.message);
    }
  };

  const fetchUnsetUsers = async () => {
    try {
      const { data } = await getUsers(currentUser.token, { unset: true });
      setUnsetUsers(data);
    } catch (error) {
      onError(error.message);
    }
  };

  const updateUserFactory = (accountType) => (userId, data) => {
    switch (accountType) {
      case "professionals":
        return setProfessionals([
          ...professionals.map(itemMapper(userId, data)),
        ]);

      case "patients":
        return setPatients([...patients.map(itemMapper(userId, data))]);

      case "unset":
        return setUnsetUsers([...unsetUsers.map(itemMapper(userId, data))]);

      default:
        break;
    }
  };

  return (
    <Page title="Users">
      <Tabs>
        <Tab title="Professionals">
          <Professionals
            {...{
              updateUser: updateUserFactory("professionals"),
              professionals,
              fetchProfessionals,
            }}
          />
        </Tab>
        <Tab title="Patients">
          <Patients
            {...{
              updateUser: updateUserFactory("patients"),
              patients,
              fetchPatients,
            }}
          />
        </Tab>
        <Tab title="Unset">
          <UnsetUsers
            {...{
              users: unsetUsers,
              updateUser: updateUserFactory("unset"),
              fetchUsers: fetchUnsetUsers,
            }}
          />
        </Tab>
      </Tabs>
    </Page>
  );
}

export default Users;
