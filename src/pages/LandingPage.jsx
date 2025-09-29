import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { user, accessToken } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [elections, setElections] = useState([]);
  const navigate = useNavigate();

  const fetchElections = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/elect/`);
      setElections(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchElections();
  }, []);

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
          {user && accessToken ? (
            <motion.h2
              className="text-xl md:text-6xl font-extrabold text-blue-700 leading-tight"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Welcome {user.name}!
            </motion.h2>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transform hover:scale-105 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-8 py-3 bg-gray-200 text-gray-800 rounded-xl shadow-lg hover:bg-gray-300 transform hover:scale-105 transition"
              >
                Register
              </button>
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
              key={e._id}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition transform hover:-translate-y-2"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-blue-600">{e.title}</h4>

                {/* Status Icon */}

                <motion.span
                  className={`relative flex h-3 w-3`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full ${
                      e.isActive ? "bg-green-400" : "bg-red-400"
                    } opacity-75`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 ${
                      e.isActive ? "bg-green-600" : "bg-red-600"
                    }`}
                  />
                </motion.span>
              </div>

              <p className="mt-2 text-gray-600">{e.description}</p>
              <Link
                to={`/election/${e._id}`}
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
