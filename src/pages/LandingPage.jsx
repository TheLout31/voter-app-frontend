import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const LandingPage = () => {
  const { user, accessToken } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState({
  //   name: "John Doe",
  //   avatar: "https://i.pravatar.cc/100",
  // });

  const elections = [
    {
      id: 1,
      title: "Presidential Election 2025",
      description: "Vote for the next national leader",
    },
    {
      id: 2,
      title: "Student Council Election",
      description: "Choose your representatives",
    },
  ];

  useEffect(() => {
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        const now = Date.now() / 1000; // current time in seconds
        if (decoded.exp > now) setIsLoggedIn(true);
        else setIsLoggedIn(false);
      } catch (err) {
        console.error("Invalid token:", err);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [accessToken]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-extrabold text-blue-600">VoteNow</h1>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Contact
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-20 px-6">
        <motion.h2
          className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Empower Your Voice,
          <br /> Shape the Future
        </motion.h2>
        <motion.p
          className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Participate in elections and make your vote count with VoteNow.
        </motion.p>
        <motion.div
          className="mt-8 flex gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {/* Profile / Auth Buttons */}
          {isLoggedIn && user ? (
            <span className="text-gray-700 font-semibold">
              Welcome, {user.name}!
            </span>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="px-8 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transform hover:scale-105 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-8 py-3 bg-gray-200 text-gray-800 rounded-xl shadow-lg hover:bg-gray-300 transform hover:scale-105 transition"
              >
                Register
              </Link>
            </div>
          )}
        </motion.div>
      </section>

      {/* Elections Section */}
      <section className="mt-32 px-6 lg:px-20">
        <h3 className="text-3xl font-semibold text-gray-800 mb-8">
          Ongoing Elections
        </h3>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {elections.map((e) => (
            <motion.div
              key={e.id}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition transform hover:-translate-y-2"
              whileHover={{ scale: 1.03 }}
            >
              <h4 className="text-xl font-bold text-blue-600">{e.title}</h4>
              <p className="mt-2 text-gray-600">{e.description}</p>
              <Link
                to={`/election/${e.id}`}
                className="inline-block mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                View Candidates
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-32 py-8 bg-gray-100 text-center text-gray-600">
        © {new Date().getFullYear()} VoteNow. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
