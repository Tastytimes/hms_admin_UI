import "./Card.css";

const Card = (props) => {
  const classVar = `card ${props.colorCode}`;
  return <div className={classVar}>{props.children}</div>;
};

export default Card;
