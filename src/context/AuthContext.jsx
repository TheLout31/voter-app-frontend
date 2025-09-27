import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../config/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const login = async (email, password) => {
    try {
      let data = JSON.stringify({
        email: email,
        password: password,
      });

      const response = await api.post("/auth/login", data, {
        headers: { "Content-Type": "application/json" },
      });
      const { user, accessToken, refreshToken } = response.data;

      // store user in context
      setUser(user);
      setAccessToken(accessToken);

      // optionally persist in localStorage/sessionStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Logged in Successfully!!!");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  const register = async (formData) => {
    console.log(formData);
    try {
      const response = await api.post("/auth/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      const newUser = response.data;
      setUser(newUser);

      // if (newUser.role === "admin") navigate("/admin");
      // else navigate("/profile");

      console.log("Registered Successfully:", newUser);
      navigate("/login");
    } catch (error) {
      console.error("Registration Failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, register,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
