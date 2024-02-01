import Card from "../UI/card/Card";
import "./Dashboard.css";

const DashboardOverview = (props) => {
  return (
    <>
      <h3 className="mt-3">Welcome Admin</h3>
      <div className="grid gap-4 grid-cols-2 grid-rows-1">
        <Card colorCode="!bg-green-100">
          <div className=" p-4">
            <p className="text-xl">Active Users: </p>
            <p className="text-lg text-green-400">10</p>
          </div>
        </Card>
        <Card colorCode="!bg-red-100">
          <div className="p-4">
            <p className="text-xl">In Active Users</p>
            <p className="text-lg text-green-400">4</p>
          </div>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-3 grid-rows-1">
        <Card colorCode="!bg-green-100">
          <div className=" p-4">
            <p className="text-xl">Active Hotel: </p>
            <p className="text-lg text-green-400">10</p>
          </div>
        </Card>

        <Card colorCode="!bg-yellow-100">
          <div className=" p-4">
            <p className="text-xl">Pending Hotel</p>
            <p className="text-lg text-green-400">20</p>
          </div>
        </Card>
        <Card colorCode="!bg-red-100">
          <div className=" p-4">
            <p className="text-xl">In Active Hotel</p>
            <p className="text-lg text-green-400">20</p>
          </div>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-3 grid-rows-1">
        <Card colorCode="!bg-green-100">
          <div className=" p-4">
            <p className="text-xl">Payment Completed</p>
            <p className="text-lg text-green-400">20</p>
          </div>
        </Card>
        <Card colorCode="!bg-yellow-100">
          <div className=" p-4">
            <p className="text-xl">Payment Processed: </p>
            <p className="text-lg text-green-400">10</p>
          </div>
        </Card>

        <Card colorCode="!bg-red-100">
          <div className=" p-4">
            <p className="text-xl">Payment Cancelled</p>
            <p className="text-lg text-green-400">20</p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default DashboardOverview;
