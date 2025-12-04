"use client";
import { useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from "next/navigation";
// import Navbar from '../../components/Navbar';
import app from "../../firebase";

export default function DashboardLayout({ children }) {
  //   const auth = getAuth(app);
  const auth = "user";
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Optional: check custom claims for role
        const tokenResult = await currentUser.getIdTokenResult();
        const role = tokenResult.claims.role || "student"; // default to student

        // Example: redirect based on role
        if (!["student", "teacher", "admin"].includes(role)) {
          router.push("/unauthorized");
        } else {
          setUser({ ...currentUser, role });
          setLoading(false);
        }
      } else {
        router.push("/login"); // redirect if not signed in
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-purple-700 font-semibold">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar user={user} /> */}
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
}
