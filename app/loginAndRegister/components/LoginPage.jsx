// components/Auth/LoginForm.jsx
"use client";
import { auth } from "@/firebase/firebase_init";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => alert("Log In Complete"))
      .catch((error) => console.log(error));
  };

  return (
    <div className=" w-full bg-white rounded-2xl text-gray-700 p-3">
      <p className="text-3xl font-bold text-center text-emerald-700">
        Login Now!
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Email */}
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg p-2 mt-1"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full border rounded-lg p-2 mt-1"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
