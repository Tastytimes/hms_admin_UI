import Card from "../UI/card/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik, Field } from "formik";
import { useEffect, useState } from "react";
import LoadingIndicator from "../UI/Loader/LoadingIndicator";
import { axiosInstance } from "../api/baseUrl";
import ErrorAlert from "../UI/Alert/ErrorAlert";
import SuccessAlert from "../UI/Alert/SuccessAlert";
import { Select, Switch } from "@mui/base";
import "./AddUserForm.css";
import { RoleStatus } from "../UI/config/TableConfig";
// import { hotelRoleStatus } from "@agnimura/common";

const AddUserForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(props.isError);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({});

  //   console.log(hotelRoleStatus);
  const intialValues = {
    email: "",
    fullName: "",
    role: "",
    status: false,
  };

  const validate = (value) => {
    let errors = {};
    if (!value.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
      errors.email = "Please provide valid email";
    }
    if (!value.fullName) {
      errors.fullName = "Name is required";
    }
    if (!value.role) {
      errors.role = "Role is required";
    }

    return errors;
  };

  const onSubmit = (values) => {
    props.onSubmit(values);
  };

  const formik = useFormik({
    initialValues: intialValues,
    onSubmit,
    validate,
  });
  const displayErrorMessage = () => {
    console.log(props.isError);
    if (props.isError) {
      return (
        <div className=" my-0 mx-auto">
          <ErrorAlert show={props.isError} message={props.errorMessage} />
        </div>
      );
    }
    if (props.isSuccess) {
      return (
        <div className=" my-0 mx-auto">
          <SuccessAlert show={props.isSuccess} message={props.successMessage} />
        </div>
      );
    }
  };

  return (
    <div>
      {displayErrorMessage()}
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
          <Form.Label>Fullname</Form.Label>
          <Form.Control
            type="text"
            id="fullName"
            placeholder="FullName"
            onChange={formik.handleChange}
            value={formik.values.fullName}
          />
        </Form.Group>
        {formik.errors.fullName ? (
          <p className="text-center text-sm text-red-400 font-serif mt-0">
            {formik.errors.fullName}
          </p>
        ) : null}
        <Form.Label>Role</Form.Label>
        <Form.Select
          type="text"
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
        >
          {/* <option value="">Choose a Role</option> */}
          {RoleStatus.map((status) => {
            return (
              <option value={status.id} key={status.id}>
                {status.value}
              </option>
            );
          })}
          {/* <option value="">Choose a Role</option>
          <option value="SUPER_ADMIN">Super_Admin</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option> */}
        </Form.Select>
        {formik.errors.role ? (
          <p className="text-center text-sm text-red-400 font-serif mt-0">
            {formik.errors.role}
          </p>
        ) : null}
        <div className="my-6 switch-container">
          <Form.Label>Status</Form.Label>
          <Form.Check // prettier-ignore
            type="switch"
            id="status"
            label=""
            checked={formik.values.status}
            value={formik.values.status}
            onChange={formik.handleChange}
          />
        </div>

        <Button variant="primary" type="submit">
          {props.isFormLoading ? <LoadingIndicator /> : "Submit"}
        </Button>
      </Form>
    </div>
  );
};

export default AddUserForm;
