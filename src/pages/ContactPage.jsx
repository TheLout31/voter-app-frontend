import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold text-blue-700 mb-6"
      >
        Contact Us
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-lg text-gray-700 max-w-2xl text-center mb-10"
      >
        Have questions about our voting platform? Reach out to us and we’ll 
        be happy to help. Our support team ensures quick responses to your concerns.
      </motion.p>

      <motion.form
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg space-y-5"
      >
        <div>
          <label className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Message</label>
          <textarea
            rows="4"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Type your message..."
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-emerald-700 transition"
        >
          Send Message
        </motion.button>
      </motion.form>
    </div>
  );
}
