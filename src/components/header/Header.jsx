import { useAuth } from "../../../hooks/useAuth";
import "./Header.scss";
import { Link, NavLink } from "react-router-dom";

import Button from "../button/Button";

const Header = (props) => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header__container">
        <Link to={"/"} className="header__logo">
          <img src="/img/logo.png" alt="logo" />
        </Link>

        <nav className="nav-bar">
          <ul className="nav-bar__list">
            <li className="nav-bar__item">
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to={"/"}
              >
                пости
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to={"/create-post"}
              >
                Cтворити
              </NavLink>
            </li>
          </ul>
        </nav>

        {user?.username ? (
          <div className="header__welcome">
            <span className="header__user"> Вітаємо {user.username} </span>
           
            <Button className="header__login" onClick={logout}> вийти</Button>
          </div>
        ) : (
          <Link to={"/login"}>
            <Button> ввійти</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
