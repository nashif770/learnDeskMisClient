import GoogleAuth from "@/app/Auth/GoogleAuth";
import React, { useState } from "react";

const LoginPage = () => {
  const [mode, setMode] = useState("login"); // "login" or "register"

  return (
    <div className="w-1/2 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 transition-all">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-6 text-emerald-700">
          {mode === "login" ? "Login to Your Account" : "Create an Account"}
        </h2>

        {/* Load the correct form */}
        <div className="mt-4">
          {/* {mode === "login" ? <LoginForm /> : <RegisterForm />} */}
        </div>

        {/* Switch between modes */}
        <p className="text-center text-sm text-gray-600 mt-4">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setMode("register")}
                className="text-emerald-600 font-semibold hover:underline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-emerald-600 font-semibold hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>

      </div>
    </div>
  );
};

export default LoginPage;
