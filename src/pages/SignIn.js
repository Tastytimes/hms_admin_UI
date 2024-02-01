import Card from "../UI/card/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import LoadingIndicator from "../UI/Loader/LoadingIndicator";
import { axiosInstance } from "../api/baseUrl";
import ErrorAlert from "../UI/Alert/ErrorAlert";
import { useDispatch } from "react-redux";
import { login } from "../store/Auth-slice";

const SignIn = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const intialValues = {
    email: "",
    password: "",
  };

  const validate = (value) => {
    let errors = {};
    if (!value.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
      errors.email = "Please provide valid email";
    }
    if (!value.password) {
      errors.password = "Password is required";
    } else if (value.password.length < 8) {
      errors.password = "Password should be 8 characters";
    }

    return errors;
  };

  const onSubmit = async (values) => {
    console.log(values);
    setIsLoading(true);
    setIsError(false);
    const obj = {
      email: values.email,
      password: values.password,
    };
    try {
      const res = await axiosInstance.post("/auth/admin-login", obj);
      console.log(res);
      setIsLoading(false);
      const data = {
        token: res.data?.data?.token,
        role: res.data?.data?.role,
        email: res.data?.data?.email,
      };
      localStorage.setItem("loginInfo", JSON.stringify(data));
      dispatch(login(data));
      if (res.data?.data?.isFirstTimeLogin === false) {
        localStorage.setItem("isFirstTimeLogin", false);
        // const authObj = {
        //   email: res.data?.data?.email,
        //   role: res.data?.data?.role,
        // };
        return navigate("/dashboard");
      } else {
        localStorage.setItem("isFirstTimeLogin", true);
        navigate("/update-password");
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setIsError(true);
      setErrorMessage(err.response?.data?.message);
    }
  };
  const formik = useFormik({
    initialValues: intialValues,
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

  console.log(formik.errors);
  return (
    <div className="container pt-36">
      {displayErrorMessage()}
      <div className="w-5/12 my-0 mx-auto">
        <Card>
          <h4 className="font-sans">Welcome! Please login to continue</h4>
          <hr />
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                id="email"
                placeholder="Enter email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Form.Group>
            {formik.errors.email ? (
              <p className="text-center text-sm text-red-400 font-serif mt-0">
                {formik.errors.email}
              </p>
            ) : null}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </Form.Group>
            {formik.errors.password ? (
              <p className="text-center text-sm text-red-400 font-serif mt-0">
                {formik.errors.password}
              </p>
            ) : null}
            <Button variant="primary" type="submit">
              {isLoading ? <LoadingIndicator /> : "Submit"}
            </Button>
          </Form>
          <Link
            to="/reset-password"
            className="text-sm pt-4 font-sans no-underline hover:underline"
          >
            Forgot Password
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
