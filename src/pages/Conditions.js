import { useEffect, useState } from "react";

import Page from "../components/Page";
import { getConditions } from "../http/conditions";
import EntityList from "../components/EntityList";
import itemMapper from "./helpers/item-mapper";
import useMounted from "../util/hooks/mounted";
import useToastManager from "../util/hooks/toast-manager";
import { useAppContext } from "../context/app";

function ConditionsList({ conditions, fetchConditions, updateCondition }) {
  useEffect(() => {
    if (!conditions) {
      fetchConditions();
    }
  }, []);

  return (
    <EntityList
      items={conditions}
      fetchItems={fetchConditions}
      updateItem={updateCondition}
      entityName="conditions"
    />
  );
}

function Conditions() {
  const [conditions, setConditions] = useState(null);
  const { isMounted, setMounted } = useMounted();
  const { currentUser } = useAppContext();
  const { onError } = useToastManager();

  const fetchConditions = async () => {
    try {
      const { data } = await getConditions(currentUser.token);
      isMounted && setConditions(data);
    } catch (error) {
      onError(error.message);
    }
  };

  const updateCondition = (conditionId, data) => {
    isMounted &&
      setConditions([...conditions.map(itemMapper(conditionId, data))]);
  };

  useEffect(() => () => setMounted(false), []);

  return (
    <Page title="Condition Posts">
      <ConditionsList
        {...{
          conditions,
          fetchConditions,
          updateCondition,
        }}
      />
    </Page>
  );
}

export default Conditions;
