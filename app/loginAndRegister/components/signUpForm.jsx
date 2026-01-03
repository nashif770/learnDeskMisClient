"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase_init";

const tailwindClass = {
  inputClass:
    "mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500",
  labelClass: "block text-xs font-medium text-gray-700",
  buttonClass:
    "w-full py-2.5 text-sm bg-emerald-600 text-white font-semibold rounded-lg shadow hover:bg-emerald-700 transition",
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;

    try {
      // 1️⃣ Create Firebase user
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = result.user;

      // 2️⃣ Prepare user data for backend
      const userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        createdAt: new Date().toISOString(),
        role: "guest", // default role
        status: "pending", // default status
      };

      console.log("User", userData)

      // 3️⃣ Send to backend
      const res = await fetch("http://localhost:5000/userData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to save user to backend");
      }

      const backendResult = await res.json();
      console.log("Backend response:", backendResult);

      alert("Account created successfully!");

    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 text-black">
      <h2 className="text-2xl font-bold text-emerald-700 text-center mb-4">
        Create Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className={tailwindClass.labelClass}>Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
            })}
            type="email"
            placeholder="example@mail.com"
            className={tailwindClass.inputClass}
          />
          {errors.email && (
            <p className="text-red-600 mt-1 text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className={tailwindClass.labelClass}>Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            type="password"
            placeholder="••••••••"
            className={tailwindClass.inputClass}
          />
          {errors.password && (
            <p className="text-red-600 mt-1 text-xs">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className={tailwindClass.labelClass}>Confirm Password</label>
          <input
            {...register("confirmPass", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            type="password"
            placeholder="••••••••"
            className={tailwindClass.inputClass}
          />
          {errors.confirmPass && (
            <p className="text-red-600 mt-1 text-xs">{errors.confirmPass.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={tailwindClass.buttonClass}
        >
          {isSubmitting ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
