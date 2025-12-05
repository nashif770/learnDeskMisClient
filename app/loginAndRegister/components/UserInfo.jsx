import { useUser } from "@/app/Auth/userContext";
import React from "react";

const UserInfo = () => {
  const { user } = useUser();
  // const user = "null";
  // const router = useRouter();

  // Redirect to profile if user exists
  // useEffect(() => {
  //   if (user) {
  //     router.push("/dashboard/profile");
  //   }
  // }, [user, router]);

  return (
    <div
      className="flex flex-col items-center justify-center px-2"
    >
      <div className="text-center">
        <p>{user?.displayName}</p>
        <p>{user?.email}</p>
      </div>
    </div>
  );
};
export default UserInfo;
