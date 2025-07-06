import { motion } from 'framer-motion';

export default function About() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      {/* Header Animation */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center text-blue-800 dark:text-blue-400 mb-6"
      >
        About Marvel Estate
      </motion.h1>

      {/* Intro Section */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-lg text-center text-gray-600 dark:text-gray-300 mb-10"
      >
        Welcome to <span className="font-semibold text-red-600 dark:text-red-400">Marvel Estate</span> — 
        the ultimate marketplace where only Marvel-themed places are allowed!
        Whether you're listing Iron Man's mansion, Wakanda's tech hubs, or Doctor Strange's Sanctum Sanctorum — this is your universe.
      </motion.p>

      {/* Animation with Framer Motion Cards */}
      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
        >
          <h2 className="text-2xl font-semibold text-slate-700 dark:text-white mb-4">
            Why Marvel Estates?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Marvel Estates is a unique platform where Marvel fans can buy, sell, and explore locations inspired by their favorite heroes.
            We’re building a universe where every listing feels like it’s straight out of the MCU!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
        >
          <h2 className="text-2xl font-semibold text-slate-700 dark:text-white mb-4">
            Important Reminder
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Please make sure you only create and list <span className="font-bold text-red-600 dark:text-red-400">Marvel-themed places</span>.
            Any unrelated listings will not be approved. Let's keep this platform 100% Marvel!
          </p>
        </motion.div>
      </div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 text-center"
      >
        <h2 className="text-2xl font-bold text-slate-700 dark:text-white mb-2">Contact the Owner</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">For any queries or feedback, feel free to reach out:</p>
        <a
          href="mailto:yashwanthvuppala77@gmail.com"
          className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          yashwanthvuppala77@gmail.com
        </a>
      </motion.div>
    </main>
  );
}
