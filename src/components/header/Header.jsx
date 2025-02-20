import { useAuth } from "../../../hooks/useAuth";
import "./Header.scss";
import { Link, NavLink } from "react-router-dom";

import Button from "../button/Button";

const Header = (props) => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img src="/img/logo.png" alt="logo" />
        </div>

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

            <li className="nav-bar__item">
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to={`/user-posts/${user?._id}`}
              >мої пости
                
              </NavLink>
            </li>
          </ul>
        </nav>

        {user?.username ? (
          <div className="header__welcome">
            Вітаємо {user.username}
            <Button onClick={logout}> вийти</Button>
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
