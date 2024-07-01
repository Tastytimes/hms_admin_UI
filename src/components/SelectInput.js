import Form from "react-bootstrap/Form";

const SelectInput = ({ options, value, onChange }) => {
  return (
    // <Form.Control as="select" value={value} onChange={onChange}>
    //   {options && options.map((option) => (
    //     <option key={option.value} value={option.value}>
    //       {option.label}
    //     </option>
    //   ))}
    // </Form.Control>
    <Form.Group controlId="exampleForm.ControlSelect1">
      <Form.Label>Features</Form.Label>
      <Form.Control as="select" value={value} onChange={onChange}>
        {/* Static option */}
        <option value="">Select an features</option>

        {/* Dynamic options */}
        {options && options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default SelectInput;
