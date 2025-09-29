import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold text-blue-700 mb-6"
      >
        About Our Voting Platform
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-lg text-gray-700 max-w-3xl text-center mb-10"
      >
        Our platform is designed to make elections more secure, transparent, and 
        accessible. We provide an end-to-end encrypted online voting system where 
        registered users can cast their votes with confidence. Security and fairness 
        are at the heart of everything we do.
      </motion.p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="grid md:grid-cols-2 gap-6 max-w-4xl"
      >
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">🔒 Security First</h3>
          <p className="text-gray-600">
            We use advanced encryption and multi-factor authentication (MFA) 
            to ensure that every vote is secure and tamper-proof.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">🌍 Accessibility</h3>
          <p className="text-gray-600">
            Anyone with a verified account can vote from anywhere in the world. 
            Our system is designed to be mobile-friendly and user-friendly.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">🧾 Transparency</h3>
          <p className="text-gray-600">
            Votes are logged and verified through immutable records, 
            ensuring no unauthorized access or manipulation.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">📊 Fair Process</h3>
          <p className="text-gray-600">
            Each voter can only cast one vote per election, and results 
            are calculated with full transparency.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
