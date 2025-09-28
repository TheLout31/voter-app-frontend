import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../config/api";

const ElectionDetails = () => {
  const { id } = useParams(); // get election id from route
  const [election, setElection] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  const fetchElection = async () => {
    try {
      const response = await api.get(`/elect/${id}`);
      setElection(response.data);
    } catch (err) {
      console.error("❌ Error fetching election:", err);
    }
  };

  useEffect(() => {
    // ✅ Fetch election details by ID
    fetchElection();
  }, [id]);

  const addVote = async (candidateId) => {
    setButtonLoading(true);
    try {
      const response = await api.post(`/vote/${id}`, { candidateId });
      console.log("Voted successfully:", response.data);

      // Refresh election details after voting
      await fetchElection();
    } catch (error) {
      console.error(
        "Error Casting Vote:",
        error.response?.data || error.message
      );
    } finally {
      setButtonLoading(false);
    }
  };

  if (!election) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600 animate-pulse">
          Loading election details...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6 lg:px-20">
      {/* Election Info */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl font-extrabold text-blue-700">
          {election.title}
        </h1>
        <p className="mt-4 text-gray-700 text-lg">{election.description}</p>
        <div className="mt-6 flex flex-col md:flex-row gap-6 text-gray-600">
          <p>
            <span className="font-semibold">Start:</span>{" "}
            {new Date(election.startDate).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">End:</span>{" "}
            {new Date(election.endDate).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            {election.isActive ? (
              <span className="text-green-600 font-bold">Active</span>
            ) : (
              <span className="text-orange-400 font-bold">InActive</span>
            )}
          </p>
        </div>
      </motion.div>

      {/* Candidates List */}
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Candidates</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {election.candidates.map((candidate, index) => (
          <motion.div
            key={candidate._id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-blue-600">
                {candidate.name}
              </h3>
              <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                {candidate.party}
              </span>
            </div>
            <p className="mt-3 text-gray-600">Votes: {candidate.votes}</p>
            <button
              onClick={() => addVote(candidate._id)}
              disabled={!election.isActive}
              className={`mt-6 w-full py-2 rounded-lg font-semibold shadow transition ${
                election.isActive
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              {election.isActive ? "Vote" : "Voting Inactive"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ElectionDetails;
