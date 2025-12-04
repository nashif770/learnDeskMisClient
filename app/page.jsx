"use client";

const Home = () => {
  return (
    <main className="flex flex-col pt-20 items-center justify-start px-4 sm:px-6 md:px-12 gap-12 ">
      {/* Wrap content in a container with max width */}
      <div className="w-full max-w-[1980px]">
        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-between w-full gap-8 py-16 ">
          {/* Text Content */}
          <div className="flex flex-col gap-6 md:w-1/2">
            <h1 className="text-4xl sm:text-5xl font-bold text-emerald-900">
              Learn, Grow, and Excel with Our LMS
            </h1>
            <p className="text-lg sm:text-xl text-emerald-700">
              Access courses, resourcex`s, and tests anytime, anywhere. Empower
              yourself with knowledge.
            </p>
            <div className="flex gap-4">
              <a
                href="/login/signUp"
                className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow hover:bg-emerald-700 transition"
              >
                Get Started
              </a>
              <a
                href="/login"
                className="px-6 py-3 border border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-100 transition"
              >
                Login
              </a>
            </div>
          </div>

          {/* Illustration / Image */}
          <div className="md:w-1/2">
            <img
              src="/lms-hero.png" // Replace with your own image
              alt="Learning Illustration"
              className="w-full h-auto"
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
