import Form from "react-bootstrap/Form";

const InputBox = ({ label, value, onChange, type, placeholder, name }) => {
  return (
    <>
      <Form.Group className="mb-3 mr-16" controlId="exampleForm.ControlInput1">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        />
      </Form.Group>
    </>
  );
};

export default InputBox;
