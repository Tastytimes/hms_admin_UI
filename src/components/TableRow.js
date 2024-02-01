const TableRow = ({ rowData }) => {
  return (
    <>
      {rowData &&
        rowData.map((row) => {
          return (
            <tr>
              <td>{row.fullName}</td>
              <td>{row.email}</td>
              <td>{row.status}</td>
              <td>{row.role}</td>
            </tr>
          );
        })}
    </>
  );
};

export default TableRow;
