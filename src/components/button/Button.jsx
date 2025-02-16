import "./Button.scss";

const Button = ({ children, className = "", onClick, type = "button" }) => {
  return (
    <button className={`button ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
