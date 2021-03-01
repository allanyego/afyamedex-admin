import { useEffect, useState } from "react";
import { Box, Button, Text } from "grommet";
import { Close, Checkmark } from "grommet-icons";

import useMounted from "../util/hooks/mounted";
import Loader from "./Loader";
import Modal from "./Modal";
import { editUser } from "../http/users";
import { useAppContext } from "../context/app";
import { editCondition } from "../http/conditions";
import useToastManager from "../util/hooks/toast-manager";

function ToggleDisabled({ item, onUpdate, clearSelected }) {
  const [showModal, setShowModal] = useState(!!item);
  const [fetching, setFetching] = useState(false);
  const { currentUser } = useAppContext();
  const { isMounted, setMounted } = useMounted();
  const { onError, onSuccess } = useToastManager();

  const closeModal = () => clearSelected();

  const handleToggle = async () => {
    setFetching(true);
    try {
      const disabled = !Boolean(item.disabled);
      item.fullName
        ? await editUser(currentUser.token, item._id, {
            disabled,
          })
        : await editCondition(currentUser.token, item.id, {
            disabled,
          });

      onUpdate(item._id || item.id, {
        disabled,
      });
      onSuccess("Update successfull.");
      closeModal();
      setFetching(false);
    } catch (error) {
      setFetching(false);
      onError(error.message);
    }
  };

  useEffect(() => setShowModal(!!item), [item]);
  useEffect(() => () => setMounted(false), []);

  return (
    <Modal isOpen={showModal} onClose={closeModal}>
      {item ? (
        <Box pad="medium" width="medium">
          <Text>
            You are about to {item.disabled ? "enable" : "disabled"}{" "}
            {item.fullName ? (
              <Text weight="bold" className="text-capitalize">
                {item.fullName}
              </Text>
            ) : (
              <Text weight="bold" className="text-capitalize">
                Post: {item.name}
              </Text>
            )}
          </Text>
          <Box direction="row" gap="medium" margin={{ top: "small" }}>
            <Box flex>
              <Button
                onClick={closeModal}
                color="status-error"
                label={<Text color="status-error">Cancel</Text>}
                icon={<Close color="status-error" />}
                flex
                reverse
              />
            </Box>
            <Box flex>
              <Button
                primary
                onClick={handleToggle}
                disabled={fetching}
                color="status-ok"
                label={
                  <Text color="light-1">
                    {fetching ? "Confirmin..." : "Confirm"}
                  </Text>
                }
                icon={<Checkmark color="light-1" />}
                flex
                reverse
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Loader />
      )}
    </Modal>
  );
}

export default ToggleDisabled;
