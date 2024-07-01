import { useEffect, useState } from "react";
import InputBox from "../InputBox";
import Buttons from "../Buttons";
import SelectInput from "../SelectInput";
import { useFeaturesListApi } from "../../utility/featuresListApi";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'

const SubscriptionForm = () => {
  const [subscription, setSubscription] = useState({
    subscriptionName: "",
    price: null,
    status: false,
    featureId: "",
  });
  const { data, loading, error } = useFeaturesListApi();
  console.log(data)
  const [featureList, setFeaturesList] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  useEffect(() => {

    const newArray = data && data.filter(item => item.isActive).map(({ featureName, id }) => ({ label: featureName, value: id }));
    console.log(newArray)
    setFeaturesList(newArray);
  }, [data]);

  const fetchData = async () => {
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
      <Form>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <InputBox type="text" label="Subscription Name" />
            </Form.Group>
          </Col >
          <Col md={3}>
            <Form.Group className="mb-3" controlId="price">
              <InputBox type="number" label="price" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <div className="mt">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <SelectInput options={featureList} />

              </Form.Group>

            </div>
          </Col>
          <Col md={2}>
            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Label>Status</Form.Label>
              <Form.Check type="checkbox" />
            </Form.Group>
          </Col>
          {/* <Col>
            <div className="mt-10">
              <label className="mr-2">Is Active:</label>
              <input
                type="checkbox"
                checked={isSwitchOn}
                onChange={toggleSwitch}
                className="status__inputbox ml-0 mb-5"
              />
            </div>
          </Col> */}

        </Row>


        {/* <InputBox type="text" label="price" /> */}


        <Buttons
          label="Save"
          type="submit"
          size=""
          variant="success"
          isFormLoading={isFormLoading}
        />
      </Form>
    </>
  );
};

export default SubscriptionForm;
