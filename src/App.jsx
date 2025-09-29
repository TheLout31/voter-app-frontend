import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ElectionDetails from "./pages/ElectionDetails";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* User Routes */}
      {/* <Route path="/profile" element={<Profile />} /> */}
      <Route path="/election/:id" element={<ElectionDetails />} />

      {/* Fallback - 404 */}
      <Route
        path="*"
        element={
          <h1 className="text-center mt-20 text-2xl text-red-600">
            404 - Page Not Found
          </h1>
        }
      />
    </Routes>
  );
}

export default App;
