import { useEffect, useState } from "react";
import TableHeader from "../TableHeader";
import { FeaturesTableHeader } from "../../UI/config/TableConfig";
import { Table } from "react-bootstrap";
import Buttons from "../Buttons";
import "./DisplayFeatures.css";

const DisplayFeatures = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.featuresData);
  }, [props.featuresData]);

  const editHandler = (data) => {
    props.onEdit(data);
  };

  const deleteHandler = (data) => {
    props.onDelete(data.id);
  };

  return (
    <>
      <Table striped>
        <thead>
          <TableHeader columns={FeaturesTableHeader} />
        </thead>
        <tbody>
          {data.map((data) => {
            return (
              <tr key={data.id}>
                <td>{data.featureName}</td>
                <td
                  className={`${
                    data.isActive ? "featureActive" : "featureinActive"
                  }`}
                >
                  {data.isActive ? "Active" : "in Active"}
                </td>
                <td>
                  <Buttons
                    label="Edit"
                    size="sm"
                    variant="warning"
                    onClick={editHandler.bind(this, data)}
                  />
                </td>
                <td>
                  <Buttons
                    label="Delete"
                    size="sm"
                    variant="danger"
                    onClick={deleteHandler.bind(this, data)}
                  />
                </td>
              </tr>
            );
          })}
          {/* <TableRow rowData={props.bodyData} /> */}
        </tbody>
      </Table>
    </>
  );
};

export default DisplayFeatures;
