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

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    //create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // console.log(result);
        alert("Account Created");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const password = watch("password");

  return (
    <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 text-black">
      {/* Smaller Title */}
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
            <p className="text-red-600 mt-1 text-xs">
              {errors.password.message}
            </p>
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
            <p className="text-red-600 mt-1 text-xs">
              {errors.confirmPass.message}
            </p>
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
