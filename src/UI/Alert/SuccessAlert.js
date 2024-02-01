// import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import "./SuccessAlert.css";

const SuccessAlert = ({ message, show }) => {
  //   const [show, setShow] = useState(true);

  const onCloseHandler = () => {
    show = false;
  };

  if (show) {
    return (
      <div className="main-container">
        <Alert
          key="success"
          variant="success"
          onClose={() => onCloseHandler(false)}
          dismissible
        >
          Success! {message}
        </Alert>
      </div>
    );
  }
};

export default SuccessAlert;
