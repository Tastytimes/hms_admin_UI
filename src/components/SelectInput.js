import Form from "react-bootstrap/Form";

const SelectInput = ({ options, value, onChange }) => {
  return (
    <Form.Control as="select" value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Control>
  );
};

export default SelectInput;
