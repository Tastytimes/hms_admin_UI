import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AlertHandler = ({ show, onHide, onCancel, onConfirm }) => {
  //   const [show, setShow] = useState(false);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={onClick}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AlertHandler;
