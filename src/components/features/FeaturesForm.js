import { useEffect, useState } from "react";
import InputBox from "../InputBox";
import Buttons from "../Buttons";
import ErrorAlert from "../../UI/Alert/ErrorAlert";
import SuccessAlert from "../../UI/Alert/SuccessAlert";
import featureApi from "../../api/featureApi";

const FeaturesForm = (props) => {
  const [fetaures, setFeatures] = useState({
    featureName: "",
    isActive: false,
  });
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [featureId, setFeatureId] = useState("");

  useEffect(() => {
    if (props.isEdit) {
      console.log(props.editData);
      setFeatures({
        featureName: props.editData.featureName,
      });
      setIsSwitchOn(props.editData.isActive);
      setFeatureId(props.editData.id);
    }
  }, [props.editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeatures((prevFeatures) => ({
      ...prevFeatures,
      [name]: value,
    }));
  };

  const validate = () => {
    const newError = {};
    if (!fetaures.featureName.trim()) {
      newError.featureName = "Feature name is required";
    }
    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const toggleSwitch = () => {
    setIsSwitchOn((prevSwitchState) => !prevSwitchState);
    const isActiveSwitch = !isSwitchOn;
    setFeatures((prev) => ({
      ...prev,
      isActive: isActiveSwitch,
    }));
    console.log(fetaures);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const isValid = validate();
    console.log(fetaures);
    if (isValid) {
      const obj = {
        featureName: fetaures.featureName,
        isActive: fetaures.isActive,
      };
      setIsFormLoading(true);
      try {
        const resp = await featureApi.addFeature(obj);
        console.log(resp);
        setIsSuccess(true);
        setSuccessMessage(resp.data?.message);
        setIsFormLoading(false);
        setFeatures({ isActive: false, featureName: "" });
        setIsSwitchOn(false);
        setTimeout(() => setIsSuccess(false), 3000);
        setFeatures({ featureName: "", isActive: false });
        setIsSwitchOn(false);
        props.onSuccess(resp?.data?.data);
      } catch (err) {
        console.log(err);
        setIsError(true);
        setErrorMessage(err?.response?.data?.data?.message);
        setIsFormLoading(false);
        setTimeout(() => setIsError(false), 3000);
      }
    }
  };

  const displayErrorMessage = () => {
    if (isError) {
      return (
        <div className="">
          <ErrorAlert show={isError} message={errorMessage} />
        </div>
      );
    }
    if (isSuccess) {
      return (
        <div className="">
          <SuccessAlert show={isSuccess} message={successMessage} />
        </div>
      );
    }
  };

  const editHandler = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      const obj = {
        featureName: fetaures.featureName,
        isActive: isSwitchOn,
      };
      setIsFormLoading(true);
      console.log(obj);
      try {
        const resp = await featureApi.updateFeatureById(featureId, obj);
        setIsSuccess(true);
        setSuccessMessage(resp.data?.message);
        setIsFormLoading(false);
        setFeatures({ isActive: false, featureName: "" });
        setIsSwitchOn(false);
        setTimeout(() => setIsSuccess(false), 3000);
        setFeatures({ featureName: "", isActive: false });
        setIsSwitchOn(false);
        props.onEditSuccess(resp.data?.data);
      } catch (err) {
        setIsError(true);
        setErrorMessage(err?.response?.data?.data?.message);
        setIsFormLoading(false);
        setTimeout(() => setIsError(false), 3000);
      }
    }
  };

  const cancelHandler = () => {
    setFeatures({ isActive: false, featureName: "" });
    setIsSwitchOn(false);
    props.cancelEditHandler();
  };

  return (
    <>
      {displayErrorMessage()}
      <form className="feature__form" onSubmit={handleClick}>
        <div>
          <InputBox
            label="feature name: "
            name="featureName"
            placeholder="feature"
            value={fetaures.featureName}
            onChange={handleChange}
            type="text"
          />
          {errors.featureName && (
            <p className="text-left text-sm text-red-400 font-serif mt-0">
              {errors.featureName}
            </p>
          )}
        </div>
        <div className="mt-10">
          <label className="mr-2">Is Active:</label>
          <input
            type="checkbox"
            checked={isSwitchOn}
            onChange={toggleSwitch}
            className="status__inputbox ml-0 mb-5"
          />
        </div>

        {!props.isEdit && (
          <div className="ml-16 mt-6">
            <Buttons
              variant="primary"
              label="Submit"
              primary
              isFormLoading={isFormLoading}
              type="submit"
              size="lg"
            />
          </div>
        )}
        {props.isEdit && (
          <div className="ml-12 mt-6  flex">
            <div className="mr-4">
              <Buttons
                variant="warning"
                label="Update"
                primary
                isFormLoading={isFormLoading}
                type="submit"
                size="sm"
                onClick={editHandler}
              />
            </div>
            <div>
              <Buttons
                variant="danger"
                label="Cancel"
                primary
                type="submit"
                size="sm"
                onClick={cancelHandler}
              />
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default FeaturesForm;
