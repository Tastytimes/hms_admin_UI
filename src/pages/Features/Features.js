import { useEffect, useState } from "react";
import InputBox from "../../components/InputBox";
import "./feature.css";
import Card from "../../UI/card/Card";
import Buttons from "../../components/Buttons";
import FeaturesForm from "../../components/features/FeaturesForm";
import DisplayFeatures from "../../components/features/DisplayFeatures";
import featureApi from "../../api/featureApi";
import SpinnerService from "../../UI/spinner/SpinnerService";
import AlertHandler from "../../components/Modal/AlertHandler";
import { click } from "@testing-library/user-event/dist/click";
import ErrorAlert from "../../UI/Alert/ErrorAlert";
import SuccessAlert from "../../UI/Alert/SuccessAlert";

const Features = () => {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [featuresData, setFeaturesData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteFeatureId, setDeleteFeatureId] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const respData = await featureApi.getAllFeatures();
      console.log(respData);
      setFeaturesData(respData?.data?.data);
      setIsLoading(false);
      console.log(featuresData);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setTimeout(() => {
        setErrorMessage(error?.data?.message);
      }, 3000);
      setIsLoading(false);
    }
  };

  const editHandler = (featureId) => {
    console.log("", featureId);
    const obj = {
      featureName: featureId.featureName,
      isActive: featureId.isActive,
      id: featureId.id,
    };
    setEditData({
      ...obj,
    });
    setIsEdit(true);
  };

  const editSuccessHandler = (feature) => {
    console.log(isEdit);
    console.log(feature);
    if (isEdit) {
      const tempData = featuresData.map((ele) => {
        if (ele.id === feature.id) {
          // If the element's ID matches the feature's ID, update its properties
          return {
            ...ele, // Copy the existing properties
            featureName: feature.featureName,
            isActive: feature.isActive,
            createdAt: feature.createdAt,
            updatedAt: feature.updatedAt,
          };
        }
        return ele; // For elements that don't match the condition, return them unchanged
      });

      setFeaturesData(tempData);
      setIsEdit(false);
      console.log(featuresData);
    }
  };

  const clickHandler = () => {
    console.log("click");
    setShow(true);
  };

  const cancelEditHandler = () => {
    setIsEdit(false);
    setEditData({});
  };

  const deleteHandler = (featureId) => {
    console.log(featureId);
    setDeleteFeatureId(featureId);
    handleShow(true);
  };

  const loading = () => {
    if (isLoading) {
      return (
        <div className="spinner-container mt-36">
          <SpinnerService />
        </div>
      );
    } else if (!isLoading) {
      return (
        <div>
          <DisplayFeatures
            featuresData={featuresData}
            onEdit={editHandler}
            onDelete={deleteHandler}
          />
        </div>
      );
    }
  };

  const successHandler = (obj) => {
    console.log("clicked", obj);
    const tempData = [...featuresData, obj];
    setFeaturesData(tempData);
  };

  const handleConfirm = async () => {
    console.log("confirm clicked");
    setIsLoading(true);
    try {
      const resp = await featureApi.deleteFeatureById(deleteFeatureId);

      setIsSuccess(true);
      setSuccessMessage(resp?.data?.message);
      setIsLoading(false);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
      // const findIndex = featuresData.findIndex(
      //   (ele) => ele.id === deleteFeatureId
      // );
      // const newArr = findIndex !== -1 && featuresData.splice(findIndex, 1);
      setDeleteFeatureId("");
      handleClose();
    } catch (err) {
      setIsError(true);
      setErrorMessage(err?.data?.message);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <>
      {isError && <ErrorAlert show={isError} message={errorMessage} />}
      {isSuccess && <SuccessAlert show={isSuccess} message={successMessage} />}
      <div className="mt-4">
        <AlertHandler
          onHide={handleClose}
          show={show}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />

        <Card>
          <h1 className="text-center">Features</h1>
          <hr />
          <FeaturesForm
            onSuccess={successHandler}
            isEdit={isEdit}
            editData={editData}
            cancelEditHandler={cancelEditHandler}
            onEditSuccess={editSuccessHandler}
          />
        </Card>
        <div className="mt-4">
          <Card>{loading()}</Card>
        </div>
      </div>
    </>
  );
};

export default Features;
