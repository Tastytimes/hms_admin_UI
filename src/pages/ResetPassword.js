import { Link } from "react-router-dom";
import Card from "../UI/card/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import LoadingIndicator from "../UI/Loader/LoadingIndicator";
import { axiosInstance } from "../api/baseUrl";
import ErrorAlert from "../UI/Alert/ErrorAlert";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../store/Auth-slice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerifyOtp from "../components/VerifyOtp";

const ResetPassword = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
  };
  const validate = (value) => {
    let errors = {};
    if (!value.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
      errors.email = "Please provide valid email";
    }

    return errors;
  };
  const onSubmit = async (values) => {
    setIsLoading(true);
    console.log(values);
    try {
      const data = {
        email: values.email,
      };
      const resp = await axiosInstance.post("/auth/password-reset-otp", data);
      dispatch(resetPassword({ email: values.email }));
      setIsLoading(false);
      setIsSuccess(true);
    } catch (err) {
      setIsError(true);
      setErrorMessage(err.response?.data?.message);
      setIsLoading(false);
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  const displayErrorMessage = () => {
    if (isError) {
      return (
        <div className="w-5/12 my-0 mx-auto">
          <ErrorAlert show={isError} message={errorMessage} />
        </div>
      );
    }
  };

  const verifyOtp = async (otp) => {
    console.log(otp);
    try {
      setIsLoading(true);
      const data = {
        otp,
        email: formik.values.email,
      };
      const resp = await axiosInstance.post("/auth/verify-otp", data);
      setIsLoading(false);
      navigate("/update-password");
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      setErrorMessage(err.response?.data?.message);
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="container pt-36">
        {displayErrorMessage()}
        <div className="w-5/12 my-0 mx-auto">
          <Card>
            {!isSuccess && <h4>Forgot Password? That's Okay!</h4>}
            {isSuccess ? (
              <p className="text-green-500">
                Please entered an email which is received on email!
              </p>
            ) : (
              <h4>Lets change It</h4>
            )}
            <hr />
            {!isSuccess ? (
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    id="email"
                    placeholder="Enter Your registered email id"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </Form.Group>
                {formik.errors.email ? (
                  <p className="text-center text-sm text-red-400 font-serif mt-0">
                    {formik.errors.email}
                  </p>
                ) : null}

                <Button variant="primary" type="submit">
                  {isLoading ? <LoadingIndicator /> : "Send Otp"}
                </Button>
              </Form>
            ) : (
              <VerifyOtp
                email={formik.values.email}
                isLoading={isLoading}
                verifyOtp={verifyOtp}
              />
            )}
            <Link
              to="/"
              className="text-sm pt-4 font-sans no-underline hover:underline"
            >
              Back to login
            </Link>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
