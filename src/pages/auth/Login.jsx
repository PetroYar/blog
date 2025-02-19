import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import "./Auth.scss";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useAuth } from "../../../hooks/useAuth";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authUser } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.length > 5) {
      const user = {
        password: password,
        email: email,
      };
      authUser(user);
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <Input
        label={"email"}
        type="email"
        autoComplete="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="auth-form__input-wrapper">
        <Input
          label="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <Button type="submit">увійти</Button>
        <Link className="auth-form__link" to={"/register"}>
          Ще не маєш акаунта?
        </Link>
      </div>
    </form>
  );
};

export default Login;
