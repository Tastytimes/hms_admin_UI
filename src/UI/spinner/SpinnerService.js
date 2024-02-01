import "./SpinnerService.css";
import Spinner from "react-bootstrap/Spinner";

const SpinnerService = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      className="h-60"
      size="xxl"
      variant="success"
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default SpinnerService;
