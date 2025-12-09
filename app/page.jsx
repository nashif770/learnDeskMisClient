"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-start px-6 md:px-12 gap-16 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-3">
      
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-7xl gap-12 py-20">

        {/* Text Content */}
        <motion.div 
          className="flex flex-col gap-8 md:w-1/2"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold text-emerald-800 leading-tight">
            Smart MIS for Schools, Training Centers & Institutes
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            A modern Management Information System to manage students, monitor
            performance, streamline operations, and grow your institution with ease.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/dashboard"
              className="px-7 py-3 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:bg-emerald-700 hover:shadow-xl transition"
            >
              Get Started
            </Link>

            <Link
              href="/loginAndRegister"
              className="px-7 py-3 border-2 border-emerald-600 text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition"
            >
              Login
            </Link>
          </div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl bg-white/50 backdrop-blur-sm">
            <img
              src="/lms-hero.png"
              alt="MIS Illustration"
              className="w-full h-auto"
            />
          </div>
        </motion.div>

      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {[
          { title: "Student Management", desc: "Track profiles, attendance, marks & more." },
          { title: "Teacher Tools", desc: "Manage courses, exams, and evaluations." },
          { title: "Digital Reports", desc: "Auto-generate academic & activity reports." },
          { title: "Subscriptions System", desc: "Flexible plans for institutions & batches." }
        ].map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <h3 className="text-xl font-semibold text-emerald-700">{feat.title}</h3>
            <p className="text-gray-600 mt-2">{feat.desc}</p>
          </motion.div>
        ))}

      </section>

    </main>
  );
};

export default Home;
