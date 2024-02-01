// import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import "./SuccessAlert.css";

const ErrorAlert = ({ message, show }) => {
  //   const [show, setShow] = useState(true);

  const onCloseHandler = () => {
    show = false;
  };

  if (show) {
    return (
      <div className="main-container">
        <Alert
          key="danger"
          variant="danger"
          onClose={() => onCloseHandler(false)}
          dismissible
        >
          Error! {message}
        </Alert>
      </div>
    );
  }
};

export default ErrorAlert;
