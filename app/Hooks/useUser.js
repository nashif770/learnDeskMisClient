import { useState, useEffect } from "react";
import axios from "axios";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data
  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/user.json"); // user.json should be in public folder
      setUser(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch user data", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, error, refetch: fetchUser };
};

export default useUser;
