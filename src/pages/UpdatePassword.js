import Card from "../UI/card/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import LoadingIndicator from "../UI/Loader/LoadingIndicator";
import { axiosInstance } from "../api/baseUrl";
import ErrorAlert from "../UI/Alert/ErrorAlert";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/Auth-slice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const authinfo = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const onSubmit = async (values) => {
    console.log(formik.values);
    setIsLoading(true);
    const obj = {
      email: authinfo.email,
      password: values.password,
    };
    try {
      const resp = await axiosInstance.post("/auth/set-password", obj);
      console.log(resp.data);
      const data = {
        token: resp.data?.data?.token,
        role: resp.data?.data?.role,
        email: resp.data?.data?.email,
      };
      dispatch(login(data));
      localStorage.setItem("loginInfo", JSON.stringify(data));
      localStorage.setItem("isFirstTimeLogin", false);
      setIsLoading(false);
      navigate("/dashboard");
      setTimeout(() => {
        navigate(0);
      }, 0);
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      setErrorMessage(err?.message);
    }
  };
  const validate = (values) => {
    let errors = {};
    if (!values.password) {
      errors.password = "Please enter a password";
    } else if (values.password.length < 8) {
      errors.password = "Password should be 8 characters";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Please re-enter a password";
    } else if (values.confirmPassword < 8) {
      errors.confirmPassword = "confirm Password should be 8 characters";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Password and confirm password should be a same";
    }

    return errors;
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
  return (
    <>
      <div className="container pt-36">
        {displayErrorMessage()}
        <div className="w-5/12 my-0 mx-auto">
          <Card>
            <h4>Please set the password</h4>
            <hr />
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </Form.Group>
              {formik.errors.password ? (
                <p className="text-center text-sm text-red-400 font-serif mt-0">
                  {formik.errors.password}
                </p>
              ) : null}
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                />
              </Form.Group>
              {formik.errors.confirmPassword ? (
                <p className="text-center text-sm text-red-400 font-serif mt-0">
                  {formik.errors.confirmPassword}
                </p>
              ) : null}

              <Button variant="primary" type="submit">
                {isLoading ? <LoadingIndicator /> : "Set Password"}
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
