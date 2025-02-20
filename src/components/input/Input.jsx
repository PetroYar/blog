import "./Input.scss";

const Input = ({ label, onChange, textarea,error, ...props }) => {
  return (
    <div className="input">
      <label>{label}</label>
      {!textarea ? (
        <input onChange={onChange} {...props} />
      ) : (
        <textarea
          style={{ resize: "none" }}
          onChange={onChange}
          {...props}
        ></textarea>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;
