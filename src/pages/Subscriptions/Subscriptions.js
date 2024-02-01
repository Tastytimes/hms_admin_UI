import { useEffect } from "react";
import SpinnerService from "../../UI/spinner/SpinnerService";
import Card from "../../UI/card/Card";
import SubscriptionForm from "../../components/Subscription/SubscriptionForm";

const Subscriptions = () => {
  useEffect(() => {}, []);

  const loading = async () => {
    try {
    } catch (error) {}
  };
  return (
    <>
      <div className="mt-4">
        <hr />
        <Card>
          <h2 className="text-center">Subscription</h2>
          <hr />
          <SubscriptionForm />
        </Card>
      </div>
      <div></div>
    </>
  );
};

export default Subscriptions;
