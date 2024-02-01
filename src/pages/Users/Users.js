import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../UI/card/Card";
import Tables from "../../components/Tables";
import LoadingIndicator from "../../UI/Loader/LoadingIndicator";
import SpinnerService from "../../UI/spinner/SpinnerService";
import { axiosInstance } from "../../api/baseUrl";
import "./Users.css";
import { AuthTableHeader } from "../../UI/config/TableConfig";
import AddUserForm from "../../components/AddUserForm";
import { Button, Offcanvas } from "react-bootstrap";
import EditUserForm from "../../components/EditUserForm";
import Modal from "react-bootstrap/Modal";

const Users = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [columns, setColumns] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isFormSuccess, setIsFormSuccess] = useState(false);
  const [isFormError, setIsFormError] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [editErrorFormMessage, setEditErrorFormMessage] = useState("");
  const [editSuccessFormMessage, setEditSuccessFormMessage] = useState("");
  const [isEditFormLoading, setIsEditFormLoading] = useState(false);
  const [isEditFormSuccess, setIsEditFormSuccess] = useState(false);
  const [isEditFormError, setIsEditFormError] = useState(false);
  const [editRowId, setEditRowId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const authInfo = useSelector((store) => store.auth);

  useEffect(() => {
    fetchData();
    setColumns(AuthTableHeader);
  }, []);

  const handleClose = () => {
    console.log("ss");
    setShow(false);
    setIsError(false);
    setIsFormSuccess(false);
    setIsEditForm(false);
    fetchData();
  };
  const handleShow = () => {
    setShow(true);
  };

  const fetchData = async () => {
    try {
      const dataRes = await axiosInstance.get("/auth/admin-user");
      setIsLoading(false);
      setIsSuccess(true);
      console.log(dataRes.data.data);
      setRowData(dataRes.data.data);
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const editData = (row) => {
    console.log("parent", row);
    setEditRowId(row.id);
    setIsEditForm(true);
    setEditFormData(row);
    setShow(true);
  };

  const onDelete = (id) => {
    console.log(id);
    setDeleteId(id);
    setShowModal(true);
    // setIsLoading(true);
    // if (id) {
    //   try {
    //     const resp = axiosInstance.delete(`/auth/admin-user/${id}`);
    //     setIsSuccess(true);
    //     setSuccessMessage(resp.data?.data?.message);
    //     setIsLoading(false);
    //     fetchData();
    //   } catch (err) {
    //     setIsError(true);
    //     setIsLoading(false);
    //     setErrorMessage(err?.error?.message);
    //   }
    // } else {
    //   setIsError(true);
    //   setIsLoading(false);
    //   setErrorMessage("Something went wrong!");
    // }
  };

  const onDeleteSubmisssion = () => {
    setShowModal(false);
    setIsLoading(true);
    if (deleteId) {
      try {
        const resp = axiosInstance.delete(`/auth/admin-user/${deleteId}`);
        setIsSuccess(true);
        setSuccessMessage(resp.data?.data?.message);
        setIsLoading(false);
        fetchData();
      } catch (err) {
        setIsError(true);
        setIsLoading(false);
        setErrorMessage(err?.error?.message);
      }
    } else {
      setIsError(true);
      setIsLoading(false);
      setErrorMessage("Something went wrong!");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const loading = () => {
    if (isLoading) {
      return (
        <div className="spinner-container mt-36">
          <SpinnerService />
        </div>
      );
    } else if (!isLoading && isSuccess) {
      return (
        <div>
          <Tables
            columns={columns}
            bodyData={rowData}
            testClick={editData}
            deleteHandlers={onDelete}
          />
        </div>
      );
    }
  };

  const onSubmit = async (values) => {
    setIsFormError(false);
    setIsFormSuccess(false);
    try {
      setIsFormLoading(true);
      const respData = await axiosInstance.post("/auth/create-user", values);
      const tempData = rowData.push(values);
      console.log(tempData);
      setIsFormSuccess(true);
      setSuccessMessage(respData.data.message);
      setIsFormLoading(false);
    } catch (err) {
      console.log(err);
      setIsFormError(true);
      setErrorMessage(err.response?.data.message);
      setIsFormLoading(false);
    }
  };

  const onEditFormSubmit = async (values) => {
    console.log("edit data", values);
    const url = `/auth/admin-user/${editRowId}`;
    try {
      setIsEditFormLoading(true);
      const respData = await axiosInstance.put(url, values);
      console.log(respData, rowData);
      setIsEditFormSuccess(true);
      setIsEditFormLoading(false);
      setEditSuccessFormMessage(respData.data.message);
    } catch (err) {
      setIsFormError(false);
      setEditErrorFormMessage(err.response?.data.message);
      setIsEditFormLoading(false);
    }
  };

  return (
    <>
      <div className="mt-4">
        <Card>
          <div className="">
            <div className="grid gap-4 grid-cols-2 grid-rows-1 justify-items-end">
              <h2 className="flex ">Users</h2>
              <Button
                variant="outline-primary "
                className="w-32 "
                onClick={handleShow}
              >
                {" "}
                Add User
              </Button>
            </div>
            <hr />
            {/* <AddUserForm onSubmit={onSubmit} /> */}
          </div>
          <div>{loading()}</div>
        </Card>
      </div>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {!isEditForm ? "Add User" : "Update User"}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {!isEditForm ? (
            <AddUserForm
              onSubmit={onSubmit}
              isError={isFormError}
              isSuccess={isFormSuccess}
              errorMessage={errorMessage}
              successMessage={successMessage}
              isFormLoading={isFormLoading}
              isEdit={isEditForm}
            />
          ) : (
            <EditUserForm
              onSubmit={onEditFormSubmit}
              isError={isEditFormError}
              isSuccess={isEditFormSuccess}
              errorMessage={editErrorFormMessage}
              successMessage={editSuccessFormMessage}
              isFormLoading={isEditFormLoading}
              editFormData={editFormData}
            />
          )}
        </Offcanvas.Body>
      </Offcanvas>

      <div className="modal show">
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you show want to delete the user ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onDeleteSubmisssion}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Users;
