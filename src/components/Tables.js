import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import TableHeader from "./TableHeader";
import { AuthTableHeader } from "../UI/config/TableConfig";
import TableRow from "./TableRow";
import "./Tables.css";

const Tables = (props) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns(AuthTableHeader);
  }, []);

  const editRow = (row) => {
    console.log("edit clicked", row);
    props.testClick(row);
  };

  const deleteRow = (id) => {
    console.log("delete clicked");
    props.deleteHandlers(id);
  };

  const loading = () => {
    return (
      props.bodyData &&
      props.bodyData.map((row) => {
        return (
          <tr key={row.id}>
            <td>{row.fullName}</td>
            <td>{row.email}</td>
            <td>
              <p className={`${row.status ? "active-status" : "inactive"}`}>
                {row.status ? "Active" : "Inactive"}
              </p>
            </td>
            <td>
              <p
                className={`${row.role === "ADMIN" && "admin"} ${
                  row.role === "SUPER_ADMIN" && "super-admin"
                } ${row.role === "USER" && "user"}`}
              >
                {row.role}
              </p>
            </td>
            <td>
              <span onClick={() => editRow(row)}>
                <i className="fa-regular fa-pen-to-square"></i>
              </span>
            </td>
            <td>
              <span onClick={() => deleteRow(row.id)}>
                <i className="fa-solid fa-circle-xmark"></i>
              </span>
            </td>
          </tr>
        );
      })
    );
  };

  return (
    <div>
      <Table striped>
        <thead>
          <TableHeader columns={props.columns} />
        </thead>
        <tbody>
          {loading()}
          {/* <TableRow rowData={props.bodyData} /> */}
        </tbody>
      </Table>
    </div>
  );
};

export default Tables;
