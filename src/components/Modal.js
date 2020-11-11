import { Layer, Box } from "grommet";

function Modal({ isOpen, onClose, children }) {
  return isOpen ? (
    <Layer onEsc={onClose} onClickOutside={onClose}>
      <Box fill align="center" justify="center" direction="row">
        {children}
      </Box>
    </Layer>
  ) : null;
}

export default Modal;
