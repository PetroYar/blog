import { createContext, useState, useEffect } from "react";
import { getData, postData } from "../libs/services";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUser(token);
    }
  }, []);

  const getUser = async (token) => {
    try {
      const userData = await getData("/user", token);
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  };
  
  const authUser = async (user) => {
    const data = await postData("/auth/login", user);
    console.log(data);
    localStorage.setItem("token", data.token);
    getUser(data.token);
    navigate("/");
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const cxv = {
    user,
    setUser,
    authUser,
    logout,
  };
  return <AuthContext.Provider value={cxv}>{children}</AuthContext.Provider>;
};
