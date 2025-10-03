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

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthState = async () => {
    if (!accessToken) {
      setIsAuthenticated(false);
      return;
    }
    try {
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        // Token expired → try refresh
        await refreshAccessToken();
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      toast.error("Invalid token");
      logout();
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await api.post("/auth/refresh", { refreshToken });
      const { accessToken: newAccessToken } = response.data;

      setAccessToken(newAccessToken);
      localStorage.setItem("accessToken", newAccessToken);
      setIsAuthenticated(true);
    } catch (err) {
      toast.error("Refresh failed");
      logout();
    }
  };

  useEffect(() => {
    handleAuthState();
  }, []);

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
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const register = async (formData) => {
    try {
      await api.post("/auth/register", formData);
      toast.success("Register Successfull!!");
      navigate("/login");
    } catch (error) {
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
      value={{ user, accessToken, login, register, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
