import "./Input.scss";

const Input = ({ label, onChange, textarea,error, ...props }) => {
  return (
    <div className="input">
      <label>{label}</label>
      {!textarea ? (
        <input onChange={onChange} {...props} />
      ) : (
        <textarea
          
          onChange={onChange}
          {...props}
        ></textarea>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;
