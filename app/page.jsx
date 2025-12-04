"use client";

import Link from "next/link";

const Home = () => {
  return (
    <main className="flex flex-col pt-20 items-center justify-start px-4 sm:px-6 md:px-12 gap-12 bg-white h-screen">
      <div className="w-full max-w-[1980px]">
        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-between w-full gap-8 py-16">
          {/* Text Content */}
          <div className="flex flex-col gap-6 md:w-1/2">
            <h1 className="text-4xl sm:text-5xl font-bold text-emerald-800">
              Manage, Track, and Improve with Our MIS
            </h1>

            <p className="text-lg sm:text-xl text-gray-600">
              A simple and efficient Management Information System to organize
              data, monitor progress, and streamline daily operations.
            </p>

            <div className="flex gap-4">
              <a
                href="/login/signUp"
                className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow hover:bg-emerald-700 transition"
              >
                Get Started
              </a>

              <Link
                href="/login"
                className="px-6 py-3 border border-emerald-600 text-emerald-700 font-semibold rounded-lg hover:bg-gray-100 transition"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Illustration */}
          <div className="md:w-1/2 text-gray-700">
            <img
              src="/lms-hero.png"
              alt="MIS Illustration"
              className="w-full h-auto"
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
