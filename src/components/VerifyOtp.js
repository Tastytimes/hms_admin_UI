import { Link } from "react-router-dom";
import Card from "../UI/card/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import LoadingIndicator from "../UI/Loader/LoadingIndicator";
import { axiosInstance } from "../api/baseUrl";
import ErrorAlert from "../UI/Alert/ErrorAlert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyOtp = ({ email, isLoading, verifyOtp }) => {
  // const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    otp: "",
  };

  const validate = (value) => {
    let errors = {};
    if (!value.otp) {
      errors.otp = "Otp is required";
    } else if (value.otp.length !== 6) {
      errors.otp = "Please provide valid OTP";
    }

    return errors;
  };

  const onSubmit = (values) => {
    console.log(values);
    verifyOtp(values.otp);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>OTP</Form.Label>
          <Form.Control
            type="text"
            id="otp"
            placeholder="Enter OTP"
            onChange={formik.handleChange}
            value={formik.values.otp}
          />
        </Form.Group>
        {formik.errors.otp ? (
          <p className="text-center text-sm text-red-400 font-serif mt-0">
            {formik.errors.otp}
          </p>
        ) : null}
        <Button variant="primary" type="submit">
          {isLoading ? <LoadingIndicator /> : "Send Otp"}
        </Button>
      </Form>
    </>
  );
};

export default VerifyOtp;
