import { useEffect, useState } from "react";
import InputBox from "../InputBox";
import Buttons from "../Buttons";
import SelectInput from "../SelectInput";

const SubscriptionForm = () => {
  const [subscription, setSubscription] = useState({
    subscriptionName: "",
    price: null,
    status: false,
    featureId: "",
  });
  const [selectedOption, setSelectedOption] = useState('');

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  useEffect(() => {

  }, []);

  const fetchData = async() => {
    try {
        
    } catch (err) {
        
    }
  }

  const toggleSwitch = () => {
    setIsSwitchOn((prevSwitchState) => !prevSwitchState);
    const isActiveSwitch = !isSwitchOn;
    setSubscription((prev) => ({
      ...prev,
      status: isActiveSwitch,
    }));
    console.log(subscription);
  };

  return (
    <>
      <form className="flex">
        <InputBox type="text" label="Subscription Name" />
        <InputBox type="text" label="price" />
        <SelectInput />
        <div className="mt-10">
          <label className="mr-2">Is Active:</label>
          <input
            type="checkbox"
            checked={isSwitchOn}
            onChange={toggleSwitch}
            className="status__inputbox ml-0 mb-5"
          />
        </div>
      </form>
      <Buttons
        label="Save"
        type="submit"
        size=""
        variant="success"
        isFormLoading={isFormLoading}
      />
    </>
  );
};

export default SubscriptionForm;
