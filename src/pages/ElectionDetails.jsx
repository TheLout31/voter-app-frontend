import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../config/api";
import toast from "react-hot-toast";
import { PieChart } from "@mui/x-charts/PieChart";

const ElectionDetails = () => {
  const { id } = useParams();
  const [election, setElection] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  const fetchElection = async () => {
    try {
      const response = await api.get(`/elect/${id}`);
      setElection(response.data);
    } catch (err) {
      toast.error("❌ Error fetching Elections");
    }
  };

  useEffect(() => {
    fetchElection();
  }, [id]);

  const addVote = async (candidateId) => {
    setButtonLoading(true);
    try {
      await api.post(`/vote/${id}`, { candidateId });
      toast.success("Voted successfully");
      await fetchElection();
    } catch (error) {
      toast.error(error.response?.data?.error || "Voting failed");
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
              <span className="text-orange-400 font-bold">Inactive</span>
            )}
          </p>
        </div>
      </motion.div>

      {/* Pie Chart + Candidates Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Pie Chart */}
        <motion.div
          className="flex justify-center items-center bg-white p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <PieChart
            series={[
              {
                data: election.candidates.map((candidate, index) => ({
                  id: index,
                  value: candidate.votes,
                  label: candidate.name,
                })),
              },
            ]}
            width={400}
            height={400}
          />
        </motion.div>

        {/* Candidates List */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Candidates</h2>
          <div className="grid gap-6">
            {election.candidates.map((candidate, index) => (
              <motion.div
                key={candidate._id}
                className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div>
                  <h3 className="text-xl font-semibold text-blue-700">
                    {candidate.name}
                  </h3>
                  <p className="text-gray-600">{candidate.party}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Votes: <span className="font-bold">{candidate.votes}</span>
                  </p>
                </div>
                <button
                  onClick={() => addVote(candidate._id)}
                  disabled={!election.isActive || buttonLoading}
                  className={`px-4 py-2 rounded-lg font-semibold shadow transition ${
                    election.isActive
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  {election.isActive ? "Vote" : "Inactive"}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ElectionDetails;
