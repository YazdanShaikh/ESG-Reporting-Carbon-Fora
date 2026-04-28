import PropTypes from "prop-types";
import Modal from "../ui/Modal";

const MessageModal = ({ handleClose, active, data }) => {
  return (
    <Modal
      title="Message"
      label=""
      labelClass="btn-outline-dark"
      activeModal={active}
      onClose={handleClose}
      themeClass="bg-red-500"
      centered={true}
      noFade={false}
    >
      <div>
        <p>Subject</p>
        <p>{data?.subject}</p>
        <p>Reason</p>
        <p>{data?.reason}</p>
      </div>
    </Modal>
  );
};

export default MessageModal;
MessageModal.propTypes = {
  active: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
