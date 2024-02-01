const TableHeader = ({ columns }) => {
  return (
    <tr>
      {columns &&
        columns.map((row) => {
          return <th key={row.id}>{row.value}</th>;
        })}
    </tr>
  );
};

export default TableHeader;
