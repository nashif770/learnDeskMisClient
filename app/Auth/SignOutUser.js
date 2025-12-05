import { useUser } from "@/app/Auth/userContext";
import { signOut } from "firebase/auth";

export const useSignOut = () => {
  const { setUser } = useUser();

  const signOutUser = () => {
    setUser(null);
    return signOut(auth)
      .then(() => console.log("Signed out"))
      .catch((err) => console.log(err));
  };

  return { signOutUser };
};
