import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../config/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );

  const [refreshToken, setrefreshToken] = useState(
    localStorage.getItem("refreshToken") || null
  );

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { user, accessToken, refreshToken } = response.data;

      setUser(user);
      setAccessToken(accessToken);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login Successfull!!");
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const register = async (formData) => {
    try {
      await api.post("/auth/register", formData);
      toast.success("Register Successfull!!");
      navigate("/login");
    } catch (error) {
      console.error("Registration Failed:", error);
      toast.error("Registration failed. Please try again.!");
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/");
    toast.success("Logout Successfull!!");
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
