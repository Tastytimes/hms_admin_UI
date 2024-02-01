import Button from "react-bootstrap/Button";
import React from "react";
import PropTypes from "prop-types";
import LoadingIndicator from "../UI/Loader/LoadingIndicator";

const Buttons = ({
  onClick,
  label,
  disabled,
  variant,
  isFormLoading = false,
  type,
  size,
}) => {
  const buttonStyle = {
    // backgroundColor: primary ? "blue" : secondary ? "green" : "gray",
    color: "white",
    cursor: disabled ? "not-allowed" : "pointer",
    minWidth: "100px",
    minHeight: "50px",
    // Add more styles as needed
  };

  return (
    <Button
      style={buttonStyle}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      size={size}
      type={type}
    >
      {isFormLoading ? <LoadingIndicator /> : label}
    </Button>
  );
};

Buttons.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  variant: PropTypes.string.isRequired,
  isFormLoading: PropTypes.bool,
};

export default Buttons;
