import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import "./Auth.scss";
import { postData } from "../../../libs/services";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
const navigate = useNavigate()
  const [errorsMsg, setErrorsMsg] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (password < 6) {
      return setErrorsMsg("пароль не менше 6 символів");
    }
    try {
      const user = {
        username,
        email,
        password,
      };
      postData(`/auth/registration`, user)
        .then((res) => {
          navigate('/login')
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };

  return (
    <form onSubmit={handleRegister} className="auth-form">
      <Input
        label={"name"}
        type="text"
        value={username}
        required
        onChange={(e) => setUserName(e.target.value)}
      />
      <Input
        label={"email"}
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="auth-form__input-wrapper">
        <Input
          label="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        {errorsMsg}
        <button
          className="toggle-visable"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <div className="auth-form__input-wrapper">
        <Input
          label="Confirm password"
          type={showPassword ? "text" : "password"}
          autoComplete="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="toggle-visable"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <div className="auth-form__buttons">
        <Button type="submit">Зареєструватися</Button>
        <Link className="auth-form__link" to={"/login"}>
          Вже є акаунт?
        </Link>
      </div>
    </form>
  );
};

export default Register;
